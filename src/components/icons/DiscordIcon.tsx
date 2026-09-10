const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" fill="#5865F2" />
    <rect x="10" y="11" width="28" height="22" rx="8" fill="#fff" />
    <path d="M30 33 L39 41 L35 31 Z" fill="#fff" />
    <circle cx="19" cy="21" r="2.4" fill="#5865F2" />
    <circle cx="29" cy="21" r="2.4" fill="#5865F2" />
    <path d="M18 26c2 2.4 10 2.4 12 0" stroke="#5865F2" strokeWidth="2.4" strokeLinecap="round" fill="none" />
  </svg>
);

export default DiscordIcon;
