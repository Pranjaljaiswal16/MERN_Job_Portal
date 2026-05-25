import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { RadioGroup } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "@/utils/config";
import { useDispatch, useSelector } from "react-redux";

import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeEventFile = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post("https://mern-job-portal-uzhg.onrender.com/api/v1/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <form
          className="w-full max-w-md bg-white border border-slate-100 rounded-2xl shadow-xl p-6 sm:p-8 space-y-5 transition-all duration-300 hover:shadow-2xl"
          onSubmit={submitHandler}
        >
          <div className="text-center space-y-1">
            <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Create an Account
            </h1>
            <p className="text-sm text-slate-500">
              Please fill in the details to sign up
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-slate-700 font-medium text-sm">Full Name</Label>
              <Input
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                value={input.fullname}
                onChange={changeEventHandler}
                className="w-full px-3.5 py-2 border-slate-200 focus:border-black focus:ring-black rounded-lg transition duration-200 placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-700 font-medium text-sm">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={input.email}
                onChange={changeEventHandler}
                className="w-full px-3.5 py-2 border-slate-200 focus:border-black focus:ring-black rounded-lg transition duration-200 placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-700 font-medium text-sm">Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="w-full px-3.5 py-2 border-slate-200 focus:border-black focus:ring-black rounded-lg transition duration-200 placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-slate-700 font-medium text-sm">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="••••••••"
                value={input.password}
                onChange={changeEventHandler}
                className="w-full px-3.5 py-2 border-slate-200 focus:border-black focus:ring-black rounded-lg transition duration-200 placeholder:text-slate-400"
              />
            </div>

            {/* Radio & File Block — Grid Layout for Responsiveness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium text-sm">Register As</Label>
                <RadioGroup className="flex flex-col gap-2">
                  <div className="flex items-center gap-2.5 cursor-pointer group">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="w-4 h-4 text-black border-slate-300 focus:ring-black cursor-pointer transition"
                    />
                    <Label className="text-slate-600 font-normal text-sm group-hover:text-black cursor-pointer transition">
                      Student
                    </Label>
                  </div>

                  <div className="flex items-center gap-2.5 cursor-pointer group">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="w-4 h-4 text-black border-slate-300 focus:ring-black cursor-pointer transition"
                    />
                    <Label className="text-slate-600 font-normal text-sm group-hover:text-black cursor-pointer transition">
                      Recruiter
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 font-medium text-sm">Profile Picture</Label>
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeEventFile}
                  className="cursor-pointer file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 text-xs text-slate-500 pt-1 border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            {loading ? (
              <Button className="w-full bg-black hover:bg-zinc-800 text-white py-5 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md">
                <Loader2 className="h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-black hover:bg-zinc-800 text-white py-5 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99]"
              >
                Sign Up
              </Button>
            )}
          </div>

          <div className="text-center pt-1">
            <p className="text-sm text-slate-500">
              Already have an Account?{" "}
              <Link
                to="/login"
                className="text-black font-semibold hover:underline underline-offset-4 transition"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;