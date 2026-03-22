import React from 'react';
import { Play } from 'lucide-react';

const videos = [
    {
        id: "z38p3gX7XFw",
        title: "Live: Rapat Paripurna DPRD Kab. Sumbawa Barat - Penetapan APBD 2026",
        channel: "DPRD Sumbawa Barat",
        views: "1.2 rbx tayangan",
        time: "1 hari yang lalu",
    },
    {
        id: "eC7i6222b40",
        title: "Paripurna Masa Sidang II 2026 - Jawaban Bupati Atas Pandangan Fraksi",
        channel: "DPRD Sumbawa Barat",
        views: "800 tayangan",
        time: "3 hari yang lalu",
    },
    {
        id: "BHACKCNDMW8",
        title: "Sosialisasi Perda tentang Pengelolaan Sampah Terpadu",
        channel: "DPRD Sumbawa Barat",
        views: "540 tayangan",
        time: "5 hari yang lalu",
    },
];

const VideoNews: React.FC = () => {
    return (
        <section className="bg-white py-10 w-full relative">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Berita Video</h2>
                        <div className="w-12 h-1 bg-red-600 mt-2"></div>
                    </div>
                    <a href="/video" className="text-red-600 text-[13px] font-bold tracking-wider hover:underline">
                        LIHAT SEMUA &gt;
                    </a>
                </div>

                {/* 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {videos.map((video) => (
                        <a
                            key={video.id}
                            href={`https://youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="group block relative border border-gray-100 rounded-sm overflow-hidden bg-gray-50 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                                    }}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Title overlay inside video like Youtube player */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent opacity-90 p-3 pt-4">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white text-center flex items-center justify-center font-bold text-[10px] shrink-0">
                                            DPRD
                                        </div>
                                        <h3 className="text-white text-[13px] font-semibold leading-snug line-clamp-2">
                                            {video.title}
                                        </h3>
                                    </div>
                                </div>
                                {/* Center Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center drop-shadow-md group-hover:bg-red-500 transition-colors">
                                        <Play className="text-white fill-white ml-1 w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-3">
                                <p className="text-xs text-gray-500 font-medium">{video.channel}</p>
                                <p className="text-[11px] text-gray-400 mt-0.5">{video.views} • {video.time}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoNews;
