import { Link } from "react-router-dom"

const Orders = () => {
  return (
    <div className="font-semibold text-xl flex justify-between">Orders
        <Link to={'/orders'}>Click to go to order</Link>
    </div>
  )
}

export default Orders