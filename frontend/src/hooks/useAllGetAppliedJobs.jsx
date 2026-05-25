import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/config";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAllGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`https://mern-job-portal-uzhg.onrender.com/api/v1/application/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAppliedJobs()
  }, []);
  return <div></div>;
};

export default useAllGetAppliedJobs;
