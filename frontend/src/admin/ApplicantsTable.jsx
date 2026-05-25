import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { APPLICATION_API_END_POINT } from "@/utils/config";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.applications);


  const statusHandler = async (status, id) => {


    try {
      const res = await axios.post(`https://mern-job-portal-uzhg.onrender.com/api/v1/application/status/${id}/update`, { status }, { withCredentials: true })

      if (res.data.success) {
        toast.success(res.data.message)
      }


    } catch (error) {

      toast.error(error.response.data.message)
      console.log(error)
    }
  }





  return (
    <div>
      <Table>
        <TableCaption>A List Of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className={"text-right"}>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants &&
            applicants?.applications?.map((item, index) => (
              <tr key={index}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-500 hover:text-blue-400"
                      href={item?.applicant?.profile?.resumeOriginalName}
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                <TableCell className={"float-right cursor-pointer"}>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>

                    <PopoverContent className={"w-32"}>
                      {SortListingStatus.map((status, index) => {
                        return (
                          <div
                            key={index}
                            className="flex w-fit items-center my-2 cursor-pointer"
                            onClick={() => statusHandler(status, item?._id)}
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
