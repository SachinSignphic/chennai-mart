import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Link, Navigate, useParams } from "react-router-dom";
import { drivers, rows } from "@/utils/dummyOrderData";
import Button from "@/components/ui/Button";

const OrderPage = () => {
    const { id } = useParams();
    console.log("🚀 ~ OrderPage ~ id:", id)

    // code to read specific id from dummydata and show it on screen
    const orderDetails = rows.find(row => row.id == id);
    
    if (!orderDetails) return <Navigate to={'/orders'} replace />
    
    const currentDriver = drivers.find(driver => driver.id == orderDetails.driver);

    return (
        <Layout>
            <Helmet>
                <title>Order</title>
            </Helmet>

            <div className='flex w-full mt-10 justify-center p-4 gap-3 bg-white rounded-lg'>
                <div className='flex p-4 shadow-sm shadow-black/30 rounded w-full flex-col items-center gap-8'>
                    <h3 className='text-black/80 font-poppins-500 text-xl'>
                        <Link to='/orders'>← </Link>
                        Order #{id}
                    </h3>
                    <div className='grid place-items-center rounded-full w-28 h-28 overflow-hidden'>
                        <img
                            src='/ffjmneroeu391.webp'
                            alt='Person'
                            className='w-full'
                        />
                    </div>
                    <p className='font-poppins-500 text-black/55 text-lg'>
                        {orderDetails.name}
                    </p>
                    <p className='font-poppins-400 text-black/55 text-base'>
                        {orderDetails.address}
                    </p>
                </div>
                <div className='flex flex-col items-start p-4 gap-6 shadow-sm shadow-black/30 rounded w-full'>
                    <h3 className='text-black/80 font-poppins-500 text-xl'>
                        Items for Order #{id}
                    </h3>
                    <div className='flex flex-col gap-3 min-w-full'>
                        {orderDetails.items.map((item, i) => (
                            <div
                                key={i}
                                className='flex items-center p-1 gap-2 w-full'>
                                <div className='grid place-items-center h-12 w-12 bg-tertiary/10'></div>
                                <div className='flex flex-col'>
                                    <h4 className='font-poppins-400 text-tertiary'>
                                        {item.name}
                                    </h4>
                                    <p className='font-poppins-400 text-tertiary'>
                                        x {item.quantity}
                                    </p>
                                </div>
                                <h3 className='font-poppins-500 ml-auto'>
                                    ₹{item.quantity * item.price}
                                </h3>
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between w-full'>
                            <h3 className='text-black/80 font-poppins-500 text-lg'>
                                Total:
                            </h3>
                            ₹
                            {orderDetails.items.reduce(
                                (total, item) =>
                                    total + item.price * item.quantity,
                                0
                            )}
                        </div>
                        <div className='flex justify-between w-full'>
                            <h3 className='text-black/80 font-poppins-500 text-lg'>
                                Order Status:
                            </h3>
                            {orderDetails.status}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-center p-4 shadow-sm shadow-black/30 rounded w-full gap-8'>
                    <h3 className='text-black/80 font-poppins-500 text-xl w-full text-left'>
                        Driver Details
                    </h3>
                    <div className='grid place-items-center rounded-full w-28 h-28 overflow-hidden'>
                        <img
                            src='/driver.jpg'
                            alt='Person'
                            className='object-cover h-full w-full'
                        />
                    </div>
                    <h5 className='font-poppins-400 text-black/80 text-lg'>
                        {currentDriver.name}
                    </h5>
                    <Link to={`/drivers/${orderDetails.driver}`} className="w-full">
                        <Button
                            label={"View Profile"}
                            isActive={true}
                            fullWidth={true}
                        />
                    </Link>
                </div>
            </div>
        </Layout>
    );
};

export default OrderPage;
