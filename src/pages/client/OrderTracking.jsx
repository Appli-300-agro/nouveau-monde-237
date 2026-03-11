import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';
import { MapPin, Truck, ChevronLeft, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrders();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Commande non trouvée</h2>
        <Button onClick={() => navigate('/mon-compte')} className="mt-4">Retour au profil</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-secondary hover:text-primary mb-8 transition-colors"
      >
        <ChevronLeft className="h-5 w-5 mr-1" /> Retour
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Status Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h1 className="text-xl font-bold mb-4">Suivi de commande {order.id}</h1>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="flex gap-4 relative z-10">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white ring-4 ring-white">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-sm">Commande validée</p>
                  <p className="text-xs text-secondary">{order.date}</p>
                </div>
              </div>
              
              <div className="flex gap-4 relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ring-4 ring-white ${order.status === 'En préparation' || order.status === 'En livraison' || order.status === 'Livré' ? 'bg-primary' : 'bg-slate-300'}`}>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-sm">En préparation</p>
                  <p className="text-xs text-secondary">Votre colis est en cours de colisage.</p>
                </div>
              </div>

              <div className="flex gap-4 relative z-10">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ring-4 ring-white ${order.status === 'En livraison' || order.status === 'Livré' ? 'bg-primary' : 'bg-slate-300'}`}>
                  <Truck className="w-3 h-3" />
                </div>
                <div>
                  <p className="font-bold text-sm">En cours de livraison</p>
                  <p className="text-xs text-secondary">Notre livreur est en route vers Douala.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Simulation */}
        <div className="lg:col-span-2">
          <div className="bg-slate-100 rounded-2xl border border-slate-200 h-[500px] relative overflow-hidden flex flex-col items-center justify-center text-center p-8">
            <div className="absolute inset-0 opacity-20 grayscale" style={{ backgroundImage: 'url(https://www.google.com/maps/d/u/0/thumbnail?mid=1Z_InyeVQ_OfXQZ6_QX6_QX6_QX6)', backgroundSize: 'cover' }}></div>
            <div className="relative z-10">
                <div className="bg-primary text-white p-4 rounded-full inline-flex animate-bounce mb-4 shadow-xl">
                    <MapPin className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-secondary-dark">Géolocalisation en temps réel</h2>
                <p className="text-secondary max-w-sm mx-auto mt-2">
                    Livreur : <strong>Abdoulaye</strong> <br/>
                    Position : <strong>Près du Rond-point Deido, Douala</strong>
                </p>
                <div className="mt-8 bg-white p-4 rounded-xl shadow-sm inline-block border border-slate-200">
                    <p className="text-xs font-bold text-primary uppercase">Arrivée estimée</p>
                    <p className="text-3xl font-bold">~ 25 min</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
