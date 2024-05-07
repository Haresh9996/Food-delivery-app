import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    const id = params.id;
    console.log("id is",id)
    try {
        await mongoose.connect(connectionStr);
        const data = await foodSchema.findOne({_id: id})
        return NextResponse.json({success: true, message: data})        
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: false, message: error})        
    }
}

export async function PUT(request, {params}){
    const id = params.id;
    const payload = await request.json();
    try {
        await mongoose.connect(connectionStr);
        const data = await foodSchema.findOneAndUpdate({_id: id}, payload);
        return NextResponse.json({success: true, message: data})
    } catch (error) {
        console.log(error)
        return NextResponse.json({success: true, message: data})        
    }
}