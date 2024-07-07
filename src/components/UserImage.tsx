import { ExtendedUser } from "../../next-auth";
import Image from "next/image";

import { useCurrentUser } from "@/hooks/use-current-user";

export default function UserIMage({
  photoSize,
  imageSize,
}: {
  photoSize: string;
  imageSize: string;
}) {
  const user: ExtendedUser | any = useCurrentUser();

  return (
    <>
      {user?.image ? (
        <Image
          src={user?.image}
          alt={user?.name as string}
          priority
          width={500}
          height={500}
          className={`${photoSize} cursor-pointer rounded-full transition hover:scale-105`}
        />
      ) : (
        <div
          className={`flex ${imageSize} items-center justify-center rounded-full bg-light-gray`}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      )}
    </>
  );
}
