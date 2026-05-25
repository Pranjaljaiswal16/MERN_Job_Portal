import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "@/redux/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/config";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOuthandler = async () => {
    try {
      const res = await axios.get(`https://mern-job-portal-uzhg.onrender.com/api/v1/user/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm backdrop-blur-md bg-white/95">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div>
          <Link to="/" className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 select-none">
            Job<span className="text-[#F83002]">Portal</span>
          </Link>
        </div>

        {/* Navigation & Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Menu Links */}
          <ul className="flex items-center gap-4 sm:gap-6 text-sm sm:text-base font-medium text-slate-600">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-black transition-colors duration-200">
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li className="hover:text-black transition-colors duration-200">
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-black transition-colors duration-200">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="hover:text-black transition-colors duration-200">
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li className="hover:text-black transition-colors duration-200">
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Conditional Buttons / Avatar */}
          {!user ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to={"/login"}>
                <Button variant="outline" className="h-9 px-3 sm:px-4 text-sm font-medium rounded-lg border-slate-200 hover:bg-slate-50 transition">
                  Login
                </Button>
              </Link>

              <Link to={"/signup"}>
                <Button className="h-9 px-3 sm:px-4 text-sm font-medium rounded-lg bg-[#6A38C2] text-white hover:bg-[#5b30a6] shadow-sm hover:shadow transition-all duration-200">
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="h-9 w-9 sm:h-10 sm:w-10 cursor-pointer border border-slate-200 hover:opacity-90 transition shadow-sm">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname}
                    />
                    <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold uppercase">
                      {user?.fullname?.slice(0, 2) || "JP"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>

                <PopoverContent className="w-72 sm:w-80 rounded-xl p-4 mt-2 border border-slate-100 shadow-xl bg-white" align="end">
                  {/* User Info Header inside Popover */}
                  <div className="flex gap-3 pb-3 border-b border-slate-100">
                    <Avatar className="h-10 w-10 border border-slate-150">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt={user?.fullname}
                      />
                      <AvatarFallback className="bg-slate-100 text-slate-700 font-semibold uppercase">
                        {user?.fullname?.slice(0, 2) || "JP"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5 max-w-[180px] sm:max-w-[220px]">
                      <h4 className="font-semibold text-sm text-slate-900 truncate">{user?.fullname}</h4>
                      <p className="text-xs text-slate-500 truncate line-clamp-1">
                        {user?.profile?.bio || "No bio added yet"}
                      </p>
                    </div>
                  </div>

                  {/* Actions List */}
                  <div className="flex flex-col gap-1 pt-2 text-slate-700">
                    {user && user.role === "student" && (
                      <Link to={"/profile"} className="w-full">
                        <Button variant="ghost" className="w-full justify-start gap-3 px-2 py-1.5 h-auto text-sm font-medium rounded-md hover:bg-slate-50 text-slate-600 hover:text-black transition">
                          <User2 className="h-4 w-4 text-slate-500" />
                          View Profile
                        </Button>
                      </Link>
                    )}

                    <Button
                      onClick={logOuthandler}
                      variant="ghost"
                      className="w-full justify-start gap-3 px-2 py-1.5 h-auto text-sm font-medium rounded-md hover:bg-red-50 text-red-600 hover:text-red-700 transition"
                    >
                      <LogOut className="h-4 w-4" />
                      LogOut
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;