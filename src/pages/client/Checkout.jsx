import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import Button from '../../components/ui/Button';
// ...
const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Livraison state
  const [city, setCity] = useState('Douala');
  const [neighborhood, setNeighborhood] = useState('Akwa');
  const [paymentMethod, setPaymentMethod] = useState('momo');

  const deliveryFee = useMemo(() => {
    return DELIVERY_ZONES[city][neighborhood] || 0;
  }, [city, neighborhood]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Création de l'objet commande
    const newOrder = {
        id: `ORD-${Date.now().toString().substr(-6)}`,
        customer: 'Client Test', // Simulé
        date: new Date().toLocaleDateString('fr-FR'),
        total: cartTotal + deliveryFee,
        status: 'En préparation',
        items: cart
    };
    
    addOrder(newOrder);
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  const cityOptions = Object.keys(DELIVERY_ZONES).map(c => ({ label: c, value: c }));
  const neighborhoodOptions = Object.keys(DELIVERY_ZONES[city]).map(n => ({ label: n, value: n }));

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
        <Button onClick={() => navigate('/catalogue')}>Retour au catalogue</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-heading font-bold mb-8">Finaliser la commande</h1>
      
      {isSuccess ? (
        <Alert type="success" title="Commande validée !">
          Merci pour votre achat. Vous allez être redirigé vers l'accueil.
        </Alert>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Détails de Livraison
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Prénom" required />
                <Input placeholder="Nom" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary uppercase">Ville</label>
                    <Select 
                        options={cityOptions} 
                        value={city} 
                        onChange={(e) => {setCity(e.target.value); setNeighborhood(Object.keys(DELIVERY_ZONES[e.target.value])[0]);}} 
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-secondary uppercase">Quartier</label>
                    <Select 
                        options={neighborhoodOptions} 
                        value={neighborhood} 
                        onChange={(e) => setNeighborhood(e.target.value)} 
                    />
                </div>
              </div>
              <Input placeholder="Lieu de réception (ex: Immeuble Blue, 3ème étage)" required />
              <Input placeholder="Point de repère (ex: À côté de la boulangerie)" />
              <Input placeholder="Téléphone de contact" type="tel" required />
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4">
              <h2 className="text-xl font-bold mb-4">Moyen de paiement</h2>
              <div className="space-y-3">
                <label className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors ${paymentMethod === 'momo' ? 'border-primary bg-blue-50/50' : 'border-slate-200'}`}>
                  <input type="radio" name="payment" value="momo" className="w-4 h-4 text-primary" checked={paymentMethod === 'momo'} onChange={() => setPaymentMethod('momo')} />
                  <div className="ml-4">
                    <p className="font-bold text-sm">MTN Mobile Money (MoMo)</p>
                    <p className="text-xs text-secondary">Paiement instantané via votre compte MTN</p>
                  </div>
                </label>

                <label className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-orange-50 transition-colors ${paymentMethod === 'om' ? 'border-orange-500 bg-orange-50/50' : 'border-slate-200'}`}>
                  <input type="radio" name="payment" value="om" className="w-4 h-4 text-orange-500" checked={paymentMethod === 'om'} onChange={() => setPaymentMethod('om')} />
                  <div className="ml-4">
                    <p className="font-bold text-sm">Orange Money (OM)</p>
                    <p className="text-xs text-secondary">Paiement sécurisé via Orange Money Cameroon</p>
                  </div>
                </label>

                <label className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${paymentMethod === 'card' ? 'border-primary bg-slate-50' : 'border-slate-200'}`}>
                  <input type="radio" name="payment" value="card" className="w-4 h-4 text-primary" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  <div className="ml-4">
                    <p className="font-bold text-sm">Carte Bancaire (VISA / Mastercard)</p>
                    <p className="text-xs text-secondary">Débit direct sécurisé</p>
                  </div>
                </label>
              </div>

              {/* Détails spécifiques au paiement */}
              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 animate-in fade-in slide-in-from-top-2 duration-300">
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wider text-secondary">Informations de paiement</h3>
                {paymentMethod === 'card' ? (
                  <div className="space-y-3">
                    <Input placeholder="Numéro de carte (0000 0000 0000 0000)" required />
                    <div className="grid grid-cols-2 gap-3">
                      <Input placeholder="MM/AA" required />
                      <Input placeholder="CVV" type="password" maxLength="3" required />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-secondary mb-2">
                      Un message de confirmation sera envoyé sur votre téléphone après validation.
                    </p>
                    <Input placeholder="Numéro de téléphone (ex: 6XXXXXXXX)" type="tel" required />
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full h-14 text-lg">
                Confirmer et Payer ({(cartTotal + deliveryFee).toLocaleString()} F CFA)
            </Button>
          </form>

          <div className="bg-slate-50 p-8 rounded-2xl h-fit border border-slate-100">
            <h2 className="text-xl font-bold mb-6">Récapitulatif</h2>
            <div className="space-y-4 mb-6">
                {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-secondary">{item.name} x{item.quantity}</span>
                    <span className="font-bold">{(item.price * item.quantity).toLocaleString()} F CFA</span>
                </div>
                ))}
            </div>
            
            <div className="space-y-2 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-sm">
                    <span className="text-secondary">Sous-total</span>
                    <span>{cartTotal.toLocaleString()} F CFA</span>
                </div>
                <div className="flex justify-between text-sm text-primary">
                    <span className="flex items-center"><Truck className="h-4 w-4 mr-1"/> Livraison ({city})</span>
                    <span>{deliveryFee.toLocaleString()} F CFA</span>
                </div>
                <div className="flex justify-between font-bold text-xl pt-4 text-secondary-dark">
                    <span>Total</span>
                    <span>{(cartTotal + deliveryFee).toLocaleString()} F CFA</span>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;