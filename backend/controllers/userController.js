const validator = require("validator");
const bcrypt = require("bcryptjs");
const userModel = require("../models/User.js");
const jwt = require("jsonwebtoken");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { processResume } = require("../utils/resumeParser.js");
// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Use a strong password (min 8 characters)" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ success: true,userId: newUser._id, token, message: "User registered successfully" });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ success: true, userId: user._id,token, message: "Login successful" });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
//google auth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/user/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = new userModel({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "", // No password for Google auth users
          });
          await user.save();
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        done(null, { userId: user._id, token, name: user.name, email: user.email });
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Route for Google Auth
const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

// Callback route
const googleAuthCallback = (req, res) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ success: false, message: "Google Authentication Failed" });
    }

    res.redirect(`http://localhost:3000/auth-success?token=${user.token}`);
  })(req, res);
};

//upload resume and update the data of the user in database

const uploadResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  try {
    const userId = req.user._id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authorized" });
    }

    const pdfBuffer = req.file.buffer;
    const data = await pdfParse(pdfBuffer);
    const resumeText = data.text;

    const extractedData = processResume(resumeText);
    if (!extractedData.skills.length && extractedData.education === "Not Found" && extractedData.experience === "Not Found") {
      return res.status(400).json({ success: false, message: "Resume parsing failed" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { skills: extractedData.skills, education: extractedData.education, experience: extractedData.experience, resumeText },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).json({ success: false, message: "Failed to update user data" });
    }

    res.status(200).json({ success: true, user: updatedUser, message: "Resume processed successfully" });

  } catch (error) {
    console.error("Resume Upload Error:", error);
    res.status(500).json({ success: false, message: "Error processing resume", error: error.message });
  }
};

//processing the data recieved from the api to get neccesaru info and performing ats operation here

const processJobData = (jobDetails, userSkills) => {
  const companyName = jobDetails.employer_name || "Not Provided";
  const salary =
    jobDetails.job_salary ||
    (jobDetails.job_min_salary && jobDetails.job_max_salary
      ? `$${jobDetails.job_min_salary} - $${jobDetails.job_max_salary}`
      : "Not Provided");

  const postedDate = new Date(jobDetails.job_posted_at_timestamp * 1000);
  const lastDateToApply = new Date(postedDate);
  lastDateToApply.setDate(postedDate.getDate() + 30);

  const jobDescription =
    jobDetails.job_description || "No Description Available";
  const applyLink = jobDetails.job_apply_link || "No Apply Link Available";

  let jobSkills = [];
  if (jobDetails.job_highlights?.Qualifications) {
    jobSkills = jobDetails.job_highlights.Qualifications;
  } else {
    const skillKeywords = [
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "AWS",
      "Machine Learning",
      "SQL",
    ];
    jobSkills = skillKeywords.filter((skill) =>
      jobDescription.toLowerCase().includes(skill.toLowerCase())
    );
  }

  const matchedSkills = userSkills.filter((skill) => jobSkills.includes(skill));
  const atsScore =
    jobSkills.length > 0
      ? `${Math.round((matchedSkills.length / jobSkills.length) * 100)}% match`
      : "0% match";

  return {
    companyName,
    salary,
    lastDateToApply: lastDateToApply.toDateString(),
    jobDescription,
    applyLink,
    atsScore,
  };
};
// fetch data by getting info from the database
const fetchJobs = async (req, res) => {
  try {
    const userId = req.user.id;
    if(!userId){
      return res.json({success:false,message:"user id required"})
    }
    const user = await userModel.findById(userId);
    if(!user || !user.skills || user.skills.length===0){
      return res.json({ success: false, message: "No skills found in your profile" });
    }
    const userSkills = user.skills; // Get user skills from database
    const apiKey = process.env.RAPID_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ success: false, message: "Missing API Key" });
    }

    const query = userSkills.join(" ");
    const apiUrl = `https://jsearch.p.rapidapi.com/search?query=${query}&country=us&num_pages=1`;

    console.log("Fetching jobs from:", apiUrl);

    const response = await axios.get(apiUrl, {
      headers: { "X-RapidAPI-Key": apiKey },
    });

    console.log("API Response:", response.data);

    if (
      !response.data ||
      !response.data.data ||
      response.data.data.length === 0
    ) {
      return res.json({
        success: false,
        message: "No jobs available for your skills",
      });
    }

    const jobResults = response.data.data.map((job) =>
      processJobData(job, userSkills)
    );

    return res.json({ success: true, jobs: jobResults });
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching jobs",
        error: error.message,
      });
  }
};
//search jobs by using filters
const searchJobs = async (req,res ) => {
  try {
    const { query, location, jobType, datePosted } = req.query;
    const apiKey = process.env.RAPID_API_KEY;
    const apiUrl = `https://jsearch.p.rapidapi.com/search?query=${query}&country=us&num_pages=1`;

    const response = await axios.get(apiUrl, {
        headers: {
            'X-RapidAPI-Key':apiKey,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
        params: {
            query,                     // Job role or skills (e.g., "React Developer")
            location,                  // City or Country (e.g., "San Francisco")
            job_employment_type: jobType,  // FULLTIME, PARTTIME, CONTRACTOR
            date_posted: datePosted,    // today, week, month
            num_pages: 3,               // Number of pages to fetch
        },
    });

    res.json(response.data.data); // Send jobs list as response
} catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
}
}
//fetch user data 
const fetchUser = async (req,res) =>{
      try {
        const user = await userModel.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
      }
      
}
//fetch skill
const fetchSkill = async (req,res)=>{
    try {
      const {skill} = req.body;
      const user = await userModel.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      user.skills.push(skill);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
}
module.exports = { registerUser, loginUser,googleAuth, googleAuthCallback, uploadResume, fetchJobs ,searchJobs,fetchUser,fetchSkill};
