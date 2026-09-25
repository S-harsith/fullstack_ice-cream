import React, { useState } from 'react';

interface FooterProps {
  onSelectTab?: (tab: 'home' | 'flavors' | 'heritage' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | null>(null);

  return (
    <>
      <footer className="bg-[#FAF2EC] border-t border-[#E8D7C3] py-12 px-6 md:px-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Logo / Brand */}
          <div>
            <button
              onClick={() => {
                if (onSelectTab) onSelectTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-serif-luxury text-2xl text-[#2B1618] hover:text-[#6B0E1E] transition-colors cursor-pointer"
            >
              VSL Moon Milk
            </button>
          </div>

          {/* Center Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.2em] text-[#6B5E59]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2B1618] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2B1618] transition-colors"
            >
              Facebook
            </a>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-[#2B1618] transition-colors cursor-pointer uppercase tracking-[0.2em]"
            >
              Terms
            </button>
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-[#2B1618] transition-colors cursor-pointer uppercase tracking-[0.2em]"
            >
              Privacy
            </button>
          </div>

          {/* Right Copyright */}
          <div className="text-xs text-[#8C7A75] tracking-wide">
            © {new Date().getFullYear()} VSL Ice Company. Artisanal Celestial Kulfi.
          </div>
        </div>
      </footer>

      {/* Terms & Privacy Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#FCF7F2] border border-[#D8C3A0] rounded-lg max-w-lg w-full p-8 shadow-2xl space-y-4">
            <h3 className="font-serif-luxury text-2xl text-[#2B1618]">
              {activeModal === 'terms' ? 'Terms of Service' : 'Privacy Policy'}
            </h3>
            <div className="text-sm text-[#6B5E59] leading-relaxed max-h-60 overflow-y-auto space-y-2 pr-2">
              {activeModal === 'terms' ? (
                <>
                  <p>
                    Welcome to VSL Moon Milk (VSL Ice Company). By accessing our offerings and ordering artisanal celestial kulfi, you agree to cherish culinary craftsmanship and heritage techniques.
                  </p>
                  <p>
                    All fresh frozen confections are dispatched in temperature-regulated insulated dry-ice containers to ensure maximum creaminess upon delivery.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Your privacy is revered at VSL Moon Milk. We only collect details essential to crafting and delivering your celestial kulfi orders and answering custom event inquiries.
                  </p>
                  <p>
                    We do not sell or disclose your personal records to third parties.
                  </p>
                </>
              )}
            </div>
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 bg-[#6B0E1E] text-white text-xs uppercase tracking-widest rounded hover:bg-[#520815] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
