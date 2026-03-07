import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ kost }) {
    const formatCurrency = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);

    return (
        <AdminLayout>
            <Head title={`Detail Kost - ${kost.name}`} />
            
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <Link href={route('admin.kost.index')} className="text-orange-600 font-bold text-sm hover:underline flex items-center gap-2">
                        <span>&larr;</span> Kembali ke Daftar
                    </Link>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mt-2">{kost.name}</h2>
                </div>
                <div className="flex gap-3">
                    <Link href={route('admin.kost.edit', kost.id)} className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm">
                        Edit Properti
                    </Link>
                    <Link href={route('kost.show', kost.id)} target="_blank" className="bg-orange-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-100 text-sm">
                        Lihat di Web
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Info Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 lg:p-10">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${kost.type === 'Putra' ? 'bg-blue-100 text-blue-700' : kost.type === 'Putri' ? 'bg-pink-100 text-pink-700' : 'bg-purple-100 text-purple-700'}`}>
                                    Kost {kost.type}
                                </span>
                                <h3 className="text-2xl font-black text-gray-900 mt-4">{kost.name}</h3>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Harga Sewa</p>
                                <p className="text-3xl font-black text-orange-500 mt-1">{formatCurrency(kost.price)}<span className="text-sm text-gray-400 font-bold">/bln</span></p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Alamat Lengkap</p>
                                <p className="text-gray-700 font-bold leading-relaxed">{kost.address}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 rounded-3xl border border-gray-100">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Status Verifikasi</p>
                                    <span className={`inline-flex px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl border ${kost.is_verified ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                        {kost.is_verified ? 'Terverifikasi' : 'Belum Verifikasi'}
                                    </span>
                                </div>
                                <div className="p-6 rounded-3xl border border-gray-100">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Koordinat</p>
                                    <p className="text-xs font-mono font-bold text-gray-600">{kost.latitude}, {kost.longitude}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Images Section Placeholder */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6">Galeri Foto Properti</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {kost.images?.map((img, idx) => (
                                <img key={idx} src={img.url} className="w-full aspect-square object-cover rounded-2xl bg-gray-100" />
                            ))}
                            {(!kost.images || kost.images.length === 0) && (
                                <div className="col-span-full py-12 text-center text-gray-400 font-bold italic border-2 border-dashed border-gray-100 rounded-3xl">Belum ada foto diunggah.</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Sidebar Info: Kampus */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
                        <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="text-lg">🎓</span> Kampus Terdekat
                        </h4>
                        <div className="space-y-3">
                            {kost.campuses?.map(campus => (
                                <div key={campus.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-sm font-black text-gray-700">{campus.name}</p>
                                </div>
                            ))}
                            {(!kost.campuses || kost.campuses.length === 0) && (
                                <p className="text-xs text-gray-400 italic font-bold">Tidak ada data kampus terhubung.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}