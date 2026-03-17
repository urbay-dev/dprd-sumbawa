import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BeritaPage from './pages/BeritaPage';
import PimpinanPage from './pages/PimpinanPage';

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

import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/berita" element={<BeritaPage />} />
          <Route path="/berita/:slug" element={<BeritaPage />} />
          <Route path="/pimpinan" element={<PimpinanPage />} />
          <Route path="/akd" element={<PlaceholderPage title="Alat Kelengkapan Dewan (AKD)" />} />
          <Route path="/akd/:slug" element={<PlaceholderPage title="Komisi DPRD" />} />
          <Route path="/fraksi" element={<PlaceholderPage title="Fraksi DPRD" />} />
          <Route path="/fraksi/:slug" element={<PlaceholderPage title="Fraksi" />} />
          <Route path="/sekretariat" element={<PlaceholderPage title="Sekretariat DPRD" />} />
          <Route path="/ppid" element={<PlaceholderPage title="PPID - Keterbukaan Informasi Publik" />} />
          <Route path="/ppid/:slug" element={<PlaceholderPage title="PPID" />} />
          <Route path="/agenda" element={<PlaceholderPage title="Agenda Kegiatan" />} />
          <Route path="/galeri" element={<PlaceholderPage title="Galeri Foto" />} />
          <Route path="/video" element={<PlaceholderPage title="Berita Video" />} />
          <Route path="/forum" element={<PlaceholderPage title="Forum Warga" />} />
          <Route path="/renstra" element={<PlaceholderPage title="Renstra DPRD" />} />
          <Route path="/prolegda" element={<PlaceholderPage title="Program Legislasi Daerah" />} />
          <Route path="/delegasi" element={<PlaceholderPage title="Delegasi Masyarakat" />} />
          <Route path="/ereses" element={<PlaceholderPage title="eReses - Reses Anggota Dewan" />} />
          <Route path="/jdih" element={<PlaceholderPage title="JDIH - Jaringan Dokumentasi Hukum" />} />
          <Route path="/portal" element={<PlaceholderPage title="Portal Sumbawa Barat" />} />
          <Route path="*" element={<PlaceholderPage title="404 - Halaman Tidak Ditemukan" />} />
        </Routes>
      </div>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
