// app/dashboard/page.tsx
import { auth } from "@/auth";
import TimeAgo from "@/components/TimeAgo";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Briefcase, MapPin, PlusCircle, Users } from "lucide-react";
import { Prisma } from "@prisma/client";

// Type for a Job object that INCLUDES the count of its applications.
type JobWithApplicationCount = Prisma.JobGetPayload<{
  include: { _count: { select: { applications: true } } };
}>;

// Type for an Application object that INCLUDES the full related Job object.
type ApplicationWithJob = Prisma.ApplicationGetPayload<{
  include: { job: true };
}>;

// Helper for status badge styling
const getStatusClasses = (status: string) => {
  switch (status) {
    case "UNDER_REVIEW":
      return "bg-yellow-500/10 text-yellow-400";
    case "REJECTED":
      return "bg-red-500/10 text-red-400";
    case "OFFER_EXTENDED":
      return "bg-green-500/10 text-green-400";
    default:
      return "bg-blue-500/10 text-blue-400"; // APPLIED
  }
};

const DashboardPage = async () => {
  const session = await auth();
  if (!session?.user?.id) return redirect("/auth/signin");

  const [applications, postedJobs] = await Promise.all([
    prisma.application.findMany({
      where: { userId: session?.user?.id },
      include: { job: true },
      orderBy: { appliedAt: "desc" },
    }),
    prisma.job.findMany({
      where: { postedById: session?.user?.id },
      include: { _count: { select: { applications: true } } },
      orderBy: { postedAt: "desc" },
    }),
  ]);

  return (
    <div className="min-h-screen dark:bg-slate-900 text-black dark:text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight dark:text-white text-black mb-10">
          Dashboard
        </h1>

        {/* Section: My Posted Jobs */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">My Posted Jobs</h2>
            <Link
              href="/jobs/post"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <PlusCircle size={20} /> Post a New Job
            </Link>
          </div>
          {postedJobs.length === 0 ? (
            <div className="text-center py-10 px-6 bg-slate-800 rounded-lg">
              <p className="text-black dark:text-white ">
                You haven&pos;t posted any jobs yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(postedJobs as JobWithApplicationCount[]).map((job) => (
                <div
                  key={job.id}
                  className="dark:bg-slate-800 hover:shadow-slate-600 bg-white text-black dark:text-white rounded-lg shadow-lg p-6 flex flex-col justify-between dark:hover:shadow-blue-500/20 transition-shadow"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {job.title}
                    </h3>
                    <p className="dark:text-white text-black text-sm mb-4">
                      {job.company}
                    </p>
                    <div className="flex flex-col gap-2 text-sm text-black dark:text-white mb-4">
                      <span className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-500" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Briefcase
                          size={16}
                          className="text-black dark:text-white"
                        />
                        {job.type}
                      </span>
                    </div>
                    <p className="text-xs text-black/50 dark:text-white/50 mb-4">
                      Posted <TimeAgo date={job.postedAt} />
                    </p>
                  </div>
                  <div className="border-t dark:border-slate-700 border-white text-black dark:text-white pt-4 flex justify-between items-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400">
                      <Users size={16} /> {job._count.applications} Applications
                    </span>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-blue-400 hover:text-blue-300 font-medium text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section: My Applications */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">My Applications</h2>
          {applications.length === 0 ? (
            <div className="text-center py-10 px-6 dark:bg-slate-800 text-black dark:text-white  bg-white rounded-lg">
              <p className="text-gray-400">
                You haven&pos;t applied to any jobs yet.
              </p>
              <Link
                href="/jobs"
                className="mt-4 inline-block text-blue-400 hover:text-blue-300 font-medium"
              >
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {(applications as ApplicationWithJob[]).map((app) => (
                <div
                  key={app.id}
                  className="dark:bg-slate-800 bg-white text-black dark:text-white rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-white">
                      {app.job.title}
                    </h3>
                    <p className="text-sm dark:text-gray-400 text-black ">
                      {app.job.company}
                    </p>
                    <p className="text-xs dark:text-gray-500 text-black mt-1">
                      Applied <TimeAgo date={app.appliedAt} />
                    </p>
                  </div>
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(
                        app.status
                      )}`}
                    >
                      {app.status.replace("_", " ")}
                    </span>
                    <Link
                      href={`/jobs/${app.jobId}`}
                      className="text-blue-400 hover:text-blue-300 font-medium text-sm whitespace-nowrap"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
