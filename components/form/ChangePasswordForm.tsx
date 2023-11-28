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

import { authKey } from "@/constants/storageKey";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { removeUserInfo } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  oldPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const ChangePasswordForm = () => {
  const [res, setRes] = useState<any>(null);
  const [isLogout, setIsLogout] = useState<boolean>(false);
  const [changePassword] = useChangePasswordMutation();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res: any = await changePassword(values);
      console.log(res);
      if (res?.data) {
        form.reset();
        setIsLogout(true);
        setRes(null);
        toast.success("Password Changed Successfully");
      } else {
        toast.error(res?.error);
        setRes(res?.error);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      <div>
        {isLogout && (
          <p>
            <span className="text-green-600">
              Password Changed Successfully
            </span>
            &nbsp;
            <span className="text-red-600  cursor-pointer underline">
              <a
                onClick={() => {
                  removeUserInfo(authKey);
                  window.location.reload();
                }}
              >
                Please Login Again
              </a>
            </span>
          </p>
        )}
      </div>
      <Form {...form}>
        <form className="mt-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Old Password" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="New Password" />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="text-right">
            <Button type="submit" className="  mt-2  font-semibold ">
              Change Password
            </Button>
          </div>
        </form>

        <p className="text-red-600 text-sm">{res}</p>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
