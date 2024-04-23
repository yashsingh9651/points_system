"use client";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-5 text-gray-900">
      <h1 className="text-9xl font-black font-PermanentMarker">OOPS!</h1>
      <h2 className="text-3xl font-semibold">404 - Page Not Found</h2>
      <p className="text-lg font-medium text-center">
        The page you are looking for might have been removed <br /> had its name
        chaged or is temporarly unavailable
      </p>
      <Link href="/" className="px-4 py-2 text-gray-50 bg-blue-800 hover:bg-blue-700 hover:scale-105 duration-200 rounded-full text-xl">
        Go To Home
      </Link>
    </div>
  );
}
