import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBerita } from '../services/api';
import type { Berita } from '../services/api';

const BeritaPage: React.FC = () => {
    const [beritaList, setBeritaList] = useState<Berita[]>([]);
    const [total, setTotal] = useState(0);
    const [latestNews, setLatestNews] = useState<Berita[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const limit = 8;

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetchBerita({ limit, page, isPublished: true }),
            fetchBerita({ limit: 5, page: 1, isPublished: true }),
        ]).then(([mainRes, latestRes]) => {
            setBeritaList(mainRes.data);
            setTotal(mainRes.total);
            setLatestNews(latestRes.data);
        }).finally(() => setLoading(false));
    }, [page]);

    const totalPages = Math.ceil(total / limit);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    return (
        <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-16">
            <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">

                {/* Left Sidebar */}
                <aside className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0">
                    {/* Decorative Image container */}
                    <div className="relative mb-14 w-full max-w-[320px] mx-auto lg:mx-0 p-4">
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
                            {loading
                                ? Array(5).fill(0).map((_, i) => (
                                    <div key={i} className="py-3.5 border-b border-gray-100">
                                        <div className="h-3 bg-gray-100 animate-pulse rounded w-full mb-1" />
                                        <div className="h-3 bg-gray-100 animate-pulse rounded w-3/4" />
                                    </div>
                                ))
                                : latestNews.map((news) => (
                                    <Link to={`/berita/${news.slug}`} key={news.id} className="py-3.5 border-b border-gray-100 last:border-0 group">
                                        <h4 className="text-[13px] leading-relaxed text-gray-500 group-hover:text-red-600 transition-colors">
                                            {news.title}
                                        </h4>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </aside>

                {/* Right Content */}
                <section className="flex-1">
                    <h1 className="text-3xl lg:text-[34px] font-serif font-extrabold text-[#222] mb-10 tracking-tight">
                        Arsip Berita
                    </h1>

                    {loading ? (
                        <div className="flex flex-col gap-8">
                            {Array(4).fill(0).map((_, i) => (
                                <div key={i} className="flex flex-col sm:flex-row gap-5 items-start">
                                    <div className="w-full sm:w-[120px] h-[90px] bg-gray-100 animate-pulse rounded flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-gray-100 animate-pulse rounded w-3/4" />
                                        <div className="h-3 bg-gray-100 animate-pulse rounded w-1/4" />
                                        <div className="h-3 bg-gray-100 animate-pulse rounded w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : beritaList.length === 0 ? (
                        <div className="text-center py-16 text-gray-400">
                            <p className="text-lg font-medium">Belum ada berita.</p>
                            <p className="text-sm mt-1">Silakan tambahkan berita melalui panel admin.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8">
                            {beritaList.map((news) => (
                                <div key={news.id} className="flex flex-col sm:flex-row gap-5 items-start">
                                    {/* Article Image */}
                                    <div className="w-full sm:w-[120px] flex-shrink-0">
                                        <img
                                            src={news.imageUrl || 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=80'}
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
                                            {formatDate(news.publishedAt)}
                                        </p>
                                        <p className="text-[13px] text-gray-600 leading-relaxed font-normal">
                                            {news.excerpt}
                                            <Link to={`/berita/${news.slug}`} className="text-[#db2c2c] hover:text-red-700 ml-1.5 font-medium transition-colors">
                                                Baca Berita
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-14 mb-8 flex items-center justify-start text-[13px] text-gray-700 font-medium gap-1 flex-wrap">
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setPage(p)}
                                    className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${p === page ? 'bg-primary text-white' : 'hover:text-red-600'
                                        }`}
                                >
                                    {p}
                                </button>
                            ))}
                            {totalPages > 5 && <span className="mx-1 text-gray-500 tracking-widest">...</span>}
                            {totalPages > 5 && (
                                <button onClick={() => setPage(totalPages)} className="cursor-pointer hover:text-red-600">{totalPages}</button>
                            )}
                            {page < totalPages && (
                                <button onClick={() => setPage(p => p + 1)} className="ml-2 cursor-pointer text-gray-800 hover:text-red-600">Next &gt;</button>
                            )}
                        </div>
                    )}
                </section>

            </div>
        </main>
    );
};

export default BeritaPage;
