/* eslint-disable no-unused-vars */
import { NavLink } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { LuPackagePlus } from "react-icons/lu";
import { RiEBikeLine } from "react-icons/ri";
import { FiUserPlus } from "react-icons/fi";
import { CgLogOut } from "react-icons/cg";

const Navbar = () => {
  return (
      <nav className='flex flex-col h-full justify-between p-2 px-10 py-6 bg-white gap-4 items-stretch shadow-sm fixed z-50'>
          <img
              src='/nav-logo.png'
              alt='Hecto Admin'
              className='w-32 object-contain'
          />
          <div className='flex gap-4 items-center justify-center'>
              <img
                  src='/image-2.png'
                  alt=''
                  className='rounded-full'
              />
              <div className='flex flex-col gap-0'>
                  <h4 className='text-gray-700'>DAVID</h4>
                  <p className='text-gray-400 text-sm'>admin@chennaimart.com</p>
              </div>
          </div>
          <ul className='text-black text-lg font-bold flex mt-16 flex-col gap-7'>
              <li>
                  <NavLink
                      to={"/dashboard"}
                      className={({ isPending, isActive }) =>
                          "font-poppins-400 text-base leading-3 flex items-center gap-x-3  " +
                          (isActive ? "text-teal" : "text-tertiary")
                      }>
                      <MdOutlineDashboard />
                      DASHBOARD
                  </NavLink>
              </li>
              <li>
                  <NavLink
                      to={"/orders"}
                      className={({ isPending, isActive }) =>
                          "font-poppins-400 text-base leading-3 flex items-center gap-x-3  " +
                          (isActive ? "text-teal" : "text-tertiary")
                      }>
                      <LuPackagePlus />
                      ORDERS
                  </NavLink>
              </li>
              <li>
                  <NavLink
                      to={"/drivers"}
                      className={({ isPending, isActive }) =>
                          "font-poppins-400 text-base leading-3 flex items-center gap-x-3  " +
                          (isActive ? "text-teal" : "text-tertiary")
                      }>
                      <RiEBikeLine />
                      DRIVERS
                  </NavLink>
              </li>
              <li>
                  <NavLink
                      to={"/requests"}
                      className={({ isPending, isActive }) =>
                          "font-poppins-400 text-base leading-3 flex items-center gap-x-3  " +
                          (isActive ? "text-teal" : "text-tertiary")
                      }>
                      <FiUserPlus />
                      REQUESTS
                  </NavLink>
              </li>
          </ul>
          <NavLink
              to={"/"}
              className={
                  "font-poppins-400 text-base leading-3 mt-auto flex items-center gap-x-3 text-red-300"
              }>
              <CgLogOut />
              LOGOUT
          </NavLink>
      </nav>
  );
}

export default Navbar