"use client";

import { useSearchParams } from "next/navigation";
import User from "./_components/User";
import Edit from "./_components/Edit";

export default function Profile() {
  const searchParams = useSearchParams();
  const search = searchParams.get("edit");

  return (
    <div className="space-y-5 py-8 text-center">
      {!search ? (
        <>
          <User />
        </>
      ) : (
        <Edit />
      )}
    </div>
  );
}
