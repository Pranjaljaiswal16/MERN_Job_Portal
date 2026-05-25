import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";


const JobsCard = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunctions = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const days = daysAgoFunctions(job?.createdAt);

  return (
    <>

      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group">
        <div>
          {/* Top Meta Bar */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-400 tracking-wide">
              {days === 0 ? "Today" : `${days} ${days === 1 ? "day" : "days"} ago`}
            </p>
            <Button
              variant="ghost"
              className="rounded-full h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              size="icon"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>

          {/* Company Identity Block */}
          <div className="flex items-center gap-3 my-3">
            <div className="h-11 w-11 rounded-xl border border-slate-100 flex items-center justify-center p-1.5 bg-slate-50/50 shadow-inner shrink-0 overflow-hidden">
              <Avatar className="h-full w-full rounded-md">
                <AvatarImage src={job?.company?.logo} className="object-contain" />
              </Avatar>
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm text-slate-800 truncate">{job?.company?.name}</h2>
              <p className="text-xs text-slate-400 font-medium">India</p>
            </div>
          </div>

          {/* Job Info Details */}
          <div className="my-3">
            <h1 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight group-hover:text-[#7209b7] transition-colors duration-200 truncate">
              {job?.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 leading-relaxed mt-1">
              {job?.description}
            </p>
          </div>

          {/* Dynamic Highlight Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mt-4">
            <Badge className="text-blue-700 bg-blue-50 border-blue-100 font-bold px-2.5 py-0.5 rounded-md text-xs" variant="outline">
              {job?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] bg-red-50 border-red-100 font-bold px-2.5 py-0.5 rounded-md text-xs" variant="outline">
              {job?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] bg-purple-50 border-purple-100 font-bold px-2.5 py-0.5 rounded-md text-xs" variant="outline">
              {job?.salary} LPA
            </Badge>
          </div>
        </div>

        {/* Action CTA Buttons */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-50">
          <Button
            onClick={() => navigate(`/jobs/description/${job?._id}`)}
            variant="outline"
            className="flex-1 h-9 text-xs sm:text-sm font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl transition cursor-pointer"
          >
            Details
          </Button>
          <Button className="flex-1 h-9 text-xs sm:text-sm font-semibold bg-[#7209b7] hover:bg-[#5f32ad] text-white rounded-xl shadow-sm hover:shadow transition cursor-pointer">
            Save For Later
          </Button>
        </div>
      </div>
    </>

  );
};

export default JobsCard;