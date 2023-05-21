import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import AuthStatus from "@/components/auth-status";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import Link from "next/link";
import { cn } from "@/lib/clsx";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await AuthStatus();
  
  if (!user) {
    redirect("/login");
  }

  const hilals = await prisma.hilal.findMany({
    where: {
      ownerId: user.id,
    },
    include: {
      images: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <Link
          href="/upload"
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "px-4"
          )}
        >
          Upload
        </Link>
      </DashboardHeader>
      <div>
        {hilals?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {hilals.map((hilal) => (
              <Link
                key={hilal.id}
                href={`/hilal/${hilal.id}`}
                className="after:content after:shadow-highlight group relative block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg"
              >
                <Image
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  src={hilal.images[0].url}
                  alt={hilal.description}
                  width={720}
                  height={480}
                  sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                  priority
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-bold">No posts yet.</h2>
            <p className="text-center text-lg text-muted-foreground">
              Get started by creating your first post.
            </p>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
