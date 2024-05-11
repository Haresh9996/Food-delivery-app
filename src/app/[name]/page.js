"use client";
import { useEffect, useState } from "react";
import ClientNav from "../_components/ClientNav";
import { BASE_LOCAL_URL } from "../lib/db";
import { Card, CardHeader, CardBody, Skeleton, Button } from "@nextui-org/react";
import Image from "next/image";
import Footer from "../_components/Footer";

export default function Page(props) {
    const { params, searchParams } = props;

    const [resto, setResto] = useState(null);
    const [foods, setFoods] = useState(null);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || [])

    const [cartIds, setcartIds] = useState(cart ? cart.map(i => i._id) : [])

    const loadRestaurants = async () => {
        try {
            const response = await fetch(BASE_LOCAL_URL + "/api/customer/" + searchParams.id);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const result = await response.json();
            setResto(result.message.restaurant);
            setFoods(result.message.foods);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadRestaurants();
    }, []);

    const handleCart = (item) => {
        const isItemInCart = cart.some((cartItem) => cartItem.name === item.name);
        if (!isItemInCart) {

            if (cart.length === 0 || cart[0].resto_id === item.resto_id) {
                setCart([...cart, item]);
                localStorage.setItem("cart", JSON.stringify([...cart, item]));
                const localItems = cartIds;
                localItems.push(item._id);
                setcartIds(localItems);
            } else {
                setCart([item]);
                localStorage.setItem("cart", JSON.stringify([item]));
                setcartIds([item._id]);
            }
        } else {
            console.log("Item already in the cart");
        }
    }

    const removeFromCart = (id) => {
        const updatedCart = cart.filter((item) => item._id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        const updatedCartIds = cartIds.filter((itemId) => itemId !== id);
        setcartIds(updatedCartIds);
    }

    return (
        <>
            <div>
                <ClientNav cart={cart} />
                <div className="relative w-full" data-carousel="slide">
                    <div className="relative h-56 overflow-hidden md:h-96">
                        <img src="https://images.pexels.com/photos/5490999/pexels-photo-5490999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="img" className="object-top" />
                        <h3 className="text-white text-4xl font-extrabold absolute top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%]">{decodeURI(params.name)}</h3>
                        <div className="absolute bottom-0 left-0 flex items-center justify-between w-full backdrop-blur-xl text-xl text-lime-100 p-2 flex-wrap">
                            <p>{resto?.city}</p>
                            <p>{resto?.email}</p>
                            <p>{resto?.number}</p>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className="mt-8 text-4xl text-center">Welcome to {resto?.name}</h3>
            <div className="flex flex-wrap lg:justify-start justify-center gap-4 my-8 px-4">
                {foods ? (
                    foods.map(item => (
                        <Card key={item.name} className="w-[270px]">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start h-[190px] rounded-xl overflow-hidden">
                                <img src={item.path} alt="Food image" className="object-cover rounded-xl" width={270} height={270} />
                                {/* <Image
                                    alt="Food image"
                                    className="object-cover rounded-xl"
                                    src={item.path}
                                    width={270}
                                    height={270}
                                /> */}
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <p className="text-tiny uppercase font-bold">{item.name}</p>
                                <p className="text-default-500 truncate">{item.description}</p>
                                <div className="flex items-center justify-between mt-3" >
                                    <p className="text-default-500">₹ {item.price}</p>
                                    {
                                        cartIds.includes(item._id) ?
                                            <Button onClick={() => removeFromCart(item._id)}>Remove from Cart</Button>
                                            :
                                            <Button onClick={() => handleCart(item)}>Add to Cart</Button>
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    ))
                ) : (
                    <Card className="w-full space-y-5 p-4" radius="lg">
                        <Skeleton className="rounded-lg">
                            <div className="h-24 rounded-lg bg-default-300"></div>
                        </Skeleton>
                        <div className="space-y-3">
                            <Skeleton className="w-3/5 rounded-lg">
                                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-4/5 rounded-lg">
                                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                            </Skeleton>
                            <Skeleton className="w-2/5 rounded-lg">
                                <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                            </Skeleton>
                        </div>
                    </Card>

                )}
            </div>
            <Footer />
        </>
    );
}
