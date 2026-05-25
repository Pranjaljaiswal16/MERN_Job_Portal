import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "@/utils/config";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="w-[92%] sm:max-w-[480px] bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-xl"
        onInteractOutside={() => setOpen(false)}
      >
        {/* Added DialogTitle for accessibility & clean heading */}
        <div className="pb-2 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
            Update Profile
          </DialogTitle>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Make changes to your profile here. Click save when you're done.
          </p>
        </div>

        <form onSubmit={submitHandler} className="space-y-4 mt-3">
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 py-1 scrollbar-thin">

            {/* Full Name Field */}
            <div className="flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1.5 sm:gap-4">
              <Label htmlFor="fullname" className="text-xs sm:text-sm font-semibold text-slate-600 sm:text-right w-full shrink-0">
                Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                className="col-span-3 h-10 rounded-xl border-slate-200 focus-visible:ring-[#6A38C2]"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1.5 sm:gap-4">
              <Label htmlFor="email" className="text-xs sm:text-sm font-semibold text-slate-600 sm:text-right w-full shrink-0">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                className="col-span-3 h-10 rounded-xl border-slate-200 focus-visible:ring-[#6A38C2]"
                placeholder="example@mail.com"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1.5 sm:gap-4">
              <Label htmlFor="phoneNumber" className="text-xs sm:text-sm font-semibold text-slate-600 sm:text-right w-full shrink-0">
                Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="col-span-3 h-10 rounded-xl border-slate-200 focus-visible:ring-[#6A38C2]"
                placeholder="98765xxxxx"
              />
            </div>

            {/* Bio Field */}
            <div className="flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1.5 sm:gap-4">
              <Label htmlFor="bio" className="text-xs sm:text-sm font-semibold text-slate-600 sm:text-right w-full shrink-0">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={input.input?.bio || input.bio}
                onChange={changeEventHandler}
                className="col-span-3 h-10 rounded-xl border-slate-200 focus-visible:ring-[#6A38C2]"
                placeholder="Tell us about yourself"
              />
            </div>

            {/* Skills Field */}
            <div className="flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1.5 sm:gap-4">
              <Label htmlFor="skills" className="text-xs sm:text-sm font-semibold text-slate-600 sm:text-right w-full shrink-0">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="col-span-3 h-10 rounded-xl border-slate-200 focus-visible:ring-[#6A38C2]"
                placeholder="HTML, CSS, React, Node.js"
              />
            </div>

            {/* File Input Field */}
            <div className="flex flex-col sm:grid sm:grid-cols-4 items-start sm:items-center gap-1.5 sm:gap-4">
              <Label htmlFor="file" className="text-xs sm:text-sm font-semibold text-slate-600 sm:text-right w-full shrink-0">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChange}
                className="col-span-3 h-10 rounded-xl border-slate-200 file:border-0 file:bg-slate-100 file:text-slate-700 file:text-xs file:font-semibold file:rounded-md file:mr-2 hover:file:bg-slate-200 cursor-pointer text-slate-500 pt-1.5"
              />
            </div>
          </div>

          {/* Action Buttons Footer */}
          <DialogFooter className="pt-2 border-t border-slate-50 mt-4">
            {loading ? (
              <Button disabled className="w-full h-11 rounded-xl bg-slate-900 text-white font-semibold flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Please Wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#6A38C2] hover:bg-[#5b30a6] text-white font-semibold transition shadow-sm active:scale-[0.98] cursor-pointer"
              >
                Save Changes
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;