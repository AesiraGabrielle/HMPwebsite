export default function ParallaxHero() {
  return (
    <section
      className="h-[70vh] flex items-center justify-center text-white text-center md:bg-fixed bg-scroll bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')",
      }}
    >
      <div className="bg-[#003679]/70 w-full h-full flex items-center justify-center">
        <div>
          <h1 className="text-5xl font-bold mb-4">
            Engineering Excellence
          </h1>
          <p className="text-lg">
            Business Support and Engineering Solutions
          </p>
        </div>
      </div>
    </section>
  );
}