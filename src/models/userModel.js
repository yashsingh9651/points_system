import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    occupation: {
        type: String,
        required: [true, "Please provide your Occupation"],
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
    points: {
        type: Number,
        default: 0,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;