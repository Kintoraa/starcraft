export default function ResourceSection({title, icon, children}) {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-3 flex items-center">
                {icon}
                <span className="ml-2">{title}</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{children}</div>
        </div>
    )
}

