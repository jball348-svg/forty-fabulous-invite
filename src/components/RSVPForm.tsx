import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { submitRSVP } from "../lib/emailService";

/*
 * RSVP Form — Integration Notes
 * ─────────────────────────────
 * This form is designed to connect to a serverless endpoint (e.g. Vercel Edge Function,
 * Supabase Edge Function, or Resend/SendGrid email API).
 *
 * To wire it up:
 *   1. Replace the `simulateSubmit` call in `onSubmit` with a `fetch` to your API route.
 *   2. Your endpoint should POST the form data and send an email to the event host.
 *   3. Do NOT hardcode API keys here — store them as environment secrets server-side.
 *
 * Example endpoint call (replace simulation):
 *   const res = await fetch('/api/rsvp', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(data),
 *   });
 *
 * RSVP data is sent to the event host
 */

const rsvpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),
  attending: z.enum(["yes", "no"], {
    required_error: "Please let us know if you can make it",
  }),
  // dietary: z.string().trim().max(200).optional(), // Uncomment when needed
  // message: z.string().trim().max(500).optional(),   // Uncomment when needed
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

const RSVPForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
  });

  const attending = watch("attending");

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitRSVP(data);
      
      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("RSVP submission failed:", error);
      alert('Sorry, there was an error submitting your RSVP. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="rsvp"
      className="py-20 md:py-28 px-6"
      style={{ background: "var(--gradient-section)" }}
      aria-label="RSVP"
    >
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-body text-wine text-xs uppercase tracking-[0.3em] mb-4">
            Your Response
          </p>
          <h2 className="font-display text-foreground text-4xl md:text-5xl font-medium mb-4">
            Will You Join{" "}
            <em className="italic text-wine">Us?</em>
          </h2>
          <div className="divider-gold max-w-[120px] mx-auto mb-4" />
          <p className="font-body text-muted-foreground text-sm mt-4">
            Kindly respond by <strong>1st April 2026</strong>
          </p>
        </div>

        {/* Success state */}
        {submitted ? (
          <div className="card-elegant p-10 text-center">
            <CheckCircle className="w-12 h-12 text-wine mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="font-display text-2xl text-wine mb-2">Thank you!</h3>
            <p className="font-body text-muted-foreground">
              {attending === "yes"
                ? "Wonderful — we can't wait to celebrate with you. See you on the 18th!"
                : "We'll miss you! We hope to raise a glass together soon."}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card-elegant p-8 md:p-10 space-y-7"
            noValidate
          >
            {/* Name field */}
            <div>
              <label
                htmlFor="name"
                className="font-body text-xs uppercase tracking-widest text-muted-foreground block mb-2"
              >
                Your Name <span className="text-wine" aria-hidden>*</span>
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                {...register("name")}
                className="w-full bg-background border border-input rounded px-4 py-3 font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-wine/30 focus:border-wine transition-all"
              />
              {errors.name && (
                <p className="font-body text-xs text-destructive mt-1.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Attending */}
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-muted-foreground mb-3">
                Will you be attending? <span className="text-wine" aria-hidden>*</span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "yes", label: "Joyfully, yes!" },
                  { value: "no", label: "Sadly, no" },
                ].map(({ value, label }) => (
                  <label
                    key={value}
                    className={`cursor-pointer border rounded px-4 py-3 font-body text-sm text-center transition-all duration-200 ${
                      attending === value
                        ? "border-wine bg-wine text-cream font-medium"
                        : "border-input bg-background text-foreground hover:border-wine/50"
                    }`}
                  >
                    <input
                      type="radio"
                      value={value}
                      {...register("attending")}
                      className="sr-only"
                    />
                    {label}
                  </label>
                ))}
              </div>
              {errors.attending && (
                <p className="font-body text-xs text-destructive mt-1.5">
                  {errors.attending.message}
                </p>
              )}
            </div>

            {/*
             * Dietary requirements — hidden for future use.
             * Uncomment and add to schema when ready:
             *
             * <div>
             *   <label htmlFor="dietary" className="...">Dietary Requirements</label>
             *   <input id="dietary" type="text" {...register("dietary")} className="..." />
             * </div>
             */}

            {/* Divider */}
            <div className="divider-gold" />

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-wine text-cream font-body font-semibold uppercase tracking-[0.2em] text-sm py-4 hover:bg-wine-light disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {isSubmitting ? "Sending…" : "Send RSVP"}
            </button>

            <p className="font-body text-muted-foreground text-xs text-center">
              Having trouble? Please contact the event host for assistance.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default RSVPForm;
