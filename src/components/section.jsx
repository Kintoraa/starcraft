export default function Section({ description, title, background, color = "red", children }) {

    // fetch("/api/session")
    return (
        <section
            className=" text-white p-8 flex flex-col gap-6 min-h-[600px] "
            style={{
                backgroundImage: background
                    ? `url(${background})`
                    : "",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <h1 className="text-center uppercase font-bold text-4xl">{title}</h1>
            <p className="max-w-[1200px] m-auto">{description}</p>
            {children}
        </section>
    );
}
