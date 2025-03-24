const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Hvem er jeg?</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Jeg er Mathias, en 17-årig IT-student fra Kongsberg med en sterk lidenskap for cybersikkerhet og programmering. 
          Helt siden jeg var liten har jeg vært fascinert av teknologi og hvordan ting fungerer. Denne nysgjerrigheten 
          ledet meg til å utforske IT-verdenen, og jeg har aldri sett meg tilbake.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Under koronapandemien begynte jeg å lære meg koding på egenhånd. Det startet med enkle HTML og CSS prosjekter, 
          men etterhvert utvidet jeg kunnskapen min til JavaScript, Python og SQL. Nå på videregående skole har jeg 
          fordypet meg i informasjonsteknologi, og jeg har blitt spesielt interessert i cybersikkerhet.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Jeg trives med å løse komplekse problemer og lære nye teknologier. Min tilnærming til utvikling er alltid 
          med sikkerhet i tankene - jeg mener at god kode ikke bare skal være effektiv, men også trygg.
        </p>
      </div>

      <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Mine interesser</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          <div>
            <h3 className="text-xl font-bold mb-3 text-blue-300">Cybersikkerhet</h3>
            <p className="text-gray-300 leading-relaxed">
              Jeg er fascinert av alle aspekter ved cybersikkerhet - fra penetrasjonstesting og sårbarhetsanalyse til 
              kryptografi og sikker kodeskriving. Jeg deltar regelmessig i CTF-konkurranser (Capture The Flag) for å 
              forbedre ferdighetene mine og holder meg oppdatert på de nyeste sikkerhetstrendene.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3 text-blue-300">Programmering</h3>
            <p className="text-gray-300 leading-relaxed">
              Jeg elsker å kode! Mine favorittspråk er Python og C#, men jeg liker også å jobbe med webteknologier som 
              React. Jeg liker utfordringen med å skrive elegant, effektiv kode som løser reelle problemer. Mine personlige 
              prosjekter varierer fra verktøy for daglig bruk til mer komplekse applikasjoner.
            </p>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-3 text-blue-300">Gaming</h3>
          <p className="text-gray-300 leading-relaxed">
            Jeg liker å spille dataspill på fritiden, spesielt strategispill og FPS-spill. Gaming er ikke bare 
            underholdende, men har også hjulpet meg å bygge problemløsningsferdigheter og reflekser. Dessuten har det 
            gitt meg innsikt i hvordan spillutviklere tenker.
          </p>
        </div>
      </div>

      <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-blue-400">Fremtidsplaner</h2>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Etter videregående har jeg planer om å studere informasjonssikkerhet på høyere nivå. Mitt mål er å bli en 
          etisk hacker eller sikkerhetsekspert, hvor jeg kan bruke kunnskapen min til å beskytte systemer og data mot 
          ondsinnede aktører.
        </p>
        <p className="text-gray-300 mb-4 leading-relaxed">
          Jeg ønsker å jobbe i et miljø hvor jeg kan fortsette å lære og vokse, enten det er i et cybersikkerhetsfirma, 
          en IT-avdeling i en større organisasjon, eller kanskje til og med starte mitt eget sikkerhetskonsulentfirma en dag.
        </p>
        <p className="text-gray-300 leading-relaxed">
          På kort sikt fokuserer jeg på å fullføre utdanningen min med gode resultater, bygge en sterk portefølje av 
          prosjekter, og kanskje få noen sikkerhetssertifiseringer. Jeg er også interessert i å delta i flere 
          hackathons og cybersikkerhetskonkurranser for å utfordre meg selv og møte likesinnede.
        </p>
      </div>
    </div>
  );
};

export default About;
