import React from 'react';
import { auth } from '../../services/firebase';
import Button from '../../components/ui/Button';
import { Package, User, LogOut, ChevronRight, Briefcase, Phone, Truck } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { MOCK_DELIVERERS } from '../../data/mockData';

const Profile = () => {
  const user = auth.currentUser;
  const { orders, confirmOrderReceipt } = useOrders();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const getStatusColor = (status) => {
    switch (status) {
      case 'Livré': return 'bg-green-100 text-green-700';
      case 'En préparation': return 'bg-blue-100 text-blue-700';
      case 'En livraison': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Profil */}
        <aside className="w-full md:w-64 space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              {user?.displayName?.charAt(0) || 'U'}
            </div>
            <h2 className="font-bold text-lg">{user?.displayName || 'Utilisateur'}</h2>
            <p className="text-sm text-secondary mb-4">{user?.email}</p>
            {isAdmin && <span className="bg-primary text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase">Administrateur</span>}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full text-status-danger border-status-danger hover:bg-red-50"
            onClick={() => auth.signOut()}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </aside>

        {/* Contenu Principal */}
        <div className="flex-1 space-y-10">
          
          {/* Section Informations Professionnelles (Admin uniquement) */}
          {isAdmin && (
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold flex items-center">
                <Briefcase className="mr-2 h-6 w-6 text-primary" />
                Informations Professionnelles
              </h2>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-secondary uppercase mb-1">Nom du Prestataire</p>
                  <p className="font-medium">TCHANGANG TCHAGANG Aubry</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary uppercase mb-1">Fonction</p>
                  <p className="font-medium">Directeur Technique chez GIORTECH & SoloPreneur Tech</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs font-bold text-secondary uppercase mb-1">Qualifications</p>
                  <p className="text-sm">Ingénieur Génie Mécanique, Mécatronique et Fullstack Django, MERN & FERN</p>
                </div>
              </div>
            </section>
          )}

          {/* Section Livreurs (Admin uniquement) */}
          {isAdmin && (
            <section className="space-y-4">
              <h2 className="text-2xl font-heading font-bold flex items-center">
                <Truck className="mr-2 h-6 w-6 text-primary" />
                Équipe de Livraison
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_DELIVERERS.map(dev => (
                  <div key={dev.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <p className="font-bold text-secondary-dark">{dev.name}</p>
                    <p className="text-sm text-primary flex items-center mt-1">
                      <Phone className="w-3 h-3 mr-1" /> {dev.phone}
                    </p>
                    <p className="text-[10px] text-secondary mt-2 uppercase font-medium">{dev.zone}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Historique Commandes */}
          <section className="space-y-4">
            <h2 className="text-2xl font-heading font-bold flex items-center">
              <Package className="mr-2 h-6 w-6 text-primary" />
              {isAdmin ? "Toutes les Commandes" : "Mes Commandes"}
            </h2>

            <div className="space-y-4">
              {orders.length > 0 ? orders.map((order) => (
                <div 
                  key={order.id} 
                  onClick={() => (order.status === 'En préparation' || order.status === 'En livraison') && navigate(`/suivi/${order.id}`)}
                  className={`bg-white p-6 rounded-xl border border-slate-200 flex flex-col transition-all ${
                    (order.status === 'En préparation' || order.status === 'En livraison') 
                      ? 'cursor-pointer hover:border-primary hover:shadow-md' 
                      : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-bold text-secondary-dark">{order.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-secondary">Le {order.date} • {order.customer}</p>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-sm text-secondary">Total</p>
                        <p className="font-bold text-primary">{order.total.toLocaleString()} F CFA</p>
                      </div>
                      {!isAdmin && order.status === 'En livraison' && (
                        <Button 
                          size="sm" 
                          variant="primary" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            if(window.confirm("Confirmez-vous avoir reçu ce colis ?")) confirmOrderReceipt(order.id);
                          }}
                        >
                          Confirmer
                        </Button>
                      )}
                      <ChevronRight className="h-5 w-5 text-slate-300" />
                    </div>
                  </div>

                  {/* Info Livreur pour l'Admin ou le Client en Livraison */}
                  {order.status === 'En livraison' && (
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-4 bg-blue-50/30 p-3 rounded-lg">
                      <div className="p-2 bg-white rounded-full">
                        <Truck className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-sm">
                        <p className="text-secondary text-xs font-bold uppercase tracking-tighter">Livreur en charge</p>
                        <p className="font-bold text-secondary-dark">
                          {MOCK_DELIVERERS[0].name} <span className="mx-2 text-slate-300">|</span> 
                          <span className="text-primary">{MOCK_DELIVERERS[0].phone}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )) : (
                  <div className="bg-slate-50 p-12 text-center rounded-xl border border-dashed">
                      <p className="text-secondary">Aucune commande à afficher.</p>
                  </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;