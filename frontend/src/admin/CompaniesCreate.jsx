import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/config";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CompaniesCreate = () => {
  const navigate = useNavigate();
  const [companyName, setcompanyName] = useState("");

  const dispatch = useDispatch()

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        "https://mern-job-portal-uzhg.onrender.com/api/v1/company/register",
        { companyName },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );


      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message)
        const CompantId = res?.data?.company?._id
        navigate(`/admin/companies/${CompantId}`)

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            cumque non iure rem harum maiores incidunt beatae vitae nihil fugiat
            molestias eligendi ut laboriosam?
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          className="my-2"
          type="text"
          placeholder="JobHunt, Google, MicroSoft etc."
          onChange={(e) => setcompanyName(e.target.value)}
          value={companyName}
        />

        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            className="bg-black text-white hover:bg-gray-800 rounded-lg px-4 py-2"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesCreate;
