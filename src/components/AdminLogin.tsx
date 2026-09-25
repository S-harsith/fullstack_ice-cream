import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Lock } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged in AdminPage will pick this up automatically
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCF7F2] px-4">
      <div className="w-full max-w-sm bg-white border border-[#EADBCC] rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#6B0E1E] flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-serif-luxury text-2xl text-[#2B1618]">Admin Access</h1>
          <p className="text-xs text-[#8C7A75] mt-1">VSL Moon Milk Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A75]">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#D8C3A0] rounded text-sm text-[#2B1618] focus:outline-hidden focus:border-[#6B0E1E]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#8C7A75]">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#D8C3A0] rounded text-sm text-[#2B1618] focus:outline-hidden focus:border-[#6B0E1E]"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-[#6B0E1E] hover:bg-[#520815] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};
