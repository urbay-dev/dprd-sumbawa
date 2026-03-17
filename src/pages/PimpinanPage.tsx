import React from 'react';
import { User } from 'lucide-react';

const leaders = [
    { id: 1, name: "H. Ahmad Rifai, S.H.", position: "Ketua DPRD", faction: "Fraksi Gerindra", period: "2024-2029", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", bio: "Anggota DPRD Kabupaten Sumbawa Barat dari Dapil 1 (Taliwang - Brang Ene). Bergabung bersama Fraksi Gerindra sejak 2019." },
    { id: 2, name: "Dra. Siti Rahayu, M.M.", position: "Wakil Ketua I", faction: "Fraksi Golkar", period: "2024-2029", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", bio: "Anggota DPRD dari Dapil 2 (Maluk - Sekongkang). Membidangi urusan Perekonomian dan Pembangunan." },
    { id: 3, name: "Ir. Zulkifli Harun", position: "Wakil Ketua II", faction: "Fraksi PKB", period: "2024-2029", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", bio: "Anggota DPRD dari Dapil 3 (Jereweh - Brang Rea). Membidangi urusan Pemerintahan dan Kesejahteraan Rakyat." },
];

const PimpinanPage: React.FC = () => {
    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                <a href="/" className="hover:text-primary">Beranda</a> <span>/</span>
                <span className="text-gray-700 font-medium">Pimpinan Dewan</span>
            </div>

            <h1 className="text-2xl font-black text-primary mb-2 border-l-4 border-accent pl-3">Pimpinan DPRD Kabupaten Sumbawa Barat</h1>
            <p className="text-gray-500 text-sm mb-8 pl-4">Periode 2024 - 2029</p>

            {/* Pimpinan Dewan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {leaders.map((leader) => (
                    <div key={leader.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-64">
                            <img src={leader.image} alt={leader.name} className="w-full h-full object-cover object-top" />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <div className="bg-accent text-white text-xs font-bold uppercase px-2 py-0.5 rounded inline-block mb-2">{leader.faction}</div>
                                <h2 className="font-black text-lg leading-tight drop-shadow">{leader.name}</h2>
                                <p className="text-blue-200 text-sm font-medium">{leader.position}</p>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-600 leading-relaxed">{leader.bio}</p>
                            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-xs text-gray-400">Periode {leader.period}</span>
                                <button className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
                                    <User size={11} /> Profil Lengkap
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Struktur AKD */}
            <h2 className="text-xl font-bold text-primary border-l-4 border-accent pl-3 mb-4">Alat Kelengkapan Dewan (AKD)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { name: "Komisi I", focus: "Pemerintahan, Hukum & HAM, Politik" },
                    { name: "Komisi II", focus: "Perekonomian, Pembangunan & Lingkungan" },
                    { name: "Komisi III", focus: "Kesejahteraan Rakyat, Pendidikan & Kesehatan" },
                    { name: "Badan Musyawarah", focus: "Penjadwalan sidang dan agenda dewan" },
                    { name: "Badan Anggaran", focus: "Pembahasan RAPBD & Perubahan Anggaran" },
                    { name: "Bapemperda", focus: "Perencanaan pembentukan peraturan daerah" },
                    { name: "Badan Kehormatan", focus: "Etika dan kehormatan anggota dewan" },
                    { name: "Pimpinan Dewan", focus: "Koordinasi dan pimpinan rapat paripurna" },
                ].map((akd) => (
                    <div key={akd.name} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mb-2">
                            <User size={14} className="text-white" />
                        </div>
                        <h3 className="font-bold text-primary text-sm">{akd.name}</h3>
                        <p className="text-gray-500 text-xs mt-1 leading-relaxed">{akd.focus}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default PimpinanPage;
