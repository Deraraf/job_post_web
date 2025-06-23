// app/jobs/page.tsx
import { prisma } from "@/lib/prisma";
import JobFilter from "@/components/jobs/JobFilter";
import JobListItem from "@/components/jobs/JobListItem";
import { Job } from "@prisma/client";

// The `searchParams` prop is not a promise, it's a direct object.
// This is the correct signature.
type JobPageProps = {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
  };
};

export default async function JobsPage({ searchParams }: JobPageProps) {
  const { q, type, location } = await searchParams;

  const jobs: Job[] = await prisma.job.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
                { company: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        type ? { type } : {},
        location
          ? { location: { contains: location, mode: "insensitive" } }
          : {},
      ],
    },
    orderBy: {
      postedAt: "desc",
    },
  });

  return (
    <div className="min-h-screen dark:bg-slate-900 text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl dark:text-white  font-extrabold tracking-tight text-black sm:text-5xl">
            Find Your Next Opportunity
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            Browse through thousands of open positions in our job portal.
          </p>
        </div>

        {/* The new filter component */}
        <JobFilter defaultValues={{ q, type, location }} />

        {jobs.length > 0 ? (
          <div className="space-y-6">
            {jobs.map((job) => (
              <JobListItem key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 dark:bg-slate-800 rounded-lg">
            <h3 className="text-xl font-semibold text-white">No Jobs Found</h3>
            <p className="text-gray-400 mt-2">
              Your search did not match any jobs. Try a different keyword or
              filter.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
