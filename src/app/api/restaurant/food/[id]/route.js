import { connectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodsModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const id = params.id
    try {
        let success = false;
        await mongoose.connect(connectionStr)
        const data = await foodSchema.find({resto_id: id})
        if (data) {
            success = true;
        }
        return NextResponse.json({ success, message: data })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error })
    }
};

export async function DELETE(request, {params}){
    const id = params.id
    try {
        let success = false;
        await mongoose.connect(connectionStr);
        const data = await foodSchema.deleteOne({_id: id})
        if(data.deletedCount > 0){
            success = true
        }
        return NextResponse.json({success, message: data})
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, message: error })
    }
}