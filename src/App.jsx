import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vitrex from './pages/Vitrex';
import Products from './pages/Products';
import Agarwood from './pages/Agarwood';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from './pages/About';
import StudioPage from './pages/StudioPage';
import Quote from './pages/Quote';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

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
