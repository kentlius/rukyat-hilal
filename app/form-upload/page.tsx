import UploadForm from "@/components/UploadForm";
import Link from "next/link";

export default function FormUpload() {
  return (
    <div className="flex h-screen">
      <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
        <h1 className="text-4xl">Form Upload Hilal</h1>
        <Link href="/">Home</Link>
        <UploadForm />
      </div>
    </div>
  );
}
