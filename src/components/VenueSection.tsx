import { ExternalLink, MapPin } from "lucide-react";

const VenueSection = () => {
  return (
    <section
      id="venue"
      className="py-20 md:py-28 px-6 bg-wine"
      aria-label="Venue Information"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Label */}
        <p className="font-body text-gold text-xs uppercase tracking-[0.3em] mb-4">
          The Venue
        </p>

        {/* Heading */}
        <h2 className="font-display text-cream text-4xl md:text-5xl font-medium mb-4">
          45 West Bar
        </h2>
        <div className="divider-gold max-w-[120px] mx-auto mb-6" />

        {/* Address */}
        <div className="flex items-center justify-center gap-2 text-cream/70 mb-8">
          <MapPin className="w-4 h-4 text-gold flex-shrink-0" strokeWidth={1.5} />
          <p className="font-body text-sm tracking-wide">
            45 West Bar, Leicester
          </p>
        </div>

        {/* Description */}
        <p className="font-body text-cream/65 max-w-md mx-auto leading-relaxed mb-10">
          An intimate and stylish venue — the perfect setting for an evening of good wine, 
          great company, and even better stories.
        </p>

        {/* CTA Button */}
        <a
          href="https://www.45westbar.co.uk/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-transparent border border-gold text-gold font-body font-medium uppercase tracking-[0.2em] text-sm px-8 py-4 hover:bg-gold hover:text-wine-dark transition-all duration-300 group"
        >
          View Venue Website
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>

        {/* Decorative year badge */}
        <div className="mt-16 inline-block">
          <div className="border border-gold/30 rounded-full px-8 py-3">
            <p className="font-display italic text-gold/60 text-lg">
              An unforgettable evening awaits
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;
