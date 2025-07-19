import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './Components/Login.jsx'
import Navbar from './Components/Navbar.jsx'
import CreateTrip from './Components/CreateTrip.jsx'

import {createBrowserRouter,RouterProvider,} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <RouterProvider router={router} />
  </StrictMode>,
)
