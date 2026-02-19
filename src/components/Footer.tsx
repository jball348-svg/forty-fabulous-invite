// Tiny wine drop SVG for footer decoration
const WineDrop = () => (
  <svg
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-3 h-4 inline-block"
    aria-hidden="true"
  >
    <path
      d="M10 2 Q18 12 18 18 A8 8 0 0 1 2 18 Q2 12 10 2 Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="currentColor"
      fillOpacity="0.3"
    />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-wine-dark py-12 px-6 text-center">
      {/* Gold divider at top */}
      <div className="divider-gold max-w-[200px] mx-auto mb-8 opacity-50" />

      {/* Wine drop icon */}
      <span className="text-gold/60 mb-6 block">
        <WineDrop />
      </span>

      {/* Year range */}
      <p className="font-display italic text-gold/70 text-xl mb-3">
        1986 → 2026
      </p>

      {/* Tagline */}
      <p className="font-body text-cream/40 text-xs uppercase tracking-[0.25em] mb-6">
        Made with love
      </p>

      {/* Divider */}
      <div className="divider-gold max-w-[80px] mx-auto mb-6 opacity-30" />

      {/* Links */}
      <div className="flex items-center justify-center gap-4 text-cream/30 font-body text-xs">
        <a
          href="https://www.45westbar.co.uk/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gold/60 transition-colors"
        >
          45 West Bar
        </a>
        <span>·</span>
        <a
          href="mailto:john@fairfax-ball.com"
          className="hover:text-gold/60 transition-colors"
        >
          john@fairfax-ball.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
