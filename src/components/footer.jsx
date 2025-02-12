import Separator from "@/components/separator";
import {getI18n} from "../../locales/server";

export default  async function Footer() {
    const t = await getI18n();

    return (
        <>
        <Separator/>
        <footer className={"h-56 relative bg-[#0A1A31] text-white flex flex-col justify-center"}>
            <ul className={"flex flex-col justify-center items-center gap-10 font-bold "}>
                <li> <a href={"https://starcraft2.blizzard.com/fr-fr/"} target={"_blank"}>{t("footer.1")}</a></li>
                <li>{t("footer.2")}</li>
            </ul>
            <p className={"absolute bottom-5 right-5 text-gray-500"}>{t("footer.3")}</p>
        </footer>
        </>
    )
}