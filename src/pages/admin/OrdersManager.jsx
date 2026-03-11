import React from 'react';
import { Eye, CheckCircle, Clock, Truck, MapPin } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const OrdersManager = () => {
  const { orders, updateOrderStatus } = useOrders();
  const navigate = useNavigate();

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Livré': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'En préparation': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'En livraison': return <Truck className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-slate-500" />;
    }
  };

  const statusColors = {
    'En préparation': 'bg-blue-100 text-blue-700',
    'En livraison': 'bg-orange-100 text-orange-700',
    'Livré': 'bg-green-100 text-green-700'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-heading uppercase tracking-wide text-secondary-dark">Gestion des Commandes</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-secondary text-sm">
            <tr>
              <th className="p-4 font-medium">ID Commande</th>
              <th className="p-4 font-medium">Client</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Montant</th>
              <th className="p-4 font-medium">Statut</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-primary">{order.id}</td>
                <td className="p-4 font-medium">{order.customer}</td>
                <td className="p-4 text-secondary">{order.date}</td>
                <td className="p-4 font-bold">{order.total.toLocaleString()} F CFA</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end items-center gap-2">
                    <select 
                      className="text-xs border rounded p-1"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      disabled={order.status === 'Livré'}
                    >
                      <option value="En préparation">Préparation</option>
                      <option value="En livraison">Livraison</option>
                      {order.status === 'Livré' && <option value="Livré">Confirmé par client</option>}
                    </select>
                    <Button variant="ghost" size="sm" className="p-1">
                        <Eye className="h-4 w-4" />
                    </Button>
                    {(order.status === 'En préparation' || order.status === 'En livraison') && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1 text-primary"
                        onClick={() => navigate(`/suivi/${order.id}`)}
                        title="Suivre la livraison"
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersManager;