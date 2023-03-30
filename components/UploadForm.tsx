"use client";

import { useState } from "react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";

export default function UploadForm() {
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append("file", e.currentTarget.file.files[0]);
        data.append("description", e.currentTarget.description.value);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        setLoading(false);
        if (res.status === 200) {
          toast.success("Upload successful!");
        } else {
          toast.error(await res.text());
        }
      }}
      className=""
    >
      <div>
        <label htmlFor="file">File</label>
        <input type="file" id="file" name="file" accept="image/*" required />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          required
        />
      </div>
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "bg-s-green text-white hover:bg-p-green"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? <LoadingDots color="#808080" /> : <p>Submit</p>}
      </button>
    </form>
  );
}
