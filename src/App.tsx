import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import tiktokLogo from './assets/tiktok.svg';

type ProjectStatus = 'Live' | 'Growing' | 'Next';

interface ProjectCard {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  summary: string;
  status: ProjectStatus;
  accent: 'core' | 'teal' | 'violet';
  metrics: string[];
  audience: string;
  detail: string[];
  website: string;
}

const projects: ProjectCard[] = [
  {
    slug: 'planary-core',
    name: 'Planary Core',
    tagline: 'Digital experiences shaped around clarity and momentum',
    description:
      'A polished product hub that presents the Planary ecosystem in a clear, memorable way for customers, partners, and future collaborators.',
    summary:
      'A clean presentation layer that turns multiple internal efforts into one recognizable public-facing brand experience.',
    status: 'Live',
    accent: 'core',
    metrics: ['Brand presence', 'Product overview', 'Scalable structure'],
    audience: 'Companies, partners, and employers who need a quick overview of what Planary builds.',
    website: 'https://planary.ch',
    detail: [
      'Planary acts as the public front door for the wider product ecosystem and introduces the tone of the whole brand.',
      'Its role is to give customers and potential collaborators a quick, polished understanding of what the team is building.',
      'The site is structured as a portfolio-style layer, making it easier to extend the ecosystem with more products over time.',
    ],
  },
  {
    slug: 'tournament',
    name: 'Tournament',
    tagline: 'Competitive event planning',
    description:
      'A dedicated experience for organizing tournaments, brackets, event flow, and the operational details that keep competition moving.',
    summary:
      'Built for structured competition planning with a focus on scheduling, bracket clarity, and event coordination.',
    status: 'Growing',
    accent: 'teal',
    metrics: ['Brackets', 'Scheduling', 'Match flow'],
    audience: 'Organizers, event teams, gaming communities, and clubs running competitive formats.',
    website: 'https://tournament.planary.ch',
    detail: [
      'Tournament focuses on tournament control without the chaos, giving organizers a clearer overview of events, brackets, and participants.',
      'The product is built around faster updates, smoother handovers, and a cleaner administrative flow for competitive events.',
      'Within the Planary ecosystem, it demonstrates how the same visual language can support a much more operational product without losing clarity.',
    ],
  },
  {
    slug: 'planary-wishlist',
    name: 'Planary Wishlist',
    tagline: 'Gift planning with structure',
    description:
      'A calmer way to collect ideas, organize wishlists, and create a recognizable Planary experience for everyday planning.',
    summary:
      'A wishlist product that makes saving, organizing, and sharing gift ideas feel elegant instead of scattered.',
    status: 'Live',
    accent: 'violet',
    metrics: ['Wishlists', 'Sharing', 'Product tracking'],
    audience: 'Individuals, families, and social circles who want a simple but polished way to manage gift ideas.',
    website: 'https://wishlist.planary.ch',
    detail: [
      'Planary Wishlist combines a calm visual identity with a practical everyday use case people can return to often.',
      'The experience is designed to make saving, organizing, and sharing gift ideas feel thoughtful rather than cluttered.',
      'It also serves as a strong example of how Planary approaches small consumer tools with the same care as larger product surfaces.',
    ],
  },
];


function SiteFrame({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const pageTitle = useMemo(() => {
    if (location.pathname.startsWith('/projects/')) {
      const slug = location.pathname.replace('/projects/', '');
      const project = projects.find((entry) => entry.slug === slug);
      return project ? `${project.name} | Planary` : 'Planary';
    }
    if (location.pathname === '/team') {
      return 'Team | Planary';
    }
    if (location.pathname === '/contact') {
      return 'Contact | Planary';
    }
    return 'Planary';
  }, [location.pathname]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Planary Home">
          <img
            src="/brand-icon.svg"
            alt="Planary"
            className="brand-logo"
          />
          <span className="brand-copy">
            <span className="brand-title">Planary</span>
            <span className="brand-subtitle">Dashboard</span>
          </span>
        </Link>

        <div className="header-actions">
          <button
            type="button"
            className={`menu-toggle-btn ${isMenuOpen ? 'is-open' : ''}`}
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            aria-label="Toggle Navigation Menu"
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            id="primary-navigation"
            className={`site-nav ${isMenuOpen ? 'is-open' : ''}`}
            aria-label="Primary Navigation"
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Projects</Link>
            <Link to="/team" onClick={() => setIsMenuOpen(false)}>Team</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </nav>

        </div>
      </header>

      <main id="top" className="main-content">
        {children}
      </main>

      <footer id="footer" className="site-footer">
        <div className="footer-content">
          <span className="copyright">
            &copy; {new Date().getFullYear()} Planary
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
            <Link to="/team">Team</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <section className="hero-panel hero-panel-single">
        <div className="hero-copy">
          <span className="eyebrow">Planary</span>
          <h1>Digital products with a clear purpose.</h1>
          <a href="#projects" className="primary-link">
            View projects
          </a>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="project-grid">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className={`project-card ${project.accent} project-card-link`}
            >
              <div className="project-copy">
                <h3>{project.name}</h3>
                <p className="tagline">{project.tagline}</p>
              </div>
              <div className="project-footer">
                <strong className="inline-link">Open →</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectPage() {
  const location = useLocation();
  const slug = location.pathname.replace('/projects/', '');
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="project-detail-shell">
      <div className={`project-detail-card ${project.accent}`}>
        <div className="project-detail-back">
          <Link to="/" className="secondary-link">
            Back to projects
          </Link>
        </div>

        <span className="eyebrow">{project.name}</span>
        <h1>{project.tagline}</h1>
        <p className="project-detail-lead">{project.description}</p>

        <div className="project-detail-grid">
          <article className="detail-panel">
            <h2>Summary</h2>
            <p>{project.summary}</p>
          </article>
          <article className="detail-panel">
            <h2>Audience</h2>
            <p>{project.audience}</p>
          </article>
        </div>

        <div className="detail-panel detail-panel-wide">
          <h2>Project overview</h2>
          <div className="detail-copy-stack">
            {project.detail.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="detail-panel detail-panel-wide">
          <h2>Key themes</h2>
          <p className="project-detail-lead">{project.metrics.join(' · ')}</p>
        </div>

        <div className="detail-panel detail-panel-wide">
          <h2>Live product</h2>
          <a href={project.website} target="_blank" rel="noreferrer" className="primary-link">
            Visit {project.name}
          </a>
        </div>
      </div>
    </section>
  );
}

function TeamPage() {
  return (
    <section className="team-shell">
      <div className="team-card">
        <span className="eyebrow">Team</span>
        <h1>Space reserved for the Planary team page.</h1>
        <p>
          This page is intentionally separated from the public portfolio so team-specific
          information can be added later without cluttering the customer-facing homepage.
        </p>

        <div className="detail-panel detail-panel-wide">
          <h2>Planned content</h2>
          <div className="team-list">
            <span>Team introductions</span>
            <span>Working principles</span>
            <span>Roles and collaboration</span>
            <span>Internal updates or hiring context</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="contact-shell">
      <div className="contact-card">
        <span className="eyebrow">Contact</span>
        <h1>Get in touch with Planary.</h1>
        <p className="contact-lead">
          Reach out for product questions, collaboration, partnerships, or anything else related to the Planary ecosystem.
        </p>

        <div className="contact-grid">
          <article className="detail-panel">
            <h2>Email</h2>
            <p>The best way to start a conversation is by email.</p>
            <a className="primary-link" href="mailto:info@planary.ch">
              info@planary.ch
            </a>
          </article>

          <article className="detail-panel">
            <h2>Social</h2>
            <p>You can also reach Planary through the social channels listed below.</p>
            <div className="contact-links">
              <a href="https://instagram.com/planaryofficial" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://www.tiktok.com/@planaryofficial" target="_blank" rel="noreferrer">TikTok</a>
              <a href="https://github.com/planary" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </article>
        </div>

        <div className="detail-panel detail-panel-wide">
          <h2>What to include</h2>
          <div className="detail-copy-stack">
            <p>Tell us which product you are asking about and what kind of help or context you need.</p>
            <p>If your message is about a collaboration or partnership, a short description of the idea is enough to get started.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <SiteFrame>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SiteFrame>
  );
}

export default App;
