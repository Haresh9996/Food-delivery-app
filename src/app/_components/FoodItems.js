import { useEffect, useState } from "react";
import { FcEditImage, FcFullTrash } from "react-icons/fc";
import { BASE_LOCAL_URL } from "../lib/db";
import { useRouter } from "next/navigation";

export default function FoodItems({ setAddItem }) {
    const [foodItems, setFoodItems] = useState([])
    const route = useRouter()

    useEffect(() => {
        FoodItemsData()
    }, [])

    const FoodItemsData = async () => {
        // console.log(id)
        try {
            const localData = JSON.parse(localStorage.getItem("restoUser"))
            const id = localData._id
            const data = await fetch(BASE_LOCAL_URL + "/api/restaurant/food/" + id)
            const response = await data.json();
            // console.log(response.message)
            if (response.success) {
                setFoodItems(response.message)
            } else {
                alert("You have not added any items yet.")
            }

        } catch (error) {
            console.log(error)
            alert("faild to fetch Items")
        }
    }

    const handleDelete = async (id) => {
        console.log(id)
        try {
            const data = await fetch(BASE_LOCAL_URL + "/api/restaurant/food/" + id, {
                method: "DELETE"
            })
            const response = await data.json();
            if (response.success) {
                FoodItemsData()
                alert("Item Deleted Successfully!")
                
            } else {
                alert("An error accure delete Item")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-6 py-12 mx-auto">
                    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Your Items</h1>
                    </div>

                    <div className="flex flex-wrap -m-4 ">
                        {
                            foodItems.map((item) => {
                                return (
                                    <div className="xl:w-1/4 md:w-1/3 p-4 shadow-medium relative" key={item._id}>
                                        <div className="border border-gray-200 p-6 rounded-lg">
                                            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                                </svg>
                                            </div>
                                            <div className="absolute top-10 right-10 flex items-center gap-3">
                                                <FcEditImage className="text-2xl hover:cursor-pointer" onClick={()=>route.push("/restaurant/dashboard/" + item._id)} />
                                                <FcFullTrash className="text-2xl hover:cursor-pointer" onClick={() => handleDelete(item._id)} />
                                            </div>
                                            <h5 className="text-gray-700 font-semibold title-font mb-2">{item.name}</h5>
                                            <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{item.price}</h2>
                                            <p className="leading-relaxed text-base">{item.description}</p>
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
};
