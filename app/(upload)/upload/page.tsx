import UploadForm from "@/components/upload-form";
import Link from "next/link";
import { cn } from "@/lib/clsx";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FormUpload() {
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
      <Tabs defaultValue="teleskop" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="teleskop">Teleskop</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
        </TabsList>
        <TabsContent value="teleskop">
          <Card>
            <CardHeader>
              <CardTitle>Upload Foto Hilal</CardTitle>
              <CardDescription>
                Upload foto hilal yang diambil menggunakan teleskop
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visual">
          <Card>
            <CardHeader>
              <CardTitle>Upload Foto Hilal</CardTitle>
              <CardDescription>
                Upload foto hilal yang diambil menggunakan kamera
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
