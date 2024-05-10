import { connectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodsModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose"
import { NextResponse } from "next/server";

export async function GET(request, response){
    try {
        const id = response.params.id
        await mongoose.connect(connectionStr);
        const restaurant = await restaurantSchema.findOne({_id: id})
        const foods = await foodSchema.find({resto_id: id})
    
        return NextResponse.json({success: true, message: {restaurant, foods}})
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: false})
    }
}