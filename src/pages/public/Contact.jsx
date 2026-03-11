import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Contact = () => {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-primary py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold mb-4">Contactez-nous</h1>
          <p className="text-primary-light max-w-xl mx-auto">
            Une question technique ? Un besoin urgent ? Notre équipe réagit sous 24h pour vous accompagner.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-xl text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-secondary-dark mb-1">Téléphone & WhatsApp</h3>
                <p className="text-sm text-secondary">+237 689 81 27 04</p>
                <p className="text-xs text-primary font-medium mt-1">Lundi - Samedi : 8h00 - 18h00</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-xl text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-secondary-dark mb-1">Email</h3>
                <p className="text-sm text-secondary">contact@nouveaumonde237.cm</p>
                <p className="text-sm text-secondary">support@nouveaumonde237.cm</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-xl text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-secondary-dark mb-1">Adresse</h3>
                <p className="text-sm text-secondary leading-relaxed">
                  Douala, Cameroun<br />
                  Siège Social - Zone Industrielle
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-10 rounded-2xl border border-slate-200 shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-secondary-dark">Envoyez-nous un message</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase">Nom Complet</label>
                <Input placeholder="votre nom" required />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary uppercase">Email</label>
                <Input type="email" placeholder="votre@email.com" required />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-secondary uppercase">Sujet</label>
                <Input placeholder="De quoi s'agit-il ?" required />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-secondary uppercase">Message</label>
                <textarea 
                  rows="5" 
                  className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:outline-none border-slate-200"
                  placeholder="Décrivez votre besoin..."
                  required
                ></textarea>
              </div>
              <Button className="md:w-fit px-10 h-12 flex items-center">
                <Send className="w-4 h-4 mr-2" />
                Envoyer le message
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Simulation */}
      <section className="h-[400px] bg-slate-100 grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden relative border-t">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-slate-200">
                <MapPin className="text-primary w-5 h-5" />
                <span className="font-bold text-sm">Retrouvez-nous à Douala</span>
            </div>
        </div>
        <img 
            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
            alt="Google Map Placeholder" 
            className="w-full h-full object-cover opacity-50"
        />
      </section>
    </div>
  );
};

export default Contact;
