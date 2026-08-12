/* flow-lesson-kit.jsx — authoring primitives for the revised lesson flow.
   Everything a lesson stage needs to draw itself lives here; a lesson supplies
   data only. Loaded after concept-lesson-kit.jsx. */

const FLOW_FONT = "'Source Sans 3', sans-serif";
const FLOW_MONO = "'JetBrains Mono', monospace";
const FLOW_LABEL = { fontSize: 9.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' };

const FUNCS_FLOW_LESSON_KIT_DOC_BREADCRUMBS = {
  componentReference: 'doc-21',
  authoringContract: 'doc-22',
  prototypeWorkflow: 'doc-23',
  authoringGuide: 'beta/Funcs/lesson-kit/FLOW_AUTHORING.md',
  canonicalStylesheet: 'beta/Funcs/lesson-kit/flow-lesson.css',
  designExperiment: 'beta/Funcs/Lesson Flow Design Skill Comparison.html',
  note: 'This is the canonical beta lesson flow. Keep its contract, authoring guide, and verification notes synchronized with doc-21, doc-22, and doc-23.',
};

const FLOW_RESPONSIVE_STYLES = `
  .flow-stage-frame {
    min-width: 0;
  }

  .flow-stage-frame button:focus-visible {
    outline: 3px solid rgba(37, 99, 235, 0.28);
    outline-offset: 2px;
  }

  @media (max-width: 760px) {
    .flow-goal-layout,
    .flow-rigorous-layout {
      grid-template-columns: minmax(0, 1fr) !important;
      grid-template-rows: max-content max-content !important;
      flex: none !important;
      min-height: auto !important;
    }

    .flow-goal-code,
    .flow-rigorous-code {
      border-right: 0 !important;
      border-bottom: 1px solid #e2e6ee;
      overflow: visible !important;
    }

    .flow-goal-state,
    .flow-rigorous-questions {
      overflow: visible !important;
    }

    .flow-stage-body {
      max-width: none !important;
      padding: 14px 12px 18px !important;
    }

    .flow-stage-heading-row {
      align-items: flex-start !important;
      flex-direction: column;
      gap: 7px !important;
    }

    .flow-stage-heading-row > :last-child {
      margin-left: 0 !important;
    }

    .flow-prequiz-category {
      align-items: flex-start !important;
      flex-wrap: wrap;
    }

    .flow-prequiz-category-meta {
      width: 100%;
      margin-left: 23px !important;
    }

    .flow-prequiz-category .funcs-subgoal-tag {
      white-space: normal !important;
    }

    .flow-prequiz-category .funcs-subgoal-tag > :last-child {
      overflow: visible !important;
      text-overflow: clip !important;
    }
  }
`;

/* The complete set of assessment shapes an author can write. Every quiz,
   check, and pre-quiz detail in the flow is one of these objects. */
const FLOW_QUESTION_KINDS = {
  choice: {
    label: 'multiple choice',
    fields: ['q', 'choices[]', 'correct (index)', 'mono?', 'why'],
    note: 'Also covers "pick the line" — set mono: true so the options read as code.',
  },
  chips: {
    label: 'fill the value',
    fields: ['q', 'chips[]', 'correct (value)', 'why'],
    note: 'Tap-to-answer. Chips are never crossed out, so elimination does not shortcut the answer.',
  },
  order: {
    label: 'put in order',
    fields: ['q', 'bank[] (shuffled ids)', 'correct[] (ids in order)', 'items{} (optional tags)', 'why'],
    note: 'items{} turns each option into a labelled subgoal tag with its own per-slot explanation.',
  },
  row: {
    label: 'fill the trace row',
    fields: ['q', 'rowLabel', 'columns[]', 'cells[{col, chips[], correct}]', 'why'],
    note: 'One row of a trace table, filled one column at a time.',
  },
};

function flowQuestionKind(question) {
  if (!question) return null;
  if (question.kind) return question.kind;
  if (question.cells) return 'row';
  if (Array.isArray(question.correct)) return 'order';
  if (question.chips) return 'chips';
  return 'choice';
}

function flowQuestionDone(question, value) {
  const kind = flowQuestionKind(question);
  if (kind === 'order') return Array.isArray(value) && value.length === question.correct.length;
  if (kind === 'row') return Boolean(value) && question.cells.every(cell => value[cell.col] != null);
  return value != null;
}

function flowQuestionRight(question, value) {
  if (!flowQuestionDone(question, value)) return false;
  const kind = flowQuestionKind(question);
  if (kind === 'order') return value.every((id, i) => id === question.correct[i]);
  if (kind === 'row') return question.cells.every(cell => value[cell.col] === cell.correct);
  return value === question.correct;
}

function flowQuestionScore(question, value) {
  const kind = flowQuestionKind(question);
  if (kind === 'order') return (value || []).filter((id, i) => id === question.correct[i]).length;
  if (kind === 'row') return question.cells.filter(cell => (value || {})[cell.col] === cell.correct).length;
  return flowQuestionRight(question, value) ? 1 : 0;
}

function flowQuestionSlots(question) {
  const kind = flowQuestionKind(question);
  if (kind === 'order') return question.correct.length;
  if (kind === 'row') return question.cells.length;
  return 1;
}

function flowQuestionSummary(question, value) {
  const kind = flowQuestionKind(question);
  if (kind === 'order') return (value || []).map(id => question.items?.[id]?.label || id).join(' → ');
  if (kind === 'row') return question.cells.map(cell => `${cell.col} ${(value || {})[cell.col]}`).join(' · ');
  if (kind === 'chips') return value;
  return question.choices?.[value];
}

function FlowShell({ intent, children, footer }) {
  return (
    <div className="flow-stage-frame" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', fontFamily: FLOW_FONT, fontSize: 14, color: '#1e293b' }}>
      <style>{FLOW_RESPONSIVE_STYLES}</style>
      {intent && (
        <div style={{ padding: '7px 12px', background: '#fffbeb', borderBottom: '1px solid #fde68a', fontSize: 11.5, lineHeight: 1.4, color: '#92400e', flexShrink: 0 }}>
          <strong>Intent:</strong> {intent}
        </div>
      )}
      <div style={{ flex: 1, minHeight: 0, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>{children}</div>
      {footer}
    </div>
  );
}

function FlowFooter({ backLabel = 'Back', nextLabel = 'Next', status = '', canBack = true, canNext = true, onBack, onNext, tone = 'read' }) {
  const run = tone === 'run';
  const btn = { border: '1px solid #cbd5e1', borderRadius: 6, background: '#fff', color: '#475569', padding: '6px 12px', fontSize: 12, fontWeight: 800, cursor: 'pointer', fontFamily: FLOW_FONT, whiteSpace: 'nowrap' };
  return (
    <div style={{ borderTop: '1px solid #e2e6ee', background: '#fff', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: FLOW_MONO, fontSize: 9.5, fontWeight: 700, color: run ? '#047857' : '#2563eb', background: run ? '#d1fae5' : '#dbeafe', borderRadius: 999, padding: '2px 8px', whiteSpace: 'nowrap' }}>
        {run ? '▶ executing' : '☰ reading'}
      </span>
      <span style={{ flex: 1, fontFamily: FLOW_MONO, fontSize: 10, color: '#94a3b8', textAlign: 'center', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{status}</span>
      <button type="button" disabled={!canBack} onClick={onBack} style={{ ...btn, opacity: canBack ? 1 : 0.35, cursor: canBack ? 'pointer' : 'default' }}>{backLabel}</button>
      <button type="button" disabled={!canNext} onClick={onNext} style={{ ...btn, border: 'none', background: run ? '#059669' : '#2563eb', color: '#fff', opacity: canNext ? 1 : 0.4, cursor: canNext ? 'pointer' : 'default' }}>{run ? '▶ ' : ''}{nextLabel}</button>
    </div>
  );
}

/* Stage frame. In the design canvas a stage draws its own intent strip and footer;
   inside the shipped page sequence the same stage hands its controls to the host. */
function FlowStageFrame({ chrome = 'standalone', intent, controls = {}, sequence, children }) {
  const registerControls = sequence?.registerControls;
  const onBackRef = React.useRef(null);
  const onNextRef = React.useRef(null);
  onBackRef.current = controls.onBack || sequence?.goPrevPage;
  onNextRef.current = controls.onNext || sequence?.goNextPage;

  const runBack = React.useCallback(() => onBackRef.current?.(), []);
  const runNext = React.useCallback(() => onNextRef.current?.(), []);

  React.useEffect(() => {
    if (chrome !== 'sequence' || !registerControls) return;
    registerControls({
      canBack: controls.canBack ?? true,
      canNext: controls.canNext ?? false,
      backLabel: controls.backLabel,
      nextLabel: controls.nextLabel,
      status: controls.status,
      onBack: runBack,
      onNext: runNext,
    });
  }, [chrome, registerControls, controls.canBack, controls.canNext, controls.backLabel, controls.nextLabel, controls.status, runBack, runNext]);

  if (chrome === 'sequence') {
    return (
      <div className="flow-stage-frame flow-stage-frame-sequence" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', fontFamily: FLOW_FONT, fontSize: 14, color: '#1e293b', overflow: 'auto' }}>
        <style>{FLOW_RESPONSIVE_STYLES}</style>
        {children}
      </div>
    );
  }

  return (
    <FlowShell intent={intent} footer={<FlowFooter {...controls} />}>{children}</FlowShell>
  );
}

/* Tap-to-place chip. Deliberately never crossed out or dimmed after use:
   reusable answers remove process-of-elimination shortcuts. */
function FlowTapChip({ value, label, onClick, selected, mono = true }) {
  return (
    <button type="button" onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', fontFamily: mono ? FLOW_MONO : FLOW_FONT, fontSize: 11, fontWeight: 700,
      padding: '4px 10px', borderRadius: 4, cursor: 'pointer', background: selected ? '#fffbeb' : '#fff',
      border: `1.5px solid ${selected ? '#f59e0b' : '#cbd5e1'}`, boxShadow: selected ? '0 0 0 3px rgba(245,158,11,0.16)' : 'none', color: '#1e293b',
    }}>{label || value}</button>
  );
}

function FlowChoiceBtn({ text, mono = false, onClick, chosen, isCorrect, revealed, disabled }) {
  let border = '1px solid #dbe4ef', bg = '#fff', color = '#334155';
  if (revealed && chosen && isCorrect) { border = '1.5px solid #4ade80'; bg = '#f0fdf4'; color = '#166534'; }
  else if (revealed && chosen && !isCorrect) { border = '1.5px solid #f87171'; bg = '#fef2f2'; color = '#991b1b'; }
  else if (revealed && isCorrect) { border = '1.5px solid #86efac'; bg = '#f0fdf4'; color = '#166534'; }
  else if (chosen) { border = '1.5px solid #2563eb'; bg = '#eff6ff'; }
  return (
    <button type="button" onClick={onClick} disabled={disabled} style={{
      display: 'flex', alignItems: 'center', gap: 8, width: '100%', textAlign: 'left', border, background: bg, color, borderRadius: 7,
      padding: '8px 11px', fontFamily: mono ? FLOW_MONO : FLOW_FONT, fontSize: mono ? 12 : 13, lineHeight: 1.4, fontWeight: chosen ? 700 : 500,
      minWidth: 0, maxWidth: '100%', overflow: 'hidden', cursor: disabled ? 'default' : 'pointer',
    }}>
      <span style={{ width: 14, height: 14, borderRadius: '50%', flexShrink: 0, border: chosen ? '4.5px solid ' + (revealed ? (isCorrect ? '#16a34a' : '#dc2626') : '#2563eb') : '1.5px solid #cbd5e1', background: '#fff', boxSizing: 'border-box' }}></span>
      <span style={{ minWidth: 0, overflowWrap: 'anywhere' }}>{text}</span>
      {revealed && isCorrect && <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 900, color: '#16a34a', flexShrink: 0 }}>✓</span>}
    </button>
  );
}

function FlowExplain({ correct, children }) {
  return (
    <div style={{
      borderRadius: 6, padding: '8px 10px', fontSize: 12.2, lineHeight: 1.45,
      background: correct ? '#f0fdf4' : '#fff7ed', color: correct ? '#166534' : '#9a3412',
      border: `1px solid ${correct ? '#bbf7d0' : '#fed7aa'}`,
    }}>{children}</div>
  );
}

function FlowTypeTag({ children }) {
  return <span style={{ fontFamily: FLOW_MONO, fontSize: 9, fontWeight: 700, color: '#64748b', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 999, padding: '2px 7px', whiteSpace: 'nowrap' }}>{children}</span>;
}

function FlowPaneLabel({ children, style }) {
  return <div style={{ ...FLOW_LABEL, marginBottom: 6, ...style }}>{children}</div>;
}

const FLOW_ORDINALS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

function FlowOrderQuestion({ question, value, onChange, revealed }) {
  const { FuncsSubgoalTag } = window;
  const picked = value || [];
  const items = question.items || {};
  const tagStyle = Boolean(question.items);
  const bank = question.bank || question.correct;
  const full = picked.length >= question.correct.length;
  const place = (id) => { if (!full) onChange([...picked, id]); };

  return (
    <div style={{ display: 'grid', gap: 9 }}>
      <div style={{ border: tagStyle ? '1px solid #dbe4ef' : 'none', borderRadius: 9, background: tagStyle ? '#fbfcfe' : 'transparent', padding: tagStyle ? 12 : 0, display: 'grid', gap: tagStyle ? 8 : 6 }}>
        {question.correct.map((_, slot) => {
          const id = picked[slot];
          const right = revealed && id === question.correct[slot];
          const wrong = revealed && id && id !== question.correct[slot];
          return (
            <div key={slot} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: FLOW_MONO, fontSize: 10, color: '#94a3b8', width: tagStyle ? 30 : 16, flexShrink: 0 }}>{tagStyle ? FLOW_ORDINALS[slot] : slot + 1}</span>
              <div style={{
                flex: 1, minHeight: tagStyle ? 34 : 30, display: 'flex', alignItems: 'center', gap: 9, padding: '5px 10px', borderRadius: 7,
                border: `1.5px ${id ? 'solid' : 'dashed'} ${right ? '#4ade80' : wrong ? '#f87171' : id ? '#94a3b8' : '#dbe4ef'}`,
                background: right ? '#f0fdf4' : wrong ? '#fef2f2' : '#fff',
                fontFamily: FLOW_MONO, fontSize: 11.5, fontWeight: 700, color: id ? '#1e293b' : '#c1c8d4',
              }}>
                {id
                  ? (tagStyle ? <FuncsSubgoalTag subgoal={items[id]} active /> : id)
                  : <span style={{ fontSize: 11.5, fontStyle: 'italic', color: '#c1c8d4', fontFamily: FLOW_FONT }}>{question.placeholder || 'tap an option below'}</span>}
                {id && !revealed && (
                  <button type="button" onClick={() => onChange(picked.filter(x => x !== id))} style={{ marginLeft: 'auto', border: 'none', background: 'none', color: '#94a3b8', fontSize: 13, cursor: 'pointer', lineHeight: 1 }}>×</button>
                )}
                {wrong && items[question.correct[slot]]?.why && (
                  <span style={{ marginLeft: 'auto', fontFamily: FLOW_FONT, fontSize: 11, fontWeight: 400, color: '#b91c1c', lineHeight: 1.3 }}>{items[question.correct[slot]].why}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'grid', gap: 7 }}>
        {question.bankLabel && <div style={FLOW_LABEL}>{question.bankLabel}</div>}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {bank.map(id => {
            const used = picked.includes(id);
            if (tagStyle) {
              return (
                <button key={id} type="button" disabled={used || revealed || full} onClick={() => place(id)} style={{
                  border: `1.5px solid ${used ? '#e2e8f0' : '#cbd5e1'}`, borderRadius: 7, background: used ? '#f8fafc' : '#fff',
                  padding: '6px 9px', cursor: used || revealed || full ? 'default' : 'pointer', opacity: used ? 0.45 : 1,
                }}><FuncsSubgoalTag subgoal={items[id]} /></button>
              );
            }
            return <FlowTapChip key={id} value={id} selected={used} onClick={() => (used ? onChange(picked.filter(x => x !== id)) : place(id))} />;
          })}
        </div>
      </div>
    </div>
  );
}

function FlowRowQuestion({ question, value, onChange }) {
  const row = value || {};
  const columns = question.columns || ['call', ...question.cells.map(cell => cell.col)];
  const focusCol = question.cells.find(cell => row[cell.col] == null)?.col || question.cells[0].col;
  const template = `120px repeat(${question.cells.length}, minmax(0, 1fr))`;

  return (
    <div style={{ display: 'grid', gap: 9 }}>
      <div style={{ border: '1px solid #e2e8f0', borderRadius: 7, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: template, gap: 8, padding: '5px 10px', background: '#fbfcfe', borderBottom: '1px solid #e2e8f0' }}>
          {columns.map(col => <span key={col} style={{ fontFamily: FLOW_MONO, fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>{col}</span>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: template, gap: 8, padding: '6px 10px', alignItems: 'center' }}>
          <span style={{ fontFamily: FLOW_MONO, fontSize: 11, color: '#475569' }}>{question.rowLabel}</span>
          {question.cells.map(cell => (
            <span key={cell.col} style={{
              minHeight: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4, fontFamily: FLOW_MONO, fontSize: 11,
              fontWeight: 700, color: row[cell.col] ? '#1e293b' : '#c1c8d4',
              border: `1.5px ${row[cell.col] ? 'solid' : 'dashed'} ${row[cell.col] ? '#94a3b8' : focusCol === cell.col ? '#2563eb' : '#cbd5e1'}`,
              background: !row[cell.col] && focusCol === cell.col ? '#eff6ff' : '#fff',
            }}>{row[cell.col] || '?'}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gap: 6 }}>
        <span style={{ fontSize: 12, color: '#475569' }}>Fill <code style={{ fontFamily: FLOW_MONO, fontWeight: 800, color: '#2563eb' }}>{focusCol}</code>:</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {question.cells.find(cell => cell.col === focusCol).chips.map(chip => (
            <FlowTapChip key={chip} value={chip} onClick={() => onChange({ ...row, [focusCol]: chip })} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* One component renders every assessment type in the flow. */
function FlowQuestion({ question, value, onChange, revealed = false }) {
  const kind = flowQuestionKind(question);
  if (kind === 'order') return <FlowOrderQuestion question={question} value={value} onChange={onChange} revealed={revealed} />;
  if (kind === 'row') return <FlowRowQuestion question={question} value={value} onChange={onChange} />;
  if (kind === 'chips') {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {question.chips.map(chip => <FlowTapChip key={chip} value={chip} selected={value === chip} onClick={() => onChange(chip)} />)}
      </div>
    );
  }
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      {question.choices.map((text, i) => (
        <FlowChoiceBtn key={text} text={text} mono={question.mono} chosen={value === i} isCorrect={i === question.correct} revealed={revealed} onClick={() => onChange(i)} />
      ))}
    </div>
  );
}

Object.assign(window, {
  FLOW_FONT, FLOW_MONO, FLOW_LABEL, FLOW_ORDINALS, FLOW_QUESTION_KINDS, FLOW_RESPONSIVE_STYLES,
  FUNCS_FLOW_LESSON_KIT_DOC_BREADCRUMBS,
  flowQuestionKind, flowQuestionDone, flowQuestionRight, flowQuestionScore, flowQuestionSlots, flowQuestionSummary,
  FlowShell, FlowFooter, FlowStageFrame, FlowTapChip, FlowChoiceBtn, FlowExplain, FlowTypeTag, FlowPaneLabel,
  FlowOrderQuestion, FlowRowQuestion, FlowQuestion,
});
