import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setsearchQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setsearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full px-12 sm:px-16 max-w-xl mx-auto my-12 sm:my-16">
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 sm:-ml-4">
          {category.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-2 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(item)}
                variant="outline"
                className="w-full max-w-[180px] bg-slate-50 hover:bg-[#6A38C2] text-slate-700 hover:text-white border-slate-200 hover:border-[#6A38C2] font-semibold py-5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 truncate text-xs sm:text-sm active:scale-95"
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows with responsive positioning */}
        <CarouselPrevious className="hidden sm:inline-flex -left-10 hover:bg-slate-100 border-slate-200" />
        <CarouselNext className="hidden sm:inline-flex -right-10 hover:bg-slate-100 border-slate-200" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;