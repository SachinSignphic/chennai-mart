import Layout from "@/components/Layout"
import SearchBar from "@/components/SearchBar"
import { drivers } from "@/utils/dummyOrderData"
import { Helmet } from "react-helmet"
import { IoMdMore } from "react-icons/io"
import { Link } from "react-router-dom"

const Drivers = () => {
  return (
      <Layout>
          <Helmet>
              <title>Drivers</title>
          </Helmet>

          <SearchBar />

          <div className='flex w-full flex-col justify-center p-8 gap-3 bg-white rounded-lg max-w-[90%] self-center'>
              <h1 className='font-poppins-500 text-2xl text-tertiary'>
                  Drivers
              </h1>
              <div className='flex flex-wrap gap-4'>
                {drivers.map((driver) => (
                    <div key={driver.id} className='flex flex-col w-80 p-3 rounded bg-secondary/40 outline outline-1 outline-gray-200'>
                        <div className='flex justify-between items-center'>
                            <img
                                src='/driver.jpg'
                                alt='Driver'
                                className='w-14 h-14 rounded-full'
                            />
                            <Link to={`/drivers/${driver.id}`}>{driver.name}</Link>
                            <button className='bg-secondary rounded-sm grid place-items-center p-2'>
                                <IoMdMore />
                            </button>
                        </div>
                        <div className='grid place-items-center bg-secondary py-2 rounded'>
                            Orders {Math.floor(Math.random() * drivers.length * 20)}
                        </div>
                    </div>
                ))}
              </div>
          </div>
      </Layout>
  );
}

export default Drivers