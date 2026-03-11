import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_ORDERS as INITIAL_ORDERS } from '../data/mockData';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('ass_equip_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders(INITIAL_ORDERS);
    }
  }, []);

  const addOrder = (newOrder) => {
    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem('ass_equip_orders', JSON.stringify(updated));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setOrders(updated);
    localStorage.setItem('ass_equip_orders', JSON.stringify(updated));
  };

  const confirmOrderReceipt = (orderId) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status: 'Livré' } : o);
    setOrders(updated);
    localStorage.setItem('ass_equip_orders', JSON.stringify(updated));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, confirmOrderReceipt }}>
      {children}
    </OrderContext.Provider>
  );
};
