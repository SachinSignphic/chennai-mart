/* eslint-disable no-unused-vars */
import Navbar from "@/components/Navbar"
import { Helmet } from "react-helmet"

function App({ children }) {
  
  return (
    <div className="flex w-full h-[100vh] bg-primary">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Navbar />

      <div id="page" className="flex flex-col p-1 w-full bg-secondary">
        <p className='text-4xl font-poppins-500 font-semibold ml-4 mt-7 text-blk'>HECTO ADMIN DASHBOARD</p>
        {/* search box */}
        { children }
      </div>
    </div>
  )
}

export default App