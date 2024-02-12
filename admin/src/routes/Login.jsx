import { Link } from "react-router-dom";

export default function Login () {
    return (
        <div className="font-semibold text-xl text-white flex justify-between">
            Login
            <Link to={'/dashboard/orders'}>Click to go to dashboard</Link>
        </div>
    )
}