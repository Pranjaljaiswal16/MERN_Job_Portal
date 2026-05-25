import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allappliedJobs } = useSelector((store) => store.job);
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allappliedJobs.length > 0 ? (
            allappliedJobs.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.company?.name}</TableCell>

                <TableCell className="text-right">
                  <Badge
                    className={`px-3 py-3 text-white font-semibold rounded-full
      ${
        item?.status === "rejected"
          ? "bg-red-500"
          : item?.status === "pending"
            ? "bg-yellow-500"
            : item?.status === "accepted"
              ? "bg-green-500"
              : "bg-gray-500"
      }`}
                  >
                    {item?.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No applied jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
