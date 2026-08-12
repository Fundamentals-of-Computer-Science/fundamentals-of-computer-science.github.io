/* flow-lesson-stages.jsx — the five lesson stages, rendered entirely from lesson data.
   Each stage reads the shipped fixture (fullExample / preQuiz / mainLesson / rigorousQuiz / exercises)
   plus a `flow` block that carries the revised flow's authored copy and assessments.
   Loaded after flow-lesson-kit.jsx. */

function flowBlock(lesson, key) {
  return (lesson.flow || {})[key] || {};
}

function flowNavigationLabel(prefix, page, fallback) {
  return `${prefix}: ${page?.title || fallback}`;
}

/* Shared orientation page. Chapter 0 uses four instances of this renderer,
   each supplied entirely by fixture data. */
function FlowIntroStage({ lesson, page, chrome, sequence, navigation }) {
  const { FlowStageFrame, FLOW_MONO } = window;
  const intro = flowBlock(lesson, 'intros')[page.intro] || {};
  const sections = intro.sections || [];
  const controls = {
    tone: 'read',
    backLabel: flowNavigationLabel('Back', navigation?.prev, 'previous page'),
    canBack: Boolean(navigation?.prev && sequence?.goPrevPage),
    nextLabel: intro.nextLabel || flowNavigationLabel('Next', navigation?.next, 'continue'),
    canNext: Boolean(navigation?.next && sequence?.goNextPage),
    status: intro.status || `${sequence?.active + 1 || 1} of ${sequence?.pageCount || 1}`,
    onBack: () => sequence?.goPrevPage(),
    onNext: () => sequence?.goNextPage(),
  };

  return (
    <FlowStageFrame chrome={chrome} sequence={sequence} intent={intro.intent} controls={controls}>
      <article className="flow-intro-page">
        <header className="flow-intro-header">
          <div className="flow-intro-eyebrow">{intro.eyebrow || page.kicker || 'Introduction'}</div>
          <h3>{intro.title || page.title}</h3>
          {intro.lede && <p>{intro.lede}</p>}
        </header>

        {sections.map((section, sectionIndex) => (
          <section className="flow-intro-section" key={section.id || section.title || sectionIndex}>
            {section.title && <h4>{section.title}</h4>}
            {(section.body || []).map((paragraph, paragraphIndex) => (
              <p key={`${section.id || sectionIndex}-body-${paragraphIndex}`}>{paragraph}</p>
            ))}
            {section.cards?.length > 0 && (
              <div className="flow-intro-card-grid">
                {section.cards.map((card, cardIndex) => (
                  <div className="flow-intro-card" key={card.id || card.label || cardIndex}>
                    <div className="flow-intro-card-label">{card.label}</div>
                    <p>{card.body}</p>
                  </div>
                ))}
              </div>
            )}
            {section.steps?.length > 0 && (
              <ol className="flow-intro-steps">
                {section.steps.map((step, stepIndex) => (
                  <li key={step.id || step.label || stepIndex}>
                    <span className="flow-intro-step-number" aria-hidden="true">{stepIndex + 1}</span>
                    <div>
                      {step.label && <div className="flow-intro-step-label">{step.label}</div>}
                      <p>{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
            {section.code?.length > 0 && (
              <pre className="flow-intro-code"><code>{section.code.join('\n')}</code></pre>
            )}
          </section>
        ))}

        {intro.callout && (
          <aside className="flow-intro-callout">
            <div style={{ fontFamily: FLOW_MONO }}>{intro.callout.label}</div>
            <p>{intro.callout.body}</p>
          </aside>
        )}
      </article>
    </FlowStageFrame>
  );
}

function flowGoalSteps(fullExample) {
  const initialStep = { id: 'before-execution', stateIndex: 0 };
  const goals = Object.values(fullExample.goals || fullExample.code?.goals || {});
  const goalSteps = goals.map((goal, index) => ({
    id: `goal-intro-${goal.id || index + 1}`,
    stateIndex: 0,
    goal: goal.id,
    goalFocus: goal.id,
    rowState: {
      label: goal.n ? `Goal ${goal.n}` : `Goal ${index + 1}`,
      desc: goal.gloss || goal.label,
      memory: [],
      console: [],
    },
  }));

  if (fullExample.executionTrace?.length) {
    return [initialStep, ...goalSteps, ...fullExample.executionTrace];
  }
  const lines = fullExample.code?.lines || [];
  const stateSteps = (fullExample.states || []).slice(1).map((state, offset) => {
    const index = offset + 1;
    const line = lines.length ? lines[Math.min(index - 1, lines.length - 1)] : null;
    return {
      id: `state-${index}`,
      stateIndex: index,
      rowKey: line?.id || null,
      subgoal: line?.subgoal || null,
      goal: line?.subgoal ? fullExample.subgoals?.[line.subgoal]?.goal : null,
    };
  });
  return [initialStep, ...goalSteps, ...stateSteps];
}

/* 1 · Goal Introduction — the shipped walkthrough; only the footer verb changes
   until execution starts. */
function FlowGoalStage({ lesson, chrome, sequence, navigation }) {
  const { FlowStageFrame, FlowPaneLabel, FLOW_MONO, FuncsCodeGoalHeader, FuncsCodeBlock, FuncsMemoryStatePanel, FuncsConsole, FuncsStackedEvaluationDetail } = window;
  const goal = flowBlock(lesson, 'goal');
  const full = lesson.fullExample;
  const steps = React.useMemo(() => flowGoalSteps(full), [full]);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [showEval, setShowEval] = React.useState(false);
  const step = steps[stepIndex] || steps[0] || { stateIndex: 0 };
  const stateIndex = Math.min(step.stateIndex ?? stepIndex, Math.max(0, full.states.length - 1));
  const state = step.rowState || full.states[stateIndex] || full.states[0];
  const started = stepIndex > 0;
  const atEnd = stepIndex >= steps.length - 1;
  const goalFocused = Boolean(step.goalFocus);
  const activeKey = started && !goalFocused ? (step.rowKey || goal.activeKey) : null;
  const activeSubgoal = started && !goalFocused ? (step.subgoal || step.activeSubgoal || goal.activeSubgoal) : null;
  const activeGoal = started ? (step.goal || step.activeGoal || goal.activeGoal) : null;

  React.useEffect(() => {
    setShowEval(false);
  }, [stepIndex]);

  const controls = {
    tone: started ? 'run' : 'read',
    backLabel: started ? 'Back: previous step' : flowNavigationLabel('Back', navigation?.prev, 'previous page'),
    canBack: started || Boolean(navigation?.prev && sequence?.goPrevPage),
    nextLabel: !started
      ? (goal.startLabel || 'Continue — start running')
      : atEnd ? flowNavigationLabel('Next', navigation?.next, 'continue') : (goal.runLabel || 'Run next line'),
    status: !started
      ? (goal.startStatus || 'goal · nothing has run')
      : `${state.label} · ${stepIndex}/${Math.max(1, steps.length - 1)}`,
    canNext: !atEnd || Boolean(sequence?.goNextPage),
    onBack: () => {
      if (started) setStepIndex(index => Math.max(0, index - 1));
      else sequence?.goPrevPage();
    },
    onNext: () => {
      if (atEnd) sequence?.goNextPage();
      else setStepIndex(index => Math.min(steps.length - 1, index + 1));
    },
  };

  return (
    <FlowStageFrame chrome={chrome} sequence={sequence} intent={goal.intent} controls={controls}>
      <div style={{ padding: '8px 14px', borderBottom: '1px solid #e2e6ee', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <span style={{ fontSize: 9.5, fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2563eb', background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: 4, padding: '3px 8px', whiteSpace: 'nowrap' }}>
          {goal.badge || full.header.modeLabel}
        </span>
        <span style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.4 }}>{goal.instructions || full.header.instructions}</span>
      </div>
      <div className="flow-goal-layout" style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '55% 45%' }}>
        <div className="flow-goal-code" style={{ borderRight: '1px solid #e2e6ee', minHeight: 0, overflow: 'auto' }}>
          {full.code.goals && <FuncsCodeGoalHeader goals={full.code.goals} activeGoal={activeGoal} />}
          <div style={{ padding: '10px 12px' }}>
            <FuncsCodeBlock code={full.code} activeSubgoal={activeSubgoal} activeKey={activeKey} />
          </div>
        </div>
        <div className="flow-goal-state" style={{ background: '#fbfcfe', minHeight: 0, overflow: 'auto' }}>
          <div style={{ padding: '9px 14px', borderBottom: '1px solid #edf1f7', display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#475569', background: '#eef2f7', borderRadius: 4, padding: '2px 7px', whiteSpace: 'nowrap' }}>{state.label}</span>
            <span style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.4 }}>{state.desc}</span>
          </div>
          <div style={{ padding: 14, display: 'grid', gap: 12, alignContent: 'start' }}>
            {state.evalDetail && (
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowEval(value => !value)}
                  style={{
                    border: `1px solid ${showEval ? '#bfdbfe' : '#f59e0b'}`,
                    background: showEval ? '#dbeafe' : '#fff7ed',
                    color: showEval ? '#1d4ed8' : '#92400e',
                    borderRadius: 5,
                    padding: '5px 10px',
                    fontSize: 11.5,
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  {showEval ? 'Show memory state' : 'Show evaluation steps'}
                </button>
              </div>
            )}
            {showEval && state.evalDetail ? (
              <FuncsStackedEvaluationDetail detail={state.evalDetail} onClose={() => setShowEval(false)} />
            ) : (
              <React.Fragment>
                <div>
                  <FlowPaneLabel>State</FlowPaneLabel>
                  <FuncsMemoryStatePanel state={state} />
                </div>
                <FuncsConsole lines={state.console || []} />
                {!started && goal.note && (
                  <div style={{ fontFamily: FLOW_MONO, fontSize: 10.5, color: '#b45309', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 6, padding: '7px 9px', lineHeight: 1.45 }}>
                    {goal.note}
                  </div>
                )}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </FlowStageFrame>
  );
}

/* 2 · Pre-Quiz — part 1 asks for the order of the categories, part 2 opens each
   category in that order for one detail question. */
function FlowPreQuizStage({ lesson, chrome, sequence, navigation }) {
  const { FlowStageFrame, FlowQuestion, FlowExplain, FlowTypeTag, FuncsSubgoalTag, FLOW_MONO, flowQuestionRight, flowQuestionKind } = window;
  const pq = flowBlock(lesson, 'preQuiz');
  const categories = pq.categories || [];
  const byId = Object.fromEntries(categories.map(cat => [cat.id, cat]));
  const orderItems = Object.fromEntries(categories.map(cat => [
    cat.id,
    pq.hideOrderOrdinals ? { ...cat, n: null } : cat,
  ]));
  const correctOrder = categories.map(cat => cat.id);
  const orderQuestion = {
    kind: 'order',
    items: orderItems,
    bank: pq.shuffled || correctOrder,
    correct: correctOrder,
    placeholder: 'tap a category below',
    bankLabel: 'Categories',
  };

  const [order, setOrder] = React.useState([]);
  const [orderChecked, setOrderChecked] = React.useState(false);
  const [phase, setPhase] = React.useState('order');
  const [focus, setFocus] = React.useState(correctOrder[0]);
  const [answers, setAnswers] = React.useState({});

  const orderComplete = order.length === correctOrder.length;
  const orderScore = order.filter((id, i) => id === correctOrder[i]).length;
  const answeredCount = correctOrder.filter(id => answers[id] != null).length;
  const detail = pq.details?.[focus];
  const given = answers[focus];

  const controls = phase === 'order'
    ? {
      tone: 'read', backLabel: flowNavigationLabel('Back', navigation?.prev, 'Goal Introduction'), canBack: Boolean(sequence?.goPrevPage), canNext: orderComplete,
      nextLabel: orderChecked ? 'Part 2 — answer each category' : 'Check the order',
      status: orderChecked ? `order ${orderScore}/${correctOrder.length} in place` : `${order.length}/${correctOrder.length} placed`,
      onBack: () => sequence?.goPrevPage(),
      onNext: () => { if (!orderChecked) setOrderChecked(true); else setPhase('detail'); },
    }
    : {
      tone: 'read', backLabel: 'Back: the order', canBack: true, onBack: () => setPhase('order'),
      canNext: answeredCount === correctOrder.length, nextLabel: flowNavigationLabel('Next', navigation?.next, 'Main Lesson'),
      status: `${answeredCount}/${correctOrder.length} categories answered`, onNext: () => sequence?.goNextPage(),
    };

  return (
    <FlowStageFrame chrome={chrome} sequence={sequence} intent={pq.intent} controls={controls}>
      <div style={{ padding: '16px 20px 20px', display: 'grid', gap: 13 }}>
        <div className="flow-stage-heading-row" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb' }}>{pq.kicker || `Pre-Quiz · ${lesson.title}`}</div>
          <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
            {['order', 'detail'].map((p, i) => (
              <span key={p} style={{ fontFamily: FLOW_MONO, fontSize: 9.5, fontWeight: 700, padding: '2px 8px', borderRadius: 999, border: `1px solid ${phase === p ? '#bfdbfe' : '#e2e8f0'}`, background: phase === p ? '#eff6ff' : '#fff', color: phase === p ? '#2563eb' : '#94a3b8' }}>
                part {i + 1} · {p === 'order' ? 'order' : 'details'}
              </span>
            ))}
          </div>
        </div>

        {phase === 'order' ? (
          <React.Fragment>
            <div style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.45, maxWidth: 560 }}>{pq.part1Prompt}</div>
            {pq.part1Code?.length > 0 && (
              <pre style={{ margin: 0, maxWidth: 560, overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc', padding: '9px 12px', fontFamily: FLOW_MONO, fontSize: 12.2, lineHeight: 1.6, color: '#1e293b' }}><code>{pq.part1Code.join('\n')}</code></pre>
            )}
            <FlowQuestion question={orderQuestion} value={order} onChange={setOrder} revealed={orderChecked} />
            {orderChecked && (
              <FlowExplain correct={orderScore === correctOrder.length}>
                {orderScore === correctOrder.length ? pq.orderSuccess : pq.orderRetry}
              </FlowExplain>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.45, maxWidth: 560 }}>{pq.part2Prompt}</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {correctOrder.map((id, i) => {
                const question = pq.details[id];
                const ans = answers[id];
                const ok = flowQuestionRight(question, ans);
                const isFocus = focus === id;
                return (
                  <button className="flow-prequiz-category" key={id} type="button" onClick={() => setFocus(id)} style={{
                    display: 'flex', alignItems: 'center', gap: 9, textAlign: 'left', padding: '7px 10px', borderRadius: 8, cursor: 'pointer',
                    minWidth: 0, width: '100%', maxWidth: '100%', overflow: 'hidden',
                    border: `1.5px solid ${isFocus ? '#2563eb' : ans != null ? (ok ? '#bbf7d0' : '#fed7aa') : '#e2e8f0'}`,
                    background: isFocus ? '#f8fbff' : ans != null ? (ok ? '#f0fdf4' : '#fff7ed') : '#fff',
                  }}>
                    <span style={{ fontFamily: FLOW_MONO, fontSize: 10, color: '#94a3b8', width: 14 }}>{i + 1}</span>
                    <FuncsSubgoalTag subgoal={byId[id]} active={isFocus} />
                    <span className="flow-prequiz-category-meta" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 7 }}>
                      <FlowTypeTag>{question.type || flowQuestionKind(question)}</FlowTypeTag>
                      <span style={{ fontSize: 11, fontWeight: 900, color: ans == null ? '#c1c8d4' : ok ? '#16a34a' : '#d97706' }}>{ans == null ? '○' : ok ? '✓' : '~'}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {detail && (
              <section style={{ border: '1.5px solid #bfdbfe', borderRadius: 9, background: '#fff', padding: 12, display: 'grid', gap: 9 }}>
                {detail.contextCode?.length > 0 && (
                  <pre style={{ margin: 0, overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: 7, background: '#f8fafc', padding: '8px 11px', fontFamily: FLOW_MONO, fontSize: 12, lineHeight: 1.55, color: '#1e293b' }}><code>{detail.contextCode.join('\n')}</code></pre>
                )}
                <div style={{ fontSize: 14.5, fontWeight: 800, lineHeight: 1.35, color: '#1e293b', overflowWrap: 'anywhere' }}>{detail.q}</div>
                <FlowQuestion question={detail} value={given} onChange={(v) => setAnswers(prev => ({ ...prev, [focus]: v }))} revealed={given != null} />
                {given != null && <FlowExplain correct={flowQuestionRight(detail, given)}>{detail.why}</FlowExplain>}
              </section>
            )}
          </React.Fragment>
        )}
      </div>
    </FlowStageFrame>
  );
}

/* 3 · Main Lesson — one page. The continuation stays visible but blurred and inert
   until the current check is answered. */
function FlowLessonCheck({ check, index, answer, onAnswer }) {
  const { FlowQuestion, FlowExplain, FlowTypeTag, flowQuestionRight, flowQuestionKind } = window;
  const answered = answer != null;
  const correct = answered && flowQuestionRight(check, answer);
  return (
    <section style={{ border: `1.5px solid ${answered ? (correct ? '#bbf7d0' : '#fed7aa') : '#bfdbfe'}`, borderRadius: 9, background: '#fff', overflow: 'hidden' }}>
      <div style={{ padding: '7px 12px', background: answered ? (correct ? '#f0fdf4' : '#fff7ed') : '#eff6ff', borderBottom: '1px solid #edf2f7', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 9.5, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: answered ? (correct ? '#047857' : '#b45309') : '#2563eb' }}>
          Check {index + 1} {answered ? (correct ? '· correct' : '· see why') : '· required to continue'}
        </span>
        <span style={{ marginLeft: 'auto' }}><FlowTypeTag>{check.type || flowQuestionKind(check)}</FlowTypeTag></span>
      </div>
      <div style={{ padding: 11, display: 'grid', gap: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 800, lineHeight: 1.4, color: '#1e293b' }}>{check.q}</div>
        <FlowQuestion question={check} value={answer} onChange={onAnswer} revealed={answered} />
        {answered && <FlowExplain correct={correct}>{check.why}</FlowExplain>}
      </div>
    </section>
  );
}

function FlowMainLessonStage({ lesson, chrome, sequence, navigation }) {
  const { FlowStageFrame, FLOW_MONO, flowQuestionDone } = window;
  const main = lesson.mainLesson;
  const flow = flowBlock(lesson, 'mainLesson');
  const acts = main.acts;
  const checkFor = (index) => acts[index].check || flow.checks?.[index];
  const [given, setGiven] = React.useState({});
  const firstLocked = acts.findIndex((act, i) => checkFor(i) && !flowQuestionDone(checkFor(i), given[i]));
  const answered = acts.filter((act, i) => given[i] != null).length;
  const complete = firstLocked === -1;

  const controls = {
    tone: 'read', backLabel: flowNavigationLabel('Back', navigation?.prev, 'Pre-Quiz'), canBack: Boolean(sequence?.goPrevPage), canNext: complete, nextLabel: flowNavigationLabel('Next', navigation?.next, 'Rigorous Quiz'),
    status: complete ? `lesson complete · ${answered}/${acts.length} checks` : `${answered}/${acts.length} checks answered`,
    onBack: () => sequence?.goPrevPage(),
    onNext: () => sequence?.goNextPage(),
  };

  return (
    <FlowStageFrame chrome={chrome} sequence={sequence} intent={flow.intent} controls={controls}>
      <div className="flow-stage-body" style={{ padding: '16px 22px 22px', display: 'grid', gap: 16, maxWidth: 640 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb', marginBottom: 5 }}>{main.label || 'Main Lesson'}</div>
          <h3 style={{ margin: 0, fontSize: 20, lineHeight: 1.2, color: '#0f172a' }}>{main.title}</h3>
          <p style={{ margin: '8px 0 0', fontSize: 14, lineHeight: 1.55, color: '#334155' }}>{main.intro}</p>
        </div>
        {acts.map((act, i) => {
          const locked = firstLocked !== -1 && i > firstLocked;
          const check = checkFor(i);
          return (
            <React.Fragment key={act.title}>
              <section aria-hidden={locked} style={{ display: 'grid', gap: 10, filter: locked ? 'blur(3.5px)' : 'none', opacity: locked ? 0.5 : 1, pointerEvents: locked ? 'none' : 'auto', userSelect: locked ? 'none' : 'auto', transition: 'filter .25s, opacity .25s' }}>
                <div>
                  <span style={{ fontFamily: FLOW_MONO, fontSize: 10, fontWeight: 800, color: '#64748b', background: '#f1f5f9', borderRadius: 4, padding: '2px 7px' }}>part {act.n} of {acts.length}</span>
                  <h4 style={{ margin: '7px 0 0', fontSize: 17, lineHeight: 1.2, color: '#1e293b' }}>{act.title}</h4>
                </div>
                <div style={{ display: 'grid', gap: 7 }}>
                  {act.body.map(p => <p key={p} style={{ margin: 0, fontSize: 14, lineHeight: 1.58, color: '#334155' }}>{p}</p>)}
                </div>
                {act.code && (
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc', padding: '9px 12px', display: 'grid', gap: 5 }}>
                    {act.code.map(line => <code key={line} style={{ fontFamily: FLOW_MONO, fontSize: 12.2, color: '#1e293b' }}>{line}</code>)}
                    {act.translations?.map(t => <span key={t} style={{ fontSize: 12.2, color: '#64748b', lineHeight: 1.45 }}>{t}</span>)}
                  </div>
                )}
              </section>
              {check && !locked && (
                <FlowLessonCheck check={check} index={i} answer={given[i]} onAnswer={(v) => setGiven(prev => ({ ...prev, [i]: v }))} />
              )}
              {locked && i === firstLocked + 1 && (
                <div style={{ marginTop: -8, fontFamily: FLOW_MONO, fontSize: 10.5, color: '#b45309', textAlign: 'center' }}>▲ answer the check to unblur the rest of the lesson</div>
              )}
            </React.Fragment>
          );
        })}
        {complete && flow.completeNote && (
          <div style={{ border: '1.5px solid #bbf7d0', background: '#f0fdf4', borderRadius: 9, padding: '11px 13px', fontSize: 13, lineHeight: 1.5, color: '#166534' }}>
            <strong>Lesson complete.</strong> {flow.completeNote}
          </div>
        )}
      </div>
    </FlowStageFrame>
  );
}

/* 4 · Rigorous Quiz — one question in view at a time, each scoped to a single
   moment of the trace, in whatever assessment type suits it. */
function FlowRigorousQuizStage({ lesson, chrome, sequence, navigation }) {
  const { FlowStageFrame, FlowQuestion, FlowExplain, FlowTypeTag, FuncsCodeBlock, FLOW_MONO, flowQuestionDone, flowQuestionRight, flowQuestionSummary, flowQuestionKind } = window;
  const quiz = lesson.rigorousQuiz;
  const flow = flowBlock(lesson, 'rigorousQuiz');
  const cards = flow.cards || [];
  const [state, setState] = React.useState({});
  const activeIdx = cards.findIndex(card => !flowQuestionDone(card, state[card.id]));
  const done = activeIdx === -1;
  const score = cards.filter(card => flowQuestionRight(card, state[card.id])).length;

  const controls = {
    tone: 'read', backLabel: flowNavigationLabel('Back', navigation?.prev, 'Main Lesson'), canBack: Boolean(sequence?.goPrevPage), canNext: done, nextLabel: flowNavigationLabel('Next', navigation?.next, 'Exercises'),
    status: done ? `${score}/${cards.length} correct` : `question ${activeIdx + 1} of ${cards.length}`,
    onBack: () => sequence?.goPrevPage(),
    onNext: () => sequence?.goNextPage(),
  };

  return (
    <FlowStageFrame chrome={chrome} sequence={sequence} intent={flow.intent} controls={controls}>
      <div className="flow-rigorous-layout" style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '40% 60%' }}>
        <div className="flow-rigorous-code" style={{ borderRight: '1px solid #e2e6ee', minHeight: 0, overflow: 'auto', padding: '12px 10px' }}>
          <div style={{ fontSize: 9.5, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 4px 8px' }}>{flow.codeLabel || 'Transfer program'}</div>
          <FuncsCodeBlock code={quiz.transferCode} tokens={lesson.fullExample.code?.tokens || lesson.fullExample.tokens} />
        </div>
        <div className="flow-rigorous-questions" style={{ minHeight: 0, overflow: 'auto', padding: '14px 16px 18px', background: '#fbfcfe', display: 'grid', gap: 9, alignContent: 'start' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb', marginBottom: 4 }}>{quiz.title || 'Rigorous Quiz'}</div>
            <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.45 }}>{quiz.prompt}</div>
          </div>
          {cards.map((card, i) => {
            const value = state[card.id];
            const finished = flowQuestionDone(card, value);
            const isActive = i === activeIdx;
            if (!finished && !isActive) {
              return <div key={card.id} style={{ border: '1px dashed #dbe4ef', borderRadius: 8, padding: '7px 11px', color: '#c1c8d4', fontSize: 11.5, fontStyle: 'italic' }}>Question {i + 1} · {card.type || flowQuestionKind(card)}</div>;
            }
            if (finished) {
              const right = flowQuestionRight(card, value);
              return (
                <div key={card.id} style={{ border: `1px solid ${right ? '#bbf7d0' : '#fecaca'}`, borderRadius: 8, background: right ? '#f0fdf4' : '#fef2f2', padding: '8px 11px', display: 'grid', gap: 3 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 900, color: right ? '#16a34a' : '#dc2626' }}>{right ? '✓' : '✗'} Q{i + 1}</span>
                    <span style={{ fontSize: 12, color: '#475569' }}>{card.q}</span>
                  </div>
                  <div style={{ fontFamily: FLOW_MONO, fontSize: 11, color: '#1e293b', paddingLeft: 22 }}>{flowQuestionSummary(card, value)}</div>
                  {!right && <div style={{ fontSize: 11.5, color: '#9a3412', paddingLeft: 22, lineHeight: 1.4 }}>{card.why}</div>}
                </div>
              );
            }
            return (
              <section key={card.id} style={{ border: '1.5px solid #bfdbfe', borderRadius: 9, background: '#fff', padding: 12, display: 'grid', gap: 9 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#2563eb' }}>Question {i + 1}</span>
                  <span style={{ marginLeft: 'auto' }}><FlowTypeTag>{card.type || flowQuestionKind(card)}</FlowTypeTag></span>
                </div>
                <div style={{ fontSize: 14.5, fontWeight: 800, lineHeight: 1.35, color: '#1e293b' }}>{card.q}</div>
                <FlowQuestion question={card} value={value} onChange={(v) => setState(prev => ({ ...prev, [card.id]: v }))} />
              </section>
            );
          })}
          {done && (
            <FlowExplain correct={score === cards.length}>
              {score === cards.length ? flow.success : `${score}/${cards.length} correct — each red card carries your answer next to the reason.`}
            </FlowExplain>
          )}
        </div>
      </div>
    </FlowStageFrame>
  );
}

/* 5 · Exercises — numbered, self-contained problems worked away from the page. */
function FlowExercisesStage({ lesson, chrome, sequence, navigation }) {
  const { FlowStageFrame, FLOW_MONO } = window;
  const flow = flowBlock(lesson, 'exercises');
  const problems = flow.problems || [];
  const set = lesson.exercises || {};
  const hasNextPage = Boolean(sequence?.goNextPage && navigation?.next);

  const controls = {
    tone: 'read', backLabel: flowNavigationLabel('Back', navigation?.prev, 'Rigorous Quiz'), canBack: Boolean(sequence?.goPrevPage), canNext: hasNextPage, nextLabel: hasNextPage ? flowNavigationLabel('Next', navigation.next, 'Next page') : 'End of lesson',
    status: `${(set.title || 'exercises').toLowerCase()} · ${problems.length} problems`,
    onBack: () => sequence?.goPrevPage(),
    onNext: () => sequence?.goNextPage(),
  };

  return (
    <FlowStageFrame chrome={chrome} sequence={sequence} intent={flow.intent} controls={controls}>
      <div className="flow-stage-body" style={{ padding: '16px 22px 22px', display: 'grid', gap: 13, maxWidth: 660 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb', marginBottom: 4 }}>Exercises · {lesson.title}</div>
          <div style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.45 }}>{flow.intro || set.intro}</div>
        </div>
        {problems.map(ex => (
          <article key={ex.n} style={{ border: '1px solid #dbe4ef', borderRadius: 9, background: '#fff', overflow: 'hidden' }}>
            <div style={{ padding: '9px 13px', borderBottom: '1px solid #edf1f7', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: FLOW_MONO, fontSize: 11, fontWeight: 700, color: '#fff', background: '#334155', borderRadius: 5, width: 22, height: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ex.n}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{ex.title}</span>
              {ex.tag && <span style={{ marginLeft: 'auto', fontFamily: FLOW_MONO, fontSize: 9, fontWeight: 700, color: '#64748b', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 999, padding: '2px 8px' }}>{ex.tag}</span>}
            </div>
            <div style={{ padding: 13, display: 'grid', gap: 10 }}>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: '#334155' }}>{ex.statement}</p>
              {ex.given && (
                <div style={{ display: 'grid', gap: 4 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Given</div>
                  <pre style={{ margin: 0, fontFamily: FLOW_MONO, fontSize: 12, lineHeight: 1.6, color: '#1e293b', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 7, padding: '9px 11px', overflowX: 'auto' }}>{ex.given.join('\n')}</pre>
                </div>
              )}
              {ex.example && (
                <div style={{ display: 'grid', gap: 4 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Example</div>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: 7, background: '#f8fafc', padding: '9px 11px', display: 'grid', gridTemplateColumns: '52px 1fr', gap: '4px 10px', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: FLOW_MONO, fontSize: 9.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>{ex.example.inLabel || 'call'}</span>
                    <code style={{ fontFamily: FLOW_MONO, fontSize: 12, color: '#1e293b' }}>{ex.example.in}</code>
                    <span style={{ fontFamily: FLOW_MONO, fontSize: 9.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>result</span>
                    <pre style={{ margin: 0, fontFamily: FLOW_MONO, fontSize: 12, lineHeight: 1.5, color: '#1e293b' }}>{ex.example.out}</pre>
                  </div>
                </div>
              )}
              <div style={{ display: 'grid', gap: 4 }}>
                <div style={{ fontSize: 9, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your answer must</div>
                <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 4 }}>
                  {ex.constraints.map(c => <li key={c} style={{ fontSize: 12.8, lineHeight: 1.5, color: '#475569' }}>{c}</li>)}
                </ul>
              </div>
              {ex.model?.length > 0 && (
                <details className="flow-exercise-model">
                  <summary>Check a model answer</summary>
                  <pre><code>{ex.model.join('\n')}</code></pre>
                  {ex.feedback && <p>{ex.feedback}</p>}
                </details>
              )}
            </div>
          </article>
        ))}
      </div>
    </FlowStageFrame>
  );
}

const FLOW_LESSON_STAGES = [
  { id: 'goal', kicker: 'Example', title: 'Goal Introduction', blockType: 'fullExample', component: FlowGoalStage },
  { id: 'pre-quiz', kicker: 'Check', title: 'Pre-Quiz', blockType: 'preQuiz', component: FlowPreQuizStage },
  { id: 'main-lesson', kicker: 'Lesson', title: 'Main Lesson', blockType: 'mainLesson', component: FlowMainLessonStage },
  { id: 'rigorous-quiz', kicker: 'Quiz', title: 'Rigorous Quiz', blockType: 'rigorousQuiz', component: FlowRigorousQuizStage },
  { id: 'exercises', kicker: 'Practice', title: 'Exercises', blockType: 'exercises', component: FlowExercisesStage },
];

const FLOW_LESSON_RENDERERS = {
  intro: FlowIntroStage,
  fullExample: FlowGoalStage,
  preQuiz: FlowPreQuizStage,
  mainLesson: FlowMainLessonStage,
  rigorousQuiz: FlowRigorousQuizStage,
  exercises: FlowExercisesStage,
};

function flowSequenceDescriptors(lesson) {
  const authored = lesson.flow?.sequence;
  if (!Array.isArray(authored)) {
    return FLOW_LESSON_STAGES.map(({ component, ...stage }) => ({ ...stage }));
  }
  return authored.map(stage => {
    const canonical = FLOW_LESSON_STAGES.find(candidate => candidate.blockType === stage.blockType);
    const { component, ...canonicalData } = canonical || {};
    return {
      ...canonicalData,
      ...stage,
      id: stage.id,
      kicker: stage.kicker || canonicalData.kicker || 'Introduction',
      title: stage.title || canonicalData.title || 'Introduction',
    };
  });
}

function flowResolveLessonStages(lesson) {
  return flowSequenceDescriptors(lesson).map(stage => ({
    ...stage,
    component: FLOW_LESSON_RENDERERS[stage.blockType],
  }));
}

/* Authoring check: what a lesson must supply before the revised flow can render it. */
function flowValidateLesson(lesson) {
  const missing = [];
  const flow = lesson.flow || {};
  if (!lesson.fullExample?.code) missing.push('fullExample.code');
  if (!flow.goal) missing.push('flow.goal');
  if (!flow.preQuiz?.categories?.length) missing.push('flow.preQuiz.categories[]');
  if (!flow.preQuiz?.details) missing.push('flow.preQuiz.details{}');
  if (!lesson.mainLesson?.acts?.length) missing.push('mainLesson.acts[]');
  const checks = flow.mainLesson?.checks || [];
  (lesson.mainLesson?.acts || []).forEach((act, i) => {
    if (!act.check && !checks[i]) missing.push(`flow.mainLesson.checks[${i}]`);
  });
  if (!flow.rigorousQuiz?.cards?.length) missing.push('flow.rigorousQuiz.cards[]');
  if (!lesson.rigorousQuiz?.transferCode) missing.push('rigorousQuiz.transferCode');
  if (!flow.exercises?.problems?.length) missing.push('flow.exercises.problems[]');

  if (Object.prototype.hasOwnProperty.call(flow, 'sequence')) {
    if (!Array.isArray(flow.sequence) || flow.sequence.length === 0) {
      missing.push('flow.sequence[]');
    } else {
      const knownTypes = new Set(Object.keys(FLOW_LESSON_RENDERERS));
      const ids = new Set();
      flow.sequence.forEach((page, index) => {
        if (!page?.id) missing.push(`flow.sequence[${index}].id`);
        else if (ids.has(page.id)) missing.push(`flow.sequence duplicate id: ${page.id}`);
        else ids.add(page.id);

        if (!knownTypes.has(page?.blockType)) {
          missing.push(`flow.sequence[${index}].blockType`);
          return;
        }
        if (page.blockType === 'intro') {
          if (!page.intro) missing.push(`flow.sequence[${index}].intro`);
          const intro = flow.intros?.[page.intro];
          if (!intro) missing.push(`flow.intros.${page.intro || 'unknown'}`);
          else if (!intro.title || !intro.sections?.length) missing.push(`flow.intros.${page.intro}.title/sections[]`);
        }
      });

      const canonicalTypes = FLOW_LESSON_STAGES.map(stage => stage.blockType);
      canonicalTypes.forEach(blockType => {
        const count = flow.sequence.filter(page => page.blockType === blockType).length;
        if (count !== 1) missing.push(`flow.sequence requires exactly one ${blockType} page`);
      });
      const canonicalOrder = flow.sequence
        .map(page => canonicalTypes.indexOf(page.blockType))
        .filter(index => index >= 0);
      if (canonicalOrder.some((value, index) => index > 0 && value <= canonicalOrder[index - 1])) {
        missing.push('flow.sequence canonical stage order');
      }
    }
  }
  return { valid: missing.length === 0, missing };
}

function FlowLessonSequence({ lesson }) {
  const { TBPageSequence, FuncsChapterOverviewPanel } = window;
  const validation = flowValidateLesson(lesson);
  const pages = React.useMemo(() => {
    const stages = flowResolveLessonStages(lesson);
    return stages.map((stage, index) => {
      const StageComponent = stage.component;
      function FlowSequenceStage(props) {
        if (!StageComponent) return null;
        return (
          <StageComponent
            {...props}
            lesson={lesson}
            page={stage}
            navigation={{ prev: stages[index - 1] || null, next: stages[index + 1] || null }}
            chrome="sequence"
          />
        );
      }
      FlowSequenceStage.displayName = `FlowSequence${StageComponent?.name || stage.id}`;
      return {
        id: stage.id,
        kicker: stage.kicker,
        title: stage.title,
        component: FlowSequenceStage,
      };
    });
  }, [lesson]);
  if (!validation.valid) {
    return <div style={{ padding: 24, color: '#991b1b', fontFamily: 'sans-serif' }}>Lesson is missing: {validation.missing.join(', ')}</div>;
  }
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
  flowBlock, flowNavigationLabel, flowGoalSteps, FlowIntroStage, FlowGoalStage, FlowPreQuizStage, FlowLessonCheck, FlowMainLessonStage,
  FlowRigorousQuizStage, FlowExercisesStage, FLOW_LESSON_STAGES, FLOW_LESSON_RENDERERS,
  flowSequenceDescriptors, flowResolveLessonStages, flowValidateLesson, FlowLessonSequence,
});
