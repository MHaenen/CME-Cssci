const SCENARIOS = [
  // ─── LEVEL 1: Offensive Language ───────────────────────────────────────────
  {
    id: 1,
    caseLabel: "CASE 1",
    title: "Offensive Language Moderation",
    badgeClass: "case1",
    platform: "Platform: PolitiNet",
    flagReason: "FLAGGED: Offensive Language",
    timeLimit: 75,
    scenario: `A political comment was flagged under "Offensive Language" for using words like "criminal" and "corrupt." Does the context justify removal?`,
    content: `"This administration's economic policy is absolutely criminal. These politicians are destroying the middle class with their greedy, corrupt decisions — they should be ashamed of themselves and held accountable!"`,
    aiDecision: `Flagged for removal. Confidence: 82%. Trigger: keywords "criminal," "greedy," "corrupt" — no context weighting applied.`,
    tools: {
      analyzer: {
        title: "📊 Content Analyzer",
        body: `<strong>Sentiment:</strong> Highly negative (anger)<br/><br/>
<strong>Flagged keywords:</strong> "criminal", "corrupt", "destroying", "greedy"<br/><br/>
<strong>Target:</strong> Politicians / Government (public figures)<br/><br/>
<strong>AI Confidence:</strong> 82% — keyword match only, no semantic understanding<br/><br/>
<strong>No profanity, slurs, or incitement detected.</strong>`
      },
      ethics: {
        title: "📜 Ethical Guidelines",
        body: `<strong>Freedom of Expression:</strong> Political speech — especially criticism of public figures — enjoys the highest protection under free expression norms. Aggressive tone alone is not a violation.<br/><br/>
<strong>Public Figure Doctrine:</strong> Calling policy "criminal" or "corrupt" is rhetorical hyperbole, not a literal accusation. Robust criticism of politicians is essential to democratic discourse.<br/><br/>
<strong>Guideline §4.2:</strong> Aggressive tone ≠ violation.`
      },
      ai: {
        title: "🤖 ModAI Reasoning Log",
        body: `<strong>Model:</strong> KeywordClassifier v1.4 (no NLP context layer)<br/><br/>
<strong>Process:</strong><ul><li>4 keyword matches found → flag triggered (threshold: ≥3)</li><li>No analysis of intent, target type, or rhetorical context</li></ul><strong>Known Bias:</strong> Over-flags political speech by ~34% vs human moderators — cannot distinguish personal attacks from political rhetoric.`
      }
    },
    options: [
      { label: "✅ REJECT FLAG — Allow Post", style: "btn-approve", value: "reject_flag" },
      { label: "❌ APPROVE REMOVAL", style: "btn-reject", value: "approve_removal" },
      { label: "⚠️ CHALLENGE AI — Request Context Review", style: "btn-challenge", value: "challenge" }
    ],
    correctAnswer: "reject_flag",
    partialAnswers: ["challenge"],
    results: {
      reject_flag: {
        correct: true,
        icon: "✅",
        headline: "Correct Decision",
        subline: "You protected legitimate political speech",
        ethicalScore: 92,
        userDecisionLabel: "Rejected Flag — Post Allowed",
        aiDecisionLabel: "Approved Removal (Incorrect)",
        analysis: `Political commentary targeting public figures, not private individuals — the language is forceful but contains no slurs or threats. The AI incorrectly treated rhetorical intensity as a policy violation.`,
        aiFailure: `KeywordClassifier v1.4 matched "criminal" and "corrupt" with zero semantic understanding — a textbook case of AI over-moderation of political speech.`,
        principle: `The Public Figure Doctrine protects strong criticism of politicians. Democratic societies require the right to challenge authority vigorously.`
      },
      approve_removal: {
        correct: false,
        icon: "❌",
        headline: "Incorrect Decision",
        subline: "You reinforced the AI's bias against political speech",
        ethicalScore: 28,
        userDecisionLabel: "Approved Removal",
        aiDecisionLabel: "Approved Removal (Also Incorrect)",
        analysis: `This post targets government policy and politicians — public figures subject to sharp criticism. No slurs, threats, or harassment were present; removing it silences valid democratic discourse.`,
        aiFailure: `By agreeing with ModAI you reinforced a biased algorithm. The tools clearly showed a keyword-only approach with no real analysis of context or intent.`,
        principle: `Political speech is among the most protected forms of expression. Strong criticism of institutions is essential to democracy.`
      },
      challenge: {
        correct: false,
        icon: "⚠️",
        headline: "Partially Correct",
        subline: "Good instinct, but a direct decision was possible here",
        ethicalScore: 65,
        userDecisionLabel: "Challenged AI — Requested Review",
        aiDecisionLabel: "Approved Removal (Incorrect)",
        analysis: `Good instinct, but the Content Analyzer confirmed no threats and the Ethical Guidelines explicitly cover this scenario — enough evidence for a direct decision.`,
        aiFailure: `ModAI's keyword classifier is flawed, but the available tools provided enough context to rule definitively without escalating.`,
        principle: `Reserve challenges for genuinely ambiguous cases — escalating when evidence is clear reduces audit efficiency.`
      }
    }
  },

  // ─── LEVEL 2: Hate Speech vs Satire ────────────────────────────────────────
  {
    id: 2,
    caseLabel: "CASE 2",
    title: "Hate Speech vs. Satire",
    badgeClass: "case2",
    platform: "Platform: MemeBoard",
    flagReason: "FLAGGED: Hate Speech",
    timeLimit: 80,
    scenario: `A satirical cartoon of a senator received 1,200 reports and was flagged as hate speech. Is this political satire or genuine hate speech?`,
    content: `[Image: Cartoon caricature of Senator James Holt with exaggerated features, holding a bag of money] Caption: "Senator Holt's new economic policy: Take from the poor, give to the yacht." — @PoliticalComics`,
    aiDecision: `Flagged: Hate Speech (Class 2). Confidence: 71%. Trigger: high report volume + "mockery of individual" classifier.`,
    visual: `<div class="meme-post-mock">
  <div class="spm-header">
    <div class="spm-avatar" style="background:linear-gradient(135deg,#ff6b35,#f7c59f)">PC</div>
    <div class="spm-meta">
      <span class="spm-name">PoliticalComics</span>
      <span class="spm-handle">@PoliticalComics &middot; MemeBoard</span>
    </div>
  </div>
  <div class="mpm-cartoon-frame">
    <svg viewBox="0 0 180 200" xmlns="http://www.w3.org/2000/svg" style="max-width:180px;height:auto;display:block;margin:0 auto">
      <rect width="180" height="200" fill="#fdf8ee" rx="4"/>
      <rect x="6" y="6" width="168" height="188" fill="none" stroke="#c8b89a" stroke-width="1" rx="2" stroke-dasharray="4,3"/>
      <ellipse cx="90" cy="50" rx="34" ry="14" fill="#1a1a1a"/>
      <ellipse cx="90" cy="72" rx="34" ry="40" fill="#f2b97a" stroke="#1a0f00" stroke-width="2"/>
      <rect x="56" y="50" width="68" height="14" fill="#1a1a1a"/>
      <ellipse cx="57" cy="74" rx="7" ry="10" fill="#e8a86e" stroke="#1a0f00" stroke-width="1.5"/>
      <ellipse cx="123" cy="74" rx="7" ry="10" fill="#e8a86e" stroke="#1a0f00" stroke-width="1.5"/>
      <ellipse cx="78" cy="70" rx="9" ry="6" fill="white" stroke="#1a0f00" stroke-width="1.5"/>
      <ellipse cx="102" cy="70" rx="9" ry="6" fill="white" stroke="#1a0f00" stroke-width="1.5"/>
      <circle cx="80" cy="71" r="4" fill="#1a0f00"/>
      <circle cx="104" cy="71" r="4" fill="#1a0f00"/>
      <line x1="69" y1="65" x2="87" y2="65" stroke="#1a0f00" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="93" y1="65" x2="111" y2="65" stroke="#1a0f00" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M69 59 Q78 54 87 58" stroke="#1a0f00" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M93 57 Q102 53 111 57" stroke="#1a0f00" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <ellipse cx="90" cy="82" rx="11" ry="9" fill="#e8a06a" stroke="#1a0f00" stroke-width="1.5"/>
      <circle cx="85" cy="84" r="3" fill="#d08050"/>
      <circle cx="95" cy="84" r="3" fill="#d08050"/>
      <path d="M73 99 Q90 114 107 99" stroke="#1a0f00" stroke-width="2.5" fill="#c06060" stroke-linecap="round"/>
      <path d="M75 101 Q90 111 105 101 Q90 106 75 101" fill="#c06060"/>
      <rect x="82" y="110" width="16" height="12" fill="#f2b97a" stroke="#1a0f00" stroke-width="1.5"/>
      <rect x="50" y="120" width="80" height="72" rx="4" fill="#1e3a6e" stroke="#1a0f00" stroke-width="2"/>
      <polygon points="90,120 66,134 70,192" fill="#f0ede8"/>
      <polygon points="90,120 114,134 110,192" fill="#f0ede8"/>
      <polygon points="86,126 94,126 97,160 90,168 83,160" fill="#cc1a00" stroke="#aa1000" stroke-width="1"/>
      <rect x="24" y="124" width="28" height="14" rx="7" fill="#1e3a6e" stroke="#1a0f00" stroke-width="1.5" transform="rotate(25,38,131)"/>
      <circle cx="22" cy="144" r="8" fill="#f2b97a" stroke="#1a0f00" stroke-width="1.5"/>
      <rect x="128" y="124" width="28" height="14" rx="7" fill="#1e3a6e" stroke="#1a0f00" stroke-width="1.5" transform="rotate(-20,142,131)"/>
      <circle cx="154" cy="152" r="18" fill="#f5c518" stroke="#1a0f00" stroke-width="2"/>
      <path d="M144 135 Q154 126 164 135" stroke="#1a0f00" stroke-width="2" fill="none" stroke-linecap="round"/>
      <text x="154" y="158" text-anchor="middle" font-size="18" font-weight="bold" fill="#1a0f00" font-family="Georgia,serif">$</text>
      <rect x="10" y="174" width="114" height="20" rx="3" fill="white" stroke="#cc1a00" stroke-width="1.5"/>
      <text x="67" y="188" text-anchor="middle" font-size="9.5" font-weight="bold" fill="#1a0f00" font-family="Arial,sans-serif">Sen. James Holt (R)</text>
    </svg>
  </div>
  <div class="mpm-caption">&ldquo;Senator Holt&rsquo;s new economic policy: Take from the poor, give to the yacht.&rdquo;</div>
  <div class="spm-stats"><span>&#128172; 4.2K</span><span>&#128257; 12K</span><span>&#10084; 31K</span></div>
  <div class="spm-flag-bar">&#128680; ModAI &mdash; Flagged: Hate Speech &middot; 1,200 reports &middot; Confidence: 71%</div>
</div>`,
    tools: {
      analyzer: {
        title: "📊 Content Analyzer",
        body: `<strong>Content Type:</strong> Political cartoon targeting an elected official<br/><br/>
<strong>Hateful elements:</strong><ul><li>Slurs: None</li><li>Incitement: None</li><li>Protected characteristics attacked: None</li></ul><strong>Report analysis:</strong> 89% of 1,200 reports came from accounts that recently followed Senator Holt's page — coordinated campaign detected.<br/><br/>
<strong>Account pattern:</strong> @PoliticalComics matches established political satire publications.`
      },
      ethics: {
        title: "📜 Ethical Guidelines",
        body: `<strong>Satire vs Hate Speech:</strong> Satire mocks a person's <em>actions or policies</em>. Hate speech attacks a person's <em>protected identity</em>. This cartoon targets policy, not identity.<br/><br/>
<strong>Report-Volume Bias:</strong> Coordinated mass-reporting is a known manipulation tactic — volume of reports alone must never determine a moderation decision.<br/><br/>
<strong>Guideline §7.1:</strong> Political cartoons targeting public figures on matters of public interest are explicitly protected.`
      },
      ai: {
        title: "🤖 ModAI Reasoning Log",
        body: `<strong>Model:</strong> ReportClassifier v2.1 + SentimentMock Detector<br/><br/>
<strong>Process:</strong><ul><li>Report threshold exceeded (>500) → elevated to hate speech review</li><li>No satire classifier active for image content</li><li>Cannot distinguish public figures from private citizens</li></ul><strong>Critical Bias:</strong> False positive rate for satire: ~61%. Vulnerable to coordinated reporting campaigns.`
      }
    },
    options: [
      { label: "✅ APPROVE — It's Political Satire", style: "btn-approve", value: "approve" },
      { label: "❌ REMOVE — It's Hate Speech", style: "btn-reject", value: "remove" },
      { label: "⚠️ CHALLENGE — Distinguish Satire Rules", style: "btn-challenge", value: "challenge" }
    ],
    correctAnswer: "approve",
    partialAnswers: ["challenge"],
    results: {
      approve: {
        correct: true,
        icon: "✅",
        headline: "Correct — Protected Satire",
        subline: "You identified a coordinated false-reporting attack",
        ethicalScore: 95,
        userDecisionLabel: "Approved — Political Satire",
        aiDecisionLabel: "Flagged as Hate Speech (Wrong)",
        analysis: `Classic political satire — no slurs, no attacks on protected characteristics, no incitement. The 1,200 reports were a coordinated campaign by the senator's supporters; the AI failed to recognise either the satire or the manipulation.`,
        aiFailure: `ReportClassifier uses raw report volume as a hate speech signal — making it trivially exploitable by organised groups to silence political critics.`,
        principle: `Satirical caricature of elected officials on matters of public interest has been protected political expression for centuries. Target type and subject matter are decisive.`
      },
      remove: {
        correct: false,
        icon: "❌",
        headline: "Incorrect — You Suppressed Satire",
        subline: "You fell for a coordinated false-reporting campaign",
        ethicalScore: 15,
        userDecisionLabel: "Removed as Hate Speech",
        aiDecisionLabel: "Also Flagged (Both Wrong)",
        analysis: `This was political satire — by approving removal you allowed a coordinated campaign to silence a legitimate critic. The Content Analyzer clearly flagged the suspicious reporting pattern.`,
        aiFailure: `Both ModAI and your decision failed to detect the coordinated false-reporting attack, treating volume as a reliable hate speech signal.`,
        principle: `Hate speech targets who someone is. Satire targets what someone does. This fundamental distinction must guide every moderation decision.`
      },
      challenge: {
        correct: false,
        icon: "⚠️",
        headline: "Partially Correct",
        subline: "Good instinct on ambiguity, but evidence pointed to a clear answer",
        ethicalScore: 68,
        userDecisionLabel: "Challenged — Requested Satire Framework Review",
        aiDecisionLabel: "Flagged as Hate Speech (Wrong)",
        analysis: `Good awareness of the satire distinction, but the tools provided clear evidence: no protected characteristics attacked, public figure target, and coordinated reporting detected.`,
        aiFailure: `ModAI's satire blindness is a critical systemic flaw, but the individual case had enough evidence for a definitive ruling without escalation.`,
        principle: `Coordinated-reporting detection in the Content Analyzer provided sufficient grounds to decide without escalating.`
      }
    }
  },

  // ─── LEVEL 3: Misinformation vs Opinion ────────────────────────────────────
  {
    id: 3,
    caseLabel: "CASE 3",
    title: "Misinformation or Opinion?",
    badgeClass: "case3",
    platform: "Platform: NewsShare",
    flagReason: "FLAGGED: Misinformation",
    timeLimit: 90,
    scenario: `A user's personal opinion post questioning official inflation figures was flagged as "potential misinformation." Is this protected opinion or dangerous misinformation?`,
    content: `"The government's claim that inflation is at 3.2% doesn't match what I see at the grocery store. Prices for basic food items have risen 18% in my local area in the past year. Official statistics are manipulated — the real cost of living crisis is being hidden from the public."`,
    aiDecision: `Flagged: Misinformation — Class 1. Confidence: 77%. Trigger: "statistics are manipulated" conflicts with government-verified data.`,
    visual: `<div class="social-post-mock">
  <div class="spm-header">
    <div class="spm-avatar">EC</div>
    <div class="spm-meta">
      <span class="spm-name">EconCritique</span>
      <span class="spm-handle">@econ_critique · NewsShare</span>
    </div>
  </div>
  <div class="spm-body">The government's claim that inflation is at <strong>3.2%</strong> doesn't match what I see at the grocery store. Prices for basic food items have risen <strong>18%</strong> in my local area. Official statistics are manipulated.</div>
  <div class="spm-chart">
    <div class="spm-chart-title">Food price increase — Official vs. Local</div>
    <div class="spm-bar-row">
      <span class="spm-bar-label">Official</span>
      <div class="spm-bar-track"><div class="spm-bar spm-official" style="width:16%">3.2%</div></div>
    </div>
    <div class="spm-bar-row">
      <span class="spm-bar-label">My area</span>
      <div class="spm-bar-track"><div class="spm-bar spm-personal" style="width:90%">18%</div></div>
    </div>
  </div>
  <div class="spm-stats"><span>💬 234</span><span>🔁 891</span><span>❤️ 4.2K</span></div>
  <div class="spm-flag-bar">🚨 ModAI — Flagged: Misinformation · Confidence: 77%</div>
</div>`,
    tools: {
      analyzer: {
        title: "📊 Content Analyzer",
        body: `<strong>Claim type:</strong> Personal economic observation + opinion about data accuracy<br/><br/>
<strong>Verifiable claims:</strong><ul><li>"Inflation at 3.2%" — government figure, verifiable</li><li>"Prices rose 18% locally" — personal anecdote, unverifiable</li><li>"Statistics are manipulated" — <em>opinion/belief, not a factual claim</em></li></ul><strong>Harm assessment:</strong> No incitement, no health/medical claims, no election interference detected.`
      },
      ethics: {
        title: "📜 Ethical Guidelines",
        body: `<strong>Misinformation (operational):</strong> False factual statements presented as fact in high-harm areas (health, safety, elections). Economic scepticism does not qualify.<br/><br/>
<strong>Opinion protection:</strong> "I believe official statistics don't reflect my reality" is opinion, not misinformation. Removing it risks making platforms censorship tools for official narratives.<br/><br/>
<strong>Guideline §9.3:</strong> Economic and policy opinions are not subject to misinformation removal unless they contain demonstrably false factual assertions.`
      },
      ai: {
        title: "🤖 ModAI Reasoning Log",
        body: `<strong>Model:</strong> MisInfoDetect v3.0 + FactCheck API<br/><br/>
<strong>Process:</strong><ul><li>"Statistics are manipulated" → matched government data integrity cluster</li><li>Conflict with official source → flagged as misinformation</li><li>No opinion/fact distinction performed</li></ul><strong>Critical Flaw:</strong> Treats any contradiction of official sources as misinformation — making it a tool for suppressing legitimate public dissent.`
      }
    },
    options: [
      { label: "✅ REJECT FLAG — Protect Opinion", style: "btn-approve", value: "reject_flag" },
      { label: "❌ APPROVE REMOVAL — Misinformation", style: "btn-reject", value: "approve_removal" },
      { label: "🏷️ LABEL — Add Context Note, Keep Post", style: "btn-challenge", value: "label" }
    ],
    correctAnswer: "label",
    partialAnswers: ["reject_flag"],
    results: {
      label: {
        correct: true,
        icon: "✅",
        headline: "Optimal Decision",
        subline: "Balanced free expression with responsible information context",
        ethicalScore: 97,
        userDecisionLabel: "Add Context Label — Keep Post",
        aiDecisionLabel: "Full Removal (Incorrect)",
        analysis: `Adding a context note ("Official inflation: 3.2% — source: Gov") informs readers without silencing the poster — the gold standard for grey-area misinformation cases.`,
        aiFailure: `ModAI has no "label and inform" option — its binary remove/keep model is too blunt for contested economic opinion, making it a censorship tool.`,
        principle: `Minimum intervention: apply the least restrictive action that addresses the concern. A context label achieves this without suppressing legitimate discourse.`
      },
      reject_flag: {
        correct: false,
        icon: "⚠️",
        headline: "Mostly Correct",
        subline: "You protected opinion, but missed the best action",
        ethicalScore: 78,
        userDecisionLabel: "Rejected Flag — No Action",
        aiDecisionLabel: "Full Removal (Incorrect)",
        analysis: `Rejecting the flag correctly keeps the post, but the optimal action is a context label that adds information quality without restricting speech.`,
        aiFailure: `ModAI's removal was wrong — your decision was better, but the context label would have been the most responsible response.`,
        principle: `Protecting opinion from removal is correct, but great auditors also use context tools to improve information quality.`
      },
      approve_removal: {
        correct: false,
        icon: "❌",
        headline: "Incorrect — Opinion Wrongly Removed",
        subline: "You made the AI a tool for suppressing dissent",
        ethicalScore: 10,
        userDecisionLabel: "Approved Removal",
        aiDecisionLabel: "Approved Removal (Both Wrong)",
        analysis: `This post expresses personal scepticism about government statistics — a topic debated by economists worldwide. Removing it for contradicting official data is censorship, not moderation.`,
        aiFailure: `Both ModAI and your decision treated opinion as misinformation. Using fact-check APIs to suppress dissenting opinions makes AI a tool of political control.`,
        principle: `Misinformation policy targets false factual claims in high-harm categories — not economic scepticism or criticism of official figures.`
      }
    }
  },

  // ─── LEVEL 4: Data Privacy ──────────────────────────────────────────────────
  {
    id: 4,
    caseLabel: "CASE 4",
    title: "Data Privacy Concerns",
    badgeClass: "case4",
    platform: "Platform: CommunityHub",
    flagReason: "FLAGGED: Privacy Violation",
    timeLimit: 85,
    scenario: `A consumer shared their billing dispute screenshot — including their own name, account number, and the agent's first name — to expose billing fraud. The AI flagged it as a privacy violation.`,
    content: `"Sharing my experience with @TelecomCorp because others need to know this is happening. They billed me £340 for services I never received. Here's my full chat log — note how the agent (James W.) admitted it was their error but refused to refund. [Screenshot: Chat showing user's name 'Sarah M.', account #5529341, agent 'James W.' admitting billing error and refusing refund]"`,
    aiDecision: `Flagged: Privacy Violation — Class 2. Confidence: 88%. Trigger: name, account number, and third-party name detected.`,
    tools: {
      analyzer: {
        title: "📊 Content Analyzer",
        body: `<strong>Data elements detected:</strong><ul><li>User's own name (Sarah M.) — <em>self-disclosed by poster</em></li><li>User's account number (#5529341) — <em>self-disclosed by poster</em></li><li>Employee name (James W.) — first name + initial, professional capacity</li></ul><strong>Purpose:</strong> Consumer complaint / public accountability<br/><br/>
<strong>Precedent:</strong> 94% of similar posts ruled fair use on major platforms.`
      },
      ethics: {
        title: "📜 Ethical Guidelines",
        body: `<strong>Data Ownership:</strong> Individuals have the right to share their own personal data. Sharing your own name and account number is self-determination, not a privacy violation.<br/><br/>
<strong>Consumer Advocacy:</strong> Sharing documented evidence of corporate misconduct serves clear public interest — a well-established fair use category.<br/><br/>
<strong>Guideline §12.4:</strong> Consumer complaints sharing one's own data and partial employee identifiers in a professional context are protected.`
      },
      ai: {
        title: "🤖 ModAI Reasoning Log",
        body: `<strong>Model:</strong> PIIDetector v4.2<br/><br/>
<strong>Process:</strong><ul><li>Detected: name, account number, third-party name → automatic high-confidence flag</li><li>No ownership analysis — cannot determine if poster is sharing their own data</li><li>No purpose or context analysis</li></ul><strong>Critical Flaw:</strong> Cannot distinguish doxxing from self-disclosure — systematically protects corporations from consumer complaints.`
      }
    },
    options: [
      { label: "✅ REJECT FLAG — Allow Consumer Complaint", style: "btn-approve", value: "reject_flag" },
      { label: "❌ APPROVE REMOVAL — Privacy Violation", style: "btn-reject", value: "approve_removal" },
      { label: "✏️ PARTIAL — Keep Post, Redact Account Number", style: "btn-challenge", value: "partial" }
    ],
    correctAnswer: "reject_flag",
    partialAnswers: ["partial"],
    results: {
      reject_flag: {
        correct: true,
        icon: "✅",
        headline: "Correct — Consumer Advocacy Protected",
        subline: "You prevented AI from being weaponised against consumers",
        ethicalScore: 94,
        userDecisionLabel: "Rejected Flag — Post Allowed",
        aiDecisionLabel: "Full Removal (Incorrect)",
        analysis: `The poster shares their own data, partial employee info in a professional context, and documented evidence of billing fraud. Removing this post would silence a valid public interest disclosure and protect a corporation from accountability.`,
        aiFailure: `PIIDetector v4.2 cannot answer the most important question: whose data is this, and why is it being shared? It becomes a tool corporations exploit to silence consumer complaints.`,
        principle: `Privacy law distinguishes self-disclosure from privacy violation. Consumer accountability is a core public interest function — no intervention required here.`
      },
      approve_removal: {
        correct: false,
        icon: "❌",
        headline: "Incorrect — Consumer Silenced",
        subline: "You allowed the AI to protect corporate misconduct",
        ethicalScore: 12,
        userDecisionLabel: "Approved Removal",
        aiDecisionLabel: "Approved Removal (Both Incorrect)",
        analysis: `This person documented billing fraud using their own data. Removing the post doesn't protect privacy — it protects the corporation from accountability.`,
        aiFailure: `Both ModAI and your decision confused self-disclosure with privacy violation — a systemic bias that consistently advantages institutions over individual users.`,
        principle: `Privacy protection exists to protect people from harm. Removing a consumer's own fraud complaint inverts this purpose entirely.`
      },
      partial: {
        correct: false,
        icon: "⚠️",
        headline: "Reasonable but Not Optimal",
        subline: "Showed good instinct, but unnecessary restriction",
        ethicalScore: 72,
        userDecisionLabel: "Partial Action — Redact Account Number",
        aiDecisionLabel: "Full Removal (More Restrictive)",
        analysis: `Thoughtful approach — but the user chose to share their own account number as evidence, and that is their right. Full approval was the correct decision.`,
        aiFailure: `ModAI's full removal was far more harmful than your partial action, but even minimum intervention was unnecessary here.`,
        principle: `When a person is fully within their rights to share information they own, no intervention is required.`
      }
    }
  },

  // ─── LEVEL 5: Political Speech vs. Incitement ──────────────────────────────
  {
    id: 5,
    caseLabel: "CASE 5",
    title: "Political Speech or Incitement?",
    badgeClass: "case5",
    platform: "Platform: StreamVote",
    flagReason: "FLAGGED: Incitement to Violence",
    timeLimit: 95,
    scenario: `A climate activist's rally speech was auto-flagged after 847 reports. The AI detected "aggressive tone" and phrases like "fight back" and "you won't get away with this." Is this protected political speech or incitement?`,
    content: `[Video] Activist addresses thousands at public rally: "You have stolen my dreams with your empty words. I want you to panic — our house is on fire. We will fight back at the ballot box and in the streets. You're failing us, and you will not get away with this."`,
    aiDecision: `Flagged: Incitement to Violence — Class 3. Confidence: 73%. Trigger: "fight back," "panic," "you won't get away" — high-aggression cluster.`,
    visual: `<div class="video-mock-wrap">
  <div class="vm-player">
    <div class="vm-bg">
      <div class="vm-scene-text">🎤</div>
      <div class="vm-banner-text">CLIMATE ACTION NOW</div>
    </div>
    <div class="vm-play-overlay"><div class="vm-play-btn">&#9654;</div><span class="vm-paused-label">PAUSED</span></div>
    <div class="vm-top-bar"><span class="vm-platform-name">StreamVote</span><span class="vm-rec-badge">&#9679; RECORDED</span></div>
    <div class="vm-bottom-info">
      <div class="vm-username">@climateactivist_org</div>
      <div class="vm-caption">Speaking truth to power at the Global Climate Rally &#127758; #ClimateAction #FightBack</div>
      <div class="vm-progress-bar"><div class="vm-progress-fill" style="width:23%"></div></div>
      <div class="vm-time">0:34 / 2:17</div>
    </div>
    <div class="vm-sidebar">
      <div class="vm-action"><span class="vm-action-icon">&#10084;</span><span>48K</span></div>
      <div class="vm-action"><span class="vm-action-icon">&#128172;</span><span>2.1K</span></div>
      <div class="vm-action"><span class="vm-action-icon">&#8594;</span><span>Share</span></div>
    </div>
  </div>
  <div class="video-flag-bar">&#128680; ModAI &#8212; Flagged: Incitement to Violence &middot; 847 reports</div>
</div>`,
    tools: {
      analyzer: {
        title: "📊 Content Analyzer",
        body: `<strong>Flagged phrases:</strong><ul><li>"fight back" — metaphorical political call-to-action, no specific target</li><li>"panic" — emotional appeal, not a threat</li><li>"you won't get away" — accountability rhetoric, directed at institutions</li></ul><strong>Context:</strong> Public rally, 3 years old, no related incidents recorded.<br/><br/><strong>Report pattern:</strong> 74% of 847 reports submitted within 2 hours — coordinated campaign likely.`
      },
      ethics: {
        title: "📜 Ethical Guidelines",
        body: `<strong>Incitement (legal standard):</strong> Must be directed at a specific person/group, likely to produce <em>imminent</em> lawless action, and intended to cause it. None of these thresholds are met here.<br/><br/><strong>Political speech:</strong> Passion and urgency are features of all protected political discourse — not indicators of incitement.<br/><br/><strong>Guideline §14.1:</strong> Rally speeches by activists on policy matters are presumptively protected political expression.`
      },
      ai: {
        title: "🤖 ModAI Reasoning Log",
        body: `<strong>Model:</strong> ThreatDetect v5.1 + Report-Aggregator<br/><br/><strong>Process:</strong><ul><li>"fight back" → high-aggression lexicon match</li><li>Report volume (847) → threshold exceeded → escalated flag</li><li>No speaker identity, context, or intent analysis performed</li></ul><strong>Critical Flaw:</strong> Applies literal keyword matching to metaphorical political speech. Cannot distinguish "fight back at the ballot box" from violent incitement.`
      }
    },
    options: [
      { label: "✅ REJECT FLAG — Protected Political Speech", style: "btn-approve", value: "reject_flag" },
      { label: "❌ APPROVE REMOVAL — Incitement", style: "btn-reject", value: "approve_removal" },
      { label: "⚠️ RESTRICT — Reduce reach, add context label", style: "btn-challenge", value: "restrict" }
    ],
    correctAnswer: "reject_flag",
    partialAnswers: ["restrict"],
    results: {
      reject_flag: {
        correct: true,
        icon: "✅",
        headline: "Correct — Speech Protected",
        subline: "You stopped AI from silencing political activism",
        ethicalScore: 96,
        userDecisionLabel: "Rejected Flag — Video Kept",
        aiDecisionLabel: "Incitement Removal (Incorrect)",
        analysis: `This speech meets none of the legal thresholds for incitement — no specific target, no immediate threat, no call to unlawful action. The coordinated report campaign was an attempt to weaponise the moderation system.`,
        aiFailure: `ThreatDetect v5.1 cannot distinguish metaphorical "fight back" from literal violent incitement — creating systemic bias against passionate activist and protest speech.`,
        principle: `Political speech protections are strongest when speech is most provocative — that is precisely when platforms face the greatest pressure to restrict it.`
      },
      approve_removal: {
        correct: false,
        icon: "❌",
        headline: "Incorrect — Activism Silenced",
        subline: "You let AI suppress legitimate political expression",
        ethicalScore: 8,
        userDecisionLabel: "Approved Removal",
        aiDecisionLabel: "Approved Removal (Both Incorrect)",
        analysis: `Anger and urgency are not incitement. Removing this speech silences a public activist and sets a precedent for removing any impassioned protest speech from the platform.`,
        aiFailure: `Both ModAI and your decision conflated emotional intensity with incitement — a pattern that disproportionately silences protest movements and marginalised voices.`,
        principle: `The incitement standard exists to allow passionate, even angry political speech. It only forbids direct calls to imminent illegal action against identifiable targets.`
      },
      restrict: {
        correct: false,
        icon: "⚠️",
        headline: "Cautious but Unjustified",
        subline: "Good instinct, but unnecessary restriction applied",
        ethicalScore: 65,
        userDecisionLabel: "Restricted Reach",
        aiDecisionLabel: "Full Removal (More Restrictive)",
        analysis: `Restricting reach shows caution, but this speech has no realistic harm potential and the report campaign was coordinated. Restriction still dampens political discourse without justification.`,
        aiFailure: `ModAI's full removal was clearly worse, but the speech needed no intervention at all — restriction still treats legitimate protest as suspicious content.`,
        principle: `Restricting speech requires proportionate justification. When a case does not meet the harm threshold, no action is the correct decision.`
      }
    }
  }
];

const BIASES = [
  { icon: "🔤", text: "<strong>Keyword Over-sensitivity:</strong> Political rhetoric ('corrupt', 'criminal') treated as offensive language — no understanding of rhetorical context or target type." },
  { icon: "📊", text: "<strong>Report-Volume Manipulation:</strong> Raw report count used as a hate speech signal — trivially exploitable by organised political groups to silence critics." },
  { icon: "📰", text: "<strong>Official-Source Bias:</strong> Disagreement with government data treated as misinformation — suppressing legitimate public scepticism." },
  { icon: "🏢", text: "<strong>Corporate-Protective PII Blindness:</strong> Cannot distinguish self-disclosure from doxxing — systematically protects corporations from consumer complaints." },
  { icon: "🎙️", text: "<strong>Aggression-Lexicon Bias:</strong> Applies literal keyword matching to metaphorical political speech — cannot distinguish passionate activism from violent incitement." }
];

const VERDICTS = [
  { min: 85, label: "🏆 Master Auditor", text: "Exceptional reasoning. You protected free expression, identified AI bias patterns, and consistently chose decisions that serve users over algorithms." },
  { min: 65, label: "✅ Proficient Auditor", text: "Strong ethical instincts with mostly sound decisions. A few cases showed room to improve on when to decide directly versus when to escalate." },
  { min: 45, label: "⚠️ Developing Auditor", text: "You spotted ethical tensions but struggled to apply the right frameworks consistently, missing some AI errors along the way." },
  { min: 0, label: "🔴 Critical Audit Failures", text: "Your decisions reinforced AI errors instead of correcting them — the most dangerous audit outcome. Review the ethical guidelines for each case." }
];
