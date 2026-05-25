import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import JobsCard from "./JobsCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// const jobArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
  const { allJobs, searchQuery } = useSelector((store) => store.job);
  const [filterJobs, setfilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(job.salary).includes(searchQuery)
        );
      });

      setfilterJobs(filteredJobs);
    } else {
      setfilterJobs(allJobs);
    }
  }, [allJobs, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-5 pb-10">
        {/* Layout container transitions from layout-col (mobile) to row (desktop) */}
        <div className="flex flex-col md:flex-row gap-6 items-start">

          {/* 1:- Filter section (Responsive width) */}
          <div className="w-full md:w-1/4 lg:w-[22%] shrink-0 sticky md:top-20 z-10 bg-white md:bg-transparent p-4 md:p-0 rounded-xl border border-slate-100 md:border-none shadow-sm md:shadow-none">
            <FilterCard />
          </div>

          {/* 2:- JobCard Section */}
          {filterJobs.length <= 0 ? (
            <div className="flex-1 w-full text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-white shadow-sm flex flex-col items-center justify-center">
              <span className="text-slate-500 font-semibold text-lg">Job Not Found</span>
              <p className="text-sm text-slate-400 mt-1">Try tweaking your search query or filters.</p>
            </div>
          ) : (
            <div className="flex-1 w-full h-[calc(100vh-120px)] overflow-y-auto pr-2 pb-5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {/* Fully responsive multi-column layout grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                  >
                    <JobsCard job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;