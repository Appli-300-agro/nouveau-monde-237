import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
  const navigate = useNavigate();
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  const formatPrice = (price) => 
    `${price.toLocaleString('fr-CM')} F CFA`;

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div 
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-300 transform",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
              Mon Panier
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-secondary">
                <ShoppingBag className="h-12 w-12 mb-4 opacity-20" />
                <p>Votre panier est vide</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continuer mes achats
                </Button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-slate-100 pb-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-secondary-dark truncate">{item.name}</h3>
                    <p className="text-primary font-bold mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center mt-2 gap-3">
                      <div className="flex items-center border rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-status-danger p-1 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-4 border-t bg-slate-50">
              <div className="flex justify-between mb-4">
                <span className="font-medium text-secondary">Total</span>
                <span className="font-bold text-xl text-primary">{formatPrice(cartTotal)}</span>
              </div>
              <Button 
                className="w-full h-12 text-lg mb-3"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
              >
                Valider la commande
              </Button>
              <Button 
                variant="outline"
                className="w-full h-10 text-sm"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/devis');
                }}
              >
                Générer un devis (PDF)
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
