export interface TeleportScores {
  cityScore: number; // score global /100
  categories: { name: string; score: number }[]; // par ex. Safety, Education...
  summary?: string;
}

export interface CostOfLiving {
  currency?: string;
  items: { label: string; value: number | null; unit?: string }[]; // ex: Cappuccino, Milk, Internet...
}

export interface TeleportInfo {
  slug?: string | null;
  scores?: TeleportScores | null;
  cost?: CostOfLiving | null;
}
