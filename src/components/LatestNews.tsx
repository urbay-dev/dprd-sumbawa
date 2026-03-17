import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Eye, Clock, ArrowRight, ChevronRight } from 'lucide-react';

const mainNews = {
    id: 1,
    title: "Rapat Paripurna DPRD Sumbawa Barat: Pengesahan Raperda Tentang Pengelolaan Tambang Berbasis Masyarakat",
    excerpt: "DPRD Kabupaten Sumbawa Barat menggelar Rapat Paripurna untuk mengesahkan Raperda penting yang mengatur pengelolaan tambang berbasis masyarakat. Raperda ini diharapkan dapat meningkatkan kesejahteraan masyarakat sekitar lokasi tambang dan memberikan manfaat maksimal bagi daerah.",
    category: "Berita Dewan",
    date: "15 Maret 2026",
    views: 1240,
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80",
};

const leftNews = [
    { id: 2, title: "Anggota DPRD Kunjungi Daerah Pemilihan untuk Serap Aspirasi Warga", category: "Wakil Kita", date: "14 Mar 2026", image: "https://images.unsplash.com/photo-1591522810850-58128c5fb3db?w=200&q=80" },
    { id: 3, title: "Komisi II Bahas Rencana Pembangunan Infrastruktur Jalan di Kabupaten Sumbawa Barat", category: "Berita Dewan", date: "13 Mar 2026", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=200&q=80" },
    { id: 4, title: "Fraksi PKB Sampaikan Pandangan Umum atas Raperda RTRW Tahun 2026", category: "Fraksi", date: "12 Mar 2026", image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=200&q=80" },
    { id: 5, title: "Bapemperda DPRD Finalisasi Rancangan Perda tentang UMKM Lokal", category: "Berita Dewan", date: "11 Mar 2026", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&q=80" },
    { id: 6, title: "Dialog Publik tentang Peningkatan PAD Kabupaten Sumbawa Barat", category: "Berita Dewan", date: "10 Mar 2026", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80" },
];

const rightNews = [
    { id: 7, title: "Ketua DPRD Hadiri Rakernas DPRD se-Indonesia di Jakarta", category: "Berita Dewan", date: "9 Mar 2026", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
    { id: 8, title: "Wakil Ketua I DPRD Bertemu Warga di Kecamatan Brang Ene Bahas Aspirasi", category: "Wakil Kita", date: "8 Mar 2026", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
    { id: 9, title: "DPRD Sumbawa Barat Gelar Sosialisasi Perda Larangan Merokok", category: "Berita Dewan", date: "7 Mar 2026", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80" },
];

const catColor: Record<string, string> = {
    "Berita Dewan": "#c0392b",
    "Wakil Kita": "#1a6bb5",
    "Fraksi": "#27ae60",
    "AKD": "#8e44ad",
};

const LatestNews: React.FC = () => {
    return (
        <section style={{ backgroundColor: '#f4f6f9' }} className="py-6">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-0">
                        <div className="bg-[#c0392b] text-white text-sm font-bold px-4 py-1.5 uppercase tracking-wide">
                            Berita Terbaru
                        </div>
                        <div className="h-8 w-0.5 bg-[#c0392b] mx-0" />
                    </div>
                    <Link to="/berita" className="text-[#1a6bb5] text-sm hover:underline flex items-center gap-1 font-medium">
                        Lihat Semua <ArrowRight size={13} />
                    </Link>
                </div>

                {/* 3-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                    {/* LEFT column – news list */}
                    <div className="lg:col-span-3 space-y-0 bg-white border border-gray-200">
                        {leftNews.map((news, i) => (
                            <div key={news.id} className={`flex gap-3 p-3 group cursor-pointer hover:bg-blue-50 transition-colors ${i < leftNews.length - 1 ? 'border-b border-gray-100' : ''}`}>
                                <div className="w-20 h-16 flex-shrink-0 overflow-hidden">
                                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span
                                        className="text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm inline-block mb-1"
                                        style={{ backgroundColor: catColor[news.category] ?? '#555' }}
                                    >
                                        {news.category}
                                    </span>
                                    <p className="text-gray-800 text-xs font-semibold leading-tight line-clamp-2 group-hover:text-[#0a2744] transition-colors">
                                        {news.title}
                                    </p>
                                    <span className="text-gray-400 text-[10px] flex items-center gap-1 mt-1">
                                        <Clock size={9} /> {news.date}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CENTER column – main feature */}
                    <div className="lg:col-span-6">
                        <div className="news-card group cursor-pointer h-full flex flex-col">
                            <div className="overflow-hidden h-72 relative">
                                <img
                                    src={mainNews.image}
                                    alt={mainNews.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <span
                                    className="absolute top-3 left-3 text-white text-xs font-bold uppercase px-2 py-1 rounded"
                                    style={{ backgroundColor: catColor[mainNews.category] ?? '#555' }}
                                >
                                    {mainNews.category}
                                </span>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h2 className="text-base font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#0a2744] transition-colors line-clamp-2">
                                    {mainNews.title}
                                </h2>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{mainNews.excerpt}</p>
                                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                                    <span className="text-gray-400 text-xs flex items-center gap-1"><Calendar size={11} /> {mainNews.date}</span>
                                    <span className="text-gray-400 text-xs flex items-center gap-1"><Eye size={11} /> {mainNews.views.toLocaleString()} dilihat</span>
                                    <span className="ml-auto text-[#1a6bb5] text-xs font-semibold flex items-center gap-1 hover:underline cursor-pointer">
                                        Baca Selengkapnya <ChevronRight size={12} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT column – stacked cards */}
                    <div className="lg:col-span-3 space-y-3">
                        {rightNews.map((news) => (
                            <div key={news.id} className="news-card group cursor-pointer flex flex-col">
                                <div className="overflow-hidden h-28">
                                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-2.5">
                                    <span
                                        className="text-white text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-sm inline-block mb-1"
                                        style={{ backgroundColor: catColor[news.category] ?? '#555' }}
                                    >
                                        {news.category}
                                    </span>
                                    <p className="text-gray-800 text-xs font-semibold leading-tight line-clamp-2 group-hover:text-[#0a2744] transition-colors">
                                        {news.title}
                                    </p>
                                    <span className="text-gray-400 text-[10px] flex items-center gap-1 mt-1">
                                        <Clock size={9} /> {news.date}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestNews;
