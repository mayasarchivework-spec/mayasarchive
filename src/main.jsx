import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import {
  Asterisk,
  ArrowLeft,
  ArrowUpRight,
  Instagram,
  Mail,
  Menu,
  Music2,
  Plus,
  Sparkles,
  Star,
} from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import './styles.css';
import { CATEGORIES, CONTACT_URL, featuredProject, profile, projects } from './data';

function App() {
  const [loaded, setLoaded] = React.useState(false);
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const slug = path.split('/').filter(Boolean).at(-1);
  const project = projects.find((item) => item.slug === slug);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  React.useEffect(() => {
    const blockMediaSave = (event) => {
      if (event.target instanceof Element && event.target.closest('img, video')) event.preventDefault();
    };
    document.addEventListener('contextmenu', blockMediaSave);
    document.addEventListener('dragstart', blockMediaSave);
    return () => {
      document.removeEventListener('contextmenu', blockMediaSave);
      document.removeEventListener('dragstart', blockMediaSave);
    };
  }, []);

  let page = <NotFoundPage />;
  if (path === '/') page = <HomePage />;
  if (path === '/projects') page = <WorkPage />;
  if (path === '/work-with-me') page = <EnquiryPage />;
  if (project) page = <ProjectPage project={project} />;

  return (
    <>
      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      {path !== '/' && <SiteChrome light={path === '/projects' || path === '/work-with-me' || Boolean(project)} onDarkBackground={path === '/projects' || path === '/work-with-me' || Boolean(project)} showCta={path !== '/work-with-me'} />}
      <main>{path === '/' ? <HomePage showChrome /> : page}</main>
      <Footer />
      <Analytics />
    </>
  );
}

function LoadingScreen({ onDone }) {
  React.useEffect(() => {
    const timer = window.setTimeout(onDone, 620);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="loading-screen" aria-hidden="true">
      <div className="loading-mark"><span>m</span><span>a</span><span>y</span><span>a</span></div>
      <div className="loading-line" />
    </div>
  );
}

function SiteChrome({ light = false, onDarkBackground = false, showCta = true }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header className={`site-header ${light ? 'site-header-light' : 'site-header-dark'} ${onDarkBackground ? 'site-header-on-dark' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="site-header-inner">
        <a className="brand" href="/" aria-label="Maya's Archive home">
          <img src="/assets/mayasarchive-icon-transparent.png" alt="Maya" className="brand-avatar" />  
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="/projects">projects</a>
        </nav>
        <div className="header-actions">
          {showCta && <a className="button button-light header-cta" href="/work-with-me">
            Work with me <ArrowUpRight size={15} aria-hidden="true" />
          </a>}
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <Plus size={20} className="close-icon" /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div className="mobile-nav">
        <a href="/projects" onClick={() => setMenuOpen(false)}>projects <ArrowUpRight size={14} /></a>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <span /><span /><span /><span /><span /><span /><span />
    </span>
  );
}

function HomePage() {
  return (
    <>
      <Hero showChrome />
      <BentoArchive />
    </>
  );
}

function Hero({ showChrome = false }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      {showChrome && <SiteChrome light />}
      <div className="hero-inner site-shell">
        <div className="hero-wordmark hero-wordmark-top" aria-hidden="true">Maya's</div>
        <div className="hero-wordmark hero-wordmark-bottom" aria-hidden="true">Archive</div>
        <h1 id="hero-title" className="hero-title">Maya's Archive</h1>
        <div className="hero-intro-card">
          <span className="hero-card-label">A small introduction</span>
          <p>{profile.bio}</p>
        </div>
      </div>
    </section>
  );
}

function EnquiryPage() {
  React.useEffect(() => {
    const scriptUrl = 'https://tally.so/widgets/embed.js';
    const loadEmbeds = () => {
      if (typeof window.Tally !== 'undefined') {
        window.Tally.loadEmbeds();
        return;
      }
      document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((iframe) => {
        iframe.src = iframe.dataset.tallySrc;
      });
    };
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) {
      loadEmbeds();
      return undefined;
    }
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.onload = loadEmbeds;
    script.onerror = loadEmbeds;
    document.body.appendChild(script);
    return undefined;
  }, []);

  return (
    <section className="enquiry-page site-shell">
      <a className="back-link reveal" href="/"><ArrowLeft size={16} /> Back to archive</a>
      <div className="enquiry-intro reveal">
        <div className="enquiry-heading">
          <h1>Have something in mind?</h1>
          <span className="enquiry-note">Let's make it real</span>
        </div>
        <div className="enquiry-contact">
          <span>Need something else?</span>
          <div className="enquiry-contact-actions">
            <a className="button button-red" href={CONTACT_URL}>WhatsApp <ArrowUpRight size={15} /></a>
            <a className="button button-outline" href="mailto:mayasarchive.zip@gmail.com">Email <Mail size={15} /></a>
          </div>
        </div>
      </div>
      <div className="tally-embed reveal delay-1">
        <iframe data-tally-src="https://tally.so/embed/lb8xvN?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="1558" frameBorder="0" marginHeight="0" marginWidth="0" title="Maya's Archive Project Enquiry" />
      </div>
    </section>
  );
}

function BentoArchive() {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 2);

  return (
    <section className="bento-section" id="archive">
      <div className="bento-grid">
        <AboutCard />

        <div className="bento-card bento-tools reveal delay-1">
          <div className="card-topline"><span>Tool kit</span></div>
          <div className="tool-list"><span>Affinity • Graphic Design</span><span>After Effects • Motion design</span><span>Framer • UI/UX design</span><span>React / Next.js • Frontend Eng</span><span>Blender • 3D Design</span></div>
          <div className="tools-asterisk">*</div>
        </div>

        <div className="bento-card bento-services reveal delay-1">
          <div className="card-topline"><span>what can i do?</span></div>
          <ul className="service-list">
            <li><span>01</span>Motion design → make brands and digital products feel more alive.<Asterisk size={16} /></li> 
            <li><span>02</span> UX/Product design → how things look, work and create value.<Asterisk size={16} /></li>
            <li><span>03</span> Frontend Eng → bridging the gap between design and development.<Asterisk size={16} /></li>
          </ul>
        </div>

        <FeaturedShowcase projects={featuredProjects} />
      </div>
    </section>
  );
}

function FeaturedShowcase({ projects: featuredProjects }) {
  const firstProject = featuredProjects[0];
  const secondProject = featuredProjects[1];

  return (
    <section className="featured-showcase reveal delay-1" aria-labelledby="featured-heading">
      <div className="featured-heading" id="featured-heading">
        <span className="featured-rule" />
        <a className="featured-view-all" href="/projects">view all <ArrowUpRight size={15} /></a>
      </div>
      <div className="featured-grid">
        <span className="featured-label featured-label-case">case</span>
        <FeaturedProject project={firstProject} placement="first" />
        <FeaturedProject project={secondProject} placement="second" />
        <span className="featured-label featured-label-studies">studies</span>
      </div>
    </section>
  );
}

function FeaturedProject({ project, placement }) {
  if (!project) return null;

  return (
    <a className={`featured-project featured-project-${placement}`} href={`/${project.slug}`}>
      <div className="featured-project-media"><MediaPreview src={project.thumbnail} title={`${project.title} featured work`} /></div>
    </a>
  );
}

function AboutCard() {
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`about-section reveal delay-2 ${isVisible ? 'is-visible' : ''}`} id="about" ref={cardRef}>
      <div className="about-copy">
        <span className="card-kicker">About me</span>
        <h3>bringing my ideas to <em>life.</em></h3>
        <p>Hey!, I’m Muna, better known as maya's archive. I’m a self-taught motion and product designer who brings static ideas to life. By day, I craft high-energy, 2D social media ads that stop the scroll. By night, motion design is my playground for pure creative expression. Beyond the screen, I design functional digital products, taking them from a messy first sketch all the way to a developer-ready launch.</p>
        <a className="text-link" href="/projects">View my work <ArrowUpRight size={15} /></a>
      </div>
      <div className="about-curve" aria-hidden="true">
        <svg viewBox="0 0 260 430" role="presentation">
          <path d="M230 0 C34 52 28 156 154 210 C260 255 248 353 30 430" />
        </svg>
      </div>
    </section>
  );
}

function WorkPage() {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const visibleProjects = activeCategory === 'all' ? projects : projects.filter((project) => project.category === activeCategory);

  return (
    <section className="work-page site-shell">
      <div className="work-page-intro reveal">
        <h1>The<br />Archive.</h1>
        <p>Ideas in progress, shipped work, and experiments that taught me something useful.</p>
      </div>
      <div className="category-selector reveal delay-1" role="tablist" aria-label="Work categories">
        <button className={activeCategory === 'all' ? 'is-active' : ''} onClick={() => setActiveCategory('all')} role="tab" aria-selected={activeCategory === 'all'}>All work</button>
        {CATEGORIES.map((category) => {
          const count = projects.filter((project) => project.category === category.id).length;
          return <button key={category.id} className={activeCategory === category.id ? 'is-active' : ''} onClick={() => setActiveCategory(category.id)} role="tab" aria-selected={activeCategory === category.id}>{category.label} <span>{String(count).padStart(2, '0')}</span></button>;
        })}
      </div>
      <div className="archive-grid">
        {visibleProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.a className={`project-card tone-${project.tone} reveal delay-${(index % 3) + 1}`} href={`/${project.slug}`} whileHover={{ y: -7, scale: 1.008 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
      <div className="project-card-media"><MediaPreview src={project.thumbnail} title={project.title} /></div>
      <div className="project-card-body">
        <div className="project-card-meta"><span>{project.kicker}</span></div>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <span className="project-card-arrow"><ArrowUpRight size={18} /></span>
      </div>
    </motion.a>
  );
}

function ProjectPage({ project }) {
  const related = projects.filter((item) => item.id !== project.id).slice(0, 3);
  const media = project.media || [project.thumbnail];

  return (
    <article className="project-detail site-shell">
      <a className="back-link reveal" href="/projects"><ArrowLeft size={16} /> Back to archive</a>
      <div className="project-detail-layout">
        <div className="project-detail-media">
          {media.map((item, index) => (
            <div className="project-detail-media-item reveal" key={item} style={{ animationDelay: `${index * 0.08}s` }}>
              <MediaPreview src={item} title={`${project.title} ${index + 1}`} sound controls />
            </div>
          ))}
        </div>
        <aside className="project-detail-info reveal delay-1">
          <div className="project-detail-sticky">
            <span className="section-label">{project.kicker} / {project.year}</span>
            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-summary">{project.summary}</p>
            <p className="project-detail-desc">{project.description}</p>
            <MetaList label="Role" items={project.skills} />
            <MetaList label="Toolkit" items={project.tools} />
            <a className="button button-red project-detail-cta" href={CONTACT_URL}>Start a conversation <ArrowUpRight size={15} /></a>
            {project.externalUrl && (
              <a className="button button-red project-detail-cta" href={project.externalUrl}>View project<ArrowUpRight size={15} /></a>
            )}

          </div>
        </aside>
      </div>
      <section className="more-work reveal">
        <div className="section-heading compact"><div><span className="section-label">Keep browsing</span></div><a className="text-link" href="/projects">View all work <ArrowUpRight size={15} /></a></div>
        <div className="more-work-grid">{related.map((item, index) => <ProjectCard key={item.id} project={item} index={index} />)}</div>
      </section>
    </article>
  );
}

function MetaList({ label, items }) {
  return <div className="meta-list"><span>{label}</span><p>{items.join(' / ')}</p></div>;
}

function NotFoundPage() {
  return <section className="not-found site-shell"><span className="section-label">404 / not in this archive</span><h1>Nothing here<br /><em>yet.</em></h1><a className="button button-red" href="/">Take me home <ArrowUpRight size={15} /></a></section>;
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner site-shell">
        <div className="footer-topline"><span>Have a good idea?</span><a href="/work-with-me">Let's make it real <ArrowUpRight size={16} /></a></div>
        <div className="footer-socials"><span className="section-label"></span><div>{profile.links.map((link) => <a key={link.label} href={link.href} target={link.href.startsWith('mailto') ? undefined : '_blank'} rel={link.href.startsWith('mailto') ? undefined : 'noreferrer'}>{link.label}</a>)}</div></div>
        <div className="footer-lockup">
          <div className="footer-word">Maya's Archive</div>
          <div className="footer-bottom"><span>Made by Maya's Archive<br />in Edinburgh</span><span>© 2026</span></div>
        </div>
      </div>
    </footer>
  );
}

function MediaPreview({ src, title, controls = false, sound = false }) {
  const videoRef = React.useRef(null);
  React.useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const play = () => video.play().catch(() => {});
    play();
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && play()), { threshold: 0.15 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  if (!src) return null;
  const isMuted = controls ? !sound : true;
  if (isVideo(src)) return <video ref={videoRef} src={src} title={title} autoPlay controls={controls} loop muted={isMuted} playsInline preload="metadata" />;
  return <img src={src} alt={title} draggable="false" />;
}

function isVideo(src) { return /\.(mp4|webm|mov)(\?|$)/i.test(src || ''); }

function ArrowDown({ size = 16 }) { return <ArrowUpRight size={size} className="arrow-down" aria-hidden="true" />; }

function SocialIcon({ name }) {
  const iconProps = { size: 16, strokeWidth: 1.8, 'aria-hidden': true };
  if (name === 'instagram') return <Instagram {...iconProps} />;
  if (name === 'linkedin') return <Linkedin {...iconProps} />;
  if (name === 'github') return <Github {...iconProps} />;
  if (name === 'mail') return <Mail {...iconProps} />;
  return <Music2 {...iconProps} />;
}

createRoot(document.getElementById('root')).render(<App />);
