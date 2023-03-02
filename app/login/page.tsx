import Image from "next/image";
import Link from "next/link";
import Form from "@/components/form";

export default function Login() {
  return (
    <div className="flex flex-col gap-8 p-4 items-center justify-center bg-gray-50">
      <a href="/">
        <Image
          src="/logo.png"
          alt="Logo"
          className="h-auto w-auto"
          width={200}
          height={200}
        />
      </a>
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
