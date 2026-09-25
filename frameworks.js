/* Wealth Intelligence — framework definitions
 *
 * To add a framework, copy any block below and change:
 *   id           unique number (display numbering is automatic, by position)
 *   icon         one character shown on the card
 *   title/desc   card text
 *   fields       inputs shown in the builder; rows: 1 = single line, >1 = textarea
 *   arrows       the "→" focus points appended to the prompt
 *   tagline      closing line appended to the prompt
 *   buildPrompt  receives { fieldKey: value } and returns the prompt body
 */

const FRAMEWORKS = [
  {
    id: 1,
    icon: "◈",
    title: "Billionaire Money Lens",
    desc: "View any situation through a billionaire's financial lens",
    fields: [
      { key: "situation", label: "Describe your situation", placeholder: "e.g. I'm running a biohacking brand deciding whether to raise funding or stay bootstrapped while expanding globally…", rows: 4 }
    ],
    arrows: [
      "Where am I thinking too small?",
      "Where am I trading time for money?",
      "What leverage am I ignoring?"
    ],
    tagline: "Think in millions, not hours.",
    buildPrompt: f => `Analyze how billionaires think about money in this situation:\n\n${f.situation}`
  },
  {
    id: 2,
    icon: "⬡",
    title: "High-Income Opportunity Filter",
    desc: "Run any idea through a ruthless scalability test",
    fields: [
      { key: "idea", label: "Your opportunity or idea", placeholder: "e.g. Selling personalized biohacking protocols to high-performance executives as a subscription service…", rows: 4 }
    ],
    arrows: [
      "Can this scale to $1M+?",
      "Is it leverage-driven?",
      "Does it build long-term wealth?"
    ],
    tagline: "Reject anything small.",
    buildPrompt: f => `Evaluate this opportunity:\n\n${f.idea}`
  },
  {
    id: 3,
    icon: "◉",
    title: "Wealth Blueprint",
    desc: "Design your $100K → $1M/month roadmap",
    fields: [
      { key: "business", label: "Your business", placeholder: "e.g. A global biohacking company with TikTok content, supplements, and coaching programs targeting high-performance professionals…", rows: 3 },
      { key: "current", label: "Current monthly revenue", placeholder: "e.g. $15K/month", rows: 1 }
    ],
    arrows: [
      "Business model",
      "Revenue streams",
      "Systems",
      "Scaling strategy"
    ],
    tagline: "Focus on leverage + speed.",
    buildPrompt: f => `Design a roadmap to scale to $100K–$1M/month.\n\nBusiness: ${f.business}\nCurrent revenue: ${f.current}`
  },
  {
    id: 4,
    icon: "◎",
    title: "Wealth Psychology Decoder",
    desc: "Surface the beliefs capping your income ceiling",
    fields: [
      { key: "beliefs", label: "Share your money beliefs, fears, or patterns", placeholder: "e.g. I feel guilty charging premium prices. I undercut myself in negotiations. I avoid talking about money with investors…", rows: 5 }
    ],
    arrows: [
      "Hidden fears about wealth",
      "Scarcity vs abundance patterns",
      "Emotional triggers around risk"
    ],
    tagline: "Explain what's limiting my income potential.",
    buildPrompt: f => `Break down my beliefs about money.\n\n${f.beliefs}`
  },
  {
    id: 6,
    icon: "◆",
    title: "Power Thinking Framework",
    desc: "Compare elite vs average thinking across key dimensions",
    fields: [
      { key: "domain", label: "Domain or decision area", placeholder: "e.g. Hiring my first team, pricing my services, deciding when to enter a new market…", rows: 3 }
    ],
    arrows: [
      "Decision speed",
      "Risk tolerance",
      "Opportunity recognition"
    ],
    tagline: "Compare elite vs average thinking.",
    buildPrompt: f => `Explain how wealthy individuals think differently in this domain:\n\n${f.domain}`
  },
  {
    id: 7,
    icon: "⬢",
    title: "Leverage System",
    desc: "Map every lever that can multiply income without more effort",
    fields: [
      { key: "business", label: "Describe your business", placeholder: "e.g. A biohacking brand with online courses, supplements, affiliate partnerships, and a TikTok presence reaching 500K+ followers…", rows: 4 }
    ],
    arrows: [
      "Capital leverage",
      "People leverage",
      "Technology leverage",
      "Media leverage"
    ],
    tagline: "Where can I multiply income without more effort?",
    buildPrompt: f => `Show me how to apply leverage in my business:\n\n${f.business}`
  },
  {
    id: 8,
    icon: "◇",
    title: "Unfair Advantage Builder",
    desc: "Build a moat that makes you nearly impossible to compete with",
    fields: [
      { key: "industry", label: "Your industry", placeholder: "e.g. Biohacking / human optimization / longevity…", rows: 1 },
      { key: "strengths", label: "Your current strengths and assets", placeholder: "e.g. Strong network in elite wellness, proprietary protocols, multilingual content, global audience…", rows: 3 }
    ],
    arrows: [
      "Skills",
      "Distribution",
      "Network",
      "Positioning"
    ],
    tagline: "Make me hard to compete with.",
    buildPrompt: f => `Help me build an unfair advantage in ${f.industry}.\n\nCurrent strengths: ${f.strengths}`
  },
  {
    id: 9,
    icon: "◐",
    title: "Future Wealth Projection",
    desc: "Get a direct, unsparing forecast of where your path leads",
    fields: [
      { key: "situation", label: "Your current situation and trajectory", placeholder: "e.g. Running a biohacking brand, $15K/month revenue, growing 20% monthly, team of 2, targeting global expansion…", rows: 4 }
    ],
    arrows: [
      "Where will I be financially in 3 years?",
      "What mistakes will cost me the most?",
      "What should I fix immediately?"
    ],
    tagline: "Be direct.",
    buildPrompt: f => `If I continue like this...\n\n${f.situation}`
  },
  {
    id: 10,
    icon: "◑",
    title: "Elite Decision Model",
    desc: "Apply high-level entrepreneurial decision-making to any situation",
    fields: [
      { key: "situation", label: "Your current decision or situation", placeholder: "e.g. Whether to raise a funding round or stay bootstrapped while expanding to European markets…", rows: 4 }
    ],
    arrows: [
      "When to move fast",
      "When to say no",
      "How they minimize risk"
    ],
    tagline: "Apply it to my exact situation.",
    buildPrompt: f => `Teach me how high-level entrepreneurs make decisions.\n\nApply it to: ${f.situation}`
  }
];
