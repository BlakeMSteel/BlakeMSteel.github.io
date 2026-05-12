import { useState, useEffect } from "react";
import { Link } from "react-scroll";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sharedLinkProps = {
    smooth: true as const,
    duration: 1250,
    spy: true,
    offset: -51,
    activeClass: "nav-link-active",
    onClick: () => setMenuOpen(false),
  };

  const navLinkClass =
    "cursor-pointer font-montserrat font-bold uppercase text-sm tracking-wider text-white hover:text-primary transition-colors";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-dark py-3 ${
        scrolled ? "md:py-4 shadow-md" : "md:py-6 md:bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          to="home"
          smooth={true}
          duration={1250}
          className="cursor-pointer font-kaushan text-primary text-2xl"
        >
          Blake Steel
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {(["skills", "contact"] as const).map((section) => (
            <li key={section}>
              <Link to={section} {...sharedLinkProps} className={navLinkClass}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden font-montserrat font-bold uppercase text-sm tracking-wider text-white px-2 py-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <span>Menu</span> <span className="text-base">&#9776;</span>
        </button>
      </div>

      {/* Mobile dropdown — always rendered, animated via max-height */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-dark px-6 ${
          menuOpen ? "max-h-40 pb-4" : "max-h-0"
        }`}
      >
        <ul className="list-none m-0 p-0 flex flex-col gap-4 pt-4">
          {(["skills", "contact"] as const).map((section) => (
            <li key={section}>
              <Link to={section} {...sharedLinkProps} className={navLinkClass}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
