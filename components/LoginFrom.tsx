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
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  hashedPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const LoginFrom = () => {
  const [res, setRes] = useState<any>(null);

  const [userLogin] = useUserLoginMutation();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      hashedPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res: any = await userLogin(values);
      if (res?.data?.accessToken) {
        router.push("/");
        form.reset();
        storeUserInfo({ accessToken: res?.data?.accessToken });
        toast.success("User logged in successfully!");
      } else {
        toast.error(res?.error);
        setRes(res?.error);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className=" bg-[#f8fafc] flex items-center justify-center">
      <div className="w-[80%] bg-white shadow-lg  md:w-[300px] h-auto  border  rounded-md px-4 py-8 grid grid-flow-row  auto-rows-max gap-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="exmpole@gmail.com" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hashedPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password" // Set the input type to "password"
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
          </form>

          <div className=" text-center  mt-1">
            <a href="#" className="text-slate-400 text-xs hover:text-slate-800">
              Forgot Password?
            </a>
          </div>
          <p className="text-red-600 text-sm">{res}</p>
        </Form>

        <div className="flex justify-center items-center gap-2">
          <p className="text-slate-400 text-sm">Don`t have an account?</p>
          <a href="#" className="text-slate-800 hover:text-slate-600 text-sm">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
