import React, { useState } from 'react';
import { Users, Search, UserPlus, Mail, Shield, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { MOCK_USERS_LIST } from '../../data/mockData';

const UsersManager = () => {
  const [users, setUsers] = useState(MOCK_USERS_LIST);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-heading uppercase tracking-wide text-secondary-dark flex items-center">
          <Users className="mr-3 h-6 w-6 text-primary" />
          Gestion des Utilisateurs
        </h1>
        <Button className="flex items-center">
          <UserPlus className="h-5 w-5 mr-2" />
          Inviter un utilisateur
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input placeholder="Rechercher par nom ou email..." className="pl-10" />
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-secondary text-sm">
            <tr>
              <th className="p-4 font-medium">Utilisateur</th>
              <th className="p-4 font-medium">Rôle</th>
              <th className="p-4 font-medium">Statut</th>
              <th className="p-4 font-medium">Date d'inscription</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-primary">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-secondary-dark">{u.name}</p>
                      <p className="text-xs text-secondary">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 uppercase text-[10px] font-bold tracking-widest">
                  <span className={u.role === 'admin' ? 'text-primary' : 'text-secondary'}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    u.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {u.status}
                  </span>
                </td>
                <td className="p-4 text-secondary">{u.joinDate}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-secondary hover:text-primary transition-colors" title="Envoyer un email">
                      <Mail className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-secondary hover:text-primary transition-colors" title="Modifier les droits">
                      <Shield className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-status-danger hover:bg-red-50 rounded" title="Supprimer">
                      <Trash2 className="h-4 w-4" />
                    </button>
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

export default UsersManager;
