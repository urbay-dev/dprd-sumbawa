import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronDown, User, Clock } from 'lucide-react';
import { fetchMasaJabatan, fetchPimpinan } from '../services/api';
import type { MasaJabatan, Pimpinan } from '../services/api';

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

const bamusData = {
    ketua: {
        name: "Drs. H. Khoirudin, M.Si",
        title: "Ketua Badan Musyawarah",
        location: "Fraksi PKS",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    wakil: [
        { name: "Ima Mahdiah", title: "Wakil Ketua", location: "Fraksi PDI P", image: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Hj. Rany Mauliani", title: "Wakil Ketua", location: "Fraksi Gerindra", image: "https://randomuser.me/api/portraits/women/68.jpg" },
        { name: "Wibi Andrino, SH., MH", title: "Wakil Ketua", location: "Fraksi Nasdem", image: "https://randomuser.me/api/portraits/men/46.jpg" },
        { name: "Basri Baco, SE., MM", title: "Wakil Ketua", location: "Fraksi Golkar", image: "https://randomuser.me/api/portraits/men/55.jpg" }
    ],
    anggota: Array.from({ length: 16 }).map((_, i) => ({
        name: `H. Anggota Bamus ${i + 1}, S.T`,
        title: "Anggota",
        location: `Fraksi ${['PKS', 'PDI P', 'Gerindra', 'Golkar', 'Nasdem'][i % 5]}`,
        image: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${30 + i}.jpg`
    })),
    sekretaris: {
        name: "Drs. Sekretaris DPRD, M.Si",
        title: "Sekretaris Badan Musyawarah",
        location: "(Bukan Anggota)",
        image: "https://randomuser.me/api/portraits/men/90.jpg"
    }
};

const renderProfileCard = (person: { name: string; title: string; location: string; image?: string; imageUrl?: string | null; faction?: string | null }) => (
    <div className="flex flex-col items-center group w-full">
        <div className="w-full aspect-[3/4] mb-5 relative rounded-md p-1.5 md:p-2 bg-white border border-gray-100 shadow-sm group-hover:shadow-lg transition-all duration-300">
            <div className="w-full h-full overflow-hidden rounded-md bg-gray-50">
                {(person.image || person.imageUrl) ? (
                    <img
                        src={person.image || person.imageUrl || ''}
                        alt={person.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <User size={40} className="text-slate-300" />
                    </div>
                )}
            </div>
        </div>
        <h3 className="font-bold text-[14px] md:text-[15px] text-gray-900 mb-1 text-center group-hover:text-red-600 transition-colors">
            {person.name}
        </h3>
        <p className="text-[11px] md:text-[12px] text-gray-500 font-medium text-center leading-relaxed">
            {person.title} <br /> {person.location || person.faction || ''}
        </p>
    </div>
);

// Card kecil untuk pimpinan terdahulu
const renderMiniCard = (pimpinan: Pimpinan) => (
    <div key={pimpinan.id} className="flex flex-col items-center group w-full">
        <div className="w-full aspect-[3/4] mb-3 relative rounded-md p-1 bg-white border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="w-full h-full overflow-hidden rounded-sm bg-gray-50">
                {pimpinan.imageUrl ? (
                    <img
                        src={pimpinan.imageUrl}
                        alt={pimpinan.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <User size={28} className="text-slate-300" />
                    </div>
                )}
            </div>
        </div>
        <h3 className="font-bold text-[12px] text-gray-800 mb-0.5 text-center group-hover:text-red-600 transition-colors leading-tight line-clamp-2">
            {pimpinan.name}
        </h3>
        <p className="text-[10px] text-gray-500 font-medium text-center leading-relaxed">
            {pimpinan.position}
            {pimpinan.faction && <><br /><span className="text-amber-600">{pimpinan.faction}</span></>}
        </p>
    </div>
);

// ── Loading skeleton ──
const GridSkeleton = ({ count = 4, cols = 4 }: { count?: number; cols?: number }) => (
    <div className={`grid grid-cols-2 sm:grid-cols-${Math.min(cols, 3)} lg:grid-cols-${cols} gap-6`}>
        {Array(count).fill(0).map((_, i) => (
            <div key={i} className="w-full aspect-[3/4] bg-gray-100 rounded-xl animate-pulse" />
        ))}
    </div>
);

const AKDPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    // Data dari API
    const [masaJabatanList, setMasaJabatanList] = useState<MasaJabatan[]>([]);
    const [loadingMasa, setLoadingMasa] = useState(true);

    // Pimpinan per-masa-jabatan cache
    const [pimpinanCache, setPimpinanCache] = useState<Record<string, Pimpinan[]>>({});
    const [loadingPimpinan, setLoadingPimpinan] = useState(false);

    // Pimpinan terdahulu (semua)
    const [pimpinanTerdahulu, setPimpinanTerdahulu] = useState<Pimpinan[]>([]);
    const [loadingTerdahulu, setLoadingTerdahulu] = useState(false);

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

    // Load pimpinan for a specific masaJabatanId
    const loadPimpinanForMasa = useCallback(async (masaJabatanId: string) => {
        if (pimpinanCache[masaJabatanId]) return;
        setLoadingPimpinan(true);
        const data = await fetchPimpinan({ masaJabatanId });
        setPimpinanCache((prev) => ({ ...prev, [masaJabatanId]: data }));
        setLoadingPimpinan(false);
    }, [pimpinanCache]);

    // Load pimpinan terdahulu
    const loadPimpinanTerdahulu = useCallback(async () => {
        if (pimpinanTerdahulu.length > 0) return;
        setLoadingTerdahulu(true);
        const data = await fetchPimpinan({ isPast: true });
        setPimpinanTerdahulu(data);
        setLoadingTerdahulu(false);
    }, [pimpinanTerdahulu.length]);

    // When slug changes, load appropriate data
    useEffect(() => {
        if (validSlug.startsWith('pimpinan-') && validSlug !== 'pimpinan-terdahulu') {
            const masaId = validSlug.replace('pimpinan-', '');
            loadPimpinanForMasa(masaId);
        } else if (validSlug === 'pimpinan-terdahulu') {
            loadPimpinanTerdahulu();
        }
    }, [validSlug, loadPimpinanForMasa, loadPimpinanTerdahulu]);

    if (slug && !allValidSlugs.includes(slug) && !loadingMasa) {
        return <Navigate to="/akd/pimpinan" replace />;
    }

    // ── RENDER CONTENT ──
    const renderContent = () => {
        // Pimpinan per-masa-jabatan
        if (validSlug.startsWith('pimpinan-') && validSlug !== 'pimpinan-terdahulu') {
            const masaId = validSlug.replace('pimpinan-', '');
            const masa = masaJabatanList.find((m) => m.id === masaId);
            const pimpinanList = pimpinanCache[masaId] || [];

            // Sort: ketua first (order asc)
            const sorted = [...pimpinanList].sort((a, b) => a.order - b.order);
            const ketua = sorted[0];
            const wakil = sorted.slice(1);

            return (
                <div className="w-full flex flex-col items-center xl:items-start animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 tracking-tight text-center xl:text-left">
                        Pimpinan DPRD Kabupaten Sumbawa Barat <br className="hidden xl:block" />
                        Masa Jabatan {masa?.periode ?? ''}
                        {masa?.isAktif && (
                            <span className="ml-3 text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full align-middle">Aktif</span>
                        )}
                    </h1>

                    {loadingMasa || loadingPimpinan ? (
                        <GridSkeleton count={5} cols={4} />
                    ) : pimpinanList.length === 0 ? (
                        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                            <User size={40} className="mx-auto text-gray-200 mb-3" />
                            <p className="text-gray-400 font-medium">Belum ada data pimpinan untuk periode ini.</p>
                            <p className="text-gray-400 text-sm mt-1">Tambahkan melalui panel admin.</p>
                        </div>
                    ) : (
                        <>
                            {/* Ketua */}
                            {ketua && (
                                <div className="flex justify-center w-full mb-12">
                                    <div className="w-[200px] md:w-[260px]">
                                        {renderProfileCard({
                                            name: ketua.name,
                                            title: ketua.position,
                                            location: ketua.faction || '',
                                            imageUrl: ketua.imageUrl,
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Wakil & anggota lainnya */}
                            {wakil.length > 0 && (
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
                                    {wakil.map((p) => (
                                        <div key={p.id} className="w-full">
                                            {renderProfileCard({
                                                name: p.name,
                                                title: p.position,
                                                location: p.faction || '',
                                                imageUrl: p.imageUrl,
                                            })}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            );
        }

        // Pimpinan Terdahulu
        if (validSlug === 'pimpinan-terdahulu') {
            // Group by masa jabatan
            const grouped: Record<string, { label: string; items: Pimpinan[] }> = {};
            pimpinanTerdahulu.forEach((p) => {
                const key = p.masaJabatan?.periode || p.period || 'Tidak Diketahui';
                if (!grouped[key]) grouped[key] = { label: key, items: [] };
                grouped[key].items.push(p);
            });
            const groupList = Object.values(grouped).sort((a, b) => b.label.localeCompare(a.label));

            return (
                <div className="w-full flex flex-col items-center xl:items-start animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight text-center xl:text-left">
                        Pimpinan DPRD Terdahulu
                    </h1>
                    <p className="text-gray-500 text-sm mb-12 text-center xl:text-left">
                        Kabupaten Sumbawa Barat — Rekam jejak pimpinan dari masa ke masa
                    </p>

                    {loadingTerdahulu ? (
                        <div className="space-y-10 w-full">
                            {[1, 2].map((i) => (
                                <div key={i}>
                                    <div className="h-5 bg-gray-100 rounded w-48 mb-4 animate-pulse" />
                                    <GridSkeleton count={5} cols={5} />
                                </div>
                            ))}
                        </div>
                    ) : pimpinanTerdahulu.length === 0 ? (
                        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                            <Clock size={40} className="mx-auto text-gray-200 mb-3" />
                            <p className="text-gray-400 font-medium">Belum ada data pimpinan terdahulu.</p>
                            <p className="text-gray-400 text-sm mt-1">Tandai pimpinan sebagai "Terdahulu" di panel admin.</p>
                        </div>
                    ) : (
                        <div className="space-y-14 w-full">
                            {groupList.map((group) => (
                                <section key={group.label}>
                                    {/* Periode header */}
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="bg-primary text-white text-sm font-black px-4 py-1.5 rounded-full shadow">
                                            Periode {group.label}
                                        </div>
                                        <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                                        <span className="text-xs text-gray-400">{group.items.length} pimpinan</span>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
                                        {group.items.sort((a, b) => a.order - b.order).map((p) => renderMiniCard(p))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        // Default pimpinan (landing)
        if (validSlug === 'pimpinan') {
            return (
                <div className="w-full flex flex-col items-center xl:items-start animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 tracking-tight text-center xl:text-left">
                        Pimpinan DPRD Kabupaten Sumbawa Barat
                    </h1>
                    {loadingMasa ? (
                        <GridSkeleton count={4} cols={4} />
                    ) : (
                        <div className="text-center xl:text-left">
                            <p className="text-gray-500 mb-6">Pilih menu di sebelah kiri untuk melihat pimpinan per periode masa jabatan.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                                {pimpinanSubmenus.map((sub) => (
                                    <Link
                                        key={sub.key}
                                        to={`/akd/${sub.key}`}
                                        className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-primary hover:shadow-md transition-all group"
                                    >
                                        <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                            {sub.key === 'pimpinan-terdahulu'
                                                ? <Clock size={16} className="text-primary group-hover:text-white" />
                                                : <User size={16} className="text-primary group-hover:text-white" />
                                            }
                                        </div>
                                        <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors leading-tight">{sub.title}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // Bamus
        if (validSlug === 'bamus') {
            return (
                <div className="w-full flex flex-col items-center xl:items-start animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight text-center xl:text-left">
                        Badan Musyawarah <br className="hidden xl:block" /> Masa Jabatan 2024 – 2029
                    </h1>

                    <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-16 rounded-r-xl shadow-sm w-full">
                        <p className="text-gray-700 leading-relaxed font-medium text-[15px]">
                            Badan Musyawarah (Bamus) merupakan alat kelengkapan DPRD yang bersifat tetap dan dibentuk oleh DPRD pada awal masa jabatan. Bamus bertugas untuk memimpin rapat penyusunan agenda kegiatan dewan, menyinkronkan jadwal antar komisi, dan menetapkan agenda tahun sidang lengkap dengan prioritas penyelesaian rancangan peraturan daerah secara efektif.
                        </p>
                    </div>

                    <div className="flex justify-center w-full mb-12">
                        <div className="w-[180px] md:w-[240px]">
                            {renderProfileCard(bamusData.ketua)}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full mb-12">
                        {bamusData.wakil.map((person, idx) => (
                            <div key={`wakil-${idx}`} className="w-full">
                                {renderProfileCard(person)}
                            </div>
                        ))}
                    </div>

                    <div className="w-full border-t border-gray-100 pt-12 mb-12">
                        <h2 className="text-xl md:text-2xl font-black text-center text-gray-900 mb-8 md:mb-10">Anggota Badan Musyawarah</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
                            {bamusData.anggota.map((person, idx) => (
                                <div key={`anggota-${idx}`} className="w-full">
                                    {renderProfileCard(person)}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full border-t border-gray-100 pt-12 flex flex-col items-center mb-10">
                        <h2 className="text-xl font-bold text-center text-gray-500 mb-8 uppercase tracking-widest">Eks-Officio</h2>
                        <div className="w-[160px] md:w-[200px]">
                            {renderProfileCard(bamusData.sekretaris)}
                        </div>
                    </div>
                </div>
            );
        }

        // Generic placeholder
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
                                // A menu is "active" if validSlug matches its key or any submenu key
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
