"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z.string().optional(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const ResetPassword = () => {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  console.log(email, token);
  const [res, setRes] = useState<any>(null);
  const [resetPassword] = useResetPasswordMutation();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res: any = await resetPassword({
        token: token || "",
        newPassword: values.password,
      });
      if (res?.data) {
        form.reset();
        toast.success("Password reset successfully");
        router.push("/sign-in");
      } else {
        toast.error(res?.error);
        setRes(res?.error);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="border md:bg-white px-5 py-9 rounded-sm shadow-md w-80">
        <h1 className="text-base font-bold">Reset Password</h1>

        <Form {...form}>
          <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              disabled={true}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email address" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nwe password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="New password"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="text-right">
              <Button type="submit" className="  mt-2  font-semibold ">
                Reset
              </Button>
            </div>
          </form>

          <p className="text-red-600 text-sm">{res}</p>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
