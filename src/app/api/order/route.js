import { connectionStr } from "@/app/lib/db"
import { orderSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request) {
    const payload = await request.json()
    try {
        await mongoose.connect(connectionStr);
        const data = await new orderSchema(payload)
        const result = await data.save()

        return NextResponse.json({ success: true, message: result })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error })

    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request?.url);
        const userId = searchParams.get("id");
        await mongoose.connect(connectionStr)
        let data = await orderSchema.find({ user_id: userId })
        let resto_data;
        if (data) {
            resto_data = await Promise.all(
                data.map(async (item) => {
                    let restoInfo = {};
                    restoInfo.data = await restaurantSchema.findOne({ _id: item.resto_id })
                    restoInfo.amount = item.amount;
                    return restoInfo;
                })
            )
        }

        return NextResponse.json({ success: true, message: resto_data })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error })
    }
}