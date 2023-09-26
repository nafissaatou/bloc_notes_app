import Sidebar from "../components/sidebar.jsx";
export default function Admin() {
  return (
    <div className="flex">
        <div className="w-56 min-h-screen bg-gray-700">
            <Sidebar /> 
        </div>
        <div>
            page
        </div>
    </div>
  )
}
