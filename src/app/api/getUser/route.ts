"use server";

import mongoose from "mongoose";
import { connect } from "@/utilities/DBConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

// Define a type for the user object with additional fields
interface UserType {
  _id: string;
  username: string;
  email: string;
  role: string;
}

// Function to validate MongoDB ObjectId format
function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const reqBody = await req.json();
    const { id } = reqBody;

    console.log("Received ID:", id);

    // Ensure the database is connected
    await connect();

    // Validate the presence and format of the ID
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: "Invalid User ID format" },
        { status: 400 }
      );
    }

    // Fetch the user from the database
    const objectId = new mongoose.Types.ObjectId(id);
    const user = await User.findById(objectId).lean();

    // Check if user exists and has required fields
    if (!user || !user._id || !user.username || !user.email) {
      return NextResponse.json(
        { error: `User with ID: ${id} not found or missing required fields` },
        { status: 404 }
      );
    }

    // Prepare and return the response
    const response: UserType = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role || "user", // Default role to "user" if not specified
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the user" },
      { status: 500 }
    );
  }
}
