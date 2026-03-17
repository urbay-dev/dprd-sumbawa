import React from 'react';
import { Calendar, ArrowRight, Tag, Search } from 'lucide-react';

const allNews = [
    { id: 1, title: "Rapat Paripurna DPRD Sumbawa Barat: Pengesahan Raperda Tentang Pengelolaan Tambang", category: "Berita Dewan", date: "15 Mar 2026", image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=80" },
    { id: 2, title: "Anggota DPRD Kunjungi Daerah Pemilihan untuk Serap Aspirasi Warga", category: "Wakil Kita", date: "14 Mar 2026", image: "https://images.unsplash.com/photo-1591522810850-58128c5fb3db?w=600&q=80" },
    { id: 3, title: "Komisi II DPRD Bahas Rencana Pembangunan Infrastruktur Jalan", category: "Berita Dewan", date: "13 Mar 2026", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80" },
    { id: 4, title: "Fraksi PKB Sampaikan Pandangan Umum atas Raperda RTRW Tahun 2026", category: "Fraksi", date: "12 Mar 2026", image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=600&q=80" },
    { id: 5, title: "Bapemperda DPRD Finalisasi Rancangan Peraturan Daerah tentang UMKM", category: "Berita Dewan", date: "11 Mar 2026", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80" },
    { id: 6, title: "Dialog Publik tentang Peningkatan PAD Kabupaten Sumbawa Barat", category: "Berita Dewan", date: "10 Mar 2026", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" },
    { id: 7, title: "Ketua DPRD Hadiri Rakernas DPRD se-Indonesia di Jakarta", category: "Berita Dewan", date: "9 Mar 2026", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80" },
    { id: 8, title: "Wakil Ketua I DPRD Bertemu Warga di Kecamatan Brang Ene", category: "Wakil Kita", date: "8 Mar 2026", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" },
    { id: 9, title: "DPRD Sumbawa Barat Gelar Sosialisasi Perda tentang Larangan Merokok", category: "Berita Dewan", date: "7 Mar 2026", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80" },
];

const categories = ["Semua", "Berita Dewan", "Wakil Kita", "Fraksi", "AKD", "Sekretariat"];

const categoryColors: Record<string, string> = {
    "Berita Dewan": "bg-primary",
    "Wakil Kita": "bg-accent",
    "Fraksi": "bg-teal-600",
    "AKD": "bg-indigo-600",
    "Sekretariat": "bg-orange-500",
};

const BeritaPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = React.useState("Semua");
    const [search, setSearch] = React.useState("");

    const filtered = allNews.filter((n) => {
        const matchCat = activeCategory === "Semua" || n.category === activeCategory;
        const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                <a href="/" className="hover:text-primary">Beranda</a> <span>/</span>
                <span className="text-gray-700 font-medium">Berita</span>
            </div>

            <h1 className="text-2xl font-black text-primary mb-6 border-l-4 border-accent pl-3">Berita DPRD Sumbawa Barat</h1>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-300 hover:border-primary'}`}
                        >
                            <Tag size={11} className="inline mr-1" />{cat}
                        </button>
                    ))}
                </div>
                <div className="relative ml-auto">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Cari berita..."
                        className="border border-gray-300 rounded pl-8 pr-4 py-2 text-sm w-60 focus:outline-none focus:border-primary"
                    />
                </div>
            </div>

            {/* News grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtered.map((news) => (
                    <div key={news.id} className="news-card group cursor-pointer">
                        <div className="overflow-hidden h-44">
                            <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4">
                            <span className={`${categoryColors[news.category] ?? 'bg-gray-500'} text-white text-xs font-bold uppercase px-2 py-0.5 rounded`}>
                                {news.category}
                            </span>
                            <h3 className="text-sm font-bold text-gray-800 mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                {news.title}
                            </h3>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-400 text-xs flex items-center gap-1">
                                    <Calendar size={11} /> {news.date}
                                </span>
                                <span className="text-primary text-xs font-medium flex items-center gap-1 hover:underline">
                                    Baca <ArrowRight size={11} />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-lg font-medium">Tidak ada berita ditemukan</p>
                    <p className="text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
                </div>
            )}
        </main>
    );
};

export default BeritaPage;
