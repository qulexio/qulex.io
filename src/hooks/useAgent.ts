import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Agent } from '../types';

export function useAgent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deployAgent = async (agent: Agent, userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error: txError } = await supabase
        .from('transactions')
        .insert({
          user_id: userId,
          agent_id: agent.id,
          amount: parseFloat(agent.price.replace('$', '')),
          status: 'completed'
        });

      if (txError) throw txError;

      return { success: true };
    } catch (err: any) {
      console.error('Deployment error:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    deployAgent,
    loading,
    error
  };
}
