import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

// Lazy-load non-critical routes to reduce initial bundle size
const Vitrex = lazy(() => import('./pages/Vitrex'));
const Products = lazy(() => import('./pages/Products'));
const Agarwood = lazy(() => import('./pages/Agarwood'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const About = lazy(() => import('./pages/About'));
const StudioPage = lazy(() => import('./pages/StudioPage'));
const Quote = lazy(() => import('./pages/Quote'));

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.startsWith('/studio')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

function AppContent() {
  const location = useLocation();
  const isStudio = location.pathname.startsWith('/studio');

  return (
    <div className="min-h-screen flex flex-col w-full relative">
      {!isStudio && <Navbar />}
      <main className="flex-grow w-full">
        <Suspense fallback={<div className="min-h-screen bg-brand-cream" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vitrex" element={<Vitrex />} />
            <Route path="/products" element={<Products />} />
            <Route path="/agarwood" element={<Agarwood />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/studio/*" element={<StudioPage />} />
          </Routes>
        </Suspense>
      </main>
      {!isStudio && <Footer />}
      {!isStudio && <BackToTop />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
