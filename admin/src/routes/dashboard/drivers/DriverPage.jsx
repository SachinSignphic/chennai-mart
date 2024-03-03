import Layout from "@/components/Layout";
import { drivers, randomDriverOrderColumns, randomDriverOrderData } from "@/utils/dummyOrderData";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { Helmet } from "react-helmet";
import { IoEyeSharp } from "react-icons/io5";
import { Link, Navigate, useParams } from "react-router-dom";

const documents = [
    {
        name: 'Aadhaar Card',
        status: 'verified',
        link: ''
    },
    {
        name: 'PAN Card',
        status: 'verified',
        link: ''
    },
    {
        name: 'Driver\'s license',
        status: 'verified',
        link: ''
    },
    {
        name: 'Voter ID',
        status: 'verified',
        link: ''
    },
]

const DriverPage = () => {
    const { id } = useParams();
    const apiRef = useGridApiRef();

    const driverDetails = drivers.find(driver => driver.id == id);
    if(!driverDetails) return <Navigate to={'/drivers'} replace />

    return (
        <Layout>
            <Helmet>
                <title>Drivers</title>
            </Helmet>

            {/* <SearchBar /> */}

            <div className='flex w-full justify-center p-8 gap-3 mt-10 bg-white rounded-lg max-w-[90%] self-center'>
                <div className='flex flex-col gap-4 w-[45%] outline outline-1 outline-gray-100 p-6'>
                    <h1 className='font-poppins-600 text-xl text-tertiary'>
                        <Link to={"/drivers"}>←</Link>
                        {"   "}
                        {driverDetails.name}
                    </h1>
                    <div className='grid place-items-center self-center w-24 h-24 mt-10'>
                        <img
                            src='/driver.jpg'
                            alt='Driver'
                            className='rounded-full h-full object-cover'
                        />
                    </div>
                    <div className='flex flex-col gap-3 w-full justify-center'>
                        {documents.map((doc, i) => (
                            <div
                                className='flex justify-between items-center w-full'
                                key={i}>
                                <h4 className='font-poppins-400 text-tertiary'>
                                    {doc.name}
                                </h4>
                                <h4 className='font-poppins-400 text-sm text-tertiary'>
                                    {doc.status !== "verified"
                                        ? "🟡 " + doc.status
                                        : "🟢 Verified"}
                                </h4>
                            </div>
                        ))}
                    </div>
                    <button className='py-2 rounded-md text-center bg-red-400 text-red-50 font-poppins-600 mt-auto'>
                        TERMINATE
                    </button>
                </div>
                <div className='flex flex-col gap-3 w-full outline outline-1 outline-gray-100 p-3'>
                    <div className='grid place-items-center self-end bg-secondary py-1 grid-cols-2 rounded w-56 px-3 outline outline-1 outline-gray-200'>
                        <h4 className='font-normal text-sm text-black/80 mr-auto'>
                            Orders{" "}
                        </h4>
                        <h4 className='font-normal text-sm text-black/80 ml-auto'>
                            {Math.floor(Math.random() * drivers.length * 20)}
                        </h4>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='font-poppins-500 text-black/80 text-lg'>
                            Recent Orders
                        </h1>
                        <DataGrid
                            rows={randomDriverOrderData}
                            columns={[
                                ...randomDriverOrderColumns,
                                {
                                    field: "actions",
                                    disableColumnMenu: true,
                                    editable: false,
                                    filterable: false,
                                    headerName: "Actions",
                                    width: 80,
                                    sortable: false,
                                    renderCell: (params) => (
                                        <Link to={`/orders/${params.id}`}>
                                            <IoEyeSharp />
                                        </Link>
                                    ),
                                },
                            ]}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            onRowSelectionModelChange={(rowIds) =>
                                console.log(rowIds)
                            }
                            apiRef={apiRef}
                            className='w-full'
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DriverPage;
