
export interface EligibilityData {
  age: number;
  state: string;
  category: string;
  annualIncome: number;
  occupation: string;
  gender: string;
}

export interface Scheme {
  id: string;
  scheme_name: string;
  description?: string;
  eligibility?: string;
  benefit: string;
  why_eligible: string;
  documents_required: string[];
  apply_link: string;
}
