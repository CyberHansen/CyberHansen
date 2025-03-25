import React, { useState } from 'react';
import { X, Download, FileArchive, Github } from 'lucide-react';
import toolerImage from '../tooler_icon.png';
import toolerDetailImage from '../tooler.png';
import CyberVaultImage from '../Cybervault.png';

// Prosjekttype definisjon
interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: any;
  detailImage?: any;
  versions: {
    version: string;
    releaseDate: string;
    description: string;
    exeDownloadUrl?: string;
    zipDownloadUrl?: string;
    githubUrl?: string;
  }[];
}

// Oppdaterte prosjekter basert på brukerens egne prosjekter
const projectsData: Project[] = [
  {
    id: "tooler",
    title: "Tooler",
    shortDescription: "En enkel python app som gir det masse tools du kan bruke for å gjøre din dag på internette lettere.",
    description: "Tooler er en allsidig Python-applikasjon som tilbyr en rekke nyttige verktøy for å forenkle din digitale hverdag. Appen inkluderer funksjoner for å hjelpe deg med vanlige oppgaver på internett og gjøre din databruk mer effektiv og sikker.",
    image: toolerImage,
    detailImage: toolerDetailImage,
    versions: [
      {
        version: "2.5",
        releaseDate: "2024-02-20",
        description: "Den nyeste versjonen med forbedret Launch time og en ekte installer",
        exeDownloadUrl: "https://github.com/CyberHansen/Tooler-apps/releases/download/Tooler-2.5/Tooler_Setup.exe",
        zipDownloadUrl: "https://github.com/CyberHansen/Tooler-apps/archive/refs/tags/Tooler-2.5.zip",
        githubUrl: "https://github.com/CyberHansen/Tooler-apps"
      },
      {
        version: "2.0",
        releaseDate: "2024-02-20",
        description: "Den nyeste versjonen med forbedret brukergrensesnitt og flere funksjoner",
        exeDownloadUrl: "https://github.com/CyberHansen/Tooler-apps/releases/download/Tooler-2.0/Tooler.2.0.exe",
        zipDownloadUrl: "https://github.com/CyberHansen/Tooler-apps/archive/refs/tags/Tooler-2.0.zip",
        githubUrl: "https://github.com/CyberHansen/Tooler-apps"
      },
      {
        version: "1.0",
        releaseDate: "2023-09-15",
        description: "Daglige app - Den første versjonen med grunnleggende funksjonalitet",
        exeDownloadUrl: "https://github.com/CyberHansen/Tooler-apps/releases/download/Daglig-app/Din-Daglige-App.exe",
        zipDownloadUrl: "https://github.com/CyberHansen/Tooler-apps/archive/refs/tags/Daglig-app.zip",
        githubUrl: "https://github.com/CyberHansen/Tooler-apps"
      }
    ]
  },
  {
    id: "cybervault",
    title: "CyberVault",
    shortDescription: "En pen, morsom, sikker og rask app i C# som er ment for brukere til å lagre passord og bruke som authenticator.",
    description: "CyberVault er en sikker passordlagrings- og autentiseringsapp utviklet i C#. Applikasjonen er designet med fokus på både sikkerhet og brukervennlighet, og tilbyr en elegant løsning for å håndtere dine digitale legitimasjoner. Med CyberVault kan du trygt lagre passord og bruke den som en autentiseringsapp for to-faktor autentisering.",
    image: CyberVaultImage,
    versions: [
      {
        version: "0.9 Beta",
        releaseDate: "2024-03-01",
        description: "Beta-versjon under utvikling med grunnleggende funksjonalitet for passordlagring og autentisering",
        exeDownloadUrl: "https://github.com/CyberNilsen/CyberVault/releases/download/Password-Manager/CyberVaultInstaller.exe",
        zipDownloadUrl: "https://github.com/CyberNilsen/CyberVault/archive/refs/tags/Password-Manager.zip",
        githubUrl: "https://github.com/CyberNilsen/CyberVault"
      }
    ]
  },
  {
    id: "photoshare",
    title: "PhotoShare",
    shortDescription: "Et skole prosjekt som gikk på å lage en sikker login side, her jeg gikk jeg fult ut og lagde en liten kopi av Instagram.",
    description: "PhotoShare er et skoleprosjekt som fokuserer på sikker innlogging og autentisering. Prosjektet ble utvidet til å bli en mini-versjon av Instagram, med funksjonalitet for bildedeling og sosial interaksjon. Dette demonstrerer både sikkerhetskompetanse og frontend/backend-utvikling.",
    image: "Bilde Kommer",
    versions: [
      {
        version: "1.0",
        releaseDate: "2024-02-15",
        description: "Første versjon av PhotoShare med sikker innlogging og grunnleggende bildedelingsfunksjonalitet",
        githubUrl: "https://github.com/CyberHansen/Login-utvikling"
      }
    ]
  }
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Funksjon for å åpne prosjektdetaljer
  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden'; // Hindrer scrolling når modal er åpen
  };

  // Funksjon for å lukke prosjektdetaljer
  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto'; // Gjenoppretter scrolling
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
      <div id="stars-container" className="fixed inset-0 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">Mine Prosjekter</h1>
        
        {/* Prosjektgrid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div 
              key={project.id}
              className="bg-gray-900/70 backdrop-blur-sm rounded-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-contain bg-gray-800 p-2 rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 h-16">{project.shortDescription}</p>
                <button
                  onClick={() => openProjectDetails(project)}
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors w-full"
                >
                  Lær mer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GitHub-lenke for flere prosjekter */}
      <div className="text-center mt-12 text-gray-400 text-sm">
        <p>
          Flere små prosjekter ligger på min{' '}
          <a 
            href="https://github.com/CyberHansen" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            GitHub
          </a>
        </p>
      </div>

      {/* Prosjektdetaljer Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
              <button 
                onClick={closeProjectDetails}
                className="p-1 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <img 
                src={selectedProject.detailImage || selectedProject.image} 
                alt={selectedProject.title} 
                className="w-full h-64 object-contain bg-gray-800 p-4 rounded-lg mb-6"
              />
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Beskrivelse</h3>
                <p className="text-gray-300">{selectedProject.description}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Versjoner</h3>
                <div className="space-y-6">
                  {selectedProject.versions.map((version, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">Versjon {version.version}</h4>
                        <span className="text-sm text-gray-400">{version.releaseDate}</span>
                      </div>
                      <p className="text-gray-300 mb-4">{version.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {version.exeDownloadUrl && (
                          <a 
                            href={version.exeDownloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 bg-green-700 hover:bg-green-800 rounded-md transition-colors text-sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Last ned EXE
                          </a>
                        )}
                        {version.zipDownloadUrl && (
                          <a 
                            href={version.zipDownloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 bg-blue-700 hover:bg-blue-800 rounded-md transition-colors text-sm"
                          >
                            <FileArchive className="w-4 h-4 mr-2" />
                            Last ned ZIP
                          </a>
                        )}
                        {version.githubUrl && (
                          <a 
                            href={version.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 bg-purple-700 hover:bg-purple-800 rounded-md transition-colors text-sm"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Se på GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
