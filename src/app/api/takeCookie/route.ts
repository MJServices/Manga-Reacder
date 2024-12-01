import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const cookie = await cookies();
    const data = cookie.get("token");
    console.log("cookie: ", data.value);
    const result = await jwt.verify(
        data.value,
        process.env.TOKEN_SECRET as string
      );
    return NextResponse.json({ cookie: result, status: 200 });
  }