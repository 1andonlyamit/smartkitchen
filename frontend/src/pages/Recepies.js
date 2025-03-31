import React from 'react'
import Layout from '../components/layout/Layout_'
import Footer from '../components/footer/Footer'

function Recepies() {
  return (
    <div>
      <Layout>
        <h1 className="text-light">Recipe Suggestions</h1>
        <p className="text-muted">Here are some recipe suggestions based on your inventory.</p>
        
      </Layout>
      <Footer/>
    </div>
  )
}

export default Recepies