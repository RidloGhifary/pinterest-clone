"use client";

import UserIMage from "@/components/UserImage";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useMemo } from "react";
import Share from "./Share";

export default function UserCard() {
  const { status, data } = useSession();

  if (status === "loading") {
    <p>...</p>;
  }

  const GetUsernameFromEmail = useMemo(() => {
    return (email: string): string => {
      return email?.split("@")[0];
    };
  }, []);

  return (
    <div className="mx-auto grid w-full place-items-center space-y-4">
      <UserIMage photoSize="h-28 w-28" imageSize="h-36 w-36" />
      <h2 className="text-6xl font-semibold">{data?.user?.name}</h2>
      <div className="flex items-center gap-1">
        <Image
          src="/logo.png"
          alt="pinterest"
          width={20}
          height={20}
          priority
          className="opacity-70 grayscale"
        />
        <p className="text-gray-500">
          {GetUsernameFromEmail(data?.user?.email as string)}
        </p>
      </div>
      <div className="flex items-center gap-5">
        <Share />
        <button className="rounded-full bg-light-gray px-6 py-3 hover:bg-light-gray/80">
          Edit
        </button>
        <button
          onClick={() => signOut()}
          className="rounded-full bg-red-blood px-6 py-3 text-light-gray hover:bg-red-blood/80"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
