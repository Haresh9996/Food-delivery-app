import { connectionStr } from "@/app/lib/db"
import { orderSchema } from "@/app/lib/ordersModel";
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request){
    const payload = await request.json()
    try {
        await mongoose.connect(connectionStr);
        const data = await new orderSchema(payload)
        const result = await data.save()

        return NextResponse.json({success: true, message: result})  
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: error})
        
    }
}