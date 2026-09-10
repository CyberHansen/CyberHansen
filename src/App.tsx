import React, { useState, useEffect } from 'react';
import { Github, Mail, ArrowRight, Linkedin } from 'lucide-react';
import Projects from './components/Projects';
import Contact from './components/Contact';
import About from './components/About';
import DiscordIcon from './components/icons/DiscordIcon';
import profileImage from './mathias.png';
import toolerImage from './tooler_icon.png';
import cyberVaultGif from './cybervault-demo.gif';
import akademiTrackImage from './akademitrack.png';

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

const coreSkills = ['C#', 'Python', 'Network Security', 'Windows Server', 'Active Directory', 'Linux', 'Proxmox'];

const experience = [
  {
    role: 'Network & Security Project Lead',
    place: 'Eiker Energi AS',
    period: 'Mai – aug. 2026',
    bullets: [
      'Ledet design og utrulling av nettverksinfrastruktur på 27–30 lokasjoner',
      'Arkitekterte ruting- og sikkerhetskonfigurasjon for hver enkelt lokasjon',
      'Utviklet en egen overvåkingsapp for sanntidsdeteksjon av tilkoblings- og statusavvik',
    ],
  },
  {
    role: 'Praksisplass',
    place: 'Kongsberg Defence & Aerospace (KDA)',
    period: 'Okt. – nov. 2024',
    bullets: [
      'Fikk innblikk i hvordan cybersikkerhet praktiseres reelt hos en forsvarsaktør',
      'Eksponert for fysiske sikkerhetssystemer som adgangskontroll og perimetersikring',
    ],
  },
];

interface FeaturedProject {
  title: string;
  description: string;
  tags: string[];
  status?: string;
  image: string | null;
  accent: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    title: 'AkademiTrack',
    description: 'Cross-platform app (Linux, macOS, Windows) i C# og Avalonia UI for studietidsregistrering, integrert med skolens iSkole-system. Nådde rundt 250 elever mens den var aktiv, og skolen investerte 10 000 kr i et betalt abonnement. Avviklet etter at avtalen ikke gikk i boks.',
    tags: ['C#', '.NET', 'Avalonia UI'],
    status: 'Avviklet',
    image: akademiTrackImage,
    accent: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'CyberVault',
    description: 'En sikker passordlagrings- og autentiseringsapp i C#, med biometrisk innlogging og et rent, moderne grensesnitt for å håndtere digitale legitimasjoner trygt.',
    tags: ['C#', '.NET'],
    status: 'Under utvikling',
    image: cyberVaultGif,
    accent: 'from-amber-500/20 to-orange-500/20',
  },
  {
    title: 'Tooler',
    description: 'En Python-app med en samling nyttige verktøy som gjør hverdagen på internett enklere, raskere og tryggere.',
    tags: ['Python'],
    image: toolerImage,
    accent: 'from-emerald-500/20 to-teal-500/20',
  },
];

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
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigateTo('home')}
              className="text-lg font-bold tracking-tight hover:text-blue-400 transition-colors"
            >
              Mathias Hansen
            </button>
            <div className="flex items-center space-x-6 sm:space-x-8 text-sm">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
                className={`transition-colors ${currentPage === 'home' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
              >
                Hjem
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigateTo('projects'); }}
                className={`transition-colors ${currentPage === 'projects' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
              >
                Prosjekter
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigateTo('about'); }}
                className={`transition-colors ${currentPage === 'about' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
              >
                Om meg
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}
                className={`transition-colors ${currentPage === 'contact' ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
              >
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hovedinnhold - Viser riktig side basert på currentPage */}
      {currentPage === 'home' && (
        <main className="pt-36 pb-24 px-6 flex-grow">
          <div className="max-w-3xl mx-auto text-center">
            <img
              src={profileImage}
              alt="Mathias Hansen"
              className="w-32 h-32 rounded-full mx-auto mb-8 border-2 border-blue-500/60 shadow-lg shadow-blue-500/10 object-cover object-top"
              style={{ objectPosition: '50% 10%' }}
            />

            <p className="text-blue-400 font-medium mb-3 tracking-wide text-sm uppercase">
              Cybersikkerhet & Infrastruktur-student
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Hei, jeg er Mathias 👋
            </h1>

            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              1.-årsstudent i digital infrastruktur og cybersikkerhet ved NTNU Gjøvik. Jeg har ledet utrulling av
              nettverksinfrastruktur på over 30 lokasjoner, bygget en egen sanntidsovervåkingsapp, og co-utviklet
              en app som ble tatt i bruk av over 250 elever. Jeg liker å bygge sikre systemer, og forstå hvordan
              de kan brytes.
            </p>

            {/* Quick skills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {coreSkills.map((skill) => (
                <span key={skill} className="text-xs px-3 py-1 bg-gray-900 border border-gray-800 text-gray-300 rounded-full">
                  {skill}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <button
                onClick={() => navigateTo('projects')}
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors font-medium"
              >
                Se prosjektene mine <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-md transition-colors font-medium"
              >
                Kontakt meg
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4 mb-20">
              <a
                href="https://github.com/CyberHansen"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mathias-hansen-988a1a373"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}
                className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-colors"
                title="E-post"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://discordapp.com/users/755446589669244971"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full overflow-hidden hover:opacity-80 transition-opacity"
                title="Discord"
              >
                <DiscordIcon className="w-full h-full" />
              </a>
            </div>
          </div>

          {/* Experience */}
          <div className="max-w-4xl mx-auto mb-28">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-3">Erfaring</h2>
              <p className="text-gray-400">Praktisk erfaring fra nettverk, sikkerhet og forsvarsteknologi.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experience.map((job) => (
                <div key={job.role} className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/60 rounded-xl p-6 text-left">
                  <h3 className="text-lg font-bold mb-1">{job.role}</h3>
                  <p className="text-sm text-gray-400 mb-4">{job.place} · {job.period}</p>
                  <ul className="space-y-2">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="text-sm text-gray-300 leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-400">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-3">Utvalgte prosjekter</h2>
              <p className="text-gray-400">Et lite utvalg av det jeg har bygget.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <div
                  key={project.title}
                  className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/60 rounded-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 text-left flex flex-col"
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className={`w-full h-40 bg-gradient-to-br ${project.accent} flex items-center justify-center`}>
                      <span className="text-3xl font-bold text-white/80">{project.title.slice(0, 2)}</span>
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      {project.status && (
                        <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
                          {project.status}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => navigateTo('projects')}
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
                    >
                      Se mer <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
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

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-sm py-8 mt-auto border-t border-gray-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Venstre kolonne */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold mb-3 text-white/90">Mathias Hansen</h3>
              <p className="text-gray-400 text-sm">Cybersikkerhet- og infrastrukturstudent ved NTNU Gjøvik.</p>
            </div>

            {/* Midtre kolonne */}
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-3 text-white/90">Navigasjon</h3>
              <div className="flex justify-center space-x-6">
                <div className="space-y-2">
                  <div><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Hjem</a></div>
                  <div><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('about'); }} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Om meg</a></div>
                </div>
                <div className="space-y-2">
                  <div><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('projects'); }} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Prosjekter</a></div>
                  <div><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Kontakt meg</a></div>
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
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mathias-hansen-988a1a373"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  title="Kontakt meg"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800/30 pt-6 text-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Mathias Hansen</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
