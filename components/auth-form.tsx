"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/clsx";
import { buttonVariants } from "@/components/ui/button";

export default function Form({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            // @ts-ignore
          }).then(({ ok, error }) => {
            setLoading(false);
            if (ok) {
              router.push("/upload");
            } else {
              toast.error(error);
            }
          });
        } else {
          const target = e.target as typeof e.target & {
            name: { value: string };
            email: { value: string };
            password: { value: string };
            yearOfBirth: { value: number };
            gender: { value: string };
            phoneNumber: { value: string };
            institution: { value: string };
          };
          const name = target.name.value;
          const email = target.email.value;
          const password = target.password.value;
          const yearOfBirth = target.yearOfBirth.value;
          const gender = target.gender.value;
          const phoneNumber = target.phoneNumber.value;
          const institution = target.institution.value;
          fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
              yearOfBirth: yearOfBirth,
              gender: gender,
              phoneNumber: phoneNumber,
              institution: institution,
            }),
          }).then(async (res) => {
            setLoading(false);
            if (res.status === 200) {
              toast.success("Account created! Redirecting to login...");
              setTimeout(() => {
                router.push("/login");
              }, 2000);
            } else {
              toast.error(await res.text());
            }
          });
        }
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      {type === "register" && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs uppercase text-gray-600"
            >
              Nama Lengkap
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="off"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="yearOfBirth"
              className="block text-xs uppercase text-gray-600"
            >
              Tahun Lahir
            </label>
            <input
              id="yearOfBirth"
              name="yearOfBirth"
              type="number"
              min="0"
              autoComplete="off"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-xs uppercase text-gray-600"
            >
              Jenis Kelamin
            </label>
            <div>
              <div className="space-x-2">
                <input type="radio" id="male" name="gender" value="Male" />
                <label htmlFor="male">Male</label>
              </div>
              <div className="space-x-2">
                <input type="radio" id="female" name="gender" value="Female" />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-xs uppercase text-gray-600"
            >
              Nomor Telepon
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              autoComplete="off"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="institution"
              className="block text-xs uppercase text-gray-600"
            >
              Institusi
            </label>
            <input
              id="institution"
              name="institution"
              type="text"
              autoComplete="off"
              required
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
        </div>
      )}
      <div>
        <label
          htmlFor="email"
          className="block text-xs uppercase text-gray-600"
        >
          Alamat Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-xs uppercase text-gray-600"
        >
          Kata Sandi
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <button className={cn(buttonVariants())} disabled={loading}>
        {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        {type === "login" ? "Masuk" : "Daftar"}
      </button>
    </form>
  );
}
