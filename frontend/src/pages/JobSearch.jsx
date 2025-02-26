import React, { useState } from "react";
import FilterJob from "../components/FilterJob";
import {useNavigate} from 'react-router-dom';
const JobSearch = () => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechCorp",
      location: "Remote",
      type: "Full-time",
      salary: "$80,000 - $100,000",
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateX",
      location: "New York, USA",
      type: "Hybrid",
      salary: "$90,000 - $120,000",
    },
  ];
  const handleApply = () =>{
      navigate('/job')
  }
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Job title, keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Location (City, Remote)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full md:w-1/3 p-3 border rounded-lg"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Search
        </button>
      </div>
      <div className="flex">
        {/*sidebar */}
        <div className="">
          <FilterJob/>
        </div>
      {/* Job Listings */}
      <div className="flex-1 p-5">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-5 rounded-lg shadow-md mb-5">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company} • {job.location}</p>
            <p className="text-gray-500">{job.type} • {job.salary}</p>
            <button className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={handleApply}>
              Apply Now
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default JobSearch;
