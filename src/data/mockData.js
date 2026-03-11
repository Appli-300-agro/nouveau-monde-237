// Catalogue de 100 produits pour nouveau.monde.237
// Images sélectionnées pour leur haute qualité et leur pertinence

const CATEGORY_IMAGES = {
  'Plats Signatures': ['https://images.unsplash.com/photo-1504674900247-0877df9cc836','https://images.unsplash.com/photo-1555939594-58d7cb561ad1','https://images.unsplash.com/photo-1604329760661-e71dc83f8f26'],
  'Entrées': ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd','https://images.unsplash.com/photo-1540189549336-e6e99c3679fe','https://images.unsplash.com/photo-1546069901-ba9599a7e63c'],
  'Boissons': ['https://images.unsplash.com/photo-1544145945-f90425340c7e','https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd','https://images.unsplash.com/photo-1497515114629-f71d768fd07c'],
  'Desserts': ['https://images.unsplash.com/photo-1563729784474-d77dbb933a9e','https://images.unsplash.com/photo-1551024601-bec78aea704b','https://images.unsplash.com/photo-1565958011703-44f9829ba187']
};

const DISH_NAMES = {
  'Plats Signatures': ['Ndolé Crevettes & Viande', 'Poulet DG Royal', 'Eru & Garri', 'Koki au Piment Douceur', 'Sanga Traditionnel', 'DG de Poisson Braisé'],
  'Entrées': ['Salade de Fruits de Mer', 'Accras de Morue croustillants', 'Pastels à la viande', 'Nems Exotiques'],
  'Boissons': ['Jus de Bissap Maison', 'Foléré Gingembre Frais', 'Jus de Baobab Onctueux', 'Punch Exotique'],
  'Desserts': ['Beignets Haricot Tradition', 'Gateau à la Banane Plantain', 'Mousse de Mangue', 'Tarte Coco']
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

    products.push({
      id: `prod-${i}`,
      name: productName,
      description: `Découvrez notre ${dishBaseName}, une solution de la catégorie ${sector} proposée par nouveau.monde.237. Qualité garantie.`,
      price: 2500 + (Math.floor(Math.random() * 15) * 500),
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
  { id: 'dev-2', name: 'Samuel', phone: '+237 690 00 00 02', zone: 'Yaoundé (Bastos/Mvan)' },
  { id: 'dev-3', name: 'Christian', phone: '+237 650 00 00 03', zone: 'Douala (Bonapriso/Logbessou)' }
];

export const MOCK_USERS_LIST = [
  { id: 'u1', name: 'Jean Dupont', email: 'jean.dupont@email.com', role: 'user', status: 'Actif', joinDate: '12/01/2026' },
  { id: 'u2', name: 'Marie Sissoko', email: 'marie.s@email.com', role: 'user', status: 'Actif', joinDate: '15/01/2026' },
  { id: 'u3', name: 'Aubry Admin', email: 'admin@assequip.cm', role: 'admin', status: 'Actif', joinDate: '01/01/2026' },
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
