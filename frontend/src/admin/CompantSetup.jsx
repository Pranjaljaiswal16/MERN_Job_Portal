import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { COMPANY_API_END_POINT } from "@/utils/config";
import axios from "axios";
import { ArrowLeft, Loader2, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CompantSetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);

  const [input, setinput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany = {} } = useSelector((store) => store.company) || {};
  const [loading, setloading] = useState(false);
  const companyId = params.id;
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const fileEventHandler = (e) => {
    const file = e.target.files?.[0];
    setinput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setloading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${companyId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setloading(false);
    }
  };

  // Fixed dependency array so data dynamically pre-fills when fetched from custom hook
  useEffect(() => {
    if (singleCompany) {
      setinput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null,
      });
    }
  }, [singleCompany]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center max-w-3xl w-full mx-auto my-6 sm:my-10 px-4 sm:px-6">

        {/* Main Card Element */}
        <form
          onSubmit={submitHandler}
          className="w-full bg-white border border-slate-100 shadow-sm rounded-2xl p-5 sm:p-8 md:p-10"
        >
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={() => navigate("/admin/companies")}
                variant="outline"
                className="flex items-center gap-1.5 h-9 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold cursor-pointer text-xs"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </Button>

              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center text-[#6A38C2] shrink-0">
                  <Building2 className="h-4 w-4" />
                </div>
                <h1 className="font-bold text-lg sm:text-xl text-slate-800 tracking-tight">
                  Company Setup
                </h1>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Update company branding profiles
            </p>
          </div>

          {/* Form Fields - Fully Responsive Matrix Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4.5">

            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-bold text-slate-600">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="e.g. Microsoft, Google"
                className="focus-visible:ring-[#6A38C2] h-10.5 rounded-xl border-slate-200 text-sm bg-slate-50/30"
                required
              />
            </div>

            {/* Description Field */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-bold text-slate-600">Company Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                placeholder="Brief summary of company domain"
                className="focus-visible:ring-[#6A38C2] h-10.5 rounded-xl border-slate-200 text-sm bg-slate-50/30"
              />
            </div>

            {/* Website Field */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-bold text-slate-600">Company Website</Label>
              <Input
                type="url"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                placeholder="https://example.com"
                className="focus-visible:ring-[#6A38C2] h-10.5 rounded-xl border-slate-200 text-sm bg-slate-50/30"
              />
            </div>

            {/* Location Field */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-bold text-slate-600">Company Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                placeholder="e.g. Bengaluru, Remote"
                className="focus-visible:ring-[#6A38C2] h-10.5 rounded-xl border-slate-200 text-sm bg-slate-50/30"
              />
            </div>

            {/* File Logo Upload field (Spans 2 columns on desktop) */}
            <div className="flex flex-col gap-1.5 sm:col-span-2 mt-1.5">
              <Label className="text-xs font-bold text-slate-600">Company Logo / Icon</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={fileEventHandler}
                className="h-11 rounded-xl border-slate-200 file:border-0 file:bg-slate-100 file:text-slate-700 file:text-xs file:font-semibold file:rounded-md file:mr-2 hover:file:bg-slate-200 cursor-pointer text-slate-500 pt-1.5 bg-slate-50/30"
              />
            </div>
          </div>

          {/* Form Action Call To Actions */}
          <div className="mt-8 border-t border-slate-50 pt-4">
            {loading ? (
              <Button disabled className="w-full h-11 bg-slate-800 text-white rounded-xl flex items-center justify-center gap-2 font-medium">
                <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                Updating repository...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-11 bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-semibold rounded-xl shadow-sm transition active:scale-[0.99] cursor-pointer"
              >
                Save & Update Details
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompantSetup;