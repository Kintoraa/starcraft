import {Skeleton} from "@/components/ui/skeleton.jsx";

export default function Loading() {

    return (
        <div className={"w-full flex mt-10 flex-col justify-center text-center items-center"}>
            <h1>En cours de chargement...</h1>
        <span className="loading loading-spinner loading-xl"></span>
        </div>
    )
}