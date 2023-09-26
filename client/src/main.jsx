import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from "./store";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import './index.css'
import LoginPage from './components/loginPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
