import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const akdMenus = [
    {
        key: 'pimpinan',
        title: 'Pimpinan DPRD',
        submenus: [
            { key: 'periode-2024-2029', title: 'Pimpinan DPRD Masa Jabatan 2024 – 2029' },
            { key: 'periode-2019-2024', title: 'Pimpinan DPRD Masa Jabatan 2019 – 2024' },
            { key: 'terdahulu', title: 'Pimpinan DPRD Terdahulu' },
        ]
    },
    { key: 'bamus', title: 'Badan Musyawarah' },
    { key: 'bapemperda', title: 'Badan Pembentukan Peraturan Daerah' },
    { key: 'banggar', title: 'Badan Anggaran' },
    { key: 'bk', title: 'Badan Kehormatan' },
    { key: 'komisi', title: 'Komisi' },
    { key: 'dapil', title: 'Daerah Pemilihan' },
];

const pimpinanData = {
    ketua: {
        name: "Drs. H. Khoirudin, M.Si",
        title: "Ketua DPRD",
        location: "DPRD Kabupaten Sumbawa Barat",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    wakil: [
        { name: "Ima Mahdiah", title: "Wakil Ketua DPRD", location: "Sumbawa Barat", image: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Hj. Rany Mauliani", title: "Wakil Ketua DPRD", location: "Sumbawa Barat", image: "https://randomuser.me/api/portraits/women/68.jpg" },
        { name: "Wibi Andrino, SH., MH", title: "Wakil Ketua DPRD", location: "Sumbawa Barat", image: "https://randomuser.me/api/portraits/men/46.jpg" },
        { name: "Basri Baco, SE., MM", title: "Wakil Ketua DPRD", location: "Sumbawa Barat", image: "https://randomuser.me/api/portraits/men/55.jpg" }
    ]
};

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

const renderProfileCard = (person: any) => (
    <div className="flex flex-col items-center group w-full">
        <div className="w-full aspect-[3/4] mb-5 relative rounded-md p-1.5 md:p-2 bg-white border border-gray-100 shadow-sm group-hover:shadow-lg transition-all duration-300">
            <div className="w-full h-full overflow-hidden rounded-md bg-gray-50">
                <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </div>
        </div>
        <h3 className="font-bold text-[14px] md:text-[15px] text-gray-900 mb-1 text-center group-hover:text-red-600 transition-colors">
            {person.name}
        </h3>
        <p className="text-[11px] md:text-[12px] text-gray-500 font-medium text-center leading-relaxed">
            {person.title} <br /> {person.location}
        </p>
    </div>
);

const AKDPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const validSlug = (slug && akdMenus.find(m => m.key === slug)) ? slug : 'pimpinan';
    const [expanded, setExpanded] = useState<string>(validSlug);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug]);

    if (slug && validSlug !== slug && validSlug !== 'dapil') {
        return <Navigate to="/akd/pimpinan" replace />;
    }

    const renderContent = () => {
        if (validSlug === 'pimpinan') {
            return (
                <div className="w-full flex flex-col items-center xl:items-start animate-fade-in">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-16 tracking-tight text-center xl:text-left">
                        Pimpinan DPRD Kabupaten Sumbawa Barat <br className="hidden xl:block" /> Masa Jabatan 2024 – 2029
                    </h1>

                    <div className="flex justify-center w-full mb-16">
                        <div className="w-[200px] md:w-[260px]">
                            {renderProfileCard(pimpinanData.ketua)}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
                        {pimpinanData.wakil.map((person, idx) => (
                            <div key={idx} className="w-full">
                                {renderProfileCard(person)}
                            </div>
                        ))}
                    </div>
                </div>
            );
        } else if (validSlug === 'bamus') {
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

        return (
            <div className="w-full animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 tracking-tight text-center md:text-left">
                    {akdMenus.find(m => m.key === validSlug)?.title}
                </h1>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center py-24">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl opacity-50">📄</span>
                    </div>
                    <p className="text-gray-500 font-medium">Konten halaman <span className="font-bold text-gray-800">{akdMenus.find(m => m.key === validSlug)?.title}</span> sedang dipersiapkan dan akan segera tersedia.</p>
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
                                const isActive = validSlug === menu.key;
                                const isExpanded = expanded === menu.key || isActive; // Auto expand if active
                                return (
                                    <div key={menu.key} className="relative mb-1">
                                        <div
                                            className={`flex justify-between items-center py-4 px-5 border-b border-gray-200 transition-all cursor-pointer ${isActive ? 'bg-white shadow-sm rounded-sm z-10 relative border-b-transparent' : 'hover:bg-white/50'
                                                }`}
                                            onClick={() => {
                                                if (menu.submenus) {
                                                    setExpanded(isExpanded && !isActive ? '' : menu.key);
                                                }
                                            }}
                                        >
                                            <Link
                                                to={`/akd/${menu.key}`}
                                                className={`text-[15px] font-bold ${isActive ? 'text-gray-900' : 'text-gray-700'}`}
                                            >
                                                {menu.title}
                                            </Link>

                                            {menu.submenus && (
                                                <button className={`text-gray-400 focus:outline-none transition-transform duration-300 ${isExpanded ? 'rotate-180 text-red-600' : ''}`}>
                                                    <ChevronDown size={18} />
                                                </button>
                                            )}
                                        </div>

                                        {/* Submenus Flyout/Accordion */}
                                        {menu.submenus && (
                                            <div
                                                className={`overflow-hidden transition-all duration-300 origin-top ${isExpanded ? 'max-h-[400px] opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
                                                    }`}
                                            >
                                                <div className={`flex flex-col p-4 bg-white shadow-lg border border-gray-100 rounded-b-md relative z-20 mx-2 mt-1 mb-3 ${isActive ? 'ml-6 border-l-4 border-l-red-600' : ''}`}>
                                                    {menu.submenus.map((sub, idx) => (
                                                        <div
                                                            key={sub.key}
                                                            className={`py-2 px-3 text-[13px] rounded mb-1 cursor-pointer transition-colors ${idx === 0 ? 'bg-gray-50 font-bold text-gray-900 border-l-2 border-red-600' : 'font-medium text-gray-600 hover:text-red-600 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            {sub.title}
                                                        </div>
                                                    ))}
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
}

export default AKDPage;
