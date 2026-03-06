import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

export default function Rent({ auth, transactions = [], stats, trendData }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

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
            <Head title="Transaksi Sewa - Admin" />
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Transaksi Sewa Kost</h2>
                    <p className="text-gray-500 text-sm mt-1">Pantau dan verifikasi pembayaran sewa dari penghuni.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Contoh Card Transaksi dari kode lama */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="flex-1 space-y-4 relative z-10">
                        <div className="flex flex-wrap justify-between items-start border-b border-gray-50 pb-4 gap-2">
                            <div>
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <span className="bg-orange-100 text-orange-700 font-bold px-2 py-1 rounded text-[10px] uppercase tracking-wider">TRX-2026-001</span>
                                    <span className="text-xs text-gray-400 font-medium">Order: 2026-02-24</span>
                                </div>
                                <p className="font-medium text-gray-500 text-sm mt-1">Penyewa: <span className="font-black text-orange-600 text-base">Budi Santoso</span></p>
                            </div>
                            <span className="inline-flex px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border bg-yellow-50 text-yellow-700 border-yellow-200">
                                Menunggu Konfirmasi
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Properti</p><p className="text-sm font-bold text-gray-900">KOST MADANI</p></div>
                            <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tipe Kamar</p><p className="text-sm font-bold text-violet-600">Standard (Kipas)</p></div>
                            <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Durasi Sewa</p><p className="text-sm font-bold text-blue-600">Bulanan</p></div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2.5 md:w-52 shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 relative z-10">
                        <div className="mb-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total Tagihan</p>
                            <p className="text-xl font-black text-orange-500 text-right">{formatCurrency(850000)}</p>
                        </div>
                        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95">Terima Pembayaran</button>
                        <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 py-2.5 rounded-xl text-xs font-bold transition-all">Lihat Detail</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}