import { MdDelete } from "react-icons/md"
import { FaPenSquare } from "react-icons/fa"
import { useDeleteNoteMutation } from "../api/note.js"

export default function Note({ id, title, categorie, description}) {
    const [deleteNote, { isSuccessDelete, isErrorDelete, errorDelete }] = useDeleteNoteMutation()

    const handleDeleteClick = () => {
        deleteNote(id)
    }

    return <div className="w-full flex justify-between bg-slate-200 rounded-md py-2 px-4">
        <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <h4 className="italic text-sm mb-4 opacity-50">{categorie}</h4>
            <p>{description}</p>
        </div>

        <div className="flex space-x-4 items-center">
            <button>
                <FaPenSquare className="text-xl opacity-50 hover:opacity-100"/>
            </button>

            <button onClick={handleDeleteClick}>
                <MdDelete className="text-2xl text-red-600 opacity-50 hover:opacity-100" />
            </button>
        </div>
    </div>
}