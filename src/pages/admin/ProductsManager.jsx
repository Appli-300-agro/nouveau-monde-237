import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { MOCK_PRODUCTS, CATEGORIES } from '../../data/mockData';

const ProductsManager = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id) => {
    if(window.confirm("Supprimer ce produit ?")) {
        setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productData = {
        id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
        name: formData.get('name'),
        category: formData.get('category'),
        price: Number(formData.get('price')),
        stock: Number(formData.get('stock')),
        imageUrl: editingProduct ? editingProduct.imageUrl : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
        description: formData.get('description')
    };

    if (editingProduct) {
        setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
    } else {
        setProducts([productData, ...products]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold font-heading">Gestion des Produits ({products.length})</h1>
        <Button className="flex items-center" onClick={() => {setEditingProduct(null); setIsModalOpen(true);}}>
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Produit
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input placeholder="Rechercher un produit..." className="pl-10" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-secondary text-sm">
              <tr>
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Nom</th>
                <th className="p-4 font-medium">Catégorie</th>
                <th className="p-4 font-medium">Prix</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {products.slice(0, 15).map((product) => (
                <tr key={product.id} className="hover:bg-slate-50">
                  <td className="p-4">
                    <div className="w-10 h-10 bg-slate-100 rounded overflow-hidden">
                      <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-secondary-dark">{product.name}</td>
                  <td className="p-4 text-secondary">{product.category}</td>
                  <td className="p-4 font-bold">{product.price.toLocaleString()} F CFA</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => {setEditingProduct(product); setIsModalOpen(true);}}
                        className="p-2 text-primary hover:bg-blue-50 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
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
      </div>

      {/* Modal Formulaire */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="h-6 w-6" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <Input name="name" placeholder="Nom du produit" defaultValue={editingProduct?.name} required />
              <Select 
                name="category" 
                defaultValue={editingProduct?.category || CATEGORIES[0]} 
                options={CATEGORIES.map(c => ({label: c, value: c}))} 
              />
              <div className="grid grid-cols-2 gap-4">
                <Input name="price" type="number" placeholder="Prix (F CFA)" defaultValue={editingProduct?.price} required />
                <Input name="stock" type="number" placeholder="Stock" defaultValue={editingProduct?.stock} required />
              </div>
              <textarea 
                name="description" 
                placeholder="Description" 
                className="w-full border rounded-md p-2 text-sm h-32 focus:ring-2 focus:ring-primary"
                defaultValue={editingProduct?.description}
              ></textarea>
              <Button type="submit" className="w-full h-12">Enregistrer</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManager;