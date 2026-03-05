import React, { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { CheckCircle2, ShieldCheck, Video, MapPin, FileText, ArrowRight, X } from 'lucide-react';

const MitraOwner = ({ auth, ...props }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasAgreedMoU, setHasAgreedMoU] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const formSectionRef = useRef(null);

    const { data, setData, post, processing, reset } = useForm({
        ownerName: '',
        phone: '',
        kostName: '',
        kostType: 'Campur',
        emptyRooms: '',
        address: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mitra.store'), {
            onSuccess: () => {
                setIsSuccess(true);
                reset();
                setTimeout(() => {
                    setIsSuccess(false);
                    setIsModalOpen(false);
                    setHasAgreedMoU(false);
                }, 5000);
            },
        });
    };

    const scrollToFormSection = () => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <AppLayout auth={auth} {...props}>
            <Head title="Bermitra dengan RuangSinggah.id" />
            
            <div className="min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="bg-orange-500 pt-16 pb-24 text-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="inline-flex items-center gap-2 bg-orange-400/30 px-4 py-2 rounded-full text-sm font-bold mb-8">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Terpercaya oleh Ratusan Pemilik Properti</span>
                                </div>
                                <h1 className="text-5xl font-extrabold mb-6 leading-tight">Optimalkan Hunian Anda Bersama RuangSinggah.id</h1>
                                <p className="text-orange-50 text-lg mb-10">Jangkau ribuan mahasiswa potensial dan bangun kepercayaan melalui sistem verifikasi yang transparan.</p>
                                <button onClick={scrollToFormSection} className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-xl flex items-center gap-2">
                                    Daftar Jadi Mitra Ruangsinggah <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3]">
                                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80" alt="Kost" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-16">Kenapa Bermitra Dengan Kami?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { title: "Eksposur Mahasiswa", desc: "Listing Anda akan tampil di halaman utama pencarian mahasiswa.", icon: <ShieldCheck className="w-8 h-8" /> },
                                { title: "Badge Verifikasi", desc: "Properti terverifikasi mendapatkan kepercayaan 2x lebih tinggi.", icon: <Video className="w-8 h-8" /> },
                                { title: "Insight Properti", desc: "Dapatkan data statistik performa listing Anda.", icon: <MapPin className="w-8 h-8" /> }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-10 rounded-3xl border border-gray-100 hover:shadow-2xl transition-all text-center">
                                    <div className="w-16 h-16 mx-auto bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-8">{item.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                    <p className="text-gray-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-gray-900 text-white text-center" ref={formSectionRef}>
                    <h2 className="text-4xl font-extrabold mb-10">Siap Menerima Penghuni Baru?</h2>
                    <button
                        onClick={() => { setHasAgreedMoU(false); setIsModalOpen(true); }}
                        className="bg-orange-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-xl"
                    >
                        Mulai Pendaftaran Sekarang
                    </button>
                </section>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
                            <div className="px-6 py-5 border-b flex justify-between items-center">
                                <h3 className="text-xl font-black">Formulir Kemitraan</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500"><X className="w-6 h-6" /></button>
                            </div>

                            <div className="p-8 overflow-y-auto">
                                {isSuccess ? (
                                    <div className="text-center py-8">
                                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5">
                                            <CheckCircle2 className="w-10 h-10" />
                                        </div>
                                        <h4 className="text-2xl font-black text-green-900 mb-3">Pendaftaran Berhasil!</h4>
                                        <p className="text-green-700">Tim kami akan segera menghubungi Anda via WhatsApp.</p>
                                    </div>
                                ) : !hasAgreedMoU ? (
                                    <div>
                                        <div className="bg-gray-50 border rounded-xl p-5 mb-6 text-sm space-y-4 text-gray-700">
                                            <p><strong>1. Komitmen:</strong> Pemilik bersedia mengupdate ketersediaan kamar.</p>
                                            <p><strong>2. Biaya:</strong> Tidak ada biaya pendaftaran di awal.</p>
                                            <p><strong>3. Verifikasi:</strong> Pemilik mengizinkan tim kami melakukan survei lokasi.</p>
                                        </div>
                                        <button 
                                            onClick={() => setHasAgreedMoU(true)}
                                            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all"
                                        >
                                            Setuju & Lanjut Mengisi Data
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Pemilik</label>
                                                <input type="text" required value={data.ownerName} onChange={e => setData('ownerName', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200" placeholder="Budi Santoso" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp</label>
                                                <input type="tel" required value={data.phone} onChange={e => setData('phone', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200" placeholder="081234567890" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Properti/Kost</label>
                                            <input type="text" required value={data.kostName} onChange={e => setData('kostName', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200" placeholder="Kost Berkah" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Jenis Kost</label>
                                                <select value={data.kostType} onChange={e => setData('kostType', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200">
                                                    <option value="Putra">Putra</option>
                                                    <option value="Putri">Putri</option>
                                                    <option value="Campur">Campur</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Kamar Kosong</label>
                                                <input type="number" required value={data.emptyRooms} onChange={e => setData('emptyRooms', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200" placeholder="5" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Lengkap</label>
                                            <textarea required rows={3} value={data.address} onChange={e => setData('address', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 resize-none" placeholder="Alamat lengkap properti..."></textarea>
                                        </div>
                                        <button type="submit" disabled={processing} className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 transition-all disabled:opacity-70">
                                            {processing ? "Memproses..." : "Kirim Pendaftaran"}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default MitraOwner;
