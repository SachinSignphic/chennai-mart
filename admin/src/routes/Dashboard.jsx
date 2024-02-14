import { Helmet } from "react-helmet"
import { Link, Outlet } from "react-router-dom"


function App() {
  
  return (
    <div className="flex w-full h-[100vh]">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <nav className="flex flex-col h-full p-2 w-[13%] bg-white justify-center items-center">
        <p className="text-black">nav aam</p>
        <ul className="text-black text-lg font-bold">
          <li><Link to={'/dashboard/orders'}>Orders</Link></li>
          <li><Link to={'/dashboard/drivers'}>Drivers</Link></li>
          <li>W</li>
          <li>T</li>
          <li>F</li>
        </ul>
      </nav>
      {/* assume a nav bar comes here.. delete all markup 👆 */}
      <div id="page" className="flex flex-col p-1">
        <p className='font-light text-xl'>Admin page common content</p>
        <Outlet />
      </div>
    </div>
  )
}

export default App