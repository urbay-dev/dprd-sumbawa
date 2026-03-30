import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Users, Building2, Award } from 'lucide-react';

// ─── Data Fraksi & Kursi ───
interface FraksiData {
    slug: string;
    name: string;
    shortName: string;
    kursi: number;
    color: string;
    ketua: string;
    anggota: string[];
}

const fraksiList: FraksiData[] = [
    {
        slug: 'gerindra',
        name: 'Fraksi Partai Gerakan Indonesia Raya',
        shortName: 'Gerindra',
        kursi: 6,
        color: '#c8102e',
        ketua: '-',
        anggota: [],
    },
    {
        slug: 'golkar',
        name: 'Fraksi Partai Golongan Karya',
        shortName: 'Golkar',
        kursi: 5,
        color: '#f5c518',
        ketua: '-',
        anggota: [],
    },
    {
        slug: 'pkb',
        name: 'Fraksi Partai Kebangkitan Bangsa',
        shortName: 'PKB',
        kursi: 4,
        color: '#006b3f',
        ketua: '-',
        anggota: [],
    },
    {
        slug: 'pks',
        name: 'Fraksi Partai Keadilan Sejahtera',
        shortName: 'PKS',
        kursi: 3,
        color: '#ff6600',
        ketua: '-',
        anggota: [],
    },
    {
        slug: 'demokrat',
        name: 'Fraksi Partai Demokrat',
        shortName: 'Demokrat',
        kursi: 3,
        color: '#003580',
        ketua: '-',
        anggota: [],
    },
    {
        slug: 'nasdem',
        name: 'Fraksi Partai NasDem',
        shortName: 'NasDem',
        kursi: 4,
        color: '#1b3a6b',
        ketua: '-',
        anggota: [],
    },
];

const totalKursi = fraksiList.reduce((sum, f) => sum + f.kursi, 0);

// ─── Perolehan Kursi data for numbered list ───
const perolehanKursi = [
    { partai: 'Partai Gerakan Indonesia Raya (Gerindra)', kursi: 6 },
    { partai: 'Partai Golongan Karya (Golkar)', kursi: 5 },
    { partai: 'Partai Kebangkitan Bangsa (PKB)', kursi: 4 },
    { partai: 'Partai NasDem', kursi: 4 },
    { partai: 'Partai Keadilan Sejahtera (PKS)', kursi: 3 },
    { partai: 'Partai Demokrat', kursi: 3 },
];

const FraksiPage: React.FC = () => {
    const { slug } = useParams<{ slug?: string }>();
    const [openPeriode, setOpenPeriode] = useState<string | null>('2024-2029');

    // Find selected fraksi
    const selectedFraksi = slug ? fraksiList.find(f => f.slug === slug) : null;

    return (
        <main className="min-h-screen bg-[#fcfcfc] py-12 md:py-20">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-400 mb-8 flex items-center gap-2">
                    <Link to="/" className="hover:text-red-600 transition-colors">Beranda</Link>
                    <span>/</span>
                    <Link to="/fraksi" className={`transition-colors ${!slug ? 'text-gray-700 font-medium' : 'hover:text-red-600'}`}>
                        Fraksi
                    </Link>
                    {selectedFraksi && (
                        <>
                            <span>/</span>
                            <span className="text-gray-700 font-medium">{selectedFraksi.shortName}</span>
                        </>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* ── Left Sidebar ── */}
                    <aside className="w-full lg:w-[320px] flex-shrink-0 lg:sticky lg:top-28">
                        {/* Decorative Image */}
                        <div className="relative mb-8 w-full aspect-[4/3] max-w-[300px] mx-auto lg:mx-0 group cursor-pointer hidden lg:block">
                            <div className="absolute inset-0 bg-red-500 rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 z-0"></div>
                            <div className="absolute inset-0 bg-red-600 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 z-0 opacity-80"></div>
                            <div className="absolute inset-2 bg-white rounded-2xl z-10 overflow-hidden shadow-lg shadow-black/10">
                                <img
                                    src="/nano_banana.png"
                                    alt="Gedung DPRD Sumbawa Barat"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541888045653-f7267eb4bd48?auto=format&fit=crop&q=80&w=600';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Periode Accordion */}
                        <div className="space-y-1">
                            {/* Periode 2024 – 2029 */}
                            <div>
                                <button
                                    onClick={() => setOpenPeriode(openPeriode === '2024-2029' ? null : '2024-2029')}
                                    className="w-full flex items-center justify-between py-3 px-1 text-left group"
                                >
                                    <span className="font-black text-gray-900 text-[15px] group-hover:text-red-600 transition-colors">
                                        Periode 2024 – 2029
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={`text-gray-400 transition-transform duration-300 ${openPeriode === '2024-2029' ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openPeriode === '2024-2029' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="border-l-2 border-red-500 ml-2 pl-4 pb-4 space-y-1">
                                        <Link
                                            to="/fraksi"
                                            className={`block py-2 text-[13px] font-semibold transition-colors rounded-md px-2 ${!slug ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                                        >
                                            Perolehan Kursi Pemilu Legislatif 2024
                                        </Link>
                                        {fraksiList.map(f => (
                                            <Link
                                                key={f.slug}
                                                to={`/fraksi/${f.slug}`}
                                                className={`block py-2 text-[13px] font-semibold transition-colors rounded-md px-2 ${slug === f.slug ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                                            >
                                                {f.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Periode 2019 – 2024 */}
                            <div className="border-t border-gray-100">
                                <button
                                    onClick={() => setOpenPeriode(openPeriode === '2019-2024' ? null : '2019-2024')}
                                    className="w-full flex items-center justify-between py-3 px-1 text-left group"
                                >
                                    <span className="font-black text-gray-900 text-[15px] group-hover:text-red-600 transition-colors">
                                        Periode 2019 – 2024
                                    </span>
                                    <ChevronDown
                                        size={18}
                                        className={`text-gray-400 transition-transform duration-300 ${openPeriode === '2019-2024' ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <div className={`overflow-hidden transition-all duration-400 ease-in-out ${openPeriode === '2019-2024' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="border-l-2 border-gray-300 ml-2 pl-4 pb-4">
                                        <p className="text-sm text-gray-400 italic py-2 px-2">Data periode lalu belum tersedia.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* ── Right Main Content ── */}
                    <section className="flex-1 w-full">
                        {!selectedFraksi ? (
                            /* ─── Perolehan Kursi View ─── */
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">
                                    Perolehan Kursi Pemilu Legislatif 2024
                                </h1>
                                <p className="text-gray-500 text-sm mb-10">
                                    Distribusi kursi DPRD Kabupaten Sumbawa Barat berdasarkan hasil Pemilu Legislatif 2024
                                </p>

                                {/* Seat Distribution Bar */}
                                <div className="mb-10">
                                    <div className="flex h-8 rounded-full overflow-hidden shadow-inner">
                                        {fraksiList.map(f => (
                                            <div
                                                key={f.slug}
                                                className="relative group cursor-pointer transition-all duration-300 hover:opacity-80"
                                                style={{
                                                    width: `${(f.kursi / totalKursi) * 100}%`,
                                                    backgroundColor: f.color,
                                                }}
                                                title={`${f.shortName}: ${f.kursi} kursi`}
                                            >
                                                {/* Tooltip */}
                                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-10">
                                                    {f.shortName}: {f.kursi} kursi
                                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {fraksiList.map(f => (
                                            <div key={f.slug} className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: f.color }}></span>
                                                {f.shortName}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Numbered List */}
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
                                    <ol className="space-y-4">
                                        {perolehanKursi.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-4 group">
                                                <span className={`
                                                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0
                                                    ${idx < 3
                                                        ? 'bg-gradient-to-br from-red-500 to-red-700 text-white shadow-md shadow-red-200'
                                                        : 'bg-gray-100 text-gray-500'}
                                                `}>
                                                    {idx + 1}
                                                </span>
                                                <div className="flex-1 flex items-center justify-between border-b border-gray-50 pb-3 group-hover:border-red-100 transition-colors">
                                                    <span className="font-bold text-gray-800 text-sm md:text-[15px]">
                                                        {item.partai}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-sm font-black text-red-600 bg-red-50 px-3 py-1 rounded-full">
                                                        {item.kursi}
                                                        <span className="text-xs font-medium text-red-400">kursi</span>
                                                    </span>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <span className="text-sm font-bold text-gray-700">Total Kursi DPRD</span>
                                        <span className="text-lg font-black text-gray-900 bg-gray-100 px-4 py-1.5 rounded-full">
                                            {totalKursi} <span className="text-sm font-medium text-gray-500">kursi</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Fraksi Cards Grid */}
                                <h2 className="text-xl font-black text-gray-900 mt-14 mb-6 flex items-center gap-2">
                                    <Users size={22} className="text-red-600" />
                                    Daftar Fraksi DPRD
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {fraksiList.map(f => (
                                        <Link
                                            key={f.slug}
                                            to={`/fraksi/${f.slug}`}
                                            className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group"
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm"
                                                    style={{ backgroundColor: f.color }}
                                                >
                                                    <Building2 size={18} className="text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-sm text-gray-900 group-hover:text-red-600 transition-colors leading-tight">
                                                        {f.shortName}
                                                    </h3>
                                                    <span className="text-xs text-gray-400">{f.kursi} kursi</span>
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{f.name}</p>
                                            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-end">
                                                <span className="text-xs font-bold text-red-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Lihat Detail <ChevronRight size={14} />
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            /* ─── Detail Fraksi View ─── */
                            <div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div
                                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                                        style={{ backgroundColor: selectedFraksi.color }}
                                    >
                                        <Award size={28} className="text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                                            {selectedFraksi.name}
                                        </h1>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Periode 2024 – 2029 · {selectedFraksi.kursi} Kursi
                                        </p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                                    <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
                                        <div className="text-3xl font-black text-red-600">{selectedFraksi.kursi}</div>
                                        <div className="text-xs text-gray-500 mt-1 font-medium">Jumlah Kursi</div>
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-xl p-5 text-center">
                                        <div className="text-3xl font-black text-gray-900">
                                            {((selectedFraksi.kursi / totalKursi) * 100).toFixed(1)}%
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 font-medium">Persentase</div>
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-xl p-5 text-center col-span-2 md:col-span-1">
                                        <div className="text-3xl font-black text-gray-900">2024</div>
                                        <div className="text-xs text-gray-500 mt-1 font-medium">Tahun Pemilu</div>
                                    </div>
                                </div>

                                {/* Ketua Fraksi */}
                                <div className="bg-white border border-gray-100 rounded-xl p-6 mb-6">
                                    <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2 text-lg">
                                        <Award size={20} className="text-red-600" />
                                        Pimpinan Fraksi
                                    </h2>
                                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                <Users size={20} className="text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-gray-900">
                                                    {selectedFraksi.ketua === '-' ? 'Belum tersedia' : selectedFraksi.ketua}
                                                </p>
                                                <p className="text-xs text-gray-500">Ketua Fraksi</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Anggota */}
                                <div className="bg-white border border-gray-100 rounded-xl p-6">
                                    <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2 text-lg">
                                        <Users size={20} className="text-red-600" />
                                        Anggota Fraksi
                                    </h2>
                                    {selectedFraksi.anggota.length === 0 ? (
                                        <div className="text-center py-12 text-gray-400">
                                            <Users size={40} className="mx-auto mb-3 text-gray-200" />
                                            <p className="text-sm">Data anggota fraksi belum tersedia.</p>
                                            <p className="text-xs mt-1 text-gray-300">Silakan tambahkan melalui panel admin.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {selectedFraksi.anggota.map((anggota, idx) => (
                                                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                    <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                                                        {idx + 1}
                                                    </span>
                                                    <span className="text-sm font-medium text-gray-800">{anggota}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Back Link */}
                                <div className="mt-10">
                                    <Link
                                        to="/fraksi"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                                    >
                                        ← Kembali ke Perolehan Kursi
                                    </Link>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
};

export default FraksiPage;
