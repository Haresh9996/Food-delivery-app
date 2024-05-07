import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await mongoose.connect(connectionStr)
        const data = await restaurantSchema.find()
        console.log(data)

        return NextResponse.json({ success: true, message: data })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error })
    }
}

export async function POST(request) {
    try {
        const payload = await request.json()
        await mongoose.connect(connectionStr)

        let data;
        let success = false;

        if (payload.Login) {
            data = await restaurantSchema.findOne({ email: payload.email, password: payload.password })
            if(data){
                success = true;
            }
        } else {
            const restaurant = new restaurantSchema(payload)
            data = await restaurant.save()
            if(data){
                success = true;
            }
        }

        // console.log(result)
        return NextResponse.json({ success, message: data })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error })
    }
}