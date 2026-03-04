import React from 'react';
import { Link } from '@inertiajs/react';

const KostCard = ({ kost }) => {
    const formatCurrency = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={kost.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'} 
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
                
                <h3 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-orange-500 transition-colors line-clamp-1">{kost.name}</h3>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Mulai Dari</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-gray-900">{formatCurrency(kost.price)}</span>
                            <span className="text-gray-400 text-xs">/bln</span>
                        </div>
                    </div>
                    <Link href={route('kost.show', kost.id)} className="bg-gray-900 text-white p-3 rounded-xl hover:bg-orange-500 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default KostCard;