"use client";

import Logo from "@/public/logo-white.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { testimonials } from "@/lib/sales";
import { UserAuthForm } from "@/components/user-login-form";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(formData: FormData) {
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData.entries())),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      if (response.ok) {
        router.push("/");
      } else {
        console.log(response);
        const data = await response.json();

        form.setError(
          "password",
          {
            type: "value",
            message: data.error,
          },
          { shouldFocus: true },
        );
      }
    });
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0">
      <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Sign Up
        </Link>
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-slate-950" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Link
              href="https://reroto.com"
              className={
                cn()
                // buttonVariants({ variant: "ghost" })
                // "absolute right-4 top-4 md:right-8 md:top-8"
              }
            >
              <Image src={Logo} width="140" height="100" alt="ReRoto Logo" />
            </Link>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;{testimonials[0].testimonial}&rdquo;
              </p>
              <footer className="text-sm">{testimonials[0].reviewer}</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to ReRoto
              </h1>
              <p className="text-muted-foreground text-sm">
                Enter your email and password below.
              </p>
            </div>
            <UserAuthForm
              form={form}
              // @ts-ignore
              action={onSubmit}
            />
            <p className="text-muted-foreground px-8 text-center text-sm">
              By clicking login, you agree to our{" "}
              <Link
                href="https://collegecanine.com/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="https://collegecanine.com/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Form {...form}>
      <form method="POST" action={onSubmit}>
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle>Login to ReRoto</CardTitle>
            <CardDescription>
              By signing into an account on ReRoto, you agree to the{" "}
              <Link
                className="underline hover:no-underline"
                href="https://reroto.com/terms"
              >
                Terms and Conditions
              </Link>
              .
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="joe.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Login</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
