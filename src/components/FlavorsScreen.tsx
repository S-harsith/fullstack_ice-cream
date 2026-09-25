import React, { useState } from 'react';
import { Flavor } from '../types';
import { FLAVORS } from '../data/flavors';
import { Check, Info } from 'lucide-react';

interface FlavorsScreenProps {
  onSelectFlavor: (flavor: Flavor) => void;
  onAddToCart: (flavor: Flavor) => void;
}

export const FlavorsScreen: React.FC<FlavorsScreenProps> = ({
  onSelectFlavor,
  onAddToCart,
}) => {
  const [addedIds, setAddedIds] = useState<{ [id: string]: boolean }>({});

  const handleAdd = (e: React.MouseEvent, flavor: Flavor) => {
    e.stopPropagation();
    onAddToCart(flavor);
    setAddedIds((prev) => ({ ...prev, [flavor.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [flavor.id]: false }));
    }, 1500);
  };

  return (
    <div className="w-full bg-[#0B0707] text-[#EDE3DA] min-h-screen py-16 px-6 relative overflow-hidden">
      {/* Background Celestial Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(107,14,30,0.22)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#9E1B2D] font-normal tracking-wide mb-6 drop-shadow-sm">
            Celestial Offerings
          </h1>
          
          <p className="text-[#C4B5A5] text-sm sm:text-base font-light leading-relaxed mb-8">
            Discover our artisanal kulfi, slow-churned to perfection using traditional methods and
            infused with the finest South Asian ingredients. Each flavor is a journey into
            indulgence.
          </p>

          {/* Ornate Divider with Diamond */}
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto opacity-70">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent flex-1" />
            <span className="text-[#C5A059] text-sm rotate-45">✦</span>
            <div className="h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent flex-1" />
          </div>
        </div>

        {/* 3 Arched Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 my-10 max-w-4xl mx-auto">
          {FLAVORS.map((flavor) => {
            const isAdded = addedIds[flavor.id];

            return (
              <div
                key={flavor.id}
                onClick={() => onSelectFlavor(flavor)}
                className="group bg-[#FCF7F2] text-[#2B1618] rounded-t-[160px] rounded-b-xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(197,160,89,0.15)] cursor-pointer"
              >
                <div>
                  {/* Arched Image Container */}
                  <div className="relative w-full aspect-[4/5] rounded-t-[140px] rounded-b-lg overflow-hidden mb-6 bg-[#F2E5D5] shadow-inner">
                    <img
                      src={flavor.image}
                      alt={flavor.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                    />
                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-xs p-1.5 rounded-full text-[#6B0E1E] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Info className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Flavor Name */}
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#2B1618] text-center font-normal mb-3 group-hover:text-[#6B0E1E] transition-colors">
                    {flavor.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#6B5E59] font-light leading-relaxed text-center line-clamp-3 mb-6">
                    {flavor.description}
                  </p>
                </div>

                {/* Bottom Row: Price & Add to Cart */}
                <div className="pt-4 border-t border-[#EADBCC] flex items-center justify-between mt-auto">
                  <span className="font-serif-luxury text-lg sm:text-xl text-[#2B1618] font-medium tracking-tight">
                    ₹{flavor.price.toFixed(2)}
                  </span>

                  <button
                    id={`add-to-cart-₹{flavor.id}`}
                    onClick={(e) => handleAdd(e, flavor)}
                    className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] border rounded transition-all duration-200 cursor-pointer flex items-center gap-1.5 ₹{
                      isAdded
                        ? 'bg-[#6B0E1E] border-[#6B0E1E] text-white'
                        : 'border-[#C5A059] text-[#6B0E1E] hover:bg-[#6B0E1E] hover:text-white hover:border-[#6B0E1E]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <span>Add to Cart</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sensory Provenance Note */}
        <div className="mt-16 text-center text-xs tracking-[0.15em] text-[#A69485] font-light max-w-xl mx-auto">
          ★ ALL KULFI ARE CRAFTED DAILY IN LIMITED CELESTIAL BATCHES USING 100% NATURAL INGREDIENTS ★
        </div>
      </div>
    </div>
  );
};
