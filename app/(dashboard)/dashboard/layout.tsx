import Link from "next/link";
import { cn } from "@/lib/clsx";
import { MainNav } from "@/components/main-nav";
import { buttonVariants } from "@/components/ui/button";
import { UserAccountNav } from "@/components/user-account-nav";
import AuthStatus from "@/components/auth-status";
import { DashboardNav } from "@/components/nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await AuthStatus();
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
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
          {user && (
            <UserAccountNav
              user={{
                name: user?.name,
                email: user?.email,
              }}
            />
          )}
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav
            items={[
              {
                title: "Posts",
                href: "/dashboard",
                icon: "post",
              },
              {
                title: "Settings",
                href: "/dashboard/settings",
                icon: "settings",
              },
            ]}
          />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
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
