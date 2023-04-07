import UploadForm from "@/components/UploadForm";
import Link from "next/link";

export default function FormUpload() {
  return (
    <div className="flex h-screen">
      <div className="flex h-screen w-screen flex-col items-center justify-center space-y-5">
        <h1 className="text-4xl">Form Upload Hilal</h1>
        <Link href="/">Home</Link>
        <UploadForm />
      </div>
    </div>
  );
}
