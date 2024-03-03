import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/ui/Button";
import { driverRequests, productRequests } from "@/utils/dummyOrderData";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const RowItem = ({ name, action }) => (
    <div className="flex justify-between p-2 py-3 items-center w-full">
        <h3 className="font-poppins-400 text-black/80">{name}</h3>
        <Button label={'View'} isActive={true} onClick={action} />
    </div>
)

const Requests = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <Helmet>
                <title>Requests</title>
            </Helmet>
            
            <SearchBar />

            <div className='flex w-full flex-col justify-center p-8 gap-8 bg-white rounded-lg'>
                <h1 className="font-poppins-600 text-xl text-black/80">Requests</h1>
                <div className="flex flex-col outline outline-1 outline-gray-100 w-full p-4 divide-y-[1px]">
                    <h1 className="font-poppins-600 mb-6">Driver Requests</h1>
                    {
                        driverRequests.map((driver, i) => <RowItem name={driver.name} key={i} action={() => navigate(`/requests/drivers/${driver.id}`)} />)
                    }
                </div>
                <div className="flex flex-col outline outline-1 outline-gray-100 w-full p-4 divide-y-[1px]">
                    <h1 className="font-poppins-600 mb-6">Product Requests</h1>
                    {
                        productRequests.map((product, i) => <RowItem name={product.name} key={i} action={() => navigate(`/requests/products/${product.id}`)} />)
                    }
                </div>
            </div>
        </Layout>
    );
};

export default Requests;
