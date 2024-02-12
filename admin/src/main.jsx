import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Orders from './routes/dashboard/Orders.jsx'
import Home from './routes/dashboard/Home.jsx'
import Login from './routes/Login.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'home',
        element: <Home /> // this one is summa route.. replace with actual route
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
