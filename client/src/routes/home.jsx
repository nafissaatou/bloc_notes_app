import Note from "../components/note.jsx";
import Sidebar from "../components/sidebar.jsx";
import { TbLogout } from "react-icons/tb"
import { useEffect } from "react"
import { useLocation, useHistory } from "react-router-dom";

export default function Admin() {

    const handleClickSoumettre = (event) => {
        event.preventDefault()

        const title = document.getElementById("title").value
        const categorie = document.getElementById("category").value
        const description = document.getElementById("description").value

        let req = new XMLHttpRequest()

        req.open("POST", `http://localhost:5000/notes?title=${title}&categorie=${categorie}&description=${description}`)
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
        req.send()

        handleClickLogout()       
    }

    useEffect(() => {
        fetch("http://localhost:5000/notes")
        .then(response => response.json())
        .then(response => {
            localStorage.setItem("notes", JSON.stringify(response.data))
        })
    }, [])

    const notes = JSON.parse(localStorage.getItem("notes"))
    
    const display_notes = notes.map((note) => {
        return <Note 
                    key={note._id} 
                    title={note.title} 
                    categorie={note.categorie} 
                    description={note.description} 
                />
    })

    const handleClickLogout = () => {
        window.location.reload()
    }

    const { user } = JSON.parse(localStorage.getItem("user"))
    const username = user.first_name + " " + user.last_name

    return (
        <div className="flex">
            <div className="min-h-screen w-1/2 space-y-20 bg-slate-400 flex flex-col items-center">
                <div className="mt-8 w-full px-4 flex items-center justify-between">
                    <h1 className="text-lg font-bold">{username}</h1>
                    <button onClick={handleClickLogout} className="flex items-center w-1/8 outline outline-1 outline-slate-500 text-slate-500 hover:text-black p-3 rounded-md hover:bg-slate-500">
                        <TbLogout className="mr-2 text-lg" /> Logout
                    </button>
                </div>

                <form action="" className="space-y-6 bg-slate-200 p-6 rounded-lg shadow-lg w-3/4">
                    <div>
                        <label htmlFor="title" className="block text-lg font-medium mb-2">Titre:</label>
                        <input type="text" id="title" name="title" placeholder="Entrez le titre" className="w-full p-3 opacity-50 placeholder-black border rounded-md" />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-lg font-medium mb-2">Catégorie:</label>
                        <select id="category" name="category" className="w-full p-3 border opacity-50 placeholder-black rounded-md">
                            <option value="cat1">Catégorie 1</option>
                            <option value="cat2">Catégorie 2</option>
                            <option value="cat3">Catégorie 3</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-lg font-medium mb-2">Description:</label>
                        <textarea id="description" name="description" rows="4" placeholder="Entrez la description" className="w-full p-3 border opacity-50 placeholder-black rounded-md"></textarea>
                    </div>

                    <div>
                        <button type="submit" onClick={handleClickSoumettre} className="w-full outline outline-1 outline-slate-500 text-slate-500 hover:text-black p-3 rounded-md hover:bg-slate-500">
                            Soumettre
                        </button>
                    </div>
                </form>
            </div>

            <div className="w-1/2 py-6 bg-slate-600 px-4">
                <h2 className="text-center text-2xl tracking-widest text-slate-200 font-bold ">LISTE DES NOTES</h2>
                
                <div className="grid grid-cols-2 space-x-2 mt-14">
                    {
                        display_notes
                    }
                </div>
            </div>
        </div>
    )
}
