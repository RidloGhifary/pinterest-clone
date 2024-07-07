import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Pinterest Clone",
  description: "Generated for learning Next.js",
};

// export async function GetPhotos() {
//   try {
//     const res = await fetch("https://picsum.photos/v2/list");
//     const data = await res.json();
//     return data;
//   } catch (e) {
//     console.error(e);
//   }
// }

export default async function Home() {
  // const datas = await GetPhotos();

  return (
    <div className="columns-5 gap-3">
      {/* {datas?.map((data: any) => (
        <Image
          src={data?.download_url}
          alt={data?.author}
          width={500}
          height={500}
          key={data?.id}
          loading="lazy"
          className="mb-3 rounded-lg"
        />
      ))} */}
    </div>
  );
}
