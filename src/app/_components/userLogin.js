"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BASE_LOCAL_URL } from "../lib/db"

export default function UserLogin({ searchParams }) {

    // console.log("props from user login", searchParams.login)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) {
            return;
        }

        const response = await fetch(BASE_LOCAL_URL + "/api/user", {
            method: "POST",
            body: JSON.stringify({ email, password, login: true })
        })
        if (response.ok) {
            const result = await response.json()

            if (result.success) {
                alert("User Login succefully")
                const { message } = result;
                delete message.password;
                localStorage.setItem("user", JSON.stringify(message));

                if (searchParams?.login) {
                    router.push("/cart")
                } else {
                    router.push("/")
                }

            } else {
                alert("Something went wrong")
            }
        }
    }

    const validateForm = () => {
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            alert("Please enter a valid email address");
            return false;
        }
        if (!password.trim() || password.length < 6) {
            alert("Password must be at least 6 characters long");
            return false;
        }

        return true;
    };
    return (
        <>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                LOG IN
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
                {/* <div className="flex space-x-4"> */}

                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required=""
                        value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autoComplete="true" required=""
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {/* </div> */}

                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleSubmit}>Log In</button>

            </form>
        </>
    )
};
