"use client"

import { useState } from "react"
import ClientNav from "../_components/ClientNav";

export default function Cart() {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cart") || []))

    const removeFromCart = (id) => {
        const updatedCartItems = cartItems.filter(item => item._id !== id);
        setCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    }

    const increaseQuantity = (id) => {
        const updatedCartItems = cartItems.map(item => {
            if (item._id === id) {
                return { ...item, quantity: (item.quantity || 1) + 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

    const decreaseQuantity = (id) => {
        const updatedCartItems = cartItems.map(item => {
            if (item._id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

    const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    const tax = subtotal * 0.1
    const totalAmount = subtotal + tax

    return (
        <>
        <ClientNav />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cartItems.map(item => (
                            <div key={item._id} className="border rounded-md p-4 shadow-md">
                                <img src={item.path} alt={item.name} className="w-full h-32 object-cover mb-4 rounded-md" />
                                <div>
                                    <div className="flex justify-between items-center my-2">
                                        <button className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400 focus:outline-none" onClick={() => decreaseQuantity(item._id)} > - </button>

                                        <p className="text-gray-600">Quantity: {item.quantity || 1}</p>

                                        <button className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400 focus:outline-none" onClick={() => increaseQuantity(item._id)} > + </button>
                                    </div>

                                    <div className="flex justify-between items-start mt-4">
                                        <div>
                                            <h2 className="text-lg font-semibold">{item.name}</h2>
                                            <p className="text-gray-600">Price: ₹ {item.price}</p>
                                        </div>

                                        <button className=" bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none" onClick={() => removeFromCart(item._id)} > Remove </button>
                                    </div>


                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="m-auto mt-8 max-w-[600px]">
                        <p className="text-lg flex items-center justify-between border-b-1 "> <span>Total Quantity: </span> <span>{totalQuantity}</span></p>
                        <p className="text-lg flex items-center justify-between border-b-1 "><span>Subtotal:</span><span> ₹ {subtotal}</span></p>
                        <p className="text-lg flex items-center justify-between border-b-1"><span>Tax: </span><span>₹ {tax}</span></p>
                        <p className="text-lg font-semibold flex items-center justify-between border-b-1"><span>Total Amount:</span><span> ₹ {totalAmount}</span></p>
                    </div>
                </div>
            </div>
        </>
    )
};
