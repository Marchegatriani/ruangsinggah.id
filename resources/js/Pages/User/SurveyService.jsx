import React, { useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { 
    CheckCircle, AlertTriangle, Video, MapPin, Calendar, 
    Clock, ArrowRight, ShieldCheck, Wifi, Droplets, X 
} from 'lucide-react';

const SurveyService = ({ auth, ...props }) => {
    const offerSectionRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        kostName: '',
        ownerPhone: '',
        kostAddress: '',
        source: 'database',
        surveyDate: '',
        surveyTime: '',
        notes: ''
    });

    const scrollToOffer = () => {
        offerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const message = `Halo Admin RuangSinggah, saya ingin request Jasa Survey Lokasi Kost (Paket Rp 70.000).
    
DATA DIRI:
Nama: ${formData.name}
No WA: ${formData.phone}
Email: ${formData.email}

DETAIL KOST:
Nama Kost: ${formData.kostName}
No Pemilik: ${formData.ownerPhone}
Alamat: ${formData.kostAddress}
Sumber Info: ${formData.source}

JADWAL SURVEY (VIDEO CALL):
Tanggal: ${formData.surveyDate}
Jam: ${formData.surveyTime}

Catatan: ${formData.notes}

Mohon diproses segera. Terima kasih.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/6285156634283?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <AppLayout auth={auth} {...props}>
            <Head title="Jasa Survey Kost Anti-Zonk" />
            
            <div className="min-h-screen bg-white font-sans">
                {/* HERO SECTION */}
                <section className="relative pt-8 pb-8 sm:pb-16 lg:pt-32 lg:pb-32 overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-orange-50/50 -z-10"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-12 items-center">
                            <div className="text-center lg:text-left order-1 pt-2 lg:pt-0">
                                <div className="inline-flex items-center gap-1.5 lg:gap-2 bg-orange-100 text-orange-700 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-[10px] sm:text-xs lg:text-sm font-bold mb-4 sm:mb-6 lg:mb-8">
                                    <ShieldCheck className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                                    <span>Jangan Beli Kucing Dalam Karung!</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-gray-900 tracking-tight mb-2 sm:mb-4 lg:mb-6 leading-tight">
                                    Takut Kost <span className="text-orange-500">ZONK</span> & <br className="hidden sm:block" />
                                    Uang DP Melayang?
                                </h1>
                                <p className="text-base sm:text-lg lg:text-lg text-gray-600 mb-4 sm:mb-8 lg:mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    Foto sering menipu. Biar tim kami yang cek langsung ke lokasi, test wifi, cek air, dan video call live dengan Anda.
                                </p>
                                <div className="hidden lg:flex items-center justify-start gap-4">
                                    <button onClick={scrollToOffer} className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 hover:bg-orange-600 transition-all flex items-center gap-2">
                                        Lihat Penawaran <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="order-2 relative w-[90%] sm:w-4/5 lg:w-full mx-auto">
                                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
                                    <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80" alt="Survey" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PAIN & GAIN SECTION */}
                <section className="py-16 lg:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-20">
                            <div className="bg-orange-50 rounded-3xl p-8 border border-orange-100">
                                <h3 className="font-black text-xl text-orange-900 mb-6 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-orange-600" /> Apa yang Sering Terjadi?
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-xl shadow-sm flex items-start gap-3">
                                        <span className="text-2xl">😭</span>
                                        <p className="text-gray-700 text-sm font-medium">"Udah transfer DP, pas sampe lokasi ternyata kostnya fiktif."</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm flex items-start gap-3">
                                        <span className="text-2xl">😤</span>
                                        <p className="text-gray-700 text-sm font-medium">"Di foto bagus, aslinya lembab dan bau apek."</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 mb-6">Kenapa Harus Lewat <span className="text-blue-600">RuangSinggah</span>?</h2>
                                <div className="space-y-6">
                                    <div className="flex gap-4 p-4 rounded-2xl hover:bg-blue-50 transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0"><ShieldCheck /></div>
                                        <div><h3 className="font-bold text-lg">Hindari Penipuan</h3><p className="text-gray-600">Kami pastikan kost valid.</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* OFFER SECTION */}
                <section ref={offerSectionRef} className="py-20 bg-gray-900 text-white relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <h2 className="text-3xl md:text-4xl font-black mb-4">Paket Survey Anti-Zonk</h2>
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto mt-12">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 border-b border-white/10 pb-8">
                                <div className="text-left">
                                    <p className="text-gray-300 text-sm font-bold mb-1 uppercase">Harga Spesial</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-orange-500">Rp 70.000</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(true)} className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all">
                                Ambil Promo Ini Sekarang
                            </button>
                        </div>
                    </div>
                </section>

                {/* MODAL FORM */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                        <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl my-auto p-8 sm:p-10 max-h-[90vh] overflow-y-auto">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
                            <h2 className="text-2xl font-black text-gray-900 mb-8">Formulir Request Survey</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="text" required placeholder="Nama Lengkap" className="w-full px-4 py-3 rounded-lg border border-gray-300" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    <input type="tel" required placeholder="Nomor WhatsApp" className="w-full px-4 py-3 rounded-lg border border-gray-300" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                                <input type="text" required placeholder="Nama Kost / Link Kost" className="w-full px-4 py-3 rounded-lg border border-gray-300" value={formData.kostName} onChange={(e) => setFormData({ ...formData, kostName: e.target.value })} />
                                <textarea required placeholder="Alamat Lengkap Kost" className="w-full px-4 py-3 rounded-lg border border-gray-300" rows="2" value={formData.kostAddress} onChange={(e) => setFormData({ ...formData, kostAddress: e.target.value })}></textarea>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input type="date" required className="w-full px-4 py-3 rounded-lg border border-gray-300" value={formData.surveyDate} onChange={(e) => setFormData({ ...formData, surveyDate: e.target.value })} />
                                    <input type="time" required className="w-full px-4 py-3 rounded-lg border border-gray-300" value={formData.surveyTime} onChange={(e) => setFormData({ ...formData, surveyTime: e.target.value })} />
                                </div>
                                <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl text-lg">Survey Sekarang</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default SurveyService;