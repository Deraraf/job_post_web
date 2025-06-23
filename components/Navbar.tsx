// components/Navbar.tsx
"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Menu, X, LogOut, LayoutDashboard, PlusCircle } from "lucide-react";
import { logout } from "@/lib/auth";
import { ThemeToggleButton } from "./ThemeToogle";
import logo from "../public/job_search_.jpg";

const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [{ href: "/jobs", label: "Browse Jobs" }];

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Jobify"
                width={80}
                height={110}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-slate-800 dark:text-white hidden sm:block">
                Jobify
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Actions & User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "authenticated" && (
              <Link
                href="/jobs/posts"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
              >
                Post a Job
              </Link>
            )}

            {/* This container groups the theme toggle and the auth state */}
            <div className="flex items-center justify-between space-x-4">
              {status === "loading" && (
                <div className="h-9 w-9 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
              )}
              {status === "authenticated" && (
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex text-sm bg-slate-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
                  >
                    <span className="sr-only">Open user menu</span>
                    {user?.image ? (
                      <Image
                        src={user.image}
                        width={36}
                        height={36}
                        alt="User Profile"
                        className="rounded-full"
                      />
                    ) : (
                      <span className="h-9 w-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0)}
                      </span>
                    )}
                  </button>
                  {isProfileMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-4 py-3 text-sm text-slate-600 dark:text-gray-300 border-b border-slate-200 dark:border-slate-700">
                        <p className="font-semibold text-slate-800 dark:text-white">
                          Signed in as
                        </p>
                        <p className="truncate">{user?.name}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700 w-full"
                      >
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                      <form action={logout}>
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 w-full"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
              {status === "unauthenticated" && (
                <Link
                  href="/auth/signin"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
                >
                  Sign In
                </Link>
              )}

              <ThemeToggleButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-slate-200 dark:border-slate-700">
            {status === "authenticated" ? (
              <div className="px-2 space-y-1">
                <div className="flex justify-between items-center px-3 mb-3">
                  <div className="flex items-center">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        width={40}
                        height={40}
                        alt="User Profile"
                        className="rounded-full"
                      />
                    ) : (
                      <span className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                        {user?.name?.charAt(0)}
                      </span>
                    )}
                    <div className="ml-3">
                      <div className="text-base font-medium text-slate-800 dark:text-white">
                        {user?.name}
                      </div>
                      <div className="text-sm font-medium text-slate-500 dark:text-gray-400">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                  <ThemeToggleButton />
                </div>
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <LayoutDashboard size={20} /> Dashboard
                </Link>
                <Link
                  href="/jobs/post"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <PlusCircle size={20} /> Post a Job
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </form>
              </div>
            ) : (
              <div className="px-2 space-y-4">
                <div className="flex justify-center">
                  <ThemeToggleButton />
                </div>
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-base transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
