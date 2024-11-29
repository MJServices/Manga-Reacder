import { connect } from "@/utilities/DBConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { updateUser } from "@/utilities/updateDB";

export async function PUT(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    console.log("Request Body:", reqBody);
    const { username, email, id } = reqBody;
    let condition = username || email;
    if (condition) {
      if (username !== "" && email !== "") {
        const updatedUser = await updateUser({ id, username, email });
        return NextResponse.json({ success: true, updatedUser });
      } else {
        if (
          (typeof username === "string" && username !== "") ||
          (typeof email === "string" && email !== "")
        ) {
          let updatedUser = await updateUser({ username, id });
          return NextResponse.json({ success: true, updatedUser });
        } else if (
          typeof username === "string" &&
          username !== "" &&
          typeof email === "string" &&
          email !== ""
        ) {
          let updatedUser = await updateUser({ email, id });
          return NextResponse.json({ success: true, updatedUser });
        }
      }
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}
