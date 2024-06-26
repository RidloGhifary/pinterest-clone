"use client";

import UserIMage from "@/components/UserImage";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useCallback } from "react";
import Share from "./Share";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function UserCard() {
  const { status, data } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  if (status === "loading") {
    return <p>...</p>;
  }

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
        <p className="text-gray-500">{data?.user?.email?.split("@")[0]}</p>
      </div>
      <div className="flex items-center gap-5">
        <Share />
        <button
          onClick={() =>
            router.push(pathname + "?" + createQueryString("edit", "true"))
          }
          className="rounded-full bg-light-gray px-6 py-3 hover:bg-light-gray/80"
        >
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
