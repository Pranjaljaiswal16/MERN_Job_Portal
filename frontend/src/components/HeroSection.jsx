import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { setsearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setquery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchQuery } = useSelector((store) => store.job);

  const searchJobHandler = (e) => {
    dispatch(setsearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      {/* Decorative background blobs for premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 bg-[#6a38c2]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center max-w-4xl mx-auto px-4 py-16 sm:py-24 lg:py-28">
        <div className="flex flex-col gap-6 items-center">
          {/* Badge */}
          <span className="inline-flex px-4 py-1.5 rounded-full bg-red-50 text-[#F83002] font-semibold text-xs sm:text-sm tracking-wide uppercase border border-red-100 shadow-sm animate-fade-in animate-bounce-slow">
            No.1 Job Hunt Website
          </span>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] sm:leading-tight">
            Search, Apply & <br />
            Get Your <span className="text-[#6A38C2] bg-gradient-to-r from-[#6A38C2] to-[#804fe6] bg-clip-text text-transparent">Dream Jobs</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed">
            Discover thousands of job opportunities all around the world. Your next big career move starts right here, right now.
          </p>

          {/* Search Input Bar - Fully Responsive */}
          <div className="flex w-full max-w-xl bg-white shadow-xl hover:shadow-2xl border border-slate-100 pl-4 pr-1 py-1 rounded-full items-center gap-2 mt-4 transition-all duration-300 group focus-within:border-slate-300">
            <input
              type="text"
              placeholder="Find your dream jobs..."
              onChange={(e) => setquery(e.target.value)}
              value={query}
              className="outline-none border-none w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder:text-slate-400 py-2"
            />

            <Button
              onClick={searchJobHandler}
              className="rounded-full bg-[#6A38C2] hover:bg-[#5b30a6] p-3 sm:p-4 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 shrink-0"
            >
              <Search className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;