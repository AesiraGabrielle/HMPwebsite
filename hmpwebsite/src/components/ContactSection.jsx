export default function ContactSection() {
  return (
    <section className="py-24 px-6 bg-[#003679] text-white mt-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-blue-100 mb-8">
          Ready to collaborate? Let’s build something exceptional together.
        </p>
        <button className="bg-white text-[#003679] px-8 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition">
          Send Message
        </button>
      </div>
    </section>
  );
}
