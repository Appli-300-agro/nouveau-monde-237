import React from 'react';
import { Target, Lightbulb, ShieldCheck, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary-dark mb-6">À Propos de Le Nouveau Monde</h1>
          <p className="text-lg text-secondary max-w-3xl mx-auto leading-relaxed">
            Votre espace de détente et de gastronomie à Bonamoussadi. Un concept unique alliant restaurant, salon de thé et salle de jeux.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-primary">Notre Concept</h2>
            <p className="text-secondary leading-relaxed">
              Sous la direction de <strong>Mme Ruth Soppo Muna</strong>, Le Nouveau Monde s'est imposé comme une destination incontournable à Douala. 
              Plus qu'un simple restaurant, c'est un véritable pôle de divertissement conçu pour toutes les générations. 
              Que vous veniez pour notre cuisine fusion (Camerounaise, Africaine et Occidentale) ou pour nos espaces de loisirs, 
              chaque détail est pensé pour votre plaisir.
            </p>
            <p className="text-secondary leading-relaxed">
              Notre <strong>Salle de Jeux</strong> unique propose des activités variées : Billard, Baby-foot, Mini-golf, Fléchettes, Échecs et Jeux de cartes. 
              C'est le lieu idéal pour décompresser après une journée de travail ou s'amuser en famille le week-end.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <Target className="text-primary h-8 w-8" />
                <h4 className="font-bold">Convivialité</h4>
                <p className="text-xs text-secondary">Karaoke les jeudis et Live Music les samedis et dimanches.</p>
              </div>
              <div className="space-y-2">
                <Users className="text-primary h-8 w-8" />
                <h4 className="font-bold">Événementiel</h4>
                <p className="text-xs text-secondary">Une salle de fête prestigieuse de 500 places disponible.</p>
              </div>
            </div>
          </div>
          <div className="bg-primary/5 rounded-3xl p-8 border-2 border-primary/10 border-dashed">
            <h3 className="text-xl font-bold mb-6 text-secondary-dark">L'Expérience Nouveau Monde</h3>
            <ul className="grid grid-cols-1 gap-3">
              {[
                "Pizzéria Artisanale & Fast-Food Premium",
                "Grillades (Poisson, Poulet, Saucisses)",
                "Cuisine Africaine & Occidentale",
                "Salon de Thé & Bar à Cocktails",
                "Salle de Jeux (Billard, Mini-golf, Échecs)",
                "Salle de Réception (Capacité 500 personnes)",
                "Service Traiteur (Bureau & Cérémonies)",
                "Décoration & Design d'Événements"
              ].map(item => (
                <li key={item} className="flex items-center text-sm text-secondary">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mb-10 text-center bg-primary p-16 rounded-[2rem] text-white">
        <h2 className="text-3xl font-bold mb-6">Envie de découvrir Le Nouveau Monde ?</h2>
        <p className="text-primary-light mb-8 max-w-2xl mx-auto">
          Venez nous rendre visite au carrefour ancienne mairie Bonamoussadi pour une expérience unique.
        </p>
        <button className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors">
          Réserver une table
        </button>
      </section>
    </div>
  );
};

export default About;
