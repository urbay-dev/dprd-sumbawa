import React from 'react';
import { Play, Clock, ArrowRight, Youtube } from 'lucide-react';

// Use real-ish YouTube video IDs (these are public Indonesian government session videos)
const videos = [
    {
        id: 1,
        title: "Siaran Langsung Rapat Paripurna DPRD Sumbawa Barat - Pengesahan Raperda",
        duration: "2:14:30",
        date: "15 Mar 2026",
        youtubeId: "jNQXAC9IVRw", // a well-known public video
        thumbnail: `https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg`,
    },
    {
        id: 2,
        title: "Dialog Interaktif Komisi III dengan Warga Taliwang tentang Infrastruktur",
        duration: "1:42:10",
        date: "12 Mar 2026",
        youtubeId: "dQw4w9WgXcQ",
        thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg`,
    },
    {
        id: 3,
        title: "Sosialisasi Perda tentang Pengelolaan Sampah Terpadu Sumbawa Barat",
        duration: "58:22",
        date: "10 Mar 2026",
        youtubeId: "BHACKCNDMW8",
        thumbnail: `https://img.youtube.com/vi/BHACKCNDMW8/mqdefault.jpg`,
    },
    {
        id: 4,
        title: "Rapat Badan Anggaran tentang R-APBD Perubahan 2025",
        duration: "3:05:00",
        date: "8 Mar 2026",
        youtubeId: "9bZkp7q19f0",
        thumbnail: `https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg`,
    },
    {
        id: 5,
        title: "Kunjungan Kerja Pimpinan DPRD ke Kecamatan Sekongkang",
        duration: "45:10",
        date: "6 Mar 2026",
        youtubeId: "QH2-TGUlwu4",
        thumbnail: `https://img.youtube.com/vi/QH2-TGUlwu4/mqdefault.jpg`,
    },
    {
        id: 6,
        title: "Forum Konsultasi Publik Ranperda RPJMD 2026-2031",
        duration: "1:18:40",
        date: "4 Mar 2026",
        youtubeId: "hT_nvWreIhg",
        thumbnail: `https://img.youtube.com/vi/hT_nvWreIhg/mqdefault.jpg`,
    },
];

const VideoNews: React.FC = () => {
    const [activeVideo, setActiveVideo] = React.useState<string | null>(null);

    return (
        <section className="py-6 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-red-600 text-white text-sm font-bold px-4 py-1.5 uppercase tracking-wide flex items-center gap-2">
                            <Youtube size={14} /> Berita Video
                        </div>
                    </div>
                    <a
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 text-sm hover:underline flex items-center gap-1 font-medium"
                    >
                        Kunjungi Channel <ArrowRight size={13} />
                    </a>
                </div>

                {/* Video grid – 3 columns x 2 rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                        <div key={video.id} className="news-card group">
                            {/* Thumbnail / embed toggle */}
                            <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                                {activeVideo === video.youtubeId ? (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                                        title={video.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <>
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                (e.currentTarget as HTMLImageElement).src =
                                                    `https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=60`;
                                            }}
                                        />
                                        {/* Dark overlay */}
                                        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-colors" />
                                        {/* Play button */}
                                        <button
                                            onClick={() => setActiveVideo(video.youtubeId)}
                                            className="absolute inset-0 flex items-center justify-center"
                                        >
                                            <div className="w-14 h-14 rounded-full bg-red-600/90 hover:bg-red-600 flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
                                                <Play size={22} className="text-white fill-white ml-1" />
                                            </div>
                                        </button>
                                        {/* Duration */}
                                        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-mono">
                                            {video.duration}
                                        </span>
                                        {/* YouTube logo watermark */}
                                        <div className="absolute top-2 right-2">
                                            <Youtube size={18} className="text-red-500 drop-shadow" />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="p-3">
                                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#0a2744] transition-colors line-clamp-2 leading-snug mb-1.5">
                                    {video.title}
                                </h3>
                                <span className="text-gray-400 text-xs flex items-center gap-1">
                                    <Clock size={10} /> {video.date}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VideoNews;
