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

      {/* Simple message */}
      <p className="font-body text-cream/60 text-lg">
        See you soon!
      </p>
    </footer>
  );
};

export default Footer;
