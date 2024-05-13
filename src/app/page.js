"use client"
import Link from "next/link";
import ClientNav from "./_components/ClientNav";
import Footer from "./_components/Footer";
import Carousel from "./_components/Carousel";
import { useEffect, useState } from "react";
import { BASE_LOCAL_URL } from "./lib/db";
import RestoList from "./_components/RestoList";
import { Divider } from "@nextui-org/react";

export default function Home() {
  const [location, setLocation] = useState([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    loadLocation()
  }, [])

  const loadLocation = async () => {
    const response = await fetch(BASE_LOCAL_URL + "/api/customer/location")
    const result = await response.json();
    if (result.success) {
      setLocation(result.message)
    }
  }

  const handleList = (city) => {
    setSelectedLocation(city)
    setHidden(false)
  }

  const blankLocation = () => {
    setSelectedLocation('')
    setHidden(false)
  }


  return (
    <main>
      <ClientNav />

      <div className="relative">

        <Carousel />
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 backdrop-blur-md p-6 rounded-md">
          <h2 className="text-white font-bold text-4xl text-center mb-3">Food Delivery App</h2>

          <div className="w-full flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 relative">
            <input
              type="text" placeholder="Select City" className="px-3 py-2 w-full sm:w-[30%] focus:outline-none rounded-lg cursor-pointer" value={selectedLocation} onClick={() => setHidden(true)} readOnly />

            {hidden && (
              <ul className="w-full sm:w-[30%] bg-white p-3 absolute sm:-left-4 top-10 rounded-b-lg">
                <li className="cursor-pointer" onClick={blankLocation}>
                  See all Restaurants
                </li>
                <Divider />
                {location &&
                  location.map((city, i) => (
                    <li key={i} className="list-none cursor-pointer" onClick={() => handleList(city)}>
                      {city}
                    </li>
                  ))}
              </ul>
            )}

            <input
              type="text" placeholder="Enter Food or Restaurant" className="px-3 py-2 w-full sm:w-[65%] focus:outline-none rounded-lg" />
          </div>
        </div>
      </div>

      <RestoList selectedLocation={selectedLocation} />

      <div className="min-h-[20dvh] flex flex-col items-center justify-center">
        <h2>Go to Restaurant Log in Page</h2>
        <button className="border border-slate-900 px-3 py-1 mt-3 rounded-lg"> <Link href="/restaurant">Click here</Link> </button>
      </div>

      <Footer />
    </main>
  );
}
