import { connectionStr } from "@/app/lib/db"
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request){
    try {
        const queryParams = request.nextUrl.searchParams
        await mongoose.connect(connectionStr);
        let filter = {}
        if(queryParams.get("location")){
            filter.city = queryParams.get("location")
        }else if(queryParams.get("restaurant")){

            filter.name = queryParams.get("restaurant")
        }else{
            // filer = await 
        }
    
        const data = await restaurantSchema.find(filter)
    
        return NextResponse.json({success: true, message: data})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: true, message: data})
    }
}