
import { ReportData, TabType } from './types';

export const REPORTS: Record<string, ReportData> = {
  deloitte: {
    id: 'deloitte',
    title: "Deloitte: Governance of AI",
    subtitle: "2nd Edition // 2025",
    score: 63,
    assessment: "Valuable governance frameworks obscured by artificial urgency and deliberate consulting positioning.",
    scorecard: [
      { label: 'Methodological Transparency', score: 7, total: 15, colorClass: 'bg-accent-red', weight: 'Primary (15%)' },
      { label: 'Statistical Validity', score: 8, total: 15, colorClass: 'bg-accent-yellow', weight: 'Primary (15%)' },
      { label: 'Prediction Falsifiability', score: 6, total: 15, colorClass: 'bg-accent-red', weight: 'Primary (15%)' },
      { label: 'Originality vs. Repackaging', score: 9, total: 15, colorClass: 'bg-accent-yellow', weight: 'Primary (15%)' },
      { label: 'Historical Accuracy', score: 8, total: 10, colorClass: 'bg-accent-green', weight: 'Supporting (10%)' },
      { label: 'Solution Independence', score: 5, total: 10, colorClass: 'bg-accent-yellow', weight: 'Supporting (10%)' },
      { label: 'Implementation Practicality', score: 10, total: 10, colorClass: 'bg-accent-green', weight: 'Supporting (10%)' },
      { label: 'Economic Reality', score: 10, total: 10, colorClass: 'bg-accent-green', weight: 'Supporting (10%)' },
    ],
    rhetoric: [
      { label: 'Urgency Creation', percentage: 85, colorClass: 'bg-accent-red' },
      { label: 'Selective Data Highlighting', percentage: 78, colorClass: 'bg-accent-red' },
      { label: 'Technology Pace Framing', percentage: 92, colorClass: 'bg-accent-red' },
      { label: 'Responsibility Framing', percentage: 75, colorClass: 'bg-accent-yellow' },
      { label: 'Consultant Necessity', percentage: 68, colorClass: 'bg-accent-yellow' },
      { label: 'Self-Referential Evidence', percentage: 80, colorClass: 'bg-accent-red' },
      { label: 'Implementation Minimization', percentage: 35, colorClass: 'bg-accent-green' },
      { label: 'Proprietary Terminology', percentage: 60, colorClass: 'bg-accent-yellow' },
    ],
    claims: [
      { claim: '"AI represents an age-defining opportunity for society and business"', translation: '"AI is important for businesses to consider"', assessment: 'Unfalsifiable claim without specific metrics or timeframes' },
      { claim: '"Most companies are moving at the pace of organizational change, not the pace of the technology itself"', translation: '"Companies are adopting AI slower than the technology is developing"', assessment: 'No definition of "pace of technology" or empirical measurement provided' },
      { claim: '"Technology evolution was a challenge when it was measured in years, but the advancement of AI is happening much faster"', translation: '"AI is advancing more rapidly than previous technologies"', assessment: 'No comparative data provided to substantiate claim' }
    ],
    patterns: [
      { pattern: 'Technology Pace Framing', example: '"Most companies are moving at the pace of change..."', precedent: 'Big Data (2012): "Organizations unable to keep pace with exponential data growth"', analysis: 'Creates artificial gap between tech advancement and org adoption' }
    ],
    guidance: {
      [TabType.SCORECARD]: [{ title: 'Strengthen Methodological Rigor', description: 'Develop your own AI governance assessment methodology with clear metrics.' }],
      [TabType.RHETORIC]: [{ title: 'Establish Pace Independence', description: 'Define your organization\'s optimal AI adoption pace based on capabilities.' }],
      [TabType.CLAIMS]: [{ title: 'Establish Concrete Metrics', description: 'Define specific indicators of AI governance maturity.' }],
      [TabType.PATTERNS]: [{ title: 'Evolutionary over Revolutionary', description: 'Successful technology integration typically follows evolutionary patterns.' }],
      [TabType.AGENTS]: [{ title: 'Calibrated Friction', description: 'Use agent tensions to identify blind spots in governance planning.' }]
    },
    frictions: [
      { agents: ['1', '12'], title: 'Analytical ↔ Conceptual Tension', finding: 'Report uses high-level statistics to mask that 94% of "insights" are common knowledge.', tension: 'Agent 1 caught the lack of confidence intervals; Agent 12 mapped it to 1980s management theory.' }
    ]
  },
  openai: {
    id: 'openai',
    title: "OpenAI: AI in the Enterprise",
    subtitle: "Frontier Company Lessons // 2025",
    score: 48,
    assessment: "Methodological deficiencies with selective case studies and implementation minimization.",
    scorecard: [
      { label: 'Methodological Transparency', score: 5, total: 15, colorClass: 'bg-accent-red', weight: 'Primary (15%)' },
      { label: 'Statistical Validity', score: 4, total: 15, colorClass: 'bg-accent-red', weight: 'Primary (15%)' },
      { label: 'Prediction Falsifiability', score: 3, total: 15, colorClass: 'bg-accent-red', weight: 'Primary (15%)' },
      { label: 'Originality Index', score: 7, total: 15, colorClass: 'bg-accent-yellow', weight: 'Primary (15%)' },
      { label: 'Historical Accuracy', score: 7, total: 10, colorClass: 'bg-accent-yellow', weight: 'Supporting (10%)' },
      { label: 'Solution Independence', score: 3, total: 10, colorClass: 'bg-accent-red', weight: 'Supporting (10%)' },
      { label: 'Implementation Practicality', score: 8, total: 10, colorClass: 'bg-accent-green', weight: 'Supporting (10%)' },
      { label: 'Economic Reality', score: 9, total: 10, colorClass: 'bg-accent-green', weight: 'Supporting (10%)' },
    ],
    rhetoric: [
      { label: 'Selective Case Studies', percentage: 89, colorClass: 'bg-accent-red' },
      { label: 'Vendor Necessity', percentage: 85, colorClass: 'bg-accent-red' },
      { label: 'Vague Success Metrics', percentage: 83, colorClass: 'bg-accent-red' },
      { label: 'Inevitability Framing', percentage: 81, colorClass: 'bg-accent-red' },
      { label: 'Implementation Minimization', percentage: 78, colorClass: 'bg-accent-red' },
    ],
    claims: [
      { claim: '"Klarna\'s assistant handling two-thirds of all service chats"', translation: '"We are optimizing high-volume, low-complexity queries"', assessment: 'No disclosure of query complexity tiers or escalation rates' },
      { claim: '"BBVA employees created over 2,900 custom GPTs"', translation: '"We have 2,900 experiments, unknown utility"', assessment: 'Quantity metrics provided without quality or utilization assessment' }
    ],
    patterns: [
      { pattern: 'Implementation Timeline', example: '"Within a few months, Klarna\'s assistant handling two-thirds..."', precedent: 'Early Chatbot Claims (2017): "Immediate coverage for all customer needs"', analysis: 'Enterprise AI deployment typically requires 9-18 months for equivalent coverage' }
    ],
    guidance: {
      [TabType.SCORECARD]: [{ title: 'Audit Selection Criteria', description: 'Analyze why these 7 companies were chosen over others.' }],
      [TabType.RHETORIC]: [{ title: 'Vendor Disentanglement', description: 'Separate OpenAI-specific features from general LLM capabilities.' }],
      [TabType.CLAIMS]: [{ title: 'Demand Complexity Disclosure', description: 'Require data on what types of queries are actually handled by AI.' }],
      [TabType.PATTERNS]: [{ title: 'Reality-Check Timelines', description: 'Assume 3x the reported implementation time for non-frontier orgs.' }],
      [TabType.AGENTS]: [{ title: 'Whole-Brain Synthesis', description: 'Integrate technical feasibility with linguistic decoding.' }]
    },
    frictions: [
      { agents: ['9', '6'], title: 'Technical ↔ Linguistic Friction', finding: '"Rapid deployment" claims are linguistically constructed, ignoring technical debt.', tension: 'Agent 9 calculated infrastructure lag; Agent 6 identified neologisms used to mask it.' }
    ]
  },
  mckinsey: {
    id: 'mckinsey',
    title: "McKinsey: The State of AI in 2025",
    subtitle: "Agents, Innovation & Transformation",
    score: 42,
    assessment: "Marketing document for McKinsey AI consulting disguised as objective research.",
    scorecard: [
      { label: 'Methodological Transparency', score: 3, total: 15, colorClass: 'bg-accent-red', weight: 'Primary (15%)' },
      { label: 'Statistical Validity', score: 4, total: 15, colorClass: 'bg-accent-red', weight: 'Primary (15%)' },
      { label: 'Prediction Falsifiability', score: 2, total: 15, colorClass: 'bg-accent-red', weight: 'Primary (15%)' },
      { label: 'Originality vs. Repackaging', score: 3, total: 15, colorClass: 'bg-accent-red', weight: 'Primary (15%)' },
      { label: 'Historical Accuracy', score: 4, total: 10, colorClass: 'bg-accent-yellow', weight: 'Supporting (10%)' },
      { label: 'Solution Independence', score: 2, total: 10, colorClass: 'bg-accent-red', weight: 'Supporting (10%)' },
      { label: 'Implementation Practicality', score: 5, total: 10, colorClass: 'bg-accent-yellow', weight: 'Supporting (10%)' },
      { label: 'Economic Reality', score: 5, total: 10, colorClass: 'bg-accent-yellow', weight: 'Supporting (10%)' },
    ],
    rhetoric: [
      { label: 'Definition Drift', percentage: 95, colorClass: 'bg-accent-red' },
      { label: 'Solution Alignment', percentage: 98, colorClass: 'bg-accent-red' },
      { label: 'Framework Rebranding', percentage: 95, colorClass: 'bg-accent-red' },
      { label: 'Obviousness Repackaging', percentage: 96, colorClass: 'bg-accent-red' },
    ],
    claims: [
      { claim: '"88% of organizations regularly use AI"', translation: '"Definition of AI has expanded to include everything"', assessment: 'Definitional drift used to inflate adoption metrics.' },
      { claim: '"39% report EBIT impact at enterprise level"', translation: '"Most report <5% actual impact"', assessment: 'Systematically inflates impact by burying median values.' }
    ],
    patterns: [
      { pattern: 'Framework Rebranding', example: '"Rewired Framework"', precedent: '7-S Framework (1980s)', analysis: 'Repackaging 45-year-old management theory with an AI prefix.' }
    ],
    guidance: {
      [TabType.SCORECARD]: [{ title: 'Track Definitional Drift', description: 'Compare current AI definitions to 2017 baselines.' }],
      [TabType.RHETORIC]: [{ title: 'Framework Archaeology', description: 'Search for historical precedents for all "new" frameworks.' }],
      [TabType.CLAIMS]: [{ title: 'Expose EBIT Burial', description: 'Demand median EBIT impact data rather than binary "presence".' }],
      [TabType.PATTERNS]: [{ title: 'Historical Pattern Match', description: 'Align report claims with Big Data/Cloud hype cycles.' }],
      [TabType.AGENTS]: [{ title: 'Economic Interrogation', description: 'Cross-reference self-reported success with external ROI data.' }]
    },
    frictions: [
      { agents: ['5', '13'], title: 'Historical ↔ Solution Tension', finding: 'Report patterns serve solely to drive "Rewired" consulting sales.', tension: 'Agent 5 mapped the prediction failure rate (70%); Agent 13 tied it to service offerings.' }
    ]
  }
};
