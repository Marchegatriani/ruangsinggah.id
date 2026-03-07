import React, { useState, useMemo, useEffect } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const DatabaseIndex = ({ products = [], initialId, auth, ...props }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('Semua Kota');
    const [selectedCampus, setSelectedCampus] = useState('Semua Kampus');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [detailItem, setDetailItem] = useState(null);

    const formatCurrency = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    useEffect(() => {
        if (initialId && products.length > 0) {
            const item = products.find(i => i.id === parseInt(initialId));
            if (item) setDetailItem(item);
        }
    }, [initialId, products]);

    const cities = useMemo(() => {
        const uniqueCities = Array.from(new Set(products.map(i => i.city)));
        return ['Semua Kota', ...uniqueCities.sort()];
    }, [products]);

    const availableCampuses = useMemo(() => {
        const campuses = products
            .filter(i => selectedCity === 'Semua Kota' || i.city === selectedCity)
            .map(i => i.campus);
        return ['Semua Kampus', ...Array.from(new Set(campuses)).sort()];
    }, [selectedCity, products]);

    const filteredDatabases = useMemo(() => {
        return products.filter(item => {
            const matchSearch = searchTerm === '' ||
                item.campus.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.area.toLowerCase().includes(searchTerm.toLowerCase());
            const matchCity = selectedCity === 'Semua Kota' || item.city === selectedCity;
            const matchCampus = selectedCampus === 'Semua Kampus' || item.campus === selectedCampus;
            return matchSearch && matchCity && matchCampus;
        });
    }, [searchTerm, selectedCity, selectedCampus, products]);

    const handleBuyNow = (item) => {
        if (!auth.user) {
            if (confirm("Anda harus login untuk membeli database ini. Login sekarang?")) {
                router.get(route('login'), { redirect: route('databasekost.index', { productId: item.id }) });
            }
            return;
        }
        // Integrasi Payment Gateway (Midtrans/Xendit) bisa diletakkan di sini
        alert("Fitur pembayaran akan segera hadir!");
    };

    const renderFilterControls = () => (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Cari Area</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nama kampus atau area..."
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-gray-900"
                />
            </div>
            <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Pilih Kota</label>
                <div className="flex flex-wrap gap-2">
                    {cities.map(city => (
                        <button
                            key={city}
                            onClick={() => { setSelectedCity(city); setSelectedCampus('Semua Kampus'); }}
                            className={`px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCity === city
                                ? 'bg-orange-500 text-white shadow-lg'
                                : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-200'
                            }`}
                        >
                            {city}
                        </button>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Pilih Kampus</label>
                <select
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-4 text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
                >
                    {availableCampuses.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
        </div>
    );

    return (
        <AppLayout auth={auth} {...props}>
            <Head title="Database Kost Area Kampus" />
            <div className="min-h-screen bg-white pb-12">
                <section className="pt-14 lg:pt-32 pb-16 lg:pb-24 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.2em] mb-4 block">E-Directory Terupdate v2024</span>
                        <h1 className="text-4xl lg:text-7xl font-black text-gray-900 uppercase tracking-tighter leading-[0.9] mb-6">
                            Database <span className="text-orange-500">Kost</span> <br /> Area Kampus.
                        </h1>
                        <p className="text-gray-400 font-medium text-lg italic">Data valid, dikumpulkan langsung oleh tim lapangan kami.</p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <aside className="hidden lg:block w-1/4 sticky top-24 z-30">
                            <div className="bg-gray-100 rounded-[2rem] border border-gray-200 p-6">
                                <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 mb-6 pb-6 border-b border-gray-200">Filter</h3>
                                {renderFilterControls()}
                            </div>
                        </aside>

                        <main className="w-full lg:w-3/4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredDatabases.map((item) => (
                                    <div key={item.id} className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-orange-100 transition-all duration-500 cursor-pointer" onClick={() => setDetailItem(item)}>
                                        <div className="aspect-[4/3] overflow-hidden relative">
                                            <img src={item.cover_url} alt={item.campus} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <span className="bg-orange-500 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded mb-2 inline-block">{item.city}</span>
                                                <h3 className="text-white text-xl font-black uppercase tracking-tight leading-tight">{item.campus}</h3>
                                                <p className="text-white/60 text-[9px] font-bold uppercase tracking-widest mt-0.5">Area {item.area}</p>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-6">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.total_data}+ Kost</p>
                                                <p className="text-sm font-black text-gray-900">{formatCurrency(item.price)}</p>
                                            </div>
                                            <button className="w-full py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl">Lihat Detail</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </div>

            {detailItem && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md" onClick={() => setDetailItem(null)}></div>
                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
                        <div className="flex-grow overflow-y-auto">
                            <div className="h-64 bg-gray-100 relative">
                                <img src={detailItem.cover_url} className="w-full h-full object-cover" alt={detailItem.campus} />
                                <button onClick={() => setDetailItem(null)} className="absolute top-6 right-6 w-10 h-10 bg-black/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-lg border border-white/20">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}><path d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <div className="px-8 pb-10 pt-6">
                                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight leading-[0.9] mb-2">{detailItem.campus}</h2>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-8">{detailItem.city} • Area {detailItem.area}</p>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                                        <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-1">Total Entri</p>
                                        <p className="text-lg font-black text-gray-900">{detailItem.total_data}+ Unit</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Format</p>
                                        <p className="text-lg font-black text-gray-900 uppercase">{detailItem.file_type === 'upload' ? 'Excel' : 'Link'}</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-[2rem] p-6 border border-gray-100">
                                    <h4 className="text-[10px] font-black uppercase text-gray-900 tracking-widest mb-4">Deskripsi:</h4>
                                    <p className="text-sm font-medium text-gray-600 leading-relaxed">{detailItem.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white border-t border-gray-100 px-8 py-8 sticky bottom-0">
                            <div className="flex items-center justify-between gap-6">
                                <div>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Akses Selamanya</p>
                                    <p className="text-3xl font-black text-gray-900 tracking-tighter">{formatCurrency(detailItem.price)}</p>
                                </div>
                                <button onClick={() => handleBuyNow(detailItem)} className="flex-grow bg-orange-500 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-100 hover:bg-orange-600 transition-all">Beli Sekarang</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
};

export default DatabaseIndex;