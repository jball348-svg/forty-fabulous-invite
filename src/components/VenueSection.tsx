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

        {/* Description */}


        {/* Map */}
        <div className="mb-10 rounded-lg overflow-hidden shadow-2xl">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.418395527544!2d-1.1348462!3d52.6343536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4877611feb2649dd%3A0xbf1f140b5ef89567!2s45%20West%20Bottle%20Shop%20%26%20Bar!5e0!3m2!1sen!2suk!4v1771504298105!5m2!1sen!2suk" 
            width="100%" 
            height="300" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>

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
      </div>
    </section>
  );
};

export default VenueSection;
