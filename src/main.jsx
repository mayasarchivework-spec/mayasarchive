import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, X } from 'lucide-react';
import './styles.css';
import { TELEGRAM_PROFILE_URL, profile, projects } from './data';
import ShopMain from './ShopMain';

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
  if (path === '/shop') {
    page = <ShopMain />;
  } else if (path === '/work') {
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
        <a href="/shop">Shop</a>
      </nav>
    </header>
  );
}

function HomePage() {
  return (
    <>
      <HeroSection />

      <Divider />

      <InfoSection id="about" eyebrow="About me" title="I create stuff">
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
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          draggable="false"
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
  const [selectedProject, setSelectedProject] = React.useState(null);
  const visibleProjects = projects.filter((project) => project?.id && project?.title);

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

      {visibleProjects.length > 0 ? (
        <div className="work-mosaic fade-up" aria-label="Work thumbnails">
          {visibleProjects.map((project) => (
            <ProjectTile
              key={project.id}
              project={project}
              thumbnailOnly
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      ) : (
        <p className="work-category-empty">Coming soon.</p>
      )}

      {selectedProject && <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
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

function ProjectDialog({ project, onClose }) {
  const media = getProjectMedia(project);
  const [mediaIndex, setMediaIndex] = React.useState(0);
  const closeButtonRef = React.useRef(null);
  const hasMultipleMedia = media.length > 1;

  const showPrevious = React.useCallback(() => {
    setMediaIndex((index) => (index - 1 + media.length) % media.length);
  }, [media.length]);

  const showNext = React.useCallback(() => {
    setMediaIndex((index) => (index + 1) % media.length);
  }, [media.length]);

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (hasMultipleMedia && event.key === 'ArrowLeft') showPrevious();
      if (hasMultipleMedia && event.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [hasMultipleMedia, onClose, showNext, showPrevious]);

  return (
    <div
      className="work-dialog-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="work-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`work-dialog-title-${project.id}`}
      >
        <button
          ref={closeButtonRef}
          className="work-dialog-close"
          type="button"
          onClick={onClose}
          aria-label="Close work details"
          title="Close"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="work-dialog-gallery">
          <div className="work-dialog-media">
            {media[mediaIndex] ? (
              <VideoPreview
                key={`${media[mediaIndex]}-${mediaIndex}`}
                src={media[mediaIndex]}
                title={`${project.title} ${mediaIndex + 1}`}
                controls
              />
            ) : (
              <p className="work-dialog-empty">Preview coming soon.</p>
            )}
          </div>

          {hasMultipleMedia && (
            <div className="work-gallery-controls">
              <button type="button" onClick={showPrevious} aria-label="Previous media" title="Previous">
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <span aria-live="polite">
                {mediaIndex + 1} / {media.length}
              </span>
              <button type="button" onClick={showNext} aria-label="Next media" title="Next">
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <aside className="work-dialog-details" aria-label="Work details">
          <p className="work-dialog-label">Project</p>
          <h2 id={`work-dialog-title-${project.id}`}>{project.title}</h2>
          {project.summary && <p className="work-dialog-description">{project.summary}</p>}

          <div className="work-dialog-meta">
            <PlainList title="Skills" items={project.skills || []} />
            <PlainList title="Tools used" items={project.tools || []} />
          </div>

          {project.externalUrl && (
            <a className="work-dialog-view" href={project.externalUrl} target="_blank" rel="noopener noreferrer">
              View work
              <ArrowUpRight aria-hidden="true" size={18} />
            </a>
          )}
        </aside>
      </section>
    </div>
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

function ProjectTile({ project, onOpen, thumbnailOnly = false }) {
  const thumbnail = getProjectThumbnail(project);
  const className = thumbnailOnly ? 'project-tile thumbnail-only' : 'project-tile';
  const content = (
    <>
      <div className="project-media small">
        <VideoPreview src={thumbnail} title={project.title} />
      </div>

      {!thumbnailOnly && (
        <div className="project-tile-copy">
          <h3>{project.title}</h3>
          <span>{project.skills.join(', ')}</span>
        </div>
      )}
    </>
  );

  if (onOpen) {
    return (
      <button className={className} type="button" onClick={onOpen} aria-label={`Open ${project.title}`}>
        {content}
      </button>
    );
  }

  return (
    <a className={className} href={`/work/${project.slug}`} aria-label={`Open ${project.title}`}>
      {content}
    </a>
  );
}

function getProjectMedia(project) {
  const media = Array.isArray(project.media) ? project.media : [project.media];
  return media
    .filter(Boolean)
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
          <p className="copyright-text">&copy; MAYASARCHIVE 2026. All rights reserved.</p>
        </div>
        <SocialLinks inverted />
      </div>
    </footer>
  );
}

function VideoPreview({ src, title, controls = false }) {
  if (!src || typeof src !== 'string') return null;
  const isImage = /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(src);
  if (isImage) return <img src={src} alt={title} draggable="false" />;
  return (
    <video
      aria-label={title}
      autoPlay
      controls={controls}
      controlsList="nodownload noplaybackrate noremoteplayback"
      disablePictureInPicture
      disableRemotePlayback
      draggable="false"
      loop
      muted
      playsInline
      preload="metadata"
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
    shop: <path d="M3 5h2l2.2 9.2c.1.5.6.8 1.1.8h9.4c.5 0 .9-.3 1.1-.7L21 8H7.2m2 11a1.5 1.5 0 1 0 0 .01M17 19a1.5 1.5 0 1 0 0 .01" />,
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
