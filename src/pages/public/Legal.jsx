import React from 'react';
import { useLocation } from 'react-router-dom';

const Legal = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-heading font-bold mb-8">
        {isPrivacy ? 'Politique de Confidentialité' : 'Conditions Générales de Vente (CGV)'}
      </h1>
      <div className="prose prose-slate max-w-none space-y-6 text-secondary">
        <section>
          <h2 className="text-xl font-bold text-secondary-dark mb-3">1. Préambule</h2>
          <p>
            Les présentes conditions régissent les ventes réalisées par l'entreprise nouveau.monde.237 via son site web. 
            Toute commande implique l'adhésion entière et sans réserve du client.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-secondary-dark mb-3">2. Produits et Prix</h2>
          <p>
            Les produits proposés sont ceux figurant sur le catalogue. Les prix sont exprimés en Francs CFA (F CFA) 
            et n'incluent pas les frais de livraison calculés lors de la commande.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-secondary-dark mb-3">3. Paiement et Livraison</h2>
          <p>
            Le paiement s'effectue par Mobile Money ou Carte Bancaire. La livraison est assurée dans les zones 
            définies (Douala, Yaoundé) sous un délai de 24h à 72h.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-secondary-dark mb-3">4. Protection des données</h2>
          <p>
            Conformément à la réglementation, vos données personnelles ne sont utilisées que pour le traitement 
            de vos commandes et l'amélioration de votre expérience utilisateur.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Legal;
