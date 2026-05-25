import LatestJobsCards from "./LatestJobsCards";
import { useSelector } from "react-redux";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJob = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className='max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8'>
      {/* Heading Container */}
      <div className='mb-8 text-center sm:text-left'>
        <h1 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900'>
          <span className='text-[#6A38C2]'>Latest & Top </span> Job Openings
        </h1>
        <p className='text-sm text-slate-500 mt-2'>
          Discover the most recent opportunities tailored for you
        </p>
      </div>

      {/* Responsive Grid Layout */}
      {allJobs.length <= 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
          <span className="text-slate-500 font-medium text-base">No Job Available Currently</span>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-5'>
          {allJobs?.slice(0, 6).map((job) => (
            <LatestJobsCards key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestJob;