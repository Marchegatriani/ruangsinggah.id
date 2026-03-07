import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ products }) {
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR', 
            minimumFractionDigits: 0 
        }).format(value);
    };

    const handleDelete = (id, name) => {
        if (confirm(`Apakah Anda yakin ingin menghapus database "${name}" secara permanen?`)) {
            router.delete(route('admin.database.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Database" />
            
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Katalog Database</h2>
                    <p className="text-sm text-gray-500 font-medium italic">Manajemen data pencari kost dan mahasiswa aktif.</p>
                </div>
                <Link 
                    href={route('admin.database.create')} 
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange-100 transition-all active:scale-95 flex items-center gap-2"
                >
                    <span className="text-lg">+</span> Tambah Database
                </Link>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Info Database</th>
                                <th className="px-8 py-5">Wilayah</th>
                                <th className="px-8 py-5">Harga</th>
                                <th className="px-8 py-5 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.length > 0 ? products.map((db) => (
                                <tr key={db.id} className="hover:bg-orange-50/30 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 leading-none mb-1">{db.campus}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                                    {db.total_data.toLocaleString()} Data • {db.file_type}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="font-bold text-gray-700">{db.city}</p>
                                        <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">{db.area}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="font-black text-gray-900">{formatCurrency(db.price)}</p>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link 
                                                href={route('admin.database.edit', db.id)} 
                                                className="px-3 py-1.5 rounded-lg text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(db.id, db.campus)} 
                                                className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-8 py-10 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                        Belum ada data database.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}