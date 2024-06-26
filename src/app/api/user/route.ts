import { UpdateProfile } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  if (!body.username) {
    return NextResponse.json({
      status: 400,
      error: "Username cannot be empty",
    });
  }

  const { error, status, message } = await UpdateProfile(body);

  if (error) {
    return NextResponse.json({ status, message }, { status });
  }

  return NextResponse.json({ status, message }, { status });
}
