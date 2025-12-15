/**
 * Deployment Metrics Service
 * Simulates real-time deployment data streaming
 * In production, this would connect to actual WebSocket endpoints
 */

import { DeploymentMetric, DeploymentStatus, CognitivePattern } from '../types/deployment';
import { getRandomUnvalidatedPrinciple } from './maatPrinciples';

const SERVICES = [
  'frontend',
  'backend-api',
  'database',
  'cache-layer',
  'auth-service',
  'notification-service',
  'analytics-engine',
  'storage-service'
];

const COGNITIVE_PATTERNS: CognitivePattern[] = ['seeing', 'feeling', 'knowing', 'being'];

/**
 * Simulates a deployment metric stream
 */
export class DeploymentMetricsStream {
  private listeners: ((metric: DeploymentMetric) => void)[] = [];
  private intervalId: number | null = null;
  private validatedPrinciples: number[] = [];

  start(intervalMs: number = 2000) {
    if (this.intervalId) return;

    this.intervalId = window.setInterval(() => {
      const metric = this.generateMetric();
      this.notifyListeners(metric);
    }, intervalMs);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  subscribe(listener: (metric: DeploymentMetric) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private generateMetric(): DeploymentMetric {
    const service = SERVICES[Math.floor(Math.random() * SERVICES.length)];
    const healthScore = 0.6 + Math.random() * 0.4; // Bias towards healthy
    const status: DeploymentStatus = healthScore > 0.8 
      ? 'validated' 
      : healthScore > 0.7 
        ? 'online' 
        : 'recalibrating';

    // Assign to unvalidated principle
    const principle = getRandomUnvalidatedPrinciple(this.validatedPrinciples);
    if (principle && status === 'validated') {
      this.validatedPrinciples.push(principle.id);
    }

    return {
      service,
      status,
      timestamp: new Date(),
      maatPrinciple: principle?.id,
      healthScore,
      cognitivePattern: COGNITIVE_PATTERNS[Math.floor(Math.random() * COGNITIVE_PATTERNS.length)],
      metadata: {
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        responseTime: Math.random() * 500,
        errorRate: Math.random() * 0.05
      }
    };
  }

  private notifyListeners(metric: DeploymentMetric) {
    this.listeners.forEach(listener => listener(metric));
  }

  getValidatedPrinciples(): number[] {
    return [...this.validatedPrinciples];
  }

  resetValidation() {
    this.validatedPrinciples = [];
  }
}

export const deploymentMetricsStream = new DeploymentMetricsStream();
