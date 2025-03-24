import React, { useState, useEffect } from 'react';

interface FormStatus {
  submitted: boolean;
  submitting: boolean;
  info: {
    error: boolean;
    msg: string | null;
  };
}

interface FormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  });
  
  const [inputs, setInputs] = useState<FormInputs>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [cooldown, setCooldown] = useState<boolean>(false);
  const [cooldownTime, setCooldownTime] = useState<number>(0);

  // Sjekk om brukeren nylig har sendt en melding
  useEffect(() => {
    const lastSubmissionTime = localStorage.getItem('lastSubmissionTime');
    if (lastSubmissionTime) {
      const timeDiff = Date.now() - parseInt(lastSubmissionTime);
      const cooldownPeriod = 5 * 60 * 1000; // 5 minutter i millisekunder
      
      if (timeDiff < cooldownPeriod) {
        setCooldown(true);
        const remainingTime = Math.ceil((cooldownPeriod - timeDiff) / 1000);
        setCooldownTime(remainingTime);
        
        // Start nedtelling
        const timer = setInterval(() => {
          setCooldownTime(prevTime => {
            if (prevTime <= 1) {
              clearInterval(timer);
              setCooldown(false);
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
        
        return () => clearInterval(timer);
      }
    }
  }, []);

  const handleServerResponse = (ok: boolean, msg: string) => {
    if (ok) {
      // Lagre tidspunktet for innsending
      localStorage.setItem('lastSubmissionTime', Date.now().toString());
      setCooldown(true);
      setCooldownTime(5 * 60); // 5 minutter i sekunder
      
      setFormStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg }
      });
      setInputs({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Start nedtelling
      const timer = setInterval(() => {
        setCooldownTime(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setCooldown(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      setFormStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg }
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
    setFormStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null }
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({
      submitted: false,
      submitting: true,
      info: { error: false, msg: null }
    });
    
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: inputs.name,
        email: inputs.email,
        subject: inputs.subject,
        message: inputs.message
      })
    })
      .then((response) => {
        if (response.status === 200) {
          handleServerResponse(true, 'Takk for din henvendelse! Jeg vil svare så snart som mulig.');
        } else {
          response.json().then((json) => {
            handleServerResponse(false, json.error || 'Det oppstod en feil. Vennligst prøv igjen senere.');
          });
        }
      })
      .catch((error) => {
        handleServerResponse(false, error.message || 'Det oppstod en feil. Vennligst prøv igjen senere.');
      });
  };

  // Formater nedtellingstiden
  const formatCooldownTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-gray-900/70 backdrop-blur-sm rounded-lg p-8">
      {/* Kontaktinformasjon til venstre */}
      <div className="md:w-1/3">
        <h2 className="text-2xl font-bold mb-6">Kontaktinformasjon</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-400">E-post</h3>
            <p className="text-gray-300">Mathiashansen2007@gmail.com</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-blue-400">Telefon</h3>
            <p className="text-gray-300">+47 466 56 797</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-blue-400">Lokasjon</h3>
            <p className="text-gray-300">Kongsberg, Norge</p>
          </div>
          
          <div className="pt-4">
            <h3 className="text-lg font-semibold text-blue-400">Sosiale Medier</h3>
            <div className="flex space-x-4 mt-2">
              <a 
                href="https://github.com/CyberHansen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                title="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              <a 
                href="https://discord.com/users/755446589669244971" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                title="Discord"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 9v1.5a.5.5 0 0 0 .5.5H12"></path>
                  <path d="M16 9v1.5a.5.5 0 0 1-.5.5H12"></path>
                  <path d="M12 16v-4"></path>
                  <path d="M20 5.5A14.5 14.5 0 0 0 12 3c-2.9 0-5.8.7-8 2.5"></path>
                  <path d="M20 5.5A14.5 14.5 0 0 1 12 8a14.5 14.5 0 0 1-8-2.5"></path>
                  <path d="M12 22c-4.2 0-7.5-1.7-9-5"></path>
                  <path d="M12 22c4.2 0 7.5-1.7 9-5"></path>
                  <path d="M19 17c-.3-1.4-1-2.7-2-3.5-.5-.4-1.2-.6-1.9-.4-.8.2-1.4.8-1.6 1.6-.3.9 0 1.7.8 2.2.9.6 1.2 1.8.8 2.8-.4.9-1.3 1.3-2.2 1.3H12"></path>
                  <path d="M12 22h-1.1c-1 0-1.9-.4-2.2-1.3-.4-1 0-2.2.8-2.8.8-.5 1.1-1.3.8-2.2-.2-.8-.8-1.4-1.6-1.6-.7-.2-1.4 0-1.9.4-1 .8-1.7 2.1-2 3.5"></path>
                </svg>
              </a>
              <a 
                href="https://www.chess.com/member/blizteer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                title="Chess.com"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 2v20h20V2H2z"></path>
                  <path d="M6 16l2.2-3.6L6 8h3l1.2-2h3.6l1.2 2h3l-2.2 4.4L18 16h-3l-1.2 2h-3.6l-1.2-2H6z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Kontaktskjema til høyre */}
      <div className="md:w-2/3">
        <h2 className="text-2xl font-bold mb-6">Send meg en melding</h2>
        
        {formStatus.submitted ? (
          <div className="bg-green-600/20 border border-green-600 rounded-md p-4 mb-6">
            <p className="text-green-400">{formStatus.info.msg}</p>
            {cooldown && (
              <p className="text-yellow-400 mt-2">
                Du kan sende en ny melding om {formatCooldownTime(cooldownTime)}.
              </p>
            )}
          </div>
        ) : formStatus.info.error ? (
          <div className="bg-red-600/20 border border-red-600 rounded-md p-4 mb-6">
            <p className="text-red-400">{formStatus.info.msg}</p>
          </div>
        ) : cooldown ? (
          <div className="bg-yellow-600/20 border border-yellow-600 rounded-md p-4 mb-6">
            <p className="text-yellow-400">
              Du må vente {formatCooldownTime(cooldownTime)} før du kan sende en ny melding. (For å forhindre spam)
            </p>
          </div>
        ) : null}
        
        <form onSubmit={handleOnSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Navn
            </label>
            <input
              id="name"
              type="text"
              value={inputs.name}
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              E-post
            </label>
            <input
              id="email"
              type="email"
              value={inputs.email}
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
              Emne
            </label>
            <input
              id="subject"
              type="text"
              value={inputs.subject}
              onChange={handleOnChange}
              required
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
              Melding
            </label>
            <textarea
              id="message"
              value={inputs.message}
              onChange={handleOnChange}
              required
              rows={5}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={formStatus.submitting || cooldown}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {formStatus.submitting ? 'Sender...' : cooldown ? `Vent (${formatCooldownTime(cooldownTime)})` : 'Send melding'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
