
export enum TabType {
  SCORECARD = 'scorecard',
  RHETORIC = 'rhetoric',
  CLAIMS = 'claims',
  PATTERNS = 'patterns',
  AGENTS = 'agents'
}

export enum ViewType {
  DASHBOARD = 'dashboard',
  INTELLIGENCE = 'intelligence',
  COUNTER_NARRATIVE = 'counter_narrative',
  CASE_FILES = 'case_files',
  PRESENTATION = 'presentation'
}

export interface ScoreDimension {
  label: string;
  score: number;
  total: number;
  colorClass: string;
  weight?: string; // e.g. "Primary (15%)"
}

export interface RhetoricDimension {
  label: string;
  percentage: number;
  colorClass: string;
}

export interface ClaimMatrixRow {
  claim: string;
  translation: string;
  assessment: string;
}

export interface HistoricalPatternRow {
  pattern: string;
  example: string;
  precedent: string;
  analysis: string;
}

export interface GuidanceStep {
  title: string;
  description: string;
}

export interface AgentFriction {
  agents: string[];
  title: string;
  finding: string;
  tension: string;
}

export interface ReportData {
  id: string;
  title: string;
  subtitle: string;
  score: number;
  assessment: string;
  scorecard: ScoreDimension[];
  rhetoric: RhetoricDimension[];
  claims: ClaimMatrixRow[];
  patterns: HistoricalPatternRow[];
  guidance: Record<string, GuidanceStep[]>;
  frictions: AgentFriction[];
}
