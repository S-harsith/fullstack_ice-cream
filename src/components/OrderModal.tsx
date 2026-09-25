import React, { useState } from 'react';
import { CartItem, Flavor } from '../types';
import { FLAVORS } from '../data/flavors';
import { X, CheckCircle2, ShoppingBag, Truck, Store, Sparkles, Plus, Minus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (flavor: Flavor) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onClearCart,
}) => {
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [giftNote, setGiftNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.flavor.price * item.quantity, 0);
  const shipping = deliveryMode === 'delivery' ? (subtotal > 35 ? 0 : 5.0) : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalItems === 0) return;

    setIsSubmitting(true);
    const orderNumber = 'VSL-' + Math.floor(100000 + Math.random() * 900000);

    try {
      // Save the order to Firestore so it's recorded in your database
      await addDoc(collection(db, 'orders'), {
        orderNumber,
        customerName,
        email,
        deliveryMode,
        address: deliveryMode === 'delivery' ? address : '',
        deliveryDate,
        giftNote,
        items: cartItems.map((item) => ({
          id: item.flavor.id,
          name: item.flavor.name,
          price: item.flavor.price,
          quantity: item.quantity,
        })),
        subtotal,
        shipping,
        total,
        status: 'new',
        createdAt: serverTimestamp(),
      });

      setIsSubmitting(false);
      setOrderConfirmed(orderNumber);

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#6B0E1E', '#C5A059', '#E7D7B8'],
      });

      // --- WHATSAPP NOTIFICATION (kept as a quick alert alongside the saved order) ---

      // 1. Set your business WhatsApp number here (Include country code, no +)
      const businessNumber = '919360001094';

      // 2. Format the cart items into a readable list
      let orderItemsText = '';
      cartItems.forEach(item => {
        orderItemsText += `• ${item.quantity}x ${item.flavor.name} (₹${(item.flavor.price * item.quantity).toFixed(2)})\n`;
      });

      // 3. Draft the WhatsApp message using the customer's inputs
      const rawMessage = `*NEW ORDER: ${orderNumber}*\n\n` +
        `*Customer Details:*\n` +
        `Name: ${customerName}\n` +
        `Email: ${email}\n` +
        `Mode: ${deliveryMode === 'delivery' ? 'Insulated Delivery' : 'Sanctuary Pickup'}\n` +
        `${deliveryMode === 'delivery' ? `Address: ${address}\n` : ''}` +
        `Date: ${deliveryDate}\n` +
        `${giftNote ? `Gift Note: ${giftNote}\n` : ''}\n` +
        `*Order Items:*\n${orderItemsText}\n` +
        `*Total Amount: ₹${total.toFixed(2)}*`;

      // 4. Encode the message and open WhatsApp
      const encodedMessage = encodeURIComponent(rawMessage);
      const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // --- END WHATSAPP NOTIFICATION ---

      onClearCart();
    } catch (error) {
      console.error('Error saving order to Firestore:', error);
      setIsSubmitting(false);
      alert('Something went wrong saving your order. Please try again or contact us directly.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FCF7F2] border border-[#D8C3A0] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#EADBCC] flex items-center justify-between bg-[#FAF2EC]">
          <div className="flex items-center gap-2">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#2B1618]">
              Reserve Celestial Kulfi
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#6B5E59] hover:text-[#2B1618] hover:bg-[#EBDCCB] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {orderConfirmed ? (
            <div className="text-center py-10 space-y-5">
              <CheckCircle2 className="w-16 h-16 text-[#6B0E1E] mx-auto animate-bounce" />
              <h3 className="font-serif-luxury text-3xl text-[#2B1618]">
                Celestial Order Confirmed!
              </h3>
              <p className="text-sm text-[#6B5E59] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#2B1618]">{customerName || 'Valued Guest'}</span>. Your artisanal kulfi has been scheduled for preparation with dry-ice temperature packaging.
              </p>
              <div className="inline-block bg-[#FAF2EC] border border-[#D8C3A0] px-5 py-2.5 rounded-lg text-xs font-mono font-bold text-[#6B0E1E] tracking-wider">
                ORDER REF: {orderConfirmed}
              </div>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setOrderConfirmed(null);
                    onClose();
                  }}
                  className="px-8 py-3 bg-[#6B0E1E] hover:bg-[#520815] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded shadow transition-colors"
                >
                  Return to Sanctuary
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Delivery vs Pickup Toggle */}
<div className="grid grid-cols-2 gap-3 p-1 bg-[#FAF2EC] border border-[#EADBCC] rounded-lg">
  <button
    type="button"
    onClick={() => setDeliveryMode('delivery')}
    className={`py-2.5 px-4 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
      deliveryMode === 'delivery'
        ? 'bg-[#6B0E1E] text-white shadow'
        : 'text-[#6B5E59] hover:text-[#2B1618]'
    }`}
  >
    <Truck className="w-4 h-4" />
    <span>Insulated Delivery</span>
  </button>
  <button
    type="button"
    onClick={() => setDeliveryMode('pickup')}
    className={`py-2.5 px-4 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
      deliveryMode === 'pickup'
        ? 'bg-[#6B0E1E] text-white shadow'
        : 'text-[#6B5E59] hover:text-[#2B1618]'
    }`}
  >
    <Store className="w-4 h-4" />
    <span>Sanctuary Pickup</span>
  </button>
</div>

              {/* Items Selection or Review */}
              <div className="border border-[#EADBCC] rounded-lg p-4 bg-[#FAF2EC]/50 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.15em] text-[#8C7A75]">
                  <span>Flavor Selection</span>
                  <span>{totalItems} Selected</span>
                </div>

                {cartItems.length === 0 ? (
                  <div className="space-y-3 py-2">
                    <p className="text-xs text-[#6B5E59] italic">
                      Select flavors below to include in your artisanal box:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FLAVORS.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => onAddToCart(f)}
                          className="p-2 bg-white border border-[#D8C3A0] rounded flex items-center justify-between hover:border-[#6B0E1E] transition-colors cursor-pointer text-left"
                        >
                          <div>
                            <div className="text-xs font-medium text-[#2B1618]">{f.name}</div>
                            <div className="text-[10px] text-[#8C7A75]">₹{f.price.toFixed(2)}</div>
                          </div>
                          <Plus className="w-3.5 h-3.5 text-[#6B0E1E]" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-44 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div
                        key={item.flavor.id}
                        className="bg-white p-2.5 rounded border border-[#EADBCC] flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#2B1618]">{item.flavor.name}</span>
                          <span className="text-[#8C7A75]">(₹{item.flavor.price.toFixed(2)})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.flavor.id, -1)}
                            className="p-1 hover:bg-[#F2E5D5] rounded text-[#2B1618]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-[#2B1618]">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.flavor.id, 1)}
                            className="p-1 hover:bg-[#F2E5D5] rounded text-[#2B1618]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <span className="w-14 text-right font-semibold text-[#2B1618]">
                            ₹{(item.flavor.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recipient Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A75]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D8C3A0] rounded text-xs text-[#2B1618] focus:outline-hidden focus:border-[#6B0E1E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A75]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D8C3A0] rounded text-xs text-[#2B1618] focus:outline-hidden focus:border-[#6B0E1E]"
                  />
                </div>
              </div>

              {deliveryMode === 'delivery' && (
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A75]">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Street address, city, state, zip code"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D8C3A0] rounded text-xs text-[#2B1618] focus:outline-hidden focus:border-[#6B0E1E]"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A75]">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D8C3A0] rounded text-xs text-[#2B1618] focus:outline-hidden focus:border-[#6B0E1E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A75]">
                    Celestial Gift Note (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Personal calligraphy note..."
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D8C3A0] rounded text-xs text-[#2B1618] focus:outline-hidden focus:border-[#6B0E1E]"
                  />
                </div>
              </div>

              {/* Order Summary & Pricing */}
              <div className="pt-2 border-t border-[#EADBCC] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#8C7A75]">
                    Subtotal: ₹{subtotal.toFixed(2)} | {deliveryMode === 'delivery' ? (shipping === 0 ? 'Free Shipping' : `₹₹{shipping.toFixed(2)} Insulated Shipping`) : 'Pickup Free'}
                  </div>
                  <div className="font-serif-luxury text-2xl text-[#2B1618] font-semibold">
                    Total: ₹{total.toFixed(2)}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || totalItems === 0}
                  className="px-8 py-3.5 bg-[#6B0E1E] hover:bg-[#520815] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Order'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
