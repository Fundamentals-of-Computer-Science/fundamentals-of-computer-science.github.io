/* concept-lesson-kit.jsx - repo-local beta lesson rendering kit */

const FUNCS_DEFAULT_LESSON_SECTIONS = [
  {
    id: 'full-example',
    blockType: 'fullExample',
    kicker: 'Example',
    title: 'Full Example',
    description: 'Preview storage, copying, rebinding, and output.',
    getStepCount: lesson => funcsBuildFullExampleSteps(lesson.fullExample).length,
  },
  {
    id: 'pre-quiz',
    blockType: 'preQuiz',
    kicker: 'Check',
    title: 'Pre-Quiz',
    description: 'Commit before explanation.',
  },
  {
    id: 'main-lesson',
    blockType: 'mainLesson',
    kicker: 'Lesson',
    title: 'Main Lesson',
    description: 'Concept acts.',
  },
  {
    id: 'rigorous-quiz',
    blockType: 'rigorousQuiz',
    kicker: 'Quiz',
    title: 'Rigorous Quiz',
    description: 'Trace, translate, predict, explain.',
  },
  {
    id: 'exercises',
    blockType: 'exercises',
    kicker: 'Practice',
    title: 'Exercises',
    description: 'Expandable programming prompts.',
  },
];

const FUNCS_QUIZ_BLOCK_TYPES = {
  chipDrop: {
    label: 'Chip/drop answer placement',
    status: 'supported',
    note: 'Current beta placeholder for prediction, state-table, translation, and output checks.',
  },
  stateTable: {
    label: 'State table',
    status: 'supported',
    note: 'Used inside the current rigorous quiz transfer check.',
  },
  lineTranslation: {
    label: 'Line translation matching',
    status: 'supported',
    note: 'Used inside the current rigorous quiz transfer check.',
  },
  outputPrediction: {
    label: 'Output prediction',
    status: 'supported',
    note: 'Used inside the current rigorous quiz transfer check.',
  },
  structuredFillCode: {
    label: 'Structured fill-in-code',
    status: 'supported',
    note: 'Named code blanks with deterministic slot checking and a reusable answer bank.',
  },
  freeResponse: {
    label: 'Free response',
    status: 'planned',
    note: 'Reserved for TASK-30 richer quiz question type work.',
  },
  codeWriting: {
    label: 'Code writing',
    status: 'supported-partial',
    note: 'Supported for structured blanks; full freeform program grading remains out of scope.',
  },
};

const FUNCS_EXERCISE_BLOCK_TYPES = {
  expandablePromptGrid: {
    label: 'Expandable prompt grid',
    status: 'supported',
    note: 'Current beta exercise pattern for named programming prompts.',
  },
};

// Visualizer grammar: pick the tool by the student's question, not by chapter.
// Core tools:
// - reduction: "what value does this term become?" Use evalDetail.
// - controlFlow: "which source row runs next?" Use loopTrace/source-row stepping.
// - memory: "what state exists now, and where does it live?" Use stack/heap views.
// Overlays such as source annotations, console output, hover links, quiz blanks,
// and compact/full layouts modify a core tool; they are not separate visualizers.
const FUNCS_VISUALIZER_GRAMMAR = {
  reduction: {
    purpose: 'evaluateTerm',
    question: 'What value does this term become?',
    primaryData: 'evalDetail',
    component: 'FuncsStackedEvaluationDetail',
    useWhen: 'A term, expression, operator, lookup, call, recursive call, or condition must be evaluated to a value.',
    rules: [
      'Start with the full expression.',
      'Draw an evaluation bar above the term being evaluated.',
      'If the result is an expression that is not a value, push another evaluation frame or vertical-stack level.',
      'If the result is a value, pop with strike + arrow substitution.',
      'Do not use strike + arrow substitution for returned expressions that still need evaluation.',
    ],
  },
  controlFlow: {
    purpose: 'chooseNextLine',
    question: 'Which source row runs next?',
    primaryData: 'loopTrace',
    component: 'FuncsLoopStepperDetail',
    useWhen: 'The lesson is about execution order, repeated control flow, branch choice, or loop phases.',
    rules: [
      'Highlight the main source rows instead of duplicating the program in a side panel.',
      'Model phases such as check condition, execute body, update progress, and check condition again.',
      'Open reduction/evalDetail only when the value of a condition or expression is the focus.',
    ],
  },
  memory: {
    purpose: 'showBindings',
    question: 'What state exists now, and where does it live?',
    primaryData: 'memory or stack/heap',
    component: 'FuncsMemoryStatePanel',
    useWhen: 'The lesson is about local state, references, heap objects, arrays, object fields, node chains, or call frames.',
    rules: [
      'Show memory after a source or evaluation step has completed.',
      'Do not use memory views as a substitute for expression reduction.',
      'Treat arrays, object fields, linked nodes, and call frames as memory shapes, not new visualizer categories.',
      'Use call-frame memory views only when frames themselves are the concept being taught.',
    ],
  },
  overlays: {
    sourceAnnotation: {
      purpose: 'labelSyntax',
      primaryData: 'code.lines badges, scope, tokens, and definitions',
      component: 'FuncsCodeBlock',
      rules: [
        'Author labels in fixture data, not chapter-specific renderers.',
        'Use annotations to classify syntax; use controlFlow, reduction, or memory when the student must step behavior.',
      ],
    },
  },
};

// Evaluation authoring rule: only substitute values. If evaluating a term
// returns another expression, add another evaluation frame and keep evaluating
// that expression. Use strike + arrow substitution only after the term has
// become a value.
const FUNCS_EVALUATION_AUTHORING_RULES = {
  expressionReturnsKeepEvaluating: 'If evaluating a term returns an expression that is not also a value, add another evaluation frame for that expression instead of substituting it into the caller.',
  substituteOnlyValues: 'Use strike + arrow substitution only when the evaluated term has become a value.',
};

const FUNCS_EVALUATION_STEP_INTERACTION = {
  field: 'evalDetail',
  grammarKind: 'reduction',
  visualizerGrammar: FUNCS_VISUALIZER_GRAMMAR.reduction,
  component: 'FuncsStackedEvaluationDetail',
  authoringRules: FUNCS_EVALUATION_AUTHORING_RULES,
  triggerLabel: 'Show evaluation steps',
  returnLabel: 'Show memory state',
  panelRole: 'stacked step-through evaluation detail',
  sequenceField: 'steps',
  frameField: 'frames',
  blockField: 'blocks',
  note: 'On steps that include expression evaluation, use evalDetail.steps as the ordered control sequence and evalDetail.frames as the stacked lookup/substitution visual sequence. For recursive or nested evaluation, layout "verticalStack" with evalDetail.blocks may be used to stack returned expressions upward in one block. Returned expressions keep evaluating in new frames/levels; only returned values are substituted with strike + arrow.',
  requiredDetailFields: ['title', 'sourceLine', 'steps'],
  stepShape: {
    label: 'short control label',
    note: 'student-facing explanation for this evaluation step',
  },
  frameShape: {
    expression: 'expression text shown in the stack',
    showAt: '0-based step index when this expression appears',
    stack: 'optional lookup/operator annotations with span, label, value, showAt',
    strike: 'optional span struck when this expression is replaced',
    arrowAfter: 'optional substitution arrow after this expression',
  },
  blockShape: {
    stackSlots: 'optional evalDetail-level bottom-to-top reduction skeleton used by every block to preserve the same stack shape and inherited evaluation bars across substitutions',
    levels: 'for layout "verticalStack", bottom-to-top expressions in one evaluation block',
    slot: 'optional level index into stackSlots or block.slots; replacement expressions stay anchored to that original stack level instead of reflowing; unchanged slot expressions inherit the slot evaluation bar unless inheritSlotLine is false',
    evalSpan: 'optional span on a level that draws the evaluation bar leading to the next visible level',
    strike: 'optional span struck when a value is substituted out of this block',
    arrowAfter: 'optional substitution arrow after this block, shown only when a value is ready',
  },
};

const FUNCS_LOOP_STEPPER_INTERACTION = {
  field: 'loopTrace',
  grammarKind: 'controlFlow',
  visualizerGrammar: FUNCS_VISUALIZER_GRAMMAR.controlFlow,
  component: 'FuncsLoopStepperDetail',
  triggerLabel: 'Show loop steps',
  returnLabel: 'Show memory state',
  panelRole: 'source-row loop stepper',
  sequenceField: 'steps',
  note: 'Use loopTrace.steps to model repeated control flow such as check condition, execute body, and check condition again without duplicating source rows.',
  requiredDetailFields: ['title', 'sourceLine', 'steps'],
  stepShape: {
    rowKey: 'source row id to highlight for this phase',
    phase: 'short phase label such as Check condition or Execute body',
    note: 'student-facing explanation for this loop phase',
    iteration: 'optional iteration label',
    outcome: 'optional condition outcome',
    memory: 'optional memory rows shown for this phase',
    console: 'optional console output shown for this phase',
  },
};

function funcsNormalizeCodeLines(code, translations = []) {
  if (Array.isArray(code)) {
    return code.map((text, index) => ({
      id: `line-${index + 1}`,
      text,
      translation: translations[index],
    }));
  }

  if (Array.isArray(code?.lines)) {
    return code.lines.map((line, index) => {
      if (typeof line === 'string') {
        return {
          id: `line-${index + 1}`,
          text: line,
          translation: translations[index],
        };
      }

      const id = line.id || `line-${index + 1}`;
      const rawScope = line.scope || line.scopedLines || line.children || line.bodyLines;
      let text = line.text;
      let scope = Array.isArray(rawScope) ? rawScope : [];
      let close = line.close || line.closeText;

      if (typeof text === 'string' && text.includes('\n') && !scope.length) {
        const parts = text.split('\n').map(part => part.trimEnd());
        text = parts[0];
        scope = parts.slice(1);
      }

      return {
        ...line,
        id,
        text,
        translation: line.translation ?? translations[index],
        scope: scope.map((scopeLine, scopeIndex) => {
          if (typeof scopeLine === 'string') {
            return {
              id: `${id}-scope-${scopeIndex + 1}`,
              text: scopeLine,
            };
          }

          return {
            ...scopeLine,
            id: scopeLine.id || `${id}-scope-${scopeIndex + 1}`,
            text: scopeLine.text,
          };
        }),
        close: close ? (typeof close === 'string' ? { id: `${id}-close`, text: close } : {
          ...close,
          id: close.id || `${id}-close`,
          text: close.text,
        }) : null,
      };
    });
  }

  return [];
}

function funcsNormalizeTokenSpec(code, tokens = {}, definitions = {}) {
  const source = code?.tokens || tokens || {};
  const normalized = {};

  Object.entries(source).forEach(([token, value]) => {
    if (typeof value === 'string') {
      normalized[token] = {
        tone: value,
        description: definitions[token],
      };
      return;
    }

    normalized[token] = {
      tone: value?.tone,
      description: value?.description ?? definitions[token],
    };
  });

  return normalized;
}

function funcsCodeLineText(line) {
  return typeof line === 'string' ? line : line?.text;
}

function funcsCodeLineKey(line, index) {
  return line?.id || `line-${index + 1}`;
}

function funcsScopeLineKey(parentKey, scopeLine, index) {
  return scopeLine?.id || `${parentKey}-scope-${index + 1}`;
}

function funcsBuildFullExampleSteps(fullExample) {
  const states = Array.isArray(fullExample?.states) ? fullExample.states : [];
  const codeLines = funcsNormalizeCodeLines(fullExample?.code, fullExample?.translations);

  if (!codeLines.length) {
    return states.length ? states.map((state, index) => ({ id: `state-${index}`, state, stateIndex: index })) : [];
  }

  const rowByKey = new Map();
  codeLines.forEach((line, lineIndex) => {
    const lineKey = funcsCodeLineKey(line, lineIndex);
    rowByKey.set(lineKey, { row: line, lineIndex, rowKey: lineKey });
    (Array.isArray(line.scope) ? line.scope : []).forEach((scopeLine, scopeIndex) => {
      if (scopeLine?.scopeClose) return;
      const rowKey = funcsScopeLineKey(lineKey, scopeLine, scopeIndex);
      rowByKey.set(rowKey, { row: scopeLine, lineIndex, rowKey, parentKey: lineKey });
    });
  });

  const steps = [{
    id: 'before-execution',
    label: '0',
    sourceLabel: 'before execution',
    stateIndex: 0,
    lineIndex: null,
    rowKey: null,
  }];

  if (Array.isArray(fullExample?.executionTrace) && fullExample.executionTrace.length) {
    fullExample.executionTrace.forEach((traceStep, traceIndex) => {
      const rowKey = traceStep.rowKey || traceStep.lineId || traceStep.rowId;
      const mapped = rowByKey.get(rowKey) || {};
      const stateIndex = traceStep.stateIndex ?? Math.min(traceIndex + 1, Math.max(states.length - 1, 0));

      steps.push({
        id: traceStep.id || `trace-${traceIndex + 1}`,
        label: traceStep.label || `${traceIndex + 1}`,
        sourceLabel: traceStep.sourceLabel || traceStep.label || `step ${traceIndex + 1}`,
        stateIndex,
        lineIndex: mapped.lineIndex ?? null,
        parentKey: traceStep.parentKey || mapped.parentKey,
        rowKey: rowKey || null,
        row: mapped.row ? {
          ...mapped.row,
          state: traceStep.state || traceStep.rowState || mapped.row.state,
        } : (traceStep.state ? { state: traceStep.state } : null),
      });
    });

    return steps;
  }

  codeLines.forEach((line, lineIndex) => {
    const lineKey = funcsCodeLineKey(line, lineIndex);
    const stateIndex = Math.min(lineIndex + 1, Math.max(states.length - 1, 0));

    steps.push({
      id: lineKey,
      label: `${lineIndex + 1}`,
      sourceLabel: `line ${lineIndex + 1}`,
      stateIndex,
      lineIndex,
      rowKey: lineKey,
      row: line,
    });

    let childOrdinal = 0;
    (Array.isArray(line.scope) ? line.scope : []).forEach((scopeLine, scopeIndex) => {
      if (scopeLine?.scopeClose) return;
      childOrdinal += 1;
      const rowKey = funcsScopeLineKey(lineKey, scopeLine, scopeIndex);
      steps.push({
        id: rowKey,
        label: `${lineIndex + 1}.${childOrdinal}`,
        sourceLabel: `line ${lineIndex + 1}.${childOrdinal}`,
        stateIndex,
        lineIndex,
        parentKey: lineKey,
        rowKey,
        row: scopeLine,
      });
    });
  });

  return steps;
}

function funcsFullExampleStateForStep(fullExample, stepDef) {
  const states = Array.isArray(fullExample?.states) ? fullExample.states : [];
  const fallbackState = {
    label: 'Before execution',
    desc: '',
    memory: [],
    console: [],
  };
  const base = states[stepDef?.stateIndex ?? 0] || states[states.length - 1] || fallbackState;
  const rowState = stepDef?.row?.state;

  if (!rowState) {
    return {
      ...fallbackState,
      ...base,
      memory: base.memory || [],
      console: base.console || [],
    };
  }

  return {
    ...fallbackState,
    ...base,
    ...rowState,
    memory: rowState.memory || base.memory || [],
    console: rowState.console || base.console || [],
  };
}

function FuncsCodeLineSource({ text, tokenSpec, onDef }) {
  const { TBToken } = window;

  return (
    <span
      className="funcs-code-line-source"
      style={{
        minWidth: 0,
        flex: '1 1 auto',
        overflowX: 'auto',
        overflowY: 'hidden',
        whiteSpace: 'nowrap',
        scrollbarWidth: 'thin',
      }}
    >
      {funcsTokenPieces(text || '', tokenSpec).map((piece, idx) => piece.tone ? (
        <span
          key={`${piece.text}-${idx}`}
          title={tokenSpec[piece.token]?.description}
          onMouseEnter={() => onDef?.(piece.token)}
          onMouseLeave={() => onDef?.(null)}
        >
          <TBToken tone={piece.tone}>{piece.text}</TBToken>
        </span>
      ) : (
        <React.Fragment key={`${piece.text}-${idx}`}>{piece.text}</React.Fragment>
      ))}
    </span>
  );
}

function funcsTokenPieces(line, tokenSpec) {
  const tokens = Object.keys(tokenSpec || {}).sort((a, b) => b.length - a.length);
  const pieces = [];
  let i = 0;

  while (i < line.length) {
    const token = tokens.find((candidate) => line.startsWith(candidate, i));
    if (token) {
      pieces.push({ text: token, token, tone: tokenSpec[token]?.tone });
      i += token.length;
    } else {
      pieces.push({ text: line[i] });
      i += 1;
    }
  }

  return pieces;
}

function FuncsTokenizedLine({
  line,
  index,
  tokenSpec,
  active,
  run,
  activeKey = null,
  runKeys = null,
  expanded,
  onToggle,
  onDef,
  translation,
}) {
  const text = funcsCodeLineText(line);
  const lineKey = funcsCodeLineKey(line, index);
  const scopeLines = Array.isArray(line.scope) ? line.scope : [];
  const scopedRows = line.close ? [...scopeLines, { ...line.close, scopeClose: true }] : scopeLines;
  const hasScope = scopedRows.length > 0;
  const runKeySet = runKeys ? (runKeys instanceof Set ? runKeys : new Set(runKeys)) : null;
  const scopedKeys = scopedRows.map((row, scopeIndex) => funcsScopeLineKey(lineKey, row, scopeIndex));
  const childActive = activeKey ? scopedKeys.includes(activeKey) : false;
  const lineActive = active || activeKey === lineKey || childActive;
  const lineRun = run || Boolean(runKeySet && (runKeySet.has(lineKey) || scopedKeys.some(key => runKeySet.has(key))));
  const rowActive = lineActive || (hasScope && lineRun);
  const rowBackground = lineActive ? '#f8fbff' : lineRun ? '#fbfdff' : 'transparent';

  const renderTranslation = (rowTranslation, rowActive) => rowTranslation ? (
    <div style={{
      margin: '0 18px 9px 60px',
      padding: '8px 12px',
      background: rowActive ? '#eff6ff' : '#f8fafc',
      borderLeft: `3px solid ${rowActive ? '#2563eb' : '#cbd5e1'}`,
      borderRadius: '0 6px 6px 0',
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: 12.5,
      lineHeight: 1.45,
      color: rowActive ? '#1e40af' : '#475569',
    }}>
      {rowTranslation}
    </div>
  ) : null;

  const renderRow = ({
    row,
    label,
    key,
    child = false,
    close = false,
  }) => {
    const rowExpanded = expanded === key;
    const rowTranslation = row.translation;
    const toggle = onToggle ? () => onToggle(key) : null;
    const effectiveActive = activeKey ? activeKey === key : active;
    const effectiveRun = runKeySet ? runKeySet.has(key) : run;

    return (
      <React.Fragment key={key}>
        <div
          className={child ? 'funcs-code-scope-row' : 'funcs-code-top-row'}
          role={toggle ? 'button' : undefined}
          tabIndex={toggle ? 0 : undefined}
          aria-expanded={toggle ? rowExpanded : undefined}
          onClick={toggle}
          onKeyDown={toggle ? (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          } : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: child ? '4px 18px 4px 12px' : '6px 18px 6px 15px',
            cursor: toggle ? 'pointer' : 'default',
            outline: 'none',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13.5,
            lineHeight: '24px',
            opacity: close || effectiveRun || effectiveActive || !runKeySet ? 1 : 0.48,
            background: child
              ? close ? 'rgba(248, 250, 252, 0.86)' : effectiveActive ? 'rgba(191, 219, 254, 0.56)' : 'rgba(219, 234, 254, 0.30)'
              : 'transparent',
            borderTop: child && !close ? '1px solid rgba(191, 219, 254, 0.42)' : 'none',
          }}
        >
          <span style={{
            width: child ? 38 : 26,
            textAlign: child ? 'center' : 'right',
            marginRight: child ? 8 : 16,
            color: effectiveActive ? '#2563eb' : effectiveRun || lineRun ? '#64748b' : '#c1c8d4',
            fontSize: child ? 10.5 : 12,
            fontWeight: child && !close ? 800 : effectiveActive ? 700 : 400,
            position: 'relative',
            flexShrink: 0,
            border: child && !close ? `1px solid ${effectiveActive ? '#60a5fa' : '#bfdbfe'}` : 'none',
            background: child && !close ? effectiveActive ? '#dbeafe' : '#eff6ff' : 'transparent',
            borderRadius: child && !close ? 999 : 0,
            lineHeight: child && !close ? '18px' : 'normal',
            height: child && !close ? 20 : 'auto',
            display: child ? 'inline-flex' : 'inline-block',
            alignItems: child ? 'center' : undefined,
            justifyContent: child ? 'center' : undefined,
          }}>
            {label}
            {toggle && !close && (
              <span style={{
                position: 'absolute',
                right: -10,
                top: '50%',
                transform: `translateY(-50%) rotate(${rowExpanded ? 90 : 0}deg)`,
                fontSize: 8,
                color: rowExpanded || effectiveActive ? '#2563eb' : '#cbd5e1',
                transition: 'transform 0.2s',
              }}>▶</span>
            )}
          </span>
          {(row.badge || row.roleLabel || row.caseLabel || row.phaseLabel) && !close && (
            <span style={{
              alignSelf: 'center',
              marginRight: 8,
              border: `1px solid ${row.badgeBorder || (effectiveActive ? '#60a5fa' : '#cbd5e1')}`,
              borderRadius: 999,
              background: row.badgeBg || (effectiveActive ? '#dbeafe' : '#f8fafc'),
              color: row.badgeColor || (effectiveActive ? '#1d4ed8' : '#64748b'),
              padding: '1px 7px',
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: 9,
              lineHeight: '14px',
              fontWeight: 900,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              letterSpacing: '0.03em',
              flexShrink: 0,
            }}>
              {row.badge || row.roleLabel || row.caseLabel || row.phaseLabel}
            </span>
          )}
          {child && (
            <span aria-hidden="true" style={{
              width: 18,
              alignSelf: 'stretch',
              margin: '0 9px 0 0',
              borderLeft: `2px solid ${lineActive ? '#93c5fd' : '#dbeafe'}`,
              borderBottom: close ? '2px solid #dbeafe' : 'none',
              borderBottomLeftRadius: close ? 5 : 0,
              flexShrink: 0,
              position: 'relative',
            }}>
              {!close && (
                <span style={{
                  position: 'absolute',
                  left: -5,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: effectiveActive ? '#2563eb' : '#93c5fd',
                  boxShadow: '0 0 0 3px rgba(147, 197, 253, 0.20)',
                }} />
              )}
            </span>
          )}
          {child && !close && (
            <span aria-hidden="true" style={{
              color: effectiveActive ? '#2563eb' : '#93c5fd',
              fontSize: 9,
              marginRight: 8,
              flexShrink: 0,
              transform: 'translateY(-1px)',
            }}>▶</span>
          )}
          <FuncsCodeLineSource text={funcsCodeLineText(row)} tokenSpec={tokenSpec} onDef={onDef} />
        </div>
        {rowExpanded && renderTranslation(rowTranslation, effectiveActive)}
      </React.Fragment>
    );
  };

  return (
    <div style={{
      borderLeft: lineActive ? '3px solid #2563eb' : hasScope ? '3px solid #dbeafe' : '3px solid transparent',
      background: rowBackground,
      opacity: lineRun || lineActive ? 1 : 0.48,
    }}>
      {renderRow({ row: { ...line, text, translation }, label: index + 1, key: lineKey })}
      {hasScope && (
        <div style={{
          margin: '0 14px 6px 57px',
          borderRadius: 6,
          background: rowActive ? 'rgba(239, 246, 255, 0.74)' : 'rgba(248, 250, 252, 0.72)',
          boxShadow: `inset 0 0 0 1px ${lineActive ? 'rgba(96, 165, 250, 0.72)' : 'rgba(191, 219, 254, 0.56)'}`,
          overflow: 'hidden',
        }}>
          {scopedRows.map((scopeLine, scopeIndex) => {
            const childStepIndex = scopedRows
              .slice(0, scopeIndex + 1)
              .filter(row => !row.scopeClose).length;
            return renderRow({
              row: scopeLine,
              label: scopeLine.scopeClose ? '' : `${index + 1}.${childStepIndex}`,
              key: funcsScopeLineKey(lineKey, scopeLine, scopeIndex),
              child: true,
              close: scopeLine.scopeClose,
            });
          })}
        </div>
      )}
    </div>
  );
}

function FuncsCodeBlock({
  code,
  translations,
  tokens,
  definitions,
  activeLine = null,
  runThroughLine = null,
  activeKey = null,
  runKeys = null,
  expandable = false,
  expandedLine = null,
  onToggleLine,
  onDefinition,
}) {
  const lines = funcsNormalizeCodeLines(code, translations);
  const tokenSpec = funcsNormalizeTokenSpec(code, tokens, definitions);
  const runKeySet = runKeys ? (runKeys instanceof Set ? runKeys : new Set(runKeys)) : null;

  return (
    <React.Fragment>
      {lines.map((line, i) => {
        const lineKey = funcsCodeLineKey(line, i);
        const scopedKeys = (Array.isArray(line.scope) ? line.scope : [])
          .map((scopeLine, scopeIndex) => funcsScopeLineKey(lineKey, scopeLine, scopeIndex));
        const keyedRun = runKeySet && (runKeySet.has(lineKey) || scopedKeys.some(key => runKeySet.has(key)));
        const keyedActive = activeKey && (activeKey === lineKey || scopedKeys.includes(activeKey));

        return (
          <FuncsTokenizedLine
            key={line.id || `${line.text}-${i}`}
            line={line}
            index={i}
            tokenSpec={tokenSpec}
            active={activeKey ? Boolean(keyedActive) : i === activeLine}
            run={runKeySet ? Boolean(keyedRun) : runThroughLine == null || i <= runThroughLine}
            activeKey={activeKey}
            runKeys={runKeySet}
            expanded={expandable ? expandedLine : null}
            onToggle={expandable ? (key) => onToggleLine?.(key) : null}
            onDef={onDefinition}
            translation={line.translation}
          />
        );
      })}
    </React.Fragment>
  );
}

function FuncsConsole({ lines }) {
  const output = lines || [];

  return (
    <div>
      <div style={{
        fontSize: 9.5, fontWeight: 800, color: '#94a3b8',
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
      }}>Console</div>
      <div style={{
        borderRadius: 7, overflow: 'hidden',
        border: '1px solid #313244', background: '#1e1e2e',
      }}>
        <div style={{ height: 25, background: '#181825', borderBottom: '1px solid #313244', display: 'flex', alignItems: 'center', gap: 6, padding: '0 10px' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f38ba8' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f9e2af' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#a6e3a1' }} />
          <span style={{ color: '#94a3b8', fontSize: 10, marginLeft: 4 }}>stdout</span>
        </div>
        <div style={{
          minHeight: 46, padding: '10px 12px',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
          color: output.length ? '#e2e8f0' : '#6c7086',
          fontStyle: output.length ? 'normal' : 'italic',
        }}>{output.length ? output.join('\n') : '(no output)'}</div>
      </div>
    </div>
  );
}

const FUNCS_MEMORY_REF_PALETTE = [
  { bg: '#ede9fe', border: '#8b5cf6', dot: '#7c3aed' },
  { bg: '#dbeafe', border: '#60a5fa', dot: '#3b82f6' },
  { bg: '#dcfce7', border: '#86efac', dot: '#16a34a' },
  { bg: '#fef3c7', border: '#fbbf24', dot: '#d97706' },
  { bg: '#fee2e2', border: '#fca5a5', dot: '#dc2626' },
];

const FUNCS_MEMORY_REF_NEUTRAL = {
  bg: '#f8fafc',
  border: '#dbe4ef',
  dot: '#64748b',
};

const FUNCS_MEMORY_LABEL_STYLE = {
  fontSize: 9,
  fontWeight: 900,
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 5,
};

const FUNCS_MEMORY_HEADER_STYLE = {
  fontSize: 8,
  fontWeight: 800,
  color: '#c1c8d4',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontFamily: "'Source Sans 3', sans-serif",
};

function funcsMemoryRefColors(refId) {
  const key = String(refId || 'ref');
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash + key.charCodeAt(i) * (i + 1)) % 997;
  return FUNCS_MEMORY_REF_PALETTE[hash % FUNCS_MEMORY_REF_PALETTE.length];
}

function FuncsMemoryRefChip({ refId, addr, label, active = false }) {
  const colors = active ? funcsMemoryRefColors(refId || addr || label) : FUNCS_MEMORY_REF_NEUTRAL;
  const text = addr || label || refId || 'ref';
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10.5,
      fontWeight: 700,
      color: colors.dot,
      background: colors.bg,
      border: `1px solid ${colors.border}`,
      borderRadius: 3,
      padding: '0 5px',
      lineHeight: '18px',
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
    }}>
      {text}
    </span>
  );
}

function FuncsMemoryArrayStrip({ elements = [], changed = [], activeIndex }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 2,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      color: '#1e293b',
    }}>
      <span style={{ color: '#94a3b8' }}>[ </span>
      {elements.map((value, index) => {
        const isActive = activeIndex === index || changed.includes(index);
        return (
          <React.Fragment key={index}>
            {index > 0 && <span style={{ color: '#94a3b8' }}>, </span>}
            <span style={{
              color: isActive ? '#dc2626' : '#1e293b',
              fontWeight: isActive ? 800 : 600,
              background: isActive ? '#fee2e2' : 'transparent',
              padding: isActive ? '0 3px' : 0,
              borderRadius: 2,
            }}>{value}</span>
          </React.Fragment>
        );
      })}
      <span style={{ color: '#94a3b8' }}> ]</span>
    </span>
  );
}

function FuncsMemoryFieldsInline({ fields = {}, highlight = [] }) {
  const entries = Array.isArray(fields)
    ? fields.map(field => [field.name, field.value, field])
    : Object.entries(fields).map(([name, value]) => [name, value, {}]);

  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
      {entries.map(([name, value, meta]) => {
        const isActive = highlight.includes(name) || meta.highlight;
        const valueObject = value && typeof value === 'object' ? value : null;
        const ref = meta.ref || valueObject?.ref;
        const displayValue = ref ? null : (valueObject?.value != null ? valueObject.value : value);
        return (
          <span key={name} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            border: `1px solid ${isActive ? '#bbf7d0' : '#e2e6ee'}`,
            borderRadius: 4,
            background: isActive ? '#f0fdf4' : '#fff',
            padding: '1px 7px',
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              fontWeight: 700,
              color: '#1e293b',
            }}>{name}</span>
            <span style={{ color: '#c1c8d4', fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>=</span>
            {ref ? (
              <FuncsMemoryRefChip
                refId={ref}
                addr={meta.addr || valueObject?.addr}
                label={meta.label || valueObject?.label}
                active={isActive}
              />
            ) : (
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                fontWeight: 700,
                color: isActive ? '#059669' : '#334155',
              }}>{displayValue}</span>
            )}
          </span>
        );
      })}
    </span>
  );
}

function FuncsMemoryHeapObject({ object }) {
  const shape = object.shape || object.kind || (Array.isArray(object.elements) ? 'array' : 'object');
  const isActive = Boolean(object.active);
  const colors = isActive ? funcsMemoryRefColors(object.id || object.addr) : FUNCS_MEMORY_REF_NEUTRAL;
  const data = shape === 'array'
    ? <FuncsMemoryArrayStrip elements={object.elements || object.display || []} changed={object.changed || []} activeIndex={object.activeIndex} />
    : <FuncsMemoryFieldsInline fields={object.fields || {}} highlight={object.highlight || []} />;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '58px minmax(68px, auto) 1fr',
      alignItems: 'center',
      gap: 8,
      padding: '5px 10px',
      borderRadius: 6,
      background: isActive ? colors.bg : '#fff',
      border: `1.5px solid ${isActive ? colors.border : '#e2e6ee'}`,
    }}>
      <FuncsMemoryRefChip refId={object.id} addr={object.addr} active={isActive} />
      <span style={{ fontSize: 9.5, color: '#94a3b8', fontWeight: 700 }}>{object.type || shape}</span>
      <span style={{ minWidth: 0 }}>{data}</span>
    </div>
  );
}

function FuncsMemoryStatePanel({ state }) {
  const stack = Array.isArray(state?.stack) ? state.stack : [];
  const heap = Array.isArray(state?.heap) ? state.heap : [];
  const hasStructuredMemory = stack.length || heap.length;
  const { TBMemoryMini } = window;

  if (!hasStructuredMemory) {
    return state?.memory?.length ? <TBMemoryMini rows={state.memory} /> : (
      <div style={{
        border: '1px dashed #cbd5e1', borderRadius: 7, padding: 14,
        color: '#94a3b8', fontSize: 13, fontStyle: 'italic',
      }}>No bindings yet.</div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div>
        <div style={FUNCS_MEMORY_LABEL_STYLE}>Stack Frame</div>
        <div style={{ border: '1px solid #e2e6ee', borderRadius: 6, overflow: 'hidden', background: '#fff' }}>
          {stack.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(62px, 0.9fr) minmax(58px, 0.7fr) 1fr',
              padding: '3px 12px 2px',
              borderBottom: '1px solid #f1f3f7',
              background: '#fafbfc',
            }}>
              <span style={FUNCS_MEMORY_HEADER_STYLE}>Name</span>
              <span style={FUNCS_MEMORY_HEADER_STYLE}>Type</span>
              <span style={FUNCS_MEMORY_HEADER_STYLE}>Value</span>
            </div>
          )}
          {stack.length ? stack.map((item, index) => (
            <div key={item.name || index} style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(62px, 0.9fr) minmax(58px, 0.7fr) 1fr',
              gap: 8,
              alignItems: 'center',
              padding: '5px 12px',
              borderTop: index ? '1px solid #f1f3f7' : 'none',
              background: item.active || item.isNew ? '#f0fdf4' : '#fff',
            }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: '#1e293b' }}>{item.name}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#94a3b8', fontWeight: 600 }}>{item.type}</span>
              {item.ref ? (
                <FuncsMemoryRefChip refId={item.ref} addr={item.addr} label={item.label} active={item.active || item.isNew} />
              ) : (
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: item.active || item.isNew ? '#059669' : '#334155',
                  fontWeight: 700,
                }}>{item.value}</span>
              )}
            </div>
          )) : (
            <div style={{ padding: 12, color: '#94a3b8', fontSize: 13, fontStyle: 'italic' }}>No stack bindings.</div>
          )}
        </div>
      </div>
      <div>
        <div style={FUNCS_MEMORY_LABEL_STYLE}>Heap</div>
        {heap.length ? (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '58px minmax(68px, auto) 1fr',
              gap: 8,
              padding: '0 10px 3px',
              alignItems: 'center',
            }}>
              <span style={FUNCS_MEMORY_HEADER_STYLE}>Addr</span>
              <span style={FUNCS_MEMORY_HEADER_STYLE}>Type</span>
              <span style={FUNCS_MEMORY_HEADER_STYLE}>Data</span>
            </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {heap.map(object => <FuncsMemoryHeapObject key={object.id || object.addr} object={object} />)}
          </div>
          </>
        ) : (
          <div style={{
            border: '1px dashed #e2e6ee', borderRadius: 6, padding: '10px 12px',
            color: '#c1c8d4', fontSize: 11.5, fontStyle: 'italic',
          }}>(no allocations)</div>
        )}
      </div>
    </div>
  );
}

function FuncsChapterOverviewPanel({ lesson, variant = 'inline' }) {
  const { chapterExamples = [] } = lesson;
  const dropdown = variant === 'dropdown';

  return (
    <div style={{
      border: dropdown ? '1px solid #bfdbfe' : 'none',
      borderBottom: dropdown ? '1px solid #bfdbfe' : '1px solid #dbe4ef',
      borderRadius: dropdown ? 8 : 0,
      background: '#f8fbff',
      padding: '12px 18px 14px',
      boxShadow: dropdown ? '0 18px 44px rgba(15, 23, 42, 0.16)' : 'none',
      maxHeight: dropdown ? 'min(360px, calc(100vh - 150px))' : 'none',
      overflow: dropdown ? 'auto' : 'visible',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${chapterExamples.length || 1}, minmax(150px, 1fr))`,
        gap: 10,
        overflowX: 'auto',
      }}>
        {chapterExamples.map((item) => {
          const body = (
            <React.Fragment>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                <span style={{
                  fontSize: 9,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: item.current ? '#2563eb' : '#64748b',
                  background: item.current ? '#dbeafe' : '#f1f5f9',
                  borderRadius: 4,
                  padding: '2px 6px',
                  whiteSpace: 'nowrap',
                }}>{item.label}</span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: '#94a3b8',
                  whiteSpace: 'nowrap',
                }}>{item.source}</span>
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 900, color: '#1e293b', lineHeight: 1.15, marginBottom: 5 }}>
                {item.title}
              </div>
              <div style={{ minHeight: 34, fontSize: 11.8, color: '#64748b', lineHeight: 1.35, marginBottom: 9 }}>
                {item.summary}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {(item.tags || []).map((tag) => (
                  <span key={tag} style={{
                    border: '1px solid #dbe4ef',
                    borderRadius: 999,
                    background: '#fff',
                    color: '#475569',
                    padding: '1px 6px',
                    fontSize: 10.5,
                    fontWeight: 800,
                    whiteSpace: 'nowrap',
                  }}>{tag}</span>
                ))}
              </div>
            </React.Fragment>
          );
          const styles = {
            display: 'block',
            minWidth: 150,
            height: '100%',
            border: item.current ? '1.5px solid #2563eb' : '1px solid #dbe4ef',
            borderRadius: 8,
            background: item.current ? '#eff6ff' : '#fff',
            padding: 10,
            textDecoration: 'none',
            boxShadow: item.current ? '0 6px 18px rgba(37, 99, 235, 0.10)' : 'none',
          };

          return item.current ? (
            <div key={item.source || item.title} style={styles} aria-current="page">{body}</div>
          ) : (
            <a key={item.source || item.title} href={item.href} style={styles}>{body}</a>
          );
        })}
      </div>
    </div>
  );
}

function funcsValidateLoopTrace(detail) {
  const missing = [];

  if (!detail || typeof detail !== 'object') {
    return { valid: false, missing: ['loopTrace'], stepCount: 0 };
  }

  for (const field of FUNCS_LOOP_STEPPER_INTERACTION.requiredDetailFields) {
    if (detail[field] == null) missing.push(field);
  }

  if (!Array.isArray(detail.steps) || detail.steps.length === 0) {
    missing.push('steps[]');
  }

  return {
    valid: missing.length === 0,
    missing,
    stepCount: Array.isArray(detail.steps) ? detail.steps.length : 0,
  };
}

function FuncsLoopStepperDetail({ detail, currentStep = 0, onStepChange, onClose }) {
  const { TBMemoryMini, secLabelStyle } = window;
  const validation = funcsValidateLoopTrace(detail);
  const maxSub = Math.max(0, (validation.stepCount || 1) - 1);
  const sub = Math.min(Math.max(currentStep, 0), maxSub);
  const setSub = (nextStep) => {
    if (!onStepChange) return;
    onStepChange(Math.min(Math.max(nextStep, 0), maxSub));
  };

  React.useEffect(() => {
    if (!validation.valid) return undefined;

    const handleKey = (event) => {
      if (event.key === 'ArrowRight') {
        event.stopImmediatePropagation();
        setSub(sub + 1);
      }
      if (event.key === 'ArrowLeft') {
        event.stopImmediatePropagation();
        setSub(sub - 1);
      }
    };

    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [validation.valid, maxSub, sub, onStepChange]);

  if (!validation.valid) {
    return (
      <div style={{
        border: '1px dashed #cbd5e1',
        borderRadius: 7,
        padding: 14,
        color: '#94a3b8',
        fontSize: 13,
        fontStyle: 'italic',
      }}>
        Loop trace is missing stepper data: {validation.missing.join(', ')}
      </div>
    );
  }

  const current = detail.steps[sub];
  const hasStructuredTraceState = Array.isArray(current.stack) || Array.isArray(current.heap);
  const btnBase = {
    border: '1px solid #cbd5e1',
    borderRadius: 5,
    background: '#fff',
    color: '#475569',
    padding: '5px 9px',
    fontSize: 11.5,
    fontWeight: 800,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{
      border: '1px solid #fde68a',
      borderRadius: 8,
      overflow: 'hidden',
      background: '#fff',
      display: 'grid',
      minHeight: 0,
    }}>
      <div style={{
        padding: '8px 10px',
        borderBottom: '1px solid #fde68a',
        background: '#fffbeb',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 10,
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 9.5, fontWeight: 800, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Loop Stepper
          </div>
          <div style={{ fontSize: 12.5, color: '#1e293b', fontWeight: 800 }}>{detail.title}</div>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} style={{
            ...btnBase,
            borderColor: '#fde68a',
            color: '#92400e',
            background: '#fff7ed',
          }}>
            Exit loop stepper
          </button>
        )}
      </div>
      <div style={{ padding: 14, display: 'grid', gap: 10, minHeight: 0 }}>
        <div style={{
          padding: '6px 10px',
          borderRadius: 5,
          background: '#fff7ed',
          border: '1px solid #fed7aa',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          minWidth: 0,
        }}>
          <span style={{
            fontSize: 8.5,
            fontWeight: 800,
            color: '#b45309',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}>from</span>
          <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#475569', overflowWrap: 'anywhere' }}>
            {detail.sourceLine}
          </code>
        </div>
        <div style={{
          minHeight: 74,
          padding: '9px 10px',
          borderRadius: 6,
          background: sub === maxSub ? '#ecfdf5' : '#fffbeb',
          border: `1px solid ${sub === maxSub ? '#bbf7d0' : '#fde68a'}`,
          color: '#475569',
          fontSize: 12.5,
          lineHeight: 1.4,
          display: 'grid',
          gap: 5,
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <strong style={{ color: '#1e293b' }}>Step {sub + 1}:</strong>
            {current.iteration && (
              <span style={{ borderRadius: 999, background: '#e0f2fe', color: '#0369a1', padding: '1px 7px', fontSize: 10.5, fontWeight: 900 }}>
                {current.iteration}
              </span>
            )}
            {current.phase && (
              <span style={{ borderRadius: 999, background: '#fed7aa', color: '#92400e', padding: '1px 7px', fontSize: 10.5, fontWeight: 900 }}>
                {current.phase}
              </span>
            )}
            {current.outcome && (
              <span style={{ borderRadius: 999, background: sub === maxSub ? '#dcfce7' : '#fef3c7', color: sub === maxSub ? '#166534' : '#92400e', padding: '1px 7px', fontSize: 10.5, fontWeight: 900 }}>
                {current.outcome}
              </span>
            )}
          </div>
          <div>{current.note}</div>
        </div>
        <div style={{
          display: 'grid',
          gap: 10,
          minHeight: 0,
        }}>
          <section style={{ display: 'grid', gap: 10, alignContent: 'start', minWidth: 0 }}>
            <div>
              <div style={secLabelStyle}>Trace State</div>
              {hasStructuredTraceState ? (
                <FuncsMemoryStatePanel state={current} />
              ) : (current.memory || []).length ? (
                <TBMemoryMini rows={current.memory} />
              ) : (
                <div style={{ border: '1px dashed #cbd5e1', borderRadius: 7, padding: 10, color: '#94a3b8', fontSize: 12.5, fontStyle: 'italic' }}>
                  No memory change for this phase.
                </div>
              )}
            </div>
            <FuncsConsole lines={current.console || []} />
          </section>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <button
            type="button"
            aria-label="Previous loop step"
            disabled={sub === 0}
            onClick={() => setSub(sub - 1)}
            style={{ ...btnBase, opacity: sub === 0 ? 0.35 : 1, cursor: sub === 0 ? 'default' : 'pointer' }}
          >
            Prev
          </button>
          <div style={{ flex: 1, display: 'flex', gap: 3 }}>
            {Array.from({ length: maxSub + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to loop step ${i + 1}`}
                onClick={() => setSub(i)}
                style={{
                  flex: 1,
                  height: 6,
                  border: 'none',
                  padding: 0,
                  borderRadius: 2,
                  background: i === sub ? '#f59e0b' : i < sub ? '#92400e' : '#e2e8f0',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#94a3b8',
            whiteSpace: 'nowrap',
          }}>{sub + 1}/{maxSub + 1}</span>
          <button
            type="button"
            aria-label="Next loop step"
            disabled={sub === maxSub}
            onClick={() => setSub(sub + 1)}
            style={{
              ...btnBase,
              border: 'none',
              background: '#f59e0b',
              color: '#fff',
              opacity: sub === maxSub ? 0.35 : 1,
              cursor: sub === maxSub ? 'default' : 'pointer',
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function FuncsFullExamplePage({ sequence, lesson }) {
  const fullExample = lesson.fullExample;
  const header = fullExample.header;
  const step = sequence?.currentStep ?? 0;
  const [expandedLine, setExpandedLine] = React.useState(null);
  const [activeDef, setActiveDef] = React.useState(null);
  const [showEval, setShowEval] = React.useState(false);
  const [showLoopTrace, setShowLoopTrace] = React.useState(false);
  const [loopTraceStep, setLoopTraceStep] = React.useState(0);
  const tokenSpec = funcsNormalizeTokenSpec(fullExample.code, fullExample.tokens, fullExample.definitions);
  const executionSteps = funcsBuildFullExampleSteps(fullExample);
  const activeStep = executionSteps[Math.min(step, Math.max(executionSteps.length - 1, 0))] || executionSteps[0];
  const state = funcsFullExampleStateForStep(fullExample, activeStep);
  const activeLine = activeStep?.lineIndex ?? null;
  const activeKey = activeStep?.rowKey ?? null;
  const activeSourceLabel = activeStep?.sourceLabel || 'before execution';
  const progressLabel = `${step}/${Math.max(executionSteps.length - 1, 0)}`;
  const runKeys = new Set(executionSteps
    .slice(1, Math.min(step + 1, executionSteps.length))
    .map(execStep => execStep.rowKey)
    .filter(Boolean));
  const loopTraceSteps = Array.isArray(state.loopTrace?.steps) ? state.loopTrace.steps : [];
  const activeLoopTraceStep = showLoopTrace
    ? loopTraceSteps[Math.min(loopTraceStep, Math.max(loopTraceSteps.length - 1, 0))]
    : null;
  const codeActiveKey = activeLoopTraceStep?.rowKey || activeKey;
  const codeRunKeys = activeLoopTraceStep
    ? new Set(loopTraceSteps
      .slice(0, Math.min(loopTraceStep + 1, loopTraceSteps.length))
      .map(traceStep => traceStep.rowKey)
      .filter(Boolean))
    : runKeys;

  React.useEffect(() => {
    setExpandedLine(null);
    setShowEval(false);
    setShowLoopTrace(false);
    setLoopTraceStep(0);
  }, [step]);

  React.useEffect(() => {
    sequence?.registerControls?.({
      status: `${activeSourceLabel} · ${progressLabel}`,
    });
  }, [activeSourceLabel, progressLabel, sequence]);

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: '#fff', fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <style>{`
        @keyframes funcsEvalPromptGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.18), 0 0 0 rgba(245, 158, 11, 0); }
          50% { box-shadow: 0 0 0 5px rgba(245, 158, 11, 0.16), 0 0 18px rgba(245, 158, 11, 0.32); }
        }

        @media (prefers-reduced-motion: reduce) {
          .funcs-eval-prompt {
            animation: none !important;
            box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.14);
          }
        }

        @media (max-width: 720px) {
          .funcs-full-example-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: minmax(280px, 1fr) minmax(260px, 1fr);
          }

          .funcs-full-example-code-pane {
            border-right: none !important;
            border-bottom: 1px solid #e2e6ee;
          }

          .funcs-full-example-modebar {
            align-items: flex-start !important;
            flex-wrap: wrap;
          }

          .funcs-loop-stepper-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div className="funcs-full-example-modebar" style={{
        padding: '8px 18px', borderBottom: '1px solid #e2e6ee',
        background: '#fafbfc', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          fontSize: 9.5, fontWeight: 800, textTransform: 'uppercase',
          letterSpacing: '0.08em', color: '#2563eb',
          background: '#dbeafe', borderRadius: 3, padding: '2px 8px',
        }}>{header.modeLabel}</span>
        <span style={{ fontSize: 12.5, color: '#64748b' }}>{header.instructions}</span>
      </div>
      <div className="funcs-full-example-grid" style={{
        flex: 1,
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: showEval ? '34% 66%' : '55% 45%',
      }}>
        <div className="funcs-full-example-code-pane" style={{ borderRight: '1px solid #e2e6ee', minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px 18px', borderBottom: '1px solid #edf1f7' }}>
            <div style={{
              fontSize: 9.5, fontWeight: 800, textTransform: 'uppercase',
              letterSpacing: '0.08em', color: '#94a3b8', marginBottom: 4,
            }}>{header.programLabel}</div>
            <div style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.35 }}>
              {header.programNote}
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'auto', paddingTop: 8 }}>
            <FuncsCodeBlock
              code={fullExample.code}
              translations={fullExample.translations}
              tokens={fullExample.tokens}
              definitions={fullExample.definitions}
              activeLine={activeLine}
              runThroughLine={activeLine}
              activeKey={codeActiveKey}
              runKeys={codeRunKeys}
              expandable
              expandedLine={expandedLine}
              onToggleLine={(key) => setExpandedLine(prev => prev === key ? null : key)}
              onDefinition={setActiveDef}
            />
          </div>
          <div style={{
            minHeight: 38, padding: '8px 18px', borderTop: '1px solid #e2e6ee',
            background: '#fbfcfe', fontSize: 12.5, color: '#475569',
          }}>
            {activeDef ? (
              <span><strong style={{ color: '#1e293b' }}>{activeDef}:</strong> {tokenSpec[activeDef]?.description}</span>
            ) : (
              <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Hover a highlighted token to see its definition.</span>
            )}
          </div>
        </div>
        <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column', background: '#fbfcfe' }}>
          <div style={{ padding: '10px 16px', borderBottom: '1px solid #e2e6ee', display: 'flex', gap: 8, alignItems: 'center', background: '#fff' }}>
            <span style={{
              fontSize: 10, fontWeight: 800, color: step === 0 ? '#64748b' : '#047857',
              background: step === 0 ? '#f1f5f9' : '#d1fae5',
              borderRadius: 3, padding: '2px 8px', whiteSpace: 'nowrap',
            }}>{state.label}</span>
            <span style={{ fontSize: 12.5, lineHeight: 1.35, color: '#475569' }}>{state.desc}</span>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'grid', gap: 14, alignContent: 'start' }}>
            {state.evalDetail && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className={!showEval ? 'funcs-eval-prompt' : undefined}
                  onClick={() => {
                    setShowLoopTrace(false);
                    setShowEval(prev => !prev);
                  }}
                  style={{
                    border: showEval ? '1px solid #bfdbfe' : '1px solid #f59e0b',
                    background: showEval ? '#dbeafe' : '#fff7ed',
                    color: '#1d4ed8', borderRadius: 5, padding: '5px 10px',
                    fontSize: 11.5, fontWeight: 800, cursor: 'pointer',
                    animation: !showEval ? 'funcsEvalPromptGlow 2.25s ease-in-out infinite' : 'none',
                  }}>
                  {showEval ? 'Show memory state' : 'Show evaluation steps'}
                </button>
              </div>
            )}
            {state.loopTrace && !showLoopTrace && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="funcs-eval-prompt"
                  onClick={() => {
                    setShowEval(false);
                    setLoopTraceStep(0);
                    setShowLoopTrace(true);
                  }}
                  style={{
                    border: '1px solid #f59e0b',
                    background: '#fff7ed',
                    color: '#92400e', borderRadius: 5, padding: '5px 10px',
                    fontSize: 11.5, fontWeight: 800, cursor: 'pointer',
                    animation: 'funcsEvalPromptGlow 2.25s ease-in-out infinite',
                  }}>
                  Show loop steps
                </button>
              </div>
            )}
            {showEval ? (
              <FuncsStackedEvaluationDetail detail={state.evalDetail} onClose={() => setShowEval(false)} />
            ) : showLoopTrace ? (
              <FuncsLoopStepperDetail
                detail={state.loopTrace}
                currentStep={loopTraceStep}
                onStepChange={setLoopTraceStep}
                onClose={() => {
                  setShowLoopTrace(false);
                  setLoopTraceStep(0);
                }}
              />
            ) : (
              <React.Fragment>
                <div>
                  <div style={{
                    fontSize: 9.5, fontWeight: 800, color: '#94a3b8',
                    textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
                  }}>State</div>
                  <FuncsMemoryStatePanel state={state} />
                </div>
                <FuncsConsole lines={state.console} />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FuncsQuizFooter({ checked, score, total, complete, onReset, onCheck }) {
  const { footBtnStyle } = window;

  return (
    <div style={{
      borderTop: '1px solid #e2e6ee', background: '#fafbfc',
      padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <button type="button" onClick={onReset} style={{
        ...footBtnStyle, background: '#fff', border: '1px solid #e2e6ee', color: '#64748b',
      }}>Reset</button>
      <div style={{ flex: 1 }} />
      {checked && (
        <span style={{ fontSize: 12.5, fontWeight: 800, color: score === total ? '#059669' : '#dc2626' }}>
          {score}/{total} correct{score === total ? ' - ready to move on' : ' - revise and check again'}
        </span>
      )}
      <button type="button" onClick={onCheck} disabled={!complete} style={{
        ...footBtnStyle, background: complete ? '#2563eb' : '#94a3b8',
        color: '#fff', opacity: complete ? 1 : 0.5,
      }}>Check</button>
    </div>
  );
}

function FuncsQuizWorkspace({
  codeTitle = 'Program',
  code,
  tokens,
  definitions,
  flowItems,
  activeIndex,
  onActiveIndex,
  support,
  children,
}) {
  const activeFlow = flowItems[activeIndex] || flowItems[0];
  const flowCount = flowItems.length || 1;
  const canPrev = activeIndex > 0;
  const canNext = activeIndex < flowCount - 1;

  return (
    <div className="funcs-quiz-workspace">
      <style>{`
        .funcs-quiz-workspace {
          min-height: 100%;
          display: grid;
          grid-template-columns: minmax(560px, 1.35fr) minmax(320px, 0.85fr);
          gap: 16px;
          align-items: start;
        }

        .funcs-quiz-code-card {
          position: sticky;
          top: 0;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: #f8fafc;
          overflow: auto;
          max-height: calc(100vh - 220px);
          min-width: 0;
        }

        .funcs-quiz-code-card .funcs-code-line-source {
          overflow-x: visible !important;
        }

        .funcs-quiz-code-body {
          padding: 10px 0 8px;
          min-width: max-content;
        }

        .funcs-quiz-flow {
          display: grid;
          gap: 12px;
          min-width: 0;
        }

        .funcs-quiz-flow-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(92px, 1fr));
          gap: 7px;
        }

        .funcs-quiz-flow-step {
          border: 1px solid #dbe4ef;
          border-radius: 8px;
          background: #fff;
          padding: 8px 9px;
          text-align: left;
          cursor: pointer;
          min-height: 54px;
        }

        .funcs-quiz-flow-step-active {
          border-color: #2563eb;
          background: #eff6ff;
          box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.08);
        }

        .funcs-quiz-flow-step-complete {
          background: #f0fdf4;
          border-color: #bbf7d0;
        }

        .funcs-quiz-flow-card {
          border: 1px solid #dbe4ef;
          border-radius: 8px;
          background: #fff;
          overflow: hidden;
        }

        .funcs-quiz-flow-card-body {
          padding: 13px;
          display: grid;
          gap: 12px;
        }

        .funcs-quiz-flow-actions {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          align-items: center;
          padding: 10px 13px;
          border-top: 1px solid #edf2f7;
          background: #fbfcfe;
        }

        .funcs-quiz-secondary-button {
          border: 1px solid #cbd5e1;
          border-radius: 7px;
          background: #fff;
          color: #334155;
          font-weight: 800;
          font-size: 12px;
          padding: 6px 10px;
          cursor: pointer;
          min-width: 96px;
        }

        .funcs-quiz-secondary-button:disabled {
          cursor: default;
          color: #94a3b8;
          background: #f8fafc;
        }

        @media (max-width: 1160px) {
          .funcs-quiz-workspace {
            grid-template-columns: minmax(500px, 1.25fr) minmax(300px, 0.85fr);
          }
        }

        @media (max-width: 900px) {
          .funcs-quiz-workspace {
            grid-template-columns: 1fr;
          }

          .funcs-quiz-code-card {
            position: static;
            max-height: none;
          }

          .funcs-quiz-flow-list {
            grid-template-columns: repeat(${Math.min(flowCount, 3)}, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .funcs-quiz-flow-list {
            grid-template-columns: 1fr;
          }

          .funcs-quiz-flow-actions {
            align-items: stretch;
            flex-direction: column;
          }

          .funcs-quiz-secondary-button {
            width: 100%;
          }
        }
      `}</style>
      <div className="funcs-quiz-code-card">
        <div style={{
          padding: '10px 12px',
          borderBottom: '1px solid #e2e8f0',
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 10,
        }}>
          <div style={{
            fontSize: 9.5,
            fontWeight: 900,
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>{codeTitle}</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#94a3b8',
            whiteSpace: 'nowrap',
          }}>full reference</div>
        </div>
        <div className="funcs-quiz-code-body">
          <FuncsCodeBlock code={code} tokens={tokens} definitions={definitions} />
        </div>
      </div>

      <div className="funcs-quiz-flow">
        <div className="funcs-quiz-flow-list" aria-label="Quiz question flow">
          {flowItems.map((item, index) => {
            const active = index === activeIndex;
            const done = item.complete;
            return (
              <button
                key={item.id || item.title || index}
                type="button"
                className={`funcs-quiz-flow-step${active ? ' funcs-quiz-flow-step-active' : ''}${done && !active ? ' funcs-quiz-flow-step-complete' : ''}`}
                onClick={() => onActiveIndex(index)}
              >
                <div style={{
                  fontSize: 9,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: active ? '#2563eb' : done ? '#047857' : '#94a3b8',
                  marginBottom: 3,
                }}>{index + 1} of {flowCount}</div>
                <div style={{ fontSize: 12.4, fontWeight: 900, color: '#1e293b', lineHeight: 1.15 }}>{item.title}</div>
              </button>
            );
          })}
        </div>

        <section className="funcs-quiz-flow-card">
          <div style={{
            padding: '10px 13px',
            borderBottom: '1px solid #edf2f7',
            background: '#f8fafc',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 12,
            alignItems: 'center',
          }}>
            <div>
              <div style={{
                fontSize: 9.5,
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#2563eb',
              }}>Question flow</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: '#1e293b' }}>{activeFlow?.title}</div>
            </div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: '#64748b',
              background: '#eef2ff',
              borderRadius: 999,
              padding: '3px 8px',
              whiteSpace: 'nowrap',
            }}>{activeIndex + 1} / {flowCount}</span>
          </div>
          <div className="funcs-quiz-flow-card-body">
            {support && (
              <div style={{
                border: '1px solid #e2e8f0',
                borderRadius: 7,
                background: '#fbfcfe',
                padding: 10,
              }}>
                {support}
              </div>
            )}
            {children}
          </div>
          <div className="funcs-quiz-flow-actions">
            <button
              type="button"
              className="funcs-quiz-secondary-button"
              onClick={() => canPrev && onActiveIndex(activeIndex - 1)}
              disabled={!canPrev}
            >
              Previous
            </button>
            <span style={{ fontSize: 12, color: '#64748b', textAlign: 'center' }}>
              {activeFlow?.status || ''}
            </span>
            <button
              type="button"
              className="funcs-quiz-secondary-button"
              onClick={() => canNext && onActiveIndex(activeIndex + 1)}
              disabled={!canNext}
            >
              Next question
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function FuncsReusableChip({ value, label, color, selected, onSelect }) {
  return (
    <span
      draggable
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-pressed={onSelect ? selected : undefined}
      onClick={onSelect ? () => onSelect(value) : undefined}
      onKeyDown={onSelect ? (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(value);
        }
      } : undefined}
      onDragStart={e => { e.dataTransfer.setData('text/plain', value); e.dataTransfer.effectAllowed = 'copyMove'; }}
      style={{
        display: 'inline-flex', alignItems: 'center',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        fontWeight: 700, padding: '3px 9px', borderRadius: 4,
        cursor: 'grab', userSelect: 'none',
        background: selected ? '#fffbeb' : color || '#fff',
        border: `1.5px solid ${selected ? '#f59e0b' : '#cbd5e1'}`,
        boxShadow: selected ? '0 0 0 3px rgba(245, 158, 11, 0.16)' : 'none',
        color: '#1e293b',
      }}
    >{label || value}</span>
  );
}

function funcsNormalizeSyntaxGroups(syntax) {
  if (!syntax) return [];

  const rawGroups = Array.isArray(syntax)
    ? syntax
    : Object.entries(syntax).map(([group, items]) => ({ group, items }));

  return rawGroups.map((entry, groupIndex) => {
    const group = entry.group || entry.title || entry.label || `Syntax ${groupIndex + 1}`;
    const rawItems = Array.isArray(entry.items) ? entry.items : Array.isArray(entry) ? entry : [entry];
    const items = rawItems.map((item, itemIndex) => {
      if (typeof item === 'string') {
        return { term: item, note: '', source: '' };
      }

      return {
        term: item.term || item.label || item.pattern || item.syntax || `item-${itemIndex + 1}`,
        note: item.note || item.description || item.context || '',
        source: item.source || item.anchor || item.sourceAnchor || '',
      };
    });

    return { group, items };
  }).filter(group => group.items.length);
}

function FuncsSyntaxDrawer({ syntax, learningTarget, onClose }) {
  const groups = funcsNormalizeSyntaxGroups(syntax);

  return (
    <aside
      aria-label="Available syntax"
      style={{
        position: 'absolute',
        top: 48,
        right: 12,
        zIndex: 25,
        width: 'min(360px, calc(100% - 24px))',
        maxHeight: 'calc(100% - 128px)',
        overflow: 'auto',
        border: '1px solid #bfdbfe',
        borderRadius: 8,
        background: '#fff',
        boxShadow: '0 18px 44px rgba(15, 23, 42, 0.18)',
        fontFamily: "'Source Sans 3', sans-serif",
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'start',
        gap: 10,
        padding: '12px 13px 10px',
        borderBottom: '1px solid #dbeafe',
        background: '#eff6ff',
      }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{
            fontSize: 9.5,
            fontWeight: 900,
            color: '#2563eb',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: 4,
          }}>Syntax so far</div>
          {learningTarget && (
            <div style={{ fontSize: 12.5, lineHeight: 1.35, color: '#334155' }}>
              {learningTarget}
            </div>
          )}
        </div>
        <button
          type="button"
          aria-label="Close syntax drawer"
          onClick={onClose}
          style={{
            border: '1px solid #bfdbfe',
            borderRadius: 5,
            background: '#fff',
            color: '#1d4ed8',
            width: 28,
            height: 28,
            fontSize: 16,
            fontWeight: 800,
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >×</button>
      </div>
      <div style={{ padding: 12, display: 'grid', gap: 12 }}>
        {groups.map(group => (
          <section key={group.group} style={{ display: 'grid', gap: 7 }}>
            <div style={{
              fontSize: 10,
              fontWeight: 900,
              color: '#64748b',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>{group.group}</div>
            <div style={{ display: 'grid', gap: 7 }}>
              {group.items.map(item => (
                <div key={`${group.group}-${item.term}`} style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 7,
                  background: '#fbfdff',
                  padding: '8px 9px',
                  display: 'grid',
                  gap: 4,
                }}>
                  <code style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#1d4ed8',
                    whiteSpace: 'normal',
                  }}>{item.term}</code>
                  {item.note && (
                    <div style={{ fontSize: 12.2, lineHeight: 1.35, color: '#475569' }}>{item.note}</div>
                  )}
                  {item.source && (
                    <div style={{
                      justifySelf: 'start',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: '#64748b',
                      background: '#f1f5f9',
                      borderRadius: 4,
                      padding: '2px 5px',
                    }}>{item.source}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}

function funcsNormalizeFillInCodeBlocks(fillInCode) {
  if (!fillInCode) return [];
  return (Array.isArray(fillInCode) ? fillInCode : [fillInCode]).map((block, index) => ({
    id: block.id || `fill-code-${index + 1}`,
    title: block.title || 'Fill In Code',
    prompt: block.prompt,
    lines: block.lines || block.template || [],
    bank: block.bank || [],
    blanks: block.blanks || {},
    correctAnswers: block.correctAnswers || block.answers || {},
    feedback: block.feedback || {},
  }));
}

function funcsFillInCodeAnswers(blocks) {
  const answers = {};
  blocks.forEach(block => {
    Object.entries(block.correctAnswers).forEach(([blank, answer]) => {
      answers[`fc-${block.id}-${blank}`] = answer;
    });
    Object.entries(block.blanks).forEach(([blank, value]) => {
      if (answers[`fc-${block.id}-${blank}`] != null) return;
      if (typeof value === 'string') answers[`fc-${block.id}-${blank}`] = value;
      else answers[`fc-${block.id}-${blank}`] = value.answer || value.correct;
    });
  });
  return answers;
}

function FuncsFillInCodeQuizBlock({ block, placed, checked, onDrop, onClear }) {
  const { DropSlot, secLabelStyle } = window;
  const blockAnswers = funcsFillInCodeAnswers([block]);
  const slots = Object.keys(blockAnswers);
  const complete = slots.every(slot => placed[slot] != null);
  const correct = slots.filter(slot => placed[slot] === blockAnswers[slot]).length;
  const bank = block.bank.length
    ? block.bank
    : Array.from(new Set(Object.values(blockAnswers)));

  const renderSegment = (segment, segmentIndex) => {
    if (typeof segment === 'string') return <React.Fragment key={segmentIndex}>{segment}</React.Fragment>;
    if (segment.blank) {
      const slot = `fc-${block.id}-${segment.blank}`;
      const label = segment.label || segment.blank;
      return (
        <span key={`${slot}-${segmentIndex}`} style={{ display: 'inline-flex', verticalAlign: 'middle', margin: '0 3px' }}>
          <DropSlot
            slotId={slot}
            placed={placed[slot]}
            correct={blockAnswers[slot]}
            checked={checked}
            onDrop={onDrop}
            onClear={onClear}
            label={label}
          />
        </span>
      );
    }
    return <React.Fragment key={segmentIndex}>{segment.text || ''}</React.Fragment>;
  };

  return (
    <section style={{ border: '1px solid #bfdbfe', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
      <style>{`
        @media (max-width: 720px) {
          .funcs-fill-code-grid {
            grid-template-columns: 1fr !important;
          }

          .funcs-fill-code-line {
            grid-template-columns: 24px minmax(240px, 1fr) !important;
          }
        }
      `}</style>
      <div style={{ padding: '10px 12px', borderBottom: '1px solid #dbeafe', background: '#eff6ff' }}>
        <div style={secLabelStyle}>{block.title}</div>
        {block.prompt && <div style={{ fontSize: 12.8, lineHeight: 1.4, color: '#334155' }}>{block.prompt}</div>}
      </div>
      <div className="funcs-fill-code-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 190px', gap: 12, padding: 12, alignItems: 'start' }}>
        <div style={{
          border: '1px solid #e2e8f0',
          borderRadius: 7,
          background: '#f8fafc',
          padding: '10px 12px',
          display: 'grid',
          gap: 6,
          overflowX: 'auto',
        }}>
          {block.lines.map((line, lineIndex) => {
            const segments = Array.isArray(line) ? line : [line];
            return (
              <div key={lineIndex} className="funcs-fill-code-line" style={{
                display: 'grid',
                gridTemplateColumns: '24px minmax(0, 1fr)',
                gap: 8,
                alignItems: 'center',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12.2,
                color: '#1e293b',
                minHeight: 31,
              }}>
                <span style={{ color: '#94a3b8', textAlign: 'right' }}>{lineIndex + 1}</span>
                <span style={{ minWidth: 0, whiteSpace: 'nowrap' }}>{segments.map(renderSegment)}</span>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'grid', gap: 8 }}>
          <div style={secLabelStyle}>Answer Bank</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {bank.map((value, i) => (
              <FuncsReusableChip key={`${value}-${i}`} value={value} />
            ))}
          </div>
          {checked && (
            <div style={{
              border: `1px solid ${correct === slots.length ? '#bbf7d0' : '#fecaca'}`,
              borderRadius: 6,
              background: correct === slots.length ? '#f0fdf4' : '#fef2f2',
              color: correct === slots.length ? '#047857' : '#991b1b',
              padding: '7px 8px',
              fontSize: 12,
              lineHeight: 1.35,
            }}>
              {correct === slots.length
                ? block.feedback.success || 'All blanks match the target code.'
                : block.feedback.retry || `${correct}/${slots.length} blanks are correct. Check each slot against the prompt.`}
            </div>
          )}
          {!checked && !complete && (
            <div style={{ fontSize: 11.8, lineHeight: 1.35, color: '#64748b' }}>
              Drag each chip into the named code slot.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FuncsPreQuizPage({ sequence, lesson }) {
  const { TBQuizFrame, DropSlot, secLabelStyle } = window;
  const quiz = lesson.preQuiz;
  const answers = quiz.answers;
  const bank = quiz.bank;
  const [placed, setPlaced] = React.useState({});
  const [checked, setChecked] = React.useState(false);
  const [selectedChip, setSelectedChip] = React.useState(null);
  const [activePromptIndex, setActivePromptIndex] = React.useState(0);
  const keys = Object.keys(answers);
  const complete = keys.every(key => placed[key] != null);
  const score = keys.filter(key => placed[key] === answers[key]).length;
  const answered = keys.filter(key => placed[key] != null).length;
  const activePrompt = quiz.prompts[Math.min(activePromptIndex, Math.max(quiz.prompts.length - 1, 0))] || quiz.prompts[0];
  const promptFlow = quiz.prompts.map(item => ({
    id: item.slot,
    title: item.label,
    complete: placed[item.slot] != null,
    status: placed[item.slot] != null ? 'Answered' : 'Waiting for an answer',
  }));

  const handleDrop = (slotId, value) => {
    setChecked(false);
    setPlaced(prev => ({ ...prev, [slotId]: value }));
    setSelectedChip(null);
  };
  const handleClear = (slotId) => {
    setChecked(false);
    setPlaced(prev => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };
  const placeSelected = (slotId) => {
    if (placed[slotId] != null || selectedChip == null) return;
    handleDrop(slotId, selectedChip);
  };

  React.useEffect(() => {
    if (!sequence) return;

    sequence.registerControls({
      canBack: true,
      canNext: complete,
      backLabel: 'Back: Full Example',
      nextLabel: checked ? 'Next: Main Lesson' : complete ? 'Check answers' : 'Answer prompts',
      status: checked ? `${score}/${keys.length} correct` : `${answered}/${keys.length} answered`,
      onBack: sequence.goPrevPage,
      onNext: () => {
        if (!checked) setChecked(true);
        else sequence.goNextPage();
      },
    });
  }, [sequence, complete, checked, score, answered, keys.length]);

  return (
    <TBQuizFrame title={quiz.title} prompt={quiz.prompt}>
      <FuncsQuizWorkspace
        codeTitle="Program.cs"
        code={lesson.fullExample.code}
        tokens={lesson.fullExample.tokens}
        definitions={lesson.fullExample.definitions}
        flowItems={promptFlow}
        activeIndex={activePromptIndex}
        onActiveIndex={setActivePromptIndex}
        support={(
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 7 }}>
            <span style={{ ...secLabelStyle, marginBottom: 0, marginRight: 4 }}>Answer chips</span>
            {bank.map((value, i) => (
              <FuncsReusableChip
                key={value + '-' + i}
                value={value}
                selected={selectedChip === value}
                onSelect={(nextValue) => setSelectedChip(prev => prev === nextValue ? null : nextValue)}
              />
            ))}
          </div>
        )}
      >
        {activePrompt && (
          <React.Fragment>
            <div style={secLabelStyle}>{activePrompt.label}</div>
            <div style={{ fontSize: 14.5, lineHeight: 1.45, color: '#334155', fontWeight: 700 }}>{activePrompt.prompt}</div>
            <div style={{ display: 'grid', gap: 9 }}>
              <span
                role="button"
                tabIndex={placed[activePrompt.slot] == null && selectedChip != null ? 0 : -1}
                aria-label={`Place selected answer in ${activePrompt.label}`}
                onClick={() => placeSelected(activePrompt.slot)}
                onKeyDown={(event) => {
                  if ((event.key === 'Enter' || event.key === ' ') && placed[activePrompt.slot] == null && selectedChip != null) {
                    event.preventDefault();
                    placeSelected(activePrompt.slot);
                  }
                }}
                style={{ display: 'inline-flex', justifySelf: 'start', cursor: placed[activePrompt.slot] == null && selectedChip != null ? 'copy' : 'default' }}
              >
                <DropSlot
                  slotId={activePrompt.slot}
                  placed={placed[activePrompt.slot]}
                  correct={answers[activePrompt.slot]}
                  checked={checked}
                  onDrop={handleDrop}
                  onClear={handleClear}
                  label="answer"
                />
              </span>
              <span style={{ fontSize: 12.5, lineHeight: 1.4, color: '#64748b' }}>{activePrompt.hint}</span>
            </div>
            {selectedChip && placed[activePrompt.slot] == null && (
              <span style={{
                justifySelf: 'start',
                fontSize: 11.5,
                color: '#92400e',
                background: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: 5,
                padding: '3px 7px',
              }}>Click the answer slot to place {selectedChip}.</span>
            )}
          </React.Fragment>
        )}
      </FuncsQuizWorkspace>
      </TBQuizFrame>
  );
}

function FuncsEmbeddedExample({ cycle, lesson }) {
  const { TBMemoryMini } = window;
  const [expanded, setExpanded] = React.useState(null);
  const [activeDef, setActiveDef] = React.useState(null);
  const tokenSpec = funcsNormalizeTokenSpec(lesson.fullExample.code, lesson.fullExample.tokens, lesson.fullExample.definitions);

  return (
    <div style={{ border: '1px solid #dbe4ef', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
      <div style={{ padding: '8px 10px', borderBottom: '1px solid #edf2f7', background: '#f8fafc' }}>
        <div style={{ fontSize: 9.5, fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Embedded example
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 800, color: '#1e293b' }}>{cycle.title}</div>
      </div>
      <div style={{ paddingTop: 6 }}>
        <FuncsCodeBlock
          code={cycle.code}
          translations={cycle.translations}
          tokens={lesson.fullExample.code?.tokens || lesson.fullExample.tokens}
          definitions={lesson.fullExample.definitions}
          expandable
          expandedLine={expanded}
          onToggleLine={(key) => setExpanded(prev => prev === key ? null : key)}
          onDefinition={setActiveDef}
        />
      </div>
      <div style={{ padding: '0 12px 12px' }}>
        <TBMemoryMini rows={cycle.memory} />
      </div>
      <div style={{ borderTop: '1px solid #edf2f7', padding: '7px 10px', background: '#fbfcfe', color: '#64748b', fontSize: 12 }}>
        {activeDef ? (
          <span><strong style={{ color: '#1e293b' }}>{activeDef}:</strong> {tokenSpec[activeDef]?.description}</span>
        ) : (
          <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Hover a token for a definition. Click a line for translation.</span>
        )}
      </div>
    </div>
  );
}

function FuncsMainLessonPage({ lesson: lessonFixture }) {
  const lesson = lessonFixture.mainLesson;

  return (
    <div style={{ height: '100%', overflow: 'auto', background: '#fff', fontFamily: "'Source Sans 3', sans-serif" }}>
      <style>{`
        @media (max-width: 820px) {
          .funcs-main-lesson-act {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: 970, margin: '0 auto', padding: '22px 30px 34px' }}>
        <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb', marginBottom: 6 }}>
          {lesson.label}
        </div>
        <h2 style={{ margin: 0, fontSize: 24, lineHeight: 1.1, color: '#0f172a' }}>{lesson.title}</h2>
        <p style={{ margin: '8px 0 20px', fontSize: 14.5, lineHeight: 1.6, color: '#475569' }}>{lesson.intro}</p>
        <div style={{ display: 'grid', gap: 24 }}>
          {lesson.acts.map((cycle) => (
            <section key={cycle.title} className="funcs-main-lesson-act" style={{ borderTop: '1px solid #e2e8f0', paddingTop: 20, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 22, alignItems: 'start' }}>
              <div>
                <span style={{ display: 'inline-block', marginBottom: 7, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#2563eb', background: '#dbeafe', borderRadius: 4, padding: '2px 7px', fontWeight: 800 }}>
                  act {cycle.n}
                </span>
                <h3 style={{ margin: 0, fontSize: 18, lineHeight: 1.2, color: '#1e293b' }}>{cycle.title}</h3>
                <div style={{ display: 'grid', gap: 9, marginTop: 12 }}>
                  {cycle.body.map((point) => (
                    <p key={point} style={{ margin: 0, fontSize: 14, lineHeight: 1.58, color: '#334155' }}>{point}</p>
                  ))}
                </div>
              </div>
              <FuncsEmbeddedExample cycle={cycle} lesson={lessonFixture} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function FuncsRigorousQuizPage({ sequence, lesson }) {
  const { TBQuizFrame, DropSlot, DragChip, secLabelStyle } = window;
  const quiz = lesson.rigorousQuiz;
  const transferLines = funcsNormalizeCodeLines(quiz.transferCode);
  const columns = quiz.columns || Object.keys(quiz.stateRows?.[0] || {}).filter(key => key !== 'after');
  const fillInCodeBlocks = funcsNormalizeFillInCodeBlocks(quiz.fillInCode);
  const translationRows = transferLines.map((line, i) => ({
    slot: `tr${i + 1}`,
    code: line.text,
    answer: quiz.translations[i]?.id,
  })).filter(row => row.answer);
  const answers = { ...quiz.outputAnswers, ...funcsFillInCodeAnswers(fillInCodeBlocks) };
  quiz.stateRows.forEach((row) => {
    columns.forEach((col) => { answers[`st-${row.after}-${col}`] = row[col]; });
  });
  translationRows.forEach((row) => { answers[row.slot] = row.answer; });

  const [placed, setPlaced] = React.useState({});
  const [checked, setChecked] = React.useState(false);
  const keys = Object.keys(answers);
  const complete = keys.every(key => placed[key] != null);
  const score = keys.filter(key => placed[key] === answers[key]).length;
  const answered = keys.filter(key => placed[key] != null).length;
  const usedTranslations = translationRows.map(row => placed[row.slot]).filter(Boolean);
  const valueChoices = quiz.valueChoices || ['true', 'false', '-'];
  const outputChoices = quiz.outputChoices || ['true', 'false', '(no output)'];
  const reasonChoices = quiz.reasonChoices || [];
  const stateSlots = quiz.stateRows.flatMap(row => columns.map(col => `st-${row.after}-${col}`));
  const translationSlots = translationRows.map(row => row.slot);
  const outputSlots = Object.keys(quiz.outputAnswers || {});
  const fillInFlow = fillInCodeBlocks.map(block => {
    const slots = Object.keys(funcsFillInCodeAnswers([block]));
    const done = slots.filter(slot => placed[slot] != null).length;
    return {
      id: `fill-${block.id}`,
      title: block.title || 'Fill In Code',
      complete: slots.length > 0 && done === slots.length,
      status: `${done}/${slots.length} answered`,
      type: 'fillInCode',
      block,
      slots,
    };
  });
  const quizFlow = [
    {
      id: 'state-table',
      title: 'State Table',
      complete: stateSlots.length > 0 && stateSlots.every(slot => placed[slot] != null),
      status: `${stateSlots.filter(slot => placed[slot] != null).length}/${stateSlots.length} answered`,
      type: 'state',
    },
    {
      id: 'line-translations',
      title: 'Line Translations',
      complete: translationSlots.length > 0 && translationSlots.every(slot => placed[slot] != null),
      status: `${translationSlots.filter(slot => placed[slot] != null).length}/${translationSlots.length} answered`,
      type: 'translations',
    },
    {
      id: 'output-explanation',
      title: 'Output',
      complete: outputSlots.length > 0 && outputSlots.every(slot => placed[slot] != null),
      status: `${outputSlots.filter(slot => placed[slot] != null).length}/${outputSlots.length} answered`,
      type: 'output',
    },
    ...fillInFlow,
  ].filter(item => item.type !== 'output' || outputSlots.length > 0);
  const [activeFlowIndex, setActiveFlowIndex] = React.useState(0);
  const activeQuizFlow = quizFlow[Math.min(activeFlowIndex, Math.max(quizFlow.length - 1, 0))] || quizFlow[0];

  const handleDrop = (slotId, value) => {
    setChecked(false);
    setPlaced(prev => {
      const next = { ...prev };
      if (slotId.startsWith('tr')) {
        Object.keys(next).forEach(key => {
          if (key.startsWith('tr') && next[key] === value) delete next[key];
        });
      }
      next[slotId] = value;
      return next;
    });
  };
  const handleClear = (slotId) => {
    setChecked(false);
    setPlaced(prev => {
      const next = { ...prev };
      delete next[slotId];
      return next;
    });
  };

  const renderStateTable = () => (
    <section className="funcs-rigorous-state-table" style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'auto', background: '#fff' }}>
      <div style={{ padding: '10px 12px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div style={secLabelStyle}>State Table</div>
        <div style={{ fontSize: 12.5, color: '#64748b' }}>Fill memory after each line runs.</div>
      </div>
      <div style={{ minWidth: Math.max(260, 70 + columns.length * 100) }}>
        <div style={{ display: 'grid', gridTemplateColumns: `70px repeat(${columns.length}, minmax(88px, 1fr))`, background: '#fbfcfe', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ padding: 8, fontSize: 10, color: '#94a3b8', fontWeight: 800 }}>After</div>
          {columns.map(col => <div key={col} style={{ padding: 8, fontSize: 10, color: '#94a3b8', fontWeight: 800 }}>{col}</div>)}
        </div>
        {quiz.stateRows.map((row) => (
          <div key={row.after} style={{ display: 'grid', gridTemplateColumns: `70px repeat(${columns.length}, minmax(88px, 1fr))`, borderTop: '1px solid #f1f5f9', alignItems: 'center', fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
            <div style={{ padding: 8, color: '#64748b' }}>{row.after}</div>
            {columns.map(col => {
              const slot = `st-${row.after}-${col}`;
              return (
                <div key={slot} style={{ padding: 7 }}>
                  <DropSlot slotId={slot} placed={placed[slot]} correct={answers[slot]} checked={checked} onDrop={handleDrop} onClear={handleClear} label="value" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );

  const renderTranslations = () => (
    <section style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, background: '#fff' }}>
      <div style={secLabelStyle}>Line Translations</div>
      <div style={{ display: 'grid', gap: 10 }}>
        {translationRows.map((row, i) => (
          <div key={row.slot} style={{ border: '1px solid #edf2f7', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
            <div className="funcs-rigorous-translation-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1fr) minmax(118px, 170px)', alignItems: 'center' }}>
              <div style={{ padding: '9px 10px', background: '#f8fafc', fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, whiteSpace: 'normal', overflowWrap: 'anywhere', lineHeight: 1.45 }}>
                <span style={{ color: '#94a3b8', marginRight: 8 }}>{i + 1}</span>{row.code}
              </div>
              <div style={{ padding: 8 }}>
                <DropSlot slotId={row.slot} placed={placed[row.slot]} correct={answers[row.slot]} checked={checked} onDrop={handleDrop} onClear={handleClear} label="letter" />
              </div>
            </div>
            <div style={{ borderTop: '1px solid #edf2f7', background: '#fbfcfe', padding: 9, display: 'grid', gap: 7 }}>
              {quiz.translations.map(item => (
                <div key={`${row.slot}-${item.id}`} style={{ display: 'grid', gridTemplateColumns: '40px minmax(0, 1fr)', gap: 8, alignItems: 'start', opacity: usedTranslations.includes(item.id) && placed[row.slot] !== item.id ? 0.42 : 1 }}>
                  <DragChip value={item.id} label={item.id} used={usedTranslations.includes(item.id) && placed[row.slot] !== item.id} />
                  <div style={{ fontSize: 12.2, lineHeight: 1.35, color: '#475569' }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderOutput = () => (
    <section style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, background: '#fff' }}>
      <div style={secLabelStyle}>Output And Explanation</div>
      <div className="funcs-rigorous-output-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 14, alignItems: 'start' }}>
        {'output' in answers && (
          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ fontSize: 13.5, color: '#334155' }}>What does the program print?</div>
            <DropSlot slotId="output" placed={placed.output} correct={answers.output} checked={checked} onDrop={handleDrop} onClear={handleClear} label="output" />
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {outputChoices.map(value => <FuncsReusableChip key={value} value={value} />)}
            </div>
          </div>
        )}
        {'why' in answers && (
          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ fontSize: 13.5, color: '#334155' }}>{quiz.reasonPrompt || 'Why does the value stay that way?'}</div>
            <DropSlot slotId="why" placed={placed.why} correct={answers.why} checked={checked} onDrop={handleDrop} onClear={handleClear} label="reason" />
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {reasonChoices.map(value => <FuncsReusableChip key={value} value={value} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );

  const renderActiveRigorousFlow = () => {
    if (activeQuizFlow?.type === 'state') return renderStateTable();
    if (activeQuizFlow?.type === 'translations') return renderTranslations();
    if (activeQuizFlow?.type === 'output') return renderOutput();
    if (activeQuizFlow?.type === 'fillInCode') {
      return (
        <FuncsFillInCodeQuizBlock
          block={activeQuizFlow.block}
          placed={placed}
          checked={checked}
          onDrop={handleDrop}
          onClear={handleClear}
        />
      );
    }
    return null;
  };

  React.useEffect(() => {
    if (!sequence) return;

    sequence.registerControls({
      canBack: true,
      canNext: complete,
      backLabel: 'Back: Main Lesson',
      nextLabel: checked ? 'Next: Exercises' : complete ? 'Check answers' : 'Complete quiz',
      status: checked ? `${score}/${keys.length} correct` : `${answered}/${keys.length} answered`,
      onBack: sequence.goPrevPage,
      onNext: () => {
        if (!checked) setChecked(true);
        else sequence.goNextPage();
      },
    });
  }, [sequence, complete, checked, score, answered, keys.length]);

  return (
    <TBQuizFrame title={quiz.title} prompt={quiz.prompt}>
      <style>{`
        @media (max-width: 640px) {
          .funcs-rigorous-translation-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      <FuncsQuizWorkspace
        codeTitle="Transfer Program"
        code={quiz.transferCode}
        tokens={lesson.fullExample.code?.tokens || lesson.fullExample.tokens}
        definitions={lesson.fullExample.definitions}
        flowItems={quizFlow}
        activeIndex={Math.min(activeFlowIndex, Math.max(quizFlow.length - 1, 0))}
        onActiveIndex={setActiveFlowIndex}
        support={(
          <div style={{ display: 'grid', gap: 8 }}>
            <div style={secLabelStyle}>Reusable Values</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {valueChoices.map(value => <FuncsReusableChip key={value} value={value} />)}
            </div>
          </div>
        )}
      >
        {renderActiveRigorousFlow()}
      </FuncsQuizWorkspace>
    </TBQuizFrame>
  );
}

function FuncsExercisesPage({ sequence, lesson }) {
  const { secLabelStyle } = window;
  const exerciseSet = lesson.exercises;
  const exercises = exerciseSet.items;
  const [expanded, setExpanded] = React.useState(exercises[0].number);
  const openCount = expanded ? 1 : 0;

  React.useEffect(() => {
    if (!sequence) return;

    sequence.registerControls({
      canBack: true,
      canNext: false,
      backLabel: 'Back: Rigorous Quiz',
      nextLabel: 'Done',
      status: `${exercises.length} exercises`,
      onBack: sequence.goPrevPage,
    });
  }, [sequence, exercises.length]);

  return (
    <div style={{ height: '100%', overflow: 'auto', background: '#fff', fontFamily: "'Source Sans 3', sans-serif" }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '22px 30px 34px' }}>
        <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb', marginBottom: 6 }}>
          {exerciseSet.label}
        </div>
        <h2 style={{ margin: 0, fontSize: 24, lineHeight: 1.1, color: '#0f172a' }}>{exerciseSet.title}</h2>
        <p style={{ margin: '8px 0 20px', fontSize: 14.5, lineHeight: 1.55, color: '#475569', maxWidth: 760 }}>
          {exerciseSet.intro}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
          {exercises.map((exercise) => {
            const isOpen = expanded === exercise.number;
            return (
              <section key={exercise.number} style={{
                border: `1px solid ${isOpen ? '#93c5fd' : '#e2e8f0'}`,
                borderRadius: 8,
                overflow: 'hidden',
                background: isOpen ? '#f8fbff' : '#fff',
                boxShadow: isOpen ? '0 8px 22px rgba(37, 99, 235, 0.08)' : 'none',
              }}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(prev => prev === exercise.number ? null : exercise.number)}
                  style={{ width: '100%', border: 'none', background: 'transparent', padding: 12, display: 'grid', gridTemplateColumns: '40px 1fr', gap: 10, textAlign: 'left', cursor: 'pointer' }}
                >
                  <span style={{ width: 32, height: 32, borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: isOpen ? '#2563eb' : '#eff6ff', color: isOpen ? '#fff' : '#2563eb', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 800 }}>
                    {exercise.number}
                  </span>
                  <span style={{ display: 'grid', gap: 4, minWidth: 0 }}>
                    <span style={{ fontSize: 16, lineHeight: 1.15, color: '#1e293b', fontWeight: 800 }}>{exercise.title}</span>
                    <span style={{ fontSize: 12.5, lineHeight: 1.35, color: '#64748b' }}>{exercise.summary}</span>
                    {exercise.sample && (
                      <span style={{ marginTop: 2, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#475569', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 5, padding: '5px 7px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {exercise.sample}
                      </span>
                    )}
                  </span>
                </button>
                {isOpen && (
                  <div style={{ borderTop: '1px solid #dbeafe', padding: '12px 14px 14px', display: 'grid', gap: 12, background: '#fff' }}>
                    <div>
                      <div style={secLabelStyle}>Problem</div>
                      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: '#334155' }}>{exercise.prompt}</p>
                    </div>
                    {exercise.starter && (
                      <div>
                        <div style={secLabelStyle}>Starter Code</div>
                        <div style={{ border: '1px solid #e2e8f0', borderRadius: 7, background: '#f8fafc', padding: '8px 10px', display: 'grid', gap: 4 }}>
                          {exercise.starter.map((line, i) => (
                            <div key={`${line}-${i}`} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#1e293b' }}>
                              <span style={{ color: '#94a3b8', textAlign: 'right' }}>{i + 1}</span>
                              <span>{line}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <div style={secLabelStyle}>Constraints</div>
                      <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 5, fontSize: 12.8, lineHeight: 1.4, color: '#475569' }}>
                        {exercise.constraints.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
        <div style={{ marginTop: 14, fontSize: 12, color: '#64748b', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 7, padding: '9px 11px' }}>
          Open exercises: {openCount}. These prompts are meant to become real programming tasks later; this pass establishes the lesson section and interaction pattern.
        </div>
      </div>
    </div>
  );
}

const FUNCS_DEFAULT_LESSON_RENDERERS = {
  fullExample: FuncsFullExamplePage,
  preQuiz: FuncsPreQuizPage,
  mainLesson: FuncsMainLessonPage,
  rigorousQuiz: FuncsRigorousQuizPage,
  exercises: FuncsExercisesPage,
};

function funcsValidateStackedEvaluationDetail(detail) {
  const missing = [];

  if (!detail || typeof detail !== 'object') {
    return { valid: false, missing: ['evalDetail'], stepCount: 0, frameCount: 0 };
  }

  for (const field of FUNCS_EVALUATION_STEP_INTERACTION.requiredDetailFields) {
    if (detail[field] == null) missing.push(field);
  }

  if (!Array.isArray(detail.steps) || detail.steps.length === 0) {
    missing.push('steps[]');
  }

  const hasFrames = Array.isArray(detail.frames) && detail.frames.length > 0;
  const hasBlocks = Array.isArray(detail.blocks) && detail.blocks.length > 0;

  if (!hasFrames && !hasBlocks) {
    missing.push('frames[] or blocks[]');
  }

  return {
    valid: missing.length === 0,
    missing,
    stepCount: Array.isArray(detail.steps) ? detail.steps.length : 0,
    frameCount: hasFrames ? detail.frames.length : hasBlocks ? detail.blocks.length : 0,
  };
}

function funcsFrameSpan(x, text, span, cw) {
  const [start, end] = span || [0, Math.max(0, text.length)];
  return {
    start: x + start * cw,
    end: x + end * cw,
    center: x + ((start + end) / 2) * cw,
  };
}

function funcsLevelShowAt(level, fallback = 0) {
  return level.showAt ?? fallback;
}

function funcsActiveAt(def, fallback) {
  return def?.activeAt || [def?.showAt ?? fallback ?? 0];
}

function funcsSlotExpression(slot) {
  return typeof slot === 'string' ? slot : slot?.expression || '';
}

function funcsStackLayoutSlots(slots, startX, cw) {
  const positions = [];

  slots.forEach((slot, index) => {
    const text = funcsSlotExpression(slot);
    if (index === 0) {
      positions[index] = startX;
      return;
    }

    const prevSlot = slots[index - 1];
    const prevText = funcsSlotExpression(prevSlot);
    const prevX = positions[index - 1];
    const span = funcsFrameSpan(
      prevX,
      prevText,
      prevSlot?.evalSpan || prevSlot?.span || [0, prevText.length],
      cw
    );

    positions[index] = span.center - (text.length * cw) / 2;
  });

  return positions;
}

function FuncsVerticalStackEvaluationScene({ detail, subStep }) {
  const cw = detail.charWidth || 7.7;
  const fontSize = detail.fontSize || 13.2;
  const levelGap = detail.levelGap || 32;
  const maxVisibleLevels = Math.max(
    1,
    ...(detail.blocks || []).map(block => (block.levels || []).filter(level => funcsLevelShowAt(level, block.showAt ?? 0) <= subStep).length)
  );
  const baseY = detail.baseY || Math.max(124, 42 + (maxVisibleLevels - 1) * levelGap);
  const lineOffset = detail.lineOffset || 18;
  const blockPad = detail.blockPad || 30;
  const arrowWidth = detail.arrowWidth || 28;
  const active = detail.activeColor || '#c65d3a';
  const inactive = detail.inactiveColor || '#c8bdad';
  const strike = detail.strikeColor || '#b84747';
  const mutedText = detail.mutedTextColor || '#b8ad9d';
  const mutedLine = detail.mutedLineColor || '#d8cfbf';
  const visibleBlocks = (detail.blocks || []).filter(block => (block.showAt ?? 0) <= subStep);

  let x = detail.leftPad || 28;
  const renderItems = [];

  for (const [blockIndex, block] of visibleBlocks.entries()) {
    const levels = (block.levels || []).filter(level => funcsLevelShowAt(level, block.showAt ?? 0) <= subStep);
    if (!levels.length) continue;

    const positions = [];
    const stackSlots = block.slots || detail.stackSlots || detail.slots || [];
    const slotPositions = funcsStackLayoutSlots(stackSlots, x, cw);
    let minX = x;
    let maxX = x;

    stackSlots.forEach((slot, slotIndex) => {
      const text = funcsSlotExpression(slot);
      const slotX = slotPositions[slotIndex] ?? x;
      minX = Math.min(minX, slotX);
      maxX = Math.max(maxX, slotX + text.length * cw);

      if (slot.evalSpan || slot.span) {
        const span = funcsFrameSpan(slotX, text, slot.evalSpan || slot.span, cw);
        minX = Math.min(minX, span.start);
        maxX = Math.max(maxX, span.end);
      }
    });

    levels.forEach((level, levelIndex) => {
      const text = level.expression || '';
      if (level.slot != null && slotPositions[level.slot] != null) {
        const slot = stackSlots[level.slot] || {};
        const slotText = funcsSlotExpression(slot);
        const slotX = slotPositions[level.slot];
        positions[levelIndex] = level.slotAlign === 'start'
          ? slotX
          : slotX + ((slotText.length - text.length) * cw) / 2;
      } else if (levelIndex === 0) {
        positions[levelIndex] = x;
      } else {
        const prev = levels[levelIndex - 1];
        const prevText = prev.expression || '';
        const prevX = positions[levelIndex - 1];
        const prevSpan = funcsFrameSpan(prevX, prevText, prev.evalSpan || prev.span || [0, prevText.length], cw);
        positions[levelIndex] = prevSpan.center - (text.length * cw) / 2;
      }

      const currentX = positions[levelIndex];
      minX = Math.min(minX, currentX);
      maxX = Math.max(maxX, currentX + text.length * cw);

      if (level.evalSpan || level.span) {
        const span = funcsFrameSpan(currentX, text, level.evalSpan || level.span, cw);
        minX = Math.min(minX, span.start);
        maxX = Math.max(maxX, span.end);
      }
      if (level.strike) {
        const span = funcsFrameSpan(currentX, text, level.strike.span, cw);
        minX = Math.min(minX, span.start);
        maxX = Math.max(maxX, span.end);
      }
    });

    const shift = minX < x ? x - minX : 0;
    const blockRight = maxX + shift;

    levels.forEach((level, levelIndex) => {
      const y = baseY - levelIndex * levelGap;
      const text = level.expression || '';
      const levelX = positions[levelIndex] + shift;
      const slot = level.slot != null ? stackSlots[level.slot] || null : null;
      const slotText = funcsSlotExpression(slot);
      const inheritedSlotLine = slot
        && level.inheritSlotLine !== false
        && !level.evalSpan
        && !level.span
        && text === slotText
        && (slot.evalSpan || slot.span);
      const levelActive = funcsActiveAt(level, funcsLevelShowAt(level, block.showAt ?? 0)).includes(subStep);
      const textColor = levelActive ? active : mutedText;

      renderItems.push(
        <text
          key={`vtext-${blockIndex}-${levelIndex}`}
          x={levelX}
          y={y}
          fontSize={fontSize}
          fontWeight={levelActive ? 700 : 500}
          fill={textColor}
        >
          {text}
        </text>
      );

      if (level.evalSpan || level.span || inheritedSlotLine) {
        const lineSpan = level.evalSpan || level.span || inheritedSlotLine.evalSpan || inheritedSlotLine.span;
        const lineLabel = level.label ?? inheritedSlotLine?.label;
        const lineShowAt = level.lineShowAt ?? inheritedSlotLine?.lineShowAt ?? funcsLevelShowAt(level, block.showAt ?? 0);
        if (lineShowAt <= subStep) {
          const span = funcsFrameSpan(levelX, text, lineSpan, cw);
          const lineActive = (level.lineActiveAt || inheritedSlotLine?.lineActiveAt || level.activeAt || [lineShowAt]).includes(subStep);
          const lineColor = lineActive ? active : mutedLine;

          renderItems.push(
            <g key={`vline-${blockIndex}-${levelIndex}`}>
              <line
                x1={span.start}
                y1={y - lineOffset}
                x2={span.end}
                y2={y - lineOffset}
                stroke={lineColor}
                strokeWidth={lineActive ? 2.25 : 1.35}
                strokeLinecap="round"
              />
              {lineLabel && (
                <text
                  x={span.start - 6}
                  y={y - lineOffset + 1}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize="9.5"
                  fontStyle="italic"
                  fontWeight="800"
                  fontFamily="'Source Sans 3', sans-serif"
                  fill={lineActive ? active : inactive}
                >
                  {lineLabel}
                </text>
              )}
            </g>
          );
        }
      }

      if (level.strike && (level.strike.showAt ?? 0) <= subStep) {
        const span = funcsFrameSpan(levelX, text, level.strike.span || [0, text.length], cw);
        const isCurrentStrike = funcsActiveAt(level.strike, level.strike.showAt).includes(subStep);

        renderItems.push(
          <line
            key={`vstrike-${blockIndex}-${levelIndex}`}
            x1={span.start}
            y1={y - 6}
            x2={span.end}
            y2={y - 6}
            stroke={isCurrentStrike ? strike : mutedLine}
            strokeWidth={isCurrentStrike ? 2.35 : 1.35}
            strokeLinecap="round"
            opacity={0.9}
          />
        );
      }
    });

    const arrow = block.arrowAfter;
    if (arrow && (arrow.showAt ?? 0) <= subStep) {
      const isCurrentArrow = funcsActiveAt(arrow, arrow.showAt).includes(subStep);
      const color = isCurrentArrow ? active : inactive;
      const arrowY = baseY - (arrow.level ?? 0) * levelGap - 10;
      const arrowX = blockRight + blockPad;

      renderItems.push(
        <g key={`varrow-${blockIndex}`}>
          <text
            x={arrowX + 10}
            y={arrowY - 11}
            textAnchor="middle"
            fontSize="9"
            fontStyle="italic"
            fontFamily="'Source Sans 3', sans-serif"
            fill={color}
          >
            {arrow.label || 'subst.'}
          </text>
          <text x={arrowX} y={arrowY} fontSize="17" fill={color} fontWeight="bold">→</text>
        </g>
      );
      x = arrowX + arrowWidth;
    } else {
      x = blockRight + blockPad;
    }
  }

  const canvasWidth = Math.max(detail.minCanvasWidth || 760, x + 34);
  const canvasHeight = Math.max(168, baseY + 34);

  return (
    <svg
      width={canvasWidth}
      height={canvasHeight}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: 0,
        flex: '0 0 auto',
        minWidth: canvasWidth,
      }}
    >
      <defs>
        <pattern id="funcs-vertical-eval-grid" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="0.7" fill="#efe8db" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="#fffdf8" rx="5" />
      <rect width="100%" height="100%" fill="url(#funcs-vertical-eval-grid)" rx="5" opacity="0.75" />
      {renderItems}
    </svg>
  );
}

function FuncsStackedEvaluationScene({ detail, subStep }) {
  if (detail.layout === 'verticalStack' && Array.isArray(detail.blocks) && detail.blocks.length) {
    return <FuncsVerticalStackEvaluationScene detail={detail} subStep={subStep} />;
  }

  const cw = detail.charWidth || 8.8;
  const y = 108;
  const lift = 38;
  const lineOffset = 22;
  const pad = 40;
  const arrowWidth = 36;
  const active = '#2563eb';
  const inactive = '#cbd5e1';
  const strike = '#dc2626';
  const visibleFrames = (detail.frames || []).filter(frame => (frame.showAt ?? 0) <= subStep);

  let x = 38;
  const renderItems = [];

  for (const [index, frame] of visibleFrames.entries()) {
    const width = Math.max(frame.expression.length * cw, 18);
    const isCurrentFrame = (frame.activeAt || [frame.showAt ?? 0]).includes(subStep);
    const textColor = isCurrentFrame ? active : inactive;

    renderItems.push(
      <text
        key={`frame-${index}`}
        x={x}
        y={y}
        fontSize="14.5"
        fontWeight={isCurrentFrame ? 700 : 500}
        fill={textColor}
      >
        {frame.expression}
      </text>
    );

    for (const [stackIndex, stack] of (frame.stack || []).entries()) {
      if ((stack.showAt ?? 0) > subStep) continue;
      const span = funcsFrameSpan(x, frame.expression, stack.span, cw);
      const isCurrentStack = (stack.activeAt || [stack.showAt ?? 0]).includes(subStep);
      const color = isCurrentStack ? active : inactive;
      const strokeColor = isCurrentStack ? active : '#e2e8f0';

      renderItems.push(
        <g key={`stack-${index}-${stackIndex}`}>
          <line
            x1={span.start}
            y1={y - lineOffset}
            x2={span.end}
            y2={y - lineOffset}
            stroke={strokeColor}
            strokeWidth={isCurrentStack ? 2.4 : 1.4}
            strokeLinecap="round"
          />
          {stack.label && (
            <text
              x={span.start - 6}
              y={y - lineOffset + 1}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize="10"
              fontStyle="italic"
              fontWeight="700"
              fontFamily="'Source Sans 3', sans-serif"
              fill={color}
            >
              {stack.label}
            </text>
          )}
          <text
            x={span.center}
            y={y - lift}
            textAnchor="middle"
            fontSize="14.5"
            fontWeight={isCurrentStack ? 700 : 500}
            fill={color}
          >
            {stack.value}
          </text>
        </g>
      );
    }

    if (frame.strike && (frame.strike.showAt ?? 0) <= subStep) {
      const span = funcsFrameSpan(x, frame.expression, frame.strike.span, cw);
      const isCurrentStrike = (frame.strike.activeAt || [frame.strike.showAt ?? 0]).includes(subStep);

      renderItems.push(
        <line
          key={`strike-${index}`}
          x1={span.start}
          y1={y - 6}
          x2={span.end}
          y2={y - 6}
          stroke={isCurrentStrike ? strike : '#e2e8f0'}
          strokeWidth={isCurrentStrike ? 2.4 : 1.4}
          strokeLinecap="round"
          opacity={0.9}
        />
      );
    }

    x += width + pad;

    if (frame.arrowAfter && (frame.arrowAfter.showAt ?? 0) <= subStep) {
      const isCurrentArrow = (frame.arrowAfter.activeAt || [frame.arrowAfter.showAt ?? 0]).includes(subStep);
      const color = isCurrentArrow ? active : inactive;

      renderItems.push(
        <g key={`arrow-${index}`}>
          <text
            x={x + 11}
            y={y - 22}
            textAnchor="middle"
            fontSize="9.5"
            fontStyle="italic"
            fontFamily="'Source Sans 3', sans-serif"
            fill={color}
          >
            {frame.arrowAfter.label || 'subst.'}
          </text>
          <text x={x} y={y - 10} fontSize="18" fill={color} fontWeight="bold">→</text>
        </g>
      );
      x += arrowWidth;
    }
  }

  const canvasWidth = Math.max(detail.minCanvasWidth || 760, x + 48);

  return (
    <svg
      width={canvasWidth}
      height={162}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: 0,
        flex: '0 0 auto',
        minWidth: canvasWidth,
      }}
    >
      <rect width="100%" height="100%" fill="#fafbfc" rx="5" />
      {renderItems}
    </svg>
  );
}

function FuncsStackedEvaluationDetail({ detail, onClose }) {
  const [sub, setSub] = React.useState(0);
  const sceneScrollRef = React.useRef(null);
  const validation = funcsValidateStackedEvaluationDetail(detail);
  const maxSub = Math.max(0, (validation.stepCount || 1) - 1);

  React.useEffect(() => {
    setSub(0);
  }, [detail]);

  React.useEffect(() => {
    if (!validation.valid) return undefined;

    const handleKey = (event) => {
      if (event.key === 'ArrowRight') {
        event.stopImmediatePropagation();
        setSub(prev => Math.min(maxSub, prev + 1));
      }
      if (event.key === 'ArrowLeft') {
        event.stopImmediatePropagation();
        setSub(prev => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [validation.valid, maxSub]);

  React.useEffect(() => {
    const scroller = sceneScrollRef.current;
    if (!scroller) return undefined;

    const frame = window.requestAnimationFrame(() => {
      const svg = scroller.querySelector('svg');
      const drawnElements = svg ? Array.from(svg.querySelectorAll('text,line')) : [];
      const scrollerBox = scroller.getBoundingClientRect();
      const rightMostDrawn = drawnElements.reduce((right, element) => {
        try {
          if (typeof element.getBBox === 'function') {
            const box = element.getBBox();
            return Math.max(right, box.x + box.width);
          }

          const box = element.getBoundingClientRect();
          return Math.max(right, box.right - scrollerBox.left + scroller.scrollLeft);
        } catch (error) {
          return right;
        }
      }, 0);
      const targetLeft = Math.max(0, Math.min(
        rightMostDrawn + 24 - scroller.clientWidth,
        scroller.scrollWidth - scroller.clientWidth
      ));

      if (scroller.scrollWidth <= scroller.clientWidth || targetLeft <= 0) {
        scroller.scrollLeft = 0;
        return;
      }

      scroller.scrollTo({
        left: targetLeft,
        behavior: sub === 0 ? 'auto' : 'smooth',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [detail, sub]);

  if (!validation.valid) {
    return (
      <div style={{
        border: '1px dashed #cbd5e1',
        borderRadius: 7,
        padding: 14,
        color: '#94a3b8',
        fontSize: 13,
        fontStyle: 'italic',
      }}>
        Evaluation detail is missing stacked steps: {validation.missing.join(', ')}
      </div>
    );
  }

  const current = detail.steps[sub];
  const btnBase = {
    border: '1px solid #cbd5e1',
    borderRadius: 5,
    background: '#fff',
    color: '#475569',
    padding: '5px 9px',
    fontSize: 11.5,
    fontWeight: 800,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  };

  return (
    <div style={{
      border: '1px solid #bfdbfe',
      borderRadius: 8,
      overflow: 'hidden',
      background: '#fff',
      display: 'grid',
      minHeight: 0,
    }}>
      <div style={{
        padding: '8px 10px',
        borderBottom: '1px solid #dbeafe',
        background: '#f8fafc',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 10,
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 9.5, fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Evaluation Detail
          </div>
          <div style={{ fontSize: 12.5, color: '#1e293b', fontWeight: 800 }}>{detail.title}</div>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} style={{
            ...btnBase,
            borderColor: '#bfdbfe',
            color: '#1d4ed8',
            background: '#eff6ff',
          }}>
            Memory
          </button>
        )}
      </div>
      <div style={{ padding: 14, display: 'grid', gap: 10, minHeight: 0 }}>
        <div style={{
          padding: '6px 10px',
          borderRadius: 5,
          background: '#f0f7ff',
          border: '1px solid #dbeafe',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
        }}>
          <span style={{
            fontSize: 8.5,
            fontWeight: 800,
            color: '#94a3b8',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}>from</span>
          <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#475569' }}>
            {detail.sourceLine}
          </code>
        </div>
        <div style={{
          minHeight: 50,
          padding: '8px 10px',
          borderRadius: 6,
          background: sub === maxSub ? '#ecfdf5' : '#fffbeb',
          border: `1px solid ${sub === maxSub ? '#bbf7d0' : '#fde68a'}`,
          color: '#475569',
          fontSize: 12.5,
          lineHeight: 1.4,
        }}>
          <strong style={{ color: '#1e293b' }}>Step {sub + 1}:</strong> {current.note}
        </div>
        <div style={{
          minHeight: 172,
          overflowX: 'auto',
          overflowY: 'hidden',
          border: '1px solid #e2e8f0',
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: '#fafbfc',
        }} ref={sceneScrollRef}>
          <FuncsStackedEvaluationScene detail={detail} subStep={sub} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <button
            type="button"
            aria-label="Previous evaluation step"
            disabled={sub === 0}
            onClick={() => setSub(prev => Math.max(0, prev - 1))}
            style={{ ...btnBase, opacity: sub === 0 ? 0.35 : 1, cursor: sub === 0 ? 'default' : 'pointer' }}
          >
            Prev
          </button>
          <div style={{ flex: 1, display: 'flex', gap: 3 }}>
            {Array.from({ length: maxSub + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to evaluation step ${i + 1}`}
                onClick={() => setSub(i)}
                style={{
                  flex: 1,
                  height: 6,
                  border: 'none',
                  padding: 0,
                  borderRadius: 2,
                  background: i === sub ? '#2563eb' : i < sub ? '#1e293b' : '#e2e8f0',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#94a3b8',
            whiteSpace: 'nowrap',
          }}>{sub + 1}/{maxSub + 1}</span>
          <button
            type="button"
            aria-label="Next evaluation step"
            disabled={sub === maxSub}
            onClick={() => setSub(prev => Math.min(maxSub, prev + 1))}
            style={{
              ...btnBase,
              border: 'none',
              background: '#2563eb',
              color: '#fff',
              opacity: sub === maxSub ? 0.35 : 1,
              cursor: sub === maxSub ? 'default' : 'pointer',
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function funcsNormalizeLessonSections(lesson, renderers) {
  const sections = lesson.sections || FUNCS_DEFAULT_LESSON_SECTIONS;

  return sections.map((section) => {
    const Renderer = section.component || renderers[section.blockType];

    if (!Renderer) {
      throw new Error(`Missing renderer for lesson section "${section.id}" (${section.blockType}).`);
    }

    return {
      id: section.id,
      kicker: section.kicker,
      title: section.title,
      description: section.description,
      stepCount: section.stepCount ?? section.getStepCount?.(lesson),
      component: props => (
        <Renderer
          {...props}
          lesson={lesson}
          section={section}
          quizBlockTypes={FUNCS_QUIZ_BLOCK_TYPES}
          exerciseBlockTypes={FUNCS_EXERCISE_BLOCK_TYPES}
          evaluationInteraction={FUNCS_EVALUATION_STEP_INTERACTION}
          loopStepperInteraction={FUNCS_LOOP_STEPPER_INTERACTION}
        />
      ),
    };
  });
}

function funcsValidateConceptLesson(lesson) {
  const required = [
    'id',
    'chapterId',
    'source',
    'stableUrl',
    'title',
    'kicker',
    'chapterNav',
    'chapterExamples',
    'fullExample',
    'preQuiz',
    'mainLesson',
    'rigorousQuiz',
    'exercises',
  ];
  const missing = required.filter(key => lesson[key] == null);

  return {
    valid: missing.length === 0,
    missing,
  };
}

function ConceptLessonSequence({ lesson, renderers }) {
  const { TBPageSequence } = window;
  const validation = funcsValidateConceptLesson(lesson);

  if (!validation.valid) {
    return (
      <div style={{ padding: 24, color: '#991b1b', fontFamily: 'sans-serif' }}>
        Lesson fixture is missing: {validation.missing.join(', ')}
      </div>
    );
  }

  const pages = funcsNormalizeLessonSections(lesson, {
    ...FUNCS_DEFAULT_LESSON_RENDERERS,
    ...(renderers || {}),
  });

  return (
    <TBPageSequence
      kicker={lesson.kicker}
      title={lesson.title}
      chapterNav={lesson.chapterNav}
      learningTarget={lesson.learningTarget}
      availableSyntax={lesson.availableSyntax}
      lessonSelector={<FuncsChapterOverviewPanel lesson={lesson} variant="dropdown" />}
      pages={pages}
    />
  );
}

Object.assign(window, {
  FUNCS_DEFAULT_LESSON_SECTIONS,
  FUNCS_QUIZ_BLOCK_TYPES,
  FUNCS_EXERCISE_BLOCK_TYPES,
  FUNCS_VISUALIZER_GRAMMAR,
  FUNCS_EVALUATION_AUTHORING_RULES,
  FUNCS_EVALUATION_STEP_INTERACTION,
  FUNCS_LOOP_STEPPER_INTERACTION,
  FUNCS_DEFAULT_LESSON_RENDERERS,
  funcsValidateStackedEvaluationDetail,
  funcsValidateLoopTrace,
  FuncsStackedEvaluationDetail,
  FuncsLoopStepperDetail,
  funcsNormalizeCodeLines,
  funcsNormalizeTokenSpec,
  funcsNormalizeSyntaxGroups,
  FuncsSyntaxDrawer,
  FuncsTokenizedLine,
  FuncsCodeBlock,
  FuncsConsole,
  FuncsMemoryStatePanel,
  FuncsChapterOverviewPanel,
  FuncsFullExamplePage,
  FuncsQuizWorkspace,
  FuncsPreQuizPage,
  FuncsMainLessonPage,
  funcsNormalizeFillInCodeBlocks,
  funcsFillInCodeAnswers,
  FuncsFillInCodeQuizBlock,
  FuncsRigorousQuizPage,
  FuncsExercisesPage,
  funcsNormalizeLessonSections,
  funcsValidateConceptLesson,
  ConceptLessonSequence,
});
