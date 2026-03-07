import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const [activeTab, setActiveTab] = useState('info');
    
    const { data, setData, post, processing, errors } = useForm({
        campus: '',
        city: '',
        area: '',
        price: '',
        total_data: '',
        description: '',
        file_type: 'upload', 
        file_path: null,
        cover_image: null,
    });

    const sections = [
        { id: 'info', label: 'Informasi Dasar' },
        { id: 'file', label: 'File & Harga' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.database.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tambah Database" />
            
            <div className="mb-8">
                <Link href={route('admin.database.index')} className="text-orange-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 mb-2 hover:underline">
                    <span>&larr;</span> Kembali ke Daftar
                </Link>
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Entry Produk Database</h2>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                
                {/* Sidebar Internal - Tema Orange */}
                <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4 space-y-1">
                    {sections.map(s => (
                        <button 
                            key={s.id} 
                            type="button"
                            onClick={() => setActiveTab(s.id)} 
                            className={`w-full text-left px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeTab === s.id 
                                ? 'bg-white text-orange-600 shadow-sm border border-gray-100 scale-105' 
                                : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1 p-8 lg:p-12 bg-white">
                    <form onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col">
                        
                        {activeTab === 'info' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Kampus / Target</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-gray-50 border-none rounded-xl font-bold p-4 focus:ring-2 focus:ring-orange-500/20 text-sm" 
                                            value={data.campus} 
                                            onChange={e => setData('campus', e.target.value)} 
                                            placeholder="Cth: IPB University"
                                            required 
                                        />
                                        {errors.campus && <div className="text-red-500 text-[10px] font-bold uppercase">{errors.campus}</div>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kota</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-gray-50 border-none rounded-xl font-bold p-4 focus:ring-2 focus:ring-orange-500/20 text-sm" 
                                            value={data.city} 
                                            onChange={e => setData('city', e.target.value)} 
                                            placeholder="Cth: Bogor"
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Area Spesifik</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-gray-50 border-none rounded-xl font-bold p-4 focus:ring-2 focus:ring-orange-500/20 text-sm" 
                                        value={data.area} 
                                        onChange={e => setData('area', e.target.value)} 
                                        placeholder="Cth: Dramaga / Babakan Lio"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deskripsi Isi Data</label>
                                    <textarea 
                                        rows={5} 
                                        className="w-full bg-gray-50 border-none rounded-xl font-medium p-4 focus:ring-2 focus:ring-orange-500/20 text-sm" 
                                        value={data.description} 
                                        onChange={e => setData('description', e.target.value)} 
                                        placeholder="Jelaskan detail kolom data yang tersedia..."
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'file' && (
                            <div className="space-y-6 animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Harga Jual (IDR)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">Rp</span>
                                            <input 
                                                type="number" 
                                                className="w-full bg-gray-50 border-none rounded-xl font-bold pl-12 pr-4 py-4 focus:ring-2 focus:ring-orange-500/20 text-sm" 
                                                value={data.price} 
                                                onChange={e => setData('price', e.target.value)} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Jumlah Data (Baris)</label>
                                        <input 
                                            type="number" 
                                            className="w-full bg-gray-50 border-none rounded-xl font-bold p-4 focus:ring-2 focus:ring-orange-500/20 text-sm" 
                                            value={data.total_data} 
                                            onChange={e => setData('total_data', e.target.value)} 
                                            placeholder="Cth: 1200"
                                        />
                                    </div>
                                </div>

                                {/* File Access Section - Tema Orange */}
                                <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 space-y-4">
                                    <label className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Sumber & Akses File</label>
                                    <div className="flex gap-2">
                                        {['upload', 'link'].map(type => (
                                            <button 
                                                key={type}
                                                type="button" 
                                                onClick={() => setData('file_type', type)}
                                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                                    data.file_type === type 
                                                    ? 'bg-orange-600 text-white shadow-lg' 
                                                    : 'bg-white text-orange-400 border border-orange-100'
                                                }`}
                                            >
                                                {type === 'upload' ? '📁 Local File' : '🔗 Link G-Drive'}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {data.file_type === 'upload' ? (
                                        <div className="space-y-2">
                                            <input 
                                                type="file" 
                                                onChange={e => setData('file_path', e.target.files[0])}
                                                className="w-full text-xs font-bold text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-orange-600 file:text-white hover:file:bg-orange-700 cursor-pointer"
                                            />
                                            <p className="text-[9px] text-orange-400 font-bold uppercase tracking-tight italic">*Format: Excel, CSV, atau PDF (Max 10MB)</p>
                                        </div>
                                    ) : (
                                        <input 
                                            type="url" 
                                            placeholder="https://drive.google.com/..." 
                                            className="w-full bg-white border-none rounded-xl font-bold p-4 text-xs focus:ring-2 focus:ring-orange-500/20"
                                            value={data.file_path || ''}
                                            onChange={e => setData('file_path', e.target.value)}
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="mt-auto pt-8 border-t border-gray-50 flex justify-end gap-4">
                            <Link href={route('admin.database.index')} className="px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] text-gray-400 hover:bg-gray-50 transition-all">
                                Batal
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-orange-600 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-orange-100 hover:bg-orange-700 transition-all active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'Sedang Memproses...' : 'Simpan Database'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}