import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const DATA = {
    navbar: {
        logo: "DEVIN COSTER",
        links: [
            { name: "Mission", id: "bio" },
            { name: "Capabilities", id: "projects" },
            { name: "Tech", id: "tech" },
            { name: "History", id: "resume" },
            { name: "Contact", id: "contact" }
        ]
    },
    hero: {
        directive: "PRIMARY DIRECTIVE",
        title: "Software Engineer",
        subtitle: "Exploring autonomy, artificial intelligence, and embedded systems.",
        buttonText: "View capabilities",
        ascii: `
                                                               **+++==++**+******                    
                                                           *+++==++===+++=+=+*******#               
                                              ==*#***#%%%%*++**********+***++=+***********          
                                        ****##**%@%%%%%%@#**##%%%%%%%#%%#####*********#*****        
                                 ** ***#**%%%%%%%@%%%%@@##%%@@@@@@@@@@%%@@%%%%%%###**###*##***      
               ##%%%        %%++*#%%#%%%%%%%%%%%%@@%%@@@%%%%@@@@@@@@@@@@@@@@@@@@@%%%##*##*******    
             ##%@@@@@@%%%  *%%%@@@%%%%%%%%%%%%%%%@@%@@@%%%%%@%@@@@@@@@@@@@@@@@@@@@@%%%%#%##*##**#   
            #*%%      %%#%%%%%@@@@%%%%%%%%%%%%%%%@@@@@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%#####*#%  
            **#%   %%%@%%%%%%%@@@@%%%%%%%%%%%%%%%@@@@@@%%@%@%%%@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%##%% 
            ###% %%@@@@%%%%%%%@@@@%%%%%%%%%%%%%%%@@%@@ %%%@%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%##%%%%
             ####@@@@%%%%%%%%%@@@@%%%%%%%%%%%%%@@      %@%%@%%%%@@@@@@@@@@@@@%%@@@@@@@@@@@%%%%%%@@%*
             %#%%%#*##*##%%%%%@@@@%%%%%%%@@@@@@%       %@%%%%%%%%@@@@@@%%%%%%%%%%%%@%@@@@@%@%%@#%#%%
            *###%%##*#****%%%%@@@@@%%%     %@%@@@%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@@@@%%%%%%%%
           **##***######*****#%%%                 #%@@@@@@@%%%%#%%%#%%%%##%%%%%%%%%%%%%%%%%@%%@%%%%%
         ************######*#######                      @@@%%%%%%%%%%%%%##*#*###%%%%%%%%%%%%%%%%%%%
       ************+++**#%##*######*****                   @@@@%%%%%%%%%%%%%%#%#%#%%%%%%%%*%%%%%%%%%
    *************+++++++***%@%##########*#**#*#               @@@@@%%%%%%%%%%%%%%%%*%#%%++#%%%%%%%%%
  ###**************+++++*##**#*%###%####**####*##*#****           @@@@@@@@%%%%%%%%%%%%%%%%%%%%%%%%% 
**#%%%%%%*#%%%#********+****************%%%#####*###*##**#**++           @@@@@@%%%%%%%%%@@%%%%%%%%% 
**#%%%%%@%%%**#%%%*#**************************#%%######************           @@@%%#%%%%@@%%%%%%@@  
**##%%%%%@@@@%%####%%%#%************************+++++*######**********         #%%%%%%%%@@%%%%%%    
+**#%%%%%%@@@@@@@@%%%#*%%%%%###******#******++++========++++**#%%#***#**  **#%%%@@%%%%%%@%%%%%%     
***##%%%%%%@@@@@@@@@@@%%@%*%%%%%%%#*********++=========+++*****%%%%%%++#%%@@@@@@@%%%%%%@@%%%@       
***##%%%%%%%%@@@@@@@@@@@@@@%%%%%%#********++++++++==+++*****####%#*%%@@@@@@@@@@@@%@%%%%@@%%%        
++**#%%%%%%%%%@@@@@@@@@@@@@@@@@@%%#%%**+++++==+++++******#####%%%%%@@@@@@@@@@@@@@%%%%%%@@%%         
 ++**#%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@%%%%*+=+++++******%##%%%%%%%%%%%@@@@@@@@@@@@@%%%%%             
 =+**##%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@%%%#********###%%%%%%%%%@@@@@@@@@@@@@@@@%%%%               
  =+**##%%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@%%#**###%%%%%%%%%@@@@@@@@@@@@@@@@@@%%@                 
  ==***#%%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%@%%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@                   
   +****#%%%%%%%%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%%%%%%@@@@@@@@@@@@@@@@@@@@@                     
    =+**###%%%%%%%%%%@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%%@@@@@@@@@@@@@@@@@@@@                         
     ++**##%%%%%%%%%%%%%%@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                         
      +***###%%%%%%%%%%%%%@@@%@@@@@@@@@@@@@@@@@@@@@@@@@%@@@@@@@@@@@@@@@@@@                          
        ***##%%%%%%%%%%%%%%@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                           
         **###%@@@@%%%%%%%%%%@%@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                            
            #%%      %%%%%%%%%%%%%@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                             
                       %%%%%%%%%%%%%@%%@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@                               
                         %%%%%%%%%%%%@@%%@@%@@%@@@@@@@@@@@@@@@@@@@@                                 
                          %%%%%%%%%%%%%%%@%@@@@@@%@@@@@@@@@@@@@@                                    
                             %%%%%%%%%%@%%%@%@@%@@@@@@@@@@@                                         
                                 %%@@@%@@@@@@@@@@@                                                                                                                                  
        `
    },
    bio: {
        label: "Mission",
        title: "Engineering the future",
        description: "My mission is to build resilient, scalable, and autonomous software systems. I focus on low level and embedded systems, leveraging my expertise in C++, Python, and machine learning.",
        stats: [
            { value: "10+", label: "Projects deployed" },
            { value: "100%", label: "Commitment" }
        ]
    },
    projects: {
        label: "Capabilities",
        title: "Current projects",
        items: [
            {
                title: "Terminal Messenger",
                category: "Secure communications",
                description: "A low-latency, CLI-based communication protocol designed for messages across devices",
                tech: ["C++", "Cmake", "OpenSSL"],
                url: "https://github.com/DevinCoster/NetworkMessenger",
                image: process.env.PUBLIC_URL + ''
            },
            {
                title: "Web-Crawler",
                category: "Multi-threaded crawler",
                description: "A scalable web crawler that extracts data from websites using multi-threading.",
                tech: ["C++", "Cmake", "Multi-threading"],
                url: "https://github.com/DevinCoster/web-crawler",
                image: process.env.PUBLIC_URL + ''
            },
            {
                title: "Library Book-Shelf",
                category: "Full-stack web app",
                description: "Collaborative web application project to manage and store PDF's, EPUB's, and other documents for students.",
                tech: ["React", "JavaScript", "Node.js"],
                url: "https://github.com/CaldwellDN/bookshelfapp",
                image: process.env.PUBLIC_URL + ''
            },
            {
                title: "Movie Recommendation System",
                category: "Machine learning",
                description: "A system that recommends movies based on user preferences using collaborative filtering.",
                tech: ["Python", "NumPy", "Scikit-Learn"],
                url: "https://github.com/DevinCoster/movie-recommendation-system",
                image: process.env.PUBLIC_URL + ''
            }
        ]
    },
    resume: {
        label: "History",
        title: "Professional trajectory",
        jobs: [
            {
                company: "Allan Myers",
                role: "IT Generalist Intern",
                year: "May 2025 — Aug 2025",
                description: "Assisted in maintaining IT infrastructure and provided technical support."
            },
            {
                company: "Rock Spring Swim Club",
                role: "Water Safety Instructor",
                year: "May 2019 — Aug 2024",
                description: "Taught swimming and water safety to children and adults."
            },
        ]
    },
    contact: {
        email: "costerdevin@gmail.com",
        address: "Bel Air, MD",
        socials: [
            { name: "LinkedIn", url: "https://www.linkedin.com/in/devincoster" },
            { name: "GitHub", url: "https://github.com/DevinCoster" }
        ]
    },
    techStack: {
        "Front-end": ["React", "JavaScript", "HTML", "CSS"],
        "Back-end": ["Python", "C/C++", "Java"],
        "Software": ["Blender", "Unreal Engine", "Fusion 360"],
        "Tools": ["Git / GitHub", "Docker", "Amazon Web Services"]
    },
};

const formatTime = () => {
    const d = new Date();
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false });
};

const Navigation = ({ menuOpen, setMenuOpen }) => {
    const [scrolled, setScrolled] = useState(false);
    const [clock, setClock] = useState(formatTime);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 8);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const id = setInterval(() => setClock(formatTime()), 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("nav-locked", menuOpen);
        return () => document.body.classList.remove("nav-locked");
    }, [menuOpen]);

    const scrollToSection = useCallback((id) => {
        const element = document.getElementById(id);
        const nav = document.querySelector(".monolithic-header");
        const navHeight = nav ? nav.offsetHeight : 0;
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
            window.scrollTo({ top, behavior: "smooth" });
        }
        setMenuOpen(false);
    }, [setMenuOpen]);

    return (
        <header className={`monolithic-header ${scrolled ? "monolithic-header--scrolled" : ""}`}>
            <div className="monolithic-header__inner">
                <div className="monolithic-header__id">
                    <span className="label-sm label-sm--primary">Identification</span>
                    <div className="monolithic-header__logo">{DATA.navbar.logo}</div>
                </div>

                <nav className="monolithic-header__nav" aria-label="Primary">
                    {DATA.navbar.links.map((link) => (
                        <button
                            key={link.name}
                            type="button"
                            className="nav-link"
                            onClick={() => scrollToSection(link.id)}
                        >
                            {link.name}
                        </button>
                    ))}
                </nav>

                <div className="monolithic-header__status" aria-live="polite">
                    <span className="label-sm">System status</span>
                    <div className="status-row">
                        <span className="status-chip status-chip--nominal">Nominal</span>
                        <span className="label-md mono">{clock}</span>
                    </div>
                </div>

                <button
                    type="button"
                    className="nav-toggle"
                    aria-expanded={menuOpen}
                    aria-controls="mobile-nav"
                    onClick={() => setMenuOpen((o) => !o)}
                >
                    {menuOpen ? "Close" : "Menu"}
                </button>
            </div>

            <div
                id="mobile-nav"
                className={`mobile-nav-hud ${menuOpen ? "mobile-nav-hud--open" : ""}`}
                aria-hidden={!menuOpen}
            >
                <div
                    className="mobile-nav-hud__backdrop"
                    onClick={() => setMenuOpen(false)}
                    role="presentation"
                />
                <div className="mobile-nav-hud__panel">
                    <span className="label-sm label-sm--primary">Navigation overlay</span>
                    <div className="mobile-nav-hud__links">
                        {DATA.navbar.links.map((link) => (
                            <button
                                key={link.name}
                                type="button"
                                className="mobile-nav-link"
                                onClick={() => scrollToSection(link.id)}
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

const Hero = () => {
    const handleViewCapabilities = () => {
        const element = document.getElementById("projects");
        const nav = document.querySelector(".monolithic-header");
        const navHeight = nav ? nav.offsetHeight : 0;
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <section className="hero hero--directive" aria-labelledby="hero-title">
            <div className="hero-grid">
                <div className="hero-rail">
                    <span className="label-sm label-sm--muted">Grid ref</span>
                    <span className="hero-rail__ref mono">A-01 // HERO</span>
                    <span className="label-sm label-sm--muted">Depth</span>
                    <span className="hero-rail__ref mono">Layer 0</span>
                </div>

                <div className="hero-main">
                    <span className="label-sm label-sm--primary">{DATA.hero.directive}</span>
                    <h1 id="hero-title" className="display-lg">
                        {DATA.hero.title}
                    </h1>
                    <p className="body-md hero-lead">{DATA.hero.subtitle}</p>
                    <button type="button" className="btn-primary" onClick={handleViewCapabilities}>
                        {DATA.hero.buttonText}
                    </button>
                </div>

                <div className="hero-visual">
                    <div className="hero-visual__frame surface-nested">
                        <span className="label-sm label-sm--secondary">Telemetry</span>
                        <Ascii3D art={DATA.hero.ascii} />
                    </div>
                </div>
            </div>
        </section>
    );
};

const Bio = () => (
    <section id="bio" className="panel-band panel-band--bio">
        <div className="panel-band__header">
            <span className="label-sm label-sm--primary">{DATA.bio.label}</span>
            <h2 className="display-md">{DATA.bio.title}</h2>
        </div>
        <p className="body-md panel-band__copy">{DATA.bio.description}</p>
        <div className="stat-grid">
            {DATA.bio.stats.map((stat, index) => (
                <div key={index} className="stat-cell surface-nested">
                    <span className="label-sm label-sm--muted">{stat.label}</span>
                    <span className="stat-value">{stat.value}</span>
                </div>
            ))}
        </div>
    </section>
);

const TechStack = () => (
    <section id="tech" className="panel-band panel-band--tech">
        <div className="panel-band__header">
            <span className="label-sm label-sm--secondary">Tech</span>
            <h2 className="display-md">Stack readout</h2>
        </div>
        <div className="tech-matrix">
            {Object.entries(DATA.techStack).map(([columnTitle, items]) => (
                <div key={columnTitle} className="tech-matrix__column surface-nested">
                    <h3 className="label-md mono">{columnTitle}</h3>
                    <ul className="tech-chip-list">
                        {items.map((item, i) => (
                            <li key={i}>
                                <span className="tactical-chip">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </section>
);

const SchematicBand = () => (
    <div className="schematic-band surface-shift">
        <div className="schematic-band__grid">
            <Bio />
            <TechStack />
        </div>
    </div>
);

const Projects = () => (
    <section id="projects" className="section-block section-block--projects">
        <div className="section-block__intro">
            <span className="label-sm label-sm--primary">{DATA.projects.label}</span>
            <h2 className="display-md">{DATA.projects.title}</h2>
        </div>
        <div className="projects-matrix">
            {DATA.projects.items.map((project, index) => (
                <article
                    key={project.title}
                    className={`project-tile ${index % 2 === 1 ? "project-tile--alt" : ""}`}
                >
                    {project.image ? (
                        <img src={project.image} alt="" className="project-tile__bg" />
                    ) : null}
                    <div className="project-tile__body">
                        <span className="label-sm label-sm--secondary">{project.category}</span>
                        <h3 className="display-sm">{project.title}</h3>
                        <p className="body-md">{project.description}</p>
                        <div className="project-tile__chips">
                            {project.tech.map((t, i) => (
                                <span key={i} className="tactical-chip tactical-chip--ghost">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                    <a
                        className="project-tile__link"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} on GitHub`}
                    >
                        Open repository
                    </a>
                </article>
            ))}
        </div>
    </section>
);

const Resume = () => (
    <section id="resume" className="section-block section-block--resume surface-shift">
        <div className="section-block__intro">
            <span className="label-sm label-sm--secondary">{DATA.resume.label}</span>
            <h2 className="display-md">{DATA.resume.title}</h2>
        </div>
        <div className="history-stack">
            {DATA.resume.jobs.map((job, index) => (
                <div key={job.company} className={`history-panel surface-nested ${index % 2 === 1 ? "history-panel--alt" : ""}`}>
                    <div className="history-panel__meta">
                        <span className="label-sm label-sm--primary">Record</span>
                        <span className="label-md mono">{job.year}</span>
                    </div>
                    <div className="history-panel__body">
                        <h3 className="display-sm">{job.company}</h3>
                        <p className="label-md label-md--soft">{job.role}</p>
                        <p className="body-md">{job.description}</p>
                    </div>
                </div>
            ))}
        </div>
        <a
            href={`${process.env.PUBLIC_URL || ""}/Coster_Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            download="Coster_Resume.pdf"
            onClick={(e) => {
                const base = process.env.PUBLIC_URL || window.location.origin;
                const url = `${base}/Coster_Resume.pdf`;
                window.open(url, "_blank", "noopener");
                e.preventDefault();
            }}
        >
            View full resume
        </a>
    </section>
);

const Footer = () => (
    <footer id="contact" className="footer-block surface-deepest">
        <div className="footer-block__grid">
            <div className="footer-block__primary">
                <span className="label-sm label-sm--primary">Contact channel</span>
                <h2 className="display-md">Ready to build</h2>
                <a href={`mailto:${DATA.contact.email}`} className="footer-email body-md">
                    {DATA.contact.email}
                </a>
                <p className="label-md label-md--soft">{DATA.contact.address}</p>
            </div>
            <div className="footer-block__links">
                <span className="label-sm label-sm--secondary">Uplink</span>
                <ul>
                    {DATA.contact.socials.map((social, index) => (
                        <li key={index}>
                            <a href={social.url} target="_blank" rel="noopener noreferrer" className="footer-link">
                                {social.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="footer-block__strip">
            <span className="label-sm label-sm--muted">
                © {new Date().getFullYear()} {DATA.navbar.logo} — All systems operational
            </span>
        </div>
    </footer>
);

const Ascii3D = ({ art = "" }) => {
    const lines = art.trimEnd();
    return (
        <div className="hero-ascii" aria-hidden="true">
            <pre className="ascii-layer ascii-layer--back">{lines}</pre>
            <pre className="ascii-layer ascii-layer--mid">{lines}</pre>
            <pre className="ascii-layer ascii-layer--front">{lines}</pre>
        </div>
    );
};

function App() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="App">
            <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <main className="app-main">
                <Hero />
                <SchematicBand />
                <Projects />
                <Resume />
                <Footer />
            </main>
        </div>
    );
}

export default App;
