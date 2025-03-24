import React, { useState, useEffect } from 'react';
import { Github, Mail, MessageCircle, ArrowRight } from 'lucide-react';

function StarryBackground() {
  useEffect(() => {
    const createStars = () => {
      const container = document.getElementById('stars-container');
      if (!container) return;
      
      // Clear existing stars
      container.innerHTML = '';
      
      // Create new stars
      const numberOfStars = 100;
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animation duration and delay
        star.style.setProperty('--duration', `${3 + Math.random() * 4}s`);
        star.style.setProperty('--delay', `${Math.random() * 2}s`);
        
        container.appendChild(star);
      }
    };

    createStars();
    window.addEventListener('resize', createStars);
    
    return () => {
      window.removeEventListener('resize', createStars);
    };
  }, []);

  return <div id="stars-container" className="fixed inset-0 pointer-events-none" />;
}

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <StarryBackground />
      
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold">Mathias</span>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-blue-400 transition-colors">Hjem</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Om meg</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Prosjekter</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Kontakt meg</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=300&h=300"
              alt="Mathias Profile"
              className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-blue-500 shadow-lg"
            />
          </div>
          
          <h1 className="text-5xl font-bold mb-6">
            Hei, Mathias her 👋
          </h1>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-16">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="mailto:your.email@example.com"
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a 
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>

          {/* Timeline */}
          <div className="max-w-2xl mx-auto mb-24">
            <div className="border-l-2 border-blue-500">
              <div className="relative pl-8 pb-12">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0"></div>
                <h3 className="text-xl font-bold mb-2">Frontend Developer</h3>
                <p className="text-gray-400">2023 - Nåværende</p>
                <p className="mt-2">Jobber som frontend utvikler med fokus på React og moderne webutvikling.</p>
              </div>
              <div className="relative pl-8 pb-12">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0"></div>
                <h3 className="text-xl font-bold mb-2">IT Konsulent</h3>
                <p className="text-gray-400">2021 - 2023</p>
                <p className="mt-2">Jobbet som IT konsulent med fokus på systemutvikling og kundeløsninger.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0"></div>
                <h3 className="text-xl font-bold mb-2">Bachelor i Informatikk</h3>
                <p className="text-gray-400">2018 - 2021</p>
                <p className="mt-2">Fullførte bachelor i informatikk med spesialisering i webutvikling.</p>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <h2 className="text-3xl font-bold mb-12">Sjekk ut mine prosjekter</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Project 1 */}
            <div className="bg-gray-900 rounded-lg p-6 transform hover:-translate-y-2 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400&h=300" 
                alt="Project 1" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">E-commerce Platform</h3>
              <p className="text-gray-400 mb-4">En moderne e-commerce løsning bygget med React og Node.js</p>
              <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300">
                Se mer <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            {/* Project 2 */}
            <div className="bg-gray-900 rounded-lg p-6 transform hover:-translate-y-2 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=400&h=300" 
                alt="Project 2" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Task Manager</h3>
              <p className="text-gray-400 mb-4">Et effektivt prosjektstyringsverktøy med real-time oppdateringer</p>
              <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300">
                Se mer <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            {/* Project 3 */}
            <div className="bg-gray-900 rounded-lg p-6 transform hover:-translate-y-2 transition-all duration-300">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=300" 
                alt="Project 3" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
              <p className="text-gray-400 mb-4">Et omfattende dashboard for datavisualisering og analyse</p>
              <a href="#" className="inline-flex items-center text-blue-400 hover:text-blue-300">
                Se mer <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;