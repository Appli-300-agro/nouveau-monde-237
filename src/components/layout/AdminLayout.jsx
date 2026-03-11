import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Box, ShoppingCart, Users, LogOut, Home, Truck, User } from 'lucide-react';
import { cn } from '../../utils/cn';
import { auth } from '../../services/firebase';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { label: 'Tableau de bord', icon: LayoutDashboard, path: '/admin' },
    { label: 'Produits', icon: Box, path: '/admin/products' },
    { label: 'Commandes', icon: ShoppingCart, path: '/admin/orders' },
    { label: 'Livreurs', icon: Truck, path: '/admin/deliverers' },
    { label: 'Mon Profil', icon: User, path: '/mon-compte' },
    { label: 'Utilisateurs', icon: Users, path: '/admin/users' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary-dark text-white flex flex-col fixed h-full">
        <div className="p-6">
          <h2 className="text-xl font-heading font-bold text-white">Ass Admin</h2>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                  isActive ? "bg-primary text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link to="/" className="flex items-center space-x-3 p-3 text-slate-400 hover:text-white transition-colors">
            <Home className="h-5 w-5" />
            <span>Voir le site</span>
          </Link>
          <button 
            onClick={() => auth.signOut()}
            className="flex items-center space-x-3 p-3 w-full text-status-danger hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
