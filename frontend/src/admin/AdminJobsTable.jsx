import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Eye, MoreHorizontal, Calendar, Building2, Briefcase } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const AdminJobsTable = () => {
  const navigate = useNavigate();

  // Redux store data
  const { allAdminJobs = [], searchJobByText = "" } = useSelector(
    (store) => store.job,
  );
  // Filtered companies state
  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filtered = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });

    setFilteredJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  // Clean helper function for date parsing safety
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="min-w-[600px] w-full">
        <Table>
          <TableCaption className="pb-4 text-xs font-medium text-slate-400">
            A list of your recently posted jobs
          </TableCaption>

          <TableHeader className="bg-slate-50/70">
            <TableRow className="hover:bg-transparent border-b border-slate-100">
              <TableHead className="font-bold text-slate-700 h-11">Company Name</TableHead>
              <TableHead className="font-bold text-slate-700 h-11">Role</TableHead>
              <TableHead className="font-bold text-slate-700 h-11">Date</TableHead>
              <TableHead className="text-right font-bold text-slate-700 h-11 pr-5">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredJobs.length <= 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="text-center py-10 text-slate-400 font-medium text-sm">
                  No Jobs Found
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job) => (
                <TableRow key={job?._id} className="hover:bg-slate-50/50 border-b border-slate-100 transition-colors">

                  {/* Company Name column */}
                  <TableCell className="font-semibold text-slate-800 py-3.5">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[160px]">{job?.company?.name || "N/A"}</span>
                    </div>
                  </TableCell>

                  {/* Role/Title column */}
                  <TableCell className="text-slate-600 font-medium py-3.5">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[180px]">{job?.title}</span>
                    </div>
                  </TableCell>

                  {/* Date column with formatting handler */}
                  <TableCell className="text-slate-500 text-xs font-medium py-3.5">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      {formatDate(job?.createdAt)}
                    </div>
                  </TableCell>

                  {/* Context Actions column */}
                  <TableCell className="text-right py-3.5 pr-5">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-slate-100 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm transition active:scale-95 cursor-pointer">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent className="w-36 bg-white p-1.5 rounded-xl border border-slate-100 shadow-md flex flex-col gap-0.5" align="end">

                        <button
                          className="flex items-center gap-2.5 w-full text-left px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition cursor-pointer"
                          onClick={() => navigate(`/admin/jobs/create/${job?._id}`)} // Fixed path interpolation fallback structure if editing
                        >
                          <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>Edit</span>
                        </button>

                        <button
                          className="flex items-center gap-2.5 w-full text-left px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-[#6A38C2] hover:bg-purple-50/50 rounded-lg transition cursor-pointer"
                          onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)}
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#6A38C2]" />
                          <span>Applicants</span>
                        </button>

                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobsTable;