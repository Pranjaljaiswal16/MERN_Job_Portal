import Navbar from "@/components/shared/Navbar";
import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/config";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllapplications } from "@/redux/applicationSlice";
import { Users, ArrowLeft } from "lucide-react"; // Dashboard style icons
import { useNavigate } from "react-router-dom";

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Safe extraction with fallback empty state protection
  const { allApplications } = useSelector((store) => store.application) || {};
  const applicantsCount = allApplications?.applications?.length || 0;

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true },
        );
        dispatch(setAllapplications(res.data.job));
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    if (params.id) {
      fetchAllApplicants();
    }
  }, [params.id, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto my-6 sm:my-10 px-4 sm:px-6 lg:px-8">

        {/* Navigation & Header Section */}
        <div className="flex flex-col gap-3 mb-6">

          {/* Back to Jobs Navigation Handle */}
          <button
            onClick={() => navigate("/admin/jobs")}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#6A38C2] transition w-fit cursor-pointer group"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Jobs
          </button>

          {/* Dynamic Title Bar */}
          <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#6A38C2]">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-slate-800 tracking-tight">
                  Job Applicants
                </h1>
                <p className="text-xs text-slate-400 font-medium hidden sm:block mt-0.5">
                  Review and manage profiles submitted for this position
                </p>
              </div>
            </div>

            {/* Total Badge Counter indicator */}
            <div className="bg-[#6A38C2]/10 text-[#6A38C2] font-bold text-sm px-3.5 py-1.5 rounded-xl border border-[#6A38C2]/20 shadow-sm whitespace-nowrap">
              Total: {applicantsCount}
            </div>
          </div>
        </div>

        {/* Data Table Wrapper Layout Box */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-2 sm:p-4">
          <ApplicantsTable />
        </div>

      </div>
    </div>
  );
};

export default Applicants;