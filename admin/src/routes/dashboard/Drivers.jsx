import Layout from "@/components/Layout"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom"

const Drivers = () => {
  return (
    <Layout>
      <Helmet>
        <title>Drivers</title>
      </Helmet>
      <p className="text-white">Hello Drivers</p>
      <Link to={'/dashboard'}>← back</Link>
    </Layout>
  )
}

export default Drivers