// components/jobs/JobListItem.tsx
import { Job } from "@prisma/client";
import Link from "next/link";
import { MapPin, DollarSign, Clock } from "lucide-react";
import TimeAgo from "@/components/TimeAgo";

type JobListItemProps = {
  job: Job;
};

export default function JobListItem({ job }: JobListItemProps) {
  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <div className="dark:bg-slate-800 p-6 rounded-lg shadow-md text-black hover:shadow-lg hover:bg-slate-700/50 transition-all duration-300">
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <h2 className="text-xl font-bold dark:text-white text-black">
              {job.title}
            </h2>
            <p className="text-black dark:text-white mt-1">{job.company}</p>
          </div>
          <div className="mt-3 sm:mt-0 text-right">
            <span className="dark:bg-blue-500/10 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full">
              {job.type}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-black dark:text-white text-sm mt-4">
          <span className="flex items-center gap-2">
            <MapPin size={16} />
            {job.location}
          </span>
          {job.salary && (
            <span className="flex items-center gap-2">
              <DollarSign size={16} />
              {job.salary}
            </span>
          )}
        </div>

        <p className="text-black dark:text-white mt-4 line-clamp-2">
          {job.description}
        </p>

        <div className="flex justify-between items-center mt-6 text-xs text-black dark:text-white">
          <span className="flex items-center gap-2">
            <Clock size={14} /> <TimeAgo date={job.postedAt} />
          </span>
          <span className="text-blue-400 font-semibold">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
