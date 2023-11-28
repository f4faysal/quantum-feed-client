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
import { onOpen } from "@/redux/features/modal/modalSlice";
import { storeUserInfo } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Separator } from "../ui/separator";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  hashedPassword: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const LoginFrom = () => {
  const [res, setRes] = useState<any>(null);

  const dispatch = useDispatch();

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
    <div className=" flex items-center justify-center">
      <div className="w-full bg-white shadow-lg  md:w-[370px] h-auto  border  rounded-md px-4 py-5 grid grid-flow-row  auto-rows-max gap-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
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
            </div>

            <Button
              type="submit"
              className="w-full mt-2 text-xl font-semibold "
            >
              Login
            </Button>
          </form>

          <div className=" text-center  mt-1">
            <Link
              href="/forgot-password"
              className="text-blue-500 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <p className="text-red-600 text-sm">{res}</p>
        </Form>
        <Separator />
        <div className="text-center my-4  ">
          <Button
            onClick={() => dispatch(onOpen())}
            className=" text-base font-semibold  "
            variant="green"
          >
            Create new account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
