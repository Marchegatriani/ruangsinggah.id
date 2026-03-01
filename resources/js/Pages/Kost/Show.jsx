import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

// Helper Format Mata Uang
const formatIDR = (price) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

const Show = ({ kost, auth }) => {
    // State dari kode lama kamu
    const [selectedPeriod, setSelectedPeriod] = useState('bulanan');
    const [currentPhoto, setCurrentPhoto] = useState(0);

    // Integrasi Google Maps
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    const center = { lat: parseFloat(kost.latitude), lng: parseFloat(kost.longitude) };

    return (
        <AppLayout user={auth.user}>
            <Head title={`${kost.name} - RuangSinggah.id`} />

            <div className="bg-gray-50/50 min-h-screen pb-20">
                {/* Breadcrumb & Title */}
                <div className="max-w-7xl mx-auto px-4 pt-8">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                        <Link href="/" className="hover:text-orange-500">Beranda</Link>
                        <span>/</span>
                        <span className="text-gray-900">{kost.name}</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Kolom Kiri: Galeri & Info */}
                    <div className="lg:col-span-2 space-y-12">
                        
                        {/* Gallery Section - Mengambil Logika Slide dari Kode Lamamu */}
                        <div className="relative group aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-gray-200 border border-white">
                            <img 
                                src={kost.images[currentPhoto]?.url} 
                                className="w-full h-full object-cover transition-all duration-700" 
                                alt={kost.name} 
                            />
                            <div className="absolute inset-0 flex items-center justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => setCurrentPhoto((prev) => (prev - 1 + kost.images.length) % kost.images.length)} className="p-4 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-orange-500 transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button onClick={() => setCurrentPhoto((prev) => (prev + 1) % kost.images.length)} className="p-4 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-orange-500 transition-all">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                            <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                                {currentPhoto + 1} / {kost.images.length} FOTO
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {kost.images.map((img, idx) => (
                                <button key={idx} onClick={() => setCurrentPhoto(idx)} className={`relative w-24 h-24 shrink-0 rounded-[1.5rem] overflow-hidden transition-all ${currentPhoto === idx ? 'ring-4 ring-orange-500 ring-offset-4' : 'opacity-60 hover:opacity-100'}`}>
                                    <img src={img.url} className="w-full h-full object-cover" alt="thumbnail" />
                                </button>
                            ))}
                        </div>

                        {/* Deskripsi & Fasilitas */}
                        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="bg-orange-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Terverifikasi Lapangan</span>
                                <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{kost.type}</span>
                            </div>
                            <h1 className="text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">{kost.name}</h1>
                            <p className="text-gray-500 flex items-center gap-2 mb-8 font-medium">
                                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                {kost.address}
                            </p>
                            
                            <hr className="mb-10 border-gray-100" />
                            
                            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-6">Fasilitas Properti</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {/* Di sini kamu bisa looping fasilitas dari database */}
                                <div className="flex items-center gap-3 text-gray-600 font-bold text-sm">
                                    <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">📶</div>
                                    WiFi 24 Jam
                                </div>
                                <div className="flex items-center gap-3 text-gray-600 font-bold text-sm">
                                    <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">❄️</div>
                                    AC Dingin
                                </div>
                            </div>
                        </div>

                        {/* Google Maps Section */}
                        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-gray-100">
                             <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-6 text-center">Lokasi Presisi</h3>
                             {isLoaded ? (
                                <GoogleMap mapContainerStyle={{width: '100%', height: '400px', borderRadius: '2rem'}} center={center} zoom={16}>
                                    <Marker position={center} />
                                </GoogleMap>
                             ) : <div className="h-[400px] bg-gray-100 animate-pulse rounded-[2rem]"></div>}
                        </div>
                    </div>

                    {/* Kolom Kanan: Booking Sidebar (Mirip Kode Lamamu) */}
                    <div className="relative">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-2xl shadow-gray-200/50">
                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2">Harga Sewa</p>
                                <div className="flex items-baseline gap-2 mb-8">
                                    <span className="text-4xl font-black text-gray-900 tracking-tighter">{formatIDR(kost.price)}</span>
                                    <span className="text-gray-400 font-bold">/ bulan</span>
                                </div>

                                {/* Periode Selector ala Kode Lamamu */}
                                <div className="mb-8">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Pilih Durasi Sewa</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {['bulanan', 'tahunan'].map((period) => (
                                            <button 
                                                key={period} 
                                                onClick={() => setSelectedPeriod(period)}
                                                className={`py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-2 ${selectedPeriod === period ? 'bg-gray-900 text-white border-gray-900 shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-orange-500'}`}
                                            >
                                                {period}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-orange-100 hover:bg-orange-600 active:scale-95 transition-all">
                                        Ajukan Sewa Sekarang
                                    </button>
                                    <button className="w-full bg-white text-gray-900 border-2 border-gray-100 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-gray-900 transition-all">
                                        Hubungi Pemilik
                                    </button>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                                    <p className="text-xs text-gray-400 font-medium leading-relaxed">
                                        Tersedia di area strategis dekat <br/> 
                                        <span className="text-gray-900 font-bold">
                                            {kost.campuses?.map(c => c.name).join(', ')}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;