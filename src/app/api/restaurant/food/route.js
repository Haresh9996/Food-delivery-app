import { connectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodsModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        let success = false;
        const payload = await request.json()
        await mongoose.connect(connectionStr)
        const food = new foodSchema(payload)
        const result = await food.save()
        if (result) {
            success = true
        }

        return NextResponse.json({ success, message: result })

    } catch (error) {

        return NextResponse.json({ success: true, message: error })
    }
}