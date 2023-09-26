import {
    createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./components/loginPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    }
]);