import React, { useState } from 'react';
import { X, Download, FileArchive, Github } from 'lucide-react';
import toolerImage from '../tooler_icon.png';
import toolerDetailImage from '../tooler.png';
import CyberVaultImage from '../Cybervault.png';
import akademiTrackImage from '../akademitrack.png';

// Prosjekttype definisjon
interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  tags: string[];
  status?: string;
  image: any;
  detailImage?: any;
  accent: string;
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
    id: "akademitrack",
    title: "AkademiTrack",
    shortDescription: "Cross-platform app for studietidsregistrering, co-utviklet med en partner. Brukt av ~250 elever mens den var aktiv.",
    description: "AkademiTrack var en cross-platform (Linux, macOS, Windows) applikasjon bygget i C# med Avalonia UI for studietidsregistrering, integrert med skolens iSkole-register. Prosjektet ble co-utviklet sammen med en partner (Andreas), og nådde ca. 250 av skolens 300 elever mens den var i drift. Under forhandlingene sikret vi tidlig institusjonell investering (10 000 kr) fra skolen for en betalt abonnementsmodell, men avtalen gikk til slutt ikke i boks, så prosjektet er nå avviklet. Vi rakk også å undersøke aktivitetsdeteksjon på macOS for å forhindre misbruk, samt MDM-utrulling via Jamf og Mosyle.",
    tags: ["C#", ".NET", "Avalonia UI"],
    status: "Avviklet",
    image: akademiTrackImage,
    accent: "from-blue-500/20 to-cyan-500/20",
    versions: [
      {
        version: "Skoleåret 2025/2026",
        releaseDate: "Aug. 2025 – jun. 2026",
        description: "Co-utviklet og driftet gjennom skoleåret, med kontinuerlig utvidelse av funksjonalitet og et betalt abonnement forhandlet frem med skolen. Avviklet etter at avtalen med skolen ikke gikk i boks.",
      }
    ]
  },
  {
    id: "clearmic",
    title: "ClearMic",
    shortDescription: "Sanntids AI-støyfjerning for Windows, bygget i C++ på RNNoise og WASAPI.",
    description: "ClearMic er en sanntids AI-støyfjerningsapp for Windows. Den ruter mikrofonlyden din gjennom RNNoise (en AI-basert støyfjerningsmodell fra Xiph.Org) via WASAPI, og sender den rene lyden ut gjennom VB-Cable slik at den kan brukes som mikrofon i Discord, Zoom, OBS og lignende. Appen er bygget for å være så lett som mulig, med under 1% CPU-bruk, 1.5–3.3 MB RAM og under 10ms latency.",
    tags: ["C++", "RNNoise", "WASAPI", "Win32"],
    image: null,
    accent: "from-purple-500/20 to-pink-500/20",
    versions: [
      {
        version: "1.0.0",
        releaseDate: "2025",
        description: "Første stabile utgivelse med sanntids støyfjerning, justerbar lydforsterkning og et moderne mørkt grensesnitt.",
        exeDownloadUrl: "https://github.com/CyberHansen/ClearMic/releases/download/1.0.0/ClearMic-Setup-1.0.0.exe",
        zipDownloadUrl: "https://github.com/CyberHansen/ClearMic/archive/refs/tags/1.0.0.zip",
        githubUrl: "https://github.com/CyberHansen/ClearMic"
      }
    ]
  },
  {
    id: "tooler",
    title: "Tooler",
    shortDescription: "En Python-app med en samling nyttige verktøy som gjør hverdagen på internett lettere.",
    description: "Tooler er en allsidig Python-applikasjon som tilbyr en rekke nyttige verktøy for å forenkle din digitale hverdag. Appen inkluderer funksjoner for å hjelpe deg med vanlige oppgaver på internett og gjøre din databruk mer effektiv og sikker.",
    tags: ["Python"],
    image: toolerImage,
    detailImage: toolerDetailImage,
    accent: "from-emerald-500/20 to-teal-500/20",
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
    tags: ["C#", ".NET"],
    status: "Under utvikling",
    image: CyberVaultImage,
    accent: "from-amber-500/20 to-orange-500/20",
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
    shortDescription: "Et skoleprosjekt som gikk på å lage en sikker login-side, med en liten kopi av Instagram på toppen.",
    description: "PhotoShare er et skoleprosjekt som fokuserer på sikker innlogging og autentisering. Prosjektet ble utvidet til å bli en mini-versjon av Instagram, med funksjonalitet for bildedeling og sosial interaksjon. Dette demonstrerer både sikkerhetskompetanse og frontend/backend-utvikling.",
    tags: ["PHP"],
    image: null,
    accent: "from-rose-500/20 to-red-500/20",
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
    <div className="min-h-screen bg-black text-white pt-36 pb-24 px-6">
      <div id="stars-container" className="fixed inset-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-3">Mine Prosjekter</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Fra sikkerhetsverktøy til apper som ekte brukere har tatt i bruk.
          </p>
        </div>

        {/* Prosjektgrid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/60 rounded-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-44 object-contain bg-gray-950 p-2"
                />
              ) : (
                <div className={`w-full h-44 bg-gradient-to-br ${project.accent} flex items-center justify-center`}>
                  <span className="text-3xl font-bold text-white/80">{project.title.slice(0, 2)}</span>
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  {project.status && (
                    <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 mb-4 flex-grow">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
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
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                {selectedProject.status && (
                  <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full">
                    {selectedProject.status}
                  </span>
                )}
              </div>
              <button
                onClick={closeProjectDetails}
                className="p-1 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {selectedProject.detailImage || selectedProject.image ? (
                <img
                  src={selectedProject.detailImage || selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-contain bg-gray-800 p-4 rounded-lg mb-6"
                />
              ) : (
                <div className={`w-full h-40 bg-gradient-to-br ${selectedProject.accent} rounded-lg mb-6 flex items-center justify-center`}>
                  <span className="text-4xl font-bold text-white/80">{selectedProject.title.slice(0, 2)}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

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
