import { FaUsers, FaServer, FaCog } from "react-icons/fa";
import type { IconType } from "react-icons";

interface Skill {
  Icon: IconType;
  title: string;
  description: React.ReactNode;
  tech: string;
}

const skills: Skill[] = [
  {
    Icon: FaUsers,
    title: "Front-End",
    description: (
      <>
        <strong>Responsive and interactive</strong> web interfaces using
        component-based frameworks.{" "}
        <strong>Clear, accessible, and seamlessly integrated</strong> with
        backend systems.
      </>
    ),
    tech: "TypeScript, JavaScript, Angular, React, HTML, CSS/SCSS, Material UI",
  },
  {
    Icon: FaServer,
    title: "Back-End",
    description: (
      <>
        <strong>Scalable, reliable, and responsibly developed</strong> backend
        services and APIs. <strong>Maintainable and distributed systems</strong>{" "}
        across independently deployed components.
      </>
    ),
    tech: "Go, C#, Java, SQL, .NET, Microservices, RESTful APIs, MySQL",
  },
  {
    Icon: FaCog,
    title: "Tools and Processes",
    description: (
      <>
        Iterative development workflows. Modern tooling and collaboration
        practices. Version control, testing, and continuous delivery.
      </>
    ),
    tech: "Agile, Scrum, Kanban, CI/CD, Git, Jira",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-[#eeeeee]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold uppercase text-4xl text-[#333] tracking-wider">
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-16">
          {skills.map(({ Icon, title, description, tech }) => (
            <div key={title}>
              <div className="flex justify-center mb-5">
                <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
                  <Icon className="text-white text-4xl" />
                </div>
              </div>
              <h4 className="font-montserrat font-bold text-lg text-[#333] mb-3">
                {title}
              </h4>
              <p className="text-muted mb-2 text-sm leading-relaxed">
                {description}
              </p>
              <p className="text-muted text-sm">{tech}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://drive.google.com/file/d/1wV0AKPVWwthhbrbyDNsnJ6Vv01ukWC7Z/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary border-2 border-primary text-white font-montserrat font-bold uppercase text-lg px-10 py-5 rounded hover:bg-[#5da84e] hover:border-[#5da84e] transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
