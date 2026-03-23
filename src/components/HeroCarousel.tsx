import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchBanners } from '../services/api';
import type { Banner } from '../services/api';

// Fallback slides (shown while loading or if API returns empty)
const fallbackSlides: Banner[] = [
    {
        id: '1',
        title: "Rapat Paripurna DPRD Kabupaten Sumbawa Barat",
        subtitle: "Pembahasan RAPBD Tahun Anggaran 2025 bersama jajaran Eksekutif untuk kemajuan daerah.",
        category: "Berita Dewan",
        imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&q=80",
        linkUrl: null,
        isActive: true,
        order: 0,
        createdAt: '',
    },
    {
        id: '2',
        title: "Kunjungan Kerja Komisi III ke Daerah Pemilihan",
        subtitle: "Menampung Aspirasi Masyarakat Sumbawa Barat terkait pembangunan infrastruktur dan kesejahteraan.",
        category: "Wakil Kita",
        imageUrl: "https://images.unsplash.com/photo-1591522810850-58128c5fb3db?w=1920&q=80",
        linkUrl: null,
        isActive: true,
        order: 1,
        createdAt: '',
    },
];

const HeroCarousel: React.FC = () => {
    const [slides, setSlides] = useState<Banner[]>(fallbackSlides);
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let mounted = true;
        fetchBanners(true).then((data) => {
            if (mounted && data.length > 0) {
                // Sort banners by order
                const sortedData = [...data].sort((a, b) => (a.order || 0) - (b.order || 0));
                setSlides(sortedData);
            }
        }).catch(() => {
            // Keep fallback slides on error
        });
        return () => { mounted = false; };
    }, []);

    const goTo = useCallback((index: number) => {
        if (isAnimating || index === current) return;
        setIsAnimating(true);
        setCurrent(index);
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating, current]);

    const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo, slides.length]);
    const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo, slides.length]);

    useEffect(() => {
        if (isHovered) return;
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next, isHovered]);

    if (slides.length === 0) return null;

    return (
        <div
            className="relative mt-4 lg:mt-6 mx-4 lg:mx-8 rounded-3xl h-[400px] md:h-[550px] lg:h-[650px] overflow-hidden group shadow-2xl bg-[#0a2744]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {slides.map((slide, index) => (
                <div
                    key={slide.id || index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Background Image Wrapping Anchor */}
                    <a
                        href={slide.linkUrl || "#"}
                        className="absolute inset-0 z-20"
                        onClick={(e) => !slide.linkUrl && e.preventDefault()}
                        style={{ cursor: slide.linkUrl ? 'pointer' : 'default' }}
                    >
                        <span className="sr-only">{slide.title}</span>
                    </a>

                    {/* Background Image with slow zoom (Ken Burns effect) */}
                    <div
                        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear ${index === current ? 'scale-110' : 'scale-100'
                            }`}
                        style={{ backgroundImage: `url('${slide.imageUrl}')` }}
                    />
                </div>
            ))}

            {/* Navigation arrows (visible on hover) */}
            <button
                onClick={prev}
                className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-yellow-400 hover:text-[#0a2744] text-white backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block border border-white/20 hover:border-transparent"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={next}
                className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-yellow-400 hover:text-[#0a2744] text-white backdrop-blur-md rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block border border-white/20 hover:border-transparent"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 md:bottom-8 right-0 left-0 flex justify-center md:justify-end md:right-12 z-40 gap-2.5">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all duration-500 ease-out flex items-center justify-center ${i === current
                            ? 'w-10 md:w-12 h-2.5 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]'
                            : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/80 border border-white/20'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
