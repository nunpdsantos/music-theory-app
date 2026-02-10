/**
 * TypeScript types matching the Supabase Postgres schema.
 * All user data tables use JSONB `data` columns for flexibility.
 */

import type { PreferencesSnapshot } from '../services/syncMerge';
import type { CurriculumProgress } from '../core/types/curriculum';
import type { GamificationData } from '../core/types/gamification';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
        };
        Update: {
          display_name?: string | null;
        };
      };
      user_preferences: {
        Row: {
          user_id: string;
          data: PreferencesSnapshot;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          data: PreferencesSnapshot;
        };
        Update: {
          data?: PreferencesSnapshot;
          updated_at?: string;
        };
      };
      curriculum_progress: {
        Row: {
          user_id: string;
          data: CurriculumProgress;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          data: CurriculumProgress;
        };
        Update: {
          data?: CurriculumProgress;
          updated_at?: string;
        };
      };
      gamification_data: {
        Row: {
          user_id: string;
          data: GamificationData;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          data: GamificationData;
        };
        Update: {
          data?: GamificationData;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
