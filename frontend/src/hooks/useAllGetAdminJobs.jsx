import { setallAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/config";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAllGetAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/getadminjobs`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setallAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useAllGetAdminJobs;