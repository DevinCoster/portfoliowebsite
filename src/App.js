import React, { useState, useEffect } from 'react';
import './App.css';

// --- 1. USER DATA CONFIGURATION ---
const DATA = {
    navbar: {
        logo: "DEVIN COSTER",
        links: [
            { name: "Mission", id: "bio" },
            { name: "Capabilities", id: "projects" },
            { name: "Tech", id: "tech" },           // { changed code }
            { name: "History", id: "resume" },
            { name: "Contact", id: "contact" }
        ]
    },
    hero: {
        title: "Software Engineer",
        subtitle: "Exploring Autonomy, Artificial Intelligence, and Embedded Systems.",
        buttonText: "VIEW CAPABILITIES",
        // <-- new: simple 3D ASCII art (multi-line string)
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
        label: "MISSION",
        title: "Engineering the Future",
        description: "My mission is to build resilient, scalable, and autonomous software systems. I focus on low level and embedded systems, leveraging my expertise in C++, Python, and machine learning.",
        stats: [
            { value: "10+", label: "Projects Deployed" },
            { value: "100%", label: "Commitment" }
        ]
    },
    projects: {
        label: "CAPABILITIES",
        title: "Current Projects",
        items: [
            {
                title: "Terminal Messenger",
                category: "Secure Communications",
                description: "A low-latency, CLI-based communication protocol designed for messages across devices",
                tech: ["C++", "Cmake", "OpenSSL"],
                url: "https://github.com/DevinCoster/NetworkMessenger",
                image: process.env.PUBLIC_URL + ''
            },
            {
                title: "Web-Crawler",
                category: "Multi-Threaded Crawler",
                description: "A scalable web crawler that extracts data from websites using multi-threading.",
                tech: ["C++", "Cmake", "Multi-Threading"],
                url: "https://github.com/DevinCoster/web-crawler",
                image: process.env.PUBLIC_URL + ''
            },
            {
                title: "Library Book-Shelf",
                category: "Full-Stack Web App",
                description: "Collaborative web application project to manage and store PDF's, EPUB's, and other documents for students.",
                tech: ["React", "JavaScript", "Node.js"],
                url: "https://github.com/CaldwellDN/bookshelfapp",
                image: process.env.PUBLIC_URL + ''
            },
            {
                title: "Movie Recommendation System",
                category: "Machine Learning",
                description: "A system that recommends movies based on user preferences using collaborative filtering.",
                tech: ["Python", "NumPy", "Scikit-Learn"],
                url: "https://github.com/DevinCoster/movie-recommendation-system",
                image: process.env.PUBLIC_URL + ''
            }
        ]
    },
    resume: {
        label: "HISTORY",
        title: "Professional Trajectory",
        jobs: [
            {
                company: "Allan Myers",
                role: "IT Generalist Intern",
                year: "May 2025 - Aug 2025",
                description: "Assisted in maintaining IT infrastructure and provided technical support."
            },
            {
                company: "Rock Spring Swim Club",
                role: "Water Safety Instructor",
                year: "May 2019 - Aug 2024",
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

    // <-- NEW: Tech stack data
    techStack: {
        "Front-end": [
            "React",
            "JavaScript",
            "HTML",
            "CSS"
        ],
        "Back-end": [
            "Python",
            "C/C++",
            "Java"
        ],
        "Software": [
            "Blender",
            "Unreal Engine",
        ],
        "Tools": [
            "Git / GitHub",
            "Docker",
            "Amazon Web Services"
        ]
    },
};

// --- 2. COMPONENTS ---

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        const nav = document.querySelector('.navbar');
        const navHeight = nav ? nav.offsetHeight : 0;
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo">{DATA.navbar.logo}</div>
            <div className="nav-links">
                {DATA.navbar.links.map((link) => (
                    <button key={link.name} onClick={() => scrollToSection(link.id)}>
                        {link.name}
                    </button>
                ))}
            </div>
        </nav>
    );
};

const Hero = () => {
    const handleViewCapabilities = () => {
        const element = document.getElementById('projects');
        const nav = document.querySelector('.navbar');
        const navHeight = nav ? nav.offsetHeight : 0;
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1>{DATA.hero.title}</h1>
                <p>{DATA.hero.subtitle}</p>
                <button className="btn-primary" onClick={handleViewCapabilities}>
                    {DATA.hero.buttonText}
                </button>
            </div>

            {/* insert 3D ASCII art into the hero */}
            <Ascii3D art={DATA.hero.ascii} />
        </section>
    );
};

const Bio = () => (
    <section id="bio" className="section bio-section">
        <div className="label">{DATA.bio.label}</div>
        <div className="content-grid">
            <div className="text-col">
                <h2>{DATA.bio.title}</h2>
                <p>{DATA.bio.description}</p>
            </div>
            <div className="stats-col">
                {DATA.bio.stats.map((stat, index) => (
                    <div key={index} className="stat-item">
                        <h3>{stat.value}</h3>
                        <span>{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const Projects = () => (
    <section id="projects" className="section projects-section">
        <div className="header-row">
            <div className="label">{DATA.projects.label}</div>
            <h2>{DATA.projects.title}</h2>
        </div>
        <div className="projects-grid">
            {DATA.projects.items.map((project, index) => (
                <div key={index} className="project-card">
                    {/* Background Image (Absolute Positioned) */}
                    {project.image && (
                        <img
                            src={project.image}
                            alt=""
                            className="project-bg-image"
                        />
                    )}

                    {/* Content (Standard Flow) */}
                    <div className="card-content">
                        <span className="category">{project.category}</span>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                        <div className="tech-stack">
                            {project.tech.map((t, i) => <span key={i}>{t}</span>)}
                        </div>
                    </div>
                    <a
                        className="card-arrow"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} on GitHub`}
                    >
                        →
                    </a>
                </div>
            ))}
        </div>
    </section>
);

// Modify Resume to be a simpler component that directly opens the imported PDF.
const Resume = () => {
    return (
        <section id="resume" className="section resume-section">
            <div className="label">{DATA.resume.label}</div>
            <div className="resume-container">
                <h2>{DATA.resume.title}</h2>
                <div className="timeline">
                    {DATA.resume.jobs.map((job, index) => (
                        <div key={index} className="timeline-item">
                            <div className="year">{job.year}</div>
                            <div className="job-details">
                                <h3>{job.company}</h3>
                                <h4>{job.role}</h4>
                                <p>{job.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Updated button: Directly opens the imported PDF in a new tab. */}
                <a
                    href={process.env.PUBLIC_URL + '/Coster_Resume.pdf'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                    style={{ display: 'inline-block', textDecoration: 'none' }}
                >
                    VIEW FULL RESUME
                </a>
            </div>
        </section>
    );
};

// <-- NEW: TechStack component
const TechStack = () => (
    <section id="tech" className="section tech-section">
        <div className="label">TECH</div>
        <h2>Technology Stack</h2>
        <div className="tech-grid">
            {Object.entries(DATA.techStack).map(([columnTitle, items]) => (
                <div key={columnTitle} className="tech-column">
                    <h4>{columnTitle}</h4>
                    <ul className="tech-list">
                        {items.map((item, i) => (
                            <li key={i} className="tech-item">{item}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </section>
);

const Footer = () => (
    <footer id="contact" className="footer">
        <div className="footer-content">
            <div className="contact-info">
                <h2>Ready to Build?</h2>
                <a href={`mailto:${DATA.contact.email}`} className="email-link">
                    {DATA.contact.email}
                </a>
                <p>{DATA.contact.address}</p>
            </div>
            <div className="footer-links">
                <h3>Connect</h3>
                <ul>
                    {DATA.contact.socials.map((social, index) => (
                        <li key={index}>
                            <a
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {social.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="copyright">
            © {new Date().getFullYear()} {DATA.navbar.logo}. All Systems Operational.
        </div>
    </footer>
);

// <-- new component: lightweight 3-layer ascii "3D" renderer
const Ascii3D = ({ art = "" }) => {
    // split into lines so each pre has identical content
    const lines = art.trimEnd();
    return (
        <div className="hero-ascii" aria-hidden="true">
            {/* back layer: darker, farther away */}
            <pre className="ascii-layer layer-back">{lines}</pre>
            {/* mid layer: faint mid-depth */}
            <pre className="ascii-layer layer-mid">{lines}</pre>
            {/* front layer: sharp, closest */}
            <pre className="ascii-layer layer-front">{lines}</pre>
        </div>
    );
};

// --- 3. MAIN APP ---

function App() {
    // Removed resume viewer state management
    return (
        <div className="App">
            <Navigation />
            <Hero />
            <Bio />
            <Projects />
            <TechStack /> {/* inserted tech stack section */}
            <Resume />
            <Footer />
            {/* Removed the ResumeViewer component */}
        </div>
    );
}

export default App;
