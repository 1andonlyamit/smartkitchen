import React from 'react'
import Layout from '../components/layout/Layout_'
import Footer from '../components/footer/Footer'
import InventoryGrid from '../components/dashboard/InventoryGrid'

function Dashboard() {
  return (
    <div>
      <Layout>
      <InventoryGrid/>
      </Layout>
      <Footer/>
    </div>
  )
}

export default Dashboard