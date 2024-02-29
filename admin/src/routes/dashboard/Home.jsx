import Card from "@/components/Card";
import Layout from "@/components/Layout";
import SearchBar from "@/components/SearchBar";
import { Helmet } from "react-helmet";
import { LuPackagePlus } from "react-icons/lu";
import { GoPackage } from "react-icons/go";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";
import DashboardLineGraph from "@/components/DashboardLineGraph";

const INFO_CARDS_DATA = [
    {
        title: "TOTAL ORDERS",
        icon: () => <LuPackagePlus className='text-teal' />,
        value: "240",
    },
    {
        title: "PRODUCTS SOLD",
        icon: () => <GoPackage className='text-teal' />,
        value: "12",
    },
    {
        title: "REVENUE",
        icon: () => <MdCurrencyRupee className='text-teal' />,
        value: "13,255.34",
    },
];

const FAKE_ORDER_DATA = [
    { customer: "Frank", orderId: "#5678" },
    { customer: "Alice", orderId: "#91011" },
    { customer: "Charlie", orderId: "#303132" },
    { customer: "David", orderId: "#242526" },
    { customer: "Isaac", orderId: "#151617" },
    { customer: "Grace", orderId: "#242526" },
    { customer: "Eve", orderId: "#91011" },
    { customer: "David", orderId: "#242526" },
    { customer: "Hannah", orderId: "#91011" },
    { customer: "Alice", orderId: "#5678" },
];

const Home = () => {
    return (
        <Layout>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <SearchBar />
            <div className='flex mt-6'>
                {/* cards and graph */}
                <div className='flex flex-col gap-8 min-w-[65%] justify-center items-center'>
                    <div className='flex justify-center items-center flex-wrap gap-6'>
                        {INFO_CARDS_DATA.map((info, i) => (
                            <Card
                                title={info.title}
                                value={info.value}
                                icon={info.icon}
                                key={i}
                            />
                        ))}
                    </div>
                    <div className='flex justify-center items-center p-5'>
                        <DashboardLineGraph />
                    </div>
                </div>

                {/* for recent orders */}
                <div className='flex items-center justify-center w-full'>
                    <div className='flex flex-col gap-5 bg-white rounded-lg p-5 w-[70%] shadow-md'>
                        <h4 className='font-poppins-700 text-lg text-black/70'>
                            RECENT ORDERS
                        </h4>
                        <ul className='list-none divide-y-[1px]'>
                            {FAKE_ORDER_DATA.map((data, i) => (
                                <Link
                                    to={"/orders/" + data.orderId.slice(1)}
                                    key={i}
                                    className='flex font-poppins-500 my-4 hover:text-teal text-base text-black/70 w-full justify-between items-center'>
                                    <p>{data.customer}</p>
                                    <p>{data.orderId}</p>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
