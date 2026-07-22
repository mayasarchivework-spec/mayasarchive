import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  MessageCircle,
} from 'lucide-react';
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

  React.useEffect(() => {
    const blockMediaSave = (event) => {
      if (event.target instanceof Element && event.target.closest('img, video')) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', blockMediaSave);
    document.addEventListener('dragstart', blockMediaSave);
    return () => {
      document.removeEventListener('contextmenu', blockMediaSave);
      document.removeEventListener('dragstart', blockMediaSave);
    };
  }, []);

  let page;
  const slug = path.split('/').filter(Boolean).at(-1);
  const project = slug ? projects.find((item) => item.slug === slug) : null;
  if (project) {
    page = <ProjectPage project={project} />;
  } else if (path === '/') {
    page = <HomePage />;
  } else {
    page = <NotFoundPage />;
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
    const t = setTimeout(onDone, 1200);
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
      <div className="page-backdrop" aria-hidden="true" />
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
        <img src="/assets/mayasarchive-icon-transparent.png" alt="" className="brand-logo" />
      </a>
      <a className="button primary header-cta" href={TELEGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={16} aria-hidden="true" />
        Work with me
      </a>
    </header>
  );
}

function HomePage() {
  const [activeCategoryId, setActiveCategoryId] = React.useState('all');
  const filteredProjects = activeCategoryId === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategoryId);

  return (
    <>
      <HeroVideoSection />
      <div className="section-shell">
        <hr className="section-divider" />
      </div>
      <section className="section-shell home-filter-section fade-up">
        <div className="home-filter" role="tablist" aria-label="Filter work categories">
          <button
            type="button"
            className={activeCategoryId === 'all' ? 'is-active' : undefined}
            role="tab"
            aria-selected={activeCategoryId === 'all'}
            onClick={() => setActiveCategoryId('all')}
          >
            All
          </button>
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                type="button"
                className={isActive ? 'is-active' : undefined}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategoryId(cat.id)}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>
      <section className="section-shell home-works fade-up">
        {filteredProjects.length > 0 ? (
          <div className="work-grid" aria-label="Filtered works">
            {filteredProjects.map((project, index) => (
              <ProjectTile key={project.id} project={project} index={index + 1} />
            ))}
          </div>
        ) : (
          <p className="work-category-empty">No works in this category yet.</p>
        )}
      </section>
    </>
  );
}

function HeroVideoSection() {
  return (
    <section className="hero-video-section" aria-label="Hero video">
      <video
        className="hero-bg-video"
        src="/assets/maya_logo.mp4"
        autoPlay
        loop
        muted
        playsInline
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        draggable="false"
        aria-label="Mayasarchive animated logo"
      />
    </section>
  );
}

function ProjectPage({ project }) {
  const moreProjects = projects.filter((item) => item.id !== project.id).slice(0, 2);
  const mediaItems = getProjectItems(project);

  return (
    <article className="project-page">
      <section className="section-shell project-intro fade-up">
        <div className="project-intro-copy">
          <p className="eyebrow">Project case</p>
          <h1>{project.title}</h1>
          <p className="project-summary">{project.summary}</p>
        </div>
      </section>

      <section className="section-shell project-detail-layout fade-up" style={{ animationDelay: '0.12s' }}>
        <div className="project-media-stack">
          {mediaItems.map((item, i) => {
            if (item?.text) {
              return <p key={i} className="project-media-text">{item.text}</p>;
            }

            const src = typeof item === 'string' ? item : item?.src;
            return (
              <div key={`${src}-${i}`} className="project-media-block">
                <VideoPreview src={src} title={`${project.title} ${i + 1}`} controls />
              </div>
            );
          })}
        </div>
        <aside className="project-meta" aria-label="Project details">
          <div>
            <p className="eyebrow">Details</p>
            <h2>{project.title}</h2>
          </div>
          <PlainList title="Tools used" items={project.tools} />
          <PlainList title="Skills" items={project.skills} />
          <div className="project-actions">
            {project.externalUrl && (
              <a className="button secondary" href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                View project
                <ArrowUpRight aria-hidden="true" size={17} />
              </a>
            )}
            <a className="button primary" href={TELEGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              Work with me
              <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
        </aside>
      </section>

      {moreProjects.length > 0 && (
        <section className="section-shell more-section fade-up">
          <div className="section-heading">
            <div>
              <p className="eyebrow">More works</p>
              <h2>keep browsing</h2>
            </div>
          </div>
          <div className="more-grid">
            {moreProjects.map((item, index) => (
              <ProjectTile key={item.id} project={item} index={index + 1} />
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
      <a className="button primary" href="/">
        <ArrowUpRight aria-hidden="true" size={18} />
        Go home
      </a>
    </section>
  );
}

function ProjectTile({ project, index }) {
  const thumbnail = getProjectThumbnail(project);

  return (
    <a className="project-tile" href={`/${project.slug}`} aria-label={`Open ${project.title}`}>
      <div className="project-media small">
        <VideoPreview src={thumbnail} title={project.title} />
      </div>
      <div className="project-tile-copy">
        <span className="project-number">{String(index ?? 1).padStart(2, '0')}</span>
        <h3>{project.title}</h3>
        <p>{project.skills.join(' / ')}</p>
        <ArrowUpRight size={18} aria-hidden="true" />
      </div>
    </a>
  );
}

function getProjectItems(project) {
  const media = Array.isArray(project.media) ? project.media : [project.media];
  return media.filter(Boolean);
}

function getProjectMedia(project) {
  return getProjectItems(project)
    .filter((item) => !item?.text)
    .map((item) => (typeof item === 'string' ? item : item?.src))
    .filter(Boolean);
}

function getProjectThumbnail(project) {
  return project.thumbnail || getProjectMedia(project)[0];
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
  const cleanItems = items.filter(Boolean);

  return (
    <div className="plain-list">
      <h3>{title}</h3>
      <p>{cleanItems.join(' / ')}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div>
          <p>{profile.roles.filter(Boolean).join(' / ')}</p>
          <h2>{profile.name}</h2>
          <p className="copyright-text">&copy; MAYASARCHIVE 2026.</p>
        </div>
        <SocialLinks inverted />
      </div>
    </footer>
  );
}

function VideoPreview({ src, title, controls = false }) {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (!videoRef.current || controls) return;
    const play = () => videoRef.current?.play().catch(() => {});
    play();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) play();
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [src, controls]);

  if (!src || typeof src !== 'string') return null;
  const isImage = /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(src);
  if (isImage) return <img src={src} alt={title} draggable="false" />;
  return (
    <video
      ref={videoRef}
      aria-label={title}
      autoPlay={!controls}
      controls={controls}
      controlsList="nodownload noplaybackrate noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      draggable="false"
      loop
      muted
      playsInline
      preload="auto"
      src={src}
    />
  );
}

function SocialIcon({ name }) {
  const icons = {
    x: <path d="M14.7 10.5 21.5 3h-1.6l-5.9 6.5L9.3 3H4l7.1 9.8L4 20.6h1.6l6.2-6.8 5 6.8H22l-7.3-10.1Zm-2.2 2.4-.7-1L6 4.2h2.5l4.7 6.4.7 1 6.1 8.1h-2.5l-5-6.8Z" />,
    instagram: <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm8.8 2.1a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7.2A4.8 4.8 0 1 1 12 16.8 4.8 4.8 0 0 1 12 7.2Zm0 2A2.8 2.8 0 1 0 12 14.8 2.8 2.8 0 0 0 12 9.2Z" />,
    tiktok: <path d="M15.2 2c.4 3 2.1 4.8 4.8 5v3.1a7.7 7.7 0 0 1-4.7-1.5v6.8c0 3.4-2.3 6.6-6.5 6.6a6.4 6.4 0 0 1-1.3-12.7 6.7 6.7 0 0 1 2.6.1v3.3a3.4 3.4 0 1 0 2 3.1V2h3.1Z" />,
    pinterest: <path d="M12.2 2C6.6 2 3 5.7 3 10.2c0 3 1.7 5.4 4.3 6.4.5.2.8 0 .9-.5l.3-1.3c.1-.4.1-.5-.2-.9-.8-1-1.3-2.1-1.3-3.7 0-3 2.3-5.7 6-5.7 3.3 0 5.1 2 5.1 4.7 0 3.5-1.5 6.4-3.9 6.4-1.3 0-2.2-1.1-1.9-2.4.4-1.5 1.1-3.1 1.1-4.2 0-1-.5-1.8-1.6-1.8-1.3 0-2.3 1.3-2.3 3.1 0 1.1.4 1.9.4 1.9l-1.5 6.2c-.4 1.8-.1 4 .1 5.6h.6c.8-1.1 1.7-2.8 2.2-4.4l.7-2.8c.7 1.3 2 2 3.5 2 4.6 0 7.5-4.2 7.5-9.4C23 5.4 19.1 2 12.2 2Z" />,
    youtube: <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.8 12 2.8 12 2.8s-4.6 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.2.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.6 21.9 12 22 12 22s4.6 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7ZM9.7 15.5V8.4l8.1 3.6-8.1 3.5Z" />,
    Email: <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.01L12 13 20 6.01V6H4Zm0 12h16V8.99l-8 6.92-8-6.92V18Z" />,
    threads: <path d="M12.04 2C6.55 2 3 5.64 3 11.27v1.48C3 18.38 6.55 22 12.04 22c5.5 0 8.96-3.42 8.96-8.01 0-3.47-1.96-5.77-5.16-6.22-.74-2.35-2.55-3.64-5.21-3.64-2.45 0-4.38 1.17-5.47 3.31l1.93 1.01c.72-1.42 1.9-2.13 3.54-2.13 1.41 0 2.43.57 3.05 1.7h-.15c-4.05 0-6.57 1.93-6.57 5.02 0 2.67 2.07 4.48 5.15 4.48 2.95 0 4.9-1.64 5.24-4.37.05-.4.08-.8.08-1.21v-.09c1.02.58 1.58 1.68 1.58 3.09 0 2.93-2.63 5.02-6.97 5.02-4.25 0-6.98-2.83-6.98-7.23v-1.43c0-4.43 2.73-7.26 6.98-7.26 3.39 0 5.86 1.74 6.75 4.74l2.04-.6C19.68 4.25 16.48 2 12.04 2Zm.12 13.45c-1.82 0-2.95-.88-2.95-2.3 0-1.82 1.62-2.92 4.33-2.92.58 0 1.12.04 1.62.12.04.36.06.72.06 1.09v.38c0 2.27-1.1 3.63-3.06 3.63Z" />,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false" fill="currentColor">
      {icons[name]}
    </svg>
  );
}

createRoot(document.getElementById('root')).render(<App />);
