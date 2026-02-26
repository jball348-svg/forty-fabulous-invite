import { Calendar, Clock, MapPin, User } from "lucide-react";

const DetailItem = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) => (
  <div className="flex items-start gap-4 group">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center mt-0.5">
      <Icon className="w-4 h-4 text-wine" strokeWidth={1.5} />
    </div>
    <div>
      <p className="font-body text-muted-foreground text-xs uppercase tracking-widest mb-0.5">{label}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-foreground font-medium hover:text-wine transition-colors underline underline-offset-4 decoration-gold/50"
        >
          {value}
        </a>
      ) : (
        <p className="font-body text-foreground font-medium">{value}</p>
      )}
    </div>
  </div>
);

const EventDetails = () => {
  return (
    <section
      id="details"
      className="py-20 md:py-28 px-6"
      style={{ background: "var(--gradient-section)" }}
      aria-label="Event Details"
    >
      <div className="max-w-2xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-12">
          <p className="font-body text-wine text-xs uppercase tracking-[0.3em] mb-4">
            The Details
          </p>
          <div className="divider-gold max-w-[120px] mx-auto" />
        </div>

        {/* Card */}
        <div className="card-elegant p-8 md:p-12">
          {/* Name highlight */}
          <div className="text-center mb-10 pb-10 border-b border-border">
            <p className="font-body text-muted-foreground text-xs uppercase tracking-widest mb-2">
              Celebrating
            </p>
            {/* TODO: Replace [Name] with the birthday person's name */}
            <h3 className="font-display text-5xl md:text-6xl font-medium text-wine">
              Jade
            </h3>
          </div>

          {/* Details list */}
          <div className="space-y-7">
            <DetailItem
              icon={Calendar}
              label="Date"
              value="Saturday, 18th April 2026"
            />
            <DetailItem
              icon={Clock}
              label="Time"
              value="7:00pm onwards"
            />
            <DetailItem
              icon={MapPin}
              label="Venue"
              value="45 West Bar, Leicester"
              href="https://www.45westbar.co.uk/"
            />
            <DetailItem
              icon={User}
              label="Dress Code"
              value="Smart Casual — with an 80s flair"
            />
          </div>

          {/* Divider */}
          <div className="divider-gold my-10" />

          {/* Quote */}
          <blockquote className="text-center">
            <p className="font-display italic text-wine-light text-xl md:text-2xl leading-relaxed">
              "A toast to the last 40 years —<br className="hidden sm:inline" />
              and all the good ones still to come."
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
