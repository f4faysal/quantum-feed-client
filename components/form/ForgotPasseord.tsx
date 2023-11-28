"use client";
import { useRouter } from "next/navigation";
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
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const ForgotPassword = () => {
  const [res, setRes] = useState<any>(null);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [forgotPassword] = useForgotPasswordMutation();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res: any = await forgotPassword(values);

      if (res?.data?.message) {
        form.reset();
        setIsSend(true);
        toast.success("Check your email for reset password link!");
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
        <h1 className="text-base font-bold">Forgot Password</h1>
        {isSend && (
          <p className="text-xs mt-3">
            Check your email for reset password link! <br />
            <Link href="/sign-in" className="text-blue-500 hover:underline">
              Back to Login
            </Link>
          </p>
        )}
        <Form {...form}>
          <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
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

            <div className="text-right">
              <Button type="submit" className="  mt-2  font-semibold ">
                Forgot Password
              </Button>
            </div>
          </form>

          <p className="text-red-600 text-sm">{res}</p>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
