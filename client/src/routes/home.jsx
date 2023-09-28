import Note from "../components/note.jsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Sidebar from "../components/sidebar.jsx";
import { TbLogout } from "react-icons/tb"
import { useEffect } from "react"
import { useAddNoteMutation, useGetNotesQuery } from "../api/note.js";

const schema = yup.object().shape({
	title: yup.string().required('Le titre est obligatoire'),
    categorie: yup.string().required('La categorie est obligatoire'),
	description: yup.string().required("La description est obligatoire"),
});

export default function Admin() {
    const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});

    const { data, isLoading, isSuccess, isError, error } = useGetNotesQuery()
    const [addNote, { isSuccessAdd, isErrorAdd, errorAdd }] = useAddNoteMutation()

    const display_notes = data?.data.map((note) => {
        return <Note 
                    key={note._id} 
                    id={note._id}
                    title={note.title} 
                    categorie={note.categorie} 
                    description={note.description} 
                />
    })
    
    const handleClickSoumettre = (data) => {
        addNote(data)
    }

    const handleClickLogout = () => {

    }

    const { user } = JSON.parse(localStorage.getItem("user"))
    const username = user.first_name + " " + user.last_name

    return (
        <div className="flex">
            <div className="min-h-screen w-1/2 fixed space-y-20 bg-slate-400 flex flex-col items-center">
                <div className="mt-8 w-full px-4 flex items-center justify-between">
                    <h1 className="text-lg font-bold">{username}</h1>
                    <button onClick={handleClickLogout} className="flex items-center w-1/8 outline outline-1 outline-slate-500 text-slate-500 hover:text-black p-3 rounded-md hover:bg-slate-500">
                        <TbLogout className="mr-2 text-lg" /> Logout
                    </button>
                </div>

                <form action="" onSubmit={handleSubmit(handleClickSoumettre)} className="space-y-6 bg-slate-200 p-6 rounded-lg shadow-lg w-3/4">
                    <div>
                        <label htmlFor="title" className="block text-lg font-medium mb-2">Titre</label>
                        <input {...register("title")} type="text" id="title" name="title" placeholder="Entrez le titre" className="w-full p-3 opacity-50 placeholder-black border rounded-md" />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-lg font-medium mb-2">Catégorie</label>
                        <select {...register("categorie")} id="category" name="category" className="w-full p-3 border opacity-50 placeholder-black rounded-md">
                            <option value="Cours">Cours</option>
                            <option value="Courses">Courses</option>
                            <option value="Jeux">Jeux</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-lg font-medium mb-2">Description</label>
                        <textarea id="description" {...register("description")} name="description" rows="4" placeholder="Entrez la description" className="w-full p-3 border opacity-50 placeholder-black rounded-md"></textarea>
                    </div>

                    <div>
                        <button type="submit" onSubmit={handleClickSoumettre} className="w-full outline outline-1 outline-slate-500 text-slate-500 hover:text-black p-3 rounded-md hover:bg-slate-500">
                            Soumettre
                        </button>
                    </div>
                </form>
            </div>

            <div className="w-1/2 min-h-screen ml-1/2 py-6 bg-slate-600 px-4">
                <h2 className="text-center text-2xl tracking-widest text-slate-200 font-bold ">LISTE DES NOTES</h2>
                
                <div className="flex flex-col space-y-2 mt-14">
                    {
                        data?.data.length !== 0 ? display_notes : <p className="text-center text-white text-xl opacity-50">LISTE VIDE</p>
                    }
                </div>
            </div>
        </div>
    )
}
