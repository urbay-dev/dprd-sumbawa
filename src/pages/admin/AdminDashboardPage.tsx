import React, { useEffect, useState } from 'react';
import { Newspaper, Image, Users, TrendingUp } from 'lucide-react';
import { fetchBanners, fetchBerita, fetchPimpinan } from '../../services/api';
import AdminLayout from './AdminLayout';

const AdminDashboardPage: React.FC = () => {
    const [stats, setStats] = useState({ banners: 0, berita: 0, pimpinan: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([fetchBanners(), fetchBerita(), fetchPimpinan()])
            .then(([banners, beritaRes, pimpinan]) => {
                setStats({
                    banners: banners.length,
                    berita: beritaRes.total,
                    pimpinan: pimpinan.length,
                });
            })
            .finally(() => setLoading(false));
    }, []);

    const statCards = [
        { label: 'Total Berita', value: stats.berita, icon: Newspaper, color: 'bg-blue-500', textColor: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Banner Hero', value: stats.banners, icon: Image, color: 'bg-yellow-500', textColor: 'text-yellow-600', bg: 'bg-yellow-50' },
        { label: 'Pimpinan', value: stats.pimpinan, icon: Users, color: 'bg-green-500', textColor: 'text-green-600', bg: 'bg-green-50' },
    ];

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">Selamat datang di panel <span className="font-bold text-primary">Admin DPRD Sumbawa Barat</span></p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-5 hover:shadow-lg hover:border-blue-100 hover:-translate-y-1 transition-all duration-300">
                            <div className={`w-14 h-14 ${card.bg} rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner`}>
                                <Icon size={26} className={card.textColor} />
                            </div>
                            <div>
                                <p className="text-slate-500 text-sm font-semibold">{card.label}</p>
                                <p className="text-2xl font-black text-gray-800 mt-0.5">
                                    {loading ? (
                                        <span className="inline-block w-8 h-6 bg-gray-200 animate-pulse rounded" />
                                    ) : (
                                        card.value
                                    )}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                        <TrendingUp size={18} className="text-primary" />
                    </div>
                    <h2 className="font-bold text-slate-800 text-base">Aksi Cepat</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { href: '/admin/berita', label: '+ Tambah Berita', desc: 'Tambah berita baru ke website' },
                        { href: '/admin/banner', label: '+ Tambah Banner', desc: 'Tambah slide di hero carousel' },
                        { href: '/admin/pimpinan', label: '+ Tambah Pimpinan', desc: 'Tambah data pimpinan DPRD' },
                    ].map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="block border border-slate-200 hover:border-primary/50 shadow-sm hover:shadow-md rounded-xl p-5 transition-all bg-slate-50 hover:bg-white group"
                        >
                            <p className="font-bold text-primary text-sm mb-1">{item.label}</p>
                            <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                        </a>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboardPage;
