"use client"
import { useEffect, useState } from "react"
import { FaRegWindowClose } from "react-icons/fa";
import { BASE_LOCAL_URL } from "@/app/lib/db"
import { useRouter } from "next/navigation";

export default function UpdateFoodItem({ params }) {
    const id = params.itemId;
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [path, setPath] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name || !price || !description) {
            setError(true)
            return false;
        } else {
            setError(false)
        }
        const response = await fetch(BASE_LOCAL_URL + "/api/restaurant/food/update/" + id, {
            method: "PUT",
            body: JSON.stringify({ name, price, path, description })
        })
        const data = await response.json()
        if(data.success){
            router.push("/restaurant/dashboard")
        }else{
            alert("Faild to Update Item!")
        }
    }
    useEffect(() => {
        handleUpdate()
    }, [])
    const handleUpdate = async () => {
        try {
            const response = await fetch(BASE_LOCAL_URL + "/api/restaurant/food/update/" + id)
            const data = await response.json()
            if (data.success) {
                const { name, price, path, description } = data.message;
                setName(name);
                setPrice(price)
                setPath(path)
                setDescription(description)
            }
        } catch (error) {
            console.log(error)
            alert("Faild to fetch Item")
        }
    }

    return (
        <>
            <div className="border-large m-auto my-12 rounded-xl shadow-large max-w-[900px]">

                <div className="p-6 space-y-4 md:space-y-6 sm:p-8 relative">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Update Food Item
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <FaRegWindowClose className="absolute top-10 right-8 text-2xl text-red-600 cursor-pointer" onClick={() => router.push("/restaurant/dashboard")} />
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Food Name</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter food name" required="" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        {error && !name ? <p className="text-red-600">Please add valid Item Name</p> : null}
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Food Price</label>
                            <input type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Food Price" required="" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        {error && !price ? <p className="text-red-600">Please add Item Price</p> : null}
                        <div>
                            <label htmlFor="img" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Image</label>
                            <input type="text" name="img" id="img" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Add image here" required="" value={path} onChange={(e) => setPath(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Food Description</label>
                            <input type="text" name="desc" id="desc" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Food description" required="" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        {error && !description ? <p className="text-red-600">Please add Item Description</p> : null}

                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            onClick={handleSubmit}>Updage Item</button>
                    </form>
                </div>
            </div>

        </>
    )
};
