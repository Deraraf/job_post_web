import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import TimeAgo from "@/components/TimeAgo";
import ApplyButton from "./ApplyButton"; // Assuming ApplyButton is in the same folder or adjust path
import { Briefcase, MapPin, DollarSign, Clock, ArrowLeft } from "lucide-react";

const JobPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id },
    include: { postedBy: true },
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen text-white py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6"
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </Link>
        <div className="bg-slate-800 shadow-lg rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-white mb-2">{job.title}</h1>
            <p className="text-xl text-gray-300 mb-4">{job.company}</p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-400 mb-6">
              <span className="flex items-center gap-2">
                <MapPin size={16} /> {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Briefcase size={16} /> {job.type}
              </span>
              {job.salary && (
                <span className="flex items-center gap-2">
                  <DollarSign size={16} /> {job.salary}
                </span>
              )}
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-8">
              <span className="flex items-center gap-2">
                <Clock size={14} /> Posted <TimeAgo date={job.postedAt} /> by{" "}
                {job.postedBy?.name}
              </span>
            </div>

            <div className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="whitespace-pre-wrap">{job.description}</div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700">
              <ApplyButton jobId={job.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
