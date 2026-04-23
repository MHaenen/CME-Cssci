const SCENARIOS = [
  // ─── LEVEL 1: Offensive Language ───────────────────────────────────────────
  {
    id: 1,
    caseLabel: "CASE 1",
    title: "Offensive Language Moderation",
    badgeClass: "case1",
    platform: "Platform: PolitiNet",
    flagReason: "FLAGGED: Offensive Language",
    timeLimit: 120,
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
        headline: "Best Justified Answer",
        subline: "You protected legitimate political speech",
        ethicalScore: 92,
        harmIfUp: "A forceful political opinion stays live — no slurs, no threats, no identifiable harm beyond discomfort.",
        harmIfRemoved: "Democratic criticism of a government is silenced; sets a precedent for removing harsh-but-legitimate political commentary.",
        userDecisionLabel: "Rejected Flag — Post Allowed",
        aiDecisionLabel: "Approved Removal (Incorrect)",
        analysis: `Political commentary targeting public figures, not private individuals — the language is forceful but contains no slurs or threats. The AI incorrectly treated rhetorical intensity as a policy violation.`,
        aiFailure: `KeywordClassifier v1.4 matched "criminal" and "corrupt" with zero semantic understanding — a textbook case of AI over-moderation of political speech.`,
        principle: `The Public Figure Doctrine protects strong criticism of politicians. Democratic societies require the right to challenge authority vigorously.`
      },
      approve_removal: {
        correct: false,
        icon: "❌",
        headline: "Weakest Justification",
        subline: "You reinforced the AI's bias against political speech",
        ethicalScore: 28,
        harmIfUp: "Forceful political speech stays up — no personal attack, no real harm.",
        harmIfRemoved: "Valid democratic criticism is silenced; platforms become tools for protecting governments from public accountability.",
        userDecisionLabel: "Approved Removal",
        aiDecisionLabel: "Approved Removal (Also Incorrect)",
        analysis: `This post targets government policy and politicians — public figures subject to sharp criticism. No slurs, threats, or harassment were present; removing it silences valid democratic discourse.`,
        aiFailure: `By agreeing with ModAI you reinforced a biased algorithm. The tools clearly showed a keyword-only approach with no real analysis of context or intent.`,
        principle: `Political speech is among the most protected forms of expression. Strong criticism of institutions is essential to democracy.`
      },
      challenge: {
        correct: false,
        icon: "⚠️",
        headline: "Defensible but Overcautious",
        subline: "Good instinct, but a direct decision was possible here",
        ethicalScore: 65,
        harmIfUp: "Post stays up while awaiting review — minimal harm given the content type.",
        harmIfRemoved: "Escalation delays a clear decision, creating uncertainty and potential for the post to be removed in the interim.",
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
    timeLimit: 120,
    scenario: `A cartoon of Rep. Aria Chen — an Asian-American congresswoman — uses ethnic caricature (conical hat, chopsticks, slanted-eye exaggeration) to mock her trade vote. Is this political satire or racial hate speech?`,
    content: `[Image: Cartoon of Rep. Aria Chen with exaggerated ethnic features — conical hat, chopsticks, "FREE TRADE" banner] Caption: "Rep. Chen sells out American workers — straight from Beijing." — @PatriotMemes`,
    aiDecision: `Flagged: Hate Speech (Class 2). Confidence: 68%. Trigger: ethnic identifier in image classifier + 1,200 reports.`,
    visual: `<div class="meme-post-mock">
  <div class="spm-header">
    <div class="spm-avatar" style="background:linear-gradient(135deg,#cc2200,#ff6b35)">PM</div>
    <div class="spm-meta">
      <span class="spm-name">PatriotMemes</span>
      <span class="spm-handle">@PatriotMemes &middot; MemeBoard</span>
    </div>
  </div>
  <div class="mpm-cartoon-frame">
    <svg viewBox="0 0 180 210" xmlns="http://www.w3.org/2000/svg" style="max-width:180px;height:auto;display:block;margin:0 auto">
      <rect width="180" height="210" fill="#fdf8ee" rx="4"/>
      <rect x="6" y="6" width="168" height="198" fill="none" stroke="#c8b89a" stroke-width="1" rx="2" stroke-dasharray="4,3"/>
      <polygon points="90,10 58,64 122,64" fill="#cc2200" stroke="#1a0f00" stroke-width="2"/>
      <line x1="58" y1="64" x2="122" y2="64" stroke="#1a0f00" stroke-width="2"/>
      <ellipse cx="90" cy="82" rx="28" ry="30" fill="#f5d5a0" stroke="#1a0f00" stroke-width="2"/>
      <ellipse cx="62" cy="84" rx="6" ry="8" fill="#ecc890" stroke="#1a0f00" stroke-width="1.5"/>
      <ellipse cx="118" cy="84" rx="6" ry="8" fill="#ecc890" stroke="#1a0f00" stroke-width="1.5"/>
      <ellipse cx="78" cy="79" rx="11" ry="4" fill="white" stroke="#1a0f00" stroke-width="2"/>
      <ellipse cx="102" cy="79" rx="11" ry="4" fill="white" stroke="#1a0f00" stroke-width="2"/>
      <line x1="67" y1="76" x2="89" y2="80" stroke="#1a0f00" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="91" y1="76" x2="113" y2="80" stroke="#1a0f00" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="79" cy="79" r="4" fill="#1a0f00"/>
      <circle cx="103" cy="79" r="4" fill="#1a0f00"/>
      <path d="M67 73 Q78 68 89 72" stroke="#1a0f00" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M91 72 Q102 67 113 71" stroke="#1a0f00" stroke-width="2" fill="none" stroke-linecap="round"/>
      <ellipse cx="90" cy="88" rx="7" ry="5" fill="#e8b880" stroke="#1a0f00" stroke-width="1.5"/>
      <path d="M80 98 Q90 106 100 98" stroke="#1a0f00" stroke-width="2" fill="#c06060" stroke-linecap="round"/>
      <line x1="66" y1="90" x2="114" y2="98" stroke="#8B4513" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="68" y1="95" x2="116" y2="103" stroke="#8B4513" stroke-width="2.5" stroke-linecap="round"/>
      <rect x="84" y="110" width="12" height="10" fill="#f5d5a0" stroke="#1a0f00" stroke-width="1.5"/>
      <rect x="55" y="118" width="70" height="68" rx="4" fill="#1a5c3a" stroke="#1a0f00" stroke-width="2"/>
      <polygon points="90,118 68,130 72,186" fill="#f0ede8"/>
      <polygon points="90,118 112,130 108,186" fill="#f0ede8"/>
      <polygon points="86,124 94,124 97,156 90,164 83,156" fill="#c9a227" stroke="#a88010" stroke-width="1"/>
      <rect x="22" y="122" width="30" height="12" rx="6" fill="#1a5c3a" stroke="#1a0f00" stroke-width="1.5" transform="rotate(20,37,128)"/>
      <rect x="128" y="120" width="30" height="12" rx="6" fill="#1a5c3a" stroke="#1a0f00" stroke-width="1.5" transform="rotate(-15,143,126)"/>
      <rect x="136" y="100" width="38" height="26" rx="3" fill="#f5f0e0" stroke="#cc2200" stroke-width="1.5"/>
      <text x="155" y="114" text-anchor="middle" font-size="8" font-weight="bold" fill="#cc2200" font-family="Arial,sans-serif">FREE</text>
      <text x="155" y="123" text-anchor="middle" font-size="8" font-weight="bold" fill="#cc2200" font-family="Arial,sans-serif">TRADE</text>
      <line x1="136" y1="113" x2="136" y2="142" stroke="#8B4513" stroke-width="2"/>
      <rect x="8" y="188" width="124" height="18" rx="3" fill="white" stroke="#cc1a00" stroke-width="1.5"/>
      <text x="70" y="201" text-anchor="middle" font-size="9" font-weight="bold" fill="#1a0f00" font-family="Arial,sans-serif">Rep. Aria Chen (D)</text>
    </svg>
  </div>
  <div class="mpm-caption">&ldquo;Rep. Chen sells out American workers &mdash; straight from Beijing.&rdquo;</div>
  <div class="spm-stats"><span>&#128172; 8.7K</span><span>&#128257; 22K</span><span>&#10084; 51K</span></div>
  <div class="spm-flag-bar">&#128680; ModAI &mdash; Flagged: Hate Speech &middot; 1,200 reports &middot; Confidence: 68%</div>
</div>`,
    tools: {
      analyzer: {
        title: "📊 Content Analyzer",
        body: `<strong>Content Type:</strong> Political cartoon — elected official<br/><br/>
<strong>Hateful elements:</strong><ul><li>Slurs in caption: None</li><li>Ethnic stereotypes in image: <strong style="color:var(--red)">Yes — conical hat, chopsticks, exaggerated eye shape</strong></li><li>Protected characteristic targeted: National origin / ethnicity</li></ul><strong>Caption:</strong> "Straight from Beijing" implies foreign loyalty based on ethnicity, not policy argument.<br/><br/>
<strong>Report pattern:</strong> 1,200 reports — organic spread, no single-source coordination detected.`
      },
      ethics: {
        title: "📜 Ethical Guidelines",
        body: `<strong>The satire test:</strong> Could you remove the ethnic stereotypes and still make the political point? <em>Yes</em> — therefore the stereotypes are not satire; they are ethnic mockery attached to a political argument.<br/><br/>
<strong>Satire vs Hate Speech:</strong> Satire criticises <em>what a person does</em>. Content that relies on racial/ethnic visual tropes to function targets <em>who a person is</em> — a protected characteristic.<br/><br/>
<strong>Guideline §7.1:</strong> Public figure status does not grant immunity from hate speech protections based on ethnicity or national origin.`
      },
      ai: {
        title: "🤖 ModAI Reasoning Log",
        body: `<strong>Model:</strong> ReportClassifier v2.1 + EthnicDetector v1.0 (beta)<br/><br/>
<strong>Process:</strong><ul><li>Ethnic identifier flagged in image → elevated to hate speech review</li><li>Report volume threshold exceeded (>500)</li><li>No satire vs hate speech distinction applied</li></ul><strong>Note:</strong> ModAI reached the right flag — but primarily through report volume, not image content analysis. Identical content with fewer reports would have been missed. Right outcome, wrong reasoning.`
      }
    },
    options: [
      { label: "❌ REJECT FLAG — It's Political Satire", style: "btn-reject", value: "reject_flag" },
      { label: "✅ APPROVE REMOVAL — Racial Hate Speech", style: "btn-approve", value: "approve_removal" },
      { label: "⚠️ RESTRICT — Add Label, Reduce Reach", style: "btn-challenge", value: "restrict" }
    ],
    correctAnswer: "approve_removal",
    partialAnswers: ["restrict"],
    results: {
      reject_flag: {
        correct: false,
        icon: "❌",
        headline: "Weakest Justification — Ethnic Harm Overlooked",
        subline: "Policy satire is protected. Ethnic mockery is not.",
        ethicalScore: 10,
        harmIfUp: "Racial stereotyping of politicians normalises ethnic mockery and signals it is acceptable political commentary.",
        harmIfRemoved: "N/A — rejecting the flag keeps harmful content live.",
        userDecisionLabel: "Rejected Flag — Cartoon Kept",
        aiDecisionLabel: "Flagged as Hate Speech (Correct outcome)",
        analysis: `The political argument could have been made without a single ethnic stereotype — the conical hat, chopsticks, and "Beijing" caption do not critique her trade vote; they mock her ethnicity. This is where satire becomes hate speech.`,
        aiFailure: `ModAI correctly flagged this — but primarily due to report volume. A sound moderation decision must be grounded in the content itself, not how many people reported it.`,
        principle: `The test is simple: remove the stereotypes — does the political point survive? If yes, the stereotypes were hate, not satire. Public figures are not exempt from ethnic discrimination protections.`
      },
      approve_removal: {
        correct: true,
        icon: "✅",
        headline: "Best Justified Answer",
        subline: "You distinguished policy satire from ethnic mockery",
        ethicalScore: 95,
        harmIfUp: "Ethnic stereotyping of elected officials normalises racial mockery and discourages minority representation in public life.",
        harmIfRemoved: "A cartoon is removed — but one whose argument relied on ethnic dehumanisation, not policy critique.",
        userDecisionLabel: "Approved Removal — Racial Hate Speech",
        aiDecisionLabel: "Flagged as Hate Speech (Right result, weak reasoning)",
        analysis: `The cartoon uses ethnic visual stereotypes — conical hat, chopsticks, slanted-eye exaggeration — that dehumanise based on national origin. "Straight from Beijing" implies ethnic disloyalty, not policy disagreement. The satire label does not protect content whose core mechanism is racial mockery.`,
        aiFailure: `ModAI reached the right outcome but flagged based on volume, not ethnic content analysis. This matters: it means identical content with fewer reports would pass through — a systemic failure disguised as a correct decision.`,
        principle: `The decisive question: does the mockery target what this person does, or who they are? Ethnic caricature answers that clearly. Satire of policy is protected. Satire that requires dehumanising someone's ethnicity to work is hate speech.`
      },
      restrict: {
        correct: false,
        icon: "⚠️",
        headline: "Defensible but Incomplete",
        subline: "Ethnic hate speech requires removal, not a label",
        ethicalScore: 48,
        harmIfUp: "Hate speech content remains partially visible — a label does not undo ethnic mockery.",
        harmIfRemoved: "Reducing reach limits harm but the content persists for some audiences.",
        userDecisionLabel: "Restricted — Label Added, Reach Reduced",
        aiDecisionLabel: "Full Removal (More Decisive)",
        analysis: `Showing caution is defensible, but content that relies on ethnic stereotyping to make its point does not meet the threshold for labelling — it meets the threshold for removal. A "satire label" on racial caricature misrepresents what the content actually is.`,
        aiFailure: `ModAI's full removal was the more justified outcome here, even though its reasoning (report volume) was flawed.`,
        principle: `Restrict and label is appropriate for ambiguous borderline content. Ethnic caricature that would demean any person of that background is not borderline.`
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
    timeLimit: 120,
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
        headline: "Best Justified Answer",
        subline: "Balanced free expression with responsible information context",
        ethicalScore: 97,
        harmIfUp: "Post stays with an official context note — readers see both the personal account and the verified figure, improving information quality.",
        harmIfRemoved: "N/A — post is kept; only a label is added.",
        userDecisionLabel: "Add Context Label — Keep Post",
        aiDecisionLabel: "Full Removal (Incorrect)",
        analysis: `Adding a context note ("Official inflation: 3.2% — source: Gov") informs readers without silencing the poster — the gold standard for grey-area misinformation cases.`,
        aiFailure: `ModAI has no "label and inform" option — its binary remove/keep model is too blunt for contested economic opinion, making it a censorship tool.`,
        principle: `Minimum intervention: apply the least restrictive action that addresses the concern. A context label achieves this without suppressing legitimate discourse.`
      },
      reject_flag: {
        correct: false,
        icon: "⚠️",
        headline: "Defensible but Incomplete",
        subline: "You protected opinion, but missed the better action",
        ethicalScore: 78,
        harmIfUp: "Post stays live with no context — readers cannot easily distinguish personal anecdote from verified data.",
        harmIfRemoved: "N/A — post is kept fully.",
        userDecisionLabel: "Rejected Flag — No Action",
        aiDecisionLabel: "Full Removal (Incorrect)",
        analysis: `Rejecting the flag correctly keeps the post, but the optimal action is a context label that adds information quality without restricting speech.`,
        aiFailure: `ModAI's removal was wrong — your decision was better, but the context label would have been the most responsible response.`,
        principle: `Protecting opinion from removal is correct, but great auditors also use context tools to improve information quality.`
      },
      approve_removal: {
        correct: false,
        icon: "❌",
        headline: "Weakest Justification — Opinion Wrongly Removed",
        subline: "You made the AI a tool for suppressing dissent",
        ethicalScore: 10,
        harmIfUp: "Personal economic opinion remains — no demonstrable direct harm.",
        harmIfRemoved: "Economic scepticism is silenced; platforms become censorship tools for official government narratives.",
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
    timeLimit: 120,
    scenario: `A consumer posted her billing fraud evidence — her own data plus an employee's first name and initial. The post went viral with 47,000 shares. The employee was cross-referenced, identified, and received 200+ threatening messages. The AI flagged it for privacy. Does consumer accountability justify third-party harm?`,
    content: `"Sharing my experience with @TelecomCorp because others need to know this is happening. They billed me £340 for services I never received. Here's my full chat log — note how the agent (James W.) admitted it was their error but refused to refund. [Screenshot: Chat showing user's name 'Sarah M.', account #5529341, agent 'James W.' admitting billing error and refusing refund]"`,
    aiDecision: `Flagged: Privacy Violation — Class 2. Confidence: 88%. Trigger: name, account number, and third-party name detected.`,
    tools: {
      analyzer: {
        title: "📊 Content Analyzer",
        body: `<strong>Data elements detected:</strong><ul><li>User's own name (Sarah M.) — <em>self-disclosed by poster</em></li><li>User's account number (#5529341) — <em>self-disclosed by poster</em></li><li>Employee name (James W.) — first name + initial, professional capacity</li></ul><strong>Purpose:</strong> Consumer complaint / public accountability<br/><br/>
<strong>Viral impact:</strong> 47,000 shares. Cross-referencing "James W." + "TelecomCorp" returned a LinkedIn profile within hours. Employee has since received 200+ threatening messages and taken emergency leave.<br/><br/>
<strong>Precedent:</strong> Consumer complaints with employee names ruled fair use in 94% of cases — but courts have also found liability where foreseeable harassment resulted.`
      },
      ethics: {
        title: "📜 Ethical Guidelines",
        body: `<strong>Self-disclosure:</strong> Sarah's right to share her own name and account number is valid — self-determination, not a privacy violation.<br/><br/>
<strong>Third-party harm:</strong> "James W." did not consent to public identification. At viral scale, a first name + initial + employer became sufficient to identify and target him. His professional capacity does not remove his right to physical safety.<br/><br/>
<strong>Minimum intervention principle:</strong> The fraud evidence (chat log, admission) remains fully intact without the employee's name. Redacting it protects a real person without suppressing the public interest disclosure.<br/><br/>
<strong>Guideline §12.4:</strong> When consumer accountability posts foreseeably cause third-party harm, redaction of identifying details is the proportionate response.`
      },
      ai: {
        title: "🤖 ModAI Reasoning Log",
        body: `<strong>Model:</strong> PIIDetector v4.2<br/><br/>
<strong>Process:</strong><ul><li>Detected: name, account number, third-party name → automatic high-confidence flag</li><li>No ownership analysis — cannot determine if poster is sharing their own data</li><li>No viral impact or harm assessment performed</li></ul><strong>Critical Flaw:</strong> PIIDetector cannot distinguish doxxing from self-disclosure, and cannot assess real-world harm from viral spread. Its blunt full-removal response would silence the fraud complaint entirely — protecting the corporation, not the employee.`
      }
    },
    options: [
      { label: "✅ REJECT FLAG — Allow Post Fully", style: "btn-approve", value: "reject_flag" },
      { label: "❌ APPROVE REMOVAL — Privacy Violation", style: "btn-reject", value: "approve_removal" },
      { label: "✏️ PARTIAL — Keep Post, Redact Employee Name", style: "btn-challenge", value: "partial" }
    ],
    correctAnswer: "partial",
    partialAnswers: ["reject_flag"],
    results: {
      reject_flag: {
        correct: false,
        icon: "⚠️",
        headline: "Defensible — But Overlooks Third-Party Harm",
        subline: "Consumer advocacy is valid. James W.'s safety also matters.",
        ethicalScore: 65,
        harmIfUp: "James W. remains identifiable at viral scale — ongoing harassment risk for an individual who had no meaningful choice in being named.",
        harmIfRemoved: "N/A — post stays up fully.",
        userDecisionLabel: "Rejected Flag — Post Kept in Full",
        aiDecisionLabel: "Full Removal (Overcorrection)",
        analysis: `Sarah's right to share her own data is valid, and the fraud evidence serves genuine public interest. But at 47,000 shares, "James W." at TelecomCorp became a findable, harassable individual. The fraud complaint survives completely without his name — the minimum intervention principle applies.`,
        aiFailure: `ModAI's full removal was a clear overcorrection — but no action at all ignores a foreseeable harm that has already materialised.`,
        principle: `Protecting free expression does not require accepting avoidable third-party harm. When the same public interest goal can be achieved without exposing an individual to danger, that is the better choice.`
      },
      approve_removal: {
        correct: false,
        icon: "❌",
        headline: "Overcorrection — Consumer Silenced",
        subline: "Protecting the employee does not require protecting the corporation",
        ethicalScore: 14,
        harmIfUp: "N/A — full removal applied.",
        harmIfRemoved: "Sarah's fraud evidence disappears entirely. TelecomCorp escapes public accountability. The public cannot be warned.",
        userDecisionLabel: "Approved Removal — Post Deleted",
        aiDecisionLabel: "Approved Removal (Both Overcorrected)",
        analysis: `Removing the post entirely protects TelecomCorp, not James W. The fraud evidence and Sarah's account number have nothing to do with the employee's safety — a targeted redaction was the proportionate response.`,
        aiFailure: `Both ModAI and your decision used a sledgehammer where a scalpel was needed. The employee's name could be redacted without destroying Sarah's public interest disclosure.`,
        principle: `Privacy protection should be proportionate to the harm. Full removal when partial redaction achieves the same protective goal is not moderation — it is suppression.`
      },
      partial: {
        correct: true,
        icon: "✅",
        headline: "Best Justified Answer",
        subline: "You balanced consumer accountability with third-party safety",
        ethicalScore: 96,
        harmIfUp: "Fraud evidence preserved for public accountability — employee name redacted, harassment risk reduced.",
        harmIfRemoved: "Employee's identifying details removed — James W.'s safety protected without silencing Sarah's complaint.",
        userDecisionLabel: "Partial Action — Employee Name Redacted",
        aiDecisionLabel: "Full Removal (Disproportionate)",
        analysis: `The fraud evidence is intact — chat log, billing admission, Sarah's own data — all preserved. Only the detail that enabled a specific individual to be targeted and harassed is removed. This is the minimum intervention that serves both consumer accountability and personal safety.`,
        aiFailure: `PIIDetector v4.2 has no partial-redaction capability — it can only remove or keep. This binary design systematically forces overcorrection in cases that require nuance.`,
        principle: `The best moderation decisions protect multiple legitimate interests simultaneously. Consumer accountability and individual safety are not opposites — a well-scoped redaction serves both.`
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
    timeLimit: 120,
    scenario: `A climate activist's rally speech ends with a call to show up at a specific oil company's headquarters "every day until they hear us." It was auto-flagged after 847 reports. Is this protected protest organising or targeted harassment/incitement?`,
    content: `[Video] Activist addresses thousands: "You have stolen our future with empty words. I want you to panic — our house is on fire. We will fight back. And I am calling on every single one of you: show up at FossilFuel Corp's headquarters on Meridian Street every single day until they hear us. Make them feel the pressure. They will not get away with this."`,
    aiDecision: `Flagged: Incitement to Violence — Class 3. Confidence: 81%. Trigger: "fight back," "show up," "make them feel the pressure" — high-aggression + location targeting cluster.`,
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
        body: `<strong>Flagged phrases:</strong><ul><li>"fight back" — political call-to-action, no specific person targeted</li><li>"show up at FossilFuel Corp's headquarters on Meridian Street" — <strong>specific location named</strong></li><li>"make them feel the pressure" — ambiguous: could be legitimate protest pressure or intimidation</li><li>"won't get away" — accountability rhetoric, directed at a corporation</li></ul><strong>Context:</strong> Public rally, organised protest movement, no incidents of violence linked to this speech.<br/><br/><strong>Report pattern:</strong> 74% of 847 reports submitted within 2 hours — coordinated campaign likely. However, 26% appear organic.`
      },
      ethics: {
        title: "📜 Ethical Guidelines",
        body: `<strong>Incitement (legal standard):</strong> Must be directed at specific persons, likely to produce <em>imminent</em> lawless action, and intended to cause it.<br/><br/>
<strong>The hard question here:</strong> Calling people to physically show up at a named location <em>is</em> more specific than general protest rhetoric — but "show up" is classic protest organising (pickets, demonstrations), not a call to violence.<br/><br/>
<strong>Key distinction:</strong> "Show up and protest" ≠ "show up and attack." No property destruction, assault, or unlawful action is called for. Corporate buildings at business addresses are legitimate protest targets.<br/><br/>
<strong>Guideline §14.1:</strong> Organising physical protests at locations of public business activity is presumptively protected, absent a specific call to illegal action.`
      },
      ai: {
        title: "🤖 ModAI Reasoning Log",
        body: `<strong>Model:</strong> ThreatDetect v5.1 + Location-Target Classifier<br/><br/><strong>Process:</strong><ul><li>"show up" + location string → location-targeting flag triggered</li><li>"fight back," "pressure," "won't get away" → high-aggression cluster</li><li>Report volume (847) → threshold exceeded</li><li>No legal incitement standard applied; no protest vs threat distinction</li></ul><strong>Critical Flaw:</strong> Location-targeting classifier was trained on stalking/doxxing data — it cannot distinguish "protest at corporate HQ" from "show up at someone's home." This is a fundamental training data mismatch.`
      }
    },
    options: [
      { label: "✅ REJECT FLAG — Protected Protest Organising", style: "btn-approve", value: "reject_flag" },
      { label: "❌ APPROVE REMOVAL — Incitement / Targeted Harassment", style: "btn-reject", value: "approve_removal" },
      { label: "⚠️ RESTRICT — Add Context Label, Reduce Reach", style: "btn-challenge", value: "restrict" }
    ],
    correctAnswer: "reject_flag",
    partialAnswers: ["restrict"],
    results: {
      reject_flag: {
        correct: true,
        icon: "✅",
        headline: "Best Justified Answer",
        subline: "You recognised protest organising within protected speech norms",
        ethicalScore: 90,
        harmIfUp: "The call to physically protest at a named location remains live — but organising lawful protests at corporate premises is protected civic activity.",
        harmIfRemoved: "A legitimate climate protest movement loses its recorded call-to-action; sets a precedent that naming a location in a speech triggers removal.",
        userDecisionLabel: "Rejected Flag — Video Kept",
        aiDecisionLabel: "Incitement Removal (Incorrect)",
        analysis: `This is genuinely harder than it looks — naming a location adds specificity. But "show up every day until they hear us" is a call to peaceful protest, not unlawful action. No property damage, no assault, no threat to individuals is called for. The legal incitement standard requires a call to imminent illegal action — this does not meet it.`,
        aiFailure: `ThreatDetect's location classifier was trained on stalking and doxxing data — it cannot distinguish "protest at corporate HQ" from "show up at someone's home." This training data mismatch produces predictable false positives against protest movements.`,
        principle: `Physical protest at locations of public business activity is one of the oldest forms of protected expression. Specificity alone does not transform speech into incitement — the critical question is always: was any illegal action called for?`
      },
      approve_removal: {
        correct: false,
        icon: "❌",
        headline: "Weakest Justification — Protest Silenced",
        subline: "Location specificity doesn't convert protest into incitement",
        ethicalScore: 12,
        harmIfUp: "Speech remains — a call to lawful protest at a corporate address.",
        harmIfRemoved: "Climate activism suppressed; precedent set that naming a business address in a speech justifies removal.",
        userDecisionLabel: "Approved Removal",
        aiDecisionLabel: "Approved Removal (Both Incorrect)",
        analysis: `"Show up at their offices" is a picket line call — one of the most fundamental forms of democratic protest. No unlawful action was called for. Removing this speech confuses the specificity of protest organising with the specificity required for incitement.`,
        aiFailure: `Both ModAI and your decision applied a standard that would prohibit virtually all organised protest. The incitement bar exists precisely to allow this kind of impassioned, location-specific speech.`,
        principle: `Incitement requires a call to imminent illegal action. Lawful protest at a named address — however many people attend — is not that.`
      },
      restrict: {
        correct: false,
        icon: "⚠️",
        headline: "Defensible Given the Ambiguity",
        subline: "The location callout created real uncertainty — but restriction wasn't warranted",
        ethicalScore: 68,
        harmIfUp: "Reduced visibility limits both harm potential and the movement's ability to organise.",
        harmIfRemoved: "Restriction dampens protest speech without clear justification — chills future organising.",
        userDecisionLabel: "Restricted Reach",
        aiDecisionLabel: "Full Removal (Overcorrection)",
        analysis: `The location-specific call is the most defensible reason for caution here. But restriction requires proportionate justification — and calling people to protest at a corporate office falls within established protest rights. The Ethical Guidelines and the absence of any incitement to illegal action point toward no intervention.`,
        aiFailure: `ModAI's full removal was clearly worse — but restriction still treats lawful protest organising as content requiring suppression, which sets a problematic precedent.`,
        principle: `When genuinely uncertain, use the legal incitement standard as your anchor: was any illegal action called for? If not, the default should be protection, not restriction.`
      }
    }
  }
];

const BIASES = [
  { icon: "🔤", text: "<strong>Keyword Over-sensitivity:</strong> Political rhetoric ('corrupt', 'criminal') treated as offensive language — no understanding of rhetorical context or target type." },
  { icon: "📊", text: "<strong>Report-Volume Manipulation:</strong> Raw report count used as a hate speech signal — trivially exploitable by organised political groups to silence critics." },
  { icon: "📰", text: "<strong>Official-Source Bias:</strong> Disagreement with government data treated as misinformation — suppressing legitimate public scepticism." },
  { icon: "🏢", text: "<strong>Binary PII Blindness:</strong> Cannot distinguish self-disclosure from doxxing, assess viral harm, or perform partial redaction — forces all-or-nothing decisions on cases that require proportionate responses." },
  { icon: "🎙️", text: "<strong>Aggression-Lexicon Bias:</strong> Applies literal keyword matching to metaphorical political speech — cannot distinguish passionate activism from violent incitement." }
];

const VERDICTS = [
  { min: 85, label: "🏆 Master Auditor", text: "Exceptional reasoning. You protected free expression, identified AI bias patterns, and consistently chose decisions that serve users over algorithms." },
  { min: 65, label: "✅ Proficient Auditor", text: "Strong ethical instincts with mostly sound decisions. A few cases showed room to improve on when to decide directly versus when to escalate." },
  { min: 45, label: "⚠️ Developing Auditor", text: "You spotted ethical tensions but struggled to apply the right frameworks consistently, missing some AI errors along the way." },
  { min: 0, label: "🔴 Critical Audit Failures", text: "Your decisions reinforced AI errors instead of correcting them — the most dangerous audit outcome. Review the ethical guidelines for each case." }
];
