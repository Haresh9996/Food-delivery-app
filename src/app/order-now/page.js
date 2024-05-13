"use client"
import { useEffect, useState } from "react";
import ClientNav from "../_components/ClientNav";
import { BASE_LOCAL_URL } from "../lib/db";
import { useRouter } from "next/navigation";


export default function OrderNow() {
    const [cartItems, setCartItems] = useState([]);
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedCartItems = localStorage.getItem("cart");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    const tax = subtotal * 0.1;
    const totalAmount = subtotal + tax;

    useEffect(() => {
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const handlePayment = async () => {

        let user_id = userData?._id
        let user_name = userData?.name
        let user_address = userData?.address + userData?.city
        let user_number = userData?.number
        let food_id = cartItems.map(item => item._id).toString()
        let resto_id = cartItems[0]?.resto_id
        let amount = totalAmount.toFixed(2)

        try {
            const response = await fetch(BASE_LOCAL_URL + "/api/order", {
                method: "POST",
                body: JSON.stringify({ user_id, user_name, user_address, user_number, food_id, resto_id, amount })
            })
            const result = await response.json()

            if (result.success) {
                router.push("/")
                localStorage.removeItem("cart")
                alert("Order placed successfully")
            } else {
                alert("something went wrong")
            }

        } catch (error) {
            console.log(error)

        }
    };

    return (
        <>
            <ClientNav />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-4">Order Summary</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userData && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4">User Information</h2>
                            <p><strong>Name:</strong> {userData.name}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Mobile:</strong> {userData.number}</p>
                            <p><strong>Address:</strong> {userData.address}</p>
                            <p><strong>City:</strong> {userData.city}</p>
                        </div>
                    )}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                        <p><strong>Total Quantity:</strong> {totalQuantity}</p>
                        <p><strong>Subtotal:</strong> ₹ {subtotal.toFixed(2)}</p>
                        <p><strong>Tax:</strong> ₹ {tax.toFixed(2)}</p>
                        <p><strong>Total Amount:</strong> ₹ {totalAmount.toFixed(2)}</p>
                    </div>
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                    {/* Add your payment method component here */}
                    <button onClick={handlePayment} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md focus:outline-none">
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </>
    );
}
