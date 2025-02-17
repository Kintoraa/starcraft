"use client"
import {useForm} from "react-hook-form";
import {useState} from "react";
import {getUser} from "@/db/controller/login.js";
import {useRouter} from 'next/navigation'
import {useIsLogged} from "@/app/store/logged.zustand.js";
import {useI18n} from "../../locales/clients.js";


export default function FormLogin() {
    const [isGoodLogin, setGoodLogin] = useState(null);
    const t = useI18n();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const logged = useIsLogged((state) => state.isLogged);
    const setLogged = useIsLogged((state) => state.setLogged)
    const {
        register, handleSubmit, watch, formState: {errors},
    } = useForm()

    const onSubmit = async (data) => {
        setIsLoading(true);
        const {email, password} = data
        const user = await getUser(email, password)
        setIsLoading(false);
        setGoodLogin(user);

        if (user) {
            setGoodLogin(true);
            setLogged(true)
            router.push("/")
        }
    }

    return (
        <main
            className="h-screen pt-80 bg-center bg-cover"
            style={{backgroundImage: `url(/image/background/login.jpg)`}}
        >
            {!logged ? (
                !isLoading ? (
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-80 min-w-[800px] m-auto"
                        >
                            <label className="text-white mb-2 font-semibold flex flex-col text-center">
                                Email
                                <input
                                    {...register("email", {required: true})}
                                    className="mt-2 w-60 p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                                />
                            </label>

                            <label className="text-white mb-2 font-semibold flex flex-col text-center">
                                {t("login.password")}
                                <input
                                    type="password"
                                    {...register("password", {required: true})}
                                    className="mt-2 p-3 w-60 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                                />
                            </label>

                            <p className="font-bold text-orange-500">{t("login.disclaimer")}</p>

                            {isGoodLogin === false && (
                                <div role="alert" className="alert alert-error bg-red-500 flex">
                                    <p className="font-bold text-center text-white">{t("login.error")}</p>
                                </div>
                            )}

                            <input
                                type="submit"
                                className="mt-4 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none"
                            />
                        </form>
                    )
                    :
                    (
                        <div
                            className={"flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-80 min-w-[800px] m-auto"}>
                            <span className="loading loading-bars loading-xl"></span>
                        </div>
                    )
            ) : (
                <div
                    className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-80 min-w-[800px] m-auto">
                    <div role="alert" className="alert alert-success">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <p className="font-bold text-white">{t("login.connected")}</p>
                    </div>
                </div>
            )}
        </main>
    );

}