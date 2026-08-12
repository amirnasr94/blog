import connectDB from "@/server/config/mongoConfig";
import SignUpModel from "@/server/models/signup.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Invalid Data!" }, { status: 400 });
    }
    await connectDB();
    const isUserBeforSignedup = await SignUpModel.findOne({
      email,
    });

    if (isUserBeforSignedup) {
      return NextResponse.json(
        { message: "You have already signed up." },
        { status: 409 },
      );
    }
    const createUser = await SignUpModel.insertOne({
      name,
      email,
      password,
    });

    console.log("createUser", createUser);
    return NextResponse.json(
      { message: "SignUp was seccessflly!" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "SignUp Failed!",
        error: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 },
    );
  }
}
