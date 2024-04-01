import Layout from "@/components/Layout";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadProducts } from "@/context/productsSlice";
import axios from "axios";
import { API_URL } from "@/constants";
import { loadOrders } from "@/context/orderSlice";

const OrderPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const orderData = useSelector((state) => state.orders);
    const orderDetails = orderData.find((order) => order.id == id);

    const productData = useSelector((state) => state.products);
    const productIDsinOrder = orderDetails? orderDetails.items.map((item) => item.productId) : [];
    const productDetails = productData.filter((product) => productIDsinOrder.includes(product._id));
    
    console.log("🚀 ~ OrderPage ~ orderData:", orderData);
    console.log("🚀 ~ OrderPage ~ orderDetails:", orderDetails);
    console.log("🚀 ~ OrderPage ~ productData:", productData);
    console.log("🚀 ~ OrderPage ~ productDetails:", productDetails);

    useEffect(() => {
        const fetchProductsData = async (IDsToReq) => {
            try {
                const productsReq = await axios.post(
                    API_URL + "/admin/products",
                    IDsToReq
                ); // for now no pagination, apro paathuklaam
                console.log(
                    "🚀 ~ fetchProductsData ~ productsReq:",
                    productsReq
                );
                dispatch(loadProducts(productsReq?.data));
            } catch (error) {
                console.log("🚀 ~ fetchOrderData ~ error:", error);
                if (error.response?.status === 404) {
                    // handle shit here
                }
            }
        };
        const fetchOrderData = async () => {
            try {
                const orderRequest = await axios.get(API_URL + "/admin/orders"); // for now no pagination, apro paathuklaam
                console.log(
                    "🚀 ~ fetchOrderData ~ orderRequest:",
                    orderRequest?.data
                );
                dispatch(loadOrders(orderRequest?.data));
            } catch (error) {
                console.log("🚀 ~ fetchOrderData ~ error:", error);
                if (error.response?.status === 404) {
                    // handle shit here
                }
            }
        };

        if (!orderDetails) {
            fetchOrderData();
        }

        if (orderDetails && productDetails.length != orderDetails.items.length) {
            console.log("idhu yen fire aavala");
            fetchProductsData(productIDsinOrder);
        }
    }, [orderDetails, productDetails]);

    return (
        <Layout>
            <Helmet>
                <title>Order</title>
            </Helmet>

            <div className='flex w-full mt-10 justify-center p-4 gap-3 bg-white rounded-lg'>
                {orderDetails && (
                    <>
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
                                {productDetails &&
                                    productDetails.map((item, i) => {
                                        let currItemInCart =
                                            orderDetails.items.find(
                                                (cart) =>
                                                    cart.productId == item._id
                                            );
                                        return (
                                            <div
                                                key={i}
                                                className='flex items-center p-1 gap-2 w-full'>
                                                <div className='grid place-items-center h-12 w-12 bg-tertiary/10'>
                                                    <img src={item.main_image.asset.url} alt={item.name} />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <h4 className='font-poppins-400 text-tertiary'>
                                                        {item.name}
                                                    </h4>
                                                    <p className='font-poppins-400 text-tertiary'>
                                                        x{ currItemInCart.quantity }
                                                    </p>
                                                </div>
                                                <h3 className='font-poppins-500 ml-auto'>
                                                    ₹
                                                    {currItemInCart.quantity *
                                                        (item.discounted_price == 0? item.price - (item.discount/100 * item.price): item.discounted_price)}
                                                </h3>
                                            </div>
                                        );
                                    })}
                            </div>
                            <div className='flex flex-col w-full'>
                                <div className='flex justify-between w-full'>
                                    <h3 className='text-black/80 font-poppins-500 text-lg'>
                                        Total:
                                    </h3>
                                    ₹ {
                                        productDetails ? productDetails.map(prod => {
                                            let currItemInCart =
                                                orderDetails.items.find(
                                                    (cart) =>
                                                        cart.productId ==
                                                        prod._id
                                                );
                                            return currItemInCart.quantity *
                                                (prod.discounted_price == 0
                                                    ? prod.price -
                                                      (prod.discount / 100) *
                                                          prod.price
                                                    : prod.discounted_price);
                                        }).reduce((total, curr) => total + curr, 0).toFixed(2): 0
                                    }
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
                                {orderDetails.driver.name}
                            </h5>
                            <Link
                                to={`/drivers/${orderDetails.driver.id}`}
                                className='w-full'>
                                <Button
                                    label={"View Profile"}
                                    isActive={true}
                                    fullWidth={true}
                                />
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default OrderPage;
