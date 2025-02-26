import React, { useState } from "react";
import { Pencil, Upload, PlusCircle, Trash2 } from "lucide-react";
import Workexp from "../components/Workexp";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [about, setAbout] = useState(
    "Passionate software engineer with 5+ years of experience."
  );
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );

  const [skills, setSkills] = useState(["JavaScript", "React", "Node.js"]);
  const [workExperience, setWorkExperience] = useState([
    {
      id: 1,
      position: "Software Engineer",
      company: "Google",
      duration: "2020 - Present",
      description: "Developed scalable applications and optimized backend performance.",
    },
  ]);

  const [editing, setEditing] = useState({ field: null, value: "", index: null });

  // Handle file upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Handle general field edit
  const handleEdit = (field, value, index = null) => {
    setEditing({ field, value, index });
  };
  

  // Save edits
  const saveEdit = () => {
    if (editing.field === "name") setName(editing.value);
    if (editing.field === "jobTitle") setJobTitle(editing.value);
    if (editing.field === "about") setAbout(editing.value);

    if (editing.field.startsWith("workExperience")) {
      const fieldName = editing.field.split("-")[1];
      setWorkExperience((prev) =>
        prev.map((exp, i) =>
          i === editing.index ? { ...exp, [fieldName]: editing.value } : exp
        )
      );
    }

    if (editing.field.startsWith("skills")) {
      setSkills((prev) =>
        prev.map((skill, i) => (i === editing.index ? editing.value : skill))
      );
    }

    setEditing({ field: null, value: "", index: null });
  };

  // Add new skill
  const addSkill = () => {
    setSkills([...skills, "New Skill"]);
  };

  // Remove skill
  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Add new work experience
  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        id: workExperience.length + 1,
        position: "New Position",
        company: "New Company",
        duration: "Year - Year",
        description: "Job description...",
      },
    ]);
  };

  // Remove work experience
  const removeWorkExperience = (index) => {
    setWorkExperience(workExperience.filter((_, i) => i !== index));
  };
  const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    saveEdit();
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl text-center">
        <div className="relative inline-block">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border border-gray-300"
          />
          <label className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full cursor-pointer">
            <Upload size={18} />
            <input type="file" className="hidden" onChange={handleImageUpload} onKeyDown={handleKeyPress}
            />
          </label>
        </div>

        {/* Name & Job Title */}
        {editing.field === "name" ? (
          <input
            className="text-xl font-semibold text-center border p-2 w-full"
            value={editing.value}
            onChange={(e) => handleEdit("name", e.target.value)}
            onBlur={saveEdit}
            autoFocus
            onKeyDown={handleKeyPress}

          />
        ) : (
          <h2 className="text-xl font-semibold cursor-pointer" onClick={() => handleEdit("name", name)}>
            {name} <Pencil size={14} className="inline ml-1 text-gray-500" />
          </h2>
        )}

        {editing.field === "jobTitle" ? (
          <input
            className="text-gray-500 text-center border p-2 w-full"
            value={editing.value}
            onChange={(e) => handleEdit("jobTitle", e.target.value)}
            onBlur={saveEdit}
            autoFocus onKeyDown={handleKeyPress}

          />
        ) : (
          <p className="text-gray-500 cursor-pointer" onClick={() => handleEdit("jobTitle", jobTitle)}>
            {jobTitle} <Pencil size={14} className="inline ml-1 text-gray-500" />
          </p>
        )}
      </div>

      {/* Skills Section */}
<div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mt-6">
  <h2 className="text-xl font-semibold flex justify-between items-center">
    Skills
    <PlusCircle size={18} className="cursor-pointer text-blue-500" onClick={addSkill} />
  </h2>
  <div className="flex flex-wrap mt-2 gap-2">
    {skills.map((skill, index) => (
      <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-full">
        {editing.field === `skills-${index}` ? (
          <input
            type="text"
            className="bg-transparent border-none outline-none px-2"
            value={editing.value}
            onChange={(e) => setEditing({ ...editing, value: e.target.value })}
            onBlur={saveEdit} // Save when focus is lost
            autoFocus onKeyDown={handleKeyPress}
          />
        ) : (
          <span onClick={() => handleEdit(`skills-${index}`, skill, index)} className="cursor-pointer">
            {skill} <Pencil size={14} className="ml-1 text-gray-500" />
          </span>
        )}
        <Trash2
          size={14}
          className="ml-2 cursor-pointer text-red-500"
          onClick={() => removeSkill(index)}
        />
      </div>
    ))}
  </div>
</div>


      <Workexp 
  workExperience={workExperience} 
  setWorkExperience={setWorkExperience} // Pass the setter function
/>

    </div>
  );
};

export default Profile;
