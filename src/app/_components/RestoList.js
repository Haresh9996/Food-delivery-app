import { useEffect, useState } from "react";
import { BASE_LOCAL_URL } from "../lib/db";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Skeleton } from "@nextui-org/react";

export default function RestoList({ selectedLocation }) {

    const [restoList, setRestoList] = useState([]);
    const [loading, setLoading] = useState(true);

    const restaurantList = async () => {

        try {
            const url = selectedLocation ? `${BASE_LOCAL_URL}/api/customer?location=${selectedLocation}` : `${BASE_LOCAL_URL}/api/customer`;
            const response = await fetch(url);
            const result = await response.json();
            if (result.success) {
                setRestoList(result.message);
            }
        } catch (error) {
            console.error("Error fetching restaurant list:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        restaurantList();
    }, [selectedLocation]);


    return (
        <>
            <div className="mt-6">
                <h2 className="text-3xl text-center font-medium drop-shadow-xl">Discover the Best Eateries Near You</h2>
                <div className="flex flex-wrap gap-4 justify-center my-12">
                    {loading ? (
                        <>
                            <Card className="max-w-[400px] min-w-[300px] bg-blend-darken">
                                <CardHeader className="flex gap-3">
                                    <div className="flex flex-col">
                                        <Skeleton className="h-4 w-full" />
                                    </div>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                </CardFooter>
                            </Card>
                        </>
                    ) : (
                        restoList.map(item => (
                            <Link href={`/${item.name}?id=${item._id}`} key={item._id}>
                                <Card className="max-w-[400px] min-w-[300px]">
                                    <CardHeader className="flex gap-3">
                                        <div className="flex flex-col">
                                            <h4 className="text-lg font-bold">{item.name}</h4>
                                        </div>
                                    </CardHeader>
                                    <Divider />
                                    <CardBody>
                                        <p>Address: <span className="italic">{item.address}</span></p>
                                        <p className="font-semibold">City: {item.city}</p>
                                    </CardBody>
                                    <Divider />
                                    <CardFooter className="flex flex-col items-start">
                                        <h5 className="underline font-semibold">Reach us on</h5>
                                        <p>Email: {item.email}</p>
                                        <p>Phone: <span className="text-sky-600">{item.number}</span></p>
                                    </CardFooter>
                                </Card>
                            </Link>
                        ))
                    )}
                   
                </div>
            </div>
        </>
    );
}
