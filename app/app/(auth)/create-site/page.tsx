"use client";

import { createSite } from "@/lib/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const FormSchema = z.object({
  type: z.enum(["highschool", "college", "professional", "enterprise"]),
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters.",
  }),
});

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: "highschool",
      name: "",
      description: "",
    },
  });

  function onSubmit(formData: FormData) {
    createSite(formData).then((response) => {
      if (!(response instanceof Error)) {
        router.push("/api/logout");
      }
    });
  }

  return (
    <Form {...form}>
      <form method="post" action={onSubmit}>
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle>Create a Paper on ReRoto</CardTitle>
            <CardDescription>
              After creating your paper, you will be automatically logged out
              for your security.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Newspaper Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="highschool">
                          High School ($40/month)
                        </SelectItem>
                        <SelectItem value="college">
                          College ($120/month)
                        </SelectItem>
                        <SelectItem value="professional">
                          Professional ($200/month)
                        </SelectItem>
                        <SelectItem disabled value="enterprise">
                          Enterprise ($1,000+/month)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    The paper you choose influences your pricing.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Disruptive News" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your newspaper&apos;s name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Say some nice things about your newspaper."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is a description of your paper.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Create Paper</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
