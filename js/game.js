const Game = (() => {
  // ── State ──────────────────────────────────────────────────────────────────
  let state = {
    currentLevel: 0,
    currentScreen: 'landing',
    scores: [],
    timerInterval: null,
    timeLeft: 0,
    timeMax: 0,
    toolsUsed: [],
    decisionMade: false,
    streak: 0,
    kbHintShown: false
  };

  // ── Screen Management ──────────────────────────────────────────────────────
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`screen-${id}`);
    if (target) {
      target.classList.add('active');
      target.scrollTop = 0;
      state.currentScreen = id;
    }
  }

  function showInstructions() {
    showScreen('instructions');
  }

  // ── Tutorial ───────────────────────────────────────────────────────────────
  function startTutorial() {
    showScreen('tutorial');
    showTutStep(0);
  }

  function showTutStep(n) {
    document.querySelectorAll('.tut-step').forEach(s => s.classList.remove('active'));
    const step = document.querySelector(`.tut-step[data-step="${n}"]`);
    if (step) step.classList.add('active');
  }

  function tutorialNext(n) {
    showTutStep(n);
  }

  function tutorialDecision(choice) {
    if (choice === 'approve') {
      showTutStep(4);
    } else {
      showTutStep('4b');
    }
  }

  // ── Level Intro Countdown ──────────────────────────────────────────────────
  function showLevelIntro(scenario, callback) {
    const overlay = document.getElementById('level-intro-overlay');
    document.getElementById('li-label').textContent =
      `${scenario.caseLabel} OF ${SCENARIOS.length}`;
    document.getElementById('li-title').textContent = scenario.title;
    const cdEl = document.getElementById('li-countdown');
    cdEl.textContent = '3';
    cdEl.classList.remove('go');
    overlay.classList.remove('hidden');

    let count = 3;
    const iv = setInterval(() => {
      count--;
      if (count > 0) {
        cdEl.textContent = count;
      } else {
        clearInterval(iv);
        cdEl.textContent = 'GO!';
        cdEl.classList.add('go');
        setTimeout(() => {
          overlay.classList.add('hidden');
          callback();
        }, 650);
      }
    }, 900);
  }

  // ── Level Start ────────────────────────────────────────────────────────────
  function startLevel(index) {
    state.currentLevel = index;
    state.toolsUsed = [];
    state.decisionMade = false;

    const scenario = SCENARIOS[index];
    showScreen('game');

    // HUD
    document.getElementById('hud-level').textContent = scenario.caseLabel;
    document.getElementById('hud-title').textContent = scenario.title;
    updateHudProgress();
    updateHudScores();

    // Case panel
    document.getElementById('case-flag').textContent = scenario.flagReason;
    document.getElementById('case-platform').textContent = scenario.platform;
    document.getElementById('case-scenario').textContent = scenario.scenario;
    document.getElementById('case-content').textContent = scenario.content;
    document.getElementById('case-ai-verdict').textContent = scenario.aiDecision;

    // Visual (image / video / post mock)
    const visualEl = document.getElementById('case-visual');
    if (scenario.visual) {
      visualEl.innerHTML = scenario.visual;
      visualEl.style.display = 'block';
    } else {
      visualEl.innerHTML = '';
      visualEl.style.display = 'none';
    }

    // Reset tool output + checkmarks
    document.getElementById('tool-output').innerHTML =
      '<div class="tool-placeholder">← Click a tool to inspect the case</div>';
    document.querySelectorAll('.tool-btn').forEach(b => {
      b.classList.remove('used');
      const chk = b.querySelector('.tool-check');
      if (chk) chk.remove();
    });

    // Decision buttons
    const dbContainer = document.getElementById('decision-buttons');
    dbContainer.innerHTML = '';
    scenario.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = `btn ${opt.style}`;
      btn.textContent = opt.label;
      btn.onclick = () => makeDecision(opt.value);
      dbContainer.appendChild(btn);
    });

    // Keyboard shortcut hint — show once
    if (!state.kbHintShown) {
      state.kbHintShown = true;
      setTimeout(() =>
        showToast('⌨️  Press 1 · 2 · 3 to decide   Q · W · E for tools'), 2000);
    }

    // Level intro then timer
    showLevelIntro(scenario, () => startTimer(scenario.timeLimit));
  }

  // ── Timer ──────────────────────────────────────────────────────────────────
  function startTimer(seconds) {
    clearTimer();
    state.timeLeft = seconds;
    state.timeMax = seconds;

    const display = document.getElementById('timer-display');
    const circle = document.getElementById('timer-circle');
    const ring = document.getElementById('timer-ring');
    const circumference = 107;

    function tick() {
      if (state.decisionMade) return;

      display.textContent = state.timeLeft;
      const progress = state.timeLeft / state.timeMax;
      circle.style.strokeDashoffset = circumference * (1 - progress);

      if (state.timeLeft <= 15) {
        ring.classList.add('timer-danger');
      } else {
        ring.classList.remove('timer-danger');
      }

      if (state.timeLeft <= 0) {
        clearTimer();
        handleTimeout();
        return;
      }
      state.timeLeft--;
    }

    tick();
    state.timerInterval = setInterval(tick, 1000);
  }

  function clearTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function handleTimeout() {
    if (state.decisionMade) return;
    makeDecision('__timeout__');
  }

  // ── Audit Efficiency Score ─────────────────────────────────────────────────
  function calcEfficiency(timeLeft, timeMax) {
    const ratio = timeLeft / timeMax;
    if (ratio > 0.7) return 100;
    if (ratio > 0.5) return 90;
    if (ratio > 0.35) return 78;
    if (ratio > 0.2) return 65;
    if (ratio > 0.05) return 50;
    if (ratio > 0) return 35;
    return 10; // timed out
  }

  // ── Decision ───────────────────────────────────────────────────────────────
  function makeDecision(value) {
    if (state.decisionMade) return;
    state.decisionMade = true;
    clearTimer();

    const scenario = SCENARIOS[state.currentLevel];

    // Lock buttons — highlight chosen, dim others
    if (value !== '__timeout__') {
      const buttons = document.querySelectorAll('#decision-buttons button');
      scenario.options.forEach((opt, idx) => {
        const btn = buttons[idx];
        if (!btn) return;
        btn.disabled = true;
        if (opt.value === value) {
          btn.classList.add('btn-chosen');
        } else {
          btn.classList.add('btn-dimmed');
        }
      });
    }

    const efficiency = calcEfficiency(state.timeLeft, state.timeMax);
    let result;

    if (value === '__timeout__') {
      result = {
        correct: false,
        icon: '⏱️',
        headline: 'Time Expired',
        subline: 'You took too long to audit this case',
        ethicalScore: 20,
        userDecisionLabel: 'No Decision (Timeout)',
        aiDecisionLabel: scenario.aiDecision.split('.')[0],
        analysis: `The clock ran out before you could make a decision. In real-world content moderation, delays have consequences — content remains up or down while you deliberate. Review the case analysis below to understand the correct decision.`,
        aiFailure: `Because no decision was made, the AI's (incorrect) decision stood by default. This is a critical audit failure.`,
        principle: `Audit efficiency matters. Developing familiarity with ethical frameworks means you can apply them quickly. Practice leads to faster, more confident decisions.`
      };
    } else {
      result = scenario.results[value];
    }

    // Streak tracking
    if (result.correct) {
      state.streak++;
      if (state.streak >= 2) {
        setTimeout(() => showToast(`🔥 ${state.streak} correct in a row!`), 400);
      }
    } else {
      state.streak = 0;
    }

    const ethicalScore = result.ethicalScore;
    const effScore = result.correct ? efficiency : Math.round(efficiency * 0.6);

    state.scores.push({
      level: state.currentLevel,
      ethical: ethicalScore,
      efficiency: effScore,
      correct: result.correct
    });

    updateHudScores();
    updateHudProgress();

    // Brief pause so the button state is visible before switching screen
    setTimeout(() => showFeedback(result, ethicalScore, effScore, scenario), 550);
  }

  function updateHudScores() {
    const totals = state.scores.reduce((a, b) => ({ eth: a.eth + b.ethical, eff: a.eff + b.efficiency }), { eth: 0, eff: 0 });
    const count = state.scores.length || 1;
    document.getElementById('hud-ethical').textContent = Math.round(totals.eth / count);
    document.getElementById('hud-efficiency').textContent = Math.round(totals.eff / count);
  }

  function updateHudProgress() {
    const dots = document.querySelectorAll('.prog-dot');
    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'done', 'wrong');
      if (i < state.scores.length) {
        dot.classList.add(state.scores[i].correct ? 'done' : 'wrong');
      } else if (i === state.currentLevel) {
        dot.classList.add('active');
      }
    });
  }

  // ── Tools ──────────────────────────────────────────────────────────────────
  function useTool(toolId) {
    const scenario = SCENARIOS[state.currentLevel];
    if (!scenario) return;

    const toolMap = { analyzer: scenario.tools.analyzer, ethics: scenario.tools.ethics, ai: scenario.tools.ai };
    const tool = toolMap[toolId];
    if (!tool) return;

    const isNew = !state.toolsUsed.includes(toolId);
    if (isNew) state.toolsUsed.push(toolId);

    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('used'));
    const activeBtn = document.getElementById(`tool-${toolId}`);
    activeBtn.classList.add('used');

    // Add checkmark badge on first use
    if (isNew && !activeBtn.querySelector('.tool-check')) {
      const chk = document.createElement('span');
      chk.className = 'tool-check';
      chk.textContent = '✓';
      activeBtn.appendChild(chk);
    }

    document.getElementById('tool-output').innerHTML =
      `<div class="tool-out-hdr">${tool.title}</div><div class="tool-out-body">${tool.body}</div>`;
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  function animateCounter(el, target, duration = 1200, suffix = '%') {
    const startTime = performance.now();
    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function showToast(message, duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 320);
    }, duration);
  }

  // ── Feedback ───────────────────────────────────────────────────────────────
  function showFeedback(result, ethScore, effScore, scenario) {
    showScreen('feedback');

    document.getElementById('feedback-icon').textContent = result.icon;
    document.getElementById('feedback-headline').textContent = result.headline;
    document.getElementById('feedback-subline').textContent = result.subline;
    document.getElementById('fb-analysis').textContent = result.analysis;
    document.getElementById('fb-ai-failure').textContent = result.aiFailure;
    document.getElementById('fb-principle').textContent = result.principle;

    const harmGrid = document.getElementById('fb-harm-grid');
    if (result.harmIfUp || result.harmIfRemoved) {
      document.getElementById('fb-harm-up').textContent = result.harmIfUp || '—';
      document.getElementById('fb-harm-down').textContent = result.harmIfRemoved || '—';
      harmGrid.style.display = 'grid';
    } else {
      harmGrid.style.display = 'none';
    }
    document.getElementById('fb-user-decision').textContent = result.userDecisionLabel;
    document.getElementById('fb-ai-decision').textContent = result.aiDecisionLabel;

    // Colored header glow
    const header = document.querySelector('.feedback-header');
    header.classList.remove('result-correct', 'result-wrong', 'result-partial');
    if (result.correct) {
      header.classList.add('result-correct');
    } else if (result.ethicalScore >= 60) {
      header.classList.add('result-partial');
    } else {
      header.classList.add('result-wrong');
    }

    // Reset bars then animate with counter
    document.getElementById('fb-ethical-bar').style.width = '0%';
    document.getElementById('fb-efficiency-bar').style.width = '0%';
    document.getElementById('fb-ethical-val').textContent = '0%';
    document.getElementById('fb-efficiency-val').textContent = '0%';

    setTimeout(() => {
      document.getElementById('fb-ethical-bar').style.width = `${ethScore}%`;
      document.getElementById('fb-efficiency-bar').style.width = `${effScore}%`;
      animateCounter(document.getElementById('fb-ethical-val'), ethScore);
      animateCounter(document.getElementById('fb-efficiency-val'), effScore);
    }, 200);

    // Next button text
    const nextBtn = document.getElementById('fb-next-btn');
    nextBtn.textContent = 'CONTINUE →';
  }

  function nextLevel() {
    showLevelMap();
  }

  // ── Level Map ────────────────────────────────────────────────────────────────
  const LEVEL_ICONS = ['💬', '🎭', '📰', '🔒', '🎬'];

  function showLevelMap() {
    const nextIdx = state.scores.length;
    const isAllDone = nextIdx >= SCENARIOS.length;

    const path = document.getElementById('levelmap-path');
    path.innerHTML = '';

    SCENARIOS.forEach((sc, i) => {
      if (i > 0) {
        const conn = document.createElement('div');
        conn.className = 'lm-connector' + (i <= state.scores.length ? ' done' : '');
        path.appendChild(conn);
      }

      const isCompleted = i < state.scores.length;
      const isCurrent = i === nextIdx;
      const isLocked = i > nextIdx;
      const score = isCompleted ? state.scores[i] : null;

      let nodeClass = 'lm-node';
      if (isCurrent) nodeClass += ' current';
      else if (isCompleted) nodeClass += score.correct ? ' done-correct' : ' done-wrong';
      else if (isLocked) nodeClass += ' locked';

      const node = document.createElement('div');
      node.className = nodeClass;

      let badgeHTML = '';
      if (isCompleted) {
        const cls = score.correct ? 'correct' : 'wrong';
        const txt = score.correct ? '✓' : '✗';
        badgeHTML = `<div class="lm-result-badge ${cls}">${txt}</div>`;
      }

      let chipHTML = '';
      if (isCompleted) {
        const rowScore = Math.round((score.ethical + score.efficiency) / 2);
        chipHTML = `<div class="lm-score-chip">${rowScore}%</div>`;
      } else if (isCurrent) {
        chipHTML = `<div class="lm-score-chip" style="color:var(--accent);border-color:var(--accent)">NEXT</div>`;
      }

      node.innerHTML = `
        <div class="lm-circle">
          ${badgeHTML}
          <div class="lm-icon">${LEVEL_ICONS[i]}</div>
          <div class="lm-num">${sc.caseLabel}</div>
        </div>
        <div class="lm-label">${sc.title}</div>
        ${chipHTML}
      `;

      path.appendChild(node);
    });

    const btn = document.getElementById('levelmap-btn');
    if (isAllDone) {
      btn.textContent = '📊 VIEW FINAL REPORT';
    } else {
      btn.textContent = `START ${SCENARIOS[nextIdx].caseLabel} →`;
    }

    showScreen('levelmap');
  }

  function startNextCase() {
    const nextIdx = state.scores.length;
    if (nextIdx >= SCENARIOS.length) {
      showFinalReport();
    } else {
      startLevel(nextIdx);
    }
  }

  // ── Final Report ───────────────────────────────────────────────────────────
  function showFinalReport() {
    showScreen('final');

    const totalEthical = state.scores.reduce((a, b) => a + b.ethical, 0);
    const totalEff = state.scores.reduce((a, b) => a + b.efficiency, 0);
    const count = state.scores.length;
    const overallScore = Math.round((totalEthical + totalEff) / (count * 2));

    // Animate ring + counter
    setTimeout(() => {
      const circle = document.getElementById('final-ring-circle');
      const circumference = 377;
      circle.style.strokeDashoffset = circumference * (1 - overallScore / 100);
      animateCounter(document.getElementById('final-score-val'), overallScore, 1500, '');
    }, 200);

    // Breakdown rows
    const breakdown = document.getElementById('final-breakdown');
    breakdown.innerHTML = '';
    state.scores.forEach((s, i) => {
      const sc = SCENARIOS[i];
      const rowScore = Math.round((s.ethical + s.efficiency) / 2);
      const icon = s.correct ? '✅' : '❌';
      const row = document.createElement('div');
      row.className = 'breakdown-row';
      row.innerHTML = `
        <span class="br-case">${sc.caseLabel}</span>
        <div class="br-bar-wrap"><div class="br-bar" style="width:${rowScore}%"></div></div>
        <span class="br-score">${rowScore}%</span>
        <span class="br-icon">${icon}</span>`;
      breakdown.appendChild(row);
    });

    // Verdict
    const verdict = VERDICTS.find(v => overallScore >= v.min) || VERDICTS[VERDICTS.length - 1];
    document.getElementById('final-verdict').innerHTML =
      `<h3>${verdict.label}</h3><p>${verdict.text}</p>`;

    // Biases
    const biasesEl = document.getElementById('final-biases');
    const existingItems = biasesEl.querySelectorAll('.bias-item');
    existingItems.forEach(e => e.remove());
    BIASES.forEach(b => {
      const div = document.createElement('div');
      div.className = 'bias-item';
      div.innerHTML = `<span class="bias-icon">${b.icon}</span><span>${b.text}</span>`;
      biasesEl.appendChild(div);
    });
  }

  // ── Restart ────────────────────────────────────────────────────────────────
  function restart() {
    state = {
      currentLevel: 0,
      currentScreen: 'landing',
      scores: [],
      timerInterval: null,
      timeLeft: 0,
      timeMax: 0,
      toolsUsed: [],
      decisionMade: false,
      streak: 0,
      kbHintShown: true
    };
    document.getElementById('fb-ethical-bar').style.width = '0%';
    document.getElementById('fb-efficiency-bar').style.width = '0%';
    document.getElementById('final-ring-circle').style.strokeDashoffset = 377;
    showLevelMap();
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  return {
    showScreen,
    showInstructions,
    startTutorial,
    tutorialNext,
    tutorialDecision,
    startLevel,
    useTool,
    makeDecision,
    closeModal,
    nextLevel,
    restart,
    showToast,
    showLevelMap,
    startNextCase
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  // Inject SVG gradient for final score ring
  const svg = document.querySelector('#screen-final .final-score-ring svg');
  if (svg) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#00d4ff"/>
        <stop offset="100%" style="stop-color:#7c3aed"/>
      </linearGradient>`;
    svg.insertBefore(defs, svg.firstChild);
  }

  // Show landing screen
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-landing').classList.add('active');

  // ── Keyboard Shortcuts ─────────────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;

    // Spacebar advances from feedback or level map screens
    if (e.key === ' ') {
      const feedbackActive = document.getElementById('screen-feedback').classList.contains('active');
      const levelmapActive = document.getElementById('screen-levelmap').classList.contains('active');
      if (feedbackActive) { e.preventDefault(); document.getElementById('fb-next-btn').click(); return; }
      if (levelmapActive) { e.preventDefault(); document.getElementById('levelmap-btn').click(); return; }
    }

    // Only fire decision/tool keys on game screen
    const gameActive = document.getElementById('screen-game').classList.contains('active');
    if (!gameActive) return;

    const buttons = document.querySelectorAll('#decision-buttons button:not(:disabled)');
    if (e.key === '1' && buttons[0]) { e.preventDefault(); buttons[0].click(); return; }
    if (e.key === '2' && buttons[1]) { e.preventDefault(); buttons[1].click(); return; }
    if (e.key === '3' && buttons[2]) { e.preventDefault(); buttons[2].click(); return; }

    const toolKeys = { q: 'analyzer', Q: 'analyzer', w: 'ethics', W: 'ethics', e: 'ai', E: 'ai' };
    if (toolKeys[e.key]) {
      e.preventDefault();
      Game.useTool(toolKeys[e.key]);
    }
  });
});
