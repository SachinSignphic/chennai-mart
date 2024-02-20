/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="flex flex-col h-full p-2 px-10 w-[15%] bg-white gap-4 items-center shadow-xl shadow-black/100">
        <img src="/nav-logo.png" alt="Hecto Admin" className="w-[65%] object-contain" />
        <div className="flex gap-4 items-center justify-center">
          <img src="/vite.svg" alt="" />
          <div className="flex flex-col gap-0">
            <h4 className="text-gray-700">DAVID</h4>
            <p className="text-gray-400 text-sm">admin@chennaimart.com</p>
          </div>
        </div>
        <ul className="text-black text-lg font-bold flex mt-10 flex-col gap-5">
          <li>
            <NavLink to={'/dashboard'} className={({ isPending, isActive }) => 'font-poppins-300 text-base leading-3 '+ (isActive? 'text-teal': 'text-tertiary')}>DASHBOARD</NavLink>
          </li>
          <li>
            <NavLink to={'/dashboard/orders'} className={({ isPending, isActive }) => 'font-poppins-300 text-base leading-3 '+ (isActive? 'text-teal': 'text-tertiary')}>ORDERS</NavLink>
          </li>
          <li>
            <NavLink to={'/dashboard/drivers'} className={({ isPending, isActive }) => 'font-poppins-300 text-base leading-3 '+ (isActive? 'text-teal': 'text-tertiary')}>DRIVERS</NavLink>
          </li>
        </ul>
      </nav>
  )
}

export default Navbar