import mongoose, { Schema } from "mongoose"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
interface UserIneterface {
    username: string,
    email: string,
    password: string,
    role: string,
    image: string,
    authProviderId: string
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: { type: String, default: 'user' },
    image: String,
    authProviderId: String
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcryptjs.hash(this.password as string, 10)
    next()
})

export default mongoose.models?.User || mongoose.model<UserIneterface>("User", userSchema)