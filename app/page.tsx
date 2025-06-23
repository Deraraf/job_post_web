import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowRight, Briefcase, Zap } from "lucide-react";
import JobListItem from "@/components/jobs/JobListItem";

export default async function HomePage() {
  const recentJobs = await prisma.job.findMany({
    orderBy: {
      postedAt: "desc",
    },
    take: 4,
  });

  return (
    <div className="min-h-screen dark:bg-slate-900 text-black dark:text-white">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 text-center bg-gradient-to-b from-slate-900 to-slate-800/50">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Find Your Next <span className="text-blue-400">Tech Role</span>{" "}
            Today
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-black max-w-2xl mx-auto dark:text-white">
            The best place for developers, designers, and tech professionals to
            discover new opportunities.
          </p>
          <div className="mt-8 flex justify-center">
            <form action="/jobs" method="GET" className="w-full max-w-xl">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  name="q"
                  placeholder="Search for 'React', 'Node.js', 'Designer'..."
                  className="flex-grow px-4 py-3 bg-slate-600 border border-slate-700 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500 text-white"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  Search Jobs <ArrowRight size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Why Us? Section */}
      <section className="py-16 dark:bg-slate-900 text-black dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">Why Jobify?</h2>
            <p className="mt-2 text-lg text-gray-400">
              Simple, fast, and direct connections.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="dark:bg-slate-800 p-8 rounded-lg text-center text-black dark:text-white">
              <Zap className="mx-auto h-12 w-12 text-blue-400" />
              <h3 className="mt-6 text-xl font-semibold">
                Direct Applications
              </h3>
              <p className="mt-2 text-white shadow-lg">
                No third-party sites. Apply directly to companies and get
                noticed faster.
              </p>
            </div>
            <div className="dark:bg-slate-800 p-8 rounded-lg text-center text-black dark:text-white">
              <Briefcase className="mx-auto h-12 w-12 text-blue-400" />
              <h3 className="mt-6 text-xl font-semibold">Curated Tech Roles</h3>
              <p className="mt-2 text-white shadow-lg">
                We focus exclusively on roles in the tech industry, from
                startups to enterprise.
              </p>
            </div>
            <div className="dark:bg-slate-800 p-8 rounded-lg text-center text-black dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-12 w-12 text-blue-400"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
              </svg>
              <h3 className="mt-6 text-xl font-semibold">
                For Recruiters & Seekers
              </h3>
              <p className="mt-2 text-white shadow-lg">
                A simple, powerful dashboard for both sides of the hiring
                process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      {recentJobs.length > 0 && (
        <section className="py-4 bg-slate-800/50 mb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center pb-4">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Latest Job Openings
              </h2>
              <p className="mt-2 text-lg text-white shadow-lg pb-4">
                Be the first to apply to these fresh opportunities.
              </p>
            </div>
            <div className="mt-12 space-y-6">
              {recentJobs.map((job) => (
                <JobListItem key={job.id} job={job} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors"
              >
                Browse All Jobs <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Banners */}
      <section className="py-20 dark:bg-slate-900 text-black dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Employers */}
            <div className="dark:bg-slate-800 p-10 rounded-lg text-center flex flex-col items-center text-black dark:text-white shadow-lg">
              <h2 className="text-2xl font-bold">Hiring for a Role?</h2>
              <p className="mt-2 text-black dark:text-white max-w-sm">
                Post your job in minutes and reach thousands of qualified tech
                professionals ready to join your team.
              </p>
              <Link
                href="/jobs/posts"
                className="mt-6 inline-block bg-white hover:bg-gray-200 text-slate-900 font-bold py-3 px-6 rounded-md transition-colors"
              >
                Post a Job for Free
              </Link>
            </div>
            {/* For Job Seekers */}
            <div className="bg-blue-600 p-10 rounded-lg text-center flex flex-col items-center text-white shadow-lg">
              <h2 className="text-2xl font-bold">
                Ready to Find Your Dream Job?
              </h2>
              <p className="mt-2 dark:text-blue-100 max-w-sm text-black">
                Create an account to manage your applications and get
                personalized job alerts.
              </p>
              <Link
                href="/dashboard"
                className="mt-6 inline-block bg-white hover:bg-gray-200 text-blue-600 font-bold py-3 px-6 rounded-md transition-colors"
              >
                Go to Your Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="dark:bg-slate-800 border-t border-slate-700 shadow-lg text-black dark:text-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-black dark:text-white text-sm">
          <p>© {new Date().getFullYear()} Jobify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
