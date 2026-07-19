# Knotify

**Knotify** is a premium, peer-to-peer tie marketplace designed specifically for Covenant University students. It bridges the gap between strict official university dress codes and unique vintage styling, enabling students to buy, sell, and reserve official corporate ties, department ties, bow ties, and premium vintage pieces.

---

## 🚀 Released Frontend Prototype Features

This release contains the complete high-fidelity frontend prototype, featuring rich aesthetics, custom micro-interactions, and student-focused flows:

### 1. 🛍️ Interactive Marketplace Grid
* **Live Catalog**: Browse a wide selection of ties categorized by **Official Tie**, **Premium**, **Department**, and **Bow Tie**.
* **Smart Search & Filters**: Instantly query listings or filter by category, condition (Brand New, Like New, Gently Used, Used), color, and price.
* **Detailed Product Modals**: Click on any product card to view detailed specifications, material lists, precise pickup processes, and student reviews.

### 2. 💳 Smart Reservation System
* **Budget-Friendly Deposits**: Designed for student financial flows, the cart and reservation systems calculate a **Deposit amount** (to secure the tie) and show the remaining **Outstanding balance** to be paid at pickup.
* **Reservation Checkout**: Seamlessly complete checkout by inputting your student details (Name, Phone, Covenant email, Hall of Residence, and preferred Pickup Point).

### 3. 👔 Student Seller Hub
* **List a Tie**: Students can easily onboard as sellers and list their own ties.
* **Listing Form**: Customize category, color, pricing, deposit requirements, materials, and hall-based pickup instructions (e.g., "Meet at Peter Hall lobby").

### 4. ❤️ Premium Interactive Experience
* **Wishlist & Cart Drawers**: Slide-over micro-drawers to manage your shopping bag and saved items.
* **Simulated Identity Portal**: Interactive authentication modal that intercepts checkout/listing actions to ensure student identities are registered.
* **Micro-Animations**: Built with Framer Motion (`motion/react`) for smooth page transitions, modal overlays, and hover states.
* **Toast Notification Stack**: Dynamic, color-coded feedback toasts for cart, wishlist, and successful system actions.

---

## 🛠️ Tech Stack

* **Core**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS
* **Animations**: Framer Motion (`motion/react`)
* **Icons**: Lucide React

---

## 💻 Running Locally

### Prerequisites
Ensure you have **Node.js** installed on your machine.

1. **Clone and Navigate**:
   ```bash
   cd knotify
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open [http://localhost:5173](http://localhost:5173) to explore the prototype.
