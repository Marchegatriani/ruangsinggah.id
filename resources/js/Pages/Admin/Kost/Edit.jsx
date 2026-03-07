import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

// Helper Component for Leaflet Map
const LocationPicker = ({ lat, lng, onLocationChange }) => {
    const mapContainerRef = useRef(null);
    const mapInstance = useRef(null);
    const markerInstance = useRef(null);

    useEffect(() => {
        if (!mapContainerRef.current || mapInstance.current) return;
        if (typeof window.L === 'undefined') return;

        const L = window.L;
        const initialLocation = [lat || -6.559, lng || 106.725];
        const map = L.map(mapContainerRef.current).setView(initialLocation, 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker(initialLocation, { draggable: true }).addTo(map);

        const updatePositionAndAddress = async (lat, lng) => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
                    headers: { 'User-Agent': 'RuangSinggah/1.0' }
                });
                const data = await response.json();
                onLocationChange(lat, lng, data.display_name || "Alamat tidak ditemukan");
            } catch (error) {
                onLocationChange(lat, lng, "Gagal memuat alamat");
            }
        };

        marker.on('dragend', (e) => {
            const pos = e.target.getLatLng();
            updatePositionAndAddress(pos.lat, pos.lng);
        });

        map.on('click', (e) => {
            marker.setLatLng(e.latlng);
            updatePositionAndAddress(e.latlng.lat, e.latlng.lng);
        });

        mapInstance.current = map;
        markerInstance.current = marker;
        setTimeout(() => map.invalidateSize(), 100);
    }, []);

    return <div ref={mapContainerRef} className="h-[350px] w-full rounded-2xl border border-gray-200 z-0" />;
};

export default function Edit({ kost, campuses }) {
    const [activeTab, setActiveTab] = useState('info');
    
    const { data, setData, patch, processing, errors } = useForm({
        name: kost.name || '',
        type: kost.type || 'Campur',
        price: kost.price || '',
        address: kost.address || '',
        latitude: kost.latitude || -6.559,
        longitude: kost.longitude || 106.725,
        is_verified: !!kost.is_verified,
    });

    const sections = [
        { id: 'info', label: 'Informasi Dasar' },
        { id: 'location', label: 'Lokasi & Peta' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.kost.update', kost.id));
    };

    return (
        <AdminLayout>
            <Head title={`Edit Kost - ${kost.name}`} />
            
            <div className="mb-8">
                <Link href={route('admin.kost.index')} className="text-orange-600 font-bold text-sm hover:underline flex items-center gap-2">
                    <span>&larr;</span> Kembali ke Daftar
                </Link>
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mt-2">Edit Properti: {kost.name}</h2>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
                <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4 space-y-1">
                    {sections.map(s => (
                        <button 
                            key={s.id} 
                            onClick={() => setActiveTab(s.id)} 
                            className={`w-full text-left px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === s.id ? 'bg-white text-orange-600 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1 p-8 lg:p-12">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {activeTab === 'info' && (
                            <div className="space-y-6 animate-in fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Kost</label>
                                        <input type="text" className="w-full border-gray-200 rounded-xl font-bold focus:border-orange-500 focus:ring-orange-500 px-4 py-3" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                        {errors.name && <div className="text-red-500 text-xs font-bold">{errors.name}</div>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tipe Kost</label>
                                        <select className="w-full border-gray-200 rounded-xl font-bold px-4 py-3" value={data.type} onChange={e => setData('type', e.target.value)}>
                                            <option value="Putra">Putra</option>
                                            <option value="Putri">Putri</option>
                                            <option value="Campur">Campur</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Harga Sewa /Bulan</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
                                        <input type="number" className="w-full border-gray-200 rounded-xl font-bold pl-12 pr-4 py-3" value={data.price} onChange={e => setData('price', e.target.value)} required />
                                    </div>
                                    {errors.price && <div className="text-red-500 text-xs font-bold">{errors.price}</div>}
                                </div>
                                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                    <input type="checkbox" id="is_verified" className="w-5 h-5 rounded text-orange-500 focus:ring-orange-500" checked={data.is_verified} onChange={e => setData('is_verified', e.target.checked)} />
                                    <label htmlFor="is_verified" className="text-xs font-black text-gray-700 uppercase tracking-widest cursor-pointer">Tandai Sebagai Terverifikasi</label>
                                </div>
                            </div>
                        )}

                        {activeTab === 'location' && (
                            <div className="space-y-6 animate-in fade-in">
                                <LocationPicker lat={data.latitude} lng={data.longitude} onLocationChange={(lat, lng, addr) => {
                                    setData(prev => ({ ...prev, latitude: lat, longitude: lng, address: addr }));
                                }} />
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Alamat Lengkap</label>
                                    <textarea className="w-full border-gray-200 rounded-xl font-medium px-4 py-3 text-sm" rows={3} value={data.address} onChange={e => setData('address', e.target.value)} required />
                                    {errors.address && <div className="text-red-500 text-xs font-bold">{errors.address}</div>}
                                </div>
                            </div>
                        )}

                        <div className="pt-8 border-t border-gray-100 flex justify-end">
                            <button type="submit" disabled={processing} className="px-10 py-4 bg-orange-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-100 hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-50">
                                {processing ? 'Sedang Memperbarui...' : 'Perbarui Properti'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}