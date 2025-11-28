import React, { useState, useEffect, useRef } from 'react';
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

// --- RESUME: robust candidate list and resolver ---
const RESUME_FILENAME = 'Coster_Resume.pdf';

// build candidate URLs in order of preference
function buildResumeCandidates() {
    const pub = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
    const candidates = new Set();

    if (typeof window !== 'undefined' && window.location && window.location.origin) {
        // absolute origin + public path
        candidates.add(`${window.location.origin}${pub ? pub : ''}/${RESUME_FILENAME}`.replace(/([^:]\/)\/+/g, '$1'));
    }

    // root-relative
    candidates.add(`/${RESUME_FILENAME}`);

    // PUBLIC_URL relative (some hosts serve assets under PUBLIC_URL)
    if (pub) candidates.add(`${pub}/${RESUME_FILENAME}`);

    return Array.from(candidates);
}
const RESUME_CANDIDATES = buildResumeCandidates();

// quick check whether a URL returns a PDF (HEAD preferred, GET fallback)
async function urlLooksLikePdf(url) {
    try {
        // Try HEAD first
        let res;
        try {
            res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        } catch (headErr) {
            // HEAD might be blocked; try GET
            res = await fetch(url, { method: 'GET', cache: 'no-store' });
        }
        if (!res || !res.ok) return false;
        const ct = (res.headers.get('content-type') || '').toLowerCase();
        if (ct.includes('pdf')) return true;

        // If server returns text/html, try to inspect a small blob to confirm type
        if (ct.includes('text/html')) {
            try {
                const blob = await res.blob();
                if ((blob.type || '').toLowerCase().includes('pdf')) return true;
            } catch (e) {
                // ignore and treat as not pdf
            }
        }
        return false;
    } catch (err) {
        return false;
    }
}

// return first candidate that checks as PDF, otherwise null
async function findResumeUrl() {
    for (const url of RESUME_CANDIDATES) {
        if (await urlLooksLikePdf(url)) return url;
    }
    return null;
}

// --- IN-SITE RESUME VIEWER (modal) ---
const ResumeViewer = ({ visible, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [blobUrl, setBlobUrl] = useState(null);
    const tried = useRef(RESUME_CANDIDATES);

    useEffect(() => {
        let revoked = false;
        async function load() {
            setError(null);
            setBlobUrl(null);
            if (!visible) return;
            setLoading(true);
            // Try to find a PDF candidate
            const url = await findResumeUrl();
            if (!url) {
                setLoading(false);
                setError('No PDF found at expected URLs. See fallback links below.');
                return;
            }
            try {
                const res = await fetch(url, { method: 'GET', cache: 'no-store' });
                if (!res.ok) {
                    setError(`Failed to fetch resume: ${res.status} ${res.statusText}`);
                    setLoading(false);
                    return;
                }
                const blob = await res.blob();
                if (!blob.type.toLowerCase().includes('pdf')) {
                    setError('Server returned a non-PDF resource (likely the SPA index).');
                    setLoading(false);
                    return;
                }
                const objectUrl = URL.createObjectURL(blob);
                if (!revoked) setBlobUrl(objectUrl);
            } catch (e) {
                setError('Network error while fetching resume.');
            } finally {
                if (!revoked) setLoading(false);
            }
        }
        load();
        return () => {
            revoked = true;
            if (blobUrl) URL.revokeObjectURL(blobUrl);
        };
    }, [visible]); // eslint-disable-line

    if (!visible) return null;

    return (
        <div className="resume-modal" role="dialog" aria-modal="true">
            <div className="resume-modal-backdrop" onClick={onClose}></div>
            <div className="resume-modal-content">
                <button className="resume-modal-close" onClick={onClose} aria-label="Close resume viewer">×</button>

                {loading && <div style={{ padding: 20, color: '#ccc' }}>Loading resume…</div>}

                {!loading && error && (
                    <div style={{ padding: 20, color: '#f88' }}>
                        <div style={{ marginBottom: 12, fontWeight: 700 }}>Failed to load resume</div>
                        <div style={{ marginBottom: 12 }}>{error}</div>
                        <div style={{ marginBottom: 8 }}>Tried these URLs (open in new tab):</div>
                        <ul>
                            {tried.current.map((u) => (
                                <li key={u}>
                                    <a href={u} target="_blank" rel="noopener noreferrer">{u}</a>
                                </li>
                            ))}
                        </ul>
                        <div style={{ marginTop: 12 }}>
                            <button className="btn-outline" onClick={() => {
                                // attempt to open root-relative directly as a last-ditch
                                window.open(`/${RESUME_FILENAME}`, '_blank', 'noopener,noreferrer');
                            }}>Open /{RESUME_FILENAME} in new tab</button>
                        </div>
                    </div>
                )}

                {!loading && !error && blobUrl && (
                    <iframe title="Resume" src={blobUrl} className="resume-iframe" />
                )}

                <div className="resume-actions">
                    <button className="btn-outline" onClick={() => {
                        // If we have a blob URL open the PDF in new tab as well
                        if (blobUrl) {
                            window.open(blobUrl, '_blank', 'noopener,noreferrer');
                        } else {
                            // open root-relative as fallback
                            window.open(`/${RESUME_FILENAME}`, '_blank', 'noopener,noreferrer');
                        }
                    }}>Open in new tab</button>
                    <button className="btn-primary" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
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

// Modify Resume accepting onOpenViewer prop and use a button that resolves the correct PDF URL first
const Resume = ({ onOpenViewer }) => {
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

                {/* Updated click handler: prefer the bundled resume URL, then try candidates, fallback to in-site viewer */}
                <button
                    className="btn-outline"
                    onClick={async () => {
                        // Try to find a candidate URL that actually returns a PDF
                        const url = await findResumeUrl();
                        if (url) {
                            // Open verified PDF in a new tab
                            window.open(url, '_blank', 'noopener,noreferrer');
                        } else {
                            // Fall back to in-site viewer that will show clearer errors and links
                            onOpenViewer(true);
                        }
                    }}
                >
                    VIEW FULL RESUME
                </button>
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
    // Manage resume viewer visibility at the app level
    const [resumeVisible, setResumeVisible] = useState(false);

    return (
        <div className="App">
            <Navigation />
            <Hero />
            <Bio />
            <Projects />
            <TechStack /> {/* inserted tech stack section */}
            <Resume onOpenViewer={setResumeVisible} />
            <Footer />
            {/* render the in-site viewer */}
            <ResumeViewer visible={resumeVisible} onClose={() => setResumeVisible(false)} />
        </div>
    );
}

export default App;
