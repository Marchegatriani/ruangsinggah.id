import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, usePage } from '@inertiajs/react';
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

export default function Rent({ transactions = [], stats, trendData }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

    // Fungsi Aksi Update Status (Laravel Backend)
    const updateStatus = (id, status) => {
        if (confirm(`Apakah Anda yakin ingin menandai transaksi ini sebagai ${status}?`)) {
            // Kita gunakan patch ke route yang akan kita buat nanti
            router.patch(route('admin.transactions.rent.update', id), { status });
        }
    };

    return (
        <AdminLayout>
            <Head title="Transaksi Sewa - Admin" />
            
            <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Transaksi Sewa Kost</h2>
                <p className="text-gray-500 text-sm mt-1">Pantau dan verifikasi pembayaran sewa dari penghuni.</p>
            </div>

            {/* Statistik Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Penyewa" value={stats?.totalRenters || 0} icon="👥" color="bg-blue-50 text-blue-600" />
                <StatCard title="Booking Berhasil" value={stats?.totalRented || 0} icon="✅" color="bg-green-50 text-green-600" />
                <StatCard title="Total Pendapatan" value={formatCurrency(stats?.rentRevenue || 0)} icon="💰" color="bg-orange-50 text-orange-600" />
            </div>

            {/* Loop Data Transaksi Nyata */}
            <div className="grid grid-cols-1 gap-6">
                {transactions.length > 0 ? transactions.map((trx) => (
                    <div key={trx.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow relative overflow-hidden">
                        <div className="flex-1 space-y-4 relative z-10">
                            <div className="flex flex-wrap justify-between items-start border-b border-gray-50 pb-4 gap-2">
                                <div>
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className="bg-orange-100 text-orange-700 font-bold px-2 py-1 rounded text-[10px] uppercase tracking-wider">{trx.booking_code}</span>
                                        <span className="text-xs text-gray-400 font-medium">Tgl: {new Date(trx.created_at).toLocaleDateString('id-ID')}</span>
                                    </div>
                                    <p className="font-medium text-gray-500 text-sm mt-1">Penyewa: <span className="font-black text-orange-600 text-base">{trx.user?.name}</span></p>
                                </div>
                                <span className={`inline-flex px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${
                                    trx.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                    trx.status === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 
                                    'bg-red-50 text-red-700 border-red-200'
                                }`}>
                                    {trx.status === 'pending' ? 'Menunggu Konfirmasi' : trx.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Properti</p><p className="text-sm font-bold text-gray-900">{trx.kost?.name}</p></div>
                                <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Metode</p><p className="text-sm font-bold text-violet-600">{trx.payment_method || 'Transfer'}</p></div>
                                <div><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Mulai Sewa</p><p className="text-sm font-bold text-blue-600">{trx.start_date}</p></div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2.5 md:w-52 shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 relative z-10">
                            <div className="mb-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total Tagihan</p>
                                <p className="text-xl font-black text-orange-500 text-right">{formatCurrency(trx.total_price)}</p>
                            </div>

                            {/* Tombol Aksi Nyata */}
                            {trx.status === 'pending' && (
                                <>
                                    <button 
                                        onClick={() => updateStatus(trx.id, 'success')}
                                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
                                    >
                                        Terima Pembayaran
                                    </button>
                                    <button 
                                        onClick={() => updateStatus(trx.id, 'cancelled')}
                                        className="w-full bg-white hover:bg-red-50 text-red-500 border border-red-100 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95"
                                    >
                                        Tolak / Batalkan
                                    </button>
                                </>
                            )}
                            <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 py-2.5 rounded-xl text-xs font-bold transition-all">Hubungi WA</button>
                        </div>
                    </div>
                )) : (
                    <div className="bg-white p-20 rounded-[2.5rem] border border-dashed border-gray-200 text-center">
                         <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Belum ada data transaksi sewa.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}