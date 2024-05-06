import { useRouter } from "next/navigation"
import { useState } from "react"
import { BASE_LOCAL_URL } from "../lib/db"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password)

        try {
            let response = await fetch(BASE_LOCAL_URL+"/api/restaurant", {
                method: "POST",
                body: JSON.stringify({ email, password, Login: true })
            })
            response = await response.json()

            if (response.success) {
                const {message} = response;
                delete message.password;

                localStorage.setItem("restoUser", JSON.stringify(message))
                router.push("/restaurant/dashboard")
                alert("Restaurant Login Succesfully")

            } else {
                alert("Failed to Login restaurant");
            }
        } catch (error) {
            console.log(error)
            alert("An error occurred while Logging in restaurant");
        }

    }
    return (<>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Log In
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" autoComplete="true"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={handleSubmit}>Create an account</button>
        </form>

    </>)
};
