"use client"

import AddFoodItem from "@/app/_components/AddFoodItem";
import FoodItems from "@/app/_components/FoodItems";
import Nav from "@/app/_components/Nav";
import { useState } from "react";

export default function Dashboard() {
    const [addItem, setAddItem] = useState(false)
    return (
        <div>
            <Nav />
            <div className="flex space-x-12 items-center justify-center my-4">

                <button onClick={() => setAddItem(true)} className="border border-slate-900 rounded-lg px-2 py-1">Add Food Items</button>
                <button onClick={() => setAddItem(false)} className="border border-slate-900 rounded-lg px-2 py-1">Dashboard</button>
            </div>
            {addItem ? <AddFoodItem setAddItem={setAddItem} /> : <FoodItems />}


        </div>
    )
};
