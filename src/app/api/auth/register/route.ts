import { Register } from "@/lib/mongodb/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.username || !body.email || !body.password) {
    return NextResponse.json({ status: 400, error: "Missing fields" });
  }

  const { error, message, status } = await Register(body);

  if (error) {
    return NextResponse.json({ status, message: message }, { status });
  }

  return NextResponse.json({ status, message }, { status });
}
