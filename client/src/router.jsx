import {
    createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./components/loginPage";
import Admin from "./routes/home";
import SignupPage from "./components/signupPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },

    {
        path: "/signup",
        element: <SignupPage />,
    },

    {
        path: "/admin",
        element: <Admin />,
    }
]);