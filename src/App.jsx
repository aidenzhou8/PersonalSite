import React, { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, FileText, ArrowUpRight, ArrowUp, ChevronDown, Sun, Moon } from "lucide-react";
import { EinsteinTiling } from "./EinsteinTiling";

const profile = {
  name: "Aiden Zhou",
  location: "New Haven / Vancouver",
  email: "aiden.zhou@yale.edu",
  links: [
    { label: "GitHub", href: "https://github.com/aidenzhou8", icon: Github },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aidenzhou/", icon: Linkedin },
    { label: "Resume", href: "/resume.pdf", icon: FileText },
    { label: "Email", href: "mailto:aiden.zhou@yale.edu", icon: Mail },
  ],
};

const recentNews = [
  {
    date: "Summer 2026",
    title: "Incoming intern @ Cohere",
    body: "Advancing frontier models as part of the Sovereign AI team.",
    href: "https://cohere.com/",
  },
  {
    date: "Now",
    title: "AI safety research with SPAR",
    body: "Applying fluid benchmarking to agentic evaluations, reducing cost and noise. Mentored by Diogo Cruz and Vamshi Bonagiri.",
    bodyContent: (
      <>
        Applying{" "}
        <a
          href="https://allenai.org/blog/fluid-benchmarking"
          target="_blank"
          rel="noopener noreferrer"
          className="text-theme-accent-muted hover:text-theme-accent transition-colors"
        >
          fluid benchmarking
        </a>{" "}
        to agentic evaluations, reducing cost and noise. Mentored by Diogo Cruz and Vamshi Bonagiri.
      </>
    ),
    href: "https://sparai.org/",
  },
  {
    date: "Now",
    title: "Adaptive graphs for physics simulation",
    body: "Developing GNN-based methods for fluid and granular simulation.",
  },
];

const experience = [
  {
    org: "Yale / Math Department",
    role: "Teaching Assistant",
    period: "Aug. 2025 — Present",
    location: "New Haven, CT",
    summary:
      "Lead office hours, workshops, and 1-on-1 tutoring for Calculus I and II, supporting 100+ students in mastering proofs, core concepts, and computational techniques.",
  },
  {
    org: "Wu Tsai Institute",
    role: "Research Intern",
    period: "Jan. 2025 — Oct. 2025",
    location: "New Haven, CT",
    summary:
      "Developed and tested bio-plausible computer vision models using PyTorch, Nvdiffrast, and MATLAB. Designed a scalable ETL for 50+ GB of ECoG data; managed GPU workflows with CUDA and Slurm. Mentored by Daniel Calbick and Professor Ilker Yildirim at the Cognitive and Neural Computation Lab.",
    summaryContent: (
      <>
        Developed and tested bio-plausible computer vision models using PyTorch, Nvdiffrast, and MATLAB. Designed a scalable ETL for 50+ GB of ECoG data; managed GPU workflows with CUDA and Slurm. Mentored by Daniel Calbick and Professor Ilker Yildirim at the{" "}
        <a
          href="https://cncl.yale.edu/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-theme-accent-muted hover:text-theme-accent transition-colors"
        >
          Cognitive and Neural Computation Lab
        </a>
        .
      </>
    ),
  },
  {
    org: "Algoverse AI",
    role: "Machine Learning Researcher",
    period: "May 2025 — Aug. 2025",
    location: "Remote",
    summary:
      "Co-authored a paper on how polysemanticity develops during language model pretraining. Analyzed feature clusters across Pythia checkpoints to study how neuron activation spaces evolve from exploration to specialization. Presented at MechInterp @ NeurIPS 2025.",
    summaryContent: (
      <>
        Co-authored a{" "}
        <a
          href="https://aniruddh-alt.github.io/from-tokens-to-semantics-website/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-theme-accent-muted hover:text-theme-accent transition-colors"
        >
          paper
        </a>
        {" "}on how polysemanticity develops during language model pretraining. Analyzed feature clusters across Pythia checkpoints to study how neuron activation spaces evolve from exploration to specialization. Presented at MechInterp @ NeurIPS 2025.
        <p className="mt-3 text-[13px] text-theme-text-dim italic">
          Limaye, S.*, Ramesh, A.*, <strong>Zhou, A.*</strong>, et al. (2025). From Tokens to Semantics: The Emergence and Stabilization of Polysemanticity in Language Models.{" "}
          <a
            href="https://mechinterpworkshop.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-theme-accent-muted hover:text-theme-accent transition-colors not-italic"
          >
            NeurIPS 2025 Workshop on Mechanistic Interpretability
          </a>
          .
        </p>
      </>
    ),
  },
];

const journalism = [
  {
    title: "The best and worst of Yale dining",
    outlet: "article",
    note: "I scraped the Yale Menus app to analyze over 100,000 student food reviews. The story not only ranks Yale's best dining locations and entrees, but also provides a searchable directory of roughly 1,000 menu items.",
    href: "https://yaledailynews.com/articles/data-the-best-and-worst-of-yale-dining",
  },
  {
    title: "Yale Men's Basketball, by the numbers",
    outlet: "article",
    note: "I creatively present the Bulldogs' race to March Madness using animations and graphs, blending easy-to-grasp visuals with a thorough exploration of key statistics such as category leaders, scoring distribution, and shooting efficiency.",
    href: "https://yaledailynews.com/articles/data-yale-mens-basketball-by-the-numbers",
  },
  {
    title: "Yale professors donated overwhelmingly to Democrats in 2025",
    outlet: "article",
    note: "",
    sidenote: "data",
    href: "https://yaledailynews.com/articles/yale-professors-donated-overwhelmingly-to-democrats-in-2025",
  },
  {
    title: "Reading Without Pride: Augustine's Childlike Conversion",
    outlet: "Essay",
    note: "",
    href: "https://poorvucenter.yale.edu/sites/default/files/2026-01/Zhou-DRST001.pdf",
  },
];

const poetry = [
  {
    title: "Faint Scent of Floating Plums",
    note: "",
    href: "https://bluemarblereview.com/faint-scent-of-floating-plums/",
  },
];

const education = {
  institution: "Yale University",
  degree: "B.S. in Computer Science and Mathematics",
  gpa: "4.0/4.0",
  years: "Aug. 2024 — May 2028",
  location: "New Haven, CT",
  selectedCoursework: "Algorithms · Computational Vision · Deep Learning on Graph Structured Data · Advanced Linear Algebra · Analysis I / II · Discrete Math · Measure Theory ·",
  directedStudies: "Directed Studies: Literature, Philosophy, Historical and Political Thought",
};

const chessEmbedUrl = "https://www.chess.com/emboard?id=14723929";
const chessProfileUrl = "https://www.chess.com/member/karpovian123/";

const chessBlurb =
  "I have represented Canada at four World Youth Chess Championships, achieving a top age group ranking of 6th in the world. I'm also a USCF National Master, placed 37th in the World Open, and 39th in the North American Open.";
const navItems = [
  ["news", "News"],
  ["education", "Education"],
  ["experience", "Experience"],
  ["writing", "Writing"],
  ["chess", "Chess"],
];

function BackgroundArt() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, var(--theme-bg) 0%, var(--theme-bg-alt) 100%)",
        }}
      />
      <EinsteinTiling />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, var(--theme-vignette) 100%)`,
        }}
      />
    </div>
  );
}

function Section({ id, title, children, isActive, isVisible }) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 pt-10 first:pt-12 transition-all duration-500 ${
        isActive ? "border-l-2 border-theme-accent pl-6 -ml-6" : ""
      } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <h2 className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-theme-text-dim">
        {title}
      </h2>
      {children}
    </section>
  );
}

function InlineLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="interactive inline-flex items-center gap-2 text-sm text-theme-text-muted transition-all duration-200 hover:text-theme-accent hover:scale-105"
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </a>
  );
}

function TimelineItem({ kicker, title, body, bodyContent, href }) {
  const titleEl = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="interactive group inline-flex items-center gap-1.5 text-lg font-medium text-theme-text transition-colors hover:text-theme-accent"
    >
      {title}
      <ArrowUpRight className="h-4 w-4 opacity-60 group-hover:opacity-100" />
    </a>
  ) : (
    <h3 className="text-lg font-medium text-theme-text">{title}</h3>
  );
  return (
    <div className="grid gap-4 py-6 md:grid-cols-[120px_1fr] md:gap-8">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-theme-text-dim whitespace-nowrap">{kicker}</p>
      <div>
        {titleEl}
        <p className="mt-1.5 text-[15px] leading-relaxed text-theme-text-muted">{bodyContent ?? body}</p>
      </div>
    </div>
  );
}

function TextEntry({ overline, title, rightText, body, bodyContent, href, location }) {
  const rightColumn = (
      <div className="flex flex-col items-end gap-1.5 text-right shrink-0">
      <p className="font-mono text-xs font-medium uppercase tracking-wider text-theme-text-dim whitespace-nowrap">{rightText}</p>
      {location ? (
        <span className="text-xs text-theme-text-dim whitespace-nowrap">{location}</span>
      ) : null}
    </div>
  );

  const content = (
      <div className="grid gap-4 py-6 md:grid-cols-[1fr_120px] md:gap-8">
      <div>
        {overline ? <p className="mb-1 text-xs font-medium uppercase tracking-wider text-theme-text-dim">{overline}</p> : null}
        <h3 className="text-lg font-medium text-theme-text">{title}</h3>
        <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-theme-text-muted">{bodyContent ?? body}</p>
      </div>
      <div className="flex items-start justify-end md:pt-0.5">
        {rightColumn}
      </div>
    </div>
  );

  if (!href || href === "#") return content;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="interactive block transition-transform duration-200 hover:opacity-90"
    >
      <div className="group grid gap-4 py-6 md:grid-cols-[1fr_120px] md:gap-8">
        <div>
          {overline ? <p className="mb-1 text-xs font-medium uppercase tracking-wider text-theme-text-dim">{overline}</p> : null}
          <h3 className="inline-flex items-center gap-1.5 text-lg font-medium text-theme-text group-hover:text-theme-accent transition-colors">
            {title}
            <ArrowUpRight className="h-4 w-4 opacity-60 group-hover:opacity-100" />
          </h3>
          <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-theme-text-muted">{bodyContent ?? body}</p>
        </div>
        <div className="flex items-start justify-end md:pt-0.5">
          {rightColumn}
        </div>
      </div>
    </a>
  );
}

function ChessGameEmbed({ url }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mt-6 border border-theme-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="interactive w-full flex items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium text-theme-text-muted hover:text-theme-text transition-colors"
      >
        <span>One of my favorite games</span>
        <ChevronDown
          className={`h-4 w-4 text-theme-text-dim transition-transform duration-200 shrink-0 ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <div className="border-t border-theme-border bg-theme-bg-alt/50">
          {url ? (
            <iframe
              src={url}
              title="Chess game"
              className="w-full aspect-[4/3] max-h-[480px]"
              allowFullScreen
            />
          ) : (
            <p className="p-4 text-[13px] text-theme-text-dim">
              Add your Chess.com embed URL in the <code className="text-theme-text-muted">chessEmbedUrl</code> constant. Get it from any game: Share → Embed.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const THEME_KEY = "personal-site-theme";

export default function App() {
  const [activeSection, setActiveSection] = useState("news");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [visibleSections, setVisibleSections] = useState({ news: true });
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(THEME_KEY) || "dark";
    }
    return "dark";
  });

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem(THEME_KEY, next);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["news", "education", "experience", "writing", "chess"];
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { rootMargin: "-20px 0px -40px 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        activeObserver.observe(el);
        fadeObserver.observe(el);
      }
    });
    return () => {
      activeObserver.disconnect();
      fadeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Poppins:wght@300;400;500;600;700&display=swap");
      `}</style>
      <div className="min-h-screen bg-theme-bg text-theme-text antialiased transition-colors duration-300 [font-family:'Poppins',Inter,ui-sans-serif,system-ui,-apple-system,sans-serif]" data-theme={theme}>
        <BackgroundArt />

        <div className="relative mx-auto max-w-2xl px-6 py-16 md:max-w-[44rem] md:px-8 md:py-24">
          <header className="pb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h1 className="text-4xl font-semibold tracking-tight text-theme-text md:text-5xl">
                  {profile.name}
                </h1>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-theme-text-muted">
                  I'm a sophomore at Yale studying Computer Science and Mathematics. I'm drawn to the intersection of theory and practice — from analysis, algorithms, and foundational machine learning to AI safety and computational neuroscience. I aim to develop scalable systems that serve the public interest. Beyond that, I write, play chess competitively, and tutor math.
                </p>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-theme-text-dim">
                  {profile.location}
                </p>
                <div className="mt-8 flex flex-wrap gap-6">
                  {profile.links.map((link) => (
                    <InlineLink key={link.label} {...link} />
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="interactive shrink-0 rounded-full p-2 text-theme-text-dim transition-colors hover:text-theme-accent"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>

            <nav className="mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-theme-border pt-8 text-sm">
              {navItems.map(([href, label]) => (
                <a
                  key={href}
                  href={`#${href}`}
                  className="interactive text-theme-text-dim transition-all duration-200 hover:text-theme-accent hover:scale-105"
                >
                  {label}
                </a>
              ))}
            </nav>
          </header>

          <main className="border-t border-theme-border pt-4 pb-24 md:pt-6">
            <Section
              id="news"
              title="Recent News"
              isActive={activeSection === "news"}
              isVisible={visibleSections.news}>
              <div className="divide-y divide-theme-border">
                {recentNews.map((item) => (
                  <TimelineItem
                    key={`${item.date}-${item.title}`}
                    kicker={item.date}
                    title={item.title}
                    body={item.body}
                    bodyContent={item.bodyContent}
                    href={item.href}
                  />
                ))}
              </div>
            </Section>

            <Section
              id="education"
              title="Education"
              isActive={activeSection === "education"}
              isVisible={visibleSections.education}>
              <div className="divide-y divide-theme-border">
                <div className="grid gap-4 py-6 md:grid-cols-[1fr_120px] md:gap-8">
                  <div>
                    <p className="text-[15px] font-medium text-theme-text">{education.institution}</p>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-theme-text-muted">{education.degree} · GPA: {education.gpa}</p>
                  </div>
                  <div className="flex items-start justify-end md:pt-0.5">
                    <div className="flex flex-col items-end gap-1.5 text-right shrink-0">
                      <p className="font-mono text-xs font-medium uppercase tracking-wider text-theme-text-dim whitespace-nowrap">{education.years}</p>
                      <span className="text-xs text-theme-text-dim whitespace-nowrap">{education.location}</span>
                    </div>
                  </div>
                </div>
                <div className="py-6">
                  <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-theme-text-dim">Selected coursework</p>
                  <p className="text-[15px] leading-relaxed text-theme-text-muted">
                    {education.selectedCoursework}
                    <br />
                    {education.directedStudies}
                  </p>
                </div>
              </div>
            </Section>

            <Section
              id="experience"
              title="Experience"
              isActive={activeSection === "experience"}
              isVisible={visibleSections.experience}>
              <div className="divide-y divide-theme-border">
                {experience.map((item) => (
                  <TextEntry
                    key={`${item.org}-${item.role}`}
                    overline={item.org}
                    title={item.role}
                    rightText={item.period}
                    body={item.summary}
                    bodyContent={item.summaryContent}
                    location={item.location}
                  />
                ))}
              </div>
            </Section>

            <Section
              id="writing"
              title="Writing"
              isActive={activeSection === "writing"}
              isVisible={visibleSections.writing}>
              <div className="space-y-10">
                <div>
                  <p className="mb-6 text-[15px] leading-relaxed text-theme-text-muted">
                    I'm a student journalist on the managing boards of two Yale publications. As Data Editor at the{" "}
                    <a
                      href="https://yaledailynews.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-accent-muted hover:text-theme-accent transition-colors"
                    >
                      Yale Daily News
                    </a>
                    , I pitch data-driven stories, scrape and analyze web data, develop backend tools for more creative news presentations, and produce graphs, maps, and animations. On top of mentoring a desk of ~15 students, I've sought to advance our in-house technology by developing interactive stories and tools. I'm also Features Editor and Senior Staff Writer at the{" "}
                    <a
                      href="https://www.yalescientific.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-theme-accent-muted hover:text-theme-accent transition-colors"
                    >
                      Yale Scientific Magazine
                    </a>
                    .
                  </p>
                  <p className="mb-6 text-[15px] leading-relaxed text-theme-text-muted">
                    Beyond that, my poetry and essays have been selected for awards, including the Comet anthology and Yale's Poorvu Center Writing Contest. Below is a selection of my favorite reporting and creative work.
                  </p>
                  <div className="mt-6 space-y-3">
                  {journalism.map((piece) => (
                    <a
                      key={piece.title + piece.outlet}
                      href={piece.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive flex items-baseline gap-2 group"
                    >
                      <span className="text-xs font-medium uppercase tracking-wider text-theme-text-dim shrink-0">{piece.outlet}</span>
                      <span className="flex-1 min-w-0 inline-flex items-baseline gap-1.5">
                        <span className="text-[15px] text-theme-text-muted group-hover:text-theme-accent transition-colors">{piece.title}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 shrink-0" />
                        {piece.sidenote ? (
                          <span className="ml-1 text-xs text-theme-text-dim">({piece.sidenote})</span>
                        ) : null}
                      </span>
                    </a>
                  ))}
                  {poetry.filter((piece) => piece.title && piece.href && piece.href !== "#" && !piece.title.toLowerCase().includes("add poem")).map((piece) => (
                    <a
                      key={piece.title}
                      href={piece.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interactive flex items-baseline gap-2 group"
                    >
                      <span className="text-xs font-medium uppercase tracking-wider text-theme-text-dim shrink-0">poem</span>
                      <span className="inline-flex items-baseline gap-1.5">
                        <span className="text-[15px] text-theme-text-muted group-hover:text-theme-accent transition-colors">{piece.title}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 shrink-0" />
                      </span>
                    </a>
                  ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section
              id="chess"
              title="Chess"
              isActive={activeSection === "chess"}
              isVisible={visibleSections.chess}>
              <div className="space-y-4">
                <p className="text-[15px] leading-relaxed text-theme-text-muted">{chessBlurb}</p>
                <p className="text-[15px] leading-relaxed text-theme-text-muted">
                  I try to stay active on{" "}
                  <a
                    href={chessProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-theme-accent-muted hover:text-theme-accent transition-colors"
                  >
                    chess.com
                  </a>
                  {" "}— send me a friend request!
                </p>
                <ChessGameEmbed url={chessEmbedUrl} />
              </div>
            </Section>
          </main>

          <footer className="pt-6 pb-8 border-t border-theme-border space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs text-theme-text-dim">© {new Date().getFullYear()}</p>
              {showBackToTop && (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="interactive inline-flex items-center gap-1.5 text-xs text-theme-text-dim transition hover:text-theme-text-muted hover:scale-105"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                  Back to top
                </a>
              )}
            </div>
            <p className="text-xs text-theme-text-dim">
              Made with React, Vite, and Tailwind CSS. Background: an aperiodic{" "}
              <a
                href="https://en.wikipedia.org/wiki/Einstein_problem"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme-accent-muted hover:text-theme-accent transition-colors"
              >
                Einstein tiling
              </a>
              .
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
