import { Link } from "react-scroll";

export default function Hero() {
  return (
    <header
      id="home"
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center text-white text-center"
      style={{ backgroundImage: "url('/img/aurora.jpg')" }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 px-4">
        <div className="font-droid-serif italic text-2xl md:text-4xl text-white mb-2">
          Full-Stack
        </div>
        <div className="font-montserrat font-bold uppercase text-4xl md:text-7xl text-white mb-10 tracking-wider">
          Software Engineer
        </div>
        <Link
          to="skills"
          smooth={true}
          duration={1250}
          offset={-51}
          className="cursor-pointer inline-block bg-primary border-2 border-primary text-white font-montserrat font-bold uppercase text-lg px-10 py-5 rounded hover:bg-[#5da84e] hover:border-[#5da84e] transition-colors"
        >
          Find out more
        </Link>
      </div>
    </header>
  );
}
