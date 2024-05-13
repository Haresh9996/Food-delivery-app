import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const payload = await request.json()
        const existingUser = await userSchema.findOne({ email: payload.email })
        if (payload.login) {
            const user = await userSchema.findOne({ email: payload.email, password: payload.password })
            return NextResponse.json({ success: true, message: user })
        }else if (existingUser) {
            return NextResponse.json({ success: false, message: "Email already exists" })
        } else {
            await mongoose.connect(connectionStr)
            const user = new userSchema(payload)
            const data = await user.save()

            return NextResponse.json({ success: true, message: data })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error })
    }

}