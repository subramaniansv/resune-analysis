const nlp = require('compromise');

// Predefined skills database
const skillsDB = [
    "JavaScript","HTML","CSS", "Python", "Java Script", "React", "Node.js", "AWS", "Machine Learning", "SQL", "Django", "TensorFlow"
];

// Extract contact information (Email, Phone, LinkedIn)
const extractContact = (text) => {
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    const phoneRegex = /\+?\d{10,15}/g;
    const linkedinRegex = /https?:\/\/(www\.)?linkedin\.com\/(?:in|pub|profile|company)?\/[A-Za-z0-9_-]+/gi;

    return {
        email: text.match(emailRegex)?.[0] || "Email not found",
        phone: text.match(phoneRegex)?.[0] || "Phone not found",
        linkedin: text.match(linkedinRegex)?.[0] || "LinkedIn ID not found"
    };
};

// Extract work experience details
const extractExp = (text) => {
    const doc = nlp(text);
    if (doc.has("student") || doc.has("fresher")) {
        return "Fresher";
    }

    // Improved regex-based extraction
    const expRegex = /(?:\d{1,2}\s*years?\s*of\s*experience|worked\s+at|internship\s+at)/gi;
    const match = text.match(expRegex);

    return match ? match.join(" ") : "Not Found";
};

// Extract education details
const extractEdu = (text) => {
    const educationRegex = /(?:studied at|graduated from|completed.*at|degree in)?\s*([\w\s]+(?:college|university|institute|academy))/i;
    const match = text.match(educationRegex);

    return match ? match[1].trim() : "Not Found";
};

// Extract skills based on predefined skills database
const extractSkills = (text) => {
    return skillsDB.filter(skill => new RegExp(`\\b${skill}\\b`, 'i').test(text)) || ["Skills not found"];
};

// Main function that connects all extractions
const processResume = (text) => {
    return {    
        contact: extractContact(text),
        experience: extractExp(text),
        education: extractEdu(text),
        skills: extractSkills(text),
    };
};

module.exports = { processResume };
