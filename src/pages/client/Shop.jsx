import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ui/ProductCard';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { MOCK_PRODUCTS, CATEGORIES } from '../../data/mockData';
import { Search, Filter } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Shop = () => {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');

  // Met à jour l'URL si on change de catégorie via le filtre local
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-6 flex-shrink-0">
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtres
            </h3>
            
            {/* Categories */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-secondary-dark mb-2">Catégories</h4>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleCategoryChange('All')}
                  className={`text-left text-sm py-1.5 px-3 rounded-md transition-colors ${
                    selectedCategory === 'All' 
                      ? 'bg-primary/10 text-primary font-medium' 
                      : 'text-secondary hover:bg-slate-50'
                  }`}
                >
                  Tout voir
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-left text-sm py-1.5 px-3 rounded-md transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-primary/10 text-primary font-medium' 
                        : 'text-secondary hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
             <h1 className="text-2xl font-heading font-bold text-secondary-dark">
                Catalogue {selectedCategory !== 'All' && <span className="text-primary">/ {selectedCategory}</span>}
             </h1>
             <div className="relative w-full sm:w-72">
                <Input 
                    type="text" 
                    placeholder="Rechercher un produit..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
             </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={() => addToCart(product)} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p className="text-secondary text-lg">Aucun produit ne correspond à votre recherche.</p>
                <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {setSearchTerm(''); setSelectedCategory('All');}}
                >
                    Réinitialiser les filtres
                </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
