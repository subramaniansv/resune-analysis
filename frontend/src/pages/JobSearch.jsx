import { useState } from "react";
import axios from "axios";

export default function JobSearch() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("india");
  const [jobType, setJobType] = useState("FULLTIME");
  const [datePosted, setDatePosted] = useState("today");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchJobs = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:5000/api/user/search-jobs", {
        params: { query, location, jobType, datePosted },
      });
      setJobs(response.data);
    } catch (err) {
      setError("Error fetching jobs. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Search for Jobs</h2>
      <form onSubmit={searchJobs} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Job Title / Skills"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Job Type</option>
          <option value="FULLTIME">Full-Time</option>
          <option value="PARTTIME">Part-Time</option>
          <option value="CONTRACTOR">Contractor</option>
        </select>
        <select
          value={datePosted}
          onChange={(e) => setDatePosted(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Date Posted</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded">Search</button>
      </form>

      {loading && <p className="mt-4">Loading jobs...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      
      <div className="mt-6">
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <h3 className="text-xl font-bold">{job.job_title}</h3>
              <p className="text-gray-600">{job.location}</p>
              <p className="text-gray-500">{job.employment_type}</p>
              <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Apply Now
              </a>
            </div>
          ))
        ) : (
          <p className="mt-4">No jobs found.</p>
        )}
      </div>
    </div>
  );
}
