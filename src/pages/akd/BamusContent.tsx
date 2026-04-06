import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { fetchBamusInfo } from '../../services/api';
import type { BamusInfo } from '../../services/api';
import { renderProfileCard, GridSkeleton } from './SharedComponents';

const BamusContent: React.FC = () => {
    const [bamusInfo, setBamusInfo] = useState<BamusInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBamusInfo()
            .then((data) => setBamusInfo(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="w-full flex flex-col items-center xl:items-start animate-fade-in">
                <div className="h-10 bg-gray-100 rounded w-2/3 mb-6 animate-pulse" />
                <div className="h-24 bg-gray-100 rounded w-full mb-16 animate-pulse" />
                <GridSkeleton count={5} cols={4} />
            </div>
        );
    }

    // Separate members by jabatan
    const anggotaList = bamusInfo?.anggota || [];
    const ketua = anggotaList.find((a) => a.jabatan === 'Ketua');
    const wakilList = anggotaList.filter((a) => a.jabatan === 'Wakil Ketua');
    const anggotaArr = anggotaList.filter((a) => a.jabatan === 'Anggota');
    const sekretaris = anggotaList.find((a) => a.jabatan === 'Sekretaris');

    const masaJabatan = bamusInfo?.masaJabatan || '2024 – 2029';
    const deskripsi = bamusInfo?.deskripsi ||
        'Badan Musyawarah (Bamus) merupakan alat kelengkapan DPRD yang bersifat tetap dan dibentuk oleh DPRD pada awal masa jabatan. Bamus bertugas untuk memimpin rapat penyusunan agenda kegiatan dewan, menyinkronkan jadwal antar komisi, dan menetapkan agenda tahun sidang lengkap dengan prioritas penyelesaian rancangan peraturan daerah secara efektif.';

    const hasData = anggotaList.length > 0;

    return (
        <div className="w-full flex flex-col items-center xl:items-start animate-fade-in">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight text-center xl:text-left">
                Badan Musyawarah <br className="hidden xl:block" /> Masa Jabatan {masaJabatan}
            </h1>

            {/* Description */}
            <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-16 rounded-r-xl shadow-sm w-full">
                <p className="text-gray-700 leading-relaxed font-medium text-[15px]">
                    {deskripsi}
                </p>
            </div>

            {!hasData ? (
                <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
                    <User size={40} className="mx-auto text-gray-200 mb-3" />
                    <p className="text-gray-400 font-medium">Belum ada data anggota Badan Musyawarah.</p>
                    <p className="text-gray-400 text-sm mt-1">Tambahkan melalui panel admin.</p>
                </div>
            ) : (
                <>
                    {/* Ketua */}
                    {ketua && (
                        <div className="flex justify-center w-full mb-12">
                            <div className="w-[180px] md:w-[240px]">
                                {renderProfileCard({
                                    name: ketua.name,
                                    title: ketua.jabatan,
                                    location: ketua.faction || '',
                                    imageUrl: ketua.imageUrl,
                                })}
                            </div>
                        </div>
                    )}

                    {/* Wakil Ketua */}
                    {wakilList.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full mb-12">
                            {wakilList.map((person) => (
                                <div key={person.id} className="w-full">
                                    {renderProfileCard({
                                        name: person.name,
                                        title: person.jabatan,
                                        location: person.faction || '',
                                        imageUrl: person.imageUrl,
                                    })}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Anggota */}
                    {anggotaArr.length > 0 && (
                        <div className="w-full border-t border-gray-100 pt-12 mb-12">
                            <h2 className="text-xl md:text-2xl font-black text-center text-gray-900 mb-8 md:mb-10">
                                Anggota Badan Musyawarah
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
                                {anggotaArr.map((person) => (
                                    <div key={person.id} className="w-full">
                                        {renderProfileCard({
                                            name: person.name,
                                            title: person.jabatan,
                                            location: person.faction || '',
                                            imageUrl: person.imageUrl,
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sekretaris / Eks-Officio */}
                    {sekretaris && (
                        <div className="w-full border-t border-gray-100 pt-12 flex flex-col items-center mb-10">
                            <h2 className="text-xl font-bold text-center text-gray-500 mb-8 uppercase tracking-widest">
                                Eks-Officio
                            </h2>
                            <div className="w-[160px] md:w-[200px]">
                                {renderProfileCard({
                                    name: sekretaris.name,
                                    title: sekretaris.jabatan,
                                    location: sekretaris.faction || '(Bukan Anggota)',
                                    imageUrl: sekretaris.imageUrl,
                                })}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default BamusContent;
