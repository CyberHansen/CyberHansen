import React, { useState, useEffect } from 'react';
import { Github, Mail, ArrowRight, Linkedin, MessageSquare } from 'lucide-react';
import Projects from './components/Projects';
import Contact from './components/Contact';
import About from './components/About';
import Snake from './components/Snake';
import profileImage from './meg.png';
import toolerImage from './tooler_icon.png';
import CyberVaultImage from './Cybervault.png';

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
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Funksjon for å navigere mellom sider
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <StarryBackground />
      
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold">Mathias</span>
            <div className="flex space-x-8">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }}
                className={`transition-colors ${currentPage === 'home' ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}
              >
                Hjem
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentPage('projects'); }}
                className={`transition-colors ${currentPage === 'projects' ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}
              >
                Prosjekter
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }}
                className={`transition-colors ${currentPage === 'about' ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}
              >
                Om meg
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}
                className={`transition-colors ${currentPage === 'contact' ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}
              >
                Kontakt meg
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hovedinnhold - Viser riktig side basert på currentPage */}
      {currentPage === 'home' && (
        <main className="pt-40 pb-24 px-4 flex-grow">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
              <img
                src={profileImage}
                alt="Mathias Profile"
                className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-blue-500 shadow-lg object-cover object-top"
                style={{ objectPosition: '50% 10%' }}
              />
            </div>
            
            <h1 className="text-5xl font-bold mb-8">
              Hei, Mathias her! 👋
            </h1>
            
            <p className="text-xl text-gray-300 mt-4 mb-12 max-w-2xl mx-auto leading-relaxed">
              Jeg er en IT-student med lidenskap for cybersikkerhet og utvikling. 
              Med erfaring innen HTML, CSS, JavaScript, Python og SQL, jobber jeg nå med 
              å utvikle sikre og effektive applikasjoner i C# og Python. Kontakt meg da vel!
            </p>
            <h6 className="text-sm text-gray-500 italic mt-4 mb-12 font-light">Kan du finne hemmeligheten på siden min?</h6>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-24">
              <a 
                href="https://github.com/CyberHansen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                title="Kontakt meg"
              >
                <Mail className="w-6 h-6" />
              </a>
              <a 
                href="https://discordapp.com/users/755446589669244971"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <MessageSquare className="w-6 h-6" />
              </a>
            </div>

            {/* Timeline */}
            <div className="max-w-2xl mx-auto mb-32">
              <div className="border-l-2 border-blue-500">
                <div className="relative pl-8 pb-16">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0"></div>
                  <h3 className="text-xl font-bold mb-2">Korona tiden</h3>
                  <p className="text-gray-400">2019 - 2022</p>
                  <p className="mt-2">Her startet alt sammen og jeg begynnte å lære kode veldig sagte.</p>
                </div>
                <div className="relative pl-8 pb-16">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0"></div>
                  <h3 className="text-xl font-bold mb-2">VG1 - Informasjonsteknologi</h3>
                  <p className="text-gray-400">2022 - 2023</p>
                  <p className="mt-2">lagde enkle nettsider og ble veldig fort skarp i html og css ettersom jeg ble mer og mer glad i det. Jeg startet også her med python her og CyberSecurity ble det yrke jeg ville gå for.</p>
                </div>
                <div className="relative pl-8">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-0"></div>
                  <h3 className="text-xl font-bold mb-2">VG2 - Informasjonsteknologi</h3>
                  <p className="text-gray-400">2023 - Nåværende</p>
                  <p className="mt-2">blitt veldig skarp i html, css, js, python, sql og jobber nå hardt med å utvikle flere apper i C# og python, som er både sikkre men også effektive. ( Jeg elsker cybersikkerhet )</p>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <h2 className="text-3xl font-bold mb-16">Sjekk ut mine prosjekter</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-32">
              {/* Project 1 */}
              <div className="bg-gray-900 rounded-lg p-6 transform hover:-translate-y-2 transition-all duration-300">
                <img 
                  src={toolerImage}
                  alt="Project 1" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">Tooler</h3>
                <p className="text-gray-400 mb-4">En enkel python app som gir det masse tools du kan bruke for å gjøre din dag på internette lettere.</p>
                <button 
                  onClick={() => setCurrentPage('projects')}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300"
                >
                  Se mer <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>

              {/* Project 2 */}
              <div className="bg-gray-900 rounded-lg p-6 transform hover:-translate-y-2 transition-all duration-300">
                <img 
                  src={CyberVaultImage} 
                  alt="Project 2" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">CyberVault</h3>
                <p className="text-gray-400 mb-4">En pen, morsom, sikker og rask app i C# som er ment for brukere til å lagre passord og bruke som authenticator. - Under utvikling</p>
                <button 
                  onClick={() => setCurrentPage('projects')}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300"
                >
                  Se mer <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>

              {/* Project 3 */}
              <div className="bg-gray-900 rounded-lg p-6 transform hover:-translate-y-2 transition-all duration-300">
                <img 
                  src="Bilde Kommer" 
                  alt="Bilde Kommer" 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold mb-2">PhotoShare</h3>
                <p className="text-gray-400 mb-4">et skole prosjekt som gikk på å lage en sikker login side, her jeg gikk jeg fult ut og lagde en liten kopi av Instagram.</p>
                <button 
                  onClick={() => setCurrentPage('projects')}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300"
                >
                  Se mer <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Prosjektside */}
      {currentPage === 'projects' && <Projects />}

      {/* Om meg side */}
      {currentPage === 'about' && (
        <div className="pt-40 pb-24 px-4 flex-grow">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Om Meg</h1>
            <About />
          </div>
        </div>
      )}

      {/* Kontakt side */}
      {currentPage === 'contact' && (
        <div className="pt-40 pb-24 px-4 flex-grow">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">Kontakt Meg</h1>
            <Contact />
          </div>
        </div>
      )}

      {/* Hemmelig side - Snake spill */}
      {currentPage === 'secret' && (
        <div className="pt-40 pb-24 px-4 flex-grow">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center">🎇🎆Du fant den hemmlige siden🎆🎇</h1>
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg p-8">
              <Snake />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm py-8 mt-auto border-t border-gray-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Venstre kolonne */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-3 text-white/90">Mathias</h3>
              <p className="text-gray-400 text-sm">Utvikler, elev og jeg bare elsker cybersikkerhet.</p>
            </div>
            
            {/* Midtre kolonne */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-3 text-white/90">Navigasjon</h3>
              <div className="flex justify-center space-x-6">
                <div className="space-y-2">
                  <div><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Hjem</a></div>
                  <div><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Om meg</a></div>
                </div>
                <div className="space-y-2">
                  <div><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('projects'); }} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Prosjekter</a></div>
                  <div><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Kontakt meg</a></div>
                </div>
              </div>
            </div>
            
            {/* Høyre kolonne */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold mb-3 text-white/90">Kontakt</h3>
              <div className="flex justify-center md:justify-end space-x-4">
                <a 
                  href="https://github.com/CyberHansen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  title="Kontakt meg"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800/30 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-2 md:mb-0"> {new Date().getFullYear()} Mathias</p>
            
            {/* Skjult lenke - subtilt plassert */}
            <div className="text-center">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setCurrentPage('secret'); }}
                className="text-gray-400 hover:text-blue-400 transition-colors text-xs opacity-30 hover:opacity-100"
                title="Hemmelig side"
              >
                ✧ Finn hemmeligheten ✧
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;