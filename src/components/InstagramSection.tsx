import React from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';

// Instagram posts – use real public IG embed links or placeholder images
// For real integration: use Instagram oEmbed or Basic Display API
const posts = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=400&q=80",
        caption: "Rapat Paripurna DPRD Sumbawa Barat Maret 2026 📋 #DPRDSumbawaBarat #Legislasi",
        likes: 234,
        comments: 18,
        url: "https://www.instagram.com",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1591522810850-58128c5fb3db?w=400&q=80",
        caption: "Kunjungan Kerja Komisi II ke Kecamatan Maluk bersama warga setempat 🤝 #WakilKita",
        likes: 189,
        comments: 12,
        url: "https://www.instagram.com",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&q=80",
        caption: "Pengesahan Perda RTRW 2026–2046 oleh DPRD Sumbawa Barat 🏛️ #Perda #RTRW",
        likes: 312,
        comments: 27,
        url: "https://www.instagram.com",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80",
        caption: "Sidak infrastruktur jalan oleh Komisi III – aspirasi warga jadi prioritas! 🚧",
        likes: 156,
        comments: 9,
        url: "https://www.instagram.com",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80",
        caption: "Forum Dialog Publik bersama masyarakat tentang APBD 2026 💬 #Aspirasi",
        likes: 278,
        comments: 21,
        url: "https://www.instagram.com",
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
        caption: "Rapat Badan Anggaran – transparansi keuangan daerah Sumbawa Barat 📊 #APBD",
        likes: 198,
        comments: 14,
        url: "https://www.instagram.com",
    },
];

const InstagramSection: React.FC = () => {
    return (
        <section className="py-6 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div
                            className="text-white text-sm font-bold px-4 py-1.5 uppercase tracking-wide flex items-center gap-2"
                            style={{ background: 'linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)' }}
                        >
                            <Instagram size={14} /> Instagram
                        </div>
                    </div>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 text-sm hover:underline flex items-center gap-1 font-medium"
                    >
                        @dprdsumbawabarat <ExternalLink size={12} />
                    </a>
                </div>

                {/* Instagram grid – 6 posts */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {posts.map((post) => (
                        <a
                            key={post.id}
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative group overflow-hidden rounded"
                            style={{ aspectRatio: '1' }}
                        >
                            <img
                                src={post.image}
                                alt={post.caption}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2"
                                style={{ background: 'linear-gradient(45deg, rgba(131,58,180,0.75), rgba(253,29,29,0.75), rgba(252,176,69,0.75))' }}>
                                <div className="flex items-center gap-3 text-white">
                                    <span className="flex items-center gap-1 text-sm font-bold">
                                        <Heart size={14} className="fill-white" /> {post.likes}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm font-bold">
                                        <MessageCircle size={14} className="fill-white" /> {post.comments}
                                    </span>
                                </div>
                                <p className="text-white text-[10px] text-center px-2 leading-tight line-clamp-2 opacity-90">
                                    {post.caption}
                                </p>
                                <Instagram size={16} className="text-white opacity-80" />
                            </div>
                        </a>
                    ))}
                </div>

                {/* Follow button */}
                <div className="flex justify-center mt-4">
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white font-bold px-8 py-2.5 rounded-full text-sm transition-opacity hover:opacity-90 shadow-lg"
                        style={{ background: 'linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)' }}
                    >
                        <Instagram size={16} /> Ikuti @dprdsumbawabarat di Instagram
                    </a>
                </div>
            </div>
        </section>
    );
};

export default InstagramSection;
