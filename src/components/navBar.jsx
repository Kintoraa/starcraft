"use client"
import {UserRound} from "lucide-react";
import {useChangeLocale, useCurrentLocale, useI18n} from "../../locales/clients";
import useSession from "@/app/lib/useSession.js";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import Link from "next/link";
import useLogout from "@/app/lib/actions/logout.js";
import {useEffect, useState} from "react";
import {create} from 'zustand'
import {useIsLogged} from "@/app/store/logged.zustand.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";

export default function NavBar() {
    const {isAuth, loading, userId} = useSession();
    const t = useI18n();

    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const changeLocale = useChangeLocale();
    const locale = useCurrentLocale();
    const logged = useIsLogged((state) => state.isLogged);



    return (
        <nav
            className={"bg-[#1C2433] h-24 w-[95%] z-50 p-4 top-4 left-1/2 -translate-x-1/2  flex fixed justify-between text-white font-bold items-center rounded-lg"}>
            <div>
                <ul className={"flex gap-4"}>
                    <li className={"cursor-pointer"}><Link href={"/counter"}> {t("navBar.1")}</Link></li>
                    <li className={"cursor-pointer"}>{t("navBar.2")}</li>
                    <li className={"cursor-pointer"}>{t("navBar.3")}</li>
                    <li className={"cursor-pointer"}>Lexique</li>
                </ul>
            </div>
            <div>
                {logged ? <IsLogged></IsLogged> :
                    <Link href="/login">
                        <UserRound className={"cursor-pointer"}></UserRound>
                    </Link>
                }
            </div>
            <select className="select select-bordered w-full max-w-32 right-5 -translate-x-1/2 absolute cursor-pointer"
                    onChange={(e) => changeLocale((e.target.value))} defaultValue={locale}>
                <option className={"bg-transparent"} value={"fr"}>{t("navBar.language.fr")}</option>
                <option className={"bg-transparent outline-none"} value={"en"}>{t("navBar.language.en")}</option>
            </select>
            <h1 className={"uppercase text-2xl left-1/2 -translate-x-1/2 absolute"}><Link href={"/"}> StarCraft 2</Link>
            </h1>
        </nav>
    )

}


export function IsLogged() {
    const logout = useLogout();
    const t = useI18n();

    return (
        <>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <Avatar className={"cursor-pointer"}>
                            <AvatarImage src="https://github.com/shadcn.png"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <a className="justify-between">
                            {t("navBar.profil.1")}
                        </a>
                    </li>
                    <li><a>    {t("navBar.profil.2")}</a></li>
                    <li className="" onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <a>{t("navBar.profil.3")}</a></li>
                    <li><a href={"/dashboard"}>dashboard</a></li>
                </ul>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <p className="py-4">    {t("navBar.modal.title")} </p>
                    <div className="modal-action">
                        <form method="dialog" className={"flex gap-4"}>
                            <button className="btn" onClick={logout}>    {t("navBar.modal.confirm")}</button>
                            <button className="btn">    {t("navBar.modal.cancel")}</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>

    )
}