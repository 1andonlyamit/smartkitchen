import React from 'react';
import Layout from '../components/layout/Layout_';
import Footer from '../components/footer/Footer';
import InventoryGrid from '../components/dashboard/InventoryGrid';
import OverviewCard from '../components/dashboard/OverviewCard';
import RecepieSuggestions from '../components/dashboard/RecepieSuggestions';
import WasteByStation from '../components/dashboard/WasteByStation';
import WasteCostChart from '../components/dashboard/WasteCostChart';
import WasteRecommendations from '../components/dashboard/Wasterecommendations';
import { ShoppingCart, TrendingDown, AlertTriangle, Utensils } from 'lucide-react';

function Dashboard() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Layout>
        <div className="container-fluid px-4 pt-4">
          <h2 className="mb-4 text-light">Kitchen Dashboard</h2>
          
          {/* Overview Cards */}
          <div className="row mb-4 g-3">
            <div className="col-md-3">
              <OverviewCard 
                title="Total Inventory Items"
                value="248 items"
                icon={<ShoppingCart size={20} />}
                change="5.2%"
                changeType="positive"
              />
            </div>
            <div className="col-md-3">
              <OverviewCard 
                title="Waste Reduction"
                value="12.5%"
                icon={<TrendingDown size={20} />}
                change="3.8%"
                changeType="positive"
              />
            </div>
            <div className="col-md-3">
              <OverviewCard 
                title="Items Expiring Soon"
                value="15 items"
                icon={<AlertTriangle size={20} />}
                change="2 items"
                changeType="negative"
              />
            </div>
            <div className="col-md-3">
              <OverviewCard 
                title="Available Recipes"
                value="36 recipes"
                icon={<Utensils size={20} />}
              />
            </div>
          </div>
          
          {/* Inventory Grid */}
          <div className="card bg-dark text-white border-secondary shadow-sm mb-4">
            <div className="card-body p-0">
              <InventoryGrid />
            </div>
          </div>
          
          {/* Charts and Recommendations */}
          <div className="row mb-4 g-4">
            <div className="col-md-6">
              <WasteCostChart />
            </div>
            <div className="col-md-6">
              <WasteByStation />
            </div>
          </div>
          
          <div className="row mb-4 g-4">
            <div className="col-md-6">
              <WasteRecommendations />
            </div>
            <div className="col-md-6">
              <RecepieSuggestions />
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </div>
  );
}

export default Dashboard;