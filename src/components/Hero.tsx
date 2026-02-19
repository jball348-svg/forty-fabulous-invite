import heroBg from "@/assets/hero-bg.jpg";

// Minimal SVG wine glass icon for decorative use
const WineGlassIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 60 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M10 8 Q10 42 30 52 Q50 42 50 8 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="30" y1="52" x2="30" y2="82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="82" x2="44" y2="82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BottleIcon = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 40 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M17 4 L17 16 Q6 24 6 44 L6 84 Q6 92 20 92 Q34 92 34 84 L34 44 Q34 24 23 16 L23 4 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <line x1="15" y1="4" x2="25" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="15" y1="8" x2="25" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 56 Q20 60 34 56" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
  </svg>
);

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero — Celebrating 40 Years"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />

      {/* Decorative side icons */}
      <div className="absolute left-6 md:left-16 top-1/2 -translate-y-1/2 opacity-20 hidden sm:block">
        <BottleIcon className="w-10 h-24 text-gold-light" />
      </div>
      <div className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 opacity-20 hidden sm:block">
        <WineGlassIcon className="w-10 h-24 text-gold-light" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {/* Year badge */}
        <p className="font-body text-gold tracking-[0.3em] uppercase text-xs md:text-sm mb-6 animate-fade-up animate-delay-100">
          1986 → 2026
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-up animate-delay-200">
          <div className="divider-gold w-16 md:w-28" />
          <WineGlassIcon className="w-5 h-8 text-gold" />
          <div className="divider-gold w-16 md:w-28" />
        </div>

        {/* Main headline */}
        <h1 className="font-display text-cream text-5xl md:text-7xl lg:text-8xl font-medium leading-tight mb-4 animate-fade-up animate-delay-200">
          Celebrating<br />
          <em className="italic text-gold-light">40 Years</em>
        </h1>

        {/* Tagline */}
        <p className="font-body text-cream/70 text-lg md:text-xl font-light tracking-wide mb-10 animate-fade-up animate-delay-300">
          Born in 1986. Aged to perfection.
        </p>

        {/* Divider */}
        <div className="divider-gold max-w-xs mx-auto mb-10 animate-fade-up animate-delay-400" />

        {/* Sub-invite */}
        <p className="font-display italic text-cream/85 text-xl md:text-2xl animate-fade-up animate-delay-400">
          You're warmly invited to raise a glass
        </p>

        {/* CTA */}
        <div className="mt-10 animate-fade-up animate-delay-500">
          <a
            href="#rsvp"
            className="inline-block bg-gold text-wine-dark font-body font-semibold uppercase tracking-[0.2em] text-sm px-10 py-4 hover:bg-gold-light transition-colors duration-300"
          >
            RSVP Now
          </a>
        </div>

        {/* Scroll hint */}
        <p className="mt-12 text-cream/40 font-body text-xs uppercase tracking-widest animate-fade-up animate-delay-600">
          Scroll to explore ↓
        </p>
      </div>
    </section>
  );
};

export default Hero;
