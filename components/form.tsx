"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
// import Link from "next/link";
import { useRouter } from "next/navigation";

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
              router.push("/form-upload");
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
              className="block text-xs text-gray-600 uppercase"
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
              className="block text-xs text-gray-600 uppercase"
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
              className="block text-xs text-gray-600 uppercase"
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
              className="block text-xs text-gray-600 uppercase"
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
              className="block text-xs text-gray-600 uppercase"
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
          className="block text-xs text-gray-600 uppercase"
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
          className="block text-xs text-gray-600 uppercase"
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
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "bg-s-green text-white hover:bg-p-green"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === "login" ? "Masuk" : "Daftar"}</p>
        )}
      </button>
      {/* {type === "login" ? (
        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-gray-800">
            Sign up
          </Link>{" "}
          here.
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-gray-800">
            Sign in
          </Link>{" "}
          instead.
        </p>
      )} */}
    </form>
  );
}
