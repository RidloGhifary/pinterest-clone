import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pinterest Clone",
  description: "Generated for learning Next.js",
};

export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello, <strong>World!</strong>
    </h1>
  );
}
