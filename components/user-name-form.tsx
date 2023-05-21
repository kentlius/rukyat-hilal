"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

import { cn } from "@/lib/clsx";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import toast from "react-hot-toast";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "name">;
}

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  return (
    <form
      className={cn(className)}
      onSubmit={async (e) => {
        e.preventDefault();
        setIsSaving(true);

        const response = await fetch(`/api/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: e.target.name.value
          }),
        });

        setIsSaving(false);

        if (!response?.ok) {
          return toast("Something went wrong.");
        }

        toast("Your name has been updated.");

        router.refresh();
      }}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your Name</CardTitle>
          <CardDescription>
            Please enter your full name or a display name you are comfortable
            with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              className="w-[400px]"
              size={32}
            />
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
}
