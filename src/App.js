import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

/** Resolve a path under `public/` for static assets. */
const publicAsset = (path) => {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${process.env.PUBLIC_URL || ''}${normalized}`;
};

const DATA = {
    navbar: {
        logo: "DEVIN COSTER",
        version: "v2.0_STABLE",
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
        title: "Student",
        tagline: "Mission-first systems engineering — I own the full stack, from requirements to deployment.",
        subtitle:
            "B.S. Computer Science student at Marymount University (minor: AI & Robotics). Building production-grade systems on Palantir Foundry—from clinical decision support to multi-domain tactical dashboards—and supporting federal-scale solution design.",
        buttonText: "View capabilities",
        portraitSrc: publicAsset("/images/hero-portrait.jpg"),
        portraitAlt: "Devin Coster",
        portraitHint: "Add file: public/images/hero-portrait.jpg",
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
             ####@@@@%%%%%%%%%@@@@%%%%%%%%%%%%%@@      %@%%@%%%%@@@@@@@@@@@@@@@@@@@%%@@@@@@@@@%%%%%*
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
      +***###%%%%%%%%%%%%%@@@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
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
        portraitSrc: publicAsset("/images/profile.jpg"),
        portraitAlt: "Devin Coster",
        portraitHint: "Add file: public/images/profile.jpg",
        description:
            "I design and ship software where safety, auditability, and throughput matter—ontology-backed workflows on Foundry, hybrid deterministic + LLM guardrails, and real-time operational dashboards. My coursework and internships bridge federal solutioning, enterprise IT, and applied ML.",
        stats: [
            { value: "2027", label: "Graduation (expected)" }
        ]
    },
    projects: {
        label: "Capabilities",
        title: "Signature builds",
        items: [
            {
                title: "Nightingale",
                category: "Clinical decision support",
                description:
                    "End-to-end ED triage support on Palantir Foundry: Polars pipelines, typed ontology objects, a Python rules engine for ESI v4 with explicit guardrails, and a React frontend on the generated Ontology SDK. Hybrid rules + Claude Opus refinement in AIP Logic with a hard safety ratchet (escalation only), full audit tags, MIMIC-IV-ED evaluation (99% within-one-level, zero dangerous Level 1 misses), and OAuth2 code flow without an intermediary backend.",
                tech: ["Palantir Foundry", "AIP Logic", "Python", "TypeScript", "React", "Polars", "Claude API"],
                url: "https://github.com/DevinCoster",
                linkText: "GitHub profile",
                linkAria: "Open Devin Coster GitHub profile",
                image: publicAsset("/images/projects/nightingale.jpg"),
                imageAlt: "Nightingale clinical decision support project",
                imageHint: "public/images/projects/nightingale.jpg"
            },
            {
                title: "Synapse",
                category: "Tactical dashboard",
                description:
                    "Multi-Domain Operations dashboard in TypeScript and React—unified tactical picture across Air, Land, Sea, and Cyber. Python asyncio backend for real-time mission logic and telemetry with high-throughput state sync; type-safe structures and protocols between services and the web UI to cut integration latency.",
                tech: ["TypeScript", "Python", "React", "Asyncio"],
                url: "https://github.com/DevinCoster",
                linkText: "GitHub profile",
                linkAria: "Open Devin Coster GitHub profile",
                image: publicAsset("/images/projects/synapse.jpg"),
                imageAlt: "Synapse tactical dashboard project",
                imageHint: "public/images/projects/synapse.jpg"
            }
        ]
    },
    resume: {
        label: "History",
        title: "Professional trajectory",
        education: {
            school: "Marymount University",
            location: "Arlington, VA",
            degree: "Bachelor of Science in Computer Science",
            minor: "Artificial Intelligence and Robotics",
            dates: "Aug. 2023 — May 2027"
        },
        jobs: [
            {
                company: "World Wide Technology",
                role: "Federal Sales Intern",
                location: "Washington, D.C.",
                year: "May 2026 — Aug. 2026",
                bullets: [
                    "Embedded with the Federal Systems Engineering team for pre-sale solution design and post-sale technical validation across WWT's OEM partner ecosystem for federal clients.",
                    "Supported federal engagements (including agencies such as DISA): requirements discovery, technical scoping, and solution proposal development.",
                    "Contributed to post-sale implementation workflows—technical documentation, configuration guidance, and cross-functional handoffs between engineering and delivery."
                ]
            },
            {
                company: "Allan Myers",
                role: "Information Technology Generalist Intern",
                location: "Fallston, MD",
                year: "May 2025 — Aug. 2025",
                bullets: [
                    "Diagnosed and resolved 50+ weekly hardware and software tickets across six business units, reducing downtime by roughly 30%.",
                    "Led a company-wide device refresh, replacing 200+ end-user systems across field offices with minimal service disruption.",
                    "Deployed AWS jump boxes and Microsoft 365 admin tooling to improve remote access reliability, cutting login-related issues by roughly 20%."
                ]
            }
        ]
    },
    contact: {
        email: "costerdevin@gmail.com",
        phone: "443-876-3070",
        address: "Arlington, VA · Bel Air, MD",
        socials: [
            { name: "LinkedIn", url: "https://www.linkedin.com/in/devincoster" },
            { name: "GitHub", url: "https://github.com/DevinCoster" }
        ]
    },
    techStack: {
        "Front-end": ["HTML", "CSS", "TypeScript", "JavaScript", "React", "Vite"],
        "Back-end & data": ["C++", "Java", "Python", "SQL", "PostgreSQL", "CMake", "FastAPI"],
        "ML, AI & notebooks": [
            "Pandas", "Polars", "NumPy", "scikit-learn", "Jupyter",
            "PyTorch", "Claude API", "AIP Logic", "Structured output", "Evaluation design"
        ],
        "Platforms & cloud": [
            "Palantir Foundry", "Ontology SDK", "Foundry Transforms", "Workshop",
            "Unreal Engine", "Multi-threading", "Graph algorithms",
            "AWS", "Azure", "Docker", "Git/GitHub", "OAuth2", "Microsoft 365", "Google Workspace"
        ]
    },
};

/* ============================================================
   UTILITY COMPONENTS
   ============================================================ */

const RasterImage = ({ src, alt = "", className = "", slotLabel = "Add image under public/" }) => {
    const [broken, setBroken] = useState(false);

    useEffect(() => { setBroken(false); }, [src]);

    if (!src || broken) {
        return (
            <div
                className={["image-slot", className].filter(Boolean).join(" ")}
                role="img"
                aria-label={slotLabel}
            >
                <span className="label-sm label-sm--muted">Image slot</span>
                <span className="image-slot__hint mono">{slotLabel}</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setBroken(true)}
        />
    );
};

const formatTime = () => {
    const d = new Date();
    return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false });
};

const formatSync = () => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear()).slice(2);
    const hh = String(d.getHours()).padStart(2, '0');
    const min = String(d.getMinutes()).padStart(2, '0');
    const ss = String(d.getSeconds()).padStart(2, '0');
    return `${dd}.${mm}.${yy}_${hh}:${min}:${ss}`;
};

/* ============================================================
   NAVIGATION
   ============================================================ */
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
                    <span className="label-sm label-sm--muted" style={{ marginBottom: "2px" }}>Identification</span>
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
                    <span className="label-sm label-sm--muted" style={{ marginBottom: "4px" }}>System status</span>
                    <div className="status-row">
                        <span className="status-chip status-chip--nominal">Operational</span>
                        <span className="label-sm mono" style={{ marginBottom: 0, fontSize: "0.65rem", letterSpacing: "0.1em" }}>{clock}</span>
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
                    <span className="label-sm label-sm--muted">Navigation overlay</span>
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

/* ============================================================
   ASCII 3D
   ============================================================ */
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

/* ============================================================
   HERO
   ============================================================ */
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

                {/* Data gutter */}
                <div className="hero-rail" aria-hidden="true">
                    <span className="hero-rail__ref">A-01 // HERO</span>
                    <span className="hero-rail__ref">Layer 0</span>
                    <span className="hero-rail__ref">Grid ref</span>
                </div>

                {/* Main content */}
                <div className="hero-main">
                    <div className="hero-status-row">
                        <span className="hero-badge">Status: Operational</span>
                        <span className="hero-version">{DATA.navbar.version}</span>
                    </div>
                    <span className="label-sm label-sm--primary">{DATA.hero.directive}</span>
                    <h1 id="hero-title" className="display-lg">
                        {DATA.hero.title}
                    </h1>
                    <p className="hero-tagline">{DATA.hero.tagline}</p>
                    <p className="body-md hero-lead">{DATA.hero.subtitle}</p>
                    <button type="button" className="btn-primary" onClick={handleViewCapabilities}>
                        {DATA.hero.buttonText}
                    </button>
                </div>

                {/* Visual column */}
                <div className="hero-visual">
                    <div className="hero-visual__stack">
                        <div className="hero-portrait-block">
                            <span className="label-sm label-sm--muted">Subject capture</span>
                            <RasterImage
                                src={DATA.hero.portraitSrc}
                                alt={DATA.hero.portraitAlt}
                                className="hero-portrait-block__img"
                                slotLabel={DATA.hero.portraitHint}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ============================================================
   BIO
   ============================================================ */
const Bio = () => (
    <section id="bio" className="panel-band panel-band--bio">
        <div className="bio-layout">
            <figure className="bio-portrait" style={{ margin: 0 }}>
                <span className="label-sm label-sm--muted">Visual ID</span>
                <RasterImage
                    src={DATA.bio.portraitSrc}
                    alt={DATA.bio.portraitAlt}
                    className="bio-portrait__img"
                    slotLabel={DATA.bio.portraitHint}
                />
                <figcaption className="bio-portrait__caption">
                    {DATA.bio.portraitAlt}
                </figcaption>
            </figure>
            <div className="bio-layout__main">
                <div className="panel-band__header">
                    <span className="label-sm label-sm--primary">{DATA.bio.label}</span>
                    <h2 className="display-md">{DATA.bio.title}</h2>
                </div>
                <p className="body-md panel-band__copy">{DATA.bio.description}</p>
                <div className="stat-grid">
                    {DATA.bio.stats.map((stat, index) => (
                        <div key={index} className="stat-cell">
                            <span className="label-sm label-sm--muted">{stat.label}</span>
                            <span className="stat-value">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

/* ============================================================
   TECH STACK
   ============================================================ */
const TechStack = () => (
    <section id="tech" className="panel-band panel-band--tech">
        <div className="panel-band__header">
            <span className="label-sm label-sm--muted">Tech</span>
            <h2 className="display-md">Stack readout</h2>
        </div>
        <div className="tech-matrix">
            {Object.entries(DATA.techStack).map(([columnTitle, items]) => (
                <div key={columnTitle} className="tech-matrix__column">
                    <h3>{columnTitle}</h3>
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

/* ============================================================
   PROJECTS — Bento Grid
   ============================================================ */
const Projects = () => (
    <section id="projects" className="section-block section-block--projects">
        <div className="section-block__intro">
            <span className="label-sm label-sm--muted">[ {DATA.projects.label} ]</span>
            <h2 className="display-md">{DATA.projects.title}</h2>
        </div>
        <div className="bento-grid">
            {DATA.projects.items.map((project, index) => (
                <article
                    key={project.title}
                    className={`bento-card ${index === 0 ? "bento-card--featured" : "bento-card--secondary"}`}
                >
                    <RasterImage
                        src={project.image}
                        alt={project.imageAlt || ""}
                        className="bento-card__img"
                        slotLabel={project.imageHint ? `Add file: ${project.imageHint}` : "Add project image"}
                    />
                    <div className="bento-card__gradient" />
                    <div className="bento-card__overlay">
                        <div className="bento-card__top">
                            <span className="label-sm">
                                [ {project.category.toUpperCase().replace(/ /g, "_")} ]
                            </span>
                            <div className="bento-card__tech-chips">
                                {project.tech.slice(0, 3).map((t, i) => (
                                    <span key={i} className="tactical-chip tactical-chip--dark">{t}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bento-card__bottom">
                            <h3 className="display-sm">{project.title.toUpperCase()}</h3>
                            <p className="body-md">{project.description}</p>
                            <div className="bento-card__chips">
                                {project.tech.slice(3).map((t, i) => (
                                    <span key={i} className="tactical-chip tactical-chip--ghost">{t}</span>
                                ))}
                            </div>
                            {project.url && (
                                <a
                                    className="bento-card__link"
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={project.linkAria || `Open link for ${project.title}`}
                                >
                                    {project.linkText || "Open repository"} →
                                </a>
                            )}
                        </div>
                    </div>
                </article>
            ))}
        </div>
    </section>
);

/* ============================================================
   RESUME / HISTORY
   ============================================================ */
const Resume = () => (
    <section id="resume" className="section-block section-block--resume">
        <div className="section-block__intro">
            <span className="label-sm label-sm--muted">[ {DATA.resume.label} ]</span>
            <h2 className="display-md">{DATA.resume.title}</h2>
        </div>

        {DATA.resume.education && (
            <div className="education-panel">
                <span className="label-sm label-sm--primary">Education</span>
                <h3 className="display-sm">{DATA.resume.education.school}</h3>
                <p className="label-md label-md--soft">{DATA.resume.education.location}</p>
                <p className="body-md education-panel__degree">{DATA.resume.education.degree}</p>
                <p className="body-md">Minor: {DATA.resume.education.minor}</p>
                <p className="education-panel__dates mono">{DATA.resume.education.dates}</p>
            </div>
        )}

        <div className="history-stack">
            {DATA.resume.jobs.map((job, index) => (
                <div
                    key={job.company}
                    className={`history-panel ${index % 2 === 1 ? "history-panel--alt" : ""}`}
                >
                    <div className="history-panel__meta">
                        <span className="label-sm label-sm--primary">Record</span>
                        <span className="label-md mono">{job.year}</span>
                    </div>
                    <div className="history-panel__body">
                        <h3 className="display-sm">{job.company}</h3>
                        <p className="label-md label-md--soft">
                            {job.role}{job.location ? ` · ${job.location}` : ""}
                        </p>
                        {job.bullets?.length ? (
                            <ul className="history-bullets">
                                {job.bullets.map((line, i) => (
                                    <li key={i} className="body-md">{line}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="body-md">{job.description}</p>
                        )}
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
            View full resume →
        </a>
    </section>
);

/* ============================================================
   FOOTER / CONTACT
   ============================================================ */
const Footer = () => {
    const [sync, setSync] = useState(formatSync);
    useEffect(() => {
        const id = setInterval(() => setSync(formatSync()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <footer id="contact" className="footer-block surface-deepest">
            <div className="footer-block__grid">
                <div className="footer-block__primary">
                    <span className="label-sm label-sm--muted">Contact channel</span>
                    <h2 className="display-md">Ready to build</h2>
                    <a href={`mailto:${DATA.contact.email}`} className="footer-email body-md">
                        {DATA.contact.email}
                    </a>
                    {DATA.contact.phone && (
                        <a href={`tel:${DATA.contact.phone.replace(/\D/g, "")}`} className="footer-phone">
                            {DATA.contact.phone}
                        </a>
                    )}
                    <p className="label-md label-md--soft" style={{ marginTop: "8px" }}>{DATA.contact.address}</p>
                </div>
                <div className="footer-block__links">
                    <span className="label-sm label-sm--muted">Uplink</span>
                    <ul>
                        {DATA.contact.socials.map((social, index) => (
                            <li key={index}>
                                <a
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer-link"
                                >
                                    {social.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="footer-block__strip">
                <span className="label-sm">
                    © {new Date().getFullYear()} {DATA.navbar.logo} — All systems operational
                </span>
                <span className="label-sm mono">
                    Last sync: {sync}
                </span>
            </div>
        </footer>
    );
};

/* ============================================================
   APP ROOT
   ============================================================ */
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
