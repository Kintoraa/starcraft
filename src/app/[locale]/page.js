import Image from "next/image";
import styles from "../page.module.css";
import parse from 'html-react-parser';
import {TriangleAlert} from "lucide-react";
import Footer from "@/components/footer";
import Section from "@/components/section";
import Separator from "@/components/separator";
import {getI18n} from "../../../locales/server";



export default async function Home() {
    const t = await getI18n();

    const ids = [1, 2, 3]

    return (
        <>
        <main
            className="flex text-center justify-center  h-screen text-white text-8xl pt-36 flex-col font-bold bg-no-repeat bg-cover "
            style={{backgroundImage: `url(/image/background/home.jpg)`}}>
            <h1>Stracraft 2</h1>
            <img src={"image/sc2/units/terran/marine.svg"} className={"w-50 h-50"}/>
            <h1>{t("home.title")}</h1>
        </main>
        <Separator/>
        <Section description={parse(t("home.story.description"))} background={"/image/background/background.jpeg"}
                 title={t("home.story.title")}>
            <p className={"text-red-500 font-bold text-center flex gap-2 justify-center"}>
                <TriangleAlert/> {t("home.story.disclaimer")} <TriangleAlert/></p>
        </Section>
        <Separator/>
        <Section description={parse(t("home.info.description"))} background={"/image/background/section_info.jpg"}
                 title={t("home.info.title")}>
            <div className={"flex justify-center gap-6 flex-col"}>
                <h2 className={"text-4xl font-bold text-center  "}>{t("home.info.features.title")}</h2>
                <p className={"max-w-[1200px] m-auto"}>{t("home.info.features.description")}</p>
                <ul className={"flex justify-between font-bold text-2xl gap-6"}>
                    {ids.map((id, i) => (
                        <>
                            <CardList key={i} t={t} titleId={id}></CardList>
                        </>
                    ))}
                </ul>
            </div>
        </Section>
    </>);
}


async function CardList({backgroundImage, titleId, descriptionId, t}) {
    return (
        <li className={"h-72 flex-1 text-center bg-cover bg-center rounded-lg flex justify-center items-center"}
            style={{backgroundImage: `url(/image/cards/cards_protoss.jpg)`}}>
            <h3>{t(`home.info.features.features.${titleId}.title`)}</h3>
        </li>
    )
}
