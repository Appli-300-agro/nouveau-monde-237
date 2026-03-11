# nouveau.monde.237 - Plateforme Web E-commerce

Bienvenue sur le dépôt du code source de l'application web **nouveau.monde.237**. Ce projet est une solution complète (Site Vitrine + E-commerce + Administration) développée avec des technologies modernes pour assurer performance et évolutivité.

## 🛠 Stack Technique

*   **Frontend :** React.js (Vite), Tailwind CSS
*   **Animations :** Framer Motion & React Intersection Observer
*   **Routing :** React Router DOM
*   **Backend / Serverless :** Google Firebase (Auth, Firestore, Storage, Hosting) - *Actuellement en mode Mock pour le prototype*
*   **Design :** Custom Design System Premium (Minimaliste Bleu/Blanc)

---

## 🚀 Installation et Test en Local

### 1. Mode Rapide (Sans compte Firebase)
Idéal pour tester l'interface et le catalogue immédiatement sans configuration cloud.

1.  Installez les dépendances : `npm install`
2.  Créez un fichier `.env.local` :
    ```env
    VITE_USE_MOCKS=true
    ```
3.  Lancez l'application : `npm run dev`
    *   *Note : Les données sont issues de `src/data/mockData.js`.*

### 🔐 Identifiants de Test (Mode Mock)

Pour tester les différentes interfaces sans créer de compte réel :

| Rôle | Email | Mot de passe | Note |
| :--- | :--- | :--- | :--- |
| **Administrateur** | `admin@nouveaumonde237.cm` | `admin123` | **OTP : 2025** |
| **Utilisateur** | `user@nouveaumonde237.cm` | `user123` | |

Accès Admin direct : `localhost:5173/admin` (après connexion)

### 2. Mode Complet (Avec Firebase)
Suivez ces étapes si vous souhaitez tester l'authentification réelle et la base de données Firestore.
1. Configurez vos clés dans `.env.local` (voir `.env.example`).
2. Mettez `VITE_USE_MOCKS=false`.

---

## ✨ Fonctionnalités Clés

- **Hero Carrousel :** 3 slides dynamiques (Excellence, À Propos, Contact).
- **Catalogue Intelligent :** 100 produits avec images uniques via LoremFlickr et filtres par secteurs.
- **Tunnel d'Achat :** Panier persistant, Checkout avec calcul de livraison dynamique (Douala/Autre) et formulaires de paiement (MoMo, OM, Carte).
- **Suivi Temps Réel :** Géolocalisation simulée du livreur pour les commandes en cours.
- **Admin Dashboard :** KPIs, Gestion CRUD des produits, des livreurs et des utilisateurs.
- **Double Authentification :** Sécurisation de l'accès admin par code OTP.
- **Génération de Devis :** Création de devis pro-forma en PDF sans les éléments du site (Navbar/Footer).

---

## ☁️ Procédure de Déploiement

Le projet est configuré pour **Firebase Hosting**.

```bash
npm run build
firebase deploy
```

---

## 👤 Auteur et Prestataire

**TCHANGANG TCHAGANG Aubry**
*   **Fonction :** Directeur Technique chez GIORTECH & SoloPreneur Tech
*   **Qualifications :** Ingénieur Génie Mécanique, Mécatronique et Fullstack Django, MERN & FERN
*   **Contact :** contact@nouveaumonde237.cm