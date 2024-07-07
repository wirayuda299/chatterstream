"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { User } from "@prisma/client";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { shimmer, toBase64 } from "@/utils/image-loader";

const formatNumber = (number: number) => {
  return Intl.NumberFormat("en", { notation: "compact" }).format(number);
};

type Props = {
  followers: User[];
  following: User[];
  currentUser: string;
};

export default function FollowerList({
  followers,
  following,
  currentUser,
}: Props) {
  const [activeTab, setActiveTab] = useState("followers");

  const getIndicatorStyle = useCallback((tab: string) => {
    switch (tab) {
      case "followers":
        return "left-[13%] min-[482px]:left-[17%] ";
      case "following":
        return "left-[62%] min-[482px]:left-[67%] ";
      default:
        return "left-[13%] min-[482px]:left-[17%] sm:left-[17%]";
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <p className="text-sm text-gray-500 hover:border-b hover:border-gray-500">
          {followers.length} Followers
        </p>
      </DialogTrigger>
      <DialogContent className="rounded-2xl p-0">
        <DialogTitle asChild className="relative">
          <div className="grid min-h-12 grid-cols-2 !items-start bg-[#121212] p-2 text-white">
            <button
              onClick={() => setActiveTab("followers")}
              className={cn(
                "text-lg font-semibold block text-gray-500",
                activeTab === "followers" && "text-white"
              )}
            >
              Followers
              <span className="block text-xs">
                {formatNumber(followers.length)}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("following")}
              className={cn(
                "text-lg font-semibold block text-gray-500",
                activeTab === "following" && "text-white"
              )}
            >
              Following
              <span className="block text-xs">
                {formatNumber(following.length)}
              </span>
            </button>
            <div
              className={cn(
                "w-24 transition-all ease duration-300 absolute bottom-0 h-px rounded-full bg-white",
                getIndicatorStyle(activeTab)
              )}
            ></div>
          </div>
        </DialogTitle>

        <div className="w-full space-y-3 divide-y divide-gray-500/50 p-1">
          {activeTab === "followers" &&
            followers?.map((follower) => (
              <UserItem user={follower} key={follower.id} />
            ))}

          {activeTab === "following" &&
            following.map((following) => (
              <UserItem user={following} key={following.id} />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const UserItem = ({ user }: { user: User }) => {
  return (
    <div className=" rounded-sm p-2 hover:bg-main/50">
      <Link href={`/profile/${user.id}`} className="flex items-center gap-2">
        <Image
          placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          className="size-12 rounded-full object-cover"
          src={user.image}
          width={45}
          height={45}
          alt="user"
        />
        <h3 className="text-lg text-white">{user.username}</h3>
      </Link>
    </div>
  );
};
