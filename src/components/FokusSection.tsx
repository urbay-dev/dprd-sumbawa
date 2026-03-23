import React, { useEffect, useState } from 'react';
import { Play, Youtube } from 'lucide-react';
import { fetchYouTubeVideos } from '../services/api';
import type { YouTubeVideo } from '../services/api';
import { socialConfig } from '../config/social';

const FokusSection: React.FC = () => {
    const [playing, setPlaying] = React.useState(false);
    const [mainVideo, setMainVideo] = useState<YouTubeVideo | null>(null);
    const [relatedVideos, setRelatedVideos] = useState<YouTubeVideo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchYouTubeVideos(4).then((data) => {
            if (data.items.length > 0) {
                setMainVideo(data.items[0]);
                setRelatedVideos(data.items.slice(1, 4));
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <section className="bg-zinc-900 py-10 w-full relative">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                    <div className="mb-6 flex flex-col">
                        <h2 className="text-2xl font-black text-white tracking-tight">Fokus</h2>
                        <div className="w-12 h-1 bg-red-600 mt-2"></div>
                    </div>
                    <div className="animate-pulse">
                        <div className="w-full bg-zinc-800 rounded-lg" style={{ aspectRatio: '16/7' }}></div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 p-2">
                                    <div className="w-32 md:w-40 aspect-video bg-zinc-800 rounded-sm shrink-0"></div>
                                    <div className="flex flex-col justify-center gap-2 flex-1">
                                        <div className="h-3 bg-zinc-800 rounded w-3/4"></div>
                                        <div className="h-2 bg-zinc-800 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!mainVideo) return null;

    return (
        <section className="bg-zinc-900 py-10 w-full relative">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-600 text-white p-1.5 rounded-lg">
                                <Youtube size={20} />
                            </div>
                            <h2 className="text-2xl font-black text-white tracking-tight">Fokus</h2>
                        </div>
                        <div className="w-12 h-1 bg-red-600 mt-2"></div>
                    </div>
                    <a
                        href={socialConfig.youtube}
                        target="_blank"
                        rel="noreferrer"
                        className="text-red-400 text-[13px] font-bold tracking-wider hover:text-red-300 flex items-center gap-1 transition-colors"
                    >
                        <Youtube size={14} />
                        CHANNEL YOUTUBE &gt;
                    </a>
                </div>

                {/* Big Video */}
                <div className="w-full relative rounded-lg border border-white/10 mb-6 bg-black shadow-2xl overflow-hidden" style={{ aspectRatio: '16/7' }}>
                    {playing ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${mainVideo.id}?autoplay=1`}
                            title={mainVideo.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full absolute inset-0"
                        />
                    ) : (
                        <div className="relative w-full h-full cursor-pointer group" onClick={() => setPlaying(true)}>
                            <img
                                src={mainVideo.thumbnail || `https://img.youtube.com/vi/${mainVideo.id}/maxresdefault.jpg`}
                                alt={mainVideo.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 md:p-10 pointer-events-none">
                                <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tight drop-shadow-xl w-full">
                                    {mainVideo.title}
                                </h2>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-20 h-20 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center drop-shadow-2xl group-hover:scale-110 transition-transform">
                                    <Play size={36} className="text-white fill-white ml-2" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom 3 videos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedVideos.map((vid) => (
                        <a
                            key={vid.id}
                            href={`https://youtube.com/watch?v=${vid.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex gap-4 group hover:bg-white/5 p-2 rounded-lg transition-colors"
                        >
                            <div className="relative w-32 md:w-40 aspect-video rounded-lg overflow-hidden shrink-0 border border-white/10">
                                <img
                                    src={vid.thumbnail || `https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`}
                                    alt={vid.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 bg-red-600/90 rounded-xl flex items-center justify-center drop-shadow-md">
                                        <Play className="text-white fill-white w-4 h-4 ml-0.5" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-white font-bold text-sm leading-snug group-hover:text-red-500 transition-colors line-clamp-2">
                                    {vid.title}
                                </p>
                                <span className="text-gray-400 text-[10px] mt-1 uppercase font-medium tracking-wider">
                                    {vid.channelTitle}
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FokusSection;
