"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import type { User } from "@prisma/client";
import { z } from "zod";
import { toast } from "sonner";
import { Lock } from "lucide-react";

import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Button } from "../ui/button";
import { updateUser } from "@/actions/users";

const schema = z.object({
  bio: z.string(),
  link: z.string(),
});

export default function EditProfile({ user }: { user: User }) {
  const { userId } = useAuth();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      bio: (user.bio as string) ?? "",
      link: (user.link as string) ?? "",
    },
  });

  const isChange = form.formState.isDirty;
  const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  const pathname = usePathname();

  const handleUpdateUser = async (data: z.infer<typeof schema>) => {
    try {
      await updateUser(user.id, data.bio, data.link, pathname).then(() =>
        toast.success("User updated")
      );
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  if (user.id !== userId) return null;
  return (
    <div className="py-5">
      <Dialog>
        <DialogTrigger asChild>
          <button className="mt-7 w-full rounded-md border border-gray-500/50 p-1.5">
            Edit profile
          </button>
        </DialogTrigger>
        <DialogContent className="bg-main">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdateUser)}
              className="space-y-3 divide-y divide-gray-500 divide-opacity-50"
            >
              <div className="flex items-center justify-between ">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="text-lg font-semibold text-white"
                  >
                    Name
                  </label>
                  <div className="flex items-center gap-1">
                    <Lock color="#fff" size={15} />
                    <input
                      className="h-6 w-full select-none bg-transparent p-1.5 text-lg text-white "
                      defaultValue={user.username}
                      type="text"
                      id="name"
                      disabled
                    />
                  </div>
                </div>
                <Image
                  src={user.image}
                  width={50}
                  height={50}
                  alt="user"
                  className="size-12 rounded-full object-cover"
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="pt-2">
                    <FormLabel className="text-lg font-semibold text-white ">
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        max={50}
                        maxLength={50}
                        className="h-6 border-none bg-transparent py-0 ring-0"
                        placeholder="Add bio..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem className="pt-2">
                    <FormLabel className="text-lg font-semibold text-white ">
                      Link
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-6 border-none bg-transparent py-0 ring-0"
                        placeholder="Add link..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                disabled={!isValid || isSubmitting || !isChange}
                className="w-full !bg-white text-black"
              >
                Done
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
