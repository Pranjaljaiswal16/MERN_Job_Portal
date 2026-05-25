import Navbar from "@/components/shared/Navbar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader2, Briefcase, AlertCircle } from "lucide-react";

const PostJobs = () => {
  const [input, setinput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });

  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const { companies = [] } = useSelector((store) => store.company) || {};

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const selectchangeHandler = (value) => {
    // Exact matching condition safely integrated
    const selectedCompany = companies.find(
      (company) => company._id === value
    );

    setinput({
      ...input,
      companyId: selectedCompany?._id || "",
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.companyId) {
      toast.error("Please select a company before posting a job.");
      return;
    }
    try {
      setloading(true);
      const res = await axios.post(`https://mern-job-portal-uzhg.onrender.com/api/v1/job/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center max-w-4xl w-full mx-auto my-6 sm:my-10 px-4 sm:px-6 lg:px-8">

        {/* Unified Card Shell */}
        <form
          onSubmit={submitHandler}
          className="w-full bg-white border border-slate-100 shadow-sm rounded-2xl p-6 sm:p-10 transition-all"
        >
          {/* Form Top Header Row */}
          <div className="mb-8 border-b border-slate-100 pb-5 text-center sm:text-left flex flex-col sm:flex-row sm:items-center gap-3.5">
            <div className="h-11 w-11 rounded-xl bg-purple-50 flex items-center justify-center text-[#6A38C2] mx-auto sm:mx-0 shrink-0">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Post a New Job
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-medium">
                Fill out the details below to look for the perfect candidate.
              </p>
            </div>
          </div>

          {/* Form Fields Responsive Container Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

            <div>
              <Label className="text-xs font-bold text-slate-600">Job Title</Label>
              <Input
                type="text"
                placeholder="e.g. Senior Frontend Developer"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-[#6A38C2] mt-1.5 h-10.5 rounded-xl border-slate-200 text-sm bg-slate-50/30"
                required
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-slate-600">Description</Label>
              <Input
                type="text"
                placeholder="Briefly describe the job role"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-[#6A38C2] mt-1.5 h-10.5 rounded-xl border-slate-200 text-sm bg-slate-50/30"
                required
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-slate-600">Requirements</Label>
              <Input
                type="text"
                placeholder="e.g. React, Tailwind, Node.js"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-[#6A38C2] mt-1.5 h-10.5 rounded-xl border-slate-200 text-sm bg-slate-50/30"
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-slate-600">Salary Package</Label>
              <Input
                type="text"
                placeholder="e.g. 10 LPA - 15 LPA"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-[#6A38C2] mt-1.5 h-10.5 rounded-xl border-slate-200 text-sm bg-slate-50/30"
                required
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-slate-600">Job Location</Label>
              <Input
                type="text"
                placeholder="e.g. Noida, Remote"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-[#6A38C2] mt-1.5 h-10.5 rounded-xl border-slate-200 text-sm bg-slate-50/30"
                required
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-slate-600">Job Type</Label>
              <Input
                type="text"
                placeholder="e.g. Full-time, Contract"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-[#6A38C2] mt-1.5 h-10.5 rounded-xl border-slate-200 text-sm bg-slate-50/30"
                required
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-slate-600">Experience Level</Label>
              <Input
                type="text"
                placeholder="e.g. 2+ years"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-[#6A38C2] mt-1.5 h-10.5 rounded-xl border-slate-200 text-sm bg-slate-50/30"
                required
              />
            </div>

            <div>
              <Label className="text-xs font-bold text-slate-600">Number of Positions</Label>
              <Input
                type="number"
                placeholder="1"
                name="position"
                value={input.position || ""}
                onChange={changeEventHandler}
                className="focus-visible:ring-[#6A38C2] mt-1.5 h-10.5 rounded-xl border-slate-200 text-sm bg-slate-50/30"
                required
              />
            </div>

            {/* Select Company Field Integrated Directly Into Grid Shape */}
            <div className="md:col-span-2 flex flex-col gap-1.5 mt-2">
              <Label className="text-xs font-bold text-slate-600">Associated Company</Label>
              {companies.length > 0 ? (
                <Select onValueChange={selectchangeHandler}>
                  <SelectTrigger className="w-full h-11 rounded-xl border-slate-200 focus:ring-[#6A38C2] bg-slate-50/30 text-sm">
                    <SelectValue placeholder="Select a Company Profile" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-xl border-slate-100 shadow-lg">
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company._id} // Using secure DB string _id instead of messy downcased text
                          className="text-slate-600 focus:bg-purple-50 focus:text-[#6A38C2] rounded-lg my-0.5 text-sm cursor-pointer"
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-2 p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold animate-pulse">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>No registered companies found. Please create a company profile first before posting openings.</span>
                </div>
              )}
            </div>
          </div>

          {/* Form Action Controls Section */}
          <div className="mt-8 border-t border-slate-50 pt-4">
            {loading ? (
              <Button disabled className="w-full h-11 bg-slate-800 text-white rounded-xl flex items-center justify-center gap-2 font-medium">
                <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                Processing request...
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={companies.length === 0}
                className="w-full h-11 bg-[#6A38C2] hover:bg-[#5b30a6] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-sm transition active:scale-[0.99] cursor-pointer"
              >
                Post Job Now
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobs;