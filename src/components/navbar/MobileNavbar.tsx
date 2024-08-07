"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { CirclePlus, Fingerprint, Home, Search, User } from "lucide-react";
import Link from "next/link";

export default function MobileNavbar() {
  const user = useCurrentUser();
  const isAuthenticated = user;

  return (
    <div className="absolute bottom-2 left-2 right-2 block rounded-full bg-light-gray p-5 sm:hidden">
      <nav className="flex w-full items-center justify-between px-5">
        <Link href="/">
          <Home />
        </Link>
        <Link href="/search">
          <Search />
        </Link>
        {isAuthenticated ? (
          <>
            <Link href="/create">
              <CirclePlus />
            </Link>
            <Link href={`/profile/${user?.id}`}>
              <User />
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <Fingerprint />
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}
