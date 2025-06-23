"use client";
import { CheckCircle, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ApplyButton = ({ jobId }: { jobId: string }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [applicationStatus, setApplicationStatus] = useState<
    "idel" | "success" | "error"
  >("idel");
  const router = useRouter();

  const handleApply = async () => {
    if (!session) {
      router.push(`/auth/signin`);
      return;
    }

    setErrorMessage("");
    setApplicationStatus("idel");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 400) {
        const error = await response.json();
        setErrorMessage(error.message);
        setApplicationStatus("error");
      } else {
        if (response.status === 201) {
          setApplicationStatus("success");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("failed to apply for job");
      }
      setApplicationStatus("error");
    }
    setIsLoading(false);
  };

  if (applicationStatus === "success") {
    return (
      <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
        <div className="flex items-center justify-center gap-2 text-green-400 font-bold">
          <CheckCircle size={20} />
          <p>Application Submitted!</p>
        </div>
        <Link
          href={`/dashboard`}
          className="mt-2 inline-block text-sm text-blue-400 hover:text-blue-300"
        >
          View your applications on the Dashboard
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleApply}
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            <span>Submitting...</span>
          </>
        ) : (
          "Apply for this Job"
        )}
      </button>
      {errorMessage && <p className="text-red-400 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default ApplyButton;
