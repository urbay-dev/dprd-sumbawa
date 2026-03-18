import React from 'react';
import { Link } from 'react-router-dom';

const allNews = [
    {
        id: 1,
        title: "DPRD Dukung Pemerataan Bantuan untuk Pemuka Agama dan Tempat Ibadah",
        date: "March 17, 2026",
        excerpt: "Ketua DPRD mengapresiasi komitmen pemerintah provinsi mendukung pemuka agama dan tempat ibadah di daerah ini. Beliau menyampaikan hal...",
        image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=80"
    },
    {
        id: 2,
        title: "Pemda Gelar Buka Puasa Bersama, Pimpinan Dewan: Berkumpul Simpul Masyarakat",
        date: "March 17, 2026",
        excerpt: "Ketua DPRD menghadiri kegiatan buka puasa bersama alim ulama, kyai, habaib, ustaz, dan ustazah di aula utama...",
        image: "https://images.unsplash.com/photo-1591522810850-58128c5fb3db?w=600&q=80"
    },
    {
        id: 3,
        title: "Armada Mudik Harus Prima, Wakil Ketua: Ini Langkah Preventif",
        date: "March 17, 2026",
        excerpt: "Wakil Ketua DPRD menekankan pentingnya memastikan seluruh armada mudik gratis dalam kondisi prima guna menjamin keselamatan...",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80"
    },
    {
        id: 4,
        title: "DPRD Apresiasi Mudik Gratis 2026",
        date: "March 17, 2026",
        excerpt: "Wakil Ketua DPRD menghadiri pelepasan belasan ribu peserta Program Mudik Gratis 2026 oleh Pemerintah Daerah...",
        image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=600&q=80"
    },
    {
        id: 5,
        title: "Pastikan Kondisi Prima Kendaraan Mudik",
        date: "March 16, 2026",
        excerpt: "Ketua DPRD meminta Dinas Perhubungan (Dishub) memastikan seluruh kendaraan angkutan mudik Lebaran dalam kondisi prima dan layak...",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
    },
    {
        id: 6,
        title: "Optimalisasikan CSR BUMD untuk Program Bedah Rumah",
        date: "March 15, 2026",
        excerpt: "DPRD mendukung keberlanjutan Program Bedah Rumah bagi warga melalui kolaborasi berbagai pihak, tidak hanya dengan Baznas...",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
    },
    {
        id: 7,
        title: "Program Bedah Rumah Tanamkan Nilai Kebersamaan",
        date: "March 15, 2026",
        excerpt: "Bupati menyerahkan kunci hunian secara simbolis kepada warga penerima Program Bedah Rumah. Turut mendampingi, Wakil Ketua DPRD...",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80"
    },
    {
        id: 8,
        title: "UMKM Berpotensi Tampilkan Identitas Budaya di Taman Kota",
        date: "March 14, 2026",
        excerpt: "Keberadaan pelaku usaha mikro kecil dan menengah (UMKM) di kawasan Taman Kota dapat memperkuat aktivitas ekonomi. Termasuk menghadirkan identitas...",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
    },
];

const BeritaPage: React.FC = () => {
    return (
        <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-16">
            <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

                {/* Left Sidebar */}
                <aside className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0">
                    {/* Decorative Image container */}
                    <div className="relative mb-14 w-full max-w-[320px] mx-auto lg:mx-0 p-4">
                        {/* Red background abstract shape */}
                        <div className="absolute inset-0 bg-[#e86666] rounded-[24px] transform -rotate-2 scale-100 opacity-90 z-0" style={{ borderRadius: '30px 10px 40px 15px' }}></div>
                        <div className="absolute inset-2 bg-[#d14b4f] rounded-[20px] transform rotate-3 scale-105 opacity-80 z-0"></div>

                        <img
                            src="/nano_banana.png"
                            alt="Sidebar Dekorasi"
                            className="relative w-full aspect-[4/3] object-cover rounded-lg shadow-sm z-10 border-2 border-white/50"
                        />
                    </div>

                    {/* Latest News Widget */}
                    <div>
                        <h3 className="font-bold text-[16px] text-black border-b border-gray-100 pb-3 mb-4">
                            Update Berita Terakhir
                        </h3>
                        <div className="flex flex-col">
                            {allNews.slice(0, 5).map((news) => (
                                <Link to={`/berita/${news.id}`} key={news.id} className="py-3.5 border-b border-gray-100 last:border-0 group">
                                    <h4 className="text-[13px] leading-relaxed text-gray-500 group-hover:text-red-600 transition-colors">
                                        {news.title}
                                    </h4>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Right Content */}
                <section className="flex-1">
                    <h1 className="text-3xl lg:text-[34px] font-serif font-extrabold text-[#222] mb-10 tracking-tight">
                        Arsip Berita
                    </h1>

                    <div className="flex flex-col gap-8">
                        {allNews.map((news) => (
                            <div key={news.id} className="flex flex-col sm:flex-row gap-5 items-start">
                                {/* Article Image */}
                                <div className="w-full sm:w-[120px] flex-shrink-0">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-[180px] sm:h-[90px] object-cover rounded shadow-sm hover:opacity-90 transition-opacity"
                                        style={{ aspectRatio: '4/3' }}
                                    />
                                </div>

                                {/* Article Info */}
                                <div className="flex-1">
                                    <h2 className="text-[15px] sm:text-[16px] font-bold text-black leading-snug mb-1.5 hover:text-red-600 cursor-pointer">
                                        {news.title}
                                    </h2>
                                    <p className="text-[11px] text-gray-400 mb-2 uppercase tracking-wide font-medium">
                                        {news.date}
                                    </p>
                                    <p className="text-[13px] text-gray-600 leading-relaxed font-normal">
                                        {news.excerpt}
                                        <Link to={`/berita/${news.id}`} className="text-[#db2c2c] hover:text-red-700 ml-1.5 font-medium transition-colors">
                                            Baca Berita
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-14 mb-8 flex items-center justify-start text-[13px] text-gray-700 font-medium">
                        <span className="cursor-pointer hover:text-red-600 mr-3">1</span>
                        <span className="cursor-pointer hover:text-red-600 mr-3">2</span>
                        <span className="cursor-pointer hover:text-red-600 mr-3">3</span>
                        <span className="mr-3 text-gray-500 tracking-widest">...</span>
                        <span className="cursor-pointer hover:text-red-600 mr-5">827</span>
                        <span className="cursor-pointer text-gray-800 hover:text-red-600">Next &gt;</span>
                    </div>
                </section>

            </div>
        </main>
    );
};

export default BeritaPage;
