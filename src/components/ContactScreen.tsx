import React, { useState } from 'react';
import { MapPin, Phone, Mail, CheckCircle2, Sparkles, Navigation } from 'lucide-react';
import confetti from 'canvas-confetti';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const ContactScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: 'Place an Order',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save the inquiry to Firestore so it's recorded in your database
      await addDoc(collection(db, 'contacts'), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        inquiryType: formData.inquiryType,
        message: formData.message,
        status: 'new',
        createdAt: serverTimestamp(),
      });

      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celestial confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#6B0E1E', '#C5A059', '#E7D7B8', '#FAF2EC'],
      });
    } catch (error) {
      console.error('Error saving inquiry to Firestore:', error);
      setIsSubmitting(false);
      alert('Something went wrong sending your inquiry. Please try again or email us directly.');
    }
  };

  return (
    <div className="w-full py-12 px-6 max-w-6xl mx-auto">
      {/* Title & Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#2B1618] font-normal tracking-wide mb-4">
          Inquire & Indulge
        </h1>
        <p className="text-[#6B5E59] text-sm sm:text-base font-light leading-relaxed mb-6">
          Connect with us to arrange your celestial artisanal kulfi experience. Whether for a grand
          celebration or a quiet indulgence, we await your message.
        </p>

        {/* Gold Star Divider */}
        <div className="flex items-center justify-center gap-4 max-w-xs mx-auto opacity-70">
          <div className="h-[1px] bg-[#C5A059] flex-1" />
          <span className="text-[#C5A059] text-xs">☆</span>
          <div className="h-[1px] bg-[#C5A059] flex-1" />
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Our Sanctuary */}
        <div className="lg:col-span-5 bg-[#FAF2EC]/90 border border-[#EADBCC] rounded-xl p-8 shadow-sm space-y-8">
          <h2 className="font-serif-luxury text-3xl text-[#2B1618] font-normal">
            Our Sanctuary
          </h2>

          <div className="space-y-6 text-sm">
            {/* Visit */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-[#FCF7F2] text-[#C5A059] border border-[#E8D7C3] mt-0.5">
                <MapPin className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7A75]">
                  VISIT US
                </div>
                <div className="text-[#2B1618] font-light leading-relaxed">
                  123 Celestial Avenue<br />
                  Veerapandi Piruvu, Tirupur District, Tamil Nadu 641602<br />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-[#FCF7F2] text-[#C5A059] border border-[#E8D7C3] mt-0.5">
                <Phone className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7A75]">
                  CALL US
                </div>
                <a
                  href="tel:+91 9360001094"
                  className="text-[#2B1618] hover:text-[#6B0E1E] transition-colors font-light"
                >
                  +91 9360001094
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-[#FCF7F2] text-[#C5A059] border border-[#E8D7C3] mt-0.5">
                <Mail className="w-4 h-4 text-[#C5A059]" />
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7A75]">
                  EMAIL
                </div>
                <a
                  href="mailto:harsithofficial07@gmail.com"
                  className="text-[#2B1618] hover:text-[#6B0E1E] transition-colors font-light"
                >
                  harsithofficial07@gmail.com                </a>
              </div>
            </div>
          </div>

          {/* Illustrated Sanctuary Vintage Map Card */}
          <div className="pt-2">
            <div className="relative rounded-lg overflow-hidden border border-[#D8C3A0] bg-[#F5ECE1] p-4 text-center shadow-inner">
              {/* Stylized Vintage Map SVG graphic */}
              <div className="w-full h-44 relative bg-[#F4EADA] rounded overflow-hidden flex items-center justify-center border border-[#E6D7C3]">
                {/* SVG street grids & water contours */}
                <svg className="w-full h-full opacity-60" viewBox="0 0 300 150">
                  <path d="M0,40 Q80,20 150,50 T300,30" fill="none" stroke="#D3BEA2" strokeWidth="6" />
                  <path d="M40,0 L60,150" fill="none" stroke="#E2D4C0" strokeWidth="3" />
                  <path d="M120,0 L140,150" fill="none" stroke="#E2D4C0" strokeWidth="4" />
                  <path d="M220,0 L200,150" fill="none" stroke="#E2D4C0" strokeWidth="3" />
                  <path d="M0,100 L300,90" fill="none" stroke="#E2D4C0" strokeWidth="3" />
                  <circle cx="150" cy="75" r="28" fill="#F0E2D0" stroke="#C5A059" strokeWidth="1" strokeDasharray="3,3" />
                </svg>

                {/* Celestial Compass Rose in corner */}
                <div className="absolute top-2 right-2 text-[#C5A059] opacity-70">
                  <Navigation className="w-4 h-4 rotate-45" />
                </div>

                {/* Sanctuary Pin Center Marker */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#6B0E1E] text-white shadow-lg flex items-center justify-center border-2 border-[#C5A059] animate-pulse">
                    <span className="text-sm font-serif">☾</span>
                  </div>
                  <div className="mt-1 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold text-[#2B1618] shadow">
                    VSL Moon Milk
                  </div>
                </div>
              </div>

              {/* Map Footer note */}
              <div className="text-[10px] text-[#8C7A75] mt-2.5 tracking-wider uppercase font-light">
                VSL Moon Milk • 123 Celestial Avenue, NY 10012 • Sanctuary & Tasting Salon
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Send an Inquiry */}
        <div className="lg:col-span-7 bg-white border border-[#EADBCC] rounded-xl p-8 sm:p-10 shadow-sm">
          <h2 className="font-serif-luxury text-3xl text-[#2B1618] font-normal mb-8">
            Send an Inquiry
          </h2>

          {submitted ? (
            <div className="py-12 px-6 text-center space-y-4 animate-fade-in bg-[#FAF2EC] rounded-lg border border-[#E8D7C3]">
              <CheckCircle2 className="w-12 h-12 text-[#6B0E1E] mx-auto" />
              <h3 className="font-serif-luxury text-2xl text-[#2B1618]">
                Inquiry Received with Gratitude
              </h3>
              <p className="text-sm text-[#6B5E59] max-w-md mx-auto leading-relaxed">
                Thank you, {formData.firstName || 'valued guest'}. Our celestial concierge has
                received your dispatch and will respond within 24 hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      inquiryType: 'Place an Order',
                      message: '',
                    });
                  }}
                  className="px-6 py-2.5 border border-[#C5A059] text-[#6B0E1E] text-xs font-semibold uppercase tracking-[0.2em] rounded hover:bg-[#6B0E1E] hover:text-white transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label
                    htmlFor="contact-first-name"
                    className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7A75]"
                  >
                    FIRST NAME
                  </label>
                  <input
                    id="contact-first-name"
                    type="text"
                    required
                    placeholder="e.g. Jane"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full py-2.5 bg-transparent border-b border-[#D8C3A0] text-sm text-[#2B1618] placeholder-[#B5A59D] focus:outline-hidden focus:border-[#6B0E1E] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="contact-last-name"
                    className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7A75]"
                  >
                    LAST NAME
                  </label>
                  <input
                    id="contact-last-name"
                    type="text"
                    required
                    placeholder="e.g. Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full py-2.5 bg-transparent border-b border-[#D8C3A0] text-sm text-[#2B1618] placeholder-[#B5A59D] focus:outline-hidden focus:border-[#6B0E1E] transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label
                  htmlFor="contact-email"
                  className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7A75]"
                >
                  EMAIL ADDRESS
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full py-2.5 bg-transparent border-b border-[#D8C3A0] text-sm text-[#2B1618] placeholder-[#B5A59D] focus:outline-hidden focus:border-[#6B0E1E] transition-colors"
                />
              </div>

              {/* Inquiry Type */}
              <div className="space-y-1">
                <label
                  htmlFor="contact-inquiry-type"
                  className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7A75]"
                >
                  INQUIRY TYPE
                </label>
                <select
                  id="contact-inquiry-type"
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full py-2.5 bg-transparent border-b border-[#D8C3A0] text-sm text-[#2B1618] focus:outline-hidden focus:border-[#6B0E1E] transition-colors cursor-pointer"
                >
                  <option value="Place an Order">Place an Order</option>
                  <option value="Catering & Private Events">Catering & Private Events</option>
                  <option value="Bespoke Tasting Experience">Bespoke Tasting Experience</option>
                  <option value="Wholesale & Hospitality">Wholesale & Hospitality</option>
                  <option value="General Inquiries">General Inquiries</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label
                  htmlFor="contact-message"
                  className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7A75]"
                >
                  YOUR MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  placeholder="Tell us about your desired flavors or event details..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full py-2.5 bg-transparent border-b border-[#D8C3A0] text-sm text-[#2B1618] placeholder-[#B5A59D] focus:outline-hidden focus:border-[#6B0E1E] transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-[#6B0E1E] hover:bg-[#520815] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 disabled:opacity-70 cursor-pointer"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
