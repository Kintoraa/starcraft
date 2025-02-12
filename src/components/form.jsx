"use client"
import {useForm} from "react-hook-form";
import {useState} from "react";
import {getUser} from "@/db/controller/login.js";


export default function FormLogin() {
  const[isLogged,setIsLogged] = useState(null);
    const {
        register, handleSubmit, watch, formState: {errors},
    } = useForm()

    const onSubmit = async (data) => {
    const {email, password} = data
    const user = await getUser(email, password)
        setIsLogged(user);

    }



    return (
        <main className={"h-screen pt-80 bg-center bg-cover"}   style={{backgroundImage: `url(/image/background/login.jpg)`}}>
        {!isLogged ?
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-80 min-w-[800px] m-auto">
                <label className="text-white mb-2 font-semibold flex flex-col text-center">
                    Email
                    <input
                        {...register("email", {required: true, maxLength: 50})}
                        className="mt-2 w-60 p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                </label>
                <label className="text-white mb-2 font-semibold flex flex-col text-center">
                    Password
                    <input
                        label="password"
                        {...register("password", {required: true, maxLength: 20})}
                        className="mt-2 p-3 w-60 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                </label>
                {isLogged === false && <p className={"font-bold text-red-500"}>L'email ou le mot de passe ne correspond pas</p> }

                <input
                    type="submit"
                    className="mt-4 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none"
                />
            </form>
       : <div className={"flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-80 min-w-[800px] m-auto"}>
                <p className={"font-bold text-green-500"}>Vous êtes maintenant connecté </p>
            </div> }

        </main>

    )
}