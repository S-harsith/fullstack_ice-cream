import React from 'react';
import { ASSETS } from '../data/assets';
import { Droplet, Sparkles, Snowflake } from 'lucide-react';

export const HeritageScreen: React.FC = () => {
  return (
    <div className="w-full">
      {/* 1. TOP HERO SECTION */}
      <section className="pt-12 pb-16 px-6 max-w-5xl mx-auto text-center">
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#2B1618] font-normal tracking-wide mb-4">
          The Moon Milk Tradition
        </h1>
        <p className="text-[#6B5E59] text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed mb-12">
          Slow-churned, artisanal kulfi crafted under the celestial glow. A heritage of flavor,
          steeped in tradition and perfected for the modern palate.
        </p>

        {/* Hero Showcase Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#EADBCC] bg-[#F4E8DB] max-w-4xl mx-auto">
          <img
            src={ASSETS.heritageTradition}
            alt="The Moon Milk Tradition - Artisanal slow churning under moonlight"
            className="w-full h-auto aspect-[16/9] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </section>

      {/* 2. OUR PROCESS - DEEP MAROON BANNER */}
      <section className="w-full bg-[#520815] text-white py-20 px-6 my-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#F2E5D5] font-normal mb-4">
            Our Process
          </h2>

          {/* Star ornament */}
          <div className="flex items-center justify-center gap-3 mb-16 opacity-80">
            <div className="w-12 h-[1px] bg-[#C5A059]" />
            <span className="text-[#C5A059] text-sm">✦</span>
            <div className="w-12 h-[1px] bg-[#C5A059]" />
          </div>

          {/* 3 Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-xl border border-[#C5A059]/60 flex items-center justify-center bg-[#6B0E1E]/50 group-hover:border-[#C5A059] group-hover:bg-[#6B0E1E] transition-all duration-300">
                <Droplet className="w-6 h-6 text-[#E7D7B8]" />
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#FAF2EC] font-normal">
                Slow Reduction
              </h3>
              <p className="text-xs sm:text-sm text-[#D1C2BA] font-light leading-relaxed max-w-xs">
                Hours of patient simmering to achieve the perfect, caramelized richness that defines
                our signature texture.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-xl border border-[#C5A059]/60 flex items-center justify-center bg-[#6B0E1E]/50 group-hover:border-[#C5A059] group-hover:bg-[#6B0E1E] transition-all duration-300">
                <Sparkles className="w-6 h-6 text-[#E7D7B8]" />
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#FAF2EC] font-normal">
                Celestial Spices
              </h3>
              <p className="text-xs sm:text-sm text-[#D1C2BA] font-light leading-relaxed max-w-xs">
                Infused with hand-ground cardamom, saffron threads, and essence of rose, creating a
                truly heavenly profile.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-xl border border-[#C5A059]/60 flex items-center justify-center bg-[#6B0E1E]/50 group-hover:border-[#C5A059] group-hover:bg-[#6B0E1E] transition-all duration-300">
                <Snowflake className="w-6 h-6 text-[#E7D7B8]" />
              </div>
              <h3 className="font-serif-luxury text-2xl text-[#FAF2EC] font-normal">
                Artisanal Freezing
              </h3>
              <p className="text-xs sm:text-sm text-[#D1C2BA] font-light leading-relaxed max-w-xs">
                Set in traditional conical molds, freezing slowly to preserve the dense, creamy
                consistency of authentic kulfi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE VSL LEGACY SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#2B1618] font-normal">
              The VSL Legacy
            </h2>

            <div className="space-y-4 text-[#6B5E59] text-sm sm:text-base font-light leading-relaxed">
              <p>
                Born from a passion for preserving the opulent desserts of the past, VSL Ice
                Company was founded on the belief that true luxury lies in time and attention.
              </p>
              <p>
                Our 'Moon Milk' is more than a dessert; it is an homage to the starlit evenings of
                our ancestors, a celebration of heritage in every decadent bite. We refuse
                shortcuts, honoring the meticulous craft that transforms simple ingredients into an
                extraordinary experience.
              </p>
            </div>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
                — EST. 2024
              </span>
            </div>
          </div>

          {/* 2 Side-by-Side Images */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden shadow-lg border border-[#EADBCC]">
              <img
                src={ASSETS.saffronSpices}
                alt="Saffron threads and cardamom spices on marble"
                className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg border border-[#EADBCC]">
              <img
                src={ASSETS.lunarCardamom}
                alt="Handmade kulfi on vintage brass plate"
                className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
