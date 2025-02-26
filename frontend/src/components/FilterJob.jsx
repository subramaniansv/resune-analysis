import React, { useState } from "react";
import { 
  Filter, MapPin, Briefcase, DollarSign, X, Menu, Calendar, Layers, Globe, Award, Building, Users 
} from "lucide-react";

const FilterJob = () => {
    const [isOpen, setIsOpen] = useState(false);
    const submitHandler =(e)=>{
      e.preventDefault()
    }
    return (
      <div className="flex">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-3 bg-blue-500 text-white fixed top-4 left-4 z-50 rounded-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
  
        {/* Sidebar Container */}
        <div
          className={`fixed lg:relative top-0 left-0 h-full bg-white shadow-md w-72 p-5 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Filter className="mr-2" /> Filters
          </h2>
          <form action="" onSubmit={submitHandler}>
          {/* 1. Location Filter */}
          <div className="mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <MapPin className="mr-2" /> Location
            </h3>
            <input
              type="text"
              placeholder="Enter city"
              className="w-full p-2 mt-2 border rounded"
            />
          </div>

          {/* 2. Job Type Filter */}
          <div className="mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Briefcase className="mr-2" /> Job Type
            </h3>
            <select className="w-full p-2 mt-2 border rounded">
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Freelance</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>

          

          {/* 3. Date Posted */}
          <div className="mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Calendar className="mr-2" /> Date Posted
            </h3>
            <select className="w-full p-2 mt-2 border rounded">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>

          {/* . Experience Level */}
          <div className="mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Award className="mr-2" /> Experience Level
            </h3>
            <select className="w-full p-2 mt-2 border rounded">
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior Level</option>
            </select>
          </div>

          {/* 6. Industry / Category */}
          <div className="mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Layers className="mr-2" /> Industry
            </h3>
            <select className="w-full p-2 mt-2 border rounded">
              <option>Software Development</option>
              <option>Marketing</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Education</option>
            </select>
          </div>

          {/* 7. Skills */}
          <div className="mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Users className="mr-2" /> Skills
            </h3>
            <input
              type="text"
              placeholder="e.g., React, Python, AWS"
              className="w-full p-2 mt-2 border rounded"
            />
          </div>

          {/* 8. Remote / On-Site */}
          <div className="mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Globe className="mr-2" /> Work Type
            </h3>
            <div className="flex flex-col space-y-2 mt-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remote
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> On-Site
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Hybrid
              </label>
            </div>
          </div>

          {/* 9. Company Filter */}
          <div className="mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <Building className="mr-2" /> Company
            </h3>
            <input
              type="text"
              placeholder="Enter company name"
              className="w-full p-2 mt-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Apply filters</button>
          </div>
          </form>
          </div>
        {/* Overlay for mobile when sidebar is open */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </div>
    );
};

export default FilterJob;
