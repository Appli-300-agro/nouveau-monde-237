import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, LayoutDashboard, X } from 'lucide-react';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { user, isAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 no-print">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
          <span className="text-xl md:text-2xl font-heading font-bold text-primary truncate">nouveau.monde.237</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="text-secondary-dark hover:text-primary transition-colors">Accueil</Link>
          <Link to="/a-propos" className="text-secondary-dark hover:text-primary transition-colors">À Propos</Link>
          <Link to="/catalogue" className="text-secondary-dark hover:text-primary transition-colors">Catalogue</Link>
          <Link to="/contact" className="text-secondary-dark hover:text-primary transition-colors">Contact</Link>
          {isAdmin && (
            <Link to="/admin" className="text-primary font-bold hover:text-primary/80 transition-colors flex items-center">
              <LayoutDashboard className="w-4 h-4 mr-1" />
              Dashboard
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link to={user ? "/mon-compte" : "/login"} className="hidden sm:block">
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5 mr-2" />
              <span className="hidden md:inline">{user ? "Mon Profil" : "Compte"}</span>
            </Button>
          </Link>
          {!isAdmin && (
            <Button 
              variant="primary" 
              size="sm" 
              className="relative px-3 md:px-4"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5 md:mr-2" />
              <span className="hidden md:inline">Panier</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-status-danger text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Button>
          )}
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-secondary-dark hover:bg-slate-100 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t bg-white overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4 text-sm font-medium">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-50 rounded">Accueil</Link>
              <Link to="/a-propos" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-50 rounded">À Propos</Link>
              <Link to="/catalogue" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-50 rounded">Catalogue</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-slate-50 rounded">Contact</Link>
              <Link to={user ? "/mon-compte" : "/login"} onClick={() => setIsMobileMenuOpen(false)} className="p-2 flex items-center text-primary font-bold">
                <User className="w-4 h-4 mr-2" />
                {user ? "Mon Profil" : "Se connecter"}
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="p-2 flex items-center text-primary font-bold">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard Admin
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
