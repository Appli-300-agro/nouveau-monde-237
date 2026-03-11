import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, MessageCircle, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-dark text-slate-300 py-12 no-print">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-white text-lg font-heading font-bold mb-4">nouveau.monde.237</h3>
          <p className="text-sm leading-relaxed">
            Votre partenaire de confiance pour l'équipement professionnel et domestique au Cameroun.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-medium mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
            <li><Link to="/a-propos" className="hover:text-white transition-colors">À Propos</Link></li>
            <li><Link to="/catalogue" className="hover:text-white transition-colors">Catalogue</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white font-medium mb-4">Légal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/cgv" className="hover:text-white transition-colors">CGV</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-medium mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Douala, Cameroun</li>
            <li>contact@nouveaumonde237.cm</li>
            <li>+237 689 81 27 04</li>
          </ul>
        </div>
      
        {/* Social Media */}
        <div>
          <h4 className="text-white font-medium mb-4">Suivez-nous</h4>
          <div className="flex gap-4">
            <a href="https://wa.me/237689812704" target="_blank" rel="noopener" className="hover:text-primary transition-colors"><MessageCircle className="w-5 h-5" /></a>
            <a href="https://www.tiktok.com/@nouveau.monde.237https:/www.tiktok.com/@nouveau.monde.237" target="_blank" rel="noopener" className="hover:text-primary transition-colors"><svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.06 3.43-.3 6.83-1.39 10.12-1.14 3.48-3.41 6.44-7.32 7.15-3.45.71-7.41-.44-9.44-3.3-2.32-3.44-1.49-8.58 1.82-11.3 1.15-.99 2.59-1.56 4.03-1.77V11.2c-1.31.13-2.7.48-3.57 1.6-.63.96-.88 2.12-.83 3.29.19 3.71 4.77 5.23 6.9 2.32.58-.8.69-1.84.67-2.84-.03-3.23-.03-6.46-.03-9.69.02-1.93.01-3.85.01-5.78z"/></svg></a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-700 mt-12 pt-8 text-center text-xs">
        © {new Date().getFullYear()} nouveau.monde.237. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
