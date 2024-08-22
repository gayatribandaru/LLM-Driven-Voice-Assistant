import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  preferences: Record<string, any>;
  created_at: string;
}

export interface Appointment {
  id: string;
  customer_id: string;
  appointment_date: string;
  service_type: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string;
  created_at: string;
  updated_at: string;
  customers?: Customer;
}

export interface Conversation {
  id: string;
  customer_id: string | null;
  session_id: string;
  status: 'active' | 'completed' | 'failed';
  conversation_type: 'appointment' | 'inquiry' | 'support';
  started_at: string;
  ended_at: string | null;
  metadata: Record<string, any>;
  customers?: Customer;
  conversation_messages?: ConversationMessage[];
}

export interface ConversationMessage {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  audio_url: string | null;
  confidence_score: number;
  created_at: string;
}

export interface EdgeCase {
  id: string;
  case_name: string;
  scenario: string;
  handling_strategy: string;
  example_conversation: Array<{ role: string; content: string }>;
  created_at: string;
}
