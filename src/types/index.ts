export type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  company_size: string | null;
  primary_goal: string | null;
  technical_level: string | null;
  use_case: string[] | null;
  referral_source: string | null;
  onboarding_completed: boolean;
  updated_at: string;
};

export type Agent = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string;
  capabilities: string[];
  model_used: string;
  creator_id: string;
  image_url: string;
  rating: number;
  created_at: string;
  features?: { title: string; icon: string; description: string }[]; // Optional for UI enrichment
};

export type Transaction = {
  id: string;
  user_id: string;
  agent_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
};

export type Review = {
  id: string;
  user_id: string;
  agent_id: string;
  rating: number;
  comment: string;
  created_at: string;
};
