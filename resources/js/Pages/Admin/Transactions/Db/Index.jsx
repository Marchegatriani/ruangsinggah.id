import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';

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

export default function DbTransactions({ transactions = [], stats }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

    const updateStatus = (id, status) => {
        if (confirm(`Konfirmasi pesanan ini sebagai ${status}?`)) {
            router.patch(route('admin.transactions.db.update', id), { status });
        }
    };

    return (
        <AdminLayout>
            <Head title="Transaksi Database - Admin" />
            
            <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Penjualan Database</h2>
                <p className="text-sm text-gray-500 mt-1">Verifikasi pembeli untuk memberikan akses download data.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Pembeli" value={stats?.totalDbBuyers || 0} icon="🛍️" color="bg-orange-50 text-orange-600" />
                <StatCard title="File Terjual" value={stats?.totalDbSold || 0} icon="📦" color="bg-blue-50 text-blue-600" />
                <StatCard title="Pendapatan DB" value={formatCurrency(stats?.dbRevenue || 0)} icon="💳" color="bg-green-50 text-green-600" />
            </div>

            <div className="grid grid-cols-1 gap-6">
                {transactions.length > 0 ? transactions.map((trx) => (
                    <div key={trx.id} className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-all">
                        <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap justify-between items-start border-b border-gray-50 pb-4 gap-2">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-gray-900 text-white font-black px-2 py-0.5 rounded text-[10px] uppercase">{trx.order_code}</span>
                                        <span className="text-xs text-gray-400 font-medium">{new Date(trx.created_at).toLocaleDateString('id-ID')}</span>
                                    </div>
                                    <p className="font-medium text-gray-500 text-sm">Pembeli: <span className="font-black text-gray-900">{trx.user?.name}</span></p>
                                </div>
                                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border ${
                                    trx.status === 'pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                                    trx.status === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'
                                }`}>
                                    {trx.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Produk Database</p>
                                    <p className="text-sm font-bold text-orange-600">{trx.database_product?.campus}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Metode Bayar</p>
                                    <p className="text-sm font-bold text-gray-900">{trx.payment_method || 'Transfer'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-56 flex flex-col gap-2 justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                            <div className="text-right mb-2">
                                <p className="text-[10px] font-black text-gray-400 uppercase">Total Bayar</p>
                                <p className="text-xl font-black text-gray-900">{formatCurrency(trx.amount)}</p>
                            </div>
                            
                            {trx.status === 'pending' && (
                                <button 
                                    onClick={() => updateStatus(trx.id, 'success')}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-orange-100 active:scale-95"
                                >
                                    Konfirmasi
                                </button>
                            )}
                            
                            {trx.transfer_proof && (
                                <a 
                                    href={trx.proof_url} 
                                    target="_blank" 
                                    className="w-full bg-gray-50 text-gray-600 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-center border border-gray-100"
                                >
                                    Lihat Bukti
                                </a>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-200">
                        <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Belum ada transaksi database.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}