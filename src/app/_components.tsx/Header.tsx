"use client";

import React from "react";
import { useLoading } from "../context/LoadingContext";
import Link from "next/link";

const Header = () => {
  const { isLoading } = useLoading();

  return (
    <div className="flex justify-between items-center bg-white text-black p-2 mb-2 border-b border-gray-300">
      <Link href="/">
        <h1 className="text-base font-semibold text-sky-600">Podcaster</h1>
      </Link>
      {isLoading && (
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 bg-sky-600 border border-sky-600 rounded-full animate-pulse"></div>
          <div className="absolute inset-[-0.25rem] border-2 border-sky-600 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default Header;
