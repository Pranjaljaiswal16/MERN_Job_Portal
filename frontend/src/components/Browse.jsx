import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import JobsCard from "./JobsCard";
import { useDispatch, useSelector } from "react-redux";
import { setsearchQuery } from "@/redux/jobSlice";
import useAllGetJobs from "@/hooks/useAllGetJobs";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7];

const Browse = () => {
  useAllGetJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setsearchQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto my-6 sm:my-10 px-4 sm:px-6 lg:px-8">
        {/* Header Summary Section */}
        <div className="border-b border-slate-200 pb-5 mb-6">
          <h1 className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight flex items-center gap-2">
            Search Results
            <span className="px-2.5 py-0.5 bg-[#6A38C2]/10 text-[#6A38C2] rounded-full text-sm font-bold">
              {allJobs?.length || 0}
            </span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Explore all the matched job openings based on your current preferences.
          </p>
        </div>

        {/* Empty State vs Responsive Grid Layout */}
        {allJobs?.length <= 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl bg-white shadow-sm max-w-xl mx-auto mt-10">
            <span className="text-slate-500 font-semibold text-lg">No Results Found</span>
            <p className="text-sm text-slate-400 mt-1">We couldn't find any jobs matching your criteria. Try adjusting your query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <JobsCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;