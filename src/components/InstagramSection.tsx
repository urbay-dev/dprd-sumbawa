import React, { useEffect, useState } from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { socialConfig } from '../config/social';
import { fetchInstagramPosts } from '../services/api';
import type { InstagramPost } from '../services/api';

const InstagramSection: React.FC = () => {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInstagramPosts(6).then((data) => {
            setPosts(data.items);
            setLoading(false);
        });
    }, []);

    return (
        <section className="py-8 bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <div
                            className="text-white text-sm font-bold px-5 py-2 uppercase tracking-wide flex items-center gap-2 rounded-lg shadow-lg"
                            style={{ background: 'linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)' }}
                        >
                            <Instagram size={16} /> Instagram
                        </div>
                    </div>
                    <a
                        href={socialConfig.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 text-sm hover:underline flex items-center gap-1 font-medium"
                    >
                        {socialConfig.instagramHandle} <ExternalLink size={12} />
                    </a>
                </div>

                {/* Loading Skeleton */}
                {loading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse aspect-square bg-gray-200 rounded-lg"></div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && posts.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        <Instagram size={48} className="mx-auto mb-3 opacity-40" />
                        <p className="font-medium">Belum ada postingan tersedia</p>
                    </div>
                )}

                {/* Instagram grid */}
                {!loading && posts.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {posts.map((post) => (
                            <a
                                key={post.id}
                                href={post.permalink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative group overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300"
                                style={{ aspectRatio: '1' }}
                            >
                                <img
                                    src={post.mediaUrl}
                                    alt={post.caption}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Hover overlay */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2"
                                    style={{ background: 'linear-gradient(45deg, rgba(131,58,180,0.8), rgba(253,29,29,0.8), rgba(252,176,69,0.8))' }}
                                >
                                    <div className="flex items-center gap-4 text-white">
                                        <span className="flex items-center gap-1.5 text-sm font-bold">
                                            <Heart size={16} className="fill-white" /> {post.likeCount}
                                        </span>
                                        <span className="flex items-center gap-1.5 text-sm font-bold">
                                            <MessageCircle size={16} className="fill-white" /> {post.commentsCount}
                                        </span>
                                    </div>
                                    <p className="text-white text-[10px] text-center px-3 leading-tight line-clamp-2 opacity-90 mt-1">
                                        {post.caption}
                                    </p>
                                    <Instagram size={18} className="text-white opacity-80 mt-1" />
                                </div>
                            </a>
                        ))}
                    </div>
                )}

                {/* Follow button */}
                {!loading && posts.length > 0 && (
                    <div className="flex justify-center mt-6">
                        <a
                            href={socialConfig.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-white font-bold px-8 py-2.5 rounded-full text-sm transition-all hover:opacity-90 hover:shadow-xl active:scale-95 shadow-lg"
                            style={{ background: 'linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)' }}
                        >
                            <Instagram size={16} /> Ikuti {socialConfig.instagramHandle} di Instagram
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default InstagramSection;
