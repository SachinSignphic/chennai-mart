import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Login () {
    return (
        <div className="font-semibold text-xl text-white flex h-[100vh] flex-col items-center justify-center">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Link to={'/dashboard'}>Click to go to dashboard</Link>
        </div>
    )
}