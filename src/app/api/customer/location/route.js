import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await mongoose.connect(connectionStr);
        const data = await restaurantSchema.find()
        
        let result = [...new Set(data.map(item => item.city))]
    
        return NextResponse.json({success: true, message: result})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: error})        
    }
}