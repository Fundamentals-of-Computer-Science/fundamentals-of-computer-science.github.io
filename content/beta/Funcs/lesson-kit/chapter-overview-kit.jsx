/*
  Three variants of the Chapter 1 overview, switchable via ?variant=,
  on the throwaway Ch1 Chapter Overview Prototype route.
*/

const FUNCS_CHAPTER_OVERVIEW_VARIANTS = [
  { key: 'path', label: 'Guided path' },
  { key: 'index', label: 'Working index' },
  { key: 'map', label: 'Concept map' },
];

function funcsNormalizeBetaRoute(route) {
  const url = new URL(route, window.location.origin);
  url.pathname = url.pathname
    .split('/')
    .map((segment) => encodeURIComponent(decodeURIComponent(segment).trim().replace(/\s+/g, '-')))
    .join('/');
  return `${url.pathname}${url.search}${url.hash}`;
}

function funcsUseRouteAvailability(lessons) {
  const initialState = React.useMemo(
    () => Object.fromEntries(lessons.map((lesson) => [lesson.id, 'checking'])),
    [lessons],
  );
  const [availability, setAvailability] = React.useState(initialState);

  React.useEffect(() => {
    let active = true;
    setAvailability(initialState);

    Promise.all(lessons.map(async (lesson) => {
      try {
        const response = await fetch(funcsNormalizeBetaRoute(lesson.betaRoute), {
          method: 'HEAD',
          cache: 'no-store',
        });
        return [lesson.id, response.ok ? 'available' : 'unavailable'];
      } catch (error) {
        return [lesson.id, 'unavailable'];
      }
    })).then((entries) => {
      if (active) setAvailability(Object.fromEntries(entries));
    });

    return () => { active = false; };
  }, [lessons, initialState]);

  return availability;
}

function FuncsAvailabilityLabel({ status }) {
  const label = status === 'available'
    ? 'Available now'
    : status === 'checking'
      ? 'Checking route'
      : 'Coming to beta';

  return <span className={`chapter-route-status chapter-route-status--${status}`}>{label}</span>;
}

function FuncsOpenBetaAction({ lesson, status, compact = false, label = 'Open beta' }) {
  const className = `chapter-open-action${compact ? ' chapter-open-action--compact' : ''}`;

  if (status === 'available') {
    return (
      <a className={className} href={funcsNormalizeBetaRoute(lesson.betaRoute)}>
        {label}
      </a>
    );
  }

  return (
    <button className={className} type="button" disabled aria-label={`Open beta for ${lesson.title}, ${status === 'checking' ? 'checking route' : 'not available yet'}`}>
      {label}
    </button>
  );
}

function FuncsLessonNumber({ lesson }) {
  return (
    <span className="chapter-lesson-number" aria-hidden="true">
      {String(lesson.number).padStart(2, '0')}
    </span>
  );
}

function FuncsLessonConcepts({ concepts }) {
  return (
    <ul className="chapter-concept-list" aria-label="Key code concepts">
      {concepts.map((concept) => <li key={concept}>{concept}</li>)}
    </ul>
  );
}

function FuncsVariantPath({ chapter, availability }) {
  const firstLesson = chapter.lessons[0];
  const firstStatus = availability[firstLesson.id];

  return (
    <main className="chapter-overview-main chapter-overview-main--path" id="chapter-overview-content">
      <section className="chapter-path-introduction" aria-labelledby="chapter-title-path">
        <p className="chapter-overline">{chapter.eyebrow} · Learning arc</p>
        <h1 id="chapter-title-path">{chapter.title}</h1>
        <p className="chapter-promise">{chapter.promise}</p>
        <div className="chapter-introduction-copy">
          {chapter.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="chapter-begin-card">
          <span className="chapter-begin-label">Start here</span>
          <p>{chapter.firstLessonBridge}</p>
          <FuncsOpenBetaAction lesson={firstLesson} status={firstStatus} />
        </div>
      </section>

      <section className="chapter-path-directory" aria-labelledby="chapter-path-heading">
        <div className="chapter-section-heading">
          <p>Six lessons</p>
          <h2 id="chapter-path-heading">Follow the Boolean from value to behavior.</h2>
        </div>
        <ol className="chapter-path-list">
          {chapter.lessons.map((lesson) => (
            <li key={lesson.id} className="chapter-path-item">
              <FuncsLessonNumber lesson={lesson} />
              <div className="chapter-path-copy">
                <div className="chapter-lesson-heading-row">
                  <div>
                    <p className="chapter-arc-label">{lesson.arc}</p>
                    <h3>{lesson.title}</h3>
                  </div>
                  <FuncsAvailabilityLabel status={availability[lesson.id]} />
                </div>
                <p>{lesson.learningTarget}</p>
                <div className="chapter-lesson-footer">
                  <FuncsLessonConcepts concepts={lesson.concepts} />
                  <FuncsOpenBetaAction lesson={lesson} status={availability[lesson.id]} compact />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

function FuncsVariantIndex({ chapter, availability }) {
  const firstLesson = chapter.lessons[0];

  return (
    <main className="chapter-overview-main chapter-overview-main--index" id="chapter-overview-content">
      <aside className="chapter-index-orientation" aria-labelledby="chapter-title-index">
        <div className="chapter-index-orientation-inner">
          <p className="chapter-overline">{chapter.eyebrow} / Working index</p>
          <h1 id="chapter-title-index">{chapter.title}</h1>
          <p className="chapter-promise">{chapter.promise}</p>
          <p className="chapter-index-introduction">{chapter.introduction[0]}</p>
          <div className="chapter-index-note">
            <span>How the chapter moves</span>
            <p>Store a Boolean. Use it to choose. Combine and order conditions. Repeat while one remains true. Package the result in a method.</p>
          </div>
          <FuncsOpenBetaAction
            lesson={firstLesson}
            status={availability[firstLesson.id]}
            label={`Begin with Lesson ${firstLesson.number}`}
          />
        </div>
      </aside>

      <section className="chapter-index-directory" aria-labelledby="chapter-index-heading">
        <div className="chapter-index-heading-row">
          <div>
            <p>Chapter directory</p>
            <h2 id="chapter-index-heading">Six lessons, one Boolean learning arc</h2>
          </div>
          <span>{chapter.lessons.length} lessons</span>
        </div>
        <div className="chapter-index-table" role="list">
          {chapter.lessons.map((lesson) => (
            <article key={lesson.id} className="chapter-index-row" role="listitem">
              <FuncsLessonNumber lesson={lesson} />
              <div className="chapter-index-row-title">
                <p>{lesson.arc}</p>
                <h3>{lesson.shortTitle}</h3>
              </div>
              <p className="chapter-index-target">{lesson.learningTarget}</p>
              <div className="chapter-index-action">
                <FuncsAvailabilityLabel status={availability[lesson.id]} />
                <FuncsOpenBetaAction lesson={lesson} status={availability[lesson.id]} compact />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function FuncsVariantMap({ chapter, availability }) {
  const groups = [
    { label: 'Build state', summary: 'Create and combine Boolean values.', lessonIds: ['c1-1', 'c1-3'] },
    { label: 'Direct behavior', summary: 'Use Boolean results to choose and repeat.', lessonIds: ['c1-2', 'c1-4', 'c1-5'] },
    { label: 'Package logic', summary: 'Turn a Boolean computation into an operation.', lessonIds: ['c1-6'] },
  ];

  return (
    <main className="chapter-overview-main chapter-overview-main--map" id="chapter-overview-content">
      <header className="chapter-map-introduction">
        <div>
          <p className="chapter-overline">{chapter.eyebrow} · Concept map</p>
          <h1 id="chapter-title-map">{chapter.title}</h1>
        </div>
        <p className="chapter-promise">{chapter.promise}</p>
      </header>

      <section className="chapter-map-board" aria-labelledby="chapter-map-heading">
        <div className="chapter-map-board-heading">
          <p>Learning arc</p>
          <h2 id="chapter-map-heading">One small type, three program jobs</h2>
          <p>{chapter.introduction[1]}</p>
        </div>
        <div className="chapter-map-groups">
          {groups.map((group, groupIndex) => (
            <section key={group.label} className="chapter-map-group">
              <div className="chapter-map-group-label">
                <span>{String(groupIndex + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{group.label}</h3>
                  <p>{group.summary}</p>
                </div>
              </div>
              <div className="chapter-map-lessons">
                {group.lessonIds.map((lessonId) => {
                  const lesson = chapter.lessons.find((item) => item.id === lessonId);
                  return (
                    <article key={lesson.id} className="chapter-map-lesson">
                      <div className="chapter-map-lesson-topline">
                        <span>Lesson {lesson.number}</span>
                        <FuncsAvailabilityLabel status={availability[lesson.id]} />
                      </div>
                      <h4>{lesson.shortTitle}</h4>
                      <p>{lesson.learningTarget}</p>
                      <div className="chapter-map-lesson-footer">
                        <span>{lesson.concepts.slice(0, 2).join(' · ')}</span>
                        <FuncsOpenBetaAction lesson={lesson} status={availability[lesson.id]} compact />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

function funcsHandleDialogKeyDown(event, root, onClose) {
  if (event.key === 'Escape') {
    event.preventDefault();
    onClose?.();
    return;
  }
  if (event.key !== 'Tab') return;

  const focusable = Array.from(root.querySelectorAll(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  ));
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function funcsChapterCurrentLessonId(chapter, lesson) {
  if (!chapter || !lesson) return null;
  if (lesson.overviewLessonId) return lesson.overviewLessonId;
  return Number.isFinite(lesson.order) ? `c${chapter.number}-${lesson.order}` : null;
}

function FuncsChapterDirectoryList({ chapter, availability, currentLessonId = null, className = 'chapter-clickover-list' }) {
  return (
    <ol className={className}>
      {chapter.lessons.map((lesson) => {
        const current = lesson.id === currentLessonId;
        const status = availability[lesson.id];
        const rowContent = (
          <>
            <span className="chapter-clickover-number">{lesson.number}</span>
            <div className="chapter-clickover-copy">
              <strong>{lesson.shortTitle}</strong>
              <span>{lesson.arc}</span>
            </div>
            <div className="chapter-clickover-state">
              {current && <span className="chapter-current-marker">Current lesson</span>}
              <FuncsAvailabilityLabel status={status} />
            </div>
            {status === 'available' ? (
              <span className="chapter-open-action chapter-open-action--compact" aria-hidden="true">
                Open beta
              </span>
            ) : (
              <FuncsOpenBetaAction lesson={lesson} status={status} compact />
            )}
          </>
        );

        return (
          <li key={lesson.id} className={current ? 'chapter-clickover-current' : undefined} aria-current={current ? 'page' : undefined}>
            {status === 'available' ? (
              <a
                className="chapter-clickover-row chapter-clickover-row--available"
                href={funcsNormalizeBetaRoute(lesson.betaRoute)}
                aria-label={`Open Lesson ${lesson.number}: ${lesson.title}`}
              >
                {rowContent}
              </a>
            ) : (
              <div className="chapter-clickover-row">
                {rowContent}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function FuncsChapterOverviewClickover({ chapter, availability, open, onClose }) {
  const dialogRef = React.useRef(null);
  const returnFocusRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
    const frame = window.requestAnimationFrame(() => dialogRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(frame);
      returnFocusRef.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="chapter-clickover-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section
        ref={dialogRef}
        className="chapter-clickover"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chapter-clickover-title"
        tabIndex="-1"
        onKeyDown={(event) => funcsHandleDialogKeyDown(event, dialogRef.current, onClose)}
      >
        <header className="chapter-clickover-header">
          <div>
            <p>{chapter.eyebrow} overview</p>
            <h2 id="chapter-clickover-title">{chapter.title}</h2>
          </div>
          <button type="button" onClick={onClose}>Close</button>
        </header>
        <p className="chapter-clickover-promise">{chapter.promise}</p>
        <FuncsChapterDirectoryList chapter={chapter} availability={availability} />
        <footer className="chapter-clickover-footer">
          <span>Viewing the full Chapter 1 overview</span>
          <button type="button" onClick={onClose}>Return to overview</button>
        </footer>
      </section>
    </div>
  );
}

function FuncsAcademicChapterOverviewPanel({ lesson, onClose }) {
  const chapter = window.FUNCS_BETA_CHAPTER_OVERVIEWS?.[lesson.chapterId];
  const availability = funcsUseRouteAvailability(chapter.lessons);
  const currentLessonId = funcsChapterCurrentLessonId(chapter, lesson);
  const panelRef = React.useRef(null);
  const returnFocusRef = React.useRef(null);

  React.useEffect(() => {
    returnFocusRef.current = document.activeElement;
    const frame = window.requestAnimationFrame(() => panelRef.current?.focus());
    return () => {
      window.cancelAnimationFrame(frame);
      returnFocusRef.current?.focus?.();
    };
  }, []);

  return (
    <section
      ref={panelRef}
      className="chapter-lesson-clickover"
      aria-labelledby="chapter-lesson-clickover-title"
      tabIndex="-1"
      onKeyDown={(event) => funcsHandleDialogKeyDown(event, panelRef.current, onClose)}
    >
      <aside className="chapter-lesson-clickover-orientation">
        <p>{chapter.eyebrow} / Overview</p>
        <h2 id="chapter-lesson-clickover-title">{chapter.title}</h2>
        <span>{chapter.promise}</span>
        <a href={chapter.betaOverviewRoute}>Open chapter overview</a>
      </aside>
      <div className="chapter-lesson-clickover-directory">
        <header>
          <div>
            <p>Chapter directory</p>
            <h3>Choose a lesson</h3>
          </div>
          <button type="button" onClick={onClose}>Close</button>
        </header>
        <FuncsChapterDirectoryList
          chapter={chapter}
          availability={availability}
          currentLessonId={currentLessonId}
          className="chapter-clickover-list chapter-lesson-clickover-list"
        />
      </div>
    </section>
  );
}

function FuncsPrototypeSwitcher({ variant, availability, onChange }) {
  const currentIndex = FUNCS_CHAPTER_OVERVIEW_VARIANTS.findIndex((item) => item.key === variant);
  const current = FUNCS_CHAPTER_OVERVIEW_VARIANTS[currentIndex];
  const counts = Object.values(availability).reduce((result, status) => {
    result[status] += 1;
    return result;
  }, { checking: 0, available: 0, unavailable: 0 });

  const cycle = React.useCallback((direction) => {
    const nextIndex = (currentIndex + direction + FUNCS_CHAPTER_OVERVIEW_VARIANTS.length) % FUNCS_CHAPTER_OVERVIEW_VARIANTS.length;
    onChange(FUNCS_CHAPTER_OVERVIEW_VARIANTS[nextIndex].key);
  }, [currentIndex, onChange]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      if (target?.matches?.('input, textarea, [contenteditable="true"]')) return;
      if (event.key === 'ArrowLeft') cycle(-1);
      if (event.key === 'ArrowRight') cycle(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cycle]);

  const routeSummary = counts.checking
    ? `Checking ${counts.checking} routes`
    : `${counts.available} open · ${counts.unavailable} unavailable`;

  return (
    <aside className="chapter-prototype-switcher" aria-label="Prototype variants">
      <button type="button" onClick={() => cycle(-1)} aria-label="Previous prototype variant">←</button>
      <div aria-live="polite">
        <strong>{String.fromCharCode(65 + currentIndex)} — {current.label}</strong>
        <span>{routeSummary}</span>
      </div>
      <button type="button" onClick={() => cycle(1)} aria-label="Next prototype variant">→</button>
    </aside>
  );
}

function FuncsChapterOverview({ chapter }) {
  const [clickoverOpen, setClickoverOpen] = React.useState(false);
  const availability = funcsUseRouteAvailability(chapter.lessons);

  return (
    <div className="chapter-overview-shell" data-variant="index">
      <a className="chapter-skip-link" href="#chapter-overview-content">Skip to chapter overview</a>
      <nav className="chapter-edition-navigation" aria-label="Book edition">
        <span>Reading: <strong>Beta</strong></span>
        <span className="chapter-edition-divider" aria-hidden="true" />
        <a href={chapter.primaryRoute}>Switch to Primary</a>
      </nav>
      <header className="chapter-site-header">
        <a className="chapter-site-brand" href="/beta/">Fundamentals of <span>Computer Science</span></a>
        <div className="chapter-site-tools" aria-label="Site tools">
          <span>Beta book</span>
          <a href="/beta/">All chapters</a>
        </div>
      </header>
      <nav className="chapter-strip" aria-label="Chapters">
        {[0, 1, 2, 3, 4].map((number) => number === chapter.number ? (
          <button
            key={number}
            type="button"
            className="chapter-strip-current"
            aria-current="page"
            aria-expanded={clickoverOpen}
            aria-haspopup="dialog"
            onClick={() => setClickoverOpen((value) => !value)}
          >
            <span>Chapter {number}</span>
            <strong>{chapter.title}</strong>
            <span aria-hidden="true">{clickoverOpen ? 'Close' : 'Open overview'}</span>
          </button>
        ) : (
          <span key={number} className="chapter-strip-item">Chapter {number}</span>
        ))}
      </nav>

      <FuncsVariantIndex chapter={chapter} availability={availability} />

      <FuncsChapterOverviewClickover
        chapter={chapter}
        availability={availability}
        open={clickoverOpen}
        onClose={() => setClickoverOpen(false)}
      />
    </div>
  );
}

function FuncsChapterOverviewPrototype({ chapter }) {
  const variantKeys = FUNCS_CHAPTER_OVERVIEW_VARIANTS.map((item) => item.key);
  const getVariant = () => {
    const requested = new URLSearchParams(window.location.search).get('variant');
    return variantKeys.includes(requested) ? requested : variantKeys[0];
  };
  const [variant, setVariant] = React.useState(getVariant);
  const [clickoverOpen, setClickoverOpen] = React.useState(false);
  const availability = funcsUseRouteAvailability(chapter.lessons);

  const changeVariant = React.useCallback((nextVariant) => {
    const url = new URL(window.location.href);
    url.searchParams.set('variant', nextVariant);
    window.history.replaceState({}, '', url);
    setVariant(nextVariant);
  }, []);

  React.useEffect(() => {
    const handlePopState = () => setVariant(getVariant());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const VariantComponent = variant === 'index'
    ? FuncsVariantIndex
    : variant === 'map'
      ? FuncsVariantMap
      : FuncsVariantPath;
  const showPrototypeControls = /prototype/i.test(window.location.pathname);

  return (
    <div className="chapter-prototype-shell" data-variant={variant}>
      <a className="chapter-skip-link" href="#chapter-overview-content">Skip to chapter overview</a>
      <div className="chapter-prototype-flag">Prototype · Compare layouts with the control below</div>
      <nav className="chapter-edition-navigation" aria-label="Book edition">
        <span>Reading: <strong>Beta</strong></span>
        <span className="chapter-edition-divider" aria-hidden="true" />
        <a href={chapter.primaryRoute}>Switch to Primary</a>
      </nav>
      <header className="chapter-site-header">
        <a className="chapter-site-brand" href="/beta/">Fundamentals of <span>Computer Science</span></a>
        <div className="chapter-site-tools" aria-label="Site tools">
          <span>Beta book</span>
          <a href="/beta/">All chapters</a>
        </div>
      </header>
      <nav className="chapter-strip" aria-label="Chapters">
        {[0, 1, 2, 3, 4].map((number) => number === chapter.number ? (
          <button
            key={number}
            type="button"
            className="chapter-strip-current"
            aria-current="page"
            aria-expanded={clickoverOpen}
            aria-haspopup="dialog"
            onClick={() => setClickoverOpen((value) => !value)}
          >
            <span>Chapter {number}</span>
            <strong>{chapter.title}</strong>
            <span aria-hidden="true">{clickoverOpen ? 'Close' : 'Open overview'}</span>
          </button>
        ) : (
          <span key={number} className="chapter-strip-item">Chapter {number}</span>
        ))}
      </nav>

      <VariantComponent chapter={chapter} availability={availability} />

      <FuncsChapterOverviewClickover
        chapter={chapter}
        availability={availability}
        open={clickoverOpen}
        onClose={() => setClickoverOpen(false)}
      />
      {showPrototypeControls && !clickoverOpen && (
        <FuncsPrototypeSwitcher variant={variant} availability={availability} onChange={changeVariant} />
      )}
    </div>
  );
}

Object.assign(window, {
  FUNCS_CHAPTER_OVERVIEW_VARIANTS,
  funcsNormalizeBetaRoute,
  funcsUseRouteAvailability,
  FuncsAcademicChapterOverviewPanel,
  FuncsChapterOverviewClickover,
  FuncsChapterOverview,
  FuncsChapterOverviewPrototype,
});
