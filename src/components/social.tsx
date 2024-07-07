"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || "/",
    });
  };

  return (
    <div className="flex w-full items-center gap-x-2">
      <button
        type="button"
        className="w-full rounded-md border border-gray-300 p-2"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="mx-auto h-5 w-5" />
      </button>

      <button
        type="button"
        className="w-full rounded-md border border-gray-300 p-2"
        onClick={() => onClick("github")}
      >
        <FaGithub className="mx-auto h-5 w-5" />
      </button>
    </div>
  );
};
