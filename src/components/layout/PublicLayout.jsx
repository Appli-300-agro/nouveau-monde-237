import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import Chatbot from '../ui/Chatbot';
import { useAuth } from '../../context/AuthContext';

const PublicLayout = () => {
  const { isAdmin } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {!isAdmin && <CartDrawer />}
      <Chatbot />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
