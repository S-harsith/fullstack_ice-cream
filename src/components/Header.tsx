import React, { useState } from 'react';
import { NavTab } from '../types';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenOrder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'flavors', label: 'FLAVORS' },
    { id: 'heritage', label: 'HERITAGE' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FCF7F2]/95 backdrop-blur-md border-b border-[#EEDECB]/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Name / Logo Text */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="group text-left cursor-pointer transition-transform duration-200"
        >
          <span className="font-serif-luxury text-2xl md:text-3xl text-[#2B1618] font-normal tracking-wide flex items-center gap-2">
            VSL Ice Company
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-₹{item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-xs uppercase tracking-[0.25em] font-medium transition-colors cursor-pointer ₹{
                  isActive
                    ? 'text-[#2B1618] font-semibold'
                    : 'text-[#6B5E59] hover:text-[#2B1618]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C5A059] rounded-full shadow-sm" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon trigger */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            aria-label="View Shopping Cart"
            className="relative p-2.5 rounded-full text-[#2B1618] hover:bg-[#F2E5D5] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-[#2B1618]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#6B0E1E] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FCF7F2] animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>

          {/* Primary Order Now Button */}
          <button
            id="header-order-now-btn"
            onClick={onOpenOrder}
            className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-[#6B0E1E] hover:bg-[#520815] text-white text-xs font-semibold uppercase tracking-[0.18em] rounded transition-all duration-200 shadow-sm hover:shadow active:scale-[0.98] cursor-pointer"
          >
            Order Now
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2B1618] hover:bg-[#F2E5D5] rounded-md transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FCF7F2] border-b border-[#EEDECB] px-6 py-6 space-y-4 animate-fade-in shadow-xl">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-₹{item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2.5 text-sm uppercase tracking-[0.2em] font-medium border-b border-[#EEDECB]/40 flex items-center justify-between ₹{
                  activeTab === item.id
                    ? 'text-[#6B0E1E] font-semibold'
                    : 'text-[#6B5E59]'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <span className="w-2 h-2 bg-[#C5A059] rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              id="mobile-order-now-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3 bg-[#6B0E1E] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded text-center shadow"
            >
              Order Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
