import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Contact, Mail, Pen, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "@/components/ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useAllGetAppliedJobs from "@/hooks/useAllGetAppliedJobs";

const Profile = () => {
  useAllGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  // Resume status check
  const hasResume = !!user?.profile?.resume;

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Navbar />

      {/* Main Profile Info Card */}
      <div className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-2xl my-6 p-5 sm:p-8 shadow-sm relative  md:mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">

          {/* Identity Info Container */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 w-full sm:w-auto">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border border-slate-100 shadow-sm shrink-0">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt={user?.fullname}
                className="object-cover"
              />
              <AvatarFallback className="bg-slate-100 text-slate-700 font-bold text-xl uppercase">
                {user?.fullname?.slice(0, 2) || "JP"}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1.5 min-w-0">
              <h1 className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                {user?.fullname}
              </h1>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {user?.profile?.bio || "No bio added yet"}
              </p>
            </div>
          </div>

          {/* Edit Profile Button */}
          <Button
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl border border-slate-200 text-slate-600 hover:text-black hover:bg-slate-50 absolute top-5 right-5 sm:relative sm:top-0 sm:right-0 shrink-0 cursor-pointer"
            variant="outline"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Pen className="h-4 w-4" />
          </Button>
        </div>

        {/* Contact Coordinates */}
        <div className="my-6 pt-5 border-t border-slate-50 space-y-2.5 text-sm font-medium text-slate-600">
          <div className="flex items-center gap-3 hover:text-slate-900 transition-colors">
            <Mail className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="truncate">{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 hover:text-slate-900 transition-colors">
            <Contact className="h-4 w-4 text-slate-400 shrink-0" />
            <span>{user?.phoneNumber || "Not provided"}</span>
          </div>
        </div>

        {/* Technical Skills Segment */}
        <div className="my-6">
          <h2 className="font-bold text-slate-900 text-sm tracking-wide uppercase mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {user?.profile?.skills && user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="rounded-full px-3 py-1 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-medium text-xs tracking-wide shadow-sm transition border-transparent"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-slate-400 font-medium italic">No skills specified</span>
            )}
          </div>
        </div>

        {/* Resume Asset Attachment */}
        <div className="grid w-full max-w-md items-center gap-2 pt-4 border-t border-slate-50">
          <Label className="text-sm font-bold text-slate-900 tracking-wide uppercase">Resume</Label>
          {hasResume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user?.profile?.resume}
              className="inline-flex items-center gap-2 text-sm text-[#6A38C2] font-semibold hover:underline cursor-pointer group w-fit"
            >
              <FileText className="h-4 w-4 text-slate-400 group-hover:text-[#6A38C2] transition" />
              <span className="truncate max-w-[280px] sm:max-w-sm">
                {user?.profile?.resumeOriginalName || "View Resume File"}
              </span>
            </a>
          ) : (
            <span className="text-sm text-slate-400 font-medium italic">No resume uploaded</span>
          )}
        </div>
      </div>

      {/* Applied Jobs History Table Block */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-100 p-5 sm:p-8 shadow-sm  md:mx-auto mt-6">
        <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight mb-4">
          Applied Jobs
        </h2>
        <div className="overflow-x-auto">
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;