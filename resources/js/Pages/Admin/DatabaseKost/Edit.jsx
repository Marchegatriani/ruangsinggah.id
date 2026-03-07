import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ product }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT', // Penting untuk spoofing method PUT saat kirim file di Laravel
        campus: product.campus,
        city: product.city,
        area: product.area,
        price: product.price,
        total_data: product.total_data,
        description: product.description,
        file_type: product.file_type,
        file_path: product.file_path,
        cover_image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gunakan post karena inertia/form-data tidak support PUT secara native untuk upload file
        post(route('admin.database.update', product.id));
    };

    return (
        <AdminLayout>
            <Head title="Edit Database" />
            <div className="max-w-4xl">
                <div className="mb-8">
                    <Link href={route('admin.database.index')} className="text-blue-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 mb-2">
                        &larr; Batal & Kembali
                    </Link>
                    <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Edit Produk Database</h2>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] border border-gray-100 shadow-xl p-8 lg:p-12 space-y-8">
                    {/* Grid Info Dasar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Kampus</label>
                            <input type="text" className="w-full bg-gray-50 border-none rounded-2xl font-bold p-4 focus:ring-2 focus:ring-blue-500/20" value={data.campus} onChange={e => setData('campus', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kota</label>
                            <input type="text" className="w-full bg-gray-50 border-none rounded-2xl font-bold p-4" value={data.city} onChange={e => setData('city', e.target.value)} />
                        </div>
                    </div>

                    {/* Pengaturan File */}
                    <div className="p-6 bg-orange-50 rounded-[2rem] space-y-4">
                        <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Pengaturan File & Akses</label>
                        <div className="flex gap-4">
                            {['upload', 'link'].map(type => (
                                <button key={type} type="button" onClick={() => setData('file_type', type)} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${data.file_type === type ? 'bg-orange-600 text-white shadow-lg' : 'bg-white text-blue-400 border border-blue-100'}`}>
                                    {type === 'upload' ? '📁 Upload File' : '🔗 Link External'}
                                </button>
                            ))}
                        </div>

                        {data.file_type === 'upload' ? (
                            <input type="file" className="w-full text-xs font-bold" onChange={e => setData('file_path', e.target.files[0])} />
                        ) : (
                            <input type="text" className="w-full bg-white border-none rounded-xl font-medium p-3 text-xs" value={typeof data.file_path === 'string' ? data.file_path : ''} onChange={e => setData('file_path', e.target.value)} placeholder="https://drive.google.com/..." />
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deskripsi</label>
                        <textarea rows={4} className="w-full bg-gray-50 border-none rounded-2xl font-medium p-4" value={data.description} onChange={e => setData('description', e.target.value)} />
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex justify-end gap-4">
                        <button disabled={processing} className="bg-orange-600 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-blue-200 hover:bg-orange-700 transition-all active:scale-95">
                            {processing ? 'Menyimpan...' : 'Perbarui Database'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}