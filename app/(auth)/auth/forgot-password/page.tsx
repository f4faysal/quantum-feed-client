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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

const ForgotPassword = () => {
  const [res, setRes] = useState<any>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      // if (res?.data?.accessToken) {
      //   router.push("/");
      //   form.reset();
      //   storeUserInfo({ accessToken: res?.data?.accessToken });
      //   toast.success("User Sign up successfully!");
      // } else {
      //   toast.error(res?.error);
      //   setRes(res?.error);
      // }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Email address" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <div className="text-center">
              <Button
                type="submit"
                className=" px-16 mt-2 text-xl font-semibold "
                variant={"green"}
              >
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
