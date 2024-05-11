import { connectionStr } from "@/app/lib/db"
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request){
    console.log("request is",request)
    try {
        const { searchParams } = new URL(request?.url);
        const location = searchParams.get("location");
        const restaurant = searchParams.get("restaurant");

        await mongoose.connect(connectionStr);
        let filter = {}
        if(location){
            filter.city = location
        }else if(restaurant){
            filter.name = restaurant
        }
    
        const data = await restaurantSchema.find(filter)
    
        return NextResponse.json({success: true, message: data})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: true, message: data})
    }
}