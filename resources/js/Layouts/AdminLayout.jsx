import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const [activeMenu, setActiveMenu] = useState(route().current());

    // Komponen Navigasi Sidebar
    const SidebarItem = ({ icon, label, routeName, active }) => (
        <Link
            href={route(routeName)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                active 
                ? 'bg-orange-50 text-orange-600 font-bold shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
        >
            <span className="text-lg">{icon}</span>
            <span className="text-xs uppercase tracking-wider">{label}</span>
        </Link>
    );

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 h-20 flex items-center shrink-0">
                <div className="max-w-[100%] w-full mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-black text-orange-600 tracking-tighter">
                        RuangSinggah<span className="text-gray-900">.id</span>
                        <span className="ml-2 text-[10px] bg-gray-900 text-white px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">Admin</span>
                    </Link>
                    
                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-black text-gray-900 uppercase">{auth.user.name}</p>
                            <p className="text-[9px] text-orange-500 font-bold uppercase tracking-widest text-right">Administrator</p>
                        </div>
                        <Link href={route('logout')} method="post" as="button" className="p-2 hover:bg-red-50 text-red-500 rounded-full transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col p-4 space-y-2 overflow-y-auto">
                    <SidebarItem icon="📊" label="Ringkasan Analisis" routeName="admin.dashboard" active={route().current('admin.dashboard')} />

                    <div className="pt-4 pb-2">
                        <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Katalog Utama</p>
                    </div>
                    <SidebarItem icon="🏠" label="Kelola Kost" routeName="admin.kost.index" active={route().current('admin.kost.*')} />
                    <SidebarItem icon="🗄️" label="Kelola Database" routeName="admin.database.index" active={route().current('admin.database.*')} />
                    <SidebarItem icon="�️" label="Verifikasi Kost" routeName="admin.verification.index" active={route().current('admin.verification.*')} />

                    <div className="pt-4 pb-2">
                        <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaksi & Klien</p>
                    </div>
                    <SidebarItem icon="🛒" label="Sewa Kost" routeName="admin.transactions.rent" active={route().current('admin.transactions.rent')} />
                    <SidebarItem icon="📦" label="Pembelian DB" routeName="admin.transactions.db" active={route().current('admin.transactions.db')} />

                    <div className="pt-4 pb-2">
                        <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Permohonan</p>
                    </div>
                    <SidebarItem icon="✅" label="Jasa Survey" routeName="admin.survey.index" active={route().current('admin.survey.*')} />
                    <SidebarItem icon="🤝" label="Pendaftar Mitra" routeName="admin.mitra.index" active={route().current('admin.mitra.*')} />
                    <SidebarItem icon="🛠️" label="Komplain" routeName="admin.complaints.index" active={route().current('admin.complaints.*')} />
                    
                    <div className="mt-auto pt-4">
                        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-900 text-xs font-bold uppercase">
                            <span>←</span> Kembali ke Web
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}