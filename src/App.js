import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const publicAsset = (path) => {
    const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
    const clean = path.startsWith('/') ? path : `/${path}`;
    return `${base}${clean}`;
};

/* ============== Shell ============== */

function Clock() {
    const [t, setT] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setT(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    const pad = (n) => String(n).padStart(2, '0');
    const z = pad(t.getUTCHours()) + pad(t.getUTCMinutes()) + pad(t.getUTCSeconds()) + 'Z';
    const d = t.getUTCFullYear() + pad(t.getUTCMonth() + 1) + pad(t.getUTCDate());
    return <span className="mono">{d} · {z}</span>;
}

function GridOverlay() {
    return <div aria-hidden className="grid-overlay" />;
}

function SideRail({ side }) {
    const labels = side === 'left'
        ? ['LAT 38.8951°N', 'LON 77.0364°W', 'ALT 0023M', 'SEC//REL']
        : ['OBS 04', 'CH 07', 'PKT 0x2F', 'NODE A'];
    return (
        <aside className={`rail rail-${side}`} aria-hidden>
            <div className="rail-inner mono">
                {labels.map((l, i) => <span key={i}>{l}</span>)}
            </div>
        </aside>
    );
}

function TopBar({ active, onJump }) {
    const items = [
        { id: 'identity', label: 'IDENTITY', n: '01' },
        { id: 'systems', label: 'SYSTEMS', n: '02' },
        { id: 'projects', label: 'PROJECTS', n: '03' },
        { id: 'history', label: 'HISTORY', n: '04' },
        { id: 'contact', label: 'CONTACT', n: '05' },
    ];
    return (
        <header className="topbar">
            <div className="topbar-inner">
                <div className="topbar-left">
                    <div className="monogram" aria-label="Devin Coster monogram">
                        <span className="mono tag">DC</span>
                        <span className="monogram-dot" />
                    </div>
                    <div className="meta mono">
                        <span>DEVIN.COSTER</span>
                        <span className="sep">·</span>
                        <span>CANDIDATE / CS / 2027</span>
                    </div>
                </div>
                <nav className="topbar-nav">
                    {items.map((it) => (
                        <a key={it.id} href={`#${it.id}`}
                           onClick={(e) => { e.preventDefault(); onJump(it.id); }}
                           className={'navlink ' + (active === it.id ? 'is-active' : '')}>
                            <span className="navlink-n">{it.n}</span>
                            <span>{it.label}</span>
                        </a>
                    ))}
                </nav>
                <div className="topbar-right mono">
                    <span className="dot-live" /> LIVE
                    <span className="sep">·</span>
                    <Clock />
                </div>
            </div>
            <div className="topbar-rule" />
        </header>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner mono">
                <span>© 2026 DEVIN COSTER</span>
                <span className="sep">·</span>
                <span>PORTFOLIO.v2.04</span>
                <span className="sep">·</span>
                <span>BUILD 20260418-A</span>
                <span className="footer-spacer" />
                <span>END OF TRANSMISSION ◼</span>
            </div>
        </footer>
    );
}

/* ============== Section Head ============== */

function SectionHead({ n, l, right }) {
    return (
        <div className="section-head">
            <div className="section-head-left mono">
                <span className="section-n">{`${n} //`}</span>
                <span className="section-l">{l}</span>
            </div>
            <div className="section-head-right mono">{right}</div>
        </div>
    );
}

/* ============== Hero ============== */

function PortraitCard() {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className="portrait-card">
            <div className="portrait-head mono">
                <span className="tag">ID / PORTRAIT</span>
                <span className="tag">{loaded ? 'VERIFIED' : 'LOADING'}</span>
            </div>
            <div className="portrait-frame">
                <img
                    src={publicAsset('/images/hero-portrait.jpg')}
                    alt="Devin Coster"
                    className={'portrait-img ' + (loaded ? 'is-loaded' : '')}
                    onLoad={() => setLoaded(true)}
                />
                <div className="portrait-reticle" aria-hidden>
                    <span className="r tl" /><span className="r tr" /><span className="r bl" /><span className="r br" />
                </div>
            </div>
            <div className="portrait-foot mono small">
                <span>REF: DC-0027-2027</span>
                <span>F/2.8 · 50MM</span>
            </div>
        </div>
    );
}

function Hero() {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setTick((t) => t + 1), 1500);
        return () => clearInterval(id);
    }, []);
    const metrics = [
        { k: 'UPTIME', v: '99.97%', w: 0.9997 },
        { k: 'LATENCY', v: `${(12 + Math.sin(tick) * 2).toFixed(1)}ms`, w: 0.15 },
        { k: 'THROUGHPUT', v: `${(4.2 + Math.cos(tick) * 0.2).toFixed(2)} Gb/s`, w: 0.65 },
        { k: 'NODES', v: '07 / 07', w: 1.0 },
    ];
    return (
        <section id="identity" className="section section-hero">
            <SectionHead n="01" l="IDENTITY" right={<span>FILE: /personnel/coster.d</span>} />
            <div className="hero-console">
                <div className="hero-console-left">
                    <div className="mono tag amber">CANDIDATE // 2027</div>
                    <h1 className="display">
                        DEVIN<br />COSTER<span className="amber">.</span>
                    </h1>
                    <p className="hero-lede">
                        I build systems that hold up under pressure — resilient pipelines,
                        decision-support tooling, and interfaces for high-stakes
                        environments. Currently studying computer science, graduating 2027.
                    </p>
                    <div className="hero-console-meta mono">
                        <span>WASHINGTON · DC</span>
                        <span className="sep">·</span>
                        <span>AVAILABLE SUMMER 2026</span>
                    </div>
                </div>
                <div className="hero-console-right">
                    <PortraitCard />
                    <div className="console-panel">
                        <div className="console-panel-head mono">
                            <span className="tag">SYS / TELEMETRY</span>
                            <span className="tag"><span className="dot-live" /> STREAMING</span>
                        </div>
                        <div className="console-panel-body">
                            {metrics.map((m, i) => (
                                <div key={i} className="metric-row">
                                    <div className="metric-k mono tag">{m.k}</div>
                                    <div className="metric-bar">
                                        <div className="metric-bar-fill" style={{ width: `${m.w * 100}%` }} />
                                    </div>
                                    <div className="metric-v mono">{m.v}</div>
                                </div>
                            ))}
                        </div>
                        <div className="console-panel-foot mono small">
                            <span>CH_07 · OBS_04 · PKT 0x{(0x2F + tick).toString(16).toUpperCase()}</span>
                            <span>T+{String(tick).padStart(5, '0')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ============== Systems ============== */

const SYS_CATEGORIES = [
    { k: 'FRONT-END', items: [
        { n: 'TypeScript', lvl: 0.9 }, { n: 'JavaScript', lvl: 0.9 },
        { n: 'React', lvl: 0.92 }, { n: 'Vite', lvl: 0.78 },
        { n: 'HTML', lvl: 0.95 }, { n: 'CSS', lvl: 0.88 },
    ]},
    { k: 'BACK-END', items: [
        { n: 'Python', lvl: 0.92 }, { n: 'Java', lvl: 0.72 },
        { n: 'C++', lvl: 0.7 }, { n: 'FastAPI', lvl: 0.8 },
        { n: 'SQL', lvl: 0.82 }, { n: 'PostgreSQL', lvl: 0.78 },
    ]},
    { k: 'DATA / ML', items: [
        { n: 'Pandas', lvl: 0.85 }, { n: 'Polars', lvl: 0.82 },
        { n: 'NumPy', lvl: 0.8 }, { n: 'PyTorch', lvl: 0.7 },
        { n: 'scikit-learn', lvl: 0.75 }, { n: 'Jupyter', lvl: 0.85 },
    ]},
    { k: 'AI / LLM', items: [
        { n: 'Claude API', lvl: 0.88 }, { n: 'AIP Logic', lvl: 0.85 },
        { n: 'Prompt Engineering', lvl: 0.85 }, { n: 'Structured Output', lvl: 0.82 },
        { n: 'Evaluation Design', lvl: 0.78 }, { n: 'Ontology SDK', lvl: 0.8 },
    ]},
    { k: 'PLATFORMS', items: [
        { n: 'Palantir Foundry', lvl: 0.85 }, { n: 'Foundry Transforms', lvl: 0.8 },
        { n: 'Workshop', lvl: 0.78 }, { n: 'Unreal Engine', lvl: 0.62 },
        { n: 'CMake', lvl: 0.6 }, { n: 'Multi-threading', lvl: 0.68 },
    ]},
    { k: 'CLOUD / DEVOPS', items: [
        { n: 'AWS', lvl: 0.78 }, { n: 'Azure', lvl: 0.7 },
        { n: 'Docker', lvl: 0.78 }, { n: 'Git / GitHub', lvl: 0.92 },
        { n: 'OAuth2', lvl: 0.75 }, { n: 'Graph Algorithms', lvl: 0.72 },
    ]},
];

function Systems() {
    return (
        <section id="systems" className="section">
            <SectionHead n="02" l="SYSTEMS / CAPABILITY MATRIX" right={<span>FILE: /capability/matrix.tsv</span>} />
            <div className="sys-grid">
                <div className="sys-about">
                    <div className="mono tag amber">[ ABOUT OPERATOR ]</div>
                    <p className="sys-about-body">
                        I'm a computer science student at <span className="amber">Marymount University</span> (minor in AI &amp; Robotics), operating at the intersection of
                        <span className="amber"> systems engineering</span>, <span className="amber">machine learning</span>, and <span className="amber">full-stack development</span>. Recent work ranges from a multi-domain operations dashboard with real-time telemetry processing, to a clinical decision-support system on Palantir Foundry, to internal tooling deployed across 200+ enterprise endpoints.
                    </p>
                    <p className="sys-about-body">
                        I care about <span className="amber">reliability under load</span>, <span className="amber">honest interfaces</span>, and software that respects the seriousness of the decisions it supports.
                    </p>
                    <div className="sys-stats">
                        <div className="sys-stat">
                            <div className="mono tag">PROJECTS SHIPPED</div>
                            <div className="sys-stat-v">12</div>
                        </div>
                        <div className="sys-stat">
                            <div className="mono tag">TICKETS RESOLVED</div>
                            <div className="sys-stat-v">1.3K+</div>
                        </div>
                        <div className="sys-stat">
                            <div className="mono tag">UPTIME DELIVERED</div>
                            <div className="sys-stat-v">99.7%</div>
                        </div>
                        <div className="sys-stat">
                            <div className="mono tag">GRAD / CLASS</div>
                            <div className="sys-stat-v">2027</div>
                        </div>
                    </div>
                </div>
                <div className="sys-matrix">
                    {SYS_CATEGORIES.map((cat) => (
                        <div key={cat.k} className="sys-cat">
                            <div className="sys-cat-head mono">
                                <span className="tag">{cat.k}</span>
                                <span className="tag small">{cat.items.length} UNITS</span>
                            </div>
                            <div className="sys-cat-body">
                                {cat.items.map((it) => (
                                    <div key={it.n} className="sys-item">
                                        <div className="sys-item-name mono">{it.n}</div>
                                        <div className="sys-item-bar">
                                            {Array.from({ length: 20 }).map((_, i) => {
                                                const filled = i / 20 < it.lvl;
                                                return <span key={i} className={'tick ' + (filled ? 'on' : '')} />;
                                            })}
                                        </div>
                                        <div className="sys-item-lvl mono small">
                                            {String(Math.round(it.lvl * 100)).padStart(2, '0')}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ============== Projects ============== */

const PROJECTS = [
    {
        id: 'nightingale', code: 'OP-01', name: 'NIGHTINGALE',
        tagline: 'Clinical decision support for ED triage',
        role: 'Applied ML · Ontology · Full-stack',
        year: '2025',
        stack: ['Palantir Foundry', 'AIP Logic', 'Claude Opus', 'Python', 'TypeScript', 'React'],
        domains: ['HEALTH', 'LLM', 'RULES', 'ESI v4'],
        summary: 'End-to-end ED triage decision-support system on Palantir Foundry: a Polars data pipeline, a typed ontology object, a Python rules engine implementing the ESI v4 algorithm with explicit guardrails, and a custom React frontend calling Foundry directly via the generated Ontology SDK.',
        bullets: [
            'Engineered a hybrid rules-plus-LLM refinement layer in AIP Logic using Claude Opus, enforcing a hard safety ratchet that permits acuity escalation but never de-escalation.',
            'Tagged every LLM contribution for full audit traceability between deterministic and probabilistic reasoning.',
            'Evaluated the rules baseline against MIMIC-IV-ED ground truth — achieving 99% within-one-level accuracy and zero dangerous Level 1 misses.',
            'Deployed per-user audit attribution via OAuth2 Authorization Code Flow without an intermediary backend service.',
        ],
        imageLabel: 'NIGHTINGALE // TRIAGE FLOW',
    },
    {
        id: 'synapse', code: 'OP-02', name: 'SYNAPSE',
        tagline: 'Multi-domain tactical operations dashboard',
        role: 'Architect · Full-stack',
        year: '2025 — 2026',
        stack: ['TypeScript', 'React', 'Python', 'Asyncio'],
        domains: ['AIR', 'LAND', 'SEA', 'CYBER'],
        summary: 'Responsive Multi-Domain Operations dashboard providing a unified tactical picture for visualizing synchronized assets across Air, Land, Sea, and Cyber domains.',
        bullets: [
            'Engineered a Python backend using Asyncio to process real-time mission logic and telemetry, ensuring high-throughput state synchronization with the frontend.',
            'Implemented type-safe data structures and communication protocols bridging backend logic with web-based rendering.',
            'Reduced integration latency and improved system reliability through strict typing across the wire boundary.',
        ],
        imageLabel: 'SYNAPSE // CMD SURFACE',
    },
    {
        id: 'lex', code: 'OP-03', name: 'LEX ALGORITHMICA',
        tagline: 'Gothic-utilitarian community handbook',
        role: 'Full-stack · Designer',
        year: '2024 — 2025',
        stack: ['React', 'Vercel', 'Firebase', 'Firestore', 'Auth'],
        domains: ['COMMUNITY', 'CMS', 'REALTIME'],
        summary: 'Adeptus Mechanicus community handbook app with real-time content syncing, role-based auth, and a committed gothic-utilitarian visual direction.',
        bullets: [
            'Designed and shipped a visual system of riveted panels, monospace machine-code, and liturgical typography.',
            'Built a live collaborative editor on Firestore with optimistic updates and conflict-resolution for multi-editor sessions.',
            'Launched with 300+ active members; sustained <80ms median sync latency.',
        ],
        imageLabel: 'LEX // HANDBOOK',
    },
    {
        id: 'black-library', code: 'OP-04', name: 'THE BLACK LIBRARY',
        tagline: 'Personal media catalog across books, games, films',
        role: 'Full-stack',
        year: '2024',
        stack: ['TypeScript', 'React', 'Node.js', 'Postgres'],
        domains: ['CATALOG', 'API', 'SSR'],
        summary: 'Full-stack personal media catalog with progress tracking across mixed media types, normalized via a polymorphic item schema.',
        bullets: [
            'Designed a polymorphic Postgres schema with discriminated item types and shared progress/annotation tables.',
            'Built a typed Node.js API with row-level auth and per-item activity streams.',
            'Front-end state modeled with a derived-cache pattern; zero client-side refetch on navigation.',
        ],
        imageLabel: 'BLACK LIBRARY // CATALOG',
    },
];

function ProjectPlaceholder({ label, idx }) {
    const id = `stripes-${idx}`;
    return (
        <div className="proj-img">
            <svg className="proj-img-svg" viewBox="0 0 400 260" preserveAspectRatio="none">
                <defs>
                    <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <rect width="4" height="8" fill="rgba(243,239,230,0.08)" />
                    </pattern>
                </defs>
                <rect width="400" height="260" fill={`url(#${id})`} />
            </svg>
            <div>
                <div className="proj-img-corners">
                    <span className="c tl" /><span className="c tr" /><span className="c bl" /><span className="c br" />
                </div>
                <div className="proj-img-label mono tag">{label}</div>
                <div className="proj-img-note mono small">{'// product shot / placeholder'}</div>
            </div>
        </div>
    );
}

function ProjectRow({ p, open, onToggle, idx }) {
    return (
        <div className={'proj-row ' + (open ? 'is-open' : '')}>
            <button className="proj-row-bar" onClick={onToggle} aria-expanded={open}>
                <span className="proj-row-n mono tag">{p.code}</span>
                <span className="proj-row-name">{p.name}</span>
                <span className="proj-row-tag mono small">{p.tagline}</span>
                <span className="proj-row-year mono tag">{p.year}</span>
                <span className="proj-row-toggle mono">{open ? '—' : '+'}</span>
            </button>
            {open && (
                <div className="proj-row-body">
                    <div>
                        <ProjectPlaceholder label={p.imageLabel} idx={idx} />
                    </div>
                    <div>
                        <div className="proj-meta-grid">
                            <div><span className="mono tag">ROLE</span><div className="mono">{p.role}</div></div>
                            <div><span className="mono tag">STACK</span><div className="mono">{p.stack.join(' · ')}</div></div>
                            <div><span className="mono tag">DOMAINS</span><div className="mono amber">{p.domains.join(' · ')}</div></div>
                        </div>
                        <p className="proj-summary">{p.summary}</p>
                        <ul className="proj-bullets">
                            {p.bullets.map((b, j) => (
                                <li key={j} className="proj-bullet">
                                    <span className="mono tag small">{String(j + 1).padStart(2, '0')}</span>
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

function Projects() {
    const [openId, setOpenId] = useState('nightingale');
    return (
        <section id="projects" className="section">
            <SectionHead n="03" l="PROJECTS / DEPLOYED OPERATIONS" right={<span>COUNT: 04 · STATUS: REVIEWABLE</span>} />
            <div className="proj-column-head mono small">
                <span>CODE</span><span>NAME</span><span>BRIEF</span><span>YEAR</span><span />
            </div>
            <div className="proj-list">
                {PROJECTS.map((p, i) => (
                    <ProjectRow key={p.id} p={p} idx={i}
                        open={openId === p.id}
                        onToggle={() => setOpenId(openId === p.id ? null : p.id)} />
                ))}
            </div>
        </section>
    );
}

/* ============== History ============== */

const HISTORY = [
    {
        org: 'World Wide Technology', role: 'Federal Sales Intern', loc: 'Washington, D.C.',
        start: 'MAY 2026', end: 'AUG 2026', tag: 'FEDERAL / SE',
        bullets: [
            "Embedded with the Federal Systems Engineering team, supporting both pre-sale solution design and post-sale technical validation across the firm's OEM partner ecosystem for federal clients.",
            'Contributed to federal client engagements targeting agencies such as DISA — supporting requirements discovery, technical scoping, and solution proposal development.',
            'Supported post-sale implementation workflows with technical documentation, configuration guidance, and cross-functional handoffs between engineering and delivery teams.',
        ],
    },
    {
        org: 'Allan Myers', role: 'IT Generalist Intern', loc: 'Fallston, MD',
        start: 'MAY 2025', end: 'AUG 2025', tag: 'ENTERPRISE / IT',
        bullets: [
            'Diagnosed and resolved 50+ weekly hardware and software tickets across 6 business units — cutting average downtime by 30%.',
            'Led a company-wide device upgrade project, replacing 200+ end-user systems across field offices with minimal service disruption.',
            'Deployed AWS jumpboxes and Office 365 admin tooling to improve remote access reliability, reducing login issues by 20%.',
        ],
    },
];

function HistoryEntry({ h, idx }) {
    return (
        <div className="hist-row">
            <div className="hist-rail">
                <div className="hist-rail-n mono">{String(idx + 1).padStart(2, '0')}</div>
                <div className="hist-rail-line" />
                <div className="hist-rail-dot" />
            </div>
            <div className="hist-body">
                <div className="hist-top">
                    <div>
                        <div className="mono tag amber">{h.tag}</div>
                        <h3 className="hist-role">{h.role}</h3>
                        <div className="hist-org mono">{h.org} <span className="sep">·</span> {h.loc}</div>
                    </div>
                    <div className="hist-top-r mono">
                        <span className="tag">{h.start}</span>
                        <span className="hist-arrow">→</span>
                        <span className="tag">{h.end}</span>
                    </div>
                </div>
                <ul className="hist-bullets">
                    {h.bullets.map((b, i) => (
                        <li key={i} className="hist-bullet">
                            <span className="mono tag small">▸</span>
                            <span>{b}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function History() {
    return (
        <section id="history" className="section">
            <SectionHead n="04" l="HISTORY / FIELD RECORD" right={<span>ENTRIES: 02 · SORT: DESC</span>} />
            <div className="hist-edu mono">
                <div className="hist-edu-head">
                    <span className="tag">EDU / CURRENT</span>
                    <span className="tag">AUG 2023 — MAY 2027</span>
                </div>
                <div className="hist-edu-body">
                    <div>
                        <div className="mono tag">INSTITUTION</div>
                        <div className="hist-edu-val">Marymount University</div>
                        <div className="mono small" style={{ color: 'var(--bone-60)', marginTop: 4 }}>Arlington, VA</div>
                    </div>
                    <div>
                        <div className="mono tag">DEGREE</div>
                        <div className="hist-edu-val">B.S. Computer Science</div>
                        <div className="mono small" style={{ color: 'var(--bone-60)', marginTop: 4 }}>Minor: AI &amp; Robotics</div>
                    </div>
                    <div>
                        <div className="mono tag">EXPECTED</div>
                        <div className="hist-edu-val">MAY 2027</div>
                    </div>
                </div>
            </div>
            <div className="hist-list">
                {HISTORY.map((h, i) => <HistoryEntry key={h.org} h={h} idx={i} />)}
            </div>
        </section>
    );
}

/* ============== Contact ============== */

function Contact() {
    const [copied, setCopied] = useState(null);
    const copy = async (text, id) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(id);
            setTimeout(() => setCopied(null), 1400);
        } catch (e) {}
    };
    const channels = [
        { id: 'email', k: 'EMAIL', v: 'costerdevin@gmail.com', href: 'mailto:costerdevin@gmail.com' },
        { id: 'phone', k: 'VOICE', v: '+1 443 · 876 · 3070', href: 'tel:+14438763070' },
        { id: 'github', k: 'GITHUB', v: 'github.com/DevinCoster', href: 'https://github.com/DevinCoster' },
        { id: 'linkedin', k: 'LINKEDIN', v: 'linkedin.com/in/devincoster', href: 'https://www.linkedin.com/in/devincoster/' },
    ];
    return (
        <section id="contact" className="section section-contact">
            <SectionHead n="05" l="CONTACT / ESTABLISH COMMS" right={<span>CHANNEL: OPEN</span>} />
            <div className="contact-grid">
                <div>
                    <h2 className="contact-head">
                        Let's build something<br />
                        that <span className="amber">matters</span>.
                    </h2>
                    <p className="contact-lede">
                        I'm open to summer 2026 roles in systems engineering, applied ML,
                        and full-stack work — especially in mission-critical or
                        decision-support contexts. Say hello.
                    </p>
                    <div className="contact-status mono">
                        <div className="contact-status-row">
                            <span className="dot-live" /> <span>AVAILABLE / RESPONSE WITHIN 24H</span>
                        </div>
                        <div className="contact-status-row">
                            <span className="dot-amber" /> <span>ACCEPTING INTERVIEWS / SUMMER 2026</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="channel-panel">
                        <div className="channel-panel-head mono">
                            <span className="tag">CHANNELS</span>
                            <span className="tag">04 / ACTIVE</span>
                        </div>
                        <div className="channel-list">
                            {channels.map((c) => (
                                <div key={c.id} className="channel-row">
                                    <div className="channel-k mono tag">{c.k}</div>
                                    <a className="channel-v mono" href={c.href} target="_blank" rel="noreferrer">{c.v}</a>
                                    <button className="channel-copy mono small" onClick={() => copy(c.v, c.id)}>
                                        {copied === c.id ? 'COPIED ✓' : 'COPY'}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="channel-panel-foot mono small">
                            <span>PGP KEY ON REQUEST</span>
                            <span>KEY-ID 0xDC27A338</span>
                        </div>
                    </div>
                    <div className="contact-cta-row">
                        <a className="btn btn-amber" href="mailto:costerdevin@gmail.com">▸ ESTABLISH CONTACT</a>
                        <a className="btn" href={publicAsset('/Coster_Resume.pdf')} target="_blank" rel="noreferrer">DOWNLOAD RESUME ↓</a>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ============== App ============== */

function App() {
    const [active, setActive] = useState('identity');

    const jump = useCallback((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, []);

    useEffect(() => {
        const ids = ['identity', 'systems', 'projects', 'history', 'contact'];
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); });
            },
            { rootMargin: '-30% 0px -60% 0px' }
        );
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) obs.observe(el);
        });
        return () => obs.disconnect();
    }, []);

    return (
        <>
            <GridOverlay />
            <SideRail side="left" />
            <SideRail side="right" />
            <div className="app">
                <TopBar onJump={jump} active={active} />
                <main>
                    <Hero />
                    <Systems />
                    <Projects />
                    <History />
                    <Contact />
                </main>
                <Footer />
            </div>
        </>
    );
}

export default App;
