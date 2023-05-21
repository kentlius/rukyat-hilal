import Form from "@/components/auth-form";
import Link from "next/link";
import { cn } from "@/lib/clsx";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function Login() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Masuk</h3>
          <p className="text-sm text-gray-500">
            Belum punya akun?{" "}
            <Link href="/register" className="font-semibold text-gray-800">
              Daftar
            </Link>{" "}
            disini.
          </p>
        </div>
        <Form type="login" />
      </div>
    </div>
  );
}
