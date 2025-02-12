"use client"
import {UserRound} from "lucide-react";
import {useChangeLocale, useCurrentLocale, useI18n} from "../../locales/clients";
import {useEffect, useState} from "react";
import useSession from "@/app/lib/useSession.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link.js";
import useLogout from "@/app/lib/actions/logout.js";

export default  function NavBar() {
    const t = useI18n();
    const changeLocale = useChangeLocale();
    const locale = useCurrentLocale();
    const {isAuth, loading} = useSession();



    return (
        <nav
            className={"bg-[#1C2433] h-24 w-[95%] p-4 top-4 left-1/2 -translate-x-1/2  flex fixed justify-between text-white font-bold items-center rounded-lg"}>
            <div>
                <ul className={"flex gap-4"}>
                    <li className={"cursor-pointer"}>{t("navBar.1")}</li>
                    <li className={"cursor-pointer"}>{t("navBar.2")}</li>
                    <li className={"cursor-pointer"}>{t("navBar.3")}</li>
                </ul>
            </div>
            <div>
                {isAuth ? <IsLogged></IsLogged> :
                <Link href="/login">
                <UserRound className={"cursor-pointer"}></UserRound>
                </Link>
            }
            </div>
            <select className={"border-b outline-none uppercase   right-5 -translate-x-1/2 absolute cursor-pointer "} defaultValue={locale}
                    onChange={(e) => changeLocale((e.target.value))}>
                <option className={"bg-transparent"} value={"fr"}>Francais</option>
                <option className={"bg-transparent outline-none"} value={"en"}>Anglais</option>
            </select>
            <h1 className={"uppercase text-2xl left-1/2 -translate-x-1/2 absolute"}>StarCraft 2</h1>
        </nav>
    )

}


export function IsLogged() {


    function logout() {
        useLogout();
        console.log("logout")
    }

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
                        Profile
                    </a>
                </li>
                <li><a>Parametre</a></li>
                <li className="" onClick={()=>document.getElementById('my_modal_1').showModal()}><a>Deconnexion</a></li>
            </ul>
        </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <p className="py-4">Vous voulez vraiment vous deconnecter ? </p>
                    <div className="modal-action">
                        <form method="dialog" className={"flex gap-4"}>
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn" onClick={() => logout()} >Déconnexion</button>
                            <button className="btn">Annuler</button>
                        </form>
                    </div>
                </div>
            </dialog>
</>

)
}