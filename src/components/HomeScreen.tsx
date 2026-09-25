import React from 'react';
import { NavTab, Flavor } from '../types';
import { ASSETS } from '../data/assets';
import { FLAVORS } from '../data/flavors';

interface HomeScreenProps {
  onSelectTab: (tab: NavTab) => void;
  onSelectFlavor: (flavor: Flavor) => void;
  onAddToCart: (flavor: Flavor) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectTab,
  onSelectFlavor,
}) => {
  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="pt-10 pb-20 px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Vintage Circular Logo Emblem */}
        <div className="relative mb-10 w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 rounded-full p-2 bg-[#FCF7F2] shadow-[0_12px_40px_rgba(107,14,30,0.06)] flex items-center justify-center transition-transform hover:scale-[1.01] duration-500">
          <img
            src={ASSETS.logo}
            alt="VSL Ice Company - Moon Milk Kulfi Emblem"
            className="w-full h-full object-contain rounded-full border-4 border-[#EBDCCB]"
          />
        </div>

        {/* Subtitle & Title */}
        <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#2B1618] font-normal tracking-wide mb-6">
          Artisanal Celestial Kulfi
        </h1>

        {/* Description Text */}
        <p className="text-[#6B5E59] text-base sm:text-lg max-w-2xl leading-relaxed mb-10 font-light">
          Slow-churned tradition meets decadent innovation. Experience the heavenly richness of
          our handcrafted kulfi, made with pristine ingredients and a touch of magic.
        </p>

        {/* Hero Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            id="hero-explore-flavors-btn"
            onClick={() => onSelectTab('flavors')}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#6B0E1E] hover:bg-[#520815] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 cursor-pointer"
          >
            Explore Flavors
          </button>

          <button
            id="hero-our-story-btn"
            onClick={() => onSelectTab('heritage')}
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#C5A059] text-[#6B0E1E] hover:bg-[#FAF2EC] text-xs font-semibold uppercase tracking-[0.2em] rounded transition-all duration-200 hover:border-[#A8823B] active:scale-98 cursor-pointer"
          >
            Our Story
          </button>
        </div>
      </section>

      {/* STAR DIVIDER */}
      <div className="flex justify-center items-center my-6">
        <span className="text-[#C5A059] text-xl select-none">☆</span>
      </div>

      {/* 2. HEAVENLY CREATIONS SECTION */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#2B1618] font-normal mb-3">
            Heavenly Creations
          </h2>
          <p className="text-[#6B5E59] text-sm sm:text-base font-light leading-relaxed">
            Discover our signature celestial blends, meticulously crafted to elevate your senses.
          </p>
        </div>

        {/* 3 Arched Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-3xl mx-auto">
          {FLAVORS.map((flavor) => (
            <div
              key={flavor.id}
              onClick={() => onSelectFlavor(flavor)}
              className="group bg-[#FAF2EC]/80 hover:bg-[#FAF2EC] border border-[#EADBCC] rounded-t-[140px] rounded-b-lg p-5 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              {/* Arched Photo Container */}
              <div className="w-full aspect-[4/5] rounded-t-[120px] rounded-b-md overflow-hidden mb-6 bg-[#F2E5D5] shadow-inner">
                <img
                  src={flavor.image}
                  alt={flavor.subtitle}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Title & Tagline */}
              <h3 className="font-serif-luxury text-2xl text-[#2B1618] font-normal mb-2 group-hover:text-[#6B0E1E] transition-colors">
                {flavor.subtitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5E59] leading-relaxed font-light px-2">
                {flavor.tagline}
              </p>
            </div>
          ))}
        </div>

        {/* Button to View All Flavors */}
        <div className="flex justify-center">
          <button
            id="view-all-flavors-btn"
            onClick={() => onSelectTab('flavors')}
            className="px-8 py-3 bg-transparent border border-[#C5A059] text-[#6B0E1E] hover:bg-[#6B0E1E] hover:text-white text-xs font-semibold uppercase tracking-[0.2em] rounded transition-all duration-300 cursor-pointer shadow-sm"
          >
            View All Flavors
          </button>
        </div>
      </section>

      {/* STAR DIVIDER */}
      <div className="flex justify-center items-center my-6">
        <span className="text-[#C5A059] text-xl select-none">☆</span>
      </div>

      {/* 3. CRAFTED WITH TRADITION SECTION */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="space-y-6">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#2B1618] font-normal">
              Crafted with Tradition
            </h2>
            <div className="space-y-4 text-[#6B5E59] text-sm sm:text-base font-light leading-relaxed">
              <p>
                Our process honors the ancient art of slow-churning milk. Over hours of gentle
                simmering, the sugars caramelize and the liquid reduces, creating the dense,
                luxurious texture that defines true kulfi.
              </p>
              <p>
                We source only the finest spices—fragrant saffron, robust cardamom, and delicate
                rose—blending them into our rich base to create a taste that is both deeply rooted
                in heritage and refreshingly modern.
              </p>
            </div>

            <div className="pt-2">
              <button
                id="crafted-read-our-story-btn"
                onClick={() => onSelectTab('heritage')}
                className="px-8 py-3.5 bg-[#6B0E1E] hover:bg-[#520815] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                Read Our Story
              </button>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl border border-[#E8D8C5] group">
            <img
              src={ASSETS.simmeringMilk}
              alt="Boiling and simmering milk in traditional brass pot with wooden spoon"
              className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[1/1] transition-transform duration-700 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
};
