import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import LatestNews from '../components/LatestNews';
import ProgramsSection from '../components/ProgramsSection';
import VideoNews from '../components/VideoNews';
import FokusSection from '../components/FokusSection';
import InstagramSection from '../components/InstagramSection';
import AgendaSection from '../components/AgendaSection';
import GallerySection from '../components/GallerySection';
import ForumWarga from '../components/ForumWarga';
import MembersSection from '../components/MembersSection';

const HomePage: React.FC = () => {
    return (
        <main>
            {/* 1. Hero banner / carousel */}
            <HeroCarousel />

            {/* 2. Quick program links */}
            <ProgramsSection />

            {/* 3. Berita Terbaru – 3 column layout */}
            <LatestNews />

            {/* 4. Pimpinan & Anggota Dewan */}
            <MembersSection />

            {/* 5. Berita Video – YouTube grid */}
            <VideoNews />

            {/* 6. Fokus – large featured YouTube video */}
            <FokusSection />

            {/* 7. Instagram feed */}
            <InstagramSection />

            {/* 8. Gallery tabs */}
            <GallerySection />

            {/* 9. Agenda + Calendar */}
            <AgendaSection />

            {/* 10. Forum Warga */}
            <ForumWarga />
        </main>
    );
};

export default HomePage;
