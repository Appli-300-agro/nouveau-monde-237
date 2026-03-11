import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, X, Check, Clock } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { MOCK_DELIVERERS } from '../../data/mockData';

const DeliverersManager = () => {
  const [deliverers, setDeliverers] = useState(MOCK_DELIVERERS.map(d => ({ ...d, available: true })));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeliverer, setEditingDeliverer] = useState(null);

  const handleDelete = (id) => {
    if(window.confirm("Supprimer ce livreeur ?")) {
        setDeliverers(deliverers.filter(d => d.id !== id));
    }
  };

  const toggleAvailability = (id) => {
    setDeliverers(deliverers.map(d => 
      d.id === id ? { ...d, available: !d.available } : d
    ));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const delivererData = {
        id: editingDeliverer ? editingDeliverer.id : `dev-${Date.now()}`,
        name: formData.get('name'),
        phone: formData.get('phone'),
        zone: formData.get('zone'),
        available: editingDeliverer ? editingDeliverer.available : true
    };

    if (editingDeliverer) {
        setDeliverers(deliverers.map(d => d.id === editingDeliverer.id ? delivererData : d));
    } else {
        setDeliverers([...deliverers, delivererData]);
    }
    setIsModalOpen(false);
    setEditingDeliverer(null);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-heading">Gestion des Livreurs ({deliverers.length})</h1>
        <Button className="flex items-center" onClick={() => {setEditingDeliverer(null); setIsModalOpen(true);}}>
          <Plus className="h-5 w-5 mr-2" />
          Ajouter un Livreur
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-secondary text-sm">
            <tr>
              <th className="p-4 font-medium">Nom</th>
              <th className="p-4 font-medium">Téléphone</th>
              <th className="p-4 font-medium">Zone</th>
              <th className="p-4 font-medium">Disponibilité</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {deliverers.map((dev) => (
              <tr key={dev.id} className="hover:bg-slate-50">
                <td className="p-4 font-medium text-secondary-dark">{dev.name}</td>
                <td className="p-4 text-primary font-medium">{dev.phone}</td>
                <td className="p-4 text-secondary">{dev.zone}</td>
                <td className="p-4">
                  <button 
                    onClick={() => toggleAvailability(dev.id)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      dev.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {dev.available ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {dev.available ? 'Disponible' : 'Indisponible'}
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => {setEditingDeliverer(dev); setIsModalOpen(true);}}
                      className="p-2 text-primary hover:bg-blue-50 rounded"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(dev.id)}
                      className="p-2 text-status-danger hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Formulaire */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingDeliverer ? 'Modifier le livreur' : 'Nouveau livreur'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="h-6 w-6" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase">Nom Complet</label>
                <Input name="name" placeholder="ex: Abdoulaye" defaultValue={editingDeliverer?.name} required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase">Téléphone</label>
                <Input name="phone" placeholder="ex: +237 6XX XX XX XX" defaultValue={editingDeliverer?.phone} required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase">Zone d'intervention</label>
                <Input name="zone" placeholder="ex: Douala (Akwa)" defaultValue={editingDeliverer?.zone} required />
              </div>
              <Button type="submit" className="w-full h-12 mt-4">Enregistrer</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliverersManager;
