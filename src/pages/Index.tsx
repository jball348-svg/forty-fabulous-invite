import Hero from "@/components/Hero";
import EventDetails from "@/components/EventDetails";
import VenueSection from "@/components/VenueSection";
import RSVPForm from "@/components/RSVPForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <EventDetails />
      <VenueSection />
      <RSVPForm />
      <Footer />
    </main>
  );
};

export default Index;
