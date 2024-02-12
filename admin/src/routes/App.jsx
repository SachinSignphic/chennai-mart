import { Outlet } from "react-router-dom"


function App() {
  return (
    <div className="flex w-full p-6">
      <p className='font-light text-xl'>Yo what is up?!</p>
      {/* assume a nav bar comes here.. delete all markup 👆 */}
      <div id="page">
        <Outlet />
      </div>
    </div>
  )
}

export default App