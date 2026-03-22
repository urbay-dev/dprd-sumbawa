import React from 'react';
import { Link } from 'react-router-dom';

const textNews = [
    { id: 1, title: "Suka Cita Idulfitri dan Kenikmatan Makan Opor Ayam", date: "15 Apr 2026", color: "#eab308" },
    { id: 2, title: "Tidur Lebih Nyaman Tanpa Gangguan Nyamuk", date: "14 Apr 2026", color: "#dc2626" },
    { id: 3, title: "Gelaran Salat Idulfitri 1445 H di Berbagai Wilayah", date: "10 Apr 2026", color: "#2563eb" },
    { id: 4, title: "Kesiapan Arus Balik Lebaran 2026 Memasuki Tahap Akhir", date: "16 Apr 2026", color: "#16a34a" },
    { id: 5, title: "PKS Gelar Acara Silaturahmi Lintas Tokoh Daerah", date: "17 Apr 2026", color: "#eab308" },
];

const mainNews = {
    title: "Salat Idulfitri di Lapangan, Semangat Inklusivitas Warga",
    excerpt: "DPRD Kabupaten Sumbawa Barat menggelar perayaan yang dihadiri banyak tokoh masyarakat dan warga setempat...",
    category: "BERITA",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&q=80"
};

const smallNews = [
    { id: 1, title: "Sekda: Kita Ingin Pasca Penertiban", category: "HUMAS DPRD", image: "https://images.unsplash.com/photo-1591522810850-58128c5fb3db?w=300&q=80" },
    { id: 2, title: "Pj Gubernur Paparkan Agenda", category: "BERITA", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&q=80" },
    { id: 3, title: "Dewan DPRD Tinjau Proyek", category: "FRAKSI PKS", image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=300&q=80" },
    { id: 4, title: "Ketua DPRD Hadiri Acara Resmi", category: "PIMPINAN", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&q=80" },
    { id: 5, title: "Warga Antusias Sambut Acara", category: "BERITA", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80" },
    { id: 6, title: "Sama-sama Rayakan Hari Jadi", category: "BERITA", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
];

const LatestNews: React.FC = () => {
    return (
        <section className="bg-white py-10 w-full">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Header Berita Terbaru */}
                <div className="mb-6 flex flex-col">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Berita Terbaru</h2>
                    <div className="w-12 h-1 bg-red-600 mt-2"></div>
                </div>

                {/* 4-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* COL 1: Text list (2 span) */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        {textNews.map((news) => (
                            <Link to="/berita" key={news.id} className="group cursor-pointer">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: news.color }}></div>
                                    <div className="flex-1">
                                        <h3 className="text-[13px] font-bold text-gray-800 leading-snug group-hover:text-red-600 transition-colors">
                                            {news.title}
                                        </h3>
                                        <p className="text-[10px] text-gray-400 mt-1 uppercase font-semibold tracking-wider">
                                            {news.date}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* COL 2: Huge featured image (4 span) */}
                    <div className="lg:col-span-4 h-full">
                        <Link to="/berita" className="group block relative w-full h-full min-h-[450px] overflow-hidden rounded-sm cursor-pointer border border-gray-100 shadow-sm">
                            <img
                                src={mainNews.image}
                                alt={mainNews.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Dark gradient mapping the bottom */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 p-5 w-full">
                                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide rounded-sm mb-3 block w-max">
                                    {mainNews.category}
                                </span>
                                <h3 className="text-white text-2xl font-black leading-tight group-hover:underline decoration-white decoration-2 underline-offset-4">
                                    {mainNews.title}
                                </h3>
                                <p className="text-gray-200 text-xs mt-2 line-clamp-2 leading-relaxed font-medium">
                                    {mainNews.excerpt}
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* COL 3: Grid of 6 small images (4 span) */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-4">
                        {smallNews.map((news) => (
                            <Link to="/berita" key={news.id} className="group cursor-pointer flex flex-col border border-gray-100 bg-gray-50/50 pb-2 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                                <div className="relative h-28 overflow-hidden rounded-t-sm">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute bottom-2 left-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                                        {news.category}
                                    </span>
                                </div>
                                <div className="px-3 pt-3 flex-1">
                                    <h4 className="text-[13px] font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-3">
                                        {news.title}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* COL 4: Populer (2 span) */}
                    <div className="lg:col-span-2 flex flex-col">
                        <div className="bg-red-600 text-white text-sm font-bold p-2 text-center uppercase tracking-widest rounded-t-md mb-4 shadow-md">
                            POPULER
                        </div>
                        <div className="flex flex-col gap-4">
                            {textNews.map((news) => (
                                <Link to="/berita" key={`populer-${news.id}`} className="group cursor-pointer border-b border-gray-100 pb-3 last:border-0">
                                    <h3 className="text-xs font-bold text-gray-800 leading-snug group-hover:text-red-600 transition-colors">
                                        {news.title}
                                    </h3>
                                    <p className="text-[10px] text-gray-400 mt-1">
                                        {news.date}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LatestNews;
