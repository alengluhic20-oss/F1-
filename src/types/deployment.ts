/**
 * Core type definitions for the Feather-Scale Deployment Ritual
 * Integrates Ma'at principles with deployment metrics
 */

export type DeploymentStatus = 
  | 'initializing' 
  | 'online' 
  | 'error' 
  | 'validated' 
  | 'recalibrating';

export type CognitivePattern = 
  | 'seeing' 
  | 'feeling' 
  | 'knowing' 
  | 'being';

export interface MaatPrinciple {
  id: number; // 1-42
  name: string;
  description: string;
  symbol: string;
  validated: boolean;
  timestamp?: Date;
}

export interface DeploymentMetric {
  service: string;
  status: DeploymentStatus;
  timestamp: Date;
  maatPrinciple?: number; // 1-42: Which principle this validates
  healthScore: number; // 0-1: System health
  cognitivePattern?: CognitivePattern;
  metadata?: {
    cpu?: number;
    memory?: number;
    responseTime?: number;
    errorRate?: number;
  };
}

export interface RitualState {
  phase: 'preparation' | 'invocation' | 'deployment' | 'validation' | 'completion';
  currentPrinciple: number; // Current Ma'at principle being validated
  principlesValidated: number[];
  isPaused: boolean;
  pauseReason?: string;
  recitationRequired?: boolean;
  recitationText?: string;
}

export interface DeploymentRitualConfig {
  autoAdvance: boolean; // Auto-proceed or require manual confirmation
  visualizationMode: 'cosmos' | 'traditional' | 'split';
  soundEnabled: boolean;
  ritualSpeed: 'contemplative' | 'normal' | 'rapid';
}

export interface FeatherScaleState {
  // Visual representation state
  balance: number; // -1 to 1: negative = chaos, 0 = balance, positive = order
  featherWeight: number; // Constant: Ma'at's feather
  heartWeight: number; // Variable: Current system state
  oscillation: number; // For animation
}

export interface CosmicMetric {
  x: number;
  y: number;
  z: number;
  intensity: number; // 0-1
  color: string;
  principleId: number;
  timestamp: Date;
}
