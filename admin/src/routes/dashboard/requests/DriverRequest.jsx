import Layout from "@/components/Layout";
import { driverRequests } from "@/utils/dummyOrderData";
import { Helmet } from "react-helmet";
import { FiDownload } from "react-icons/fi";
import { Link, Navigate, useParams } from "react-router-dom";

const documents = [
    {
        name: "Aadhaar Card",
        status: "unverified",
        link: "",
    },
    {
        name: "PAN Card",
        status: "unverified",
        link: "",
    },
    {
        name: "Driver's license",
        status: "unverified",
        link: "",
    },
    {
        name: "Voter ID",
        status: "unverified",
        link: "",
    },
];

const DriverRequest = () => {
    const { id } = useParams();

    const driverDetails = driverRequests.find(driver => driver.id == id);

    if (!driverDetails) return <Navigate to={'/drivers'} replace />

    return (
        <Layout>
            <Helmet>
                <title>Driver Request</title>
            </Helmet>

            {/* <SearchBar /> */}

            <div className='flex w-full flex-col p-8 gap-3 mt-10 bg-white rounded-lg max-w-[90%] self-center'>
                <h1 className='font-poppins-500 text-tertiary text-xl'>
                    <Link to="/requests">← </Link>
                    Request #{id}
                </h1>
                <div className='flex flex-col items-center self-center p-8 w-full gap-4'>
                    <div className='grid w-44 h-44 rounded-full overflow-hidden place-items-center'>
                        <img
                            src='/driver.jpg'
                            alt=''
                            className='h-full object-cover'
                        />
                    </div>
                    <h1 className='font-poppins-500 text-tertiary text-xl'>{driverDetails.name}</h1>
                    <div className='flex flex-col gap-3 w-full justify-center'>
                        {documents.map((doc, i) => (
                            <div
                                className='flex justify-between items-center w-full'
                                key={i}>
                                <h4 className='font-poppins-400 text-tertiary'>
                                    {doc.name}
                                </h4>
                                <h4 className='font-poppins-400 text-sm text-tertiary flex gap-4'>
                                    {doc.status !== "verified"
                                        ? "🟡 " + doc.status
                                        : "🟢 Verified"}
                                    <Link to={doc.link} target="_blank">
                                        <FiDownload />
                                    </Link>
                                </h4>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
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

export default DriverRequest;
