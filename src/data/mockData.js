// Catalogue de 100 produits pour nouveau.monde.237
// Images sélectionnées pour leur haute qualité et leur pertinence

const CATEGORY_IMAGES = {
  'Pizzas & Burgers': ['https://images.unsplash.com/photo-1513104890138-7c749659a591','https://images.unsplash.com/photo-1568901346375-23c9450c58cd','https://images.unsplash.com/photo-1550547660-d9450f859349'],
  'Grillades & Fast-Food': ['https://images.unsplash.com/photo-1544025162-d76694265947','https://images.unsplash.com/photo-1585238342024-78d387f4a707','https://images.unsplash.com/photo-1555939594-58d7cb561ad1'],
  'Spécialités & Desserts': ['https://images.unsplash.com/photo-1551183053-bf91a1d81141','https://images.unsplash.com/photo-1551024601-bec78aea704b','https://images.unsplash.com/photo-1565958011703-44f9829ba187'],
  'Espaces & Événements': ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3','https://images.unsplash.com/photo-1511795409834-ef04bbd61622','https://images.unsplash.com/photo-1527529482837-4698179dc6ce']
};

const DISH_NAMES = {
  'Pizzas & Burgers': ['Pizza Regina Monde', 'Burger Gourmet 237', 'Pizza Fruits de Mer', 'Tacos XXL Spécial', 'Cheeseburger Deluxe'],
  'Grillades & Fast-Food': ['Poisson Braisé du Chef', 'Poulet Pané Croustillant', 'Spaghetti Bolognaise', 'Ailes de Poulet BBQ', 'Brochettes de Bœuf'],
  'Spécialités & Desserts': ['Ndolé Traditionnel', 'Gaufre Chocolat Chantilly', 'Milkshake Vanille-Fraise', 'Glace Artisanale', 'Infusion Maison'],
  'Espaces & Événements': ['Accès Salle de Jeux', 'Location Salle de Fête', 'Réservation Table Karaoke', 'Forfait Anniversaire', 'Service Traiteur Bureau']
};
const sectorKeys = Object.keys(DISH_NAMES);

const generateProducts = () => {
  const products = [];
  for (let i = 1; i <= 100; i++) {
    const sector = sectorKeys[i % sectorKeys.length];
    const names = DISH_NAMES[sector];
    const images = CATEGORY_IMAGES[sector];
    const dishBaseName = names[i % names.length];
    const imageUrl = images[i % images.length];
    const productName = `${dishBaseName} ${i > names.length ? '#' + i : ''}`.trim();

    let description = `Découvrez notre ${dishBaseName}, une création savoureuse de chez Le Nouveau Monde. Qualité et fraîcheur garanties.`;
    if (sector === 'Espaces & Événements') {
      description = `Profitez de nos infrastructures d'exception : Salle de jeux (Billiard, Mini-golf) ou notre salle de réception de 500 places.`;
    }

    products.push({
      id: `prod-${i}`,
      name: productName,
      description: description,
      price: 2500 + (Math.floor(Math.random() * 25) * 500),
      category: sector,
      imageUrl: `${imageUrl}?auto=format&fit=crop&q=80&w=800`,
      stock: Math.floor(Math.random() * 50) + 10,
      featured: i % 8 === 0
    });
  }
  return products;
};

export const MOCK_PRODUCTS = generateProducts();
export const CATEGORIES = sectorKeys;

export const MOCK_DELIVERERS = [
  { id: 'dev-1', name: 'Abdoulaye', phone: '+237 670 00 00 01', zone: 'Douala (Akwa/Deido)' },
  { id: 'dev-2', name: 'Samuel', phone: '+237 690 00 00 02', zone: 'Douala (Bonamoussadi/Makepe)' },
  { id: 'dev-3', name: 'Christian', phone: '+237 689 812 704', zone: 'Douala (Kotto/Logbessou)' }
];

export const MOCK_USERS_LIST = [
  { id: 'u1', name: 'Jean Dupont', email: 'jean.dupont@email.com', role: 'user', status: 'Actif', joinDate: '12/01/2026' },
  { id: 'u2', name: 'Marie Sissoko', email: 'marie.s@email.com', role: 'user', status: 'Actif', joinDate: '15/01/2026' },
  { id: 'u3', name: 'Aubry Admin', email: 'admin@nouveaumonde237.cm', role: 'admin', status: 'Actif', joinDate: '01/01/2026' },
  { id: 'u4', name: 'Alain Kotto', email: 'alain.k@email.com', role: 'user', status: 'Inactif', joinDate: '20/01/2026' },
  { id: 'u5', name: 'Inès Kamga', email: 'ines.k@email.com', role: 'user', status: 'Actif', joinDate: '02/02/2026' },
];

export const MOCK_ORDERS = [
  {
    id: 'ORD-2026-001',
    customer: 'Jean Dupont',
    date: '2026-02-04',
    total: 450000,
    status: 'En préparation',
    items: [{ name: 'Prestation Traiteur Prestige', quantity: 1, price: 450000 }]
  },
  {
    id: 'ORD-2026-002',
    customer: 'Marie Sissoko',
    date: '2026-02-03',
    total: 125000,
    status: 'Livré',
    items: [{ name: 'Menu Dégustation Signature', quantity: 1, price: 125000 }]
  }
];
