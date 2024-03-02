import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import SearchBar from "@/components/SearchBar";
import { useParams } from "react-router-dom";

const OrderPage = () => {
    const { id } = useParams();

    return (
        <Layout>
            <Helmet>
                <title>Order</title>
            </Helmet>

            <SearchBar />

            <div className='flex w-full items-center flex-col justify-center p-4 gap-3 bg-white rounded-lg'>
                {id}
            </div>
        </Layout>
    );
};

export default OrderPage;
