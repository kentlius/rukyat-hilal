import Link from "next/link";
import { cn } from "@/lib/clsx";
import { MainNav } from "@/components/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { UserAccountNav } from "@/components/user-account-nav";
import AuthStatus from "@/components/auth-status";

export default async function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await AuthStatus();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav
            items={[
              {
                title: "Finder Bulan",
                href: "/finder",
              },
              {
                title: "Admin Dashboard",
                href: "/admin/dashboard",
              },
            ]}
          />
          <nav className="flex items-center gap-4">
            {user && (
              <UserAccountNav
                user={{
                  name: user?.name,
                  email: user?.email,
                }}
              />
            )}
            <Link
              href={user ? "/upload" : "/login"}
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4"
              )}
            >
              Upload
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="p-6 text-center sm:p-12">
        For{" "}
        <a
          href="https://imahnoong.com/"
          target="_blank"
          className="font-semibold hover:text-gray-300"
          rel="noreferrer"
        >
          Imahnoong
        </a>{" "}
        🔭
      </footer>
    </div>
  );
}
