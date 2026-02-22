import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Philosophy from '../components/Philosophy';
import Protocol from '../components/Protocol';

function Home() {
    return (
        <>
            <Hero />
            <Features />
            <Philosophy />
            <Protocol />
        </>
    );
}

export default Home;
