const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        skills: { type: [String], default: [] },  
        education: { type: String, default: "Not Provided" },
        experience: { type: String, default: "Not Provided" },
        resumeText: { type: String, default: "" }     

    }
);
const userModel = mongoose.models.user || mongoose.model("user",userSchema);
module.exports = userModel;