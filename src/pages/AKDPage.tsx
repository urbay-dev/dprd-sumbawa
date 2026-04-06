import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { fetchMasaJabatan } from '../services/api';
import type { MasaJabatan } from '../services/api';

// Split content components
import PimpinanContent from './akd/PimpinanContent';
import BamusContent from './akd/BamusContent';
import BapemperdaContent from './akd/BapemperdaContent';
import BanggarContent from './akd/BanggarContent';

type Submenu = { key: string; title: string };
type AkdMenu = { key: string; title: string; submenus?: Submenu[] };

// Static akd menus – Pimpinan submenus will be generated dynamically
const staticAkdMenus: AkdMenu[] = [
    { key: 'bamus', title: 'Badan Musyawarah' },
    { key: 'bapemperda', title: 'Badan Pembentukan Peraturan Daerah' },
    { key: 'banggar', title: 'Badan Anggaran' },
    { key: 'bk', title: 'Badan Kehormatan' },
    { key: 'komisi', title: 'Komisi' },
    { key: 'dapil', title: 'Daerah Pemilihan' },
];

const AKDPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    // Data dari API
    const [masaJabatanList, setMasaJabatanList] = useState<MasaJabatan[]>([]);
    const [loadingMasa, setLoadingMasa] = useState(true);

    useEffect(() => {
        fetchMasaJabatan().then((data) => {
            setMasaJabatanList(data);
            setLoadingMasa(false);
        });
    }, []);

    // Build dynamic slugs from masa jabatan
    const aktifMasa = masaJabatanList.find((m) => m.isAktif);
    const pastMasaList = masaJabatanList.filter((m) => !m.isAktif);

    // Build akdMenus dynamically
    const pimpinanSubmenus = [
        ...(aktifMasa ? [{ key: `pimpinan-${aktifMasa.id}`, title: `Pimpinan DPRD Masa Jabatan ${aktifMasa.periode}` }] : []),
        ...pastMasaList.map((m) => ({ key: `pimpinan-${m.id}`, title: `Pimpinan DPRD Masa Jabatan ${m.periode}` })),
        { key: 'pimpinan-terdahulu', title: 'Pimpinan DPRD Terdahulu' },
    ];

    const akdMenus: AkdMenu[] = [
        {
            key: 'pimpinan',
            title: 'Pimpinan DPRD',
            submenus: pimpinanSubmenus,
        },
        ...staticAkdMenus,
    ];

    // Determine valid slug (default to first pimpinan active or 'pimpinan')
    const defaultSlug = !loadingMasa && aktifMasa ? `pimpinan-${aktifMasa.id}` : 'pimpinan';
    const allValidSlugs = [
        'pimpinan',
        ...pimpinanSubmenus.map((s) => s.key),
        ...staticAkdMenus.map((m) => m.key),
    ];

    const validSlug = (slug && allValidSlugs.includes(slug)) ? slug : defaultSlug;

    const [expanded, setExpanded] = useState<string>('pimpinan');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug]);

    if (slug && !allValidSlugs.includes(slug) && !loadingMasa) {
        return <Navigate to="/akd/pimpinan" replace />;
    }

    // ── RENDER CONTENT ──
    const renderContent = () => {
        // Pimpinan sections
        if (validSlug === 'pimpinan' || validSlug.startsWith('pimpinan-')) {
            return (
                <PimpinanContent
                    validSlug={validSlug}
                    masaJabatanList={masaJabatanList}
                    loadingMasa={loadingMasa}
                    pimpinanSubmenus={pimpinanSubmenus}
                />
            );
        }

        // Bamus
        if (validSlug === 'bamus') {
            return <BamusContent />;
        }

        // Bapemperda
        if (validSlug === 'bapemperda') {
            return <BapemperdaContent />;
        }

        // Banggar
        if (validSlug === 'banggar') {
            return <BanggarContent />;
        }

        // Generic placeholder for other AKD sections
        return (
            <div className="w-full animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 tracking-tight text-center md:text-left">
                    {akdMenus.find(m => m.key === validSlug)?.title}
                </h1>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center py-24">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl opacity-50">📄</span>
                    </div>
                    <p className="text-gray-500 font-medium">
                        Konten halaman <span className="font-bold text-gray-800">{akdMenus.find(m => m.key === validSlug)?.title}</span> sedang dipersiapkan dan akan segera tersedia.
                    </p>
                </div>
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-[#fcfcfc] py-12 md:py-20">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                    {/* Left Sidebar */}
                    <aside className="w-full lg:w-[350px] flex-shrink-0 lg:sticky lg:top-28 z-20">
                        <div className="relative mb-10 lg:mb-14 w-full aspect-[4/3] max-w-[320px] mx-auto lg:mx-0 group cursor-pointer">
                            <div className="absolute inset-0 bg-red-500 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 z-0"></div>
                            <div className="absolute inset-0 bg-red-600 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 z-0 opacity-80"></div>
                            <div className="absolute inset-2 bg-white rounded-2xl z-10 overflow-hidden shadow-lg shadow-black/10">
                                <img
                                    src="/nano_banana.png"
                                    alt="Sidebar Dekorasi"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888045653-f7267eb4bd48?auto=format&fit=crop&q=80&w=600';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Accordion Menu */}
                        <div className="flex flex-col bg-transparent">
                            {akdMenus.map((menu) => {
                                const isActive = validSlug === menu.key ||
                                    (menu.submenus?.some((s) => s.key === validSlug) ?? false);
                                const isExpanded = expanded === menu.key || isActive;

                                return (
                                    <div key={menu.key} className="relative mb-1">
                                        <div
                                            className={`flex justify-between items-center py-4 px-5 border-b border-gray-200 transition-all cursor-pointer ${isActive ? 'bg-white shadow-sm rounded-sm z-10 relative border-b-transparent' : 'hover:bg-white/50'}`}
                                            onClick={() => {
                                                if (menu.submenus) {
                                                    setExpanded(isExpanded && !isActive ? '' : menu.key);
                                                }
                                            }}
                                        >
                                            <Link
                                                to={`/akd/${menu.key}`}
                                                className={`text-[15px] font-bold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}
                                                onClick={(e) => menu.submenus && e.preventDefault()}
                                            >
                                                {menu.title}
                                            </Link>

                                            {menu.submenus && (
                                                <button className={`text-gray-400 focus:outline-none transition-transform duration-300 ${isExpanded ? 'rotate-180 text-red-600' : ''}`}>
                                                    <ChevronDown size={18} />
                                                </button>
                                            )}
                                        </div>

                                        {/* Submenus */}
                                        {menu.submenus && (
                                            <div className={`overflow-hidden transition-all duration-300 origin-top ${isExpanded ? 'max-h-[500px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'}`}>
                                                <div className={`flex flex-col p-4 bg-white shadow-lg border border-gray-100 rounded-b-md relative z-20 mx-2 mt-1 mb-3 ${isActive ? 'ml-6 border-l-4 border-l-red-600' : ''}`}>
                                                    {loadingMasa ? (
                                                        <div className="space-y-2">
                                                            {[1, 2, 3].map(i => (
                                                                <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        menu.submenus.map((sub, idx) => (
                                                            <Link
                                                                key={sub.key}
                                                                to={`/akd/${sub.key}`}
                                                                className={`py-2 px-3 text-[13px] rounded mb-1 cursor-pointer transition-colors ${validSlug === sub.key
                                                                    ? 'bg-gray-50 font-bold text-gray-900 border-l-2 border-red-600'
                                                                    : idx === 0 && validSlug === menu.key
                                                                        ? 'bg-gray-50 font-bold text-gray-900 border-l-2 border-red-600'
                                                                        : 'font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50'
                                                                    }`}
                                                            >
                                                                {sub.title}
                                                            </Link>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Right Content */}
                    <section className="flex-1 w-full lg:mt-6">
                        {renderContent()}
                    </section>

                </div>
            </div>
        </main>
    );
};

export default AKDPage;
