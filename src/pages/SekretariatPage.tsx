import React from 'react';
import { Eye, Target, Briefcase, Layers, Users, ChevronRight } from 'lucide-react';

const SekretariatPage: React.FC = () => {
    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                <a href="/" className="hover:text-primary transition-colors">Beranda</a> <span>/</span>
                <span className="text-gray-700 font-medium">Sekretariat DPRD</span>
            </div>

            <div className="mb-10 text-center max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-black text-[#0a2744] mb-4">Sekretariat DPRD</h1>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Sekretariat DPRD merupakan unsur pelayanan administrasi dan pemberian dukungan operasional kepada
                    DPRD Kabupaten Sumbawa Barat yang dipimpin oleh seorang Sekretaris DPRD.
                </p>
            </div>

            {/* Visi & Misi Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Visi */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:bg-blue-100 transition-colors duration-500"></div>
                    <div className="w-14 h-14 bg-gradient-to-br from-[#0a2744] to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg text-white">
                        <Eye size={28} strokeWidth={2} />
                    </div>
                    <h2 className="text-2xl font-black text-[#0a2744] mb-4">Visi</h2>
                    <p className="text-gray-700 leading-relaxed font-medium text-lg italic">
                        "Terwujudnya Pelayanan Administrasi dan Fasilitasi Pimpinan dan Anggota DPRD yang Profesional, Akuntabel, dan Inovatif."
                    </p>
                </div>

                {/* Misi */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-full -z-10 group-hover:bg-yellow-100 transition-colors duration-500"></div>
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-6 shadow-lg text-white">
                        <Target size={28} strokeWidth={2} />
                    </div>
                    <h2 className="text-2xl font-black text-[#0a2744] mb-4">Misi</h2>
                    <ul className="space-y-4">
                        {[
                            "Meningkatkan kualitas pelayanan administrasi kesekretariatan DPRD.",
                            "Meningkatkan kapasitas dan profesionalisme sumber daya aparatur.",
                            "Mengoptimalkan fasilitasi kegiatan rapat, persidangan, dan perundang-undangan.",
                            "Meningkatkan transparansi dan akuntabilitas pengelolaan keuangan."
                        ].map((misi, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <div className="min-w-6 min-h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                    {index + 1}
                                </div>
                                <span className="text-gray-600 leading-relaxed">{misi}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Tugas & Fungsi Section */}
            <div className="bg-[#0a2744] rounded-3xl p-8 md:p-12 text-white mb-12 relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-white/[0.03] rotate-12 pointer-events-none"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                <Briefcase size={24} className="text-yellow-400" />
                            </div>
                            <h2 className="text-2xl font-black">Tugas Pokok</h2>
                        </div>
                        <p className="text-blue-100 leading-relaxed text-lg bg-white/5 p-6 rounded-xl border border-white/10">
                            Menyelenggarakan administrasi kesekretariatan dan administrasi keuangan,
                            mendukung pelaksanaan tugas dan fungsi DPRD, serta menyediakan dan mengoordinasikan
                            tenaga ahli yang diperlukan oleh DPRD dalam melaksanakan fungsinya sesuai
                            dengan kemampuan keuangan daerah.
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                <Layers size={24} className="text-yellow-400" />
                            </div>
                            <h2 className="text-2xl font-black">Fungsi</h2>
                        </div>
                        <div className="space-y-4">
                            {[
                                "Penyelenggaraan administrasi kesekretariatan DPRD.",
                                "Penyelenggaraan administrasi keuangan DPRD.",
                                "Fasilitasi penyelenggaraan rapat DPRD.",
                                "Penyediaan dan pengoordinasian tenaga ahli yang diperlukan."
                            ].map((fungsi, index) => (
                                <div key={index} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <ChevronRight size={18} className="text-yellow-400 shrink-0" />
                                    <span className="text-blue-50 font-medium">{fungsi}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Struktur Organisasi Section */}
            <div className="mb-12">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0a2744]/5 rounded-full mb-4">
                        <Users size={32} className="text-[#0a2744]" />
                    </div>
                    <h2 className="text-3xl font-black text-[#0a2744] mb-2">Struktur Organisasi</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Susunan organisasi Sekretariat DPRD Kabupaten Sumbawa Barat untuk mendukung efektivitas dan efisiensi pelayanan.
                    </p>
                </div>

                {/* Tree Structure */}
                <div className="max-w-4xl mx-auto relative pt-8 pb-12">
                    {/* Level 1: Sekretaris */}
                    <div className="flex justify-center mb-12 relative">
                        <div className="bg-[#0a2744] text-white px-8 py-4 rounded-xl shadow-lg border-b-4 border-yellow-500 z-10 w-64 text-center">
                            <p className="text-xs text-blue-200 font-semibold mb-1 uppercase tracking-wider">Pimpinan</p>
                            <h3 className="font-black text-lg">Sekretaris DPRD</h3>
                        </div>
                        {/* Connecting line down from Sekretaris */}
                        <div className="absolute h-12 w-0.5 bg-gray-300 top-full left-1/2 -translate-x-1/2"></div>
                    </div>

                    {/* Level 2: Bagian-bagian */}
                    <div className="relative">
                        {/* Horizontal connecting line */}
                        <div className="absolute top-[-48px] left-[15%] right-[15%] h-0.5 bg-gray-300"></div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Bagian Umum */}
                            <div className="relative flex flex-col items-center">
                                {/* Vertical line up */}
                                <div className="absolute h-12 w-0.5 bg-gray-300 bottom-full left-1/2 -translate-x-1/2 md:block hidden"></div>
                                <div className="bg-white border text-center border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-blue-400 w-full group">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                        <Layers size={20} />
                                    </div>
                                    <h4 className="font-bold text-[#0a2744]">Bagian Umum & Keuangan</h4>
                                    <p className="text-xs text-gray-500 mt-2">Mengelola administrasi ketatausahaan, kepegawaian, perlengkapan dan keuangan.</p>
                                </div>
                            </div>

                            {/* Bagian Fasilitasi */}
                            <div className="relative flex flex-col items-center">
                                <div className="absolute h-12 w-0.5 bg-gray-300 bottom-full left-1/2 -translate-x-1/2 hidden md:block"></div>
                                <div className="bg-white border text-center border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-yellow-400 w-full group">
                                    <div className="w-10 h-10 bg-yellow-50 text-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                        <Target size={20} />
                                    </div>
                                    <h4 className="font-bold text-[#0a2744]">Bagian Fasilitasi Penganggaran & Pengawasan</h4>
                                    <p className="text-xs text-gray-500 mt-2">Memfasilitasi kegiatan penganggaran dan pengawasan dewan.</p>
                                </div>
                            </div>

                            {/* Bagian Persidangan */}
                            <div className="relative flex flex-col items-center">
                                <div className="absolute h-12 w-0.5 bg-gray-300 bottom-full left-1/2 -translate-x-1/2 hidden md:block"></div>
                                <div className="bg-white border text-center border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-green-400 w-full group">
                                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                        <Briefcase size={20} />
                                    </div>
                                    <h4 className="font-bold text-[#0a2744]">Bagian Persidangan & Perundang-undangan</h4>
                                    <p className="text-xs text-gray-500 mt-2">Menyiapkan rapat-rapat, risalah, produk hukum dan humas.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default SekretariatPage;
