import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminJobsTable from "./AdminJobsTable";
import { Input } from "@/components/ui/input";
import useAllGetAdminJobs from "@/hooks/useAllGetAdminJobs";
import { setsearchJobByText } from "@/redux/jobSlice";
import { BriefcaseMedical, Briefcase, Search, Plus } from "lucide-react"; // Icons for admin dashboard look

const AdminJobs = () => {
  useAllGetAdminJobs();
  const [input, setinput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setsearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-6xl w-full mx-auto my-6 sm:my-10 px-4 sm:px-6 lg:px-8">

        {/* Responsive Dashboard Filter / Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm mb-6">

          {/* Search Wrapper with Icon styling */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              className="w-full pl-10 h-10 rounded-xl border-slate-200 focus-visible:ring-[#6A38C2] text-sm"
              placeholder="Filter by company, role..."
              onChange={(e) => setinput(e.target.value)}
              value={input}
            />
          </div>

          {/* Post New Job Action Button */}
          <Button
            className="w-full sm:w-auto h-10 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-semibold rounded-xl px-5 transition shadow-sm active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => navigate("/admin/jobs/create")}
          >
            <Plus className="h-4 w-4" />
            New Job
          </Button>
        </div>

        {/* Table wrapper with overflow container for mobile compatibility */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden p-2 sm:p-4">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;