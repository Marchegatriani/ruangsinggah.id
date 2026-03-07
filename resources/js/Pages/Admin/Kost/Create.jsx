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
            attribution: '&copy; OpenStreetMap'
        }).addTo(map);

        const marker = L.marker(initialLocation, { draggable: true }).addTo(map);

        const updatePosition = async (lat, lng) => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                const data = await response.json();
                onLocationChange(lat, lng, data.display_name || "Alamat ditemukan");
            } catch (error) {
                onLocationChange(lat, lng, "Gagal memuat alamat");
            }
        };

        marker.on('dragend', (e) => {
            const pos = e.target.getLatLng();
            updatePosition(pos.lat, pos.lng);
        });

        map.on('click', (e) => {
            marker.setLatLng(e.latlng);
            updatePosition(e.latlng.lat, e.latlng.lng);
        });

        mapInstance.current = map;
        setTimeout(() => map.invalidateSize(), 100);
    }, []);

    return <div ref={mapContainerRef} className="h-[350px] w-full rounded-[2rem] border border-gray-100 z-0" />;
};

export default function Create() {
    const [activeTab, setActiveTab] = useState('info');
    const [tempInputs, setTempInputs] = useState({});

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'Campur',
        description: '',
        price: 0, // Akan dihitung otomatis dari harga terendah kamar
        address: '',
        latitude: -6.559,
        longitude: 106.725,
        facilities: [], // Fasilitas Umum
        rules: [],
        roomTypes: [], // Tipe Kamar (Objek Kompleks)
        images: [],
        is_verified: true,
    });

    const tabs = [
        { id: 'info', label: 'Informasi Dasar' },
        { id: 'location', label: 'Lokasi & Peta' },
        { id: 'rooms', label: 'Tipe Kamar & Harga' },
        { id: 'facilities', label: 'Fasilitas & Aturan' },
    ];

    // --- Room Helpers ---
    const addRoomType = () => {
        const newRoom = {
            name: '',
            size: '',
            pricing: [{ period: 'bulanan', price: '' }],
            roomFacilities: [],
            bathroomFacilities: [],
            isAvailable: true
        };
        setData('roomTypes', [...data.roomTypes, newRoom]);
    };

    const updateRoom = (index, field, value) => {
        const rooms = [...data.roomTypes];
        rooms[index][field] = value;
        setData('roomTypes', rooms);
    };

    const addPricing = (roomIndex) => {
        const rooms = [...data.roomTypes];
        rooms[roomIndex].pricing.push({ period: 'bulanan', price: '' });
        setData('roomTypes', rooms);
    };

    const addTag = (roomIndex, field, value) => {
        if (!value.trim()) return;
        const rooms = [...data.roomTypes];
        rooms[roomIndex][field] = [...rooms[roomIndex][field], value.trim()];
        setData('roomTypes', rooms);
        setTempInputs({ ...tempInputs, [`${roomIndex}-${field}`]: '' });
    };

    const removeTag = (roomIndex, field, tagIndex) => {
        const rooms = [...data.roomTypes];
        rooms[roomIndex][field] = rooms[roomIndex][field].filter((_, i) => i !== tagIndex);
        setData('roomTypes', rooms);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.kost.store'));
    };

    return (
        <AdminLayout>
            <Head title="Tambah Kost Baru" />

            <div className="max-w-6xl mx-auto pb-20">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <Link href={route('admin.kost.index')} className="text-orange-600 font-black text-[10px] uppercase tracking-widest hover:underline flex items-center gap-2 mb-2">
                            <span>&larr;</span> Kembali
                        </Link>
                        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Tambah Properti</h2>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] shadow-2xl shadow-orange-100/50 border border-gray-50 overflow-hidden flex flex-col md:flex-row min-h-[700px]">
                    {/* Sidebar Nav */}
                    <div className="w-full md:w-72 bg-gray-50/50 border-r border-gray-100 p-6 space-y-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white text-orange-600 shadow-xl border border-gray-100 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 p-8 lg:p-12 bg-white">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            
                            {activeTab === 'info' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Kost</label>
                                            <input type="text" className="w-full bg-gray-50 border-none rounded-2xl font-bold p-4 focus:ring-2 focus:ring-orange-500/20" value={data.name} onChange={e => setData('name', e.target.value)} required placeholder="Contoh: Kost Orange Dramaga" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tipe Hunian</label>
                                            <select className="w-full bg-gray-50 border-none rounded-2xl font-bold p-4" value={data.type} onChange={e => setData('type', e.target.value)}>
                                                <option value="Putra">Putra</option>
                                                <option value="Putri">Putri</option>
                                                <option value="Campur">Campur</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deskripsi Properti</label>
                                        <textarea rows={5} className="w-full bg-gray-50 border-none rounded-2xl font-medium p-4" value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Ceritakan keunggulan kost Anda..." />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'location' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                    <LocationPicker lat={data.latitude} lng={data.longitude} onLocationChange={(lat, lng, addr) => {
                                        setData(prev => ({ ...prev, latitude: lat, longitude: lng, address: addr }));
                                    }} />
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Alamat Lengkap (Otomatis dari Peta)</label>
                                        <textarea className="w-full bg-gray-50 border-none rounded-2xl font-bold p-4 text-sm" rows={3} value={data.address} onChange={e => setData('address', e.target.value)} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'rooms' && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Manajemen Kamar</h3>
                                        <button type="button" onClick={addRoomType} className="bg-orange-600 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest"> + Tambah Tipe </button>
                                    </div>

                                    {data.roomTypes.map((room, idx) => (
                                        <div key={idx} className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 space-y-6 relative group">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Tipe</label>
                                                    <input type="text" className="w-full border-none bg-white rounded-xl font-bold text-sm" value={room.name} onChange={e => updateRoom(idx, 'name', e.target.value)} placeholder="Cth: Deluxe" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ukuran (m)</label>
                                                    <input type="text" className="w-full border-none bg-white rounded-xl font-bold text-sm" value={room.size} onChange={e => updateRoom(idx, 'size', e.target.value)} placeholder="Cth: 3x4" />
                                                </div>
                                            </div>

                                            {/* Pricing Section */}
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Skema Harga</label>
                                                {room.pricing.map((p, pIdx) => (
                                                    <div key={pIdx} className="flex gap-4">
                                                        <select className="border-none bg-white rounded-xl font-bold text-xs" value={p.period} onChange={e => {
                                                            const newRooms = [...data.roomTypes];
                                                            newRooms[idx].pricing[pIdx].period = e.target.value;
                                                            setData('roomTypes', newRooms);
                                                        }}>
                                                            <option value="harian">Harian</option>
                                                            <option value="mingguan">Mingguan</option>
                                                            <option value="bulanan">Bulanan</option>
                                                            <option value="tahunan">Tahunan</option>
                                                        </select>
                                                        <input type="number" className="flex-1 border-none bg-white rounded-xl font-bold text-xs" value={p.price} onChange={e => {
                                                            const newRooms = [...data.roomTypes];
                                                            newRooms[idx].pricing[pIdx].price = e.target.value;
                                                            setData('roomTypes', newRooms);
                                                        }} placeholder="Harga (Rp)" />
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => addPricing(idx)} className="text-[10px] font-bold text-gray-400 hover:text-orange-600 uppercase">+ Tambah Periode</button>
                                            </div>

                                            {/* Room Tags */}
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fasilitas Kamar</label>
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {room.roomFacilities.map((tag, tIdx) => (
                                                            <span key={tIdx} className="bg-white px-2 py-1 rounded-lg text-[10px] font-bold border border-gray-100">{tag} <button type="button" onClick={() => removeTag(idx, 'roomFacilities', tIdx)} className="text-red-400 ml-1">×</button></span>
                                                        ))}
                                                    </div>
                                                    <input type="text" className="w-full border-none bg-white rounded-xl text-xs p-2" placeholder="Ketik & Enter..." value={tempInputs[`${idx}-rf`] || ''} onChange={e => setTempInputs({...tempInputs, [`${idx}-rf`]: e.target.value})} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag(idx, 'roomFacilities', e.target.value))} />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kamar Mandi</label>
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {room.bathroomFacilities.map((tag, tIdx) => (
                                                            <span key={tIdx} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-[10px] font-bold">{tag} <button type="button" onClick={() => removeTag(idx, 'bathroomFacilities', tIdx)} className="text-red-400 ml-1">×</button></span>
                                                        ))}
                                                    </div>
                                                    <input type="text" className="w-full border-none bg-white rounded-xl text-xs p-2" placeholder="Ketik & Enter..." value={tempInputs[`${idx}-bf`] || ''} onChange={e => setTempInputs({...tempInputs, [`${idx}-bf`]: e.target.value})} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag(idx, 'bathroomFacilities', e.target.value))} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'facilities' && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Fasilitas Umum Properti</label>
                                        <div className="flex flex-wrap gap-3">
                                            {['WiFi', 'Parkir Motor', 'Parkir Mobil', 'CCTV', 'Dapur Bersama', 'Laundry', 'Penjaga'].map(f => (
                                                <button key={f} type="button" onClick={() => {
                                                    const exists = data.facilities.includes(f);
                                                    setData('facilities', exists ? data.facilities.filter(i => i !== f) : [...data.facilities, f]);
                                                }} className={`px-5 py-2 rounded-full text-xs font-bold border transition-all ${data.facilities.includes(f) ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-gray-400 border-gray-100'}`}>
                                                    {f}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Aturan Kost</label>
                                        <textarea rows={4} className="w-full bg-gray-50 border-none rounded-2xl font-medium p-4 text-sm" placeholder="Sebutkan aturan (pisahkan dengan enter)..." onChange={e => setData('rules', e.target.value.split('\n'))} />
                                    </div>
                                </div>
                            )}

                            <div className="pt-10 border-t border-gray-50 flex justify-end gap-4">
                                <button type="submit" disabled={processing} className="px-12 py-4 bg-orange-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-orange-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-50">
                                    {processing ? 'Menyimpan...' : 'Simpan Properti'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}