import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import Shop from './pages/client/Shop';
import ProductDetail from './pages/client/ProductDetail';
import Login from './pages/public/Login';
import Checkout from './pages/client/Checkout';
import Profile from './pages/client/Profile';
import Quote from './pages/client/Quote';
import OrderTracking from './pages/client/OrderTracking';
import Legal from './pages/public/Legal';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ProductsManager from './pages/admin/ProductsManager';
import OrdersManager from './pages/admin/OrdersManager';
import DeliverersManager from './pages/admin/DeliverersManager';
import UsersManager from './pages/admin/UsersManager';

function App() {
  return (
    <Routes>
      {/* Routes Publiques (avec Navbar/Footer) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Shop />} />
        <Route path="/produit/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/devis" element={<Quote />} />
        <Route path="/cgv" element={<Legal />} />
        <Route path="/privacy" element={<Legal />} />
        
        {/* Routes Client Protégées */}
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/mon-compte" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/suivi/:id" element={
          <ProtectedRoute>
            <OrderTracking />
          </ProtectedRoute>
        } />
      </Route>

      {/* Routes Admin (Layout spécifique + Protection Admin) */}
      <Route path="/admin" element={
        <ProtectedRoute adminOnly={true}>
          <AdminLayout><Outlet /></AdminLayout>
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ProductsManager />} />
        <Route path="orders" element={<OrdersManager />} />
        <Route path="deliverers" element={<DeliverersManager />} />
        <Route path="users" element={<UsersManager />} />
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<div className="p-4 container mx-auto text-center py-20 text-2xl font-bold">404 - Page non trouvée</div>} />
    </Routes>
  );
}

export default App;
