export default function Note({ title, categorie, description}) {
    return <div className="w-full bg-slate-200 rounded-md py-2 px-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <h4 className="italic text-sm mb-4 opacity-50">{categorie}</h4>
        <p>{description}</p>
    </div>
}