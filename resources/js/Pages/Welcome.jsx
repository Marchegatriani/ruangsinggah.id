import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

// Terima props 'listKost' dari Controller
const Welcome = ({ listKost = [], ...props }) => {
  return (
    <AppLayout {...props}>
      <Head title="RuangSinggah.id - Hunian Mahasiswa Terverifikasi" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-[1.1]">
              Cari Kost <span className="text-orange-500">Cepat</span> Tanpa Ribet.
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Platform pertama yang memverifikasi setiap sudut hunian secara langsung untuk memastikan apa yang Anda lihat adalah apa yang Anda dapatkan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition shadow-xl shadow-orange-200">
                Mulai Cari Kost
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Dinamis: Rekomendasi Hunian Terverifikasi */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-2 block">Pilihan Terbaik</span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">Hunian Terverifikasi</h2>
            </div>
            <Link href="/kost" className="text-orange-500 font-bold hover:underline">Lihat Semua →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {listKost.map((kost) => (
              <div key={kost.id} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  {/* Ambil gambar pertama dari relasi images */}
                  <img 
                    src={kost.images[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'} 
                    alt={kost.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                    <span className="text-xs font-bold text-gray-900 uppercase">{kost.type}</span>
                  </div>
                  {kost.is_verified && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-500 font-medium truncate">{kost.address}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-orange-500 transition-colors">{kost.name}</h3>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Mulai Dari</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-900">Rp{new Intl.NumberFormat('id-ID').format(kost.price)}</span>
                        <span className="text-gray-400 text-sm">/bln</span>
                      </div>
                    </div>
                    <Link 
                        href={route('kost.show', kost.id)} 
                        className="bg-gray-900 text-white p-4 rounded-2xl hover:bg-orange-500 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro / Visi Misi */}
      <section id="tentang" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-4 block">Visi & Misi Kami</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">Membangun Kepercayaan di Setiap <span className="text-orange-500">Hunian</span>.</h1>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                RuangSinggah.id lahir dari keresahan mahasiswa yang seringkali kecewa saat survei kost karena foto yang tidak sesuai dengan kenyataan.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <h4 className="text-orange-500 font-bold text-4xl mb-1">100%</h4>
                  <p className="text-gray-500 font-medium">Verified Listings</p>
                </div>
                <div>
                  <h4 className="text-orange-500 font-bold text-4xl mb-1">0</h4>
                  <p className="text-gray-500 font-medium">Booking Fees</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-orange-100 rounded-[3rem] -rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Interior Kost Terverifikasi" 
                className="relative rounded-[2.5rem] shadow-2xl border border-white w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Verification Approach */}
      <section id="verifikasi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Bagaimana Kami Memverifikasi?</h2>
            <p className="text-gray-500 text-lg">Integritas data adalah prioritas utama RuangSinggah.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Kunjungan Langsung', desc: 'Tim kami mendatangi setiap titik kost yang terdaftar di platform kami.' },
              { step: '02', title: 'Audit Fasilitas', desc: 'Kami mengecek satu-per-satu fasilitas yang dijanjikan pemilik kost.' },
              { step: '03', title: 'Wawancara Penghuni', desc: 'Kami bertanya kepada penghuni aktif tentang kenyamanan dan pelayanan kost.' },
              { step: '04', title: 'Update Berkala', desc: 'Data diperbarui setiap 3 bulan untuk memastikan informasi tetap relevan.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-10 rounded-[2.5rem] border border-transparent hover:border-orange-100 hover:bg-white hover:shadow-xl transition-all duration-300">
                <span className="text-6xl font-black text-orange-500/10 mb-6 block leading-none">{item.step}</span>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA Small */}
      <section className="py-24 bg-gray-900 rounded-t-[4rem] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 italic">"Mencari tempat tinggal tidak harus melelahkan."</h2>
          <p className="text-gray-400 mb-10">— Tim RuangSinggah.id</p>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Welcome;