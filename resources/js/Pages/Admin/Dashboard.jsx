import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';

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
    // State untuk filter (Porting dari kode lama)
    const [dateFilter, setDateFilter] = useState('all');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

    // Helper Format Rupiah dari kode lama kamu
    const formatCurrency = (value) => 
        new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR', 
            minimumFractionDigits: 0 
        }).format(value);

    // Custom Tooltip untuk Recharts agar sesuai dengan style lama
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-xl">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-xs font-bold" style={{ color: entry.color }}>
                            {entry.name}: {entry.name.toLowerCase().includes('pendapatan') ? formatCurrency(entry.value) : entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-6 animate-in fade-in duration-500">
                {/* Header Analisis & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Ringkasan Analisis</h2>
                        <p className="text-gray-500 text-sm mt-1">Pantau performa bisnis RuangSinggah.id secara real-time.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 items-center w-full md:w-auto">
                        {dateFilter === 'custom' && (
                            <div className="flex gap-2 items-center bg-gray-50 p-1.5 rounded-lg border border-gray-200">
                                <input
                                    type="date"
                                    value={customStartDate}
                                    onChange={(e) => setCustomStartDate(e.target.value)}
                                    className="text-xs bg-white border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <span className="text-gray-400 text-xs font-bold">-</span>
                                <input
                                    type="date"
                                    value={customEndDate}
                                    onChange={(e) => setCustomEndDate(e.target.value)}
                                    className="text-xs bg-white border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        )}
                        {dateFilter === 'tahunan' && (
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-2.5 font-bold outline-none"
                            >
                                {[2025, 2026].map(year => (
                                    <option key={year} value={year.toString()}>{year}</option>
                                ))}
                            </select>
                        )}
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block w-full md:w-auto p-2.5 font-bold uppercase tracking-wider outline-none"
                        >
                            <option value="all">Semua Waktu</option>
                            <option value="hari_ini">Hari Ini</option>
                            <option value="minggu_ini">Minggu Ini</option>
                            <option value="bulan_ini">Bulan Ini</option>
                            <option value="tahunan">Tahunan</option>
                            <option value="custom">Rentang Kustom</option>
                        </select>
                    </div>
                </div>

                {/* GENERAL SUMMARY SECTION */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-inner">
                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="text-xl">🌐</span> Ringkasan Umum
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard title="Total Pengguna" value={stats?.totalUsers || '0'} icon="👥" color="bg-blue-100 text-blue-700" />
                        <StatCard title="Total Pendapatan" value={formatCurrency(stats?.totalRevenue || 0)} icon="💰" color="bg-orange-100 text-orange-700" />
                        <StatCard title="Mitra Aktif" value={stats?.totalMitra || '0'} icon="🤝" color="bg-emerald-100 text-emerald-700" />
                        <StatCard title="Database Aktif" value={stats?.totalDb || '0'} icon="🗄️" color="bg-purple-100 text-purple-700" />
                    </div>

                    {/* Chart Tren Ringkasan Umum */}
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Tren Pengguna vs Pendapatan</h4>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorPendapatan" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPengguna" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} dy={10} />
                                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} tickFormatter={(value) => `Rp${value / 1000000}M`} />
                                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9ca3af' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                                    <Area yAxisId="left" type="monotone" dataKey="pendapatan" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorPendapatan)" name="Pendapatan" />
                                    <Area yAxisId="right" type="monotone" dataKey="pengguna" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPengguna)" name="Pengguna Aktif" />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}