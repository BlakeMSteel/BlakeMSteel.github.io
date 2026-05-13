import { FaIdCard } from "react-icons/fa";
import type { IconType } from "react-icons";

interface Site {
  Icon: IconType;
  title: string;
  description: string;
  url: string;
}

const sites: Site[] = [
  {
    Icon: FaIdCard,
    title: "Malifaux Card Creator",
    description:
      "Build and print custom stat cards for the Malifaux miniature wargame.",
    url: "https://blakesteel.com/malifaux-card-creator",
  },
];

export default function Explore() {
  return (
    <section id="explore" className="py-24 bg-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold uppercase text-4xl text-white tracking-wider">
            Explore
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-12">
          {sites.map(({ Icon, title, description, url }) => (
            <div key={title} className="text-center max-w-xs">
              <div className="flex justify-center mb-5">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
                  <Icon className="text-white text-4xl" />
                </div>
              </div>
              <h4 className="font-montserrat font-bold text-lg text-white mb-3">
                {title}
              </h4>
              <p className="text-muted text-sm leading-relaxed mb-6">
                {description}
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary border-2 border-primary text-white font-montserrat font-bold uppercase text-sm px-8 py-3 rounded hover:bg-[#5da84e] hover:border-[#5da84e] transition-colors"
              >
                Visit
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
