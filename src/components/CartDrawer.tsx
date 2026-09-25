import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.flavor.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FCF7F2] shadow-2xl flex flex-col border-l border-[#D8C3A0]">
          {/* Header */}
          <div className="p-6 border-b border-[#EADBCC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif-luxury text-2xl text-[#2B1618]">
                Celestial Cart
              </h2>
              <span className="text-xs bg-[#FAF2EC] border border-[#D8C3A0] text-[#6B0E1E] px-2 py-0.5 rounded-full font-medium">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              id="cart-close-btn"
              onClick={onClose}
              className="p-2 text-[#6B5E59] hover:text-[#2B1618] rounded-full hover:bg-[#F2E5D5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FAF2EC] border border-[#E8D7C3] flex items-center justify-center text-[#C5A059]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-xl text-[#2B1618]">
                  Your cart is currently empty
                </h3>
                <p className="text-xs text-[#6B5E59] max-w-xs leading-relaxed">
                  Explore our Celestial Offerings to add slow-churned artisanal kulfi to your selection.
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.flavor.id}
                  className="bg-white border border-[#EADBCC] rounded-lg p-4 flex gap-4 items-center shadow-xs"
                >
                  <img
                    src={item.flavor.image}
                    alt={item.flavor.name}
                    className="w-16 h-20 object-cover rounded-t-[20px] rounded-b-sm bg-[#F2E5D5]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-luxury text-lg text-[#2B1618] truncate">
                      {item.flavor.name}
                    </h4>
                    <div className="text-xs text-[#8C7A75] mb-2">
                      ₹{item.flavor.price.toFixed(2)} each
                    </div>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-[#D8C3A0] rounded bg-[#FAF2EC]">
                        <button
                          onClick={() => onUpdateQuantity(item.flavor.id, -1)}
                          className="px-2 py-0.5 text-xs text-[#2B1618] hover:bg-[#EBDCCB] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#2B1618]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.flavor.id, 1)}
                          className="px-2 py-0.5 text-xs text-[#2B1618] hover:bg-[#EBDCCB] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.flavor.id)}
                        className="text-xs text-[#9E3E4B] hover:text-[#6B0E1E] transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-sm font-semibold text-[#2B1618]">
                    ₹{(item.flavor.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#EADBCC] bg-[#FAF2EC] space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B5E59] font-light">Subtotal</span>
                <span className="font-serif-luxury text-xl font-medium text-[#2B1618]">
                  ₹{subtotal.toFixed(2)}
                </span>
              </div>
              <div className="text-[11px] text-[#8C7A75] font-light leading-snug">
                Includes insulated cold-box packaging & biodegradable dry-ice cold preservation.
              </div>

              <button
                id="cart-proceed-checkout-btn"
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
                className="w-full py-3.5 bg-[#6B0E1E] hover:bg-[#520815] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
