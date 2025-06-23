// app/auth/signin/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // Use the official next-auth/react signIn method
import { Briefcase, Loader2 } from "lucide-react";

// It's best practice to use the signIn function from next-auth/react
// as it handles callbacks and errors automatically.
const handleLogin = () => {
  signIn("github", { callbackUrl: "/dashboard" });
};

// A separate component for the GitHub icon makes the button cleaner
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.58 0-.287-.011-1.244-.016-2.255-3.338.726-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.334-5.466-5.933 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.019.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.874.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.804 5.625-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c24-5.373 18.627 0 12 0z"
      clipRule="evenodd"
    />
  </svg>
);

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onLoginClick = () => {
    setIsLoading(true);

    handleLogin();
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] dark:bg-slate-900 bg-white text-black dark:text-white flex flex-col items-center justify-center ">
      <div className="w-full max-w-md dark:bg-slate-800 bg-white text-black hover:shadow-slate-500 dark:text-white rounded-xl shadow-xl p-8">
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="dark:bg-slate-700 bg-white text-black dark:text-white p-3 rounded-full">
            <Briefcase className="h-8 w-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white">Sign In to Jobify</h1>
          <p className="dark:text-gray-400 text-black">
            Access your dashboard, post jobs, and manage applications.
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={onLoginClick}
            disabled={isLoading}
            className="w-full flex items-center  gap-3 justify-center rounded-lg bg-slate-400 text-black dark:text-white hover:bg-slate-600 disabled:bg-slate-400 px-4 py-3  font-semibold transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Redirecting...</span>
              </>
            ) : (
              <>
                <GitHubIcon />
                <span className=" text-black dark:text-white   ">
                  Continue with GitHub
                </span>
              </>
            )}
          </button>
        </div>

        <div className="mt-8 text-xs text-center dark:text-gray-500 text-black">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-blue-400 hover:underline">
            Terms of Service
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
