"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function UserIMage({
  photoSize,
  imageSize,
}: {
  photoSize: string;
  imageSize: string;
}) {
  const { data, status } = useSession();

  if (status === "loading") {
    <p>...</p>;
  }

  return (
    <>
      {data?.user?.image ? (
        <Image
          src={data?.user?.image}
          alt={data?.user?.name as string}
          priority
          width={500}
          height={500}
          className={`${photoSize} cursor-pointer rounded-full transition hover:scale-105`}
        />
      ) : (
        <div
          className={`flex ${imageSize} items-center justify-center rounded-full bg-light-gray text-7xl`}
        >
          {data?.user?.name?.charAt(0).toUpperCase()}
        </div>
      )}
    </>
  );
}
