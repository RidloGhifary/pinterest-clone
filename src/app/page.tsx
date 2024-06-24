"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <h1 className="text-3xl font-bold underline">
      Hello, <strong>World!</strong>
    </h1>
  );
}
