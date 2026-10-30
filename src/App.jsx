import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { content, works } from "./data.js";

function getInitialLanguage() {
  return localStorage.getItem("portfolio-language") === "en" ? "en" : "id";
}

function App() {
  const [lang, setLang] = useState(getInitialLanguage);
  const t = content[lang];
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("portfolio-language", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  const toggleLanguage = () => setLang((current) => current === "id" ? "en" : "id");

  return (
    <div className="site-shell">
      <Header t={t} lang={lang} toggleLanguage={toggleLanguage} />
      <main>
        <Routes>
          <Route path="/" element={<Home t={t} lang={lang} />} />
          <Route path="/work" element={<WorkPage t={t} lang={lang} />} />
          <Route path="/research" element={<ResearchPage t={t} lang={lang} />} />
          <Route path="/projects" element={<ProjectsPage t={t} lang={lang} />} />
          <Route path="/grand-design" element={<GrandDesignPage t={t} />} />
          <Route path="/about" element={<AboutPage t={t} />} />
          <Route path="/contact" element={<ContactPage t={t} />} />
          <Route path="/work/:id" element={<WorkDetail t={t} lang={lang} />} />
          <Route path="*" element={<NotFound t={t} />} />
        </Routes>
      </main>
      <Footer t={t} />
    </div>
  );
}

function Header({ t, lang, toggleLanguage }) {
  const location = useLocation();
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Portfolio home">
        <span className="brand-mark">E<span>.</span></span>
        <span className="brand-label">ENGINEERING<br />PORTFOLIO</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {t.nav.map(([label, path]) => (
          <Link key={path} className={location.pathname === path ? "nav-link active" : "nav-link"} to={path}>{label}</Link>
        ))}
      </nav>
      <button className="language-toggle" onClick={toggleLanguage} aria-label="Toggle language">
        <span className={lang === "id" ? "lang-active" : ""}>ID</span><span className="lang-divider">/</span><span className={lang === "en" ? "lang-active" : ""}>EN</span>
      </button>
      <details className="mobile-menu">
        <summary aria-label="Open navigation menu">MENU <span>＋</span></summary>
        <nav>
          {t.nav.map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
        </nav>
      </details>
    </header>
  );
}

function Home({ t, lang }) {
  const featured = works.filter((work) => work.featured).slice(0, 4);
  return (
    <>
      <section className="hero container">
        <div className="hero-topline"><span className="eyebrow">{t.homeEyebrow}</span><span className="availability"><i /> PORTFOLIO / 001</span></div>
        <h1>
          <span>{t.heroLine1} <em>{t.heroLine2}</em></span>
          <span>{t.heroLine3} <em>{t.heroLine4}</em></span>
          <span>{t.heroLine5} <em>{t.heroLine6}</em></span>
        </h1>
        <div className="hero-bottom">
          <p className="hero-description">{t.heroText}</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/work">{t.viewWork} <span>↗</span></Link>
            <Link className="text-link" to="/about">{t.aboutLink} <span>↗</span></Link>
          </div>
        </div>
        <div className="hero-index"><span>01 — 07</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div><span className="eyebrow">{t.index}</span><h2>{t.selected}<span className="accent-dot">.</span></h2></div>
          <Link className="text-link" to="/work">{t.seeAll} <span>↗</span></Link>
        </div>
        <p className="section-intro">{t.selectedIntro}</p>
        <div className="work-grid">
          {featured.map((work, i) => <WorkCard key={work.id} work={work} t={t} lang={lang} index={String(i + 1).padStart(2, "0")} />)}
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">01 / 02 / 03</span><h2>{t.focus}<span className="accent-dot">.</span></h2></div>
          </div>
          <div className="focus-grid">
            {t.focusItems.map(([number, title, description]) => (
              <article className="focus-item" key={number}>
                <span className="focus-number">{number}</span><h3>{title}</h3><p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="living-archive">
          <div className="archive-symbol">↗</div>
          <div><span className="eyebrow">NOTE / 001</span><h2>{t.noteTitle}</h2><p>{t.note}</p></div>
        </div>
      </section>
    </>
  );
}

function WorkCard({ work, t, lang, index }) {
  const summary = lang === "id" ? work.summaryId : work.summaryEn;
  const category = work.category === "engineering" ? t.categoryEngineering : work.category === "research" ? t.categoryResearch : work.category === "strategy" ? t.categoryStrategy : t.categoryLeadership;
  const status = work.status === "documentation-complete" ? t.statusComplete : work.status === "in-progress" ? t.statusProgress : t.statusMissing;
  return (
    <article className="work-card">
      <div className="card-topline"><span>{index || "—"} / WORK</span><span className="card-category">{category}</span></div>
      <div className="card-graphic" aria-hidden="true"><span className="graphic-index">{index || "00"}</span><span className="graphic-lines" /><span className="graphic-cross">＋</span></div>
      <div className="card-content">
        <div className="card-meta"><span>{work.year}</span><span className="status-dot" /> <span>{status}</span></div>
        <h3>{work.title}</h3>
        <p>{summary}</p>
        <Link className="card-link" to={`/work/${work.id}`}>{t.viewDetails} <span>↗</span></Link>
      </div>
    </article>
  );
}

function WorkPage({ t, lang }) {
  const [filter, setFilter] = useState("all");
  const filters = [
    ["all", t.filterAll], ["engineering", t.filterEngineering],
    ["research", t.filterResearch], ["leadership", t.filterLeadership], ["strategy", t.filterStrategy]
  ];
  const filtered = filter === "all" ? works : works.filter((work) => work.category === filter);
  return (
    <PageIntro eyebrow="INDEX / 01" title={t.worksTitle} intro={t.worksIntro}>
      <div className="filter-row" role="group" aria-label="Filter works">
        {filters.map(([value, label]) => <button key={value} className={filter === value ? "filter-chip selected" : "filter-chip"} onClick={() => setFilter(value)}>{label}</button>)}
      </div>
      <div className="work-grid">
        {filtered.map((work, i) => <WorkCard key={work.id} work={work} t={t} lang={lang} index={String(i + 1).padStart(2, "0")} />)}
      </div>
      {filtered.length === 0 && <p>{t.noResults}</p>}
    </PageIntro>
  );
}

function ResearchPage({ t, lang }) {
  const research = works.filter((work) => work.category === "research");
  return (
    <PageIntro eyebrow="INDEX / 02" title={t.researchTitle} intro={t.researchIntro}>
      <div className="notice-panel"><span className="notice-symbol">↗</span><div><h3>{t.researchPlaceholderTitle}</h3><p>{t.researchPlaceholder}</p></div></div>
      <div className="work-grid">{research.map((work, i) => <WorkCard key={work.id} work={work} t={t} lang={lang} index={String(i + 1).padStart(2, "0")} />)}</div>
    </PageIntro>
  );
}

function ProjectsPage({ t, lang }) {
  const projects = works.filter((work) => work.category === "engineering");
  return <PageIntro eyebrow="INDEX / 03" title={t.projectsTitle} intro={t.projectsIntro}><div className="work-grid">{projects.map((work, i) => <WorkCard key={work.id} work={work} t={t} lang={lang} index={String(i + 1).padStart(2, "0")} />)}</div></PageIntro>;
}

function GrandDesignPage({ t }) {
  return (
    <PageIntro eyebrow="INDEX / 04" title={t.grandTitle} intro={t.grandIntro}>
      <div className="notice-panel large-notice"><span className="notice-symbol">✳</span><div><h3>{t.grandPlaceholderTitle}</h3><p>{t.grandPlaceholder}</p></div></div>
      <div className="strategy-preview">
        <div><span className="eyebrow">CASE STUDY FORMAT</span><h3>Context → Problem → Design → Evaluation</h3></div>
        <p>{t.entryNote}</p>
      </div>
    </PageIntro>
  );
}

function AboutPage({ t }) {
  return (
    <PageIntro eyebrow="INDEX / 05" title={t.aboutTitle} intro={t.aboutLead}>
      <div className="about-layout">
        <div className="about-monogram">E<span>.</span></div>
        <div className="about-copy"><p>{t.aboutText}</p><h3>{t.principlesTitle}</h3><ul>{t.principles.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </div>
      <div className="notice-panel"><span className="notice-symbol">i</span><div><h3>Profile details</h3><p>Education dates, technical skills, public contact details, and additional experience can be added after you confirm the exact information you want to publish.</p></div></div>
    </PageIntro>
  );
}

function ContactPage({ t }) {
  return <PageIntro eyebrow="INDEX / 06" title={t.contactTitle} intro={t.contactText}><div className="contact-panel"><span className="eyebrow">CONTACT / 001</span><h3>{t.contactPlaceholder}</h3><p>Replace this panel with a public email address and links you choose to share.</p></div></PageIntro>;
}



function WorkDetail({ t, lang }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const work = works.find((item) => item.id === id);

  if (!work) return <NotFound t={t} />;

  const isId = lang === "id";
  const summary = isId ? work.summaryId : work.summaryEn;

  const category =
    work.category === "engineering"
      ? t.categoryEngineering
      : work.category === "research"
      ? t.categoryResearch
      : work.category === "strategy"
      ? t.categoryStrategy
      : t.categoryLeadership;

  const status =
    work.status === "documentation-complete"
      ? t.statusComplete
      : work.status === "in-progress"
      ? t.statusProgress
      : t.statusMissing;

  const sections = [
    {
      number: "01",
      title: isId ? "Gambaran Proyek" : "Project Overview",
      description: summary
    },
    {
      number: "02",
      title: isId ? "Fokus Proyek" : "Project Focus",
      description: isId
        ? "Ruang lingkup proyek berdasarkan bidang dan teknologi yang tercantum."
        : "The project scope based on its listed fields and technologies.",
      type: "tags"
    },
    {
      number: "03",
      title: isId ? "Kontribusi & Peran" : "Contribution & Role",
      description: isId
        ? "Rincian tanggung jawab dan kontribusi pribadi akan ditambahkan berdasarkan dokumentasi proyek."
        : "Details of personal responsibilities and contributions will be added based on project documentation."
    },
    {
      number: "04",
      title: isId ? "Pendekatan Teknis" : "Technical Approach",
      description: isId
        ? "Arsitektur sistem, metode implementasi, perangkat, dan alur kerja akan dijelaskan setelah informasi teknis diverifikasi."
        : "System architecture, implementation methods, hardware, and workflow will be described after technical information has been verified."
    },
    {
      number: "05",
      title: isId ? "Dokumentasi & Hasil" : "Documentation & Results",
      description: isId
        ? "Foto prototipe, diagram blok, kode program, data pengujian, dan hasil proyek akan ditampilkan pada bagian ini setelah tersedia."
        : "Prototype photos, block diagrams, source code, test data, and project results will be presented here once available."
    },
    {
      number: "06",
      title: isId ? "Evaluasi & Pengembangan" : "Evaluation & Further Development",
      description: isId
        ? "Keterbatasan sistem, evaluasi, dan peluang pengembangan berikutnya akan ditambahkan berdasarkan hasil pengerjaan dan pengujian."
        : "System limitations, evaluation, and future development opportunities will be added based on implementation and testing."
    }
  ];

  return (
    <section className="page-section container detail-page">
      <button
        className="back-button"
        onClick={() => navigate("/work")}
      >
        ← {t.back}
      </button>

      <div className="detail-topline">
        <span className="eyebrow">
          {category} / {work.id.toUpperCase()}
        </span>
        <span className="status-pill">{status}</span>
      </div>

      <h1 className="page-title detail-title">
        {work.title}
        <span className="accent-dot">.</span>
      </h1>

      <p className="page-intro detail-summary">{summary}</p>

      <div className="detail-visual">
        <span className="detail-visual-number">
          WORK / {String(works.indexOf(work) + 1).padStart(2, "0")}
        </span>
        <span className="detail-visual-cross">＋</span>
        <span className="detail-visual-caption">
          {isId ? "DOKUMENTASI PROYEK" : "PROJECT DOCUMENTATION"}
        </span>
      </div>

      <div className="detail-information">
        <div className="detail-section-heading">
          <span className="eyebrow">
            {isId ? "PROJECT INFORMATION" : "PROJECT INFORMATION"}
          </span>
          <h2>
            {isId ? "Informasi Proyek" : "Project Information"}
          </h2>
        </div>

        <div className="detail-facts">
          <div>
            <span>{t.year}</span>
            <strong>{work.year}</strong>
          </div>

          <div>
            <span>{isId ? "Kategori" : "Category"}</span>
            <strong>{category}</strong>
          </div>

          <div>
            <span>{isId ? "Status dokumentasi" : "Documentation status"}</span>
            <strong>{status}</strong>
          </div>
        </div>
      </div>

      <div className="detail-sections">
        {sections.map((section) => (
          <article className="documentation-section" key={section.number}>
            <div className="documentation-number">
              {section.number}
            </div>

            <div className="documentation-content">
              <h2>{section.title}</h2>
              <p>{section.description}</p>

              {section.type === "tags" && (
                <div className="detail-tags">
                  {work.tags.map((tag) => (
                    <span className="detail-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="notice-panel detail-notice">
        <span className="notice-symbol">i</span>
        <div>
          <h3>
            {isId ? "Catatan dokumentasi" : "Documentation note"}
          </h3>
          <p>
            {isId
              ? "Halaman ini merupakan dokumentasi awal. Informasi teknis, kontribusi, visual, dan hasil akan diperbarui berdasarkan bukti proyek yang dapat diverifikasi."
              : "This page is an initial project record. Technical information, contributions, visuals, and results will be updated based on verifiable project evidence."}
          </p>
        </div>
      </div>
    </section>
  );
}


function PageIntro({ eyebrow, title, intro, children }) {
  return <section className="page-section container"><div className="page-eyebrow eyebrow">{eyebrow}</div><h1 className="page-title">{title}<span className="accent-dot">.</span></h1><p className="page-intro">{intro}</p><div className="page-content">{children}</div></section>;
}

function NotFound({ t }) {
  return <PageIntro eyebrow="404 / NOT FOUND" title="Page not found" intro="This page does not exist yet."><Link className="button button-primary" to="/work">{t.back}</Link></PageIntro>;
}

function Footer({ t }) {
  return <footer className="site-footer"><div className="container footer-inner"><Link className="footer-brand" to="/">E<span>.</span></Link><p>{t.footer}</p><span className="footer-year">© {new Date().getFullYear()} / PORTFOLIO</span></div></footer>;
}

export default App;