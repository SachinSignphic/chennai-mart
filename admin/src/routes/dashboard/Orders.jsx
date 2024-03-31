import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import SearchBar from "@/components/SearchBar";
import { IoMdMore, IoMdClose } from "react-icons/io";
import * as Popover from "@radix-ui/react-popover";
import { Link } from "react-router-dom";
import { columns } from "@/utils/dummyOrderData";
import { IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import axios from "axios";
import { API_URL } from "@/constants";
import { loadOrders } from "@/context/orderSlice";

const Orders = () => {
    const dispatch = useDispatch();
    const apiRef = useGridApiRef(); // this hook provides DataGrid context and can be used to manipulate it!
    
    const orderData = useSelector((state) => state.orders);
    const rows = useMemo(() => {
        return orderData.length > 0? orderData.map(order => ({
            id: order._id,
            name: order.name,
            address: order.address.streetLandmark,
            date: order.placedOn,
            products: order.items.length,
            status: order.orderStatus,
            driver: order.driver.firstName,
            items: order.items
        })): []
    }, [orderData]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const orderRequest = await axios.get(API_URL + "/admin/orders");
                console.log(
                    "🚀 ~ fetchOrderData ~ orderRequest:",
                    orderRequest
                );
                dispatch(loadOrders(orderRequest.data));
            } catch (error) {
                console.log("🚀 ~ fetchOrderData ~ error:", error);
            }
        };
        
        if (orderData.length === 0) fetchOrderData();
    }, []);

    return (
        <Layout>
            <Helmet>
                <title>Orders</title>
            </Helmet>

            <SearchBar />

            <div className='flex w-full items-center flex-col justify-center p-4 gap-3 bg-white rounded-lg'>
                <div className='flex justify-between items-center w-full'>
                    <h1 className='font-poppins-500 text-2xl text-tertiary'>
                        Recent orders
                    </h1>
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <button
                                className='rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white outline-1 outline-gray-200 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none'
                                aria-label='Update dimensions'>
                                <IoMdMore />
                            </button>
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content
                                className='rounded p-4 w-[200px] bg-white shadow-sm focus:shadow-md shadow-tertiary/30 will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade'
                                sideOffset={5}
                                align='end'>
                                <div className='flex flex-col gap-2.5'>
                                    <Link className='text-tertiary text-sm font-poppins-400'>
                                        Details
                                    </Link>
                                    <Link className='text-red-300 text-sm font-poppins-400'>
                                        Cancel Order
                                    </Link>
                                </div>
                                <Popover.Close
                                    className='rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-tertiary absolute top-[5px] right-[5px] hover:bg-secondary/70 focus:shadow-sm outline-none cursor-default'
                                    aria-label='Close'>
                                    <IoMdClose />
                                </Popover.Close>
                                <Popover.Arrow className='fill-white' />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                </div>

                <DataGrid
                    rows={rows}
                    loading={rows.length == 0}
                    columns={[
                        ...columns,
                        {
                            field: "actions",
                            disableColumnMenu: true,
                            editable: false,
                            filterable: false,
                            headerName: "Actions",
                            width: 90,
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
                    onRowSelectionModelChange={(rowIds) => console.log(rowIds)}
                    apiRef={apiRef}
                    className='w-full'
                />
            </div>
            {/* example of manipulating table via API */}
            {/* <h1 onClick={() => console.log(apiRef.current.getSelectedRows())}>asd</h1> */}
        </Layout>
    );
};

export default Orders;
