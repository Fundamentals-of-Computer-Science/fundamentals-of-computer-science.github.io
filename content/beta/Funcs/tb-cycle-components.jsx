/* tb-cycle-components.jsx - reusable beta components for example-first cycles */

const TB_STAGE_TONES = {
  example: '#2563eb',
  check: '#b45309',
  text: '#059669',
  transfer: '#7c3aed',
};

const TB_TOKEN_TONES = {
  type: ['#ede9fe', '#6d28d9'],
  value: ['#d1fae5', '#047857'],
  name: ['#dbeafe', '#1d4ed8'],
  op: ['#ffedd5', '#c2410c'],
  call: ['#cffafe', '#0e7490'],
};

function TBChapterNavLink({ item, direction }) {
  if (!item) return null;
  const label = item.label || item.title;
  const prefix = direction === 'prev' ? '< ' : '';
  const suffix = direction === 'next' ? ' >' : '';
  const content = (
    <React.Fragment>
      <span aria-hidden="true">{prefix}</span>
      <span>{label}</span>
      <span aria-hidden="true">{suffix}</span>
    </React.Fragment>
  );
  const styles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    minHeight: 24,
    border: '1px solid #dbe4ef',
    borderRadius: 5,
    background: '#fff',
    color: '#475569',
    padding: '3px 8px',
    fontSize: 11,
    fontWeight: 800,
    lineHeight: 1,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    cursor: item.href ? 'pointer' : 'default',
    opacity: item.href ? 1 : 0.45,
  };

  if (!item.href) {
    return (
      <span style={styles} aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <a href={item.href} style={styles} aria-label={item.ariaLabel || label}>
      {content}
    </a>
  );
}

function TBChapterStrip({ chapters, lessonTitle, hasLessonSelector, lessonSelectorOpen, onToggleLessonSelector }) {
  if (!chapters || !chapters.length) return null;

  return (
    <nav aria-label="Chapters" style={{
      minWidth: 0,
      display: 'grid',
      gridTemplateColumns: `repeat(${chapters.length}, minmax(96px, 1fr))`,
      alignItems: 'stretch',
      overflowX: 'auto',
      overflowY: 'hidden',
      height: '100%',
      background: '#f8fafc',
    }}>
      {chapters.map((chapter, index) => {
        const current = Boolean(chapter.current);
        const label = chapter.label || `Chapter ${chapter.n}`;
        const title = current ? (lessonTitle || chapter.title || null) : null;
        const selectorEnabled = current && hasLessonSelector;
        const styles = {
          minWidth: 96,
          height: '100%',
          display: 'grid',
          alignContent: 'center',
          justifyItems: 'center',
          gap: 2,
          borderLeft: index === 0 ? 'none' : '1px solid #e2e8f0',
          borderRight: current ? '1px solid #c7d2fe' : 'none',
          background: current ? '#eef5ff' : 'transparent',
          color: current ? '#1d4ed8' : '#64748b',
          padding: '4px 8px',
          lineHeight: 1,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          boxShadow: current ? 'inset 0 -2px 0 #2563eb' : 'none',
          font: 'inherit',
          appearance: 'none',
          cursor: selectorEnabled ? 'pointer' : current || !chapter.href ? 'default' : 'pointer',
        };
        const content = (
          <React.Fragment>
            <span style={{
              fontSize: 9,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: current ? '#2563eb' : '#94a3b8',
            }}>
              {label}
            </span>
            {title && (
              <span style={{
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: 11.5,
                fontWeight: 850,
                color: '#1e293b',
              }}>
                {title}
                {selectorEnabled && (
                  <span aria-hidden="true" style={{
                    display: 'inline-block',
                    marginLeft: 5,
                    color: '#2563eb',
                    fontSize: 10,
                    transform: lessonSelectorOpen ? 'rotate(180deg)' : 'none',
                  }}>⌄</span>
                )}
              </span>
            )}
          </React.Fragment>
        );

        if (selectorEnabled) {
          return (
            <button
              key={chapter.id || chapter.n}
              type="button"
              style={styles}
              aria-current="page"
              aria-expanded={lessonSelectorOpen}
              aria-haspopup="dialog"
              onClick={onToggleLessonSelector}
            >
              {content}
            </button>
          );
        }

        if (current || !chapter.href) {
          return (
            <span key={chapter.id || chapter.n} style={styles} aria-current={current ? 'page' : undefined}>
              {content}
            </span>
          );
        }

        return (
          <a key={chapter.id || chapter.n} href={chapter.href} style={styles} aria-label={`Go to ${label}`}>
            {content}
          </a>
        );
      })}
    </nav>
  );
}

function TBFlowShell({
  title,
  kicker,
  chapterNav,
  children,
  lessonSelector,
  lessonSelectorOpen,
  onToggleLessonSelector,
}) {
  const previousChapter = chapterNav && chapterNav.previous;
  const nextChapter = chapterNav && chapterNav.next;
  const chapters = chapterNav && chapterNav.chapters;
  const hasLessonSelector = Boolean(lessonSelector);

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#fff', overflow: 'hidden',
      fontFamily: "'Source Sans 3', sans-serif",
      position: 'relative',
      }}>
      <div style={{
        height: chapters ? 52 : 42,
        display: 'grid',
        gridTemplateColumns: chapters ? 'minmax(0, 1fr)' : 'auto minmax(0, 1fr) auto',
        alignItems: 'center', gap: 12,
        padding: '0 18px', borderBottom: '1px solid #e2e6ee',
        background: '#fff', flexShrink: 0, zIndex: 30,
      }}>
        {chapters ? (
          <TBChapterStrip
            chapters={chapters}
            lessonTitle={title}
            hasLessonSelector={hasLessonSelector}
            lessonSelectorOpen={lessonSelectorOpen}
            onToggleLessonSelector={onToggleLessonSelector}
          />
        ) : (
          <React.Fragment>
            <div style={{
              minWidth: 0, display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <TBChapterNavLink item={previousChapter} direction="prev" />
              <span style={{
                fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.08em', color: '#2563eb',
                background: '#dbeafe', padding: '2px 8px', borderRadius: 3,
                whiteSpace: 'nowrap',
              }}>{kicker}</span>
              <span style={{
                minWidth: 0, fontSize: 14, fontWeight: 700, color: '#1e293b',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {title}
              </span>
            </div>
            <div />
            <TBChapterNavLink item={nextChapter} direction="next" />
          </React.Fragment>
        )}
      </div>
      {lessonSelectorOpen && lessonSelector && (
        <div
          role="dialog"
          aria-label="Chapter lesson selector"
          style={{
            position: 'absolute',
            top: chapters ? 52 : 42,
            left: 18,
            right: 18,
            zIndex: 40,
          }}
        >
          {lessonSelector}
        </div>
      )}
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

function TBFlowStep({ n, label, caption, tone = TB_STAGE_TONES.example }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      <span style={{
        width: 22, height: 22, borderRadius: '50%',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, fontSize: 10, fontWeight: 800,
        color: '#fff', background: tone,
        fontFamily: "'JetBrains Mono', monospace",
      }}>{n}</span>
      <span>
        <span style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#1e293b' }}>
          {label}
        </span>
        <span style={{ display: 'block', fontSize: 11.5, lineHeight: 1.35, color: '#64748b' }}>
          {caption}
        </span>
      </span>
    </div>
  );
}

function TBMiniPreview({ children, height = 255, scale = 0.34 }) {
  return (
    <div style={{
      height, border: '1px solid #e2e6ee', borderRadius: 7,
      overflow: 'hidden', background: '#fff',
      boxShadow: '0 1px 5px rgba(15,23,42,0.05)',
      position: 'relative',
    }}>
      <div style={{
        width: 960, height: Math.round(height / scale),
        transform: `scale(${scale})`, transformOrigin: 'top left',
        pointerEvents: 'none',
      }}>
        {children}
      </div>
    </div>
  );
}

function TBNativePreview({ children, height = 280 }) {
  return (
    <div style={{
      height, border: '1px solid #e2e6ee', borderRadius: 7,
      overflow: 'hidden', background: '#fff',
      boxShadow: '0 1px 5px rgba(15,23,42,0.05)',
    }}>
      {children}
    </div>
  );
}

function TBFlowStage({ n, title, tag, children, note, tone, stageCount = 4 }) {
  return (
    <div style={{
      minWidth: 250, flex: '1 1 0', display: 'flex', flexDirection: 'column',
      borderRight: n < stageCount ? '1px solid #edf1f7' : 'none',
      padding: '12px 12px 14px', gap: 9,
    }}>
      <div style={{ minHeight: 68 }}>
        <TBFlowStep n={n} label={title} caption={note} tone={tone} />
        <span style={{
          display: 'inline-block', marginTop: 7,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5,
          color: '#94a3b8', textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}>{tag}</span>
      </div>
      {children}
    </div>
  );
}

function TBToken({ children, tone }) {
  const [bg, fg] = TB_TOKEN_TONES[tone] || ['#f1f5f9', '#475569'];
  return (
    <span style={{
      display: 'inline-block', padding: '0 4px', borderRadius: 4,
      background: bg, color: fg, fontWeight: 700,
    }}>{children}</span>
  );
}

function TBCodeLine({ line, index, tokenTones = {} }) {
  const tokens = Object.keys(tokenTones).sort((a, b) => b.length - a.length);
  const pieces = [];
  let i = 0;

  while (i < line.length) {
    const token = tokens.find((candidate) => line.startsWith(candidate, i));
    if (token) {
      pieces.push({ text: token, tone: tokenTones[token] });
      i += token.length;
    } else {
      pieces.push({ text: line[i] });
      i += 1;
    }
  }

  return (
    <div style={{
      display: 'flex', gap: 8, alignItems: 'center',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 13, color: '#334155', lineHeight: 1.75,
    }}>
      <span style={{ width: 18, textAlign: 'right', color: '#94a3b8' }}>{index + 1}</span>
      <span>
        {pieces.map((piece, idx) => piece.tone
          ? <TBToken key={`${piece.text}-${idx}`} tone={piece.tone}>{piece.text}</TBToken>
          : <React.Fragment key={`${piece.text}-${idx}`}>{piece.text}</React.Fragment>)}
      </span>
    </div>
  );
}

function TBMemoryMini({ rows }) {
  return (
    <div style={{
      border: '1px solid #dbe4ef', borderRadius: 7, overflow: 'hidden',
      background: '#fff', marginTop: 10,
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        padding: '5px 8px', background: '#f8fafc',
        fontSize: 8.5, textTransform: 'uppercase', letterSpacing: '0.08em',
        color: '#94a3b8', fontWeight: 800,
      }}>
        <span>Name</span><span>Type</span><span>Value</span>
      </div>
      {rows.map((row) => (
        <div key={row.name} style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          padding: '6px 8px', borderTop: '1px solid #edf2f7',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          color: '#334155',
        }}>
          <strong>{row.name}</strong>
          <span style={{ color: '#64748b' }}>{row.type}</span>
          <span style={{
            color: row.value === 'true' ? '#059669' : row.value === 'false' ? '#dc2626' : '#334155',
            fontWeight: 800,
          }}>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function TBExamplePreview({ cycle }) {
  return (
    <div style={{
      height: '100%', padding: 14, background: '#fbfdff',
      display: 'grid', gridTemplateRows: 'auto 1fr auto', gap: 9,
      fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <div>
        <div style={{
          fontSize: 9, fontWeight: 800, color: '#2563eb',
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>Run first</div>
        <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>{cycle.shortTitle}</div>
      </div>
      <div style={{
        border: '1px solid #e2e8f0', background: '#fff', borderRadius: 7,
        padding: '10px 8px',
      }}>
        {cycle.code.map((line, i) => (
          <TBCodeLine key={`${line}-${i}`} line={line} index={i} tokenTones={cycle.tokenTones} />
        ))}
      </div>
      <TBMemoryMini rows={cycle.memory} />
    </div>
  );
}

function TBShortCheck({ cycle }) {
  return (
    <div style={{
      height: '100%', padding: 14, background: '#fffbeb',
      fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <div style={{
        fontSize: 9, fontWeight: 800, color: '#b45309',
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7,
      }}>Predict</div>
      <div style={{ fontSize: 13, lineHeight: 1.35, fontWeight: 800, color: '#1e293b', marginBottom: 10 }}>
        {cycle.check.prompt}
      </div>
      <div style={{ display: 'grid', gap: 7 }}>
        {cycle.check.choices.map((choice, i) => (
          <div key={choice} style={{
            border: i === cycle.check.answer ? '1px solid #f59e0b' : '1px solid #fde68a',
            background: i === cycle.check.answer ? '#fef3c7' : '#fff7ed',
            borderRadius: 6, padding: '7px 9px',
            display: 'flex', alignItems: 'center', gap: 7,
            fontSize: 12.5, color: '#475569',
          }}>
            <span style={{
              width: 14, height: 14, borderRadius: '50%',
              border: '2px solid #f59e0b',
              background: i === cycle.check.answer ? '#f59e0b' : '#fff',
              flexShrink: 0,
            }} />
            {choice}
          </div>
        ))}
      </div>
    </div>
  );
}

function TBTextWalkthrough({ cycle }) {
  return (
    <div style={{
      height: '100%', padding: 14, background: '#f0fdf4',
      fontFamily: "'Source Sans 3', sans-serif", overflow: 'hidden',
    }}>
      <div style={{
        fontSize: 9, fontWeight: 800, color: '#047857',
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7,
      }}>Teach</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 9 }}>
        {cycle.vocab.map((word) => (
          <span key={word} style={{
            borderRadius: 4, padding: '2px 6px', background: '#dcfce7',
            color: '#047857', fontSize: 10.5, fontWeight: 800,
          }}>{word}</span>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 7 }}>
        {cycle.text.map((point) => (
          <p key={point} style={{
            margin: 0, fontSize: 12.5, lineHeight: 1.35, color: '#334155',
          }}>{point}</p>
        ))}
      </div>
    </div>
  );
}

function TBTransferCheck({ cycle }) {
  return (
    <div style={{
      height: '100%', padding: 14, background: '#faf5ff',
      fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <div style={{
        fontSize: 9, fontWeight: 800, color: '#7c3aed',
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8,
      }}>Transfer</div>
      <div style={{ display: 'grid', gap: 8 }}>
        {cycle.final.map((item, i) => (
          <div key={item} style={{
            border: '1px solid #e9d5ff', background: '#fff',
            borderRadius: 7, padding: '8px 9px',
            display: 'grid', gridTemplateColumns: '22px 1fr', gap: 7,
            fontSize: 12.5, lineHeight: 1.35, color: '#334155',
          }}>
            <span style={{
              width: 20, height: 20, borderRadius: '50%',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: '#ede9fe', color: '#6d28d9',
              fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: 10,
            }}>{i + 1}</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TBCycleButton({ cycle, active, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{
      border: active ? '1px solid #2563eb' : '1px solid #dbe4ef',
      background: active ? '#eff6ff' : '#fff',
      borderRadius: 7, padding: '9px 10px', textAlign: 'left',
      cursor: 'pointer', display: 'grid', gap: 5,
      boxShadow: active ? '0 1px 7px rgba(37,99,235,0.13)' : 'none',
    }}>
      <span style={{
        fontSize: 9, fontWeight: 800, color: active ? '#2563eb' : '#94a3b8',
        textTransform: 'uppercase', letterSpacing: '0.08em',
      }}>Cycle {cycle.n}</span>
      <span style={{ fontSize: 12.5, fontWeight: 800, color: '#1e293b', lineHeight: 1.2 }}>
        {cycle.title}
      </span>
      <span style={{ fontSize: 11.5, lineHeight: 1.3, color: '#64748b' }}>
        {cycle.behaviors.join(' + ')}
      </span>
    </button>
  );
}

function TBExampleFirstCycleFlow({ title, kicker, intro, cycles }) {
  const [active, setActive] = React.useState(0);
  const cycle = cycles[active];

  return (
    <TBFlowShell kicker={kicker} title={title}>
      <div style={{
        height: '100%', display: 'grid', gridTemplateColumns: '250px 1fr',
        background: '#fafbfc', minHeight: 0,
      }}>
        <div style={{
          borderRight: '1px solid #e2e6ee', background: '#fff',
          padding: 14, display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.35, color: '#475569' }}>
            {intro}
          </p>
          <div style={{ display: 'grid', gap: 8 }}>
            {cycles.map((item, i) => (
              <TBCycleButton
                key={item.title}
                cycle={item}
                active={i === active}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
        <div style={{ minHeight: 0, display: 'grid', gridTemplateRows: 'auto 1fr' }}>
          <div style={{
            padding: '10px 16px', borderBottom: '1px solid #e2e6ee',
            background: '#fff', display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              color: '#2563eb', background: '#dbeafe', padding: '3px 7px',
              borderRadius: 4, fontWeight: 800,
            }}>cycle {cycle.n}</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#1e293b' }}>{cycle.title}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', minHeight: 0 }}>
            <TBFlowStage
              n={1}
              title="Run the example"
              tag="example first"
              tone={TB_STAGE_TONES.example}
              note="Students inspect the behavior before the explanation names it."
            >
              <TBNativePreview height={280}>
                <TBExamplePreview cycle={cycle} />
              </TBNativePreview>
            </TBFlowStage>
            <TBFlowStage
              n={2}
              title="Make a prediction"
              tag="short quiz"
              tone={TB_STAGE_TONES.check}
              note="A narrow check makes the student commit to the observed state."
            >
              <TBNativePreview height={280}>
                <TBShortCheck cycle={cycle} />
              </TBNativePreview>
            </TBFlowStage>
            <TBFlowStage
              n={3}
              title="Name the behavior"
              tag="embedded text"
              tone={TB_STAGE_TONES.text}
              note="The prose is short and points back to the same example."
            >
              <TBNativePreview height={280}>
                <TBTextWalkthrough cycle={cycle} />
              </TBNativePreview>
            </TBFlowStage>
            <TBFlowStage
              n={4}
              title="Transfer it"
              tag="cycle check"
              tone={TB_STAGE_TONES.transfer}
              note="The closing check asks for translation, state, or nearby code."
            >
              <TBNativePreview height={280}>
                <TBTransferCheck cycle={cycle} />
              </TBNativePreview>
            </TBFlowStage>
          </div>
        </div>
      </div>
    </TBFlowShell>
  );
}

function TBPageSequence({ title, kicker, chapterNav, pages, learningTarget, availableSyntax, lessonSelector }) {
  const [active, setActive] = React.useState(0);
  const [pageControlsState, setPageControlsState] = React.useState({ active: 0, controls: {} });
  const [pageSteps, setPageSteps] = React.useState({});
  const [footerStacked, setFooterStacked] = React.useState(false);
  const [syntaxOpen, setSyntaxOpen] = React.useState(false);
  const [lessonSelectorOpen, setLessonSelectorOpen] = React.useState(false);
  const footerRef = React.useRef(null);
  const tabsRef = React.useRef(null);
  const controlsRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const page = pages[active];
  const PageComponent = page.component;
  const SyntaxDrawer = window.FuncsSyntaxDrawer;
  const hasSyntax = Boolean(SyntaxDrawer && availableSyntax && (
    Array.isArray(availableSyntax) ? availableSyntax.length : Object.keys(availableSyntax).length
  ));
  const stepCount = page.stepCount || 1;
  const currentStep = Math.min(pageSteps[page.id] || 0, stepCount - 1);
  const hasInternalSteps = stepCount > 1;
  const atLastStep = currentStep >= stepCount - 1;

  const goPrevPage = React.useCallback(() => setActive(prev => Math.max(0, prev - 1)), []);
  const goNextPage = React.useCallback(() => setActive(prev => Math.min(pages.length - 1, prev + 1)), [pages.length]);
  const registerControls = React.useCallback((controls) => {
    setPageControlsState({ active, controls: controls || {} });
  }, [active]);

  const setCurrentStep = React.useCallback((nextStep) => {
    setPageSteps(prev => {
      const raw = typeof nextStep === 'function' ? nextStep(prev[page.id] || 0) : nextStep;
      const bounded = Math.max(0, Math.min(stepCount - 1, raw));
      return { ...prev, [page.id]: bounded };
    });
  }, [page.id, stepCount]);

  const goPrev = React.useCallback(() => {
    if (hasInternalSteps && currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      return;
    }
    goPrevPage();
  }, [currentStep, goPrevPage, hasInternalSteps, setCurrentStep]);

  const goNext = React.useCallback(() => {
    if (hasInternalSteps && !atLastStep) {
      setCurrentStep(prev => prev + 1);
      return;
    }
    goNextPage();
  }, [atLastStep, goNextPage, hasInternalSteps, setCurrentStep]);

  const sequence = React.useMemo(() => ({
    active,
    pageCount: pages.length,
    currentStep,
    stepCount,
    isFirst: active === 0,
    isLast: active === pages.length - 1,
    goPrevPage,
    goNextPage,
    setCurrentStep,
    registerControls,
  }), [active, currentStep, pages.length, registerControls, goNextPage, goPrevPage, setCurrentStep, stepCount]);

  const pageControls = pageControlsState.active === active ? pageControlsState.controls : {};
  const defaultCanBack = hasInternalSteps ? currentStep > 0 || active > 0 : active > 0;
  const defaultCanNext = hasInternalSteps ? active < pages.length - 1 || !atLastStep : active < pages.length - 1;
  const defaultBackLabel = hasInternalSteps && currentStep > 0 ? 'Previous line' : 'Back';
  const defaultNextLabel = hasInternalSteps && !atLastStep
    ? 'Run next line'
    : active === pages.length - 1 ? 'Done' : 'Next';
  const defaultStatus = hasInternalSteps ? `${currentStep} of ${stepCount - 1}` : `${active + 1} of ${pages.length}`;
  const canBack = pageControls.canBack ?? defaultCanBack;
  const canNext = pageControls.canNext ?? defaultCanNext;
  const backLabel = pageControls.backLabel || defaultBackLabel;
  const nextLabel = pageControls.nextLabel || defaultNextLabel;
  const statusLabel = pageControls.status || defaultStatus;
  const runPrev = pageControls.onBack || goPrev;
  const runNext = pageControls.onNext || goNext;

  const measureFooterStack = React.useCallback(() => {
    const footer = footerRef.current;
    const tabs = tabsRef.current;
    const controls = controlsRef.current;
    if (!footer || !tabs || !controls) return;

    const readGap = (element) => {
      const styles = window.getComputedStyle(element);
      return parseFloat(styles.columnGap || styles.gap || '0') || 0;
    };

    const footerStyles = window.getComputedStyle(footer);
    const horizontalPadding =
      (parseFloat(footerStyles.paddingLeft) || 0) +
      (parseFloat(footerStyles.paddingRight) || 0);
    const availableWidth = footer.clientWidth - horizontalPadding;
    const tabsGap = readGap(tabs);
    const tabButtons = Array.from(tabs.children);
    const tabsNeeded = tabButtons.reduce((sum, item) => (
      sum + item.getBoundingClientRect().width
    ), 0) + Math.max(0, tabButtons.length - 1) * tabsGap;
    const controlsNeeded = controls.getBoundingClientRect().width;
    const requiredWidth = tabsNeeded + controlsNeeded + readGap(footer);

    setFooterStacked(prev => {
      const buffer = prev ? 28 : 0;
      const shouldStack = requiredWidth > availableWidth - buffer;
      return prev === shouldStack ? prev : shouldStack;
    });
  }, []);

  React.useLayoutEffect(() => {
    measureFooterStack();
    const targets = [footerRef.current, tabsRef.current, controlsRef.current].filter(Boolean);
    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(measureFooterStack)
      : null;
    targets.forEach(target => resizeObserver && resizeObserver.observe(target));
    window.addEventListener('resize', measureFooterStack);

    return () => {
      window.removeEventListener('resize', measureFooterStack);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [measureFooterStack]);

  React.useLayoutEffect(() => {
    measureFooterStack();
  }, [active, currentStep, measureFooterStack, statusLabel, backLabel, nextLabel]);

  React.useLayoutEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
      contentRef.current.scrollLeft = 0;
    }
    setSyntaxOpen(false);
    setLessonSelectorOpen(false);
  }, [active]);

  return (
    <TBFlowShell
      kicker={kicker}
      title={title}
      chapterNav={chapterNav}
      lessonSelector={lessonSelector}
      lessonSelectorOpen={lessonSelectorOpen}
      onToggleLessonSelector={() => setLessonSelectorOpen(prev => !prev)}
    >
      <style>{`
        .tb-page-sequence-frame {
          height: 100%;
          display: grid;
          grid-template-rows: minmax(0, 1fr) auto;
          background: #fafbfc;
          min-height: 0;
          position: relative;
        }

        .tb-page-syntax-bar {
          min-height: 38px;
          border-bottom: 1px solid #e2e6ee;
          background: #fbfdff;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          padding: 5px 12px;
        }

        .tb-page-syntax-target {
          min-width: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          color: #64748b;
        }

        .tb-page-sequence-content {
          min-height: 0;
          overflow: auto;
          background: #fff;
        }

        .tb-page-sequence-page {
          height: 100%;
          min-height: 100%;
        }

        .tb-page-sequence-footer {
          border-top: 1px solid #e2e6ee;
          background: #fff;
          padding: 8px 10px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 10px;
          align-items: center;
        }

        .tb-page-sequence-tabs {
          display: flex;
          gap: 7px;
          min-width: 0;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 1px;
          scrollbar-gutter: auto;
          scrollbar-width: thin;
        }

        .tb-page-sequence-tabs::-webkit-scrollbar {
          height: 6px;
        }

        .tb-page-sequence-tabs::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 999px;
        }

        .tb-page-sequence-tab {
          flex: 0 0 max-content;
          width: max-content;
          min-width: max-content;
          border-radius: 7px;
          padding: 6px 9px;
          text-align: left;
          cursor: pointer;
          display: grid;
          gap: 2px;
        }

        .tb-page-sequence-tab-title {
          font-size: 11.8px;
          font-weight: 800;
          line-height: 1.1;
          color: #1e293b;
          white-space: nowrap;
        }

        .tb-page-sequence-controls {
          display: grid;
          grid-template-columns: 136px 136px;
          grid-template-rows: auto auto;
          align-items: center;
          gap: 5px 8px;
          justify-content: end;
          width: 280px;
          min-width: 280px;
        }

        .tb-page-sequence-control-status {
          grid-column: 1 / -1;
          justify-self: center;
          max-width: 100%;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9.5px;
          font-weight: 700;
          color: #64748b;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          padding: 2px 9px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tb-page-sequence-control-button {
          width: 100%;
          min-height: 31px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tb-page-syntax-trigger {
          border: 1px solid #bfdbfe;
          border-radius: 6px;
          background: #eff6ff;
          color: #1d4ed8;
          min-height: 29px;
          padding: 5px 10px;
          font-size: 11px;
          font-weight: 850;
          cursor: pointer;
        }

        .tb-page-sequence-footer-stacked {
          grid-template-columns: 1fr;
          gap: 7px;
          padding: 7px 9px 8px;
          justify-items: stretch;
        }

        .tb-page-sequence-footer-stacked .tb-page-sequence-controls {
          order: 1;
          grid-template-columns: minmax(76px, 1fr) minmax(96px, 136px) minmax(104px, 148px);
          grid-template-rows: auto;
          align-items: center;
          justify-content: stretch;
          width: min(100%, 720px);
          min-width: 0;
          justify-self: center;
        }

        .tb-page-sequence-footer-stacked .tb-page-sequence-control-status {
          grid-column: auto;
          justify-self: stretch;
          text-align: center;
        }

        .tb-page-sequence-footer-stacked .tb-page-sequence-tabs {
          order: 2;
          width: 100%;
          justify-self: center;
          justify-content: flex-start;
          flex-wrap: nowrap;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 2px;
          scrollbar-width: none;
        }

        .tb-page-sequence-footer-stacked .tb-page-sequence-tabs::-webkit-scrollbar {
          display: none;
        }

        .tb-page-sequence-footer-stacked .tb-page-sequence-tab {
          flex: 0 0 142px;
          width: 142px;
          min-width: 142px;
          max-width: 142px;
        }

        @media (max-width: 560px) {
          .tb-page-sequence-footer {
            grid-template-columns: 1fr;
            gap: 6px;
            padding: 6px 8px 7px;
          }

          .tb-page-sequence-tabs {
            flex-wrap: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
          }

          .tb-page-sequence-tab {
            flex: 0 0 128px;
            min-width: 128px;
            width: 128px;
            padding: 5px 8px;
          }

          .tb-page-sequence-controls {
            display: grid;
            grid-template-columns: minmax(68px, 1fr) minmax(82px, 112px) minmax(92px, 124px);
            grid-template-rows: auto;
            width: 100%;
            min-width: 0;
            gap: 5px;
          }

          .tb-page-sequence-control-status {
            grid-column: auto;
            justify-self: stretch;
            text-align: center;
            padding-left: 6px;
            padding-right: 6px;
          }

          .tb-page-sequence-control-button {
            min-height: 30px;
            padding-left: 7px !important;
            padding-right: 7px !important;
          }
        }

        @media (max-width: 380px) {
          .tb-page-sequence-tab {
            flex-basis: 120px;
            min-width: 120px;
            width: 120px;
          }
        }
      `}</style>
      <div className={`tb-page-sequence-frame${hasSyntax ? ' tb-page-sequence-frame-has-syntax' : ''}`}>
        <div ref={contentRef} className="tb-page-sequence-content">
          {hasSyntax && (
            <div className="tb-page-syntax-bar">
              {learningTarget && (
                <span className="tb-page-syntax-target">{learningTarget}</span>
              )}
              <button
                type="button"
                className="tb-page-syntax-trigger"
                aria-expanded={syntaxOpen}
                onClick={() => setSyntaxOpen(prev => !prev)}
              >
                Syntax so far
              </button>
              {syntaxOpen && (
                <SyntaxDrawer
                  syntax={availableSyntax}
                  learningTarget={learningTarget}
                  onClose={() => setSyntaxOpen(false)}
                />
              )}
            </div>
          )}
          <div className="tb-page-sequence-page">
            {PageComponent ? <PageComponent sequence={sequence} /> : page.element}
          </div>
        </div>
        <div
          ref={footerRef}
          className={`tb-page-sequence-footer${footerStacked ? ' tb-page-sequence-footer-stacked' : ''}`}
        >
          <div ref={tabsRef} className="tb-page-sequence-tabs">
            {pages.map((item, i) => {
              const itemStepCount = item.stepCount || 1;
              const itemStep = Math.min(pageSteps[item.id] || 0, itemStepCount - 1);
              const itemHasSteps = itemStepCount > 1;
              return (
                <button key={item.id} type="button" className="tb-page-sequence-tab" onClick={() => setActive(i)} style={{
                  border: i === active ? '1px solid #2563eb' : '1px solid #dbe4ef',
                  background: i === active ? '#eff6ff' : '#fff',
                }}>
                  <span style={{
                    fontSize: 8.5, fontWeight: 800, color: i === active ? '#2563eb' : '#94a3b8',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                  }}>{item.kicker || `Page ${i + 1}`}</span>
                  <span className="tb-page-sequence-tab-title">
                    {item.title}
                  </span>
                  {itemHasSteps && (
                    <span style={{
                      display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 6,
                      alignItems: 'center', marginTop: 2,
                    }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                        color: i === active ? '#2563eb' : '#94a3b8', fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}>step {itemStep}/{itemStepCount - 1}</span>
                      <span style={{ display: 'flex', gap: 2 }}>
                        {Array.from({ length: itemStepCount }).map((_, dotIndex) => (
                          <span key={dotIndex} style={{
                            width: 7, height: 3, borderRadius: 999,
                            background: dotIndex <= itemStep
                              ? i === active ? '#2563eb' : '#94a3b8'
                              : '#dbe4ef',
                          }} />
                        ))}
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div ref={controlsRef} className="tb-page-sequence-controls">
            <span className="tb-page-sequence-control-status">{statusLabel}</span>
            <button type="button" disabled={!canBack} onClick={runPrev} className="tb-page-sequence-control-button" style={{
              border: '1px solid #dbe4ef', borderRadius: 5,
              background: '#fff', color: '#475569', padding: '6px 10px',
              fontSize: 11.5, fontWeight: 700, opacity: canBack ? 1 : 0.35,
              cursor: canBack ? 'pointer' : 'default', whiteSpace: 'nowrap',
            }}>{backLabel}</button>
            <button type="button" disabled={!canNext} onClick={runNext} className="tb-page-sequence-control-button" style={{
              border: 'none', borderRadius: 5,
              background: '#2563eb', color: '#fff', padding: '6px 12px',
              fontSize: 11.5, fontWeight: 700, opacity: canNext ? 1 : 0.4,
              cursor: canNext ? 'pointer' : 'default', whiteSpace: 'nowrap',
            }}>{nextLabel}</button>
          </div>
        </div>
      </div>
    </TBFlowShell>
  );
}

function TBInlineCycleReadingPage({ title, intro, cycles }) {
  return (
    <div style={{
      height: '100%', overflow: 'auto', background: '#fff',
      fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <div style={{ maxWidth: 920, margin: '0 auto', padding: '22px 30px 30px' }}>
        <div style={{
          fontSize: 10, fontWeight: 800, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#2563eb',
          marginBottom: 6,
        }}>Written Section</div>
        <h2 style={{ margin: 0, fontSize: 24, lineHeight: 1.1, color: '#0f172a' }}>{title}</h2>
        <p style={{ margin: '8px 0 20px', fontSize: 14.5, lineHeight: 1.6, color: '#475569' }}>
          {intro}
        </p>
        <div style={{ display: 'grid', gap: 20 }}>
          {cycles.map((cycle) => (
            <section key={cycle.title} style={{
              borderTop: '1px solid #e2e8f0', paddingTop: 18,
              display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 330px',
              gap: 18, alignItems: 'start',
            }}>
              <div>
                <div style={{
                  display: 'inline-block', marginBottom: 7,
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                  color: '#2563eb', background: '#dbeafe',
                  borderRadius: 4, padding: '2px 7px', fontWeight: 800,
                }}>cycle {cycle.n}</div>
                <h3 style={{ margin: 0, fontSize: 18, lineHeight: 1.2, color: '#1e293b' }}>
                  {cycle.title}
                </h3>
                <ul style={{
                  margin: '10px 0 12px', paddingLeft: 18,
                  fontSize: 13.5, lineHeight: 1.45, color: '#475569',
                }}>
                  {cycle.behaviors.map((behavior) => <li key={behavior}>{behavior}</li>)}
                </ul>
                <div style={{ display: 'grid', gap: 8 }}>
                  {cycle.text.map((point) => (
                    <p key={point} style={{ margin: 0, fontSize: 14, lineHeight: 1.58, color: '#334155' }}>
                      {point}
                    </p>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                <TBNativePreview height={220}>
                  <TBExamplePreview cycle={cycle} />
                </TBNativePreview>
                <TBNativePreview height={180}>
                  <TBShortCheck cycle={cycle} />
                </TBNativePreview>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function TBQuizFrame({ title, kicker = 'Quiz', prompt, children }) {
  return (
    <div style={{
      minHeight: '100%', display: 'flex', flexDirection: 'column',
      background: '#fff', fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <div style={{
        height: 44, display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 18px', borderBottom: '1px solid #e2e6ee',
        background: '#fff', flexShrink: 0,
      }}>
        <span style={{
          fontSize: 9.5, fontWeight: 800, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#92400e',
          background: '#fef3c7', padding: '2px 8px', borderRadius: 3,
        }}>{kicker}</span>
        <span style={{ fontSize: 14, fontWeight: 800, color: '#1e293b' }}>{title}</span>
      </div>
      {prompt && (
        <div style={{
          padding: '10px 18px', background: '#fffbeb',
          borderBottom: '1px solid #fde68a',
          color: '#78350f', fontSize: 13.5, lineHeight: 1.45,
        }}>{prompt}</div>
      )}
      <div style={{ flex: 1, minHeight: 0, padding: 18 }}>
        {children}
      </div>
    </div>
  );
}

function TBTranslationCheck({ rows }) {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {rows.map((row, i) => (
        <div key={row.code} style={{
          border: '1px solid #e2e8f0', borderRadius: 8,
          display: 'grid', gridTemplateColumns: 'minmax(180px, 0.55fr) 1fr',
          overflow: 'hidden', background: '#fff',
        }}>
          <div style={{
            padding: 12, borderRight: '1px solid #e2e8f0',
            background: '#f8fafc',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
            color: '#334155',
          }}>
            <span style={{ color: '#94a3b8', marginRight: 8 }}>{i + 1}</span>{row.code}
          </div>
          <div style={{ padding: 12, fontSize: 13.5, lineHeight: 1.45, color: '#475569' }}>
            {row.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

function TBStateTableCheck({ code, columns, rows }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '330px 1fr', gap: 16, alignItems: 'start' }}>
      <div style={{
        border: '1px solid #e2e8f0', borderRadius: 8, padding: 12,
        background: '#f8fafc',
      }}>
        {code.map((line, i) => (
          <TBCodeLine key={line} line={line} index={i} tokenTones={{ bool: 'type', true: 'value', false: 'value' }} />
        ))}
      </div>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: `70px repeat(${columns.length}, 1fr)`,
          background: '#f8fafc', borderBottom: '1px solid #e2e8f0',
        }}>
          <div style={{ padding: 8, fontSize: 10, color: '#94a3b8', fontWeight: 800 }}>After</div>
          {columns.map(col => (
            <div key={col} style={{ padding: 8, fontSize: 10, color: '#94a3b8', fontWeight: 800 }}>{col}</div>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row.after} style={{
            display: 'grid', gridTemplateColumns: `70px repeat(${columns.length}, 1fr)`,
            borderTop: '1px solid #f1f5f9',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          }}>
            <div style={{ padding: 8, color: '#64748b' }}>{row.after}</div>
            {columns.map(col => (
              <div key={col} style={{
                padding: 8, color: row[col] === '—' ? '#cbd5e1' : '#334155',
                fontWeight: row[col] === '—' ? 400 : 700,
              }}>{row[col]}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TBWriteCodeCheck({ prompts }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {prompts.map((item, i) => (
        <div key={item.prompt} style={{
          border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1fr minmax(240px, 0.62fr)',
        }}>
          <div style={{ padding: 13, fontSize: 13.5, lineHeight: 1.45, color: '#334155' }}>
            <strong style={{ color: '#1e293b' }}>{i + 1}. </strong>{item.prompt}
          </div>
          <div style={{
            padding: 13, background: '#f8fafc', borderLeft: '1px solid #e2e8f0',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5,
            color: '#2563eb',
          }}>{item.answer}</div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  TB_STAGE_TONES,
  TB_TOKEN_TONES,
  TBChapterNavLink,
  TBChapterStrip,
  TBFlowShell,
  TBFlowStep,
  TBMiniPreview,
  TBNativePreview,
  TBFlowStage,
  TBToken,
  TBCodeLine,
  TBMemoryMini,
  TBExamplePreview,
  TBShortCheck,
  TBTextWalkthrough,
  TBTransferCheck,
  TBCycleButton,
  TBExampleFirstCycleFlow,
  TBPageSequence,
  TBInlineCycleReadingPage,
  TBQuizFrame,
  TBTranslationCheck,
  TBStateTableCheck,
  TBWriteCodeCheck,
});
