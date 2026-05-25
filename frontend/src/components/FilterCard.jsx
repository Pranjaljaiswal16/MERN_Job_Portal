import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from "react-redux";
import { setsearchQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Hydrabad", "KolKata", "Pune", "Bangalore"],
  },
  {
    filterType: "Industry",
    array: ["FrontEnd Developer", "BackEnd Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: [
      "0-40K",
      "40-1Lakhs",
      "1 Lakhs-5 Lakhs",
      "5 Lakhs-10 Lakhs",
      "10 Lakhs-14 Lakhs",
    ],
  },
];

const FilterCard = () => {
  const [selectedValue, setselectedValue] = useState("");
  const dispatch = useDispatch();

  const Changedhandle = (value) => {
    setselectedValue(value);
  };

  useEffect(() => {
    dispatch(setsearchQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h1 className="font-bold text-slate-900 text-lg tracking-tight">Filter Jobs</h1>
        {selectedValue && (
          <button
            onClick={() => setselectedValue("")}
            className="text-xs font-semibold text-[#6A38C2] hover:underline cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filters Group */}
      <RadioGroup
        onValueChange={Changedhandle}
        value={selectedValue}
        className="w-full mt-4 space-y-6"
      >
        {filterData.map((data, index) => {
          return (
            <div key={index} className="space-y-3">
              {/* Category Subheading */}
              <h2 className="font-semibold text-sm text-slate-800 tracking-wide uppercase">
                {data.filterType}
              </h2>

              {/* Items List Container */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
                {data.array.map((item, idx) => {
                  const itemId = `id-${index}-${idx}`;
                  const isSelected = selectedValue === item;

                  return (
                    <div
                      key={itemId}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-xl border transition-all duration-200 cursor-pointer select-none ${isSelected
                          ? "border-[#6A38C2] bg-[#6A38C2]/5 text-[#6A38C2]"
                          : "border-transparent hover:bg-slate-50 text-slate-600"
                        }`}
                    >
                      <RadioGroupItem
                        value={item}
                        id={itemId}
                        className="text-[#6A38C2] focus-visible:ring-[#6A38C2]"
                      />
                      <Label
                        htmlFor={itemId}
                        className="text-sm font-medium cursor-pointer w-full"
                      >
                        {item}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;