import { Edit2, MoreHorizontal, Calendar, Building2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();

  // Redux store se safely data nikalna with fallback array protect
  const { companies = [], searchCompanyByText = "" } = useSelector(
    (store) => store.company || {}
  );

  // Filtered companies state
  const [filteredCompany, setFilteredCompany] = useState([]);

  // Search filter logic
  useEffect(() => {
    const filtered = companies.filter((company) => {
      if (!searchCompanyByText) return true;

      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });

    setFilteredCompany(filtered);
  }, [companies, searchCompanyByText]);

  // Premium Indian system locale Date format handler
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="min-w-[600px] w-full">
        <Table>
          <TableCaption className="pb-4 text-xs font-medium text-slate-400">
            A list of your recently registered companies
          </TableCaption>

          <TableHeader className="bg-slate-50/70">
            <TableRow className="hover:bg-transparent border-b border-slate-100">
              <TableHead className="font-bold text-slate-700 h-11 w-[100px]">Logo</TableHead>
              <TableHead className="font-bold text-slate-700 h-11">Company Name</TableHead>
              <TableHead className="font-bold text-slate-700 h-11">Date Registered</TableHead>
              <TableHead className="text-right font-bold text-slate-700 h-11 pr-5">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredCompany.length <= 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="text-center py-10 text-slate-400 font-medium text-sm">
                  No Companies Found
                </TableCell>
              </TableRow>
            ) : (
              filteredCompany.map((company) => (
                <TableRow key={company?._id} className="hover:bg-slate-50/50 border-b border-slate-100 transition-colors">

                  {/* Company Logo with secure fallback state */}
                  <TableCell className="py-3">
                    <Avatar className="h-9 w-9 border border-slate-100 rounded-xl shadow-sm">
                      <AvatarImage
                        src={company?.logo}
                        alt={company?.name}
                        className="object-contain p-1"
                      />
                      <AvatarFallback className="bg-purple-50 text-[#6A38C2] font-bold text-xs rounded-xl">
                        {company?.name ? company.name.substring(0, 2).toUpperCase() : <Building2 className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>

                  {/* Company Name */}
                  <TableCell className="font-semibold text-slate-800 py-3">
                    <span className="truncate max-w-[200px] block">{company?.name}</span>
                  </TableCell>

                  {/* Created Date with Calendar layout details */}
                  <TableCell className="text-slate-500 text-xs font-medium py-3">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      {formatDate(company?.createdAt)}
                    </div>
                  </TableCell>

                  {/* Actions Popover handler */}
                  <TableCell className="text-right py-3 pr-5">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-slate-100 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm transition active:scale-95 cursor-pointer">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </PopoverTrigger>

                      <PopoverContent className="w-28 bg-white p-1.5 rounded-xl border border-slate-100 shadow-md flex flex-col" align="end">
                        <button
                          className="flex items-center gap-2 w-full text-left px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-[#6A38C2] hover:bg-purple-50/50 rounded-lg transition cursor-pointer"
                          onClick={() => navigate(`/admin/companies/${company?._id}`)}
                        >
                          <Edit2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>Edit</span>
                        </button>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompaniesTable;