import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import { drivers } from "@/utils/dummyOrderData";
import { Helmet } from "react-helmet";
import { Navigate, useParams } from "react-router-dom";

const DriverPage = () => {
    const { id } = useParams();

    const driverDetails = drivers.find(driver => driver.id == id);
    if(!driverDetails) return <Navigate to={'/drivers'} replace />

    return (
        <Layout>
            <Helmet>
                <title>Drivers</title>
            </Helmet>

            <SearchBar />

            <div className='flex w-full flex-col justify-center p-8 gap-3 bg-white rounded-lg max-w-[90%] self-center'>
                
            </div>
        </Layout>
    );
};

export default DriverPage;
