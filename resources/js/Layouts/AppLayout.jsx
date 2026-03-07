import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Navigation */}
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-black text-orange-600 tracking-tighter">
                                RuangSinggah<span className="text-gray-900">.id</span>
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-8 font-medium text-sm">
                            <Link href="/" className="text-gray-600 hover:text-orange-500 transition">Beranda</Link>
                            <Link href={route('kost.index')} className="text-gray-600 hover:text-orange-500 transition">Cari Kost</Link>
                            <Link href={route('databasekost.index')} className="text-gray-600 hover:text-orange-500 transition">Database Kost</Link>
                            <Link href={route('survey.index')} className="text-gray-600 hover:text-orange-500 transition">Jasa Survey</Link>
                            <Link href={route('mitra.index')} className="text-gray-600 hover:text-orange-500 transition">Bermitra</Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden sm:block">
                                        <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{auth.user.name}</p>
                                        <p className="text-[9px] text-orange-500 font-bold uppercase tracking-widest">
                                            {auth.user.role === 'admin' ? 'Administrator' : 'Penyewa'}
                                        </p>
                                    </div>

                                    <Link 
                                        href={route('logout')} 
                                        method="post" 
                                        as="button" 
                                        className="text-gray-500 hover:text-red-500 font-bold text-sm transition"
                                    >
                                        Keluar
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <Link href={route('login')} className="text-gray-700 font-semibold hover:text-orange-500 transition">Masuk</Link>
                                    <Link href={route('register')} className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-gray-800 transition">
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>

            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <span className="text-xl font-black text-orange-600 tracking-tighter mb-4 block">
                        RuangSinggah<span className="text-gray-900">.id</span>
                    </span>
                    <p className="text-gray-400 text-xs">
                        &copy; {new Date().getFullYear()} RuangSinggah.id. Seluruh hak cipta dilindungi.
                    </p>
                </div>
            </footer>
        </div>
    );
}