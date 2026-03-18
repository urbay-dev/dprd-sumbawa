import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';

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
];

const pimpinan2024Data = {
    ketua: {
        name: "Drs. H. Khoirudin, M.Si",
        title: "Ketua DPRD Provinsi DKI Jakarta",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    wakil: [
        { name: "Ima Mahdiah", title: "Wakil Ketua DPRD Provinsi DKI Jakarta", image: "https://randomuser.me/api/portraits/women/44.jpg" },
        { name: "Hj. Rany Mauliani", title: "Wakil Ketua DPRD Provinsi DKI Jakarta", image: "https://randomuser.me/api/portraits/women/68.jpg" },
        { name: "Wibi Andrino, SH., MH", title: "Wakil Ketua DPRD Provinsi DKI Jakarta", image: "https://randomuser.me/api/portraits/men/46.jpg" },
        { name: "Basri Baco, SE., MM", title: "Wakil Ketua DPRD Provinsi DKI Jakarta", image: "https://randomuser.me/api/portraits/men/55.jpg" }
    ]
};

const AKDPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    // default to pimpinan if no slug or unknown slug
    const validSlug = (slug && akdMenus.find(m => m.key === slug)) ? slug : 'pimpinan';

    // Basic expanded state logic (always expand validSlug by default)
    const [expanded, setExpanded] = useState<string>(validSlug);

    if (slug && validSlug !== slug) {
        return <Navigate to="/akd/pimpinan" replace />;
    }

    const renderContent = () => {
        if (validSlug === 'pimpinan') {
            return (
                <div className="w-full">
                    <h1 className="text-2xl md:text-[28px] lg:text-[34px] font-serif font-bold text-[#222] mb-14 tracking-tight text-center md:text-left">
                        Pimpinan DPRD Masa Jabatan 2024 – 2029
                    </h1>

                    {/* Ketua (Centered top) */}
                    <div className="flex justify-center mb-12">
                        <div className="flex flex-col items-center bg-white rounded-lg shadow-sm w-[200px] md:w-[240px] p-4 transition-all hover:shadow-md">
                            <div className="w-full aspect-[3/4] mb-4 bg-gray-100 rounded-md overflow-hidden">
                                <img src={pimpinan2024Data.ketua.image} alt={pimpinan2024Data.ketua.name} className="w-full h-full object-cover" />
                            </div>
                            <h3 className="font-bold text-[14px] md:text-base text-gray-900 mb-1.5 text-center">{pimpinan2024Data.ketua.name}</h3>
                            <p className="text-[11px] md:text-xs text-gray-500 font-medium text-center leading-relaxed px-2">{pimpinan2024Data.ketua.title}</p>
                        </div>
                    </div>

                    {/* Wakil Ketua - 4 columns */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {pimpinan2024Data.wakil.map((person, idx) => (
                            <div key={idx} className="flex flex-col items-center bg-white rounded-lg shadow-sm p-3 lg:p-4 transition-all hover:shadow-md">
                                <div className="w-full aspect-[3/4] mb-4 bg-gray-100 rounded-md overflow-hidden">
                                    <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="font-bold text-[13px] md:text-[14px] text-gray-900 mb-1.5 text-center px-1">{person.name}</h3>
                                <p className="text-[10px] md:text-[11px] text-gray-500 font-medium text-center leading-relaxed">{person.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Default placeholder for matching the layout but no specific content
        return (
            <div className="w-full">
                <h1 className="text-2xl md:text-[28px] lg:text-[34px] font-serif font-bold text-[#222] mb-8 tracking-tight text-center md:text-left">
                    {akdMenus.find(m => m.key === validSlug)?.title}
                </h1>
                <div className="bg-white p-8 rounded-xl shadow-sm text-center py-20 border border-gray-100">
                    <p className="text-gray-500">Konten informasi <span className="font-semibold text-gray-700">{akdMenus.find(m => m.key === validSlug)?.title}</span> sedang dipersiapkan dan akan segera tersedia.</p>
                </div>
            </div>
        );
    };

    return (
        <main className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 md:py-16">
            <div className="flex flex-col lg:flex-row gap-8 xl:gap-20">

                {/* Left Sidebar Menu */}
                <aside className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0">

                    {/* Decorative Sidebar Image from Reference */}
                    <div className="relative mb-8 w-full max-w-[320px] mx-auto lg:mx-0 p-4">
                        <div className="absolute inset-0 bg-[#e86666] rounded-[24px] transform -rotate-2 scale-100 opacity-90 z-0" style={{ borderRadius: '30px 10px 40px 15px' }}></div>
                        <div className="absolute inset-2 bg-[#d14b4f] rounded-[20px] transform rotate-3 scale-105 opacity-80 z-0"></div>

                        <img
                            src="/nano_banana.png"
                            alt="Gedung DPRD"
                            className="relative w-full aspect-[4/3] object-cover rounded-lg shadow-sm z-10 border-2 border-white/50"
                        />
                    </div>

                    {/* AKD Section Navigation */}
                    <div className="flex flex-col gap-0 border border-gray-100 rounded-lg p-3 bg-white shadow-sm overflow-hidden">
                        {akdMenus.map((menu) => {
                            const isActive = validSlug === menu.key;
                            const isExpanded = expanded === menu.key;
                            return (
                                <div key={menu.key} className="border-b border-gray-50 last:border-0 relative">
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[#d14b4f] transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                                    <Link
                                        to={`/akd/${menu.key}`}
                                        onClick={() => setExpanded(menu.key)}
                                        className={`block w-full text-left py-3.5 px-4 transition-colors text-[14px] md:text-[15px]
                      ${isActive ? 'font-bold text-gray-900 bg-gray-50/50' : 'font-bold text-gray-700 hover:text-gray-900 hover:bg-gray-50'}`}
                                    >
                                        {menu.title}
                                    </Link>

                                    {/* Render Accordion Submenus specifically for Pimpinan like in the image */}
                                    {menu.submenus && isExpanded && (
                                        <div className="flex flex-col bg-white pl-6 pr-2 pb-3 shadow-inner shadow-gray-100/30">
                                            {menu.submenus.map((sub, idx) => (
                                                <div
                                                    key={sub.key}
                                                    className={`py-2 px-3 text-[13px] rounded mb-1 cursor-pointer transition-colors
                            ${idx === 0 ? 'font-bold text-black' : 'font-bold text-gray-600 hover:text-black'}
                          `}
                                                >
                                                    {sub.title}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* Right main content area */}
                <section className="flex-1 lg:mt-6">
                    {renderContent()}
                </section>

            </div>
        </main>
    );
}

export default AKDPage;
