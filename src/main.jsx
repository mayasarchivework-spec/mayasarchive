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
    Email: <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.01L12 13 20 6.01V6H4Zm0 12h16V8.99l-8 6.92-8-6.92V18Z" />,
    threads: <path class="x19hqcy" d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path>,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false" fill="currentColor">
      {icons[name]}
    </svg>
  );
}

createRoot(document.getElementById('root')).render(<App />);
