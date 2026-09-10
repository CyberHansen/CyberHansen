const skillGroups = [
  {
    title: 'Programmering',
    skills: ['C#', 'Python', '.NET / Avalonia UI'],
  },
  {
    title: 'Sikkerhet & nettverk',
    skills: ['Network Security', 'Nettverksovervåkning', 'Windows Server', 'Active Directory', 'Proxmox', 'Linux', 'macOS'],
  },
  {
    title: 'Annet',
    skills: ['Prompt engineering', 'Prosjektledelse', 'Kundeservice'],
  },
];

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Hvem er jeg?</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Jeg er Mathias, en 1.-årsstudent i digital infrastruktur og cybersikkerhet ved NTNU Gjøvik, opprinnelig
          fra Vestfossen. Helt siden jeg var liten har jeg vært fascinert av teknologi og hvordan ting fungerer.
          Det er den nysgjerrigheten som fortsatt driver meg.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Jeg begynte å lære meg koding på egenhånd, startet med enkle HTML- og CSS-prosjekter, og utvidet
          etterhvert kunnskapen til Python, C# og nettverk. På videregående fordypet jeg meg i informasjonsteknologi,
          med et praksisopphold hos Kongsberg Defence & Aerospace som ga meg et reelt innblikk i hvordan
          cybersikkerhet praktiseres, fra sikker kodeskriving til fysiske sikkerhetssystemer som adgangskontroll
          og perimetersikring.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Sommeren 2026 ledet jeg design og utrulling av en nettverksinfrastruktur på 27–30 lokasjoner for
          Eiker Energi AS, fra ruting og sikkerhetskonfigurasjon til en egenutviklet overvåkingsapp for
          sanntidsdeteksjon av tilkoblings- og statusavvik. Min tilnærming til utvikling er alltid med sikkerhet
          i tankene: jeg mener god kode ikke bare skal være effektiv, men også trygg.
        </p>
      </div>

      <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Ferdigheter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-bold mb-3 text-blue-300">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="text-sm px-3 py-1 bg-gray-800 text-gray-300 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Mine interesser</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-xl font-bold mb-3 text-blue-300">Cybersikkerhet</h3>
            <p className="text-gray-300 leading-relaxed">
              Jeg er fascinert av alle aspekter ved cybersikkerhet - fra nettverkssikkerhet og sårbarhetsanalyse
              til overvåkning og sikker infrastruktur. Jeg holder meg oppdatert på de nyeste sikkerhetstrendene
              og liker å teste egen kunnskap i praktiske prosjekter.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 text-blue-300">Programmering</h3>
            <p className="text-gray-300 leading-relaxed">
              Jeg elsker å kode! Mine favorittspråk er Python og C#, men jeg liker også å jobbe med webteknologier
              som React. Jeg liker utfordringen med å skrive elegant, effektiv kode som løser reelle problemer.
              Mine personlige prosjekter varierer fra verktøy for daglig bruk til apper folk faktisk bruker.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-3 text-blue-300">Gaming</h3>
          <p className="text-gray-300 leading-relaxed">
            Jeg liker å spille dataspill på fritiden, spesielt strategispill og FPS-spill. Gaming er ikke bare
            underholdende, men har også hjulpet meg å bygge problemløsningsferdigheter og reflekser.
          </p>
        </div>
      </div>

      <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Fremtidsplaner</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Jeg studerer nå digital infrastruktur og cybersikkerhet ved NTNU Gjøvik. Mitt mål er å bli en
          sikkerhetsekspert innen nettverk og infrastruktur, hvor jeg kan bruke kunnskapen min til å beskytte
          systemer og data mot ondsinnede aktører.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Jeg ønsker å jobbe i et miljø hvor jeg kan fortsette å lære og vokse, enten det er i et
          cybersikkerhetsfirma, en IT-avdeling i en større organisasjon, eller ved å fortsette å bygge egne
          produkter slik jeg gjorde med AkademiTrack.
        </p>
        <p className="text-gray-300 leading-relaxed">
          På kort sikt fokuserer jeg på å bygge en solid faglig grunnmur gjennom studiet, holde på prosjektene
          mine, og fortsette å ta praktisk erfaring med meg fra ting som nettverksprosjektet hos Eiker Energi.
        </p>
      </div>
    </div>
  );
};

export default About;
