import React from 'react';
import { Youtube, Play } from 'lucide-react';

// "Fokus" section – single large featured YouTube video like on reference
const FOKUS_VIDEO_ID = 'jNQXAC9IVRw';
const FOKUS_TITLE = 'RECAP BAPEMPERDA MARET 2026 – DPRD Kabupaten Sumbawa Barat';
const FOKUS_DESC = 'Rekap kegiatan Badan Pembentukan Peraturan Daerah (Bapemperda) DPRD Kabupaten Sumbawa Barat bulan Maret 2026, mencakup pembahasan Ranperda prioritas dan progress legislasi daerah.';

const FokusSection: React.FC = () => {
    const [playing, setPlaying] = React.useState(false);

    return (
        <section className="py-6" style={{ backgroundColor: '#1a1a2e' }}>
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-yellow-500 text-[#0a2744] text-sm font-black px-5 py-1.5 uppercase tracking-widest">
                        FOKUS
                    </div>
                    <div className="h-0.5 flex-1 bg-yellow-500/30" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Main big video */}
                    <div className="lg:col-span-2">
                        <div className="relative rounded overflow-hidden shadow-2xl" style={{ aspectRatio: '16/9' }}>
                            {playing ? (
                                <iframe
                                    src={`https://www.youtube.com/embed/${FOKUS_VIDEO_ID}?autoplay=1`}
                                    title={FOKUS_TITLE}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="w-full h-full absolute inset-0"
                                />
                            ) : (
                                <>
                                    <img
                                        src={`https://img.youtube.com/vi/${FOKUS_VIDEO_ID}/hqdefault.jpg`}
                                        alt={FOKUS_TITLE}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src =
                                                'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80';
                                        }}
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    {/* Big play button */}
                                    <button
                                        onClick={() => setPlaying(true)}
                                        className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                                    >
                                        <div className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center shadow-2xl transition-all hover:scale-110">
                                            <Play size={32} className="text-white fill-white ml-2" />
                                        </div>
                                        <span className="text-white/80 text-sm font-medium">Klik untuk Putar Video</span>
                                    </button>
                                    {/* Title overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Youtube size={16} className="text-red-500" />
                                            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wide">YouTube • DPRD Sumbawa Barat</span>
                                        </div>
                                        <h2 className="text-white font-black text-xl leading-tight drop-shadow-lg">{FOKUS_TITLE}</h2>
                                    </div>
                                </>
                            )}
                        </div>
                        {!playing && (
                            <p className="text-gray-400 text-sm mt-3 leading-relaxed">{FOKUS_DESC}</p>
                        )}
                    </div>

                    {/* Related videos sidebar */}
                    <div className="lg:col-span-1">
                        <h3 className="text-yellow-400 text-sm font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
                            <Youtube size={13} className="text-red-500" /> Video Terkait
                        </h3>
                        <div className="space-y-3">
                            {[
                                { id: 'dQw4w9WgXcQ', title: 'Rapat Paripurna: Penyampaian LKPD Tahun 2025', date: '10 Mar 2026' },
                                { id: 'BHACKCNDMW8', title: 'Sosialisasi Perda No. 2 Tahun 2025 tentang Ketenagakerjaan', date: '8 Mar 2026' },
                                { id: '9bZkp7q19f0', title: 'Live: Rapat Komisi II tentang Ketahanan Pangan', date: '5 Mar 2026' },
                                { id: 'QH2-TGUlwu4', title: 'Podkes: Wakil Ketua II DPRD Bicara Infrastruktur', date: '3 Mar 2026' },
                            ].map((v) => (
                                <a
                                    key={v.id}
                                    href={`https://www.youtube.com/watch?v=${v.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex gap-3 group"
                                >
                                    <div className="relative w-28 h-16 flex-shrink-0 rounded overflow-hidden">
                                        <img
                                            src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`}
                                            alt={v.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src =
                                                    'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=200&q=60';
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <Play size={14} className="text-white fill-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-300 text-xs font-medium leading-tight line-clamp-2 group-hover:text-white transition-colors">
                                            {v.title}
                                        </p>
                                        <span className="text-gray-500 text-xs mt-1 block">{v.date}</span>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* YouTube subscribe button */}
                        <a
                            href="https://www.youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded text-sm font-bold transition-colors"
                        >
                            <Youtube size={16} /> Subscribe Channel Kami
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FokusSection;
