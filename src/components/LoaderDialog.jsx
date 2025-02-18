export function LoaderDialog({desc}) {

    return (
        <div className={"flex items-center justify-center"}>
            <p>{desc}</p>
            <span className="loading loading-bars loading-xl "></span>
        </div>
    )
}