import React, { useState } from 'react';
import { Flavor } from '../types';
import { X, Sparkles, MapPin, Check, Plus, Minus } from 'lucide-react';

interface FlavorModalProps {
  flavor: Flavor | null;
  onClose: () => void;
  onAddToCart: (flavor: Flavor, quantity: number) => void;
}

export const FlavorModal: React.FC<FlavorModalProps> = ({
  flavor,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!flavor) return null;

  const handleAdd = () => {
    onAddToCart(flavor, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FCF7F2] border border-[#D8C3A0] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-[#2B1618] transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Section */}
        <div className="md:w-1/2 bg-[#FAF2EC] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#EADBCC]">
          <div className="w-48 sm:w-56 aspect-[4/5] rounded-t-[120px] rounded-b-md overflow-hidden shadow-xl border-2 border-[#EBDCCB] bg-[#F2E5D5]">
            <img
              src={flavor.image}
              alt={flavor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#8C7A75] uppercase tracking-widest font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Origin: {flavor.origin}</span>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C5A059]">
                {flavor.subtitle}
              </span>
              <h3 className="font-serif-luxury text-3xl text-[#2B1618] font-normal mt-0.5">
                {flavor.name}
              </h3>
              <div className="font-serif-luxury text-xl text-[#6B0E1E] mt-1 font-semibold">
                ₹{flavor.price.toFixed(2)}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#6B5E59] font-light leading-relaxed">
              {flavor.description}
            </p>

            {/* Tasting Notes */}
            <div className="space-y-2">
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7A75] flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span>Tasting Notes</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {flavor.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] bg-[#FAF2EC] border border-[#E0CFBD] text-[#2B1618] px-2.5 py-1 rounded-full font-light"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-1 text-xs text-[#6B5E59]">
              <div className="font-semibold uppercase tracking-[0.15em] text-[#8C7A75] text-[10px]">
                Key Ingredients
              </div>
              <div className="font-light">{flavor.ingredients.join(', ')}</div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 mt-6 border-t border-[#EADBCC] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#8C7A75] font-semibold">
                Quantity
              </span>
              <div className="flex items-center border border-[#D8C3A0] rounded bg-[#FAF2EC]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-xs text-[#2B1618] hover:bg-[#EBDCCB] transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-semibold text-[#2B1618]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-xs text-[#2B1618] hover:bg-[#EBDCCB] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <button
              id="modal-add-to-cart-btn"
              onClick={handleAdd}
              className={`w-full py-3 text-xs font-semibold uppercase tracking-[0.2em] rounded transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ₹{
                added
                  ? 'bg-[#2E6B38] text-white'
                  : 'bg-[#6B0E1E] hover:bg-[#520815] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart</span>
                </>
              ) : (
                <span>Add to Cart • ₹{(flavor.price * quantity).toFixed(2)}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
