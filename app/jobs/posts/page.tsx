// app/jobs/post/page.tsx
"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const PostJobPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
      location: formData.get("location") as string,
      company: formData.get("company") as string,
      salary: formData.get("salary") as string,
    };

    // Basic validation
    if (
      !data.title ||
      !data.type ||
      !data.company ||
      !data.location ||
      !data.description
    ) {
      setError("Please fill out all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        router.push("/jobs/");
      } else {
        setError(result.message || "Failed to post job. Please try again.");
      }
    } catch (err) {
      console.error("An error occurred:", err);
      setError(
        "An unexpected error occurred. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] text-white py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl dark:text-white font-bold tracking-tight text-black sm:text-4xl">
            Post a New Job
          </h1>
          <p className="mt-3 text-lg dark:text-white text-black">
            Fill out the details below to find your next great hire.
          </p>
        </div>

        <div className="mt-12">
          <form
            onSubmit={handleSubmit}
            className="dark:bg-slate-800 shadow-xl bg-white dark:text-white text-black  rounded-lg p-8 space-y-8"
          >
            {/* Job Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm dark:text-text-white  text-black dark:text-white font-medium"
              >
                Job Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="mt-1 block w-full  bg-white text-black dark:text-white border dark:border-slate-700 dark:bg-slate-700 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              />
            </div>

            {/* Company and Location */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm dark:text-text-white  text-black dark:text-white font-medium"
                >
                  Company
                </label>
                <input
                  type="text"
                  required
                  name="company"
                  id="company"
                  className="mt-1 block w-full dark:bg-slate-700 bg-white text-black dark:text-white border dark:border-slate-700  border-slate-600 rounded-md py-2 px-3  shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm dark:text-text-white  text-black dark:text-white font-medium"
                >
                  Location{" "}
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  required
                  className="mt-1 block dark:bg-slate-700 bg-white text-black dark:text-white border dark:border-slate-700  w-full  border-slate-600 rounded-md py-2 px-3  shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                />
              </div>
            </div>

            {/* Job Type and Salary */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm dark:text-text-white  text-black dark:text-white font-medium "
                >
                  Job Type
                </label>
                <select
                  name="type"
                  id="type"
                  required
                  className="mt-1 block w-full dark:bg-slate-700 bg-white text-black dark:text-white boder dark:border-slate-700  border border-slate-600 rounded-md py-2 px-3  shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                >
                  <option value="">Select a type...</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="salary"
                  className="block text-sm dark:text-text-white  text-black dark:text-white font-medium"
                >
                  Salary (Optional)
                </label>
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  placeholder="e.g., $100,000 - $120,000"
                  className="mt-1 block bg-white dark:bg-slate-700 text-black dark:text-white border dark:border-slate-700  w-ful border-slate-600 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm dark:text-text-white  text-black dark:text-white font-medium"
              >
                Job Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={8}
                required
                className="mt-1 block w-full bg-white dark:bg-slate-700 text-black dark:text-white border dark:border-slate-700  w-ful border-slate-600 rounded-md py-2 px-3  shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              />
            </div>

            {/* Submission Area */}
            <div className="pt-5">
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    "Post Job Listing"
                  )}
                </button>
                {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;
