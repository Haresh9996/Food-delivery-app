"use client"
import { useEffect, useState } from "react";
import ClientNav from "../_components/ClientNav";
import { BASE_LOCAL_URL } from "../lib/db";

export default function Profile() {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("user"));
        setUser(data || null);

        // Set id only if user is not null
        if (data && data._id) {
            const id = data._id;
            console.log("id is", id);
            myOrders(id);
        }
    }, []);

    const myOrders = async (userId) => {
        try {
            const response = await fetch(BASE_LOCAL_URL + "/api/order?id=" + userId);
            const result = await response.json();
            if (result.success) {
                setOrders(result.message);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    return (
        <>
            <ClientNav />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-semibold mb-6">My Orders</h2>
                <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {
                        orders ? orders.map((order, index) => (
                            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="px-6 py-4">
                                    <h3 className="text-lg font-semibold mb-2">Restaurant Name: {order.data.name}</h3>
                                    <p className="text-gray-600">Amount: {order.amount}</p>
                                </div>
                            </div>
                        ))
                        :
                        <h4>No orders Yet</h4>
                    }
                </div>
            </div>
        </>
    );
}
