import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { socialConfig } from '../config/social';

const Footer: React.FC = () => {
    return (
        <footer>
            {/* Main footer */}
            <div style={{ backgroundColor: '#0a2744' }} className="text-white">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Col 1 – Logo + About */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 rounded-full flex flex-col items-center justify-center border-4 border-yellow-500 flex-shrink-0 bg-[#1a3a5c]">
                                <span className="text-yellow-400 font-black text-xs leading-none">DPRD</span>
                                <span className="text-white text-[8px] font-medium text-center leading-tight">Sumbawa<br />Barat</span>
                            </div>
                            <div>
                                <div className="font-black text-base leading-tight">DPRD</div>
                                <div className="text-blue-300 text-xs">Kabupaten Sumbawa Barat</div>
                            </div>
                        </div>
                        <p className="text-blue-300 text-xs leading-relaxed mb-4">
                            Dewan Perwakilan Rakyat Daerah Kabupaten Sumbawa Barat berkomitmen mewakili aspirasi masyarakat dan mendorong pembangunan daerah yang adil.
                        </p>
                        <div className="space-y-2 text-xs text-blue-300">
                            <div className="flex gap-2 items-start">
                                <MapPin size={12} className="mt-0.5 flex-shrink-0 text-yellow-400" />
                                <span>Jl. Garuda No. 1, Taliwang, Kabupaten Sumbawa Barat, NTB 84355</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Phone size={12} className="flex-shrink-0 text-yellow-400" />
                                <span>(0372) 81XXXX</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Mail size={12} className="flex-shrink-0 text-yellow-400" />
                                <span>dprd@sumbawabarat.go.id</span>
                            </div>
                        </div>
                    </div>

                    {/* Col 2 – Menu Utama */}
                    <div>
                        <h3 className="font-bold text-yellow-400 mb-4 uppercase text-xs tracking-widest border-b border-white/20 pb-2">Menu Utama</h3>
                        <ul className="space-y-2 text-xs">
                            {['Beranda', 'Profil DPRD', 'Berita Dewan', 'Wakil Kita', 'Pimpinan Dewan', 'AKD', 'Fraksi', 'Sekretariat DPRD', 'PPID', 'Agenda Kegiatan'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-blue-300 hover:text-white transition-colors flex items-center gap-1.5">
                                        <span className="text-yellow-400">›</span> {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 – Kanal Berita */}
                    <div>
                        <h3 className="font-bold text-yellow-400 mb-4 uppercase text-xs tracking-widest border-b border-white/20 pb-2">Kanal Berita</h3>
                        <ul className="space-y-2 text-xs">
                            {['Berita Dewan', 'Wakil Kita', 'Galeri Dewan', 'Galeri Sekretariat', 'Berita Video', 'Siaran Pers', 'Pengumuman', 'Agenda Resmi'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-blue-300 hover:text-white transition-colors flex items-center gap-1.5">
                                        <span className="text-yellow-400">›</span> {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 4 – Links & Social */}
                    <div>
                        <h3 className="font-bold text-yellow-400 mb-4 uppercase text-xs tracking-widest border-b border-white/20 pb-2">Link & Media Sosial</h3>
                        <ul className="space-y-2 text-xs mb-6">
                            {['JDIH Sumbawa Barat', 'eReses DPRD', 'Portal KSB', 'KPU Sumbawa Barat', 'Bawaslu NTB', 'Kemendagri RI', 'DPR RI'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-blue-300 hover:text-white transition-colors flex items-center gap-1.5">
                                        <span className="text-yellow-400">›</span> {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-3">Ikuti Kami</h4>
                        <div className="flex gap-2">
                            <a href={socialConfig.facebook} target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded flex items-center justify-center bg-blue-700 hover:bg-blue-600 transition-colors">
                                <Facebook size={15} />
                            </a>
                            <a href={socialConfig.instagram} target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded flex items-center justify-center hover:opacity-90 transition-opacity"
                                style={{ background: 'linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045)' }}>
                                <Instagram size={15} />
                            </a>
                            <a href={socialConfig.youtube} target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded flex items-center justify-center bg-red-600 hover:bg-red-700 transition-colors">
                                <Youtube size={15} />
                            </a>
                            <a href={socialConfig.twitter} target="_blank" rel="noopener noreferrer"
                                className="w-9 h-9 rounded flex items-center justify-center bg-sky-500 hover:bg-sky-600 transition-colors">
                                <Twitter size={15} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ backgroundColor: '#060f1e' }} className="text-center text-xs text-blue-400 py-3 px-4">
                <p>© {new Date().getFullYear()} DPRD Kabupaten Sumbawa Barat. Hak Cipta Dilindungi.</p>
                <p className="mt-0.5 text-blue-600">Dikembangkan oleh Sekretariat DPRD Kabupaten Sumbawa Barat</p>
            </div>
        </footer>
    );
};

export default Footer;
