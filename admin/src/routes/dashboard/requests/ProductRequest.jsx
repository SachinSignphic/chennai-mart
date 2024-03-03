import Layout from "@/components/Layout";
import { productRequests } from "@/utils/dummyOrderData";
import { Helmet } from "react-helmet";
import { Link, Navigate, useParams } from "react-router-dom";

const ProductRequest = () => {
    const { id } = useParams();

    const productDetails = productRequests.find(prod => prod.id == id);

    if (!productDetails)
        return (
            <Navigate
                to={"/drivers"}
                replace
            />
        );

    return (
        <Layout>
            <Helmet>
                <title>Product Request</title>
            </Helmet>

            {/* <SearchBar /> */}

            <div className='flex w-full flex-col p-8 gap-3 mt-10 bg-white rounded-lg max-w-[90%] self-center'>
                <h1 className='font-poppins-500 text-tertiary text-xl'>
                    <Link to='/requests'>← </Link>
                    Request #{id}
                </h1>
                <div className='flex flex-col items-center self-center p-8 w-full gap-4'>
                    <div className='grid w-44 h-44 rounded-full overflow-hidden place-items-center'>
                        <img
                            src='/apple.jpg'
                            alt=''
                            className='h-full object-cover'
                        />
                    </div>
                    <h1 className='font-poppins-500 text-tertiary text-xl'>
                        {productDetails.name}
                    </h1>
                    <h1 className='font-poppins-500 text-tertiary text-base'>
                        Requested by: Vladivostok
                    </h1>
                    <div className='flex flex-col bg-white outline-1 outline-gray-100 outline p-8 w-[60%] justify-center'>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Nulla, veniam aliquam iure amet modi quo totam
                            earum, odit reprehenderit, quos officia! Nam,
                            quaerat maxime vitae quia aperiam quasi eum alias
                            saepe blanditiis, officia tempora, molestiae ipsam
                            debitis repudiandae quos quam?
                        </p>
                    </div>
                    <div className='flex gap-2'>
                        <button className='py-2 px-4 rounded-md text-center bg-green-400 text-green-50 font-poppins-600 mt-auto'>
                            ACCEPT
                        </button>
                        <button className='py-2 px-4 rounded-md text-center bg-red-400 text-red-50 font-poppins-600 mt-auto'>
                            REJECT
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductRequest;
