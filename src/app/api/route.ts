import clientPromise from "@/lib/mongodb/connect";
import GetContents from "@/lib/mongodb/service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const contents = await GetContents();

    return NextResponse.json({ status: 200, message: "success", contents });
  } catch (e) {
    console.error(e);
    NextResponse.json({ status: 500, error: "Unable to fetch contents" });
  }
}
