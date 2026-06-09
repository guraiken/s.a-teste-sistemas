  import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './pages/Login'
import './index.css'

//react router
import { createBrowserRouter, RouterProvider } from 'react-router'

//toastify
import {ToastContainer} from "react-toastify"
import "react-toastify/ReactToastify.css"
import Dashboard from './pages/Dashboard'
import Carros from './pages/Carros'
import { AuthProvider } from './contexts/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import DashboardLayout from './layouts/DashboardLayout'
import { Modal } from './components/Modal'
import { DetailsModal } from './components/DetailsModal'



export const router = createBrowserRouter([
    {path:"/", element:<Login/>},
    { 
      element: (
      <PrivateRoute>
        <DashboardLayout/>
      </PrivateRoute>
      ),
      children: [
        {path: "/dashboard", element: <Dashboard/>},
        {path: "/carros", element: <Carros/>},
        {path: "/carros/:id", element: <DetailsModal component={<Dashboard/>}> <div>Oi</div></DetailsModal>}
      ]
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ToastContainer />
    <RouterProvider router={router}/>
    </AuthProvider>
  </StrictMode>,
)
