"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HilalSearch(
  { baseUrl, placeholder }: {
    baseUrl: string,
    placeholder: string,
  }
) {
const router = useRouter();
  const [query, setQuery] = useState("");
  const filterSearch = () => {
    router.push(`${baseUrl}?query=${query}`);
  };


  return (
    <div className="flex justify-center mb-5 py-2 ">
      <input
        placeholder={placeholder}
        className="w-[40%] mx-1 rounded-md px-3 py-2 shadow-md border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-green-500 focus:ring-1 sm:text-sm  placeholder:italic placeholder:text-slate-400 text-black"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <button
        className="text-white mx-1 px-3 py-2 shadow-md rounded-md bg-green-500 hover:bg-green-600"
        onClick={() => {
          filterSearch();
        }}
      >
        Search
      </button>
    </div>
  );
}
