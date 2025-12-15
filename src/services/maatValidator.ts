/**
 * Ma'at Validator Service
 * Validates deployment metrics against the 42 Principles
 */

import { DeploymentMetric } from '../types/deployment';
import { getPrincipleById } from './maatPrinciples';

export interface ValidationResult {
  passed: boolean;
  principleId: number;
  message: string;
  score: number; // 0-1
}

/**
 * Validates a deployment metric against Ma'at principles
 */
export function validateDeploymentMetric(metric: DeploymentMetric): ValidationResult {
  const principle = metric.maatPrinciple 
    ? getPrincipleById(metric.maatPrinciple)
    : null;

  if (!principle) {
    return {
      passed: true,
      principleId: 0,
      message: 'No principle assigned',
      score: 1.0
    };
  }

  // Validation logic based on health score and status
  const passed = metric.healthScore >= 0.7 && metric.status !== 'error';
  const score = passed ? metric.healthScore : metric.healthScore * 0.5;

  return {
    passed,
    principleId: principle.id,
    message: passed 
      ? `✓ ${principle.name}: ${principle.description}`
      : `✗ ${principle.name} requires attention: ${principle.description}`,
    score
  };
}

/**
 * Checks if all 42 principles have been validated
 */
export function allPrinciplesValidated(validatedPrinciples: number[]): boolean {
  return validatedPrinciples.length === 42;
}

/**
 * Calculates overall system balance based on validated principles
 */
export function calculateBalance(validatedPrinciples: number[], totalMetrics: DeploymentMetric[]): number {
  if (totalMetrics.length === 0) return 0;

  const avgHealthScore = totalMetrics.reduce((sum, m) => sum + m.healthScore, 0) / totalMetrics.length;
  const validationRatio = validatedPrinciples.length / 42;

  // Balance formula: weighted combination of validation and health
  return (validationRatio * 0.6 + avgHealthScore * 0.4) * 2 - 1; // Scale to -1 to 1
}
