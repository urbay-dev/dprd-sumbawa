import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { fetchPimpinan } from '../services/api';
import type { Pimpinan } from '../services/api';

const akdList = [
    { name: "Komisi I", focus: "Pemerintahan, Hukum & HAM, Politik" },
    { name: "Komisi II", focus: "Perekonomian, Pembangunan & Lingkungan" },
    { name: "Komisi III", focus: "Kesejahteraan Rakyat, Pendidikan & Kesehatan" },
    { name: "Badan Musyawarah", focus: "Penjadwalan sidang dan agenda dewan" },
    { name: "Badan Anggaran", focus: "Pembahasan RAPBD & Perubahan Anggaran" },
    { name: "Bapemperda", focus: "Perencanaan pembentukan peraturan daerah" },
    { name: "Badan Kehormatan", focus: "Etika dan kehormatan anggota dewan" },
    { name: "Pimpinan Dewan", focus: "Koordinasi dan pimpinan rapat paripurna" },
];

const PimpinanPage: React.FC = () => {
    const [leaders, setLeaders] = useState<Pimpinan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPimpinan()
            .then(setLeaders)
            .finally(() => setLoading(false));
    }, []);

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                <a href="/" className="hover:text-primary">Beranda</a> <span>/</span>
                <span className="text-gray-700 font-medium">Pimpinan Dewan</span>
            </div>

            <h1 className="text-2xl font-black text-primary mb-2 border-l-4 border-accent pl-3">Pimpinan DPRD Kabupaten Sumbawa Barat</h1>
            <p className="text-gray-500 text-sm mb-8 pl-4">Periode 2024 - 2029</p>

            {/* Pimpinan Dewan */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden h-72 animate-pulse" />
                    ))}
                </div>
            ) : leaders.length === 0 ? (
                <div className="text-center py-12 text-gray-400 mb-10">
                    <User size={40} className="mx-auto mb-2 text-gray-200" />
                    <p>Belum ada data pimpinan. Tambahkan melalui panel admin.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {leaders.map((leader) => (
                        <div key={leader.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="relative h-64">
                                {leader.imageUrl ? (
                                    <img src={leader.imageUrl} alt={leader.name} className="w-full h-full object-cover object-top" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                        <User size={60} className="text-blue-300" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                    {leader.faction && (
                                        <div className="bg-accent text-white text-xs font-bold uppercase px-2 py-0.5 rounded inline-block mb-2">{leader.faction}</div>
                                    )}
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
            )}

            {/* Struktur AKD */}
            <h2 className="text-xl font-bold text-primary border-l-4 border-accent pl-3 mb-4">Alat Kelengkapan Dewan (AKD)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {akdList.map((akd) => (
                    <div key={akd.name} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mb-2">
                            <User size={14} className="text-white" />
                        </div>
                        <h3 className="font-bold text-primary text-sm">{akd.name}</h3>
                        <p className="text-gray-500 text-xs mt-1 leading-relaxed">{akd.focus}</p>
                    </div>
                ))}
            </div>

            {/* Link ke Pimpinan Terdahulu */}
            <div className="mt-10 bg-gradient-to-r from-primary to-blue-800 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div className="text-white text-center sm:text-left">
                    <h3 className="font-black text-lg">Pimpinan DPRD Terdahulu</h3>
                    <p className="text-blue-200 text-sm mt-1">Lihat jejak rekam pimpinan DPRD Kabupaten Sumbawa Barat dari masa ke masa.</p>
                </div>
                <a
                    href="/pimpinan/terdahulu"
                    className="flex-shrink-0 bg-white text-primary font-black text-sm px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shadow-md"
                >
                    Lihat Sejarah →
                </a>
            </div>
        </main>
    );
};

export default PimpinanPage;
