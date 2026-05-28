import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, MapPin } from 'lucide-react';
import './styles.css';
import { TELEGRAM_PROFILE_URL, CATEGORIES, profile, projects } from './data';

function App() {
  const [loaded, setLoaded] = React.useState(false);
  const path = window.location.pathname.replace(/\/$/, '') || '/';

  React.useEffect(() => {
    if (!window.location.hash) return;
    window.requestAnimationFrame(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    });
  }, [path]);

  let page;
  if (path === '/work') {
    page = <AllWorksPage />;
  } else if (path.startsWith('/work/')) {
    const slug = path.split('/').filter(Boolean).at(-1);
    const project = projects.find((item) => item.slug === slug);
    page = project ? <ProjectPage project={project} /> : <NotFoundPage />;
  } else {
    page = <HomePage />;
  }

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      <PageFrame page={page} />
    </>
  );
}

function LoadingScreen({ onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="loading-screen">
      <img src="/assets/mayasarchive-icon-transparent.png" alt="" className="loading-logo" />
    </div>
  );
}

function PageFrame({ page }) {
  return (
    <>
      <Header />
      <main>{page}</main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="maya home">
        <img src="/assets/mayasarchive-icon-transparent.png" alt="mayasarchive" className="brand-logo" />
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="/#about">About</a>
        <a href="/work">Work</a>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <HeroSection />

      <Divider />

      <InfoSection id="about" eyebrow="About me" title="Addicting and converting motion">
        <div className="about-copy">
          {profile.bio.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <PlainList title="Roles" items={profile.roles} />
        <a className="work-button" href={TELEGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          Work with me
          <ArrowUpRight aria-hidden="true" size={20} />
        </a>
      </InfoSection>

      <Divider />

      <WorksPreview />
    </>
  );
}

function HeroSection() {
  return (
    <section className="hero-full fade-up" style={{ animationDelay: '0.1s' }}>
      <div className="hero-bg">
        <video
          className="hero-video"
          src="/assets/maya_logo.mp4"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
      </div>
      <div className="hero-bottom section-shell">
        <div className="location">
          <MapPin aria-hidden="true" size={18} />
          <span>{profile.location}</span>
        </div>
        <SocialLinks />
      </div>
    </section>
  );
}

function WorksPreview() {
  const picks = projects.slice(0, 4);
  return (
    <section className="section-shell works-preview fade-up" id="work" style={{ animationDelay: '0.3s' }}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2>from the archive</h2>
        </div>
        <a className="text-link" href="/work">
          View all
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
      </div>
      <div className="works-title-list">
        {picks.map((project, i) => (
          <a key={project.id} href={`/work/${project.slug}`} className="works-title-item">
            <span className="works-title-num">0{i + 1}</span>
            <span className="works-title-name">{project.title}</span>
            <span className="works-title-cat">{project.skills[0]}</span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}

function AllWorksPage() {
  const TIKTOK_URL = 'https://www.tiktok.com/@mayasarchive.zip';
  return (
    <section className="section-shell archive-page">
      <p className="eyebrow">All works</p>
      <div className="page-title-row">
        <h1>maya's work</h1>
        <a className="text-link" href="/">
          Home
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
      </div>

      {CATEGORIES.map((cat) => {
        const catProjects = projects.filter((p) => p.category === cat.id);
        return (
          <React.Fragment key={cat.id}>
            <div className="work-category fade-up">
              <div className="work-category-header">
                <span className="eyebrow">{cat.label}</span>
                <div className="work-category-line" aria-hidden="true" />
              </div>
              {catProjects.length > 0 ? (
                <div className="work-grid">
                  {catProjects.map((project) => (
                    <ProjectTile key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <p className="work-category-empty">Coming soon.</p>
              )}
              {cat.id === 'social-media-ads' && (
                <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="tiktok-cta">
                  <SocialIcon name="tiktok" />
                  view the rest on tiktok
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </section>
  );
}

function ProjectPage({ project }) {
  const moreProjects = projects.filter((item) => item.id !== project.id).slice(0, 2);

  return (
    <article className="project-page">
      <section className="section-shell project-hero fade-up">
        <a className="text-link" href="/work">
          All works
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
        <p className="eyebrow">Project</p>
        <h1>{project.title}</h1>
        <p className="project-summary">{project.summary}</p>
      </section>

      <section className="section-shell project-detail-grid fade-up" style={{ animationDelay: '0.15s' }}>
        <div className="project-showcase">
          {(Array.isArray(project.media) ? project.media : [project.media]).map((item, i) => {
            if (item?.text) {
              return <p key={i} className="project-media-text">{item.text}</p>;
            }
            return (
              <div key={i} className="project-gallery-item">
                <VideoPreview src={item} title={`${project.title} — ${i + 1}`} controls />
              </div>
            );
          })}
        </div>
        <aside className="project-meta" aria-label="Project details">
          <PlainList title="Tools used" items={project.tools} />
          <div className="mini-divider" />
          <PlainList title="Skills" items={project.skills} />
          <a className="view" href={project.externalUrl} target="_blank" rel="noopener noreferrer">
            View project
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </aside>
      </section>

      <section className="section-shell cta-band">
        <Divider compact />
        <a className="work-button" href={TELEGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer">
          Work with me
          <ArrowUpRight aria-hidden="true" size={20} />
        </a>
        <Divider compact />
      </section>

      {moreProjects.length > 0 && (
        <section className="section-shell more-section fade-up">
          <div className="section-heading">
            <div>
              <p className="eyebrow">More projects</p>
              <h2>Keep watching</h2>
            </div>
          </div>
          <div className="more-grid">
            {moreProjects.map((item) => (
              <ProjectTile key={item.id} project={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function NotFoundPage() {
  return (
    <section className="section-shell archive-page">
      <p className="eyebrow">Not found</p>
      <h1>That project is not in the archive yet.</h1>
      <a className="work-button" href="/work">
        View all work
        <ArrowUpRight aria-hidden="true" size={20} />
      </a>
    </section>
  );
}

function InfoSection({ id, eyebrow, title, children }) {
  return (
    <section className="section-shell info-section fade-up" id={id}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className="info-content">{children}</div>
    </section>
  );
}

function ProjectTile({ project }) {
  return (
    <a className="project-tile" href={`/work/${project.slug}`} aria-label={`Open ${project.title}`}>
      <div className="project-media small">
        <VideoPreview
          src={project.thumbnail || (Array.isArray(project.media) ? project.media[0] : project.media)}
          title={project.title}
        />
      </div>
      <div className="project-tile-copy">
        <h3>{project.title}</h3>
        <span>{project.skills.join(', ')}</span>
      </div>
    </a>
  );
}

function SocialLinks({ inverted = false }) {
  return (
    <div className={inverted ? 'social-links inverted' : 'social-links'} aria-label="Social links">
      {profile.links.map((link) => (
        <a key={link.href} href={link.href} aria-label={link.label} title={link.label} target={link.target} rel={link.rel}>
          <SocialIcon name={link.icon} />
        </a>
      ))}
    </div>
  );
}

function PlainList({ title, items }) {
  return (
    <div className="plain-list">
      <h3>{title}</h3>
      <p>{items.join(' / ')}</p>
    </div>
  );
}

function Divider({ compact = false }) {
  return <div className={compact ? 'divider compact section-shell' : 'divider section-shell'} aria-hidden="true" />;
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div>
          <p>{profile.roles.join(' - ')}</p>
          <h2>{profile.name}</h2>
          <p className="copyright-text">© MAYASARCHIVE 2026. All rights reserved.</p>
        </div>
        <SocialLinks inverted />
      </div>
    </footer>
  );
}

function VideoPreview({ src, title, controls = false }) {
  if (!src || typeof src !== 'string') return null;
  const isImage = /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(src);
  if (isImage) return <img src={src} alt={title} />;
  return (
    <video aria-label={title} autoPlay controls={controls} loop muted playsInline preload="metadata" src={src} />
  );
}

function SocialIcon({ name }) {
  const icons = {
    x: <path d="M14.7 10.5 21.5 3h-1.6l-5.9 6.5L9.3 3H4l7.1 9.8L4 20.6h1.6l6.2-6.8 5 6.8H22l-7.3-10.1Zm-2.2 2.4-.7-1L6 4.2h2.5l4.7 6.4.7 1 6.1 8.1h-2.5l-5-6.8Z" />,
    instagram: <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.8 2.1a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7.2A4.8 4.8 0 1 1 12 16.8 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z" />,
    tiktok: <path d="M15.2 2c.4 3 2.1 4.8 4.8 5v3.1a7.7 7.7 0 0 1-4.7-1.5v6.8c0 3.4-2.3 6.6-6.5 6.6a6.4 6.4 0 0 1-1.3-12.7 6.7 6.7 0 0 1 2.6.1v3.3a3.4 3.4 0 1 0 2 3.1V2h3.1Z" />,
    pinterest: <path d="M12.2 2C6.6 2 3 5.7 3 10.2c0 3 1.7 5.4 4.3 6.4.5.2.8 0 .9-.5l.3-1.3c.1-.4.1-.5-.2-.9-.8-1-1.3-2.1-1.3-3.7 0-3 2.3-5.7 6-5.7 3.3 0 5.1 2 5.1 4.7 0 3.5-1.5 6.4-3.9 6.4-1.3 0-2.2-1.1-1.9-2.4.4-1.5 1.1-3.1 1.1-4.2 0-1-.5-1.8-1.6-1.8-1.3 0-2.3 1.3-2.3 3.1 0 1.1.4 1.9.4 1.9l-1.5 6.2c-.4 1.8-.1 4 .1 5.6h.6c.8-1.1 1.7-2.8 2.2-4.4l.7-2.8c.7 1.3 2 2 3.5 2 4.6 0 7.5-4.2 7.5-9.4C23 5.4 19.1 2 12.2 2Z" />,
    youtube: <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.8 12 2.8 12 2.8s-4.6 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.2.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.6 21.9 12 22 12 22s4.6 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7ZM9.7 15.5V8.4l8.1 3.6-8.1 3.5Z" />,
    shop: <path d="M3 5h2l2.2 9.2c.1.5.6.8 1.1.8h9.4c.5 0 .9-.3 1.1-.7L21 8H7.2m2 11a1.5 1.5 0 1 0 0 .01M17 19a1.5 1.5 0 1 0 0 .01" />,
    email: <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.01L12 13 20 6.01V6H4Zm0 12h16V8.99l-8 6.92-8-6.92V18Z" />,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false" fill="currentColor">
      {icons[name]}
    </svg>
  );
}

createRoot(document.getElementById('root')).render(<App />);
