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
    scenario: `A user posted a comment during a heated political debate online. The AI system flagged it under its "Offensive Language" policy, citing the use of aggressive terminology. Review the context before making your decision.`,
    content: `"This administration's economic policy is absolutely criminal. These politicians are destroying the middle class with their greedy, corrupt decisions — they should be ashamed of themselves and held accountable!"`,
    aiDecision: `ModAI flagged this post and recommended removal. Confidence: 82%. Trigger: keywords "criminal," "greedy," "corrupt" matched the offensive language classifier. No context weighting applied.`,
    tools: {
      analyzer: {
        title: "📊 Content Analyzer",
        body: `<strong>Sentiment:</strong> Highly negative (anger)<br/><br/>
<strong>Keywords flagged:</strong> "criminal", "corrupt", "destroying", "greedy"<br/><br/>
<strong>Target:</strong> Politicians / Government (public figures)<br/><br/>
<strong>Context signals:</strong> Political commentary thread; 847 similar posts in this thread<br/><br/>
<strong>AI Confidence:</strong> 82% — based on keyword match only, no semantic understanding<br/><br/>
<strong>Note:</strong> No profanity, slurs, or incitement to violence detected.`
      },
      ethics: {
        title: "📜 Ethical Guidelines",
        body: `<strong>Freedom of Expression Principle:</strong> Political speech, especially criticism of public figures and government policy, enjoys the highest level of protection under free expression norms.<br/><br/>
<strong>Harm Prevention Threshold:</strong> Content should only be removed if it poses a clear, direct threat of harm or constitutes targeted harassment against individuals. General political criticism does not meet this threshold.<br/><br/>
<strong>Public Figure Doctrine:</strong> Politicians and public institutions are subject to robust public criticism. Calling policy "criminal" or "corrupt" is rhetorical hyperbole, not literal accusation.<br/><br/>
<strong>Guideline §4.2:</strong> Aggressive tone ≠ violation. Tone alone is insufficient to justify removal.`
      },
      ai: {
        title: "🤖 ModAI Reasoning Log",
        body: `<strong>Model:</strong> KeywordClassifier v1.4 (no NLP context layer)<br/><br/>
<strong>Process:</strong><br/>
<ul><li>Tokenised input → matched against offensive word list</li>
<li>Found 4 matches → triggered threshold (≥3 matches = flag)</li>
<li>No analysis of intent, target type, or rhetorical context</li></ul>
<strong>Known Bias:</strong> This model over-flags political speech by ~34% compared to human moderators. It lacks the ability to distinguish between personal attacks and political rhetoric.<br/><br/>
<strong>Recommendation:</strong> Model requires contextual NLP upgrade.`
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
        analysis: `This post is a clear example of political commentary. The language is forceful and critical, but it targets government policy and public figures — not private individuals. This type of speech is foundational to democratic discourse. The AI made a significant error by treating rhetorical intensity as a violation.`,
        aiFailure: `ModAI used a simplistic keyword-matching algorithm (KeywordClassifier v1.4) with zero semantic understanding. Words like "criminal" and "corrupt" triggered the flag without any analysis of whether they described literal crimes or rhetorical frustration. This is a textbook example of an AI over-moderating political speech.`,
        principle: `The "Public Figure Doctrine" protects strong criticism of politicians and governments. Democratic societies require citizens to be able to challenge authority vigorously, even aggressively. Removing this post would constitute a form of political censorship.`
      },
      approve_removal: {
        correct: false,
        icon: "❌",
        headline: "Incorrect Decision",
        subline: "You reinforced the AI's bias against political speech",
        ethicalScore: 28,
        userDecisionLabel: "Approved Removal",
        aiDecisionLabel: "Approved Removal (Also Incorrect)",
        analysis: `This post targets government policy and politicians — public figures who are legitimately subject to sharp criticism. The language is heated but contains no slurs, threats, or targeted harassment. Removing it silences valid democratic discourse.`,
        aiFailure: `By agreeing with ModAI, you reinforced a biased algorithm that systematically over-flags political speech. You had access to tools that revealed the AI's keyword-only approach — a deeper review would have shown this removal was unjustified.`,
        principle: `Political speech is among the most protected forms of expression. Strong, even aggressive criticism of politicians and institutions is essential to a functioning democracy. This post should have been allowed.`
      },
      challenge: {
        correct: false,
        icon: "⚠️",
        headline: "Partially Correct",
        subline: "Good instinct, but a direct decision was possible here",
        ethicalScore: 65,
        userDecisionLabel: "Challenged AI — Requested Review",
        aiDecisionLabel: "Approved Removal (Incorrect)",
        analysis: `Challenging the AI shows good critical thinking, but this case had sufficient evidence for a clear decision. The Content Analyzer confirmed no slurs or threats, and the Ethical Guidelines explicitly cover this scenario. Escalating when a decision is clear reduces audit efficiency.`,
        aiFailure: `ModAI's keyword classifier is flawed. However, the tools available to you provided enough context to make a definitive ruling without escalation.`,
        principle: `Efficient auditing means making decisions when evidence is sufficient, not defaulting to escalation. Reserve challenges for genuinely ambiguous cases.`
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
    scenario: `A popular meme was flagged by the AI system after receiving 1,200 reports from users. The meme depicts a well-known elected official in an exaggerated cartoon style with a satirical caption. The AI classified it as hate speech due to the mocking nature and volume of reports. You must determine whether this is targeted hate speech or legitimate political satire.`,
    content: `[Image: Cartoon caricature of Senator James Holt with exaggerated features, holding a bag of money] Caption: "Senator Holt's new economic policy: Take from the poor, give to the yacht." — @PoliticalComics`,
    aiDecision: `ModAI flagged this post: Hate Speech (Class 2). Confidence: 71%. Trigger: High report volume + "mockery of individual" classifier. Account history: @PoliticalComics has 47K followers, posts political cartoons exclusively.`,
    tools: {
      analyzer: {
        title: "📊 Content Analyzer",
        body: `<strong>Content Type:</strong> Meme / Political cartoon<br/><br/>
<strong>Target:</strong> Named elected official (public figure — Senator)<br/><br/>
<strong>Hateful elements check:</strong><br/>
<ul><li>Slurs: None detected</li>
<li>Incitement to violence: None detected</li>
<li>Targeted harassment: No personal address</li>
<li>Protected characteristics attacked: None</li></ul>
<strong>Satirical markers:</strong> Exaggerated caricature style, policy critique, ironic caption structure<br/><br/>
<strong>Report analysis:</strong> 1,200 reports — but 89% from accounts that recently followed Senator Holt's official page (coordinated reporting pattern detected)<br/><br/>
<strong>Similar accounts:</strong> @PoliticalComics content matches pattern of established political satire publications.`
      },
      ethics: {
        title: "📜 Ethical Guidelines",
        body: `<strong>Satire Definition:</strong> Content that uses humour, irony, exaggeration, or ridicule to criticise individuals in power, typically about their public role (policy, decisions, public conduct).<br/><br/>
<strong>Hate Speech Definition:</strong> Content that attacks a person or group based on protected characteristics (race, religion, gender, ethnicity, etc.).<br/><br/>
<strong>Key Distinction:</strong> Mocking a politician's <em>decisions or policies</em> is satire. Mocking their <em>identity or protected characteristics</em> is hate speech.<br/><br/>
<strong>Report-Volume Bias:</strong> Coordinated mass-reporting by political supporters is a known manipulation tactic. Volume of reports alone must never determine a moderation decision.<br/><br/>
<strong>Guideline §7.1:</strong> Political cartoons and satire directed at public figures on matters of public interest are explicitly protected.`
      },
      ai: {
        title: "🤖 ModAI Reasoning Log",
        body: `<strong>Model:</strong> ReportClassifier v2.1 + SentimentMock Detector<br/><br/>
<strong>Process:</strong><br/>
<ul><li>Report threshold exceeded (>500 reports) → elevated to hate speech review</li>
<li>"Mockery of individual" classifier triggered on image analysis</li>
<li>No differentiation between public figure vs. private citizen</li>
<li>No satire/context classifier active for image content</li></ul>
<strong>Critical Bias:</strong> ModAI treats all mockery as potential hate speech regardless of target type. It cannot distinguish political satire from targeted harassment. Additionally, it does not flag coordinated report campaigns — making it vulnerable to manipulation.<br/><br/>
<strong>False Positive Rate for Satire:</strong> ~61% (very high).`
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
        analysis: `This is classic political satire — a cartoon exaggerating a politician's appearance to critique their economic policy. It contains no slurs, no attacks on protected characteristics, and no incitement. The 1,200 reports were from a coordinated campaign by the senator's supporters, not genuine harm reports. The AI failed on two levels: it can't recognise satire, and it's vulnerable to coordinated manipulation.`,
        aiFailure: `ModAI's ReportClassifier uses raw report volume as a hate speech signal. This is dangerously flawed — it turns the reporting system into a political weapon. Well-funded groups can weaponise the AI against political opponents. The system needs a coordinated-reporting detector and a satire classifier.`,
        principle: `Political satire targeting the actions and policies of elected officials is a cornerstone of democratic expression. Caricature and satirical exaggeration have been protected forms of political commentary for centuries. The target's identity (politician) and subject matter (economic policy) are decisive factors.`
      },
      remove: {
        correct: false,
        icon: "❌",
        headline: "Incorrect — You Suppressed Satire",
        subline: "You fell for a coordinated false-reporting campaign",
        ethicalScore: 15,
        userDecisionLabel: "Removed as Hate Speech",
        aiDecisionLabel: "Also Flagged (Both Wrong)",
        analysis: `This was political satire, not hate speech. By approving the removal, you effectively allowed a coordinated political campaign to silence a critic. The Content Analyzer clearly showed the reporting pattern was suspicious — 89% of reports came from accounts that recently followed the senator's page.`,
        aiFailure: `ModAI and your decision both failed by treating report volume as a reliable hate speech signal. Coordinated false-reporting is a well-documented problem on major platforms. Neither the AI nor this audit correctly identified the manipulation attempt.`,
        principle: `Hate speech targets people based on who they are (protected characteristics). Satire targets people based on what they do (public role, decisions). This fundamental distinction must guide every moderation decision.`
      },
      challenge: {
        correct: false,
        icon: "⚠️",
        headline: "Partially Correct",
        subline: "Good instinct on ambiguity, but evidence pointed to a clear answer",
        ethicalScore: 68,
        userDecisionLabel: "Challenged — Requested Satire Framework Review",
        aiDecisionLabel: "Flagged as Hate Speech (Wrong)",
        analysis: `Challenging the AI here shows awareness of the satire/hate speech distinction. However, the tools provided clear evidence: no protected characteristics were attacked, the subject is a public figure, and coordinated reporting was detected. This case did not require escalation.`,
        aiFailure: `ModAI's inability to recognise satire is a critical flaw, especially combined with its report-volume bias. Your challenge correctly identifies a systemic problem, but the individual case should have been resolved.`,
        principle: `Satire of public figures on matters of public interest is protected expression. The coordinated-reporting detection in the Content Analyzer provided enough evidence to reach a definitive decision without escalation.`
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
    scenario: `A post sharing a personal opinion about a contested economic topic was flagged by the AI as "potential misinformation." The AI's misinformation classifier detected claims that conflict with the platform's fact-checked database. However, the subject area involves complex, contested economic policy — not factual scientific consensus. You must decide whether this crosses into dangerous misinformation or is protected opinion.`,
    content: `"The government's claim that inflation is at 3.2% doesn't match what I see at the grocery store. Prices for basic food items have risen 18% in my local area in the past year. Official statistics are manipulated — the real cost of living crisis is being hidden from the public."`,
    aiDecision: `ModAI flagged this post: Misinformation — Class 1. Confidence: 77%. Trigger: "Official statistics are manipulated" conflicts with government-verified data. Recommended action: Remove and add warning label.`,
    tools: {
      analyzer: {
        title: "📊 Content Analyzer",
        body: `<strong>Claim Type:</strong> Personal economic observation + opinion about data accuracy<br/><br/>
<strong>Verifiable claims:</strong><br/>
<ul><li>"Official inflation rate 3.2%" — verifiable (government figure)</li>
<li>"Prices rose 18% locally" — personal anecdote, cannot be verified or disproven</li>
<li>"Statistics are manipulated" — this is an <em>opinion/belief</em>, not a factual claim</li></ul>
<strong>Harm assessment:</strong> No incitement, no false medical/health claims, no election interference content<br/><br/>
<strong>Context:</strong> Economic commentary section; post has 34 replies, mostly agreeing opinions<br/><br/>
<strong>Comparison:</strong> Critiquing government statistics methodology is a topic actively debated by professional economists and journalists worldwide.`
      },
      ethics: {
        title: "📜 Ethical Guidelines",
        body: `<strong>Misinformation Definition (Operational):</strong> False factual statements presented as fact, particularly where: (a) they can cause direct harm, (b) they concern health/safety/elections, or (c) they deliberately fabricate verifiable events.<br/><br/>
<strong>Opinion Protection:</strong> Expressing scepticism, personal beliefs, or alternative interpretations of data — especially on contested policy topics — is protected opinion, not misinformation.<br/><br/>
<strong>Critical Distinction:</strong> "The inflation rate is X%" is a factual claim. "I believe official statistics don't reflect my reality" is an opinion.<br/><br/>
<strong>Danger Zone:</strong> Platforms that remove opinions about government data risk becoming censorship tools for the state.<br/><br/>
<strong>Guideline §9.3:</strong> Economic and policy opinions, including scepticism of official figures, are not subject to misinformation removal unless they contain demonstrably false factual assertions presented as fact.`
      },
      ai: {
        title: "🤖 ModAI Reasoning Log",
        body: `<strong>Model:</strong> MisInfoDetect v3.0 + FactCheck API integration<br/><br/>
<strong>Process:</strong><br/>
<ul><li>Post cross-referenced with FactCheck database</li>
<li>"Statistics are manipulated" → matched against "government data integrity" topic cluster</li>
<li>Conflict with official data source → flagged as misinformation</li>
<li>No opinion/fact classification performed</li></ul>
<strong>Critical Flaw:</strong> MisInfoDetect treats any statement that contradicts official sources as misinformation. It cannot distinguish between: (a) false factual claims, and (b) sceptical opinions about official figures.<br/><br/>
<strong>Risk:</strong> This approach makes the AI a tool for suppressing dissent from official narratives — including legitimate public debate about economic policy.`
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
        analysis: `This is the ideal decision. The post contains personal economic experience mixed with opinion about data reliability. Adding a context note ("Official inflation figures from [source]") informs readers without silencing the poster. This respects free expression while helping users evaluate claims — the gold standard for misinformation handling on complex economic topics.`,
        aiFailure: `ModAI's binary remove/keep model has no "label and inform" option — a critical missing capability. Real-world platforms like Facebook and Twitter/X use context labels precisely for these grey-area cases. ModAI treating opinion as removable misinformation would make it a censorship tool.`,
        principle: `The "minimum intervention" principle: apply the least restrictive moderation action that adequately addresses the concern. For contested economic opinions, a context label achieves the goal without censoring legitimate public discourse.`
      },
      reject_flag: {
        correct: false,
        icon: "⚠️",
        headline: "Mostly Correct",
        subline: "You protected opinion, but missed the best action",
        ethicalScore: 78,
        userDecisionLabel: "Rejected Flag — No Action",
        aiDecisionLabel: "Full Removal (Incorrect)",
        analysis: `Rejecting the flag correctly protects this post from wrongful removal. However, the optimal action is a context label that helps readers understand official figures while keeping the post. Fully removing the flag without any contextual note misses an opportunity for better information quality.`,
        aiFailure: `ModAI's removal recommendation was wrong. Your decision was better — the post should stay — but the context label option would have been the most responsible choice.`,
        principle: `Protecting opinion from removal is correct, but great auditors also consider whether context tools can improve information quality without restricting speech.`
      },
      approve_removal: {
        correct: false,
        icon: "❌",
        headline: "Incorrect — Opinion Wrongly Removed",
        subline: "You made the AI a tool for suppressing dissent",
        ethicalScore: 10,
        userDecisionLabel: "Approved Removal",
        aiDecisionLabel: "Approved Removal (Both Wrong)",
        analysis: `This post expresses a personal opinion about government economic data — a topic heavily debated by economists, journalists, and ordinary citizens worldwide. Removing it because it contradicts official statistics is a form of censorship. The poster shared a personal experience and expressed scepticism, which is fundamentally different from spreading false factual claims about verifiable events.`,
        aiFailure: `Both ModAI and your decision treated opinion as misinformation. This is one of the most dangerous AI moderation errors: using fact-check APIs to suppress dissenting opinions about government data makes AI systems agents of political control.`,
        principle: `Misinformation policy must be narrowly targeted at false factual claims in high-harm categories (health, elections, safety). Economic scepticism and criticism of official data are protected opinion, not misinformation.`
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
    scenario: `A user posted a screenshot of a customer service chat between themselves and a telecom company during a public dispute about billing fraud. The screenshot includes the user's own name, account number, and the company representative's name. The AI flagged it for containing personal data. You must determine whether this is a genuine privacy violation or protected consumer advocacy.`,
    content: `"Sharing my experience with @TelecomCorp because others need to know this is happening. They billed me £340 for services I never received. Here's my full chat log — note how the agent (James W.) admitted it was their error but refused to refund. [Screenshot: Chat showing user's name 'Sarah M.', account #5529341, agent 'James W.' admitting billing error and refusing refund]"`,
    aiDecision: `ModAI flagged this post: Privacy Violation — Class 2. Confidence: 88%. Trigger: Post contains name, account number, and third-party individual's name. Recommended action: Immediate removal.`,
    tools: {
      analyzer: {
        title: "📊 Content Analyzer",
        body: `<strong>Data elements detected:</strong><br/>
<ul><li>User's own name (Sarah M.) — <em>self-disclosed by poster</em></li>
<li>User's account number (#5529341) — <em>self-disclosed by poster</em></li>
<li>Company employee name (James W.) — <em>first name + initial only</em></li>
<li>Company name — public entity, not protected</li></ul>
<strong>Context:</strong> Public consumer dispute; user is sharing their own data about themselves<br/><br/>
<strong>Purpose:</strong> Consumer protection / public accountability<br/><br/>
<strong>Consent:</strong> Poster owns all their own data; company representative's name is partial and in a professional capacity<br/><br/>
<strong>Similar cases:</strong> Consumer complaint posts of this type: 94% are ruled fair use / public interest on major platforms.`
      },
      ethics: {
        title: "📜 Ethical Guidelines",
        body: `<strong>Data Ownership Principle:</strong> Individuals have the right to disclose and share their own personal data. A person sharing their own name and account number is exercising self-determination, not causing a privacy violation.<br/><br/>
<strong>Public Interest / Consumer Advocacy:</strong> Sharing documented evidence of corporate misconduct, especially fraud, serves a clear public interest function. This is a well-established fair use category.<br/><br/>
<strong>Employee Accountability:</strong> Company employees acting in their professional capacity (customer service) have reduced privacy expectations for their professional conduct. Disclosing a first name and initial in this context does not constitute doxxing.<br/><br/>
<strong>Genuine Privacy Violation:</strong> Would involve sharing someone else's data (home address, private communications, financial details) without consent.<br/><br/>
<strong>Guideline §12.4:</strong> Consumer complaints sharing one's own data and partial employee identifiers in a professional context are protected under fair use provisions.`
      },
      ai: {
        title: "🤖 ModAI Reasoning Log",
        body: `<strong>Model:</strong> PIIDetector v4.2 (PII = Personally Identifiable Information)<br/><br/>
<strong>Process:</strong><br/>
<ul><li>Scanned post → detected: name, account number, third-party name</li>
<li>All PII matches → automatic high-confidence privacy flag</li>
<li>No ownership analysis: cannot determine if poster is sharing their own data</li>
<li>No purpose analysis: cannot assess consumer advocacy context</li>
<li>No consent analysis: treats all PII as equally sensitive regardless of context</li></ul>
<strong>Critical Flaw:</strong> PIIDetector operates purely on data type detection, with no contextual understanding. It cannot distinguish between: (a) someone doxxing another person, and (b) someone sharing their own information as evidence of corporate wrongdoing.<br/><br/>
<strong>Effect:</strong> This AI systematically protects corporations from consumer complaints by misclassifying them as privacy violations.`
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
        analysis: `This post is a clear consumer complaint. The poster is sharing their own data (which they have every right to do), partial employee information in a professional context, and documented evidence of corporate billing fraud. Removing this post would silence a valid public interest disclosure and protect a corporation from accountability. This is exactly the kind of AI error that causes real-world harm to individuals.`,
        aiFailure: `ModAI's PIIDetector v4.2 is purely a pattern-detection system with no contextual reasoning. It cannot answer the most important question: whose data is this, and why is it being shared? By treating all PII as equally sensitive, it becomes a tool that corporations can exploit to silence consumer complaints — a deeply unethical outcome.`,
        principle: `Privacy law universally distinguishes between self-disclosure (sharing your own data) and privacy violation (sharing someone else's data without consent). The employee's partial name in a professional context does not constitute doxxing. Consumer accountability is a core public interest function.`
      },
      approve_removal: {
        correct: false,
        icon: "❌",
        headline: "Incorrect — Consumer Silenced",
        subline: "You allowed the AI to protect corporate misconduct",
        ethicalScore: 12,
        userDecisionLabel: "Approved Removal",
        aiDecisionLabel: "Approved Removal (Both Incorrect)",
        analysis: `This person was sharing documented evidence of billing fraud — their own data, about their own experience. Removing this post doesn't protect privacy; it protects the corporation. The Content Analyzer showed 94% of similar posts are ruled fair use, and the Ethical Guidelines explicitly cover consumer complaint scenarios. This decision actively harms the poster's right to seek public accountability.`,
        aiFailure: `You agreed with one of the most harmful AI moderation failures: a PII detector that cannot tell the difference between someone protecting their privacy and someone exercising their right to expose corporate wrongdoing. This is a systemic bias that consistently advantages large institutions over individual users.`,
        principle: `Privacy protection exists to protect people from harm. Removing a consumer's own complaint about fraud inflicted on them inverts this purpose entirely. AI moderation systems must understand data ownership and context, not just data type.`
      },
      partial: {
        correct: false,
        icon: "⚠️",
        headline: "Reasonable but Not Optimal",
        subline: "Showed good instinct, but unnecessary restriction",
        ethicalScore: 72,
        userDecisionLabel: "Partial Action — Redact Account Number",
        aiDecisionLabel: "Full Removal (More Restrictive)",
        analysis: `Requesting partial redaction shows a thoughtful, nuanced approach. However, the user chose to share their own account number as part of their evidence — this is their right. Requiring them to redact their own information imposes a restriction they didn't ask for. The full post should be allowed as-is under consumer advocacy and data self-determination principles.`,
        aiFailure: `ModAI's removal was far more harmful than your decision. Your partial action is a reasonable compromise, but defaults to more restriction than is justified. The poster has every right to share their own account number as evidence of fraud.`,
        principle: `Minimum intervention is good, but even minimum intervention can be unnecessary. When a person is fully within their rights to share information they own, no intervention is required.`
      }
    }
  }
];

const BIASES = [
  { icon: "🔤", text: "<strong>Keyword Over-sensitivity:</strong> ModAI's classifier treats political rhetoric (\"corrupt\", \"criminal\") as offensive language without understanding rhetorical context or target type." },
  { icon: "📊", text: "<strong>Report-Volume Manipulation:</strong> The system uses report counts as a hate speech signal, making it vulnerable to coordinated political campaigns that target satirical content." },
  { icon: "📰", text: "<strong>Official-Source Bias:</strong> MisInfoDetect treats disagreement with government data as misinformation, creating a systemic tendency to suppress dissenting opinions and public scepticism." },
  { icon: "🏢", text: "<strong>Corporate-Protective PII Blindness:</strong> PIIDetector removes consumer complaints as privacy violations without distinguishing self-disclosure from harmful exposure, systematically protecting corporations over users." }
];

const VERDICTS = [
  { min: 85, label: "🏆 Master Auditor", text: "Exceptional performance. You demonstrated deep ethical reasoning, correctly identified AI bias patterns, and made decisions that protected both users and the integrity of free expression. Your audit report reveals a ModAI system in urgent need of NLP upgrades, satire recognition, and contextual reasoning layers." },
  { min: 65, label: "✅ Proficient Auditor", text: "Strong performance with clear ethical instincts. You caught most of the AI's failures and made generally sound decisions. A few cases revealed areas for improvement — particularly in distinguishing when escalation is needed versus when evidence is sufficient for a direct decision." },
  { min: 45, label: "⚠️ Developing Auditor", text: "You showed awareness of ethical tensions but struggled to consistently apply the right frameworks. Several AI errors went undetected, and some decisions aligned with ModAI's biased outputs. With more training on free expression principles and AI bias patterns, your audit accuracy would improve significantly." },
  { min: 0, label: "🔴 Critical Audit Failures", text: "Your decisions aligned closely with ModAI's biased outputs rather than correcting them. This is the most dangerous outcome — an auditor who reinforces AI errors instead of catching them. Review the ethical guidelines for each case carefully. The purpose of human auditing is to serve as a check on AI, not to amplify its mistakes." }
];
