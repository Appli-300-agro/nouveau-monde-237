import React from 'react';
import { Target, Lightbulb, ShieldCheck, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20 border-b">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary-dark mb-6">À Propos de nouveau.monde.237</h1>
          <p className="text-lg text-secondary max-w-3xl mx-auto leading-relaxed">
            votre destination gastronomique d'exception au Cameroun, alliant produits du terroir et savoir-faire culinaire, 
            les solutions énergétiques durables et la sécurité intelligente.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-primary">Notre Mission</h2>
            <p className="text-secondary leading-relaxed">
              Afin de renforcer notre visibilité digitale, accroître nos ventes et améliorer l'expérience client, 
              nouveau.monde.237 s'est donné pour mission de fournir des produits alimentaires de haute qualité, sains et savoureux. 
              Nous accompagnons le secteur agropastoral et souveraineté alimentaire au Cameroun à travers une offre diversifiée et un service premium.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <Target className="text-primary h-8 w-8" />
                <h4 className="font-bold">Objectif</h4>
                <p className="text-xs text-secondary">Valoriser l'image et les activités de l'entreprise à travers l'innovation.</p>
              </div>
              <div className="space-y-2">
                <ShieldCheck className="text-primary h-8 w-8" />
                <h4 className="font-bold">Confiance</h4>
                <p className="text-xs text-secondary">Garantir une expérience utilisateur fluide, moderne et sécurisée.</p>
              </div>
            </div>
          </div>
          <div className="bg-primary/5 rounded-3xl p-8 border-2 border-primary/10 border-dashed">
            <h3 className="text-xl font-bold mb-6 text-secondary-dark">Nos Domaines d'Expertise</h3>
            <ul className="grid grid-cols-1 gap-3">
              {[
                "Mobilier de bureau & Décoration",
                "Électroménager & Froid Industriel",
                "Groupes Électrogènes (Industriel & Mixte)",
                "Climatisation & Systèmes de Froid",
                "Matériel Informatique & Électronique",
                "Sécurité & Contrôle d'accès biométrique",
                "Énergie Solaire (Kits & Lampadaires)",
                "Vaisselle & Arts de la table"
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
        <h2 className="text-3xl font-bold mb-6">Besoin d'un accompagnement spécifique ?</h2>
        <p className="text-primary-light mb-8 max-w-2xl mx-auto">
          Qu'il s'agisse d'un mix énergétique industriel ou d'une installation de sécurité intelligente, 
          nos experts sont à votre disposition.
        </p>
        <button className="bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors">
          Contacter un expert
        </button>
      </section>
    </div>
  );
};

export default About;
