import { useEffect, useState } from 'react';

import logoBlau from './assets/blauOH.png';
import logoViolette from './assets/violetteOH.png';
import moonEmpty from './assets/moonEmpty.svg';
import moonFull from './assets/moonFull.svg';
import sunEmpty from './assets/sunEmpty.svg';
import sunFull from './assets/sunFull.svg';
import tiktokLogo from './assets/tiktok.svg';

type ProjectStatus = 'Live' | 'Growing' | 'Next';

interface ProjectCard {
  name: string;
  tagline: string;
  description: string;
  status: ProjectStatus;
  accent: 'core' | 'teal' | 'violet';
  cta: string;
  href?: string;
  metrics: string[];
}

const projects: ProjectCard[] = [
  {
    name: 'Planary Core',
    tagline: 'The shared product dashboard',
    description:
      'A single entry point for the team to track direction, product rollout, and visual consistency across the whole Planary ecosystem.',
    status: 'Live',
    accent: 'core',
    cta: 'Dashboard active',
    metrics: ['Shared overview', 'Design alignment', 'Team home'],
  },
  {
    name: 'Tournamount',
    tagline: 'Competitive event planning',
    description:
      'A dedicated surface for tournaments, brackets, event flow, and the operational details that keep organized competition moving.',
    status: 'Growing',
    accent: 'teal',
    cta: 'Add hosted link',
    metrics: ['Brackets', 'Scheduling', 'Match flow'],
  },
  {
    name: 'Planary Wishlist',
    tagline: 'Gift planning with structure',
    description:
      'A calmer way to collect ideas, organize wishlists, and create a recognizable Planary experience for everyday planning.',
    status: 'Live',
    accent: 'violet',
    cta: 'Add hosted link',
    metrics: ['Wishlists', 'Sharing', 'Product tracking'],
  },
];

const highlights = [
  {
    label: 'Purpose',
    title: 'Unified ecosystem',
    copy: 'The dashboard gives every Planary product the same design language, rhythm, and first impression.',
  },
  {
    label: 'Team Flow',
    title: 'Faster orientation',
    copy: 'New collaborators can land here first and immediately understand what belongs where.',
  },
  {
    label: 'Growth',
    title: 'Ready for more apps',
    copy: 'Future modules can drop into the same card system without redesigning the whole shell.',
  },
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.title = 'Planary Dashboard';
  }, [isDarkMode]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Planary Dashboard Home">
          <img
            src={isDarkMode ? logoViolette : logoBlau}
            alt="Planary"
            className="brand-logo"
          />
        </a>

        <nav className="site-nav" aria-label="Primary Navigation">
          <a href="#projects">Projects</a>
          <a href="#system">System</a>
          <a href="#footer">Contact</a>
        </nav>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={() => setIsDarkMode((value) => !value)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Toggle Theme"
        >
          <img
            src={
              isDarkMode
                ? (isHovered ? sunFull : sunEmpty)
                : (isHovered ? moonFull : moonEmpty)
            }
            alt=""
            className="theme-icon"
          />
        </button>
      </header>

      <main id="top" className="main-content">
        <section className="hero-panel">
          <div className="hero-copy">
            <span className="eyebrow">Planary Workspace</span>
            <h1>One dashboard for every product in the Planary world.</h1>
            <p>
              This standalone frontend gives your team a central place to present
              `Tournamount`, `Planary Wishlist`, and any future project with a shared
              visual identity that already feels close to the existing apps.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="primary-link">
                Explore projects
              </a>
              <a href="https://vercel.com/new" className="secondary-link">
                Deploy on Vercel
              </a>
            </div>
          </div>

          <aside id="system" className="overview-card">
            <span className="eyebrow">Workspace Pulse</span>
            <div className="overview-grid">
              <article>
                <strong>3</strong>
                <span>Products mapped</span>
              </article>
              <article>
                <strong>2</strong>
                <span>Live experiences</span>
              </article>
              <article>
                <strong>1</strong>
                <span>Shared interface system</span>
              </article>
              <article>
                <strong>Next</strong>
                <span>Attach live product URLs</span>
              </article>
            </div>
            <div className="overview-focus">
              <span>Current focus</span>
              <strong>Unify the visual language across apps</strong>
            </div>
          </aside>
        </section>

        <section className="highlight-grid">
          {highlights.map((item) => (
            <article key={item.title} className="highlight-card">
              <span className="eyebrow">{item.label}</span>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </section>

        <section id="projects" className="projects-section">
          <div className="section-heading">
            <span className="eyebrow">Projects</span>
            <h2>Products currently grouped under Planary</h2>
            <p>
              The cards use the same soft-glow borders, rounded surfaces, and blue-to-violet
              mood from your current work so they feel connected from day one.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.name} className={`project-card ${project.accent}`}>
                <div className="project-topline">
                  <span className="status-pill">{project.status}</span>
                  <span className="status-note">
                    {project.status === 'Live'
                      ? 'Ready to present'
                      : project.status === 'Growing'
                        ? 'Actively expanding'
                        : 'Queued next'}
                  </span>
                </div>

                <div className="project-copy">
                  <h3>{project.name}</h3>
                  <p className="tagline">{project.tagline}</p>
                  <p>{project.description}</p>
                </div>

                <div className="metric-list">
                  {project.metrics.map((metric) => (
                    <span key={metric}>{metric}</span>
                  ))}
                </div>

                <div className="project-footer">
                  {project.href ? (
                    <a href={project.href} className="inline-link">
                      {project.cta}
                    </a>
                  ) : (
                    <span className="placeholder-link">{project.cta}</span>
                  )}
                  <span className="footer-note">
                    {project.href
                      ? 'Linked to the live product'
                      : 'Replace with the real deployment URL when ready'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer id="footer" className="site-footer">
        <div className="footer-content">
          <span className="copyright">
            &copy; {new Date().getFullYear()} Planary. Built for a shared team dashboard.
          </span>

          <div className="footer-socials">
            <a href="https://github.com/planary" target="_blank" rel="noreferrer" className="social-link">
              <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" />
            </a>
            <a href="https://instagram.com/planaryofficial" target="_blank" rel="noreferrer" className="social-link">
              <img src="https://www.svgrepo.com/show/521711/instagram.svg" alt="Instagram" />
            </a>
            <a href="https://www.tiktok.com/@planaryofficial" target="_blank" rel="noreferrer" className="social-link">
              <img src={tiktokLogo} alt="TikTok" style={{ width: '26px', height: '26px' }} />
            </a>
          </div>

          <div className="footer-links">
            <a href="#top">Top</a>
            <a href="#projects">Projects</a>
            <a href="https://vercel.com">Vercel</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
