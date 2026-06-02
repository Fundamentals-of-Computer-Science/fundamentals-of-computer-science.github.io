/* tb-pages.jsx — Textbook page layout variations */

const { useState } = React;
const { TB_STEPS, renderDesc, secLabelStyle } = window;
const { ApproachA } = window;

/* ═══ Shared Shell Components ═══ */

const NAV_H = 44;
const navStyle = {
  height: NAV_H, display: 'flex', alignItems: 'center', padding: '0 20px',
  borderBottom: '1px solid #e2e6ee', background: '#fff', flexShrink: 0,
  fontFamily: "'Source Sans 3', sans-serif", gap: 12,
};
const breadStyle = { fontSize: 11, color: '#94a3b8', fontWeight: 500 };
const breadSep = { fontSize: 10, color: '#d1d5db', margin: '0 2px' };
const chapStyle = { fontSize: 13, fontWeight: 700, color: '#1e293b' };
const navBtnStyle = {
  fontSize: 11, fontWeight: 600, padding: '4px 10px',
  border: '1px solid #e2e6ee', borderRadius: 4, background: '#fff',
  color: '#475569', cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif",
  display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap',
};

function BookNav({ section, onPrev, onNext }) {
  return (
    <div style={navStyle}>
      <span style={breadStyle}>Unit 2</span>
      <span style={breadSep}>›</span>
      <span style={breadStyle}>Chapter 4</span>
      <span style={breadSep}>›</span>
      <span style={chapStyle}>{section || 'Variables & Memory'}</span>
      <div style={{ flex: 1 }} />
      <button style={{ ...navBtnStyle, opacity: onPrev ? 1 : 0.35 }}
        disabled={!onPrev} onClick={onPrev}>‹ Prev</button>
      <button style={{ ...navBtnStyle, opacity: onNext ? 1 : 0.35 }}
        disabled={!onNext} onClick={onNext}>Next ›</button>
    </div>
  );
}

/* ═══ Prose Blocks ═══ */

const proseStyle = {
  fontFamily: "'Source Sans 3', sans-serif", fontSize: 13.5,
  lineHeight: 1.7, color: '#334155',
};
const h2Style = {
  fontFamily: "'Source Sans 3', sans-serif", fontSize: 18,
  fontWeight: 700, color: '#0f172a', marginBottom: 6, marginTop: 0,
};
const h3Style = {
  fontFamily: "'Source Sans 3', sans-serif", fontSize: 14.5,
  fontWeight: 700, color: '#1e293b', marginBottom: 4, marginTop: 0,
};
const codeInline = {
  fontFamily: "'JetBrains Mono', monospace", fontSize: '0.88em',
  background: '#f1f5f9', padding: '1px 5px', borderRadius: 3,
  border: '1px solid #e2e8f0',
};
const calloutStyle = {
  padding: '10px 14px', borderRadius: 6, fontSize: 12.5,
  lineHeight: 1.6, fontFamily: "'Source Sans 3', sans-serif",
};

function ProseIntro() {
  return (
    <div style={proseStyle}>
      <h2 style={h2Style}>Variables & Memory in C#</h2>
      <p style={{ marginBottom: 10 }}>
        Every variable in C# occupies space in memory. Where that space lives — and
        what the variable actually <em>stores</em> — depends on whether the type is
        a <strong>value type</strong> or a <strong>reference type</strong>.
      </p>
    </div>
  );
}

function ProseValueTypes() {
  return (
    <div style={proseStyle}>
      <h3 style={h3Style}>Value Types</h3>
      <p style={{ marginBottom: 8 }}>
        Types like <code style={codeInline}>int</code>,{' '}
        <code style={codeInline}>bool</code>, and{' '}
        <code style={codeInline}>double</code> are value types. The variable
        holds the data directly on the <strong>stack</strong>. Assignment copies
        the value — changing one variable doesn't affect another.
      </p>
    </div>
  );
}

function ProseRefTypes() {
  return (
    <div style={proseStyle}>
      <h3 style={h3Style}>Reference Types</h3>
      <p style={{ marginBottom: 8 }}>
        Types like <code style={codeInline}>string</code>,{' '}
        arrays, and classes are reference types. The variable stores a{' '}
        <strong>memory address</strong> (a reference) pointing to data on
        the <strong>heap</strong>. Two variables can point to the same object.
      </p>
    </div>
  );
}

function ProseWrapUp() {
  return (
    <div style={proseStyle}>
      <p style={{ marginBottom: 8 }}>
        Understanding this distinction is essential — it affects how assignment,
        comparison, and parameter passing work. Walk through the example above
        to see each concept in action.
      </p>
      <div style={{
        ...calloutStyle, background: '#f0fdf4', border: '1px solid #bbf7d0',
        color: '#166534', display: 'flex', alignItems: 'flex-start', gap: 8,
      }}>
        <span style={{ fontWeight: 700, fontSize: 14, lineHeight: 1 }}>✓</span>
        <span>
          <strong>Key takeaway:</strong> Value types store data directly on the stack.
          Reference types store a heap address — the data itself lives elsewhere in memory.
        </span>
      </div>
    </div>
  );
}

function TryItLabel() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6,
    }}>
      <span style={{
        fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.08em', color: '#3b82f6',
        fontFamily: "'Source Sans 3', sans-serif",
        background: '#dbeafe', padding: '2px 8px', borderRadius: 3,
      }}>Interactive Example</span>
      <span style={{
        fontSize: 10.5, color: '#94a3b8', fontStyle: 'italic',
        fontFamily: "'Source Sans 3', sans-serif",
      }}>Step through code to see memory changes</span>
    </div>
  );
}

/* ═══ Layout A: Inline Embed ═══ */

function PageInlineEmbed() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#fff', overflow: 'hidden',
    }}>
      <BookNav section="Variables & Memory" onNext={() => {}} />
      <div style={{
        flex: 1, overflow: 'auto', padding: '20px 32px 24px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <ProseIntro />
        <ProseValueTypes />
        <ProseRefTypes />

        {/* Embedded interactive panel */}
        <TryItLabel />
        <div style={{
          border: '1.5px solid #dbeafe', borderRadius: 8,
          overflow: 'hidden', height: 460, flexShrink: 0,
          boxShadow: '0 2px 12px rgba(59,130,246,0.06)',
        }}>
          <ApproachA />
        </div>

        <ProseWrapUp />
      </div>
    </div>
  );
}

/* ═══ Layout B: Sticky Companion ═══ */

function PageStickyCompanion() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#fff', overflow: 'hidden',
    }}>
      <BookNav section="Variables & Memory" onNext={() => {}} />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* Prose column */}
        <div style={{
          width: '44%', overflow: 'auto', padding: '20px 24px',
          borderRight: '1px solid #e2e6ee',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          <ProseIntro />
          <ProseValueTypes />

          <div style={{
            ...calloutStyle, background: '#eff6ff', border: '1px solid #bfdbfe',
            color: '#1e40af',
          }}>
            <strong>→</strong> Step through the example on the right to see
            how <code style={codeInline}>int</code> values are stored
            directly on the stack, while <code style={codeInline}>string</code> and
            array values go on the heap.
          </div>

          <ProseRefTypes />
          <ProseWrapUp />
        </div>

        {/* Sticky panel */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          background: '#fafbfc',
        }}>
          <div style={{
            padding: '8px 14px', borderBottom: '1px solid #e2e6ee',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: '#3b82f6',
              fontFamily: "'Source Sans 3', sans-serif",
              background: '#dbeafe', padding: '2px 8px', borderRadius: 3,
            }}>Live Example</span>
          </div>
          <div style={{ flex: 1 }}>
            <ApproachA />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══ Layout C: Full Example Page ═══ */

function PageFullExample() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#fff', overflow: 'hidden',
    }}>
      <BookNav section="Example: Variables & Memory" onPrev={() => {}} onNext={() => {}} />

      {/* Context strip */}
      <div style={{
        padding: '8px 20px', borderBottom: '1px solid #e2e6ee',
        background: '#fafbfc', display: 'flex', alignItems: 'center', gap: 10,
        flexShrink: 0,
      }}>
        <span style={{
          fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#3b82f6',
          fontFamily: "'Source Sans 3', sans-serif",
          background: '#dbeafe', padding: '2px 8px', borderRadius: 3,
        }}>Walkthrough</span>
        <span style={{
          fontSize: 12, color: '#64748b', fontFamily: "'Source Sans 3', sans-serif",
        }}>
          Trace how C# allocates value types on the stack and reference types on the heap.
        </span>
        <div style={{ flex: 1 }} />
        <button style={{
          ...navBtnStyle, fontSize: 10, padding: '3px 8px', color: '#3b82f6',
          border: '1px solid #bfdbfe', background: '#f0f7ff',
        }}>← Back to reading</button>
      </div>

      {/* Full panel */}
      <div style={{ flex: 1 }}>
        <ApproachA />
      </div>
    </div>
  );
}

/* ═══ Layout D: Progressive Reveal ═══ */

function CollapsiblePanel({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1.5px solid ${open ? '#93c5fd' : '#e2e6ee'}`,
      borderRadius: 8, overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px', border: 'none', cursor: 'pointer',
        background: open ? '#eff6ff' : '#fafbfc',
        fontFamily: "'Source Sans 3', sans-serif",
        transition: 'background 0.2s',
      }}>
        <span style={{
          fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#3b82f6',
          background: '#dbeafe', padding: '2px 8px', borderRadius: 3,
        }}>Try It</span>
        <span style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>{label}</span>
        <div style={{ flex: 1 }} />
        <span style={{
          fontSize: 11, color: '#3b82f6', fontWeight: 600,
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s',
        }}>▾</span>
      </button>
      {open && (
        <div style={{ height: 460, borderTop: '1px solid #e2e6ee' }}>
          {children}
        </div>
      )}
    </div>
  );
}

function PageProgressiveReveal() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: '#fff', overflow: 'hidden',
    }}>
      <BookNav section="Variables & Memory" onNext={() => {}} />
      <div style={{
        flex: 1, overflow: 'auto', padding: '20px 32px 24px',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <ProseIntro />
        <ProseValueTypes />

        {/* Collapsible example after value types */}
        <CollapsiblePanel label="Step through value type allocation">
          <ApproachA />
        </CollapsiblePanel>

        <ProseRefTypes />

        {/* Another collapsible for reference types */}
        <CollapsiblePanel label="Step through reference types & heap">
          <ApproachA />
        </CollapsiblePanel>

        <ProseWrapUp />
      </div>
    </div>
  );
}

Object.assign(window, {
  PageInlineEmbed, PageStickyCompanion, PageFullExample, PageProgressiveReveal,
});
