import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ auth, listings = [] }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus kost ini?')) {
            destroy(route('admin.kost.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Kelola Kost - Admin" />
            
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Kelola Properti Kost</h2>
                    <p className="text-gray-500 text-sm mt-1">Manajemen daftar hunian yang tampil di platform.</p>
                </div>
                <Link 
                    href={route('admin.kost.create')} 
                    className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Tambah Kost
                </Link>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="bg-gray-50/50 text-xs font-black text-gray-500 uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Info Kost</th>
                                <th className="px-6 py-4">Lokasi</th>
                                <th className="px-6 py-4">Harga /Bulan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {listings.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.images?.[0]?.url || 'https://via.placeholder.com/100'}
                                                alt={item.name}
                                                className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                                            />
                                            <div>
                                                <p className="font-bold text-gray-900">{item.name}</p>
                                                <p className="text-xs text-gray-400 mt-0.5">{item.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">{item.city}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{item.area}</p>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        {formatCurrency(item.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                                            item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {item.status || 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Link href={route('admin.kost.show', item.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors">Detail</Link>
                                            <Link href={route('admin.kost.edit', item.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors">Edit</Link>
                                            <button onClick={() => handleDelete(item.id)} className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors">Hapus</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {listings.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 font-medium italic">Belum ada data kost yang tersedia.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}