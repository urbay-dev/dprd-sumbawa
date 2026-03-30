import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, FileText, Scale, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

// ─── Types ───
type StatusPerda = 'Selesai Pembahasan' | 'Proses Pembahasan' | 'Belum Pembahasan';

interface RancanganPerda {
    judul: string;
    status: StatusPerda;
    keterangan?: string;
}

interface PropemperdaData {
    tahun: string;
    raperda: RancanganPerda[];
}

// ─── Status Badge Component ───
const StatusBadge: React.FC<{ status: StatusPerda }> = ({ status }) => {
    const config: Record<StatusPerda, { bg: string; text: string; icon: React.ReactNode }> = {
        'Selesai Pembahasan': {
            bg: 'bg-emerald-50 border-emerald-200',
            text: 'text-emerald-700',
            icon: <CheckCircle2 size={13} className="text-emerald-500" />,
        },
        'Proses Pembahasan': {
            bg: 'bg-amber-50 border-amber-200',
            text: 'text-amber-700',
            icon: <Clock size={13} className="text-amber-500" />,
        },
        'Belum Pembahasan': {
            bg: 'bg-gray-50 border-gray-200',
            text: 'text-gray-500',
            icon: <AlertCircle size={13} className="text-gray-400" />,
        },
    };

    const c = config[status];

    return (
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${c.bg} ${c.text}`}>
            {c.icon}
            {status}
        </span>
    );
};

// ─── Data Propemperda ───
const propemperdaMap: Record<string, PropemperdaData> = {
    '2026': {
        tahun: '2026',
        raperda: [
            { judul: 'Raperda tentang Anggaran Pendapatan dan Belanja Daerah Tahun Anggaran 2026', status: 'Proses Pembahasan' },
            { judul: 'Raperda tentang Pertanggungjawaban Pelaksanaan APBD Tahun Anggaran 2025', status: 'Proses Pembahasan' },
            { judul: 'Raperda tentang Perubahan APBD Tahun Anggaran 2026', status: 'Belum Pembahasan' },
            { judul: 'Raperda tentang Rencana Pembangunan Jangka Panjang Daerah (RPJPD) Kabupaten Sumbawa Barat', status: 'Proses Pembahasan' },
            { judul: 'Raperda tentang Pajak Daerah dan Retribusi Daerah', status: 'Belum Pembahasan' },
            { judul: 'Raperda tentang Penyelenggaraan Bantuan Hukum', status: 'Belum Pembahasan' },
            { judul: 'Raperda tentang Pengelolaan Barang Milik Daerah', status: 'Proses Pembahasan' },
        ],
    },
    '2025': {
        tahun: '2025',
        raperda: [
            { judul: 'Raperda tentang Anggaran Pendapatan dan Belanja Daerah Tahun Anggaran 2025', status: 'Selesai Pembahasan' },
            { judul: 'Raperda tentang Pertanggungjawaban Pelaksanaan APBD Tahun Anggaran 2024', status: 'Selesai Pembahasan' },
            { judul: 'Raperda tentang Perubahan APBD Tahun Anggaran 2025', status: 'Selesai Pembahasan' },
            { judul: 'Raperda tentang Rencana Pembangunan Jangka Menengah Daerah (RPJMD) Kabupaten Sumbawa Barat 2024-2029', status: 'Selesai Pembahasan' },
            { judul: 'Raperda tentang Pengelolaan Keuangan Daerah', status: 'Proses Pembahasan' },
            { judul: 'Raperda tentang Perlindungan dan Pengelolaan Lingkungan Hidup', status: 'Proses Pembahasan' },
            { judul: 'Raperda tentang Penyelenggaraan Pendidikan', status: 'Proses Pembahasan' },
            { judul: 'Raperda tentang Penyelenggaraan Kesehatan', status: 'Belum Pembahasan' },
            { judul: 'Raperda tentang Penanggulangan Bencana Daerah', status: 'Belum Pembahasan' },
        ],
    },
    '2024': {
        tahun: '2024',
        raperda: [
            { judul: 'Raperda tentang Anggaran Pendapatan dan Belanja Daerah Tahun Anggaran 2024', status: 'Selesai Pembahasan' },
            { judul: 'Raperda tentang Pertanggungjawaban Pelaksanaan APBD Tahun Anggaran 2023', status: 'Selesai Pembahasan' },
            { judul: 'Raperda tentang Perubahan APBD Tahun Anggaran 2024', status: 'Selesai Pembahasan' },
            { judul: 'Raperda tentang Pengelolaan Air Limbah Domestik', status: 'Selesai Pembahasan' },
            { judul: 'Raperda tentang Penyelenggaraan Sistem Pangan', status: 'Selesai Pembahasan' },
            { judul: 'Raperda tentang Kawasan Tanpa Rokok', status: 'Proses Pembahasan' },
            { judul: 'Raperda tentang Rencana Tata Ruang Wilayah', status: 'Proses Pembahasan' },
            { judul: 'Raperda tentang Penyelenggaraan Transportasi', status: 'Proses Pembahasan' },
        ],
    },
};

// Sidebar link list for all years + extra nav options
const sidebarYears = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];

const SilegdaPage: React.FC = () => {
    const { slug } = useParams<{ slug?: string }>();
    const selectedYear = slug || '2026';
    const data = propemperdaMap[selectedYear];

    // Count stats
    const totalRaperda = data?.raperda.length || 0;
    const selesai = data?.raperda.filter(r => r.status === 'Selesai Pembahasan').length || 0;
    const proses = data?.raperda.filter(r => r.status === 'Proses Pembahasan').length || 0;
    const belum = data?.raperda.filter(r => r.status === 'Belum Pembahasan').length || 0;

    return (
        <main className="min-h-screen bg-[#fcfcfc] py-12 md:py-20">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-400 mb-8 flex items-center gap-2">
                    <Link to="/" className="hover:text-red-600 transition-colors">Beranda</Link>
                    <span>/</span>
                    <Link to="/silegda" className={`transition-colors ${!slug ? 'text-gray-700 font-medium' : 'hover:text-red-600'}`}>
                        Silegda
                    </Link>
                    {slug && (
                        <>
                            <span>/</span>
                            <span className="text-gray-700 font-medium">Propemperda {selectedYear}</span>
                        </>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* ── Left Sidebar ── */}
                    <aside className="w-full lg:w-[300px] flex-shrink-0 lg:sticky lg:top-28">
                        {/* Decorative Image */}
                        <div className="relative mb-8 w-full aspect-[4/3] max-w-[280px] mx-auto lg:mx-0 group cursor-pointer hidden lg:block">
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

                        {/* Year Links */}
                        <nav className="flex flex-col">
                            {sidebarYears.map(year => {
                                const isActive = selectedYear === year;
                                const hasData = !!propemperdaMap[year];
                                return (
                                    <Link
                                        key={year}
                                        to={`/silegda/${year}`}
                                        className={`
                                            flex items-center justify-between py-3 px-3 text-[14px] font-bold border-b border-gray-50
                                            transition-all duration-200 group rounded-md
                                            ${isActive
                                                ? 'text-red-600 bg-red-50 border-l-4 border-l-red-500'
                                                : 'text-gray-700 hover:text-red-600 hover:bg-gray-50 border-l-4 border-l-transparent'
                                            }
                                        `}
                                    >
                                        <span>Propemperda Tahun {year}</span>
                                        {hasData && (
                                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isActive ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'}`}>
                                                {propemperdaMap[year].raperda.length}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}

                            {/* Extra sidebar link */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <Link
                                    to="/silegda"
                                    className="flex items-center gap-2 py-3 px-3 text-[14px] font-bold text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-all rounded-md"
                                >
                                    <FileText size={16} />
                                    Penyusunan Raperda Diluar Propemperda
                                </Link>
                            </div>
                        </nav>
                    </aside>

                    {/* ── Right Main Content ── */}
                    <section className="flex-1 w-full min-w-0">
                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tight">
                            Propemperda Tahun {selectedYear}
                        </h1>
                        <p className="text-gray-500 text-sm mb-8">
                            Program Pembentukan Peraturan Daerah Kabupaten Sumbawa Barat Tahun {selectedYear}
                        </p>

                        {data ? (
                            <>
                                {/* Stats Bar */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                                    <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                                        <div className="text-2xl font-black text-gray-900">{totalRaperda}</div>
                                        <div className="text-xs text-gray-500 mt-1 font-medium">Total Raperda</div>
                                    </div>
                                    <div className="bg-white border border-emerald-100 rounded-xl p-4 text-center">
                                        <div className="text-2xl font-black text-emerald-600">{selesai}</div>
                                        <div className="text-xs text-gray-500 mt-1 font-medium">Selesai</div>
                                    </div>
                                    <div className="bg-white border border-amber-100 rounded-xl p-4 text-center">
                                        <div className="text-2xl font-black text-amber-600">{proses}</div>
                                        <div className="text-xs text-gray-500 mt-1 font-medium">Proses</div>
                                    </div>
                                    <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
                                        <div className="text-2xl font-black text-gray-400">{belum}</div>
                                        <div className="text-xs text-gray-500 mt-1 font-medium">Belum</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-10">
                                    <div className="flex h-2.5 rounded-full overflow-hidden bg-gray-100">
                                        {selesai > 0 && (
                                            <div
                                                className="bg-emerald-500 transition-all duration-700"
                                                style={{ width: `${(selesai / totalRaperda) * 100}%` }}
                                            />
                                        )}
                                        {proses > 0 && (
                                            <div
                                                className="bg-amber-400 transition-all duration-700"
                                                style={{ width: `${(proses / totalRaperda) * 100}%` }}
                                            />
                                        )}
                                        {belum > 0 && (
                                            <div
                                                className="bg-gray-300 transition-all duration-700"
                                                style={{ width: `${(belum / totalRaperda) * 100}%` }}
                                            />
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-3">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                                            Selesai ({selesai})
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                                            Proses ({proses})
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                            <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block"></span>
                                            Belum ({belum})
                                        </div>
                                    </div>
                                </div>

                                {/* Raperda Table */}
                                <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                                    {/* Table Header */}
                                    <div className="hidden md:grid grid-cols-[60px_1fr_200px] bg-gray-900 text-white text-xs font-bold uppercase tracking-wider">
                                        <div className="px-4 py-4 text-center">No</div>
                                        <div className="px-4 py-4">Rancangan Peraturan Daerah</div>
                                        <div className="px-4 py-4 text-center">Status</div>
                                    </div>

                                    {/* Table Body */}
                                    {data.raperda.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className={`
                                                md:grid md:grid-cols-[60px_1fr_200px] items-center border-b border-gray-50
                                                hover:bg-gray-50/80 transition-colors group
                                                ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}
                                            `}
                                        >
                                            {/* Number */}
                                            <div className="px-4 py-4 flex md:justify-center items-start md:items-center">
                                                <span className={`
                                                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0
                                                    ${item.status === 'Selesai Pembahasan'
                                                        ? 'bg-emerald-500 text-white'
                                                        : item.status === 'Proses Pembahasan'
                                                            ? 'bg-amber-400 text-white'
                                                            : 'bg-gray-200 text-gray-500'
                                                    }
                                                `}>
                                                    {idx + 1}
                                                </span>
                                                {/* Mobile: show title next to number */}
                                                <div className="md:hidden ml-3 flex-1">
                                                    <p className="text-sm font-semibold text-gray-800 leading-relaxed">{item.judul}</p>
                                                    <div className="mt-2">
                                                        <StatusBadge status={item.status} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Title - Desktop */}
                                            <div className="hidden md:block px-4 py-4">
                                                <p className="text-sm font-semibold text-gray-800 leading-relaxed group-hover:text-gray-900 transition-colors">
                                                    {item.judul}
                                                </p>
                                            </div>

                                            {/* Status - Desktop */}
                                            <div className="hidden md:flex px-4 py-4 justify-center">
                                                <StatusBadge status={item.status} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Summary Footer */}
                                <div className="mt-6 bg-gray-50 border border-gray-100 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Scale size={18} className="text-red-600" />
                                        <span className="font-bold">Total {totalRaperda} Rancangan Peraturan Daerah</span>
                                    </div>
                                    <div className="text-xs text-gray-400 font-medium">
                                        Sumber: Bapemperda DPRD Kab. Sumbawa Barat
                                    </div>
                                </div>
                            </>
                        ) : (
                            /* ─── No Data ─── */
                            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <FileText size={36} className="text-gray-300" />
                                </div>
                                <h2 className="font-black text-gray-900 text-lg mb-2">Data Belum Tersedia</h2>
                                <p className="text-gray-500 text-sm mb-6">
                                    Data Propemperda Tahun {selectedYear} belum tersedia dalam sistem.
                                </p>
                                <Link
                                    to="/silegda/2026"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors"
                                >
                                    Lihat Propemperda Terbaru <ChevronRight size={16} />
                                </Link>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    );
};

export default SilegdaPage;
