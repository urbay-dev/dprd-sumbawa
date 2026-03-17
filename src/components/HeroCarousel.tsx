import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: "Rapat Paripurna DPRD Kabupaten Sumbawa Barat",
        subtitle: "Pembahasan RAPBD Tahun Anggaran 2025",
        category: "Berita Dewan",
        date: "15 Maret 2026",
        bg: "from-primary-dark via-primary to-primary-light",
        image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&q=80",
    },
    {
        id: 2,
        title: "Kunjungan Kerja Komisi III ke Daerah Pemilihan",
        subtitle: "Menampung Aspirasi Masyarakat Sumbawa Barat",
        category: "Wakil Kita",
        date: "12 Maret 2026",
        bg: "from-blue-900 via-blue-800 to-blue-700",
        image: "https://images.unsplash.com/photo-1591522810850-58128c5fb3db?w=1200&q=80",
    },
    {
        id: 3,
        title: "Pengesahan Peraturan Daerah tentang RTRW",
        subtitle: "DPRD Sumbawa Barat Sahkan 3 Raperda Baru",
        category: "Berita Dewan",
        date: "10 Maret 2026",
        bg: "from-teal-900 via-teal-800 to-teal-600",
        image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=1200&q=80",
    },
    {
        id: 4,
        title: "Forum Warga: Dialog Pembangunan Infrastruktur",
        subtitle: "DPRD Buka Ruang Aspirasi untuk Masyarakat",
        category: "Forum Warga",
        date: "8 Maret 2026",
        bg: "from-indigo-900 via-indigo-800 to-indigo-600",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
    },
];

const HeroCarousel: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const goTo = useCallback((index: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrent(index);
        setTimeout(() => setIsAnimating(false), 500);
    }, [isAnimating]);

    const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
    const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const slide = slides[current];

    return (
        <div className="relative h-96 md:h-[500px] overflow-hidden group">
            {/* Background image */}
            <div
                key={slide.id}
                className="absolute inset-0 bg-cover bg-center carousel-slide"
                style={{ backgroundImage: `url(${slide.image})` }}
            >
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.bg} opacity-75`} />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8 md:p-12 max-w-4xl">
                <span className="inline-block bg-accent text-white text-xs font-bold uppercase px-3 py-1 rounded mb-3 w-fit">
                    {slide.category}
                </span>
                <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-2 drop-shadow">
                    {slide.title}
                </h1>
                <p className="text-blue-100 text-sm md:text-base mb-4 drop-shadow">{slide.subtitle}</p>
                <div className="flex items-center gap-4">
                    <span className="text-blue-200 text-xs">{slide.date}</span>
                    <button className="bg-white text-primary text-sm font-bold px-5 py-2 rounded hover:bg-yellow-400 hover:text-primary-dark transition-colors">
                        Baca Selengkapnya →
                    </button>
                </div>
            </div>

            {/* Navigation arrows */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <ChevronLeft size={20} />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 right-8 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/75'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
