import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { cn } from '../../utils/cn';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Bonjour ! Je suis l\'assistant IA de nouveau.monde.237. Comment puis-je vous aider aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulation réponse IA
    setTimeout(() => {
      let botResponse = "Je transmets votre demande à notre équipe technique. Pouvez-vous préciser votre secteur d\'activité ?";
      if (input.toLowerCase().includes('solaire')) {
        botResponse = "Nous proposons des kits solaires complets. Voulez-vous consulter nos onduleurs hybrides ou nos panneaux monocristallins ?";
      } else if (input.toLowerCase().includes('prix') || input.toLowerCase().includes('coût')) {
        botResponse = "Nos prix sont affichés sur le catalogue. Nous proposons également des devis personnalisés pour les installations industrielles.";
      }
      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] no-print">
      {/* Bouton Flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Fenêtre de Chat */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-primary p-4 text-white flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
                <Bot className="h-5 w-5" />
            </div>
            <div>
                <h3 className="font-bold text-sm">Assistant IA</h3>
                <p className="text-[10px] opacity-80">En ligne | nouveau.monde.237</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={cn(
                "max-w-[80%] p-3 rounded-2xl text-sm",
                m.role === 'user' 
                  ? "bg-primary text-white ml-auto rounded-tr-none" 
                  : "bg-white text-secondary-dark border border-slate-200 rounded-tl-none shadow-sm"
              )}>
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="bg-primary text-white p-2 rounded-full hover:bg-primary/90">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
