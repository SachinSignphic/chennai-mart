import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Requests = () => {
    return (
        <Layout>
            <Helmet>
                <title>Requests</title>
            </Helmet>
            <p className=''>Hello Requests</p>
            <Link to={"/dashboard"}>← back</Link>
        </Layout>
    );
};

export default Requests;
