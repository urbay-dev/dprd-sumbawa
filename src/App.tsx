import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BeritaPage from './pages/BeritaPage';
import BeritaDetailPage from './pages/BeritaDetailPage';
import PimpinanPage from './pages/PimpinanPage';
import PimpinanTerdahuluPage from './pages/PimpinanTerdahuluPage';
import AKDPage from './pages/AKDPage';
import SekretariatPage from './pages/SekretariatPage';
import FraksiPage from './pages/FraksiPage';
import SilegdaPage from './pages/SilegdaPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminBeritaPage from './pages/admin/AdminBeritaPage';
import AdminBannerPage from './pages/admin/AdminBannerPage';
import AdminPimpinanPage from './pages/admin/AdminPimpinanPage';
import AdminMasaJabatanPage from './pages/admin/AdminMasaJabatanPage';
import AdminSekretariatPage from './pages/admin/AdminSekretariatPage';
import AdminBamusPage from './pages/admin/AdminBamusPage';
import AdminBapemperdaPage from './pages/admin/AdminBapemperdaPage';
import AdminBanggarPage from './pages/admin/AdminBanggarPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

// Generic placeholder page for unbuilt pages
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <main className="max-w-7xl mx-auto px-4 py-16 text-center">
    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
      <span className="text-primary text-3xl font-black">📄</span>
    </div>
    <h1 className="text-2xl font-black text-primary mb-2">{title}</h1>
    <p className="text-gray-500">Halaman ini sedang dalam pengembangan.</p>
    <a href="/" className="inline-block mt-6 bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-colors text-sm font-medium">
      ← Kembali ke Beranda
    </a>
  </main>
);

// Public layout wrapper (with Header + Footer)
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <Header />
    <div className="flex-1">{children}</div>
    <Footer />
  </div>
);

import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <Routes>
        {/* Admin Routes (no Header/Footer) */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/berita" element={<AdminBeritaPage />} />
        <Route path="/admin/banner" element={<AdminBannerPage />} />
        <Route path="/admin/pimpinan" element={<AdminPimpinanPage />} />
        <Route path="/admin/masa-jabatan" element={<AdminMasaJabatanPage />} />
        <Route path="/admin/sekretariat" element={<AdminSekretariatPage />} />
        <Route path="/admin/bamus" element={<AdminBamusPage />} />
        <Route path="/admin/bapemperda" element={<AdminBapemperdaPage />} />
        <Route path="/admin/banggar" element={<AdminBanggarPage />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />

        {/* Public Routes (with Header/Footer) */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/berita" element={<PublicLayout><BeritaPage /></PublicLayout>} />
        <Route path="/berita/:slug" element={<PublicLayout><BeritaDetailPage /></PublicLayout>} />
        <Route path="/pimpinan" element={<PublicLayout><PimpinanPage /></PublicLayout>} />
        <Route path="/pimpinan/terdahulu" element={<PublicLayout><PimpinanTerdahuluPage /></PublicLayout>} />
        <Route path="/akd" element={<PublicLayout><AKDPage /></PublicLayout>} />
        <Route path="/akd/:slug" element={<PublicLayout><AKDPage /></PublicLayout>} />
        <Route path="/fraksi" element={<PublicLayout><FraksiPage /></PublicLayout>} />
        <Route path="/fraksi/:slug" element={<PublicLayout><FraksiPage /></PublicLayout>} />
        <Route path="/sekretariat" element={<PublicLayout><SekretariatPage /></PublicLayout>} />
        <Route path="/silegda" element={<PublicLayout><SilegdaPage /></PublicLayout>} />
        <Route path="/silegda/:slug" element={<PublicLayout><SilegdaPage /></PublicLayout>} />
        <Route path="/ppid" element={<PublicLayout><PlaceholderPage title="PPID - Keterbukaan Informasi Publik" /></PublicLayout>} />
        <Route path="/ppid/:slug" element={<PublicLayout><PlaceholderPage title="PPID" /></PublicLayout>} />
        <Route path="/agenda" element={<PublicLayout><PlaceholderPage title="Agenda Kegiatan" /></PublicLayout>} />
        <Route path="/galeri" element={<PublicLayout><PlaceholderPage title="Galeri Foto" /></PublicLayout>} />
        <Route path="/video" element={<PublicLayout><PlaceholderPage title="Berita Video" /></PublicLayout>} />
        <Route path="/forum" element={<PublicLayout><PlaceholderPage title="Forum Warga" /></PublicLayout>} />
        <Route path="/renstra" element={<PublicLayout><PlaceholderPage title="Renstra DPRD" /></PublicLayout>} />
        <Route path="/prolegda" element={<PublicLayout><PlaceholderPage title="Program Legislasi Daerah" /></PublicLayout>} />
        <Route path="/delegasi" element={<PublicLayout><PlaceholderPage title="Delegasi Masyarakat" /></PublicLayout>} />
        <Route path="/ereses" element={<PublicLayout><PlaceholderPage title="eReses - Reses Anggota Dewan" /></PublicLayout>} />
        <Route path="/jdih" element={<PublicLayout><PlaceholderPage title="JDIH - Jaringan Dokumentasi Hukum" /></PublicLayout>} />
        <Route path="/portal" element={<PublicLayout><PlaceholderPage title="Portal Sumbawa Barat" /></PublicLayout>} />
        <Route path="*" element={<PublicLayout><PlaceholderPage title="404 - Halaman Tidak Ditemukan" /></PublicLayout>} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
