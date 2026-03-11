import React, { useRef } from 'react';
import { useCart } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import { FileText, Download, Printer, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Quote = () => {
  const { cart, cartTotal } = useCart();
  const navigate = useNavigate();
  const quoteRef = useRef();

  // Logique des frais de livraison
  const clientCity = "Douala"; // Simulation, pourrait être dynamique
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryPricePerItem = clientCity.toLowerCase() === "douala" ? 3000 : 10000;
  const totalDelivery = totalItems * deliveryPricePerItem;
  
  const tvaRate = 0.1925;
  const tvaAmount = cartTotal * tvaRate;
  const totalNet = cartTotal + tvaAmount + totalDelivery;

  const handlePrint = () => {
    window.print();
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Votre panier est vide pour un devis.</h2>
        <Button onClick={() => navigate('/catalogue')}>Retour au catalogue</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex justify-between items-center mb-8 no-print">
        <button onClick={() => navigate(-1)} className="flex items-center text-secondary hover:text-primary">
          <ChevronLeft className="w-5 h-5 mr-1" /> Retour
        </button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" /> Imprimer / PDF
          </Button>
        </div>
      </div>

      <div ref={quoteRef} className="bg-white p-12 rounded-xl shadow-lg border border-slate-200 min-h-[1000px] flex flex-col">
        {/* Header Devis */}
        <div className="flex justify-between items-start border-b-2 border-primary pb-8 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary mb-2 uppercase">Devis Pro-forma</h1>
            <p className="text-sm text-secondary">N° QT-{Date.now().toString().substr(-6)}</p>
            <p className="text-sm text-secondary">Date : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold">nouveau.monde.237</h2>
            <p className="text-sm text-secondary">Douala, Cameroun</p>
            <p className="text-sm text-secondary">contact@nouveaumonde237.cm</p>
            <p className="text-sm text-secondary">+237 600 00 00 00</p>
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-12">
          <h3 className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">Destinataire</h3>
          <p className="font-bold">Client Professionnel / Particulier</p>
          <p className="text-sm text-secondary">Cameroun</p>
        </div>

        {/* Table Items */}
        <div className="flex-1">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-slate-100 text-xs font-bold text-secondary uppercase">
                <th className="py-4">Description</th>
                <th className="py-4 text-center">Qté</th>
                <th className="py-4 text-right">Prix Unitaire</th>
                <th className="py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cart.map((item) => (
                <tr key={item.id} className="text-sm">
                  <td className="py-4 font-medium text-secondary-dark">{item.name}</td>
                  <td className="py-4 text-center">{item.quantity}</td>
                  <td className="py-4 text-right">{item.price.toLocaleString()} F CFA</td>
                  <td className="py-4 text-right font-bold">{(item.price * item.quantity).toLocaleString()} F CFA</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="mt-8 border-t-2 border-slate-100 pt-8">
          <div className="flex justify-end">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Sous-total HT</span>
                <span>{cartTotal.toLocaleString()} F CFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Frais Livraison ({totalItems} équ.)</span>
                <span>{totalDelivery.toLocaleString()} F CFA</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">TVA (19,25%)</span>
                <span>{Math.round(tvaAmount).toLocaleString()} F CFA</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-primary pt-3 border-t">
                <span>Total Net</span>
                <span>{Math.round(totalNet).toLocaleString()} F CFA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-[10px] text-secondary text-center space-y-1">
          <p>nouveau.monde.237 - RC/DLA/202X/B/XXXX - NIU : XXXXXXXXXXXXX</p>
          <p>Validité de l'offre : 15 jours à compter de la date d'émission.</p>
        </div>
      </div>
    </div>
  );
};

export default Quote;
