import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { VerifyOtp } from "@/lib/mongodb/service";

export async function POST(request: NextRequest) {
  const { otpCode } = await request.json();
  const cookieStore = cookies();
  const userEmail = cookieStore.get("user");

  if (!otpCode || !userEmail) {
    return NextResponse.json(
      { status: 400, error: "Missing fields" },
      { status: 400 },
    );
  }

  const { error, message, status } = await VerifyOtp({
    otpCode,
    userEmail: userEmail?.value as string,
  });

  cookies().delete("user");

  if (error) {
    return NextResponse.json({ status, message: message }, { status });
  }

  return NextResponse.json({ status, message }, { status });
}
