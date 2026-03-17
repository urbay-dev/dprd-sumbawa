import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const navItems = [
    { label: 'Beranda', href: '/' },
    {
        label: 'Profil',
        href: '/profil',
        children: [
            { label: 'Sejarah DPRD', href: '/profil/sejarah' },
            { label: 'Visi & Misi', href: '/profil/visi-misi' },
            { label: 'Struktur Organisasi', href: '/profil/struktur' },
        ],
    },
    {
        label: 'Berita',
        href: '/berita',
        children: [
            { label: 'Berita Dewan', href: '/berita/dewan' },
            { label: 'Wakil Kita', href: '/berita/wakil-kita' },
            { label: 'Pengumuman', href: '/berita/pengumuman' },
        ],
    },
    { label: 'Pimpinan Dewan', href: '/pimpinan' },
    {
        label: 'AKD',
        href: '/akd',
        children: [
            { label: 'Komisi I', href: '/akd/komisi-1' },
            { label: 'Komisi II', href: '/akd/komisi-2' },
            { label: 'Komisi III', href: '/akd/komisi-3' },
            { label: 'Badan Musyawarah', href: '/akd/bamus' },
            { label: 'Badan Anggaran', href: '/akd/banggar' },
            { label: 'Bapemperda', href: '/akd/bapemperda' },
            { label: 'Badan Kehormatan', href: '/akd/bk' },
        ],
    },
    {
        label: 'Fraksi',
        href: '/fraksi',
        children: [
            { label: 'Fraksi Gerindra', href: '/fraksi/gerindra' },
            { label: 'Fraksi Golkar', href: '/fraksi/golkar' },
            { label: 'Fraksi PKB', href: '/fraksi/pkb' },
            { label: 'Fraksi PKS', href: '/fraksi/pks' },
            { label: 'Fraksi Demokrat', href: '/fraksi/demokrat' },
            { label: 'Fraksi NasDem', href: '/fraksi/nasdem' },
        ],
    },
    { label: 'Sekretariat', href: '/sekretariat' },
    {
        label: 'PPID',
        href: '/ppid',
        children: [
            { label: 'Profil PPID', href: '/ppid/profil' },
            { label: 'Informasi Publik', href: '/ppid/informasi' },
            { label: 'Permohonan Informasi', href: '/ppid/permohonan' },
        ],
    },
    {
        label: 'Silegda',
        href: '/silegda',
        children: [
            { label: 'Propemperda 2024', href: '/silegda/2024' },
            { label: 'Propemperda 2025', href: '/silegda/2025' },
            { label: 'Propemperda 2026', href: '/silegda/2026' },
        ],
    },
    { label: 'Agenda', href: '/agenda' },
];

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-xl' : ''}`}>
            {/* Top info bar */}
            <div className="bg-[#0a2744] text-white text-xs py-1.5 px-4 hidden lg:flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <span className="flex items-center gap-1.5 text-gray-300">
                        <MapPin size={11} className="text-yellow-400" />
                        Jl. Garuda No. 1, Taliwang, Sumbawa Barat
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-300">
                        <Phone size={11} className="text-yellow-400" />
                        (0372) 81XXXX
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-300">
                        <Mail size={11} className="text-yellow-400" />
                        dprd@sumbawabarat.go.id
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                        className="w-6 h-6 rounded flex items-center justify-center bg-blue-700 hover:bg-blue-600 transition-colors">
                        <Facebook size={11} />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                        className="w-6 h-6 rounded flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 transition-opacity">
                        <Instagram size={11} />
                    </a>
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"
                        className="w-6 h-6 rounded flex items-center justify-center bg-red-600 hover:bg-red-700 transition-colors">
                        <Youtube size={11} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                        className="w-6 h-6 rounded flex items-center justify-center bg-sky-500 hover:bg-sky-600 transition-colors">
                        <Twitter size={11} />
                    </a>
                </div>
            </div>

            {/* Logo & search bar */}
            <div className="bg-white py-2.5 px-6 flex items-center justify-between border-b border-gray-200">
                <Link to="/" className="flex items-center gap-3">
                    {/* Logo circle */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-[#0a2744] flex flex-col items-center justify-center border-4 border-yellow-500 shadow">
                            <span className="text-yellow-400 font-black text-sm leading-none">DPRD</span>
                            <span className="text-white text-[8px] font-medium text-center leading-tight">Sumbawa<br />Barat</span>
                        </div>
                    </div>
                    <div>
                        <div className="text-[#0a2744] font-black text-xl leading-tight tracking-tight">DPRD</div>
                        <div className="text-[#1a6bb5] font-bold text-base leading-tight">Kabupaten Sumbawa Barat</div>
                        <div className="text-gray-400 text-xs tracking-wide">Dewan Perwakilan Rakyat Daerah</div>
                    </div>
                </Link>

                {/* Right: Search */}
                <div className="hidden md:flex flex-col items-end gap-2">
                    <div className="flex rounded overflow-hidden border border-gray-300 focus-within:border-[#1a6bb5] transition-colors">
                        <input
                            type="text"
                            placeholder="Cari Artikel Berita..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="px-4 py-2 text-sm w-72 focus:outline-none bg-white"
                        />
                        <button className="bg-[#0a2744] hover:bg-[#1a6bb5] text-white px-4 py-2 transition-colors">
                            <Search size={15} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation bar */}
            <nav className="bg-[#0a2744] relative">
                {/* Desktop nav */}
                <div className="hidden lg:flex max-w-full">
                    {navItems.map((item) => (
                        <div
                            key={item.label}
                            className="relative group"
                            onMouseEnter={() => setOpenDropdown(item.label)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <Link
                                to={item.href}
                                className="flex items-center gap-1 text-white text-[13px] font-medium px-4 py-3 hover:bg-[#1a6bb5] transition-colors whitespace-nowrap border-r border-white/10 first:border-l"
                            >
                                {item.label}
                                {item.children && <ChevronDown size={12} className="opacity-70" />}
                            </Link>
                            {item.children && openDropdown === item.label && (
                                <div className="absolute top-full left-0 bg-white shadow-xl border border-gray-100 min-w-52 z-50">
                                    <div className="h-0.5 bg-[#1a6bb5] w-full" />
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.label}
                                            to={child.href}
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0a2744] border-b border-gray-50 transition-colors"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#1a6bb5] flex-shrink-0" />
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile nav */}
                <div className="lg:hidden flex justify-between items-center px-4 py-3">
                    <Link to="/" className="text-white font-bold text-sm">DPRD Sumbawa Barat</Link>
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-1">
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
                {mobileOpen && (
                    <div className="lg:hidden bg-[#0d3060] border-t border-white/10">
                        {navItems.map((item) => (
                            <div key={item.label}>
                                <Link
                                    to={item.href}
                                    className="block text-white py-2.5 px-5 text-sm border-b border-white/10 hover:bg-[#1a6bb5] transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                {item.children?.map((child) => (
                                    <Link
                                        key={child.label}
                                        to={child.href}
                                        className="block text-blue-200 py-2 pl-9 text-xs border-b border-white/5 hover:bg-[#1a6bb5]/50 transition-colors"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        › {child.label}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
