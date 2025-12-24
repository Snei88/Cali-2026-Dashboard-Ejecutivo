
export interface PurposeChallenge {
  name: string;
  value: number;
  percentage: number;
}

export interface PurposeData {
  name: string;
  value: number;
  percentage: number;
  description: string;
  challenges?: PurposeChallenge[];
}

export interface OrganismData {
  name: string;
  projects: number;
  budget: number;
}

export interface SocialSpending {
  category: string;
  amount: number;
  percentage: number;
}

export interface FundingSource {
  name: string;
  value: number;
  description: string;
  percentage: number;
}

export interface PopulationGroup {
  name: string;
  budget: number;
}