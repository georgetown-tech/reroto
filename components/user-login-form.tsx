"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionResult } from "next/dist/server/app-render/types";
import { Form, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

// interface UserAuthFormProps {}

export function UserAuthForm({
  // @ts-ignore
  onSubmit,
  form,
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement> & {
  form?: UseFormReturn<{ email: string; password: string }>;
}) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <div className={cn("grid gap-6", className)}>
      <form
        method="POST"
        // @ts-ignore
        action={onSubmit}
      >
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Password123!"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              // <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              <p>Loading...</p>
            )}
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
