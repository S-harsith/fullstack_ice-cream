import React, { useEffect, useMemo, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { LogOut, TrendingUp, ShoppingBag, IndianRupee } from 'lucide-react';

interface OrderDoc {
  id: string;
  orderNumber: string;
  total: number;
  createdAt: { seconds: number } | null;
  items: { name: string; quantity: number }[];
}
   interface AdminDashboardProps {
     onLogout: () => void;
   }

   export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'asc'));
        const snapshot = await getDocs(q);
        const data: OrderDoc[] = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            orderNumber: d.orderNumber,
            total: Number(d.total) || 0,
            createdAt: d.createdAt ? { seconds: d.createdAt.seconds } : null,
            items: Array.isArray(d.items) ? d.items : [],
          };
        });
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Could not load orders. Check your Firestore rules and connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Revenue grouped by day, for the line chart
  const revenueByDay = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((order) => {
      if (!order.createdAt) return;
      const date = new Date(order.createdAt.seconds * 1000);
      const key = date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
      map[key] = (map[key] || 0) + order.total;
    });
    return Object.entries(map).map(([date, revenue]) => ({ date, revenue }));
  }, [orders]);

  // Quantity sold per flavor, for the bar chart
  const flavorTotals = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        map[item.name] = (map[item.name] || 0) + (item.quantity || 0);
      });
    });
    return Object.entries(map)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 8);
  }, [orders]);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

   const handleLogout = () => onLogout();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCF7F2]">
        <p className="text-[#6B5E59] text-sm">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCF7F2] px-4 sm:px-8 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif-luxury text-3xl text-[#2B1618]">Sales Dashboard</h1>
            <p className="text-xs text-[#8C7A75] mt-1">VSL Moon Milk — Admin View</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D8C3A0] rounded text-xs font-semibold uppercase tracking-wider text-[#6B0E1E] hover:bg-[#FAF2EC] transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#EADBCC] rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#FAF2EC] text-[#6B0E1E]">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#8C7A75]">Total Revenue</div>
              <div className="text-xl font-semibold text-[#2B1618]">₹{totalRevenue.toFixed(2)}</div>
            </div>
          </div>

          <div className="bg-white border border-[#EADBCC] rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#FAF2EC] text-[#6B0E1E]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#8C7A75]">Total Orders</div>
              <div className="text-xl font-semibold text-[#2B1618]">{totalOrders}</div>
            </div>
          </div>

          <div className="bg-white border border-[#EADBCC] rounded-xl p-5 flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#FAF2EC] text-[#6B0E1E]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-[#8C7A75]">Avg Order Value</div>
              <div className="text-xl font-semibold text-[#2B1618]">₹{avgOrderValue.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Line Chart: Revenue over time */}
        <div className="bg-white border border-[#EADBCC] rounded-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8C7A75] mb-4">
            Revenue Over Time
          </h2>
          {revenueByDay.length === 0 ? (
            <p className="text-sm text-[#8C7A75]">No orders yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EADBCC" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#8C7A75' }} />
                <YAxis tick={{ fontSize: 11, fill: '#8C7A75' }} />
                <Tooltip
                  formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Revenue']}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#6B0E1E" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar Chart: Top flavors */}
        <div className="bg-white border border-[#EADBCC] rounded-xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#8C7A75] mb-4">
            Top-Selling Flavors
          </h2>
          {flavorTotals.length === 0 ? (
            <p className="text-sm text-[#8C7A75]">No orders yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={flavorTotals}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EADBCC" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8C7A75' }} interval={0} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11, fill: '#8C7A75' }} allowDecimals={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Bar dataKey="quantity" fill="#C5A059" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};
