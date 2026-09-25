/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavTab, Flavor, CartItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { FlavorsScreen } from './components/FlavorsScreen';
import { HeritageScreen } from './components/HeritageScreen';
import { ContactScreen } from './components/ContactScreen';
import { CartDrawer } from './components/CartDrawer';
import { FlavorModal } from './components/FlavorModal';
import { OrderModal } from './components/OrderModal';
import { FLAVORS } from './data/flavors';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor | null>(null);

  // Cart Handlers
  const handleAddToCart = (flavor: Flavor, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.flavor.id === flavor.id);
      if (existing) {
        return prev.map((item) =>
          item.flavor.id === flavor.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { flavor, quantity }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.flavor.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.flavor.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF7F2] text-[#2B1618]">
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrder={() => setIsOrderModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeScreen
            onSelectTab={setActiveTab}
            onSelectFlavor={(flavor) => setSelectedFlavor(flavor)}
            onAddToCart={(flavor) => handleAddToCart(flavor, 1)}
          />
        )}

        {activeTab === 'flavors' && (
          <FlavorsScreen
            onSelectFlavor={(flavor) => setSelectedFlavor(flavor)}
            onAddToCart={(flavor) => handleAddToCart(flavor, 1)}
          />
        )}

        {activeTab === 'heritage' && <HeritageScreen />}

        {activeTab === 'contact' && <ContactScreen />}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsOrderModalOpen(true);
        }}
      />

      {/* Flavor Detail Modal */}
      <FlavorModal
        flavor={selectedFlavor}
        onClose={() => setSelectedFlavor(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Full Order / Reservation Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cartItems={cartItems}
        onAddToCart={(flavor) => handleAddToCart(flavor, 1)}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
