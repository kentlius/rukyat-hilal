"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/clsx";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
    >
      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="file">Foto Hilal</Label>
          <Input type="file" id="file" name="file" accept="image/*" required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Deskripsi Hilal</Label>
          <Input
            type="text"
            id="description"
            name="description"
            required
            className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          />
        </div>
        <button className={cn(buttonVariants())} disabled={loading}>
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </button>
      </div>
    </form>
  );
}
