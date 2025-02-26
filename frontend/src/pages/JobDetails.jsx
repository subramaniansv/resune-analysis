import React from 'react'
import { Briefcase, MapPin, Calendar, DollarSign, Users, CheckCircle } from "lucide-react";

const JobDetails = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      {/* Job Title & Company Info */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Software Engineer - Frontend</h1>
        <p className="text-gray-600 flex items-center mt-2">
          <Briefcase className="mr-2" /> Unova Technologies
        </p>
        <p className="text-gray-600 flex items-center mt-1">
          <MapPin className="mr-2" /> Remote / New York, USA
        </p>
      </div>

      {/* Job Overview */}
      <p className="text-gray-700 mb-6">
        We are looking for a skilled Frontend Engineer with expertise in React.js to join our fast-growing team. You'll work on exciting projects and contribute to our scalable web applications.
      </p>

      {/* Job Details */}
      <div className="space-y-4 border-t pt-4">
        <div className="flex items-center">
          <Calendar className="mr-2 text-blue-500" /> Posted: 3 Days Ago
        </div>
        <div className="flex items-center">
          <DollarSign className="mr-2 text-green-500" /> Salary: $60,000 - $80,000 per year
        </div>
        <div className="flex items-center">
          <Users className="mr-2 text-purple-500" /> Experience Level: Mid-Level
        </div>
      </div>

      {/* Responsibilities */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Key Responsibilities</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Develop, test, and maintain web applications using React.js.</li>
          <li>Collaborate with designers and backend developers.</li>
          <li>Optimize applications for speed and scalability.</li>
          <li>Troubleshoot and debug issues.</li>
          <li>Stay updated with emerging technologies.</li>
        </ul>
      </div>

      {/* Skills & Qualifications */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Required Skills & Qualifications</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Proficiency in JavaScript, React.js, and CSS.</li>
          <li>Experience with REST APIs and modern web frameworks.</li>
          <li>Understanding of responsive design principles.</li>
          <li>Strong problem-solving and communication skills.</li>
        </ul>
      </div>

      {/* Benefits */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Salary & Benefits</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Competitive salary with annual bonuses.</li>
          <li>Flexible working hours and remote options.</li>
          <li>Health & wellness benefits.</li>
          <li>Learning and development budget.</li>
        </ul>
      </div>

      {/* Apply Button */}
      <div className="mt-6 text-center">
        <button className="w-50 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
          Apply Now
        </button>
      </div>
    </div>
  )
}

export default JobDetails