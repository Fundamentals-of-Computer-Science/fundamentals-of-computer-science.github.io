/* tb-annotated.jsx — Self-teaching code views with integrated definitions & translations
   Three variations: Inline Annotations, Parallel Translation, Guided Flashcard */

const { useState, useRef, useEffect, useCallback } = React;

/* ═══════════════════════════════════════════
   DATA — definitions, tokens, translations
   ═══════════════════════════════════════════ */

const ANN_DEFS = {
  'int':       { cat: 'type',     name: 'int (Integer)',        desc: 'A 32-bit whole number. Value type — stored directly on the stack.' },
  'string':    { cat: 'type',     name: 'string',               desc: 'A sequence of characters. Reference type — variable holds a heap address.' },
  'int[]':     { cat: 'type',     name: 'int[] (Array)',        desc: 'An ordered collection of integers. Reference type — allocated on the heap.' },
  'Console':   { cat: 'class',    name: 'Console',              desc: 'Built-in .NET class for terminal input/output.' },
  'WriteLine': { cat: 'method',   name: '.WriteLine()',         desc: 'Prints a value to the console followed by a newline.' },
  '=':         { cat: 'operator', name: 'Assignment (=)',       desc: 'Evaluate the right side, store the result in the left variable.' },
  '+':         { cat: 'operator', name: 'Addition (+)',         desc: 'Adds two numbers together.' },
  'a':         { cat: 'variable', name: 'Variable a',          desc: 'Local integer holding the value 10 on the stack.' },
  'b':         { cat: 'variable', name: 'Variable b',          desc: 'Local integer holding 15 (result of a + 5) on the stack.' },
  'msg':       { cat: 'variable', name: 'Variable msg',        desc: 'Local string. Holds a memory address pointing to "Hi" on the heap.' },
  'arr':       { cat: 'variable', name: 'Variable arr',        desc: 'Local array. Holds a memory address pointing to {1, 2, 3} on the heap.' },
  '10':        { cat: 'literal',  name: 'Literal 10',          desc: 'The constant integer value ten.' },
  '5':         { cat: 'literal',  name: 'Literal 5',           desc: 'The constant integer value five.' },
  '"Hi"':      { cat: 'literal',  name: 'String "Hi"',         desc: 'Text data — allocated on the heap when this line runs.' },
  '{1, 2, 3}': { cat: 'literal',  name: 'Array {1, 2, 3}',    desc: 'Creates a 3-element integer array on the heap.' },
  '[1]':       { cat: 'operator', name: 'Index [1]',           desc: 'Access element at position 1 (second element — arrays are zero-indexed).' },
  '.':         { cat: 'punct',    name: 'Member Access (.)',    desc: 'Access a member (method or property) of the class on the left.' },
};

const ANN_CAT = {
  type:     { color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe', label: 'Type' },
  class:    { color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', label: 'Class' },
  method:   { color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc', label: 'Method' },
  variable: { color: '#0369a1', bg: '#f0f9ff', border: '#bae6fd', label: 'Variable' },
  operator: { color: '#b45309', bg: '#fffbeb', border: '#fde68a', label: 'Operator' },
  literal:  { color: '#059669', bg: '#f0fdf4', border: '#bbf7d0', label: 'Value' },
  punct:    { color: '#64748b', bg: '#f8fafc', border: '#e2e8f0', label: 'Syntax' },
};

const ANN_TOKENS = [
  [{t:'int',k:'int'},{t:' '},{t:'a',k:'a'},{t:' '},{t:'=',k:'='},{t:' '},{t:'10',k:'10'},{t:';'}],
  [{t:'int',k:'int'},{t:' '},{t:'b',k:'b'},{t:' '},{t:'=',k:'='},{t:' '},{t:'a',k:'a'},{t:' '},{t:'+',k:'+'},{t:' '},{t:'5',k:'5'},{t:';'}],
  [{t:'string',k:'string'},{t:' '},{t:'msg',k:'msg'},{t:' '},{t:'=',k:'='},{t:' '},{t:'"Hi"',k:'"Hi"'},{t:';'}],
  [{t:'int[]',k:'int[]'},{t:' '},{t:'arr',k:'arr'},{t:' '},{t:'=',k:'='},{t:' '},{t:'{1, 2, 3}',k:'{1, 2, 3}'},{t:';'}],
  [{t:'arr',k:'arr'},{t:'[1]',k:'[1]'},{t:' '},{t:'=',k:'='},{t:' '},{t:'b',k:'b'},{t:';'}],
  [{t:'Console',k:'Console'},{t:'.',k:'.'},{t:'WriteLine',k:'WriteLine'},{t:'('},{t:'msg',k:'msg'},{t:')'},{t:';'}],
  [{t:'Console',k:'Console'},{t:'.',k:'.'},{t:'WriteLine',k:'WriteLine'},{t:'('},{t:'b',k:'b'},{t:')'},{t:';'}],
];

const ANN_TRANS = [
  'Create a new integer variable called "a" and store the value 10 directly on the stack.',
  'Create integer "b". Look up a (which is 10), add 5 → result is 15. Store 15 on the stack.',
  'Create string variable "msg". Allocate the text "Hi" on the heap; msg stores the memory address pointing to it.',
  'Create array "arr" with values {1, 2, 3}. The array data goes on the heap; arr stores the reference address.',
  'Set element at index 1 of arr to the value of b (15). The heap array changes from {1, 2, 3} to {1, 15, 3}.',
  'Print msg: follow the reference to the heap → find "Hi" → write it to the console output.',
  'Print b: read the value 15 directly from the stack → write it to the console output.',
];

const ANN_EXPR = {
  'a + 5': 'Look up a (10), add 5. Result: 15.',
  'arr[1]': 'Second element of array arr (zero-indexed).',
  'arr[1] = b': "Set arr's second element to b's value (15).",
  'Console.WriteLine': 'Method that prints a value to the console.',
  'Console.WriteLine(msg)': 'Print the string msg references ("Hi").',
  'Console.WriteLine(b)': 'Print the value of b (15).',
  'int a': 'Declare an integer variable named a.',
  'int b': 'Declare an integer variable named b.',
  'string msg': 'Declare a string variable named msg.',
  'int[] arr': 'Declare an integer array variable named arr.',
};

const ANN_MONO = "'JetBrains Mono', monospace";
const ANN_SANS = "'Source Sans 3', sans-serif";


/* ═══════════════════════════════════════════
   SHARED — reusable token rendering
   ═══════════════════════════════════════════ */

function AnnToken({ tok, isActive, onEnter, onLeave, fontSize = 14 }) {
  if (!tok.k) return <span>{tok.t}</span>;
  const def = ANN_DEFS[tok.k];
  const cat = def ? ANN_CAT[def.cat] : null;
  if (!cat) return <span>{tok.t}</span>;

  return (
    <span
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        color: cat.color,
        fontWeight: def.cat === 'type' || def.cat === 'class' ? 500 : 400,
        borderBottom: `2px dashed ${isActive ? cat.color : cat.border}`,
        cursor: 'help',
        paddingBottom: 1,
        background: isActive ? cat.bg : 'transparent',
        borderRadius: isActive ? 2 : 0,
        transition: 'background 0.12s, border-color 0.12s',
        fontSize,
      }}
    >{tok.t}</span>
  );
}

function AnnDefBar({ defKey, style }) {
  if (!defKey || !ANN_DEFS[defKey]) {
    return (
      <div style={{
        padding: '8px 20px', minHeight: 44, display: 'flex', alignItems: 'center',
        borderTop: '1px solid #e2e6ee', background: '#fafbfc', ...style,
      }}>
        <span style={{ fontSize: 12, color: '#94a3b8', fontStyle: 'italic', fontFamily: ANN_SANS }}>
          Hover any underlined token to see its definition
        </span>
      </div>
    );
  }
  const d = ANN_DEFS[defKey];
  const c = ANN_CAT[d.cat];
  return (
    <div style={{
      padding: '8px 20px', minHeight: 44, display: 'flex', alignItems: 'center',
      gap: 10, borderTop: '1px solid #e2e6ee', background: '#fafbfc',
      fontFamily: ANN_SANS, ...style,
    }}>
      <span style={{
        fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.08em', color: c.color,
        background: c.bg, border: `1px solid ${c.border}`,
        padding: '2px 8px', borderRadius: 3, whiteSpace: 'nowrap',
      }}>{c.label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#1e293b' }}>{d.name}</span>
      <span style={{ fontSize: 12.5, color: '#475569' }}>— {d.desc}</span>
    </div>
  );
}

function AnnCatLegend() {
  return (
    <div style={{
      borderTop: '1px solid #f1f3f7', padding: '5px 20px',
      display: 'flex', gap: 16, fontFamily: ANN_SANS,
    }}>
      {Object.entries(ANN_CAT).filter(([k]) => k !== 'punct').map(([k, v]) => (
        <span key={k} style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontSize: 10, color: '#94a3b8',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: 2,
            background: v.border, border: `1px solid ${v.color}33`,
          }} />
          {v.label}
        </span>
      ))}
    </div>
  );
}


/* ═══════════════════════════════════════════
   VERSION A — Inline Annotations
   Hover tokens → definition bar updates
   Click line numbers → translation expands inline
   Select text → expression translation appears
   ═══════════════════════════════════════════ */

function AnnotatedInline() {
  const [activeDef, setActiveDef] = useState(null);
  const [expandedLines, setExpandedLines] = useState(new Set([0]));
  const [selExpr, setSelExpr] = useState(null);

  const toggleLine = (i) => {
    setExpandedLines(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  // Selection detection for expression translations
  const onMouseUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) { setSelExpr(null); return; }
    const text = sel.toString().trim().replace(/;$/, '').replace(/\s+/g, ' ');
    if (ANN_EXPR[text]) {
      setSelExpr({ text, translation: ANN_EXPR[text] });
    } else {
      setSelExpr(null);
    }
  }, []);

  useEffect(() => {
    const onDown = () => setSelExpr(null);
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: ANN_SANS, background: '#fff', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 20px', borderBottom: '1px solid #e2e6ee',
        display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
        background: '#fafbfc',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#3b82f6',
          background: '#dbeafe', padding: '2px 8px', borderRadius: 3,
        }}>Code Reference</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>
          Variables &amp; Memory
        </span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: '#94a3b8' }}>
          Hover tokens · Click line numbers · Select expressions
        </span>
      </div>

      {/* Code area */}
      <div style={{
        flex: 1, overflow: 'auto', padding: '10px 0',
        fontFamily: ANN_MONO, fontSize: 14, lineHeight: '34px',
      }} onMouseUp={onMouseUp}>
        {ANN_TOKENS.map((line, li) => {
          const isExpanded = expandedLines.has(li);
          return (
            <React.Fragment key={li}>
              <div
                onClick={() => toggleLine(li)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleLine(li);
                  }
                }}
                style={{
                display: 'flex', alignItems: 'center', padding: '0 20px',
                background: isExpanded ? '#fafbff' : 'transparent',
                transition: 'background 0.15s',
                cursor: 'pointer',
              }}>
                {/* Line number — clickable */}
                <span
                  style={{
                    width: 28, textAlign: 'right', marginRight: 18,
                    color: isExpanded ? '#3b82f6' : '#c1c8d4',
                    fontSize: 12, fontWeight: isExpanded ? 700 : 400,
                    cursor: 'pointer', userSelect: 'none',
                    transition: 'color 0.15s',
                    position: 'relative',
                  }}
                  title="Click for English translation"
                >
                  {li + 1}
                  {/* Expand indicator */}
                  <span style={{
                    position: 'absolute', right: -10, top: '50%',
                    transform: `translateY(-50%) rotate(${isExpanded ? 90 : 0}deg)`,
                    fontSize: 8, color: isExpanded ? '#3b82f6' : '#d1d5db',
                    transition: 'transform 0.2s, color 0.15s',
                  }}>▶</span>
                </span>

                {/* Tokens */}
                <span style={{ display: 'inline' }}>
                  {line.map((tok, ti) => (
                    <AnnToken key={ti} tok={tok}
                      isActive={activeDef === tok.k}
                      onEnter={() => tok.k && setActiveDef(tok.k)}
                      onLeave={() => setActiveDef(null)} />
                  ))}
                </span>
              </div>

              {/* Expanded translation */}
              {isExpanded && (
                <div style={{
                  margin: '2px 20px 8px 66px',
                  padding: '8px 14px',
                  background: '#eff6ff',
                  borderLeft: '3px solid #3b82f6',
                  borderRadius: '0 6px 6px 0',
                  fontSize: 12.5, fontFamily: ANN_SANS,
                  lineHeight: 1.55, color: '#1e40af',
                }}>
                  {ANN_TRANS[li]}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Selection expression bar */}
      {selExpr && (
        <div style={{
          padding: '7px 20px', borderTop: '1px solid #fde68a',
          background: '#fffbeb', fontSize: 12.5, flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: 10,
          fontFamily: ANN_SANS,
        }}>
          <span style={{
            fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.08em', color: '#92400e',
            background: '#fef3c7', padding: '2px 8px', borderRadius: 3,
          }}>Selection</span>
          <code style={{
            fontFamily: ANN_MONO, fontSize: 12, fontWeight: 600,
            color: '#92400e',
          }}>{selExpr.text}</code>
          <span style={{ color: '#92400e' }}>→ {selExpr.translation}</span>
        </div>
      )}

      {/* Definition bar */}
      <AnnDefBar defKey={activeDef} style={{ flexShrink: 0 }} />

      {/* Legend */}
      <AnnCatLegend />
    </div>
  );
}


/* ═══════════════════════════════════════════
   VERSION B — Parallel Translation (Rosetta)
   Code left, English right, aligned line-by-line
   Hover line → both sides highlight
   Hover token → definition in bottom bar
   ═══════════════════════════════════════════ */

function AnnotatedRosetta() {
  const [activeLine, setActiveLine] = useState(null);
  const [activeDef, setActiveDef] = useState(null);

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: ANN_SANS, background: '#fff', overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 20px', borderBottom: '1px solid #e2e6ee',
        display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
        background: '#fafbfc',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#059669',
          background: '#d1fae5', padding: '2px 8px', borderRadius: 3,
        }}>Parallel View</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>
          Variables &amp; Memory
        </span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11, color: '#94a3b8' }}>
          Hover lines to highlight · Hover tokens for definitions
        </span>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'flex', borderBottom: '1.5px solid #e2e6ee', flexShrink: 0,
      }}>
        <div style={{
          width: '52%', padding: '6px 20px', fontSize: 9.5, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8',
          borderRight: '1px solid #e2e6ee',
        }}>C# Code</div>
        <div style={{
          flex: 1, padding: '6px 16px', fontSize: 9.5, fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8',
        }}>Plain English</div>
      </div>

      {/* Parallel rows */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {ANN_TOKENS.map((line, li) => {
          const isActive = activeLine === li;
          return (
            <div key={li}
              onMouseEnter={() => setActiveLine(li)}
              onMouseLeave={() => setActiveLine(null)}
              style={{
                display: 'flex',
                borderBottom: '1px solid #f1f3f7',
                background: isActive ? '#f8faff' : '#fff',
                transition: 'background 0.12s',
              }}>
              {/* Code column */}
              <div style={{
                width: '52%', padding: '11px 14px 11px 20px',
                fontFamily: ANN_MONO, fontSize: 13, lineHeight: 1.6,
                borderRight: '1px solid #e2e6ee',
                borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                display: 'flex', alignItems: 'flex-start',
                transition: 'border-color 0.12s',
              }}>
                <span style={{
                  width: 20, textAlign: 'right', marginRight: 14,
                  color: isActive ? '#3b82f6' : '#c1c8d4',
                  fontSize: 11, fontWeight: isActive ? 700 : 400,
                  userSelect: 'none', lineHeight: '21px', flexShrink: 0,
                }}>{li + 1}</span>
                <span style={{ display: 'inline' }}>
                  {line.map((tok, ti) => (
                    <AnnToken key={ti} tok={tok} fontSize={13}
                      isActive={activeDef === tok.k}
                      onEnter={() => tok.k && setActiveDef(tok.k)}
                      onLeave={() => setActiveDef(null)} />
                  ))}
                </span>
              </div>

              {/* Translation column */}
              <div style={{
                flex: 1, padding: '11px 16px',
                fontSize: 12.5, lineHeight: 1.55,
                color: isActive ? '#1e293b' : '#64748b',
                fontWeight: isActive ? 500 : 400,
                transition: 'color 0.12s',
                display: 'flex', alignItems: 'flex-start',
                borderLeft: isActive ? '3px solid #059669' : '3px solid transparent',
              }}>
                {ANN_TRANS[li]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Definition bar */}
      <AnnDefBar defKey={activeDef} style={{ flexShrink: 0 }} />

      {/* Legend */}
      <AnnCatLegend />
    </div>
  );
}


/* ═══════════════════════════════════════════
   VERSION C — Guided Flashcard
   One line at a time, large code, token cards
   Step through with prev/next
   ═══════════════════════════════════════════ */

function AnnotatedGuided() {
  const [lineIdx, setLineIdx] = useState(0);
  const total = ANN_TOKENS.length;

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setLineIdx(i => Math.min(total - 1, i + 1));
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setLineIdx(i => Math.max(0, i - 1));
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [total]);

  const line = ANN_TOKENS[lineIdx];
  // Unique meaningful tokens for this line (no punctuation, no duplicates)
  const tokenCards = line.filter(t => t.k && ANN_DEFS[t.k] && ANN_DEFS[t.k].cat !== 'punct')
    .reduce((acc, t) => {
      if (!acc.find(d => d.k === t.k)) acc.push(t);
      return acc;
    }, []);

  const btnBase = {
    fontFamily: ANN_SANS, fontSize: 12, fontWeight: 600,
    padding: '5px 14px', border: '1px solid #d1d5db', borderRadius: 5,
    background: '#fff', color: '#475569', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 4,
    transition: 'background 0.12s, border-color 0.12s',
  };

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      fontFamily: ANN_SANS, background: '#f8f9fb', overflow: 'hidden',
    }}>
      {/* Header with nav */}
      <div style={{
        padding: '10px 20px', borderBottom: '1px solid #e2e6ee',
        display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
        background: '#fff',
      }}>
        <span style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#7c3aed',
          background: '#ede9fe', padding: '2px 8px', borderRadius: 3,
        }}>Guided</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#1e293b' }}>
          Variables &amp; Memory
        </span>
        <div style={{ flex: 1 }} />
        <span style={{
          fontSize: 12, color: '#94a3b8', fontVariantNumeric: 'tabular-nums',
          fontFamily: ANN_MONO, fontWeight: 500,
        }}>Line {lineIdx + 1} / {total}</span>
        <button onClick={() => setLineIdx(Math.max(0, lineIdx - 1))}
          disabled={lineIdx === 0}
          style={{ ...btnBase, opacity: lineIdx === 0 ? 0.35 : 1 }}>
          ‹ Prev
        </button>
        <button onClick={() => setLineIdx(Math.min(total - 1, lineIdx + 1))}
          disabled={lineIdx === total - 1}
          style={{
            ...btnBase, opacity: lineIdx === total - 1 ? 0.35 : 1,
            background: '#3b82f6', color: '#fff', border: 'none',
          }}>
          Next ›
        </button>
      </div>

      {/* Progress bar */}
      <div style={{
        padding: '6px 20px', borderBottom: '1px solid #e2e6ee',
        background: '#fff', display: 'flex', gap: 3, flexShrink: 0,
      }}>
        {ANN_TOKENS.map((_, i) => (
          <div key={i} onClick={() => setLineIdx(i)} style={{
            flex: 1, height: 5, cursor: 'pointer', borderRadius: 2,
            background: i === lineIdx ? '#3b82f6' : i < lineIdx ? '#1e293b' : '#e2e6ee',
            transition: 'background 0.2s',
          }} />
        ))}
      </div>

      {/* Main content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        padding: '16px 24px', gap: 14, overflow: 'auto',
      }}>
        {/* Large code line */}
        <div style={{
          background: '#fff', borderRadius: 10, padding: '18px 24px',
          border: '1px solid #e2e6ee',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          display: 'flex', alignItems: 'center', flexShrink: 0,
        }}>
          <span style={{
            fontFamily: ANN_MONO, color: '#c1c8d4', fontSize: 14,
            marginRight: 18, fontWeight: 500, userSelect: 'none',
          }}>{lineIdx + 1}</span>
          <span style={{ fontFamily: ANN_MONO, fontSize: 20, lineHeight: 1.4 }}>
            {line.map((tok, ti) => {
              if (!tok.k) return <span key={ti} style={{ color: '#64748b' }}>{tok.t}</span>;
              const def = ANN_DEFS[tok.k];
              const cat = def ? ANN_CAT[def.cat] : null;
              return (
                <span key={ti} style={{
                  color: cat ? cat.color : '#1e293b',
                  fontWeight: def?.cat === 'type' || def?.cat === 'class' ? 600 : 400,
                }}>{tok.t}</span>
              );
            })}
          </span>
        </div>

        {/* Translation */}
        <div style={{
          background: '#eff6ff', borderRadius: 10, padding: '14px 20px',
          border: '1px solid #bfdbfe', flexShrink: 0,
        }}>
          <div style={{
            fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: '#3b82f6', marginBottom: 5,
          }}>What this line does</div>
          <div style={{ fontSize: 14, lineHeight: 1.6, color: '#1e40af' }}>
            {ANN_TRANS[lineIdx]}
          </div>
        </div>

        {/* Token breakdown */}
        <div>
          <div style={{
            fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: '#94a3b8', marginBottom: 8,
          }}>Token Breakdown</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tokenCards.map((tok, i) => {
              const def = ANN_DEFS[tok.k];
              const cat = ANN_CAT[def.cat];
              return (
                <div key={tok.k} style={{
                  background: '#fff', borderRadius: 8, padding: '10px 14px',
                  border: `1.5px solid ${cat.border}`,
                  flex: '1 1 130px', minWidth: 110, maxWidth: 220,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    marginBottom: 5,
                  }}>
                    <code style={{
                      fontFamily: ANN_MONO, fontSize: 15, fontWeight: 600,
                      color: cat.color,
                    }}>{tok.t}</code>
                    <span style={{
                      fontSize: 8, fontWeight: 700, textTransform: 'uppercase',
                      letterSpacing: '0.06em', color: cat.color,
                      background: cat.bg, padding: '1px 6px', borderRadius: 3,
                      border: `1px solid ${cat.border}`,
                    }}>{cat.label}</span>
                  </div>
                  <div style={{
                    fontSize: 11.5, lineHeight: 1.45, color: '#475569',
                  }}>{def.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mini code overview at bottom */}
      <div style={{
        borderTop: '1px solid #e2e6ee', padding: '8px 20px',
        background: '#fff', flexShrink: 0,
        fontFamily: ANN_MONO, fontSize: 10.5, lineHeight: '18px',
      }}>
        {ANN_TOKENS.map((ln, li) => (
          <div key={li}
            onClick={() => setLineIdx(li)}
            style={{
              display: 'flex', cursor: 'pointer', padding: '1px 4px',
              borderRadius: 3,
              background: li === lineIdx ? '#f0f7ff' : 'transparent',
              opacity: li === lineIdx ? 1 : 0.4,
              transition: 'opacity 0.15s, background 0.15s',
            }}>
            <span style={{
              width: 16, textAlign: 'right', marginRight: 10,
              color: li === lineIdx ? '#3b82f6' : '#94a3b8',
              fontWeight: li === lineIdx ? 700 : 400,
            }}>{li + 1}</span>
            <span style={{ color: '#475569' }}>
              {ln.map(tok => tok.t).join('')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ═══ EXPORTS ═══ */

Object.assign(window, { AnnotatedInline, AnnotatedRosetta, AnnotatedGuided });
Object.assign(window, {
  ANN_DEFS, ANN_CAT, ANN_TOKENS, ANN_TRANS, ANN_EXPR,
  ANN_MONO, ANN_SANS, AnnToken, AnnDefBar, AnnCatLegend,
});
