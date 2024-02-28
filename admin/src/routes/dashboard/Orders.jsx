import Layout from "@/components/Layout"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

const Orders = () => {
  return (
    <Layout>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <p className="">Hello Orders</p>
      <Link to={'/dashboard'}>← back</Link>
    </Layout>
  )
}

export default Orders