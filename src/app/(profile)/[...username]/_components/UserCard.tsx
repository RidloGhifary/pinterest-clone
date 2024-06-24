import Image from "next/image";

export default function UserCard() {
  return (
    <div className="mx-auto grid w-full place-items-center space-y-4">
      <div className="flex h-36 w-36 items-center justify-center rounded-full bg-light-gray text-7xl">
        R
      </div>
      <h2 className="text-6xl font-semibold">ridloo0</h2>
      <div className="flex items-center gap-1">
        <Image
          src="/logo.png"
          alt="pinterest"
          width={20}
          height={20}
          priority
          className="opacity-70 grayscale"
        />
        <p className="text-gray-500">ridloghfry</p>
      </div>
      <div className="flex items-center gap-5">
        <button className="rounded-full bg-light-gray px-6 py-3 hover:bg-light-gray/80">
          Share
        </button>
        <button className="rounded-full bg-light-gray px-6 py-3 hover:bg-light-gray/80">
          Edit
        </button>
      </div>
    </div>
  );
}
