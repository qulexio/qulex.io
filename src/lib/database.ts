import { supabase } from './supabase';
import { Agent, Profile } from '../types';

/**
 * Fetch all agents for the marketplace
 */
export const fetchAgents = async (): Promise<Agent[]> => {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching agents:', error);
    return [];
  }
  return data || [];
};

/**
 * Get a single agent by ID
 */
export const getAgentById = async (id: string): Promise<Agent | null> => {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching agent:', error);
    return null;
  }
  return data;
};

/**
 * Update user profile (Onboarding or Settings)
 */
export const updateProfile = async (id: string, updates: Partial<Profile>) => {
  const { error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) throw error;
};

/**
 * Real-time listener for new agents
 */
export const subscribeToNewAgents = (callback: (agent: Agent) => void) => {
  return supabase
    .channel('public:agents')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'agents' },
      (payload) => {
        callback(payload.new as Agent);
      }
    )
    .subscribe();
};
