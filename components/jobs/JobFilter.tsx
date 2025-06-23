"use client";

import { Search, MapPin, Briefcase } from "lucide-react";

type JobFilterProps = {
  defaultValues: {
    q?: string;
    type?: string;
    location?: string;
  };
};

export default function JobFilter({ defaultValues }: JobFilterProps) {
  return (
    <div className="p-6 rounded-lg shadow-lg mb-8">
      <form className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            name="q"
            placeholder="Job title, company, or keyword"
            defaultValue={defaultValues.q || ""}
            className="w-full pl-10 pr-4 py-2 border dark:bg-slate-700 dark:text-white border-slate-700 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 text-black"
          />
        </div>

        {/* Type Select */}
        <div className="flex-1 relative">
          <Briefcase
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <select
            name="type"
            defaultValue={defaultValues.type || ""}
            className="w-full pl-10 pr-4 py-2 dark:bg-slate-700 dark:text-white border border-slate-700 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 text-black appearance-none"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        {/* Location Input */}
        <div className="flex-1 relative">
          <MapPin
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            defaultValue={defaultValues.location || ""}
            className="w-full pl-10 pr-4 py-2 border dark:bg-slate-700 dark:text-white border-slate-700 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 text-black"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
}
