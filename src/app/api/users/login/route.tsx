import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { connect } from "@/utilities/DBConfig";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log("Request Body:", reqBody);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User does not exist");
            return NextResponse.json({ error: "User does not exist", success: false });
        }
        console.log("User exists:", user);

        console.log("User password hash:", user.password);
        console.time("Password compare time");
        await bcryptjs.compare(password, user.password, (err, result)=>{
            if(err){
                console.error("Error comparing password:", err);
            }
            else{
                console.log("result",result)
                let validPassword = result
                if (!validPassword) {
                    console.log("Invalid password");
                    return NextResponse.json({ error: "Invalid password" , success: false});
                }
            }
        });
        console.timeEnd("Password compare time");

        
        console.log("Password matched");

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        console.log("Token data:", tokenData);

        console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET);
        console.time("Token generation time");
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });
        console.timeEnd("Token generation time");
        console.log("Token generated:", token);

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: tokenData,
        });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        console.log("Token set in cookies");

        return response;
    } catch (error: any) {
        console.error("Error in login route:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

