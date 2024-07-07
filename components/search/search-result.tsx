"use client";

import { memo, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "lucide-react";
import type { User } from "prisma/prisma-client";
import { toast } from "sonner";
import Link from "next/link";

import FollowButton from "../shared/follow-button";
import { searchUser } from "@/actions/users";
import { showUnFollowedUser } from "@/helper/user";

export type Results = Awaited<ReturnType<typeof showUnFollowedUser>>;

type Props = {
  query: string;
  userId: string;
  followers: User[];
  defaultValues: Results["results"];
};

function SearchResult({ query, userId, followers, defaultValues }: Props) {
  const [users, setUsers] = useState<Results["results"]>(defaultValues);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchUser = useCallback(async () => {
    let res: Results["results"] = defaultValues;
    try {
      setLoading(true);
      if (query) {
        res = await searchUser(query);
      }
      setUsers(res);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [defaultValues, query]);

  useEffect(() => {
    handleSearchUser();
  }, [defaultValues, handleSearchUser, query, userId]);

  if (loading)
    return (
      <div className="flex justify-center p-2">
        <Loader className="animate-spin" size={30} />;
      </div>
    );

  return (
    <div className=" divide-y divide-gray-600/50">
      {users?.map((user) => (
        <div
          key={user.id}
          className="flex w-full items-center justify-between rounded-md p-1 hover:bg-black/20 sm:p-2"
        >
          <div className="flex items-center gap-3">
            <Image
              src={user.image}
              width={45}
              height={45}
              alt="user"
              className="size-12 rounded-full object-cover"
            />
            <div className="flex flex-col gap-2">
              <div>
                <Link
                  aria-label="profile"
                  href={`/profile/${user.id}`}
                  className="text-sm font-semibold capitalize sm:text-base"
                >
                  {user.username}
                </Link>
                <p className="text-xs text-gray-500 sm:text-sm">
                  {user.username}
                </p>
              </div>
              <p className="text-xs font-semibold sm:text-sm">
                {user.followers.length} Followers
              </p>
            </div>
          </div>
          <FollowButton
            style="bg-black text-white border border-gray-500/50 hover:bg-black/50 rounded-lg w-16 text-xs"
            userId={userId!}
            userToFollow={user.id}
            followers={followers || []}
          />
        </div>
      ))}
    </div>
  );
}

export default memo(SearchResult);
