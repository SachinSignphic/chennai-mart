import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/Dashboard.jsx'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import Orders from './routes/dashboard/Orders.jsx'
import Drivers from './routes/dashboard/Drivers.jsx'
import Login from './routes/Login.jsx'
import Requests from './routes/dashboard/Requests.jsx'
import Home from './routes/dashboard/Home.jsx'
import OrderPage from './routes/dashboard/orders/OrderPage.jsx'
import DriverPage from './routes/dashboard/drivers/DriverPage.jsx'
import DriverRequest from './routes/dashboard/requests/DriverRequest.jsx'
import ProductRequest from './routes/dashboard/requests/ProductRequest.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "",
        element: (
            <Navigate
                to={"/orders"}
                replace
            />
        ),
    },
    {
        path: "dashboard",
        element: (
            <App>
                <Home />
            </App>
        ),
    },
    {
        path: "orders",
        element: (
            <App>
                <Orders />
            </App>
        ),
    },
    {
        path: "orders/:id",
        element: (
            <App>
                <OrderPage />
            </App>
        ),
    },
    {
        path: "drivers",
        element: (
            <App>
                <Drivers />
            </App>
        ),
    },
    {
        path: "drivers/:id",
        element: (
            <App>
                <DriverPage />
            </App>
        ),
    },
    {
        path: "requests",
        element: (
            <App>
                <Requests />
            </App>
        ),
    },
    {
        path: "requests/drivers/:id",
        element: (
            <App>
                <DriverRequest />
            </App>
        ),
    },
    {
        path: "requests/products/:id",
        element: (
            <App>
                <ProductRequest />
            </App>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
