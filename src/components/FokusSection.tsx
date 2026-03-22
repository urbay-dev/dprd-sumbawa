import React from 'react';
import { Play } from 'lucide-react';

const FOKUS_VIDEO_ID = 'jNQXAC9IVRw';
const FOKUS_TITLE = 'RECAP BAPEMPERDA MARET 2026';

const relatedVideos = [
    { title: "Video Podcast", channel: "DPRD Sumbawa Barat", id: "dQw4w9WgXcQ" },
    { title: "Podcast Humas DPRD", channel: "DPRD Sumbawa Barat", id: "BHACKCNDMW8" },
    { title: "Sekilas Humas DPRD Sumbawa Barat", channel: "DPRD Sumbawa Barat", id: "QH2-TGUlwu4" },
];

const FokusSection: React.FC = () => {
    const [playing, setPlaying] = React.useState(false);

    return (
        <section className="bg-zinc-900 py-10 w-full relative">
            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="mb-6 flex flex-col">
                    <h2 className="text-2xl font-black text-white tracking-tight">Fokus</h2>
                    <div className="w-12 h-1 bg-red-600 mt-2"></div>
                </div>

                {/* Big Video */}
                <div className="w-full relative rounded-sm border border-white/10 mb-6 bg-black shadow-2xl overflow-hidden" style={{ aspectRatio: '16/7' }}>
                    {playing ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${FOKUS_VIDEO_ID}?autoplay=1`}
                            title={FOKUS_TITLE}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full absolute inset-0"
                        />
                    ) : (
                        <div className="relative w-full h-full cursor-pointer group" onClick={() => setPlaying(true)}>
                            <img
                                src={`https://img.youtube.com/vi/${FOKUS_VIDEO_ID}/maxresdefault.jpg`}
                                alt={FOKUS_TITLE}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 md:p-10 pointer-events-none">
                                <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tight drop-shadow-xl w-full">
                                    {FOKUS_TITLE}
                                </h2>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center drop-shadow-2xl group-hover:scale-110 transition-transform">
                                    <Play size={36} className="text-white fill-white ml-2" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom 3 videos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {relatedVideos.map((vid, idx) => (
                        <a
                            key={idx}
                            href={`https://youtube.com/watch?v=${vid.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex gap-4 group hover:bg-white/5 p-2 rounded transition-colors"
                        >
                            <div className="relative w-32 md:w-40 aspect-video rounded-sm overflow-hidden shrink-0 border border-white/10">
                                <img
                                    src={`https://img.youtube.com/vi/${vid.id}/mqdefault.jpg`}
                                    alt={vid.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 bg-red-600 rounded-xl flex items-center justify-center drop-shadow-md">
                                        <Play className="text-white fill-white w-4 h-4 ml-0.5" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-white font-bold text-sm leading-snug group-hover:text-red-500 transition-colors">
                                    {vid.title}
                                </p>
                                <span className="text-gray-400 text-[10px] mt-1 uppercase font-medium tracking-wider">
                                    {vid.channel}
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
