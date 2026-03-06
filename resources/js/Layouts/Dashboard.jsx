import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{title}</p>
            <p className="text-xl font-black text-gray-900 mt-1">{value}</p>
        </div>
    </div>
);

export default function Dashboard({ auth, stats, trendData }) {
    // Format Rupiah Helper
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Ringkasan Analisis</h2>
                    <p className="text-gray-500 text-sm mt-1">Pantau performa bisnis RuangSinggah.id</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Total Pengguna" value={stats.totalUsers} icon="👥" color="bg-blue-100 text-blue-700" />
                    <StatCard title="Total Pendapatan" value={formatCurrency(stats.totalRevenue)} icon="💰" color="bg-orange-100 text-orange-700" />
                    <StatCard title="Mitra Aktif" value={stats.totalMitra} icon="🤝" color="bg-emerald-100 text-emerald-700" />
                    <StatCard title="Database Aktif" value={stats.totalDb} icon="🗄️" color="bg-purple-100 text-purple-700" />
                </div>

                {/* Chart Section */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Tren Pengguna vs Pendapatan</h4>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                <XAxis 
                                    dataKey="time" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 10, fill: '#9ca3af' }} 
                                />
                                <YAxis 
                                    yAxisId="left" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                                    tickFormatter={(val) => `Rp${val/1000000}M`}
                                />
                                <YAxis 
                                    yAxisId="right" 
                                    orientation="right" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area 
                                    yAxisId="left"
                                    type="monotone" 
                                    dataKey="pendapatan" 
                                    stroke="#f97316" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorRev)" 
                                    name="Pendapatan"
                                />
                                <Area 
                                    yAxisId="right"
                                    type="monotone" 
                                    dataKey="pengguna" 
                                    stroke="#3b82f6" 
                                    strokeWidth={3}
                                    fillOpacity={0} 
                                    name="Pengguna"
                                />
                                <Legend verticalAlign="top" align="right" iconType="circle" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}