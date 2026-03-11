import React from 'react';
import { TrendingUp, ShoppingBag, Users, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Ventes du mois', value: '4 520 000 F CFA', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Commandes', value: '24', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Nouveaux Clients', value: '12', icon: Users, color: 'bg-purple-500' },
    { label: 'Taux de conversion', value: '3.2%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold font-heading">Tableau de Bord</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-2 rounded-lg text-white`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
              <p className="text-secondary text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold">Commandes Récentes</h2>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-secondary text-sm">
            <tr>
              <th className="p-4 font-medium">Client</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Montant</th>
              <th className="p-4 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-secondary-dark">Client #{1234 + i}</td>
                <td className="p-4 text-secondary">04/02/2026</td>
                <td className="p-4 font-bold">125 000 F CFA</td>
                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    Livré
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
