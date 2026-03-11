import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product, onAddToCart }) => {
  const { isAdmin } = useAuth();

  return (
    <div className="group relative bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      <Link to={`/produit/${product.id}`}>
        <div className="aspect-square w-full bg-slate-100 overflow-hidden relative">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              No Image
            </div>
          )}
          {product.featured && (
            <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg animate-pulse">
                Vedette
            </div>
          )}
        </div>
      </Link>
            <div className="p-6 relative">
        {/* Activity Related Background Texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400)', backgroundSize: 'cover' }} />
        <Link to={`/produit/${product.id}`}>
          <h3 className="text-lg font-bold text-secondary-dark line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-xs text-secondary line-clamp-2 font-light">
          {product.description}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Prix</span>
            <span className="text-lg font-black text-primary">
                {product.price.toLocaleString('fr-CM')} F CFA
            </span>
          </div>
          {!isAdmin && (
            <Button 
                size="sm" 
                onClick={() => onAddToCart(product)}
                className="rounded-xl shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              Ajouter
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
