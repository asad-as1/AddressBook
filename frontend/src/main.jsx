import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Contact from "./Pages/Contact/Contact.jsx"
import NewContact from "./Pages/NewContact/NewContact.jsx"
import Login from "./Pages/Login/Login.jsx"
import Signup from "./Pages/SignUp/SignUp.jsx"
import Home from "./Pages/Home/Home.jsx"

import './index.css'
import App from './App.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/contacts",
        element: <Contact />,
      },
      {
        path: "/newcontact",
        element: <NewContact />,
      },
      // {
      //   path: "/contact",
      //   element: (
      //     <ProtectedRoute element={<Profile />} />
      //   ),
      // },
      // {
      //   path: "/newcontact",
      //   element: (
      //     <ProtectedRoute element={<EditProfile />} />
      //   ),
      // }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
