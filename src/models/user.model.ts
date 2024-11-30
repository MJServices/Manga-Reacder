import mongoose, { Schema, Document } from "mongoose";
import bcryptjs from "bcryptjs";

interface UserInterface extends Document {
    username: string;
    email: string;
    password: string;
    role: string;
    image: string;
}

const userSchema: Schema<UserInterface> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true, 
        index: true,
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
        required: [true, "Password is required"],
    },
    role: { 
        type: String, 
        default: "user" 
    },
    image: { 
        type: String 
    },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcryptjs.hash(this.password, 10);
    next();
});

// Create or retrieve the model
const User = mongoose.models.User || mongoose.model<UserInterface>("User", userSchema);

export default User;
