import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAdmin } = useAuth();

  const product = useMemo(() => 
    MOCK_PRODUCTS.find(p => p.id === id), 
  [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Produit non trouvé</h2>
        <Button onClick={() => navigate('/catalogue')} className="mt-4">Retour au catalogue</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-secondary hover:text-primary mb-8 transition-colors"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Retour
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="bg-slate-50 rounded-2xl overflow-hidden aspect-square">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div>
            <span className="text-primary font-bold text-sm uppercase tracking-wider">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary-dark mt-2">{product.name}</h1>
          </div>

          <p className="text-3xl font-bold text-primary">
            {product.price.toLocaleString()} F CFA
          </p>

          <p className="text-secondary leading-relaxed">
            {product.description}
          </p>

          <div className="pt-6 space-y-4">
            {!isAdmin && (
              <Button 
                size="lg" 
                className="w-full md:w-auto h-14 px-12 text-lg"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ajouter au panier
              </Button>
            )}
            
            <p className="text-sm text-secondary">
              Stock disponible : <span className="font-bold text-secondary-dark">{product.stock} unités</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t">
            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl">
              <ShieldCheck className="h-6 w-6 text-primary mb-2" />
              <span className="text-xs font-bold">Garantie 2 ans</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl">
              <Truck className="h-6 w-6 text-primary mb-2" />
              <span className="text-xs font-bold">Livraison Express</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl">
              <RefreshCw className="h-6 w-6 text-primary mb-2" />
              <span className="text-xs font-bold">SAV Réactif</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
