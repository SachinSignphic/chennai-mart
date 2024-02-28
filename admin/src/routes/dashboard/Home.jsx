import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Layout>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <p className=''>Hello Dashboard</p>
            <Link to={"/dashboard"}>← back</Link>
        </Layout>
    );
};

export default Home;
