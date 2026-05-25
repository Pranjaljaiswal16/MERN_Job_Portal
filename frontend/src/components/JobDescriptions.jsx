import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import { useEffect, useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/config";
import { setsingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify"; // Fixed missing import

const JobDescriptions = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id,
    ) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const dispatch = useDispatch();

  // for apply job
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true },
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setsingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`https://mern-job-portal-uzhg.onrender.com/api/v1/job/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setsingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-4xl mx-auto my-6 sm:my-12 px-4 sm:px-6">
      {/* Top Header Card Block */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-3">
          <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            {singleJob?.title}
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <Badge className="text-blue-700 bg-blue-50 border-blue-150 font-bold px-3 py-1 rounded-md" variant="outline">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] bg-red-50 border-red-150 font-bold px-3 py-1 rounded-md" variant="outline">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] bg-purple-50 border-purple-150 font-bold px-3 py-1 rounded-md" variant="outline">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`w-full sm:w-auto h-11 px-6 text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm ${isApplied
            ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none"
            : "bg-[#7209b7] text-white hover:bg-[#5f32ad] active:scale-95"
            }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Section Title Divider */}
      <h2 className="border-b border-slate-200 text-slate-900 font-bold text-lg sm:text-xl pt-10 pb-3 tracking-tight">
        Job Specifications
      </h2>

      {/* Modern Info Grid Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="flex items-start p-4 bg-slate-50/60 rounded-xl border border-slate-100">
          <p className="font-bold text-sm text-slate-500 w-32 shrink-0">Role:</p>
          <p className="font-semibold text-sm text-slate-800">{singleJob?.title}</p>
        </div>

        <div className="flex items-start p-4 bg-slate-50/60 rounded-xl border border-slate-100">
          <p className="font-bold text-sm text-slate-500 w-32 shrink-0">Location:</p>
          <p className="font-semibold text-sm text-slate-800">{singleJob?.location}</p>
        </div>

        <div className="flex items-start p-4 bg-slate-50/60 rounded-xl border border-slate-100 md:col-span-2">
          <p className="font-bold text-sm text-slate-500 w-32 shrink-0">Description:</p>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">{singleJob?.description}</p>
        </div>

        <div className="flex items-start p-4 bg-slate-50/60 rounded-xl border border-slate-100">
          <p className="font-bold text-sm text-slate-500 w-32 shrink-0">Experience:</p>
          <p className="font-semibold text-sm text-slate-800">{singleJob?.experienceLevel} Years</p>
        </div>

        <div className="flex items-start p-4 bg-slate-50/60 rounded-xl border border-slate-100">
          <p className="font-bold text-sm text-slate-500 w-32 shrink-0">Salary:</p>
          <p className="font-semibold text-sm text-slate-800">{singleJob?.salary} LPA</p>
        </div>

        <div className="flex items-start p-4 bg-slate-50/60 rounded-xl border border-slate-100">
          <p className="font-bold text-sm text-slate-500 w-32 shrink-0">Total Applicants:</p>
          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
            {singleJob?.applications?.length || 0} Applied
          </span>
        </div>

        <div className="flex items-start p-4 bg-slate-50/60 rounded-xl border border-slate-100">
          <p className="font-bold text-sm text-slate-500 w-32 shrink-0">Posted Date:</p>
          <p className="font-semibold text-sm text-slate-800">{singleJob?.createdAt?.split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptions;