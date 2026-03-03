import ContactSection from "../components/ContactSection";

export default function Portfolio() {
  return (
    <>
      <section className="pt-32 pb-24 px-6 min-h-screen bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#003679] mb-6">Portfolio</h2>
          <p className="text-gray-600">Showcasing our recent projects and achievements.</p>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
