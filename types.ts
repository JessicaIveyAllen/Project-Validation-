export interface AnalysisResult {
  method: string;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
  suggestions: string;
}

export interface MethodItem {
  id: string;
  title: string;
  description: string;
  details: string[];
  category: 'technical' | 'market' | 'business' | 'ux' | 'testing';
}

export interface TimelinePhase {
  id: string;
  title: string;
  duration: string;
  description: string;
  items: {
    title: string;
    points: string[];
    deliverable: string;
  }[];
}
