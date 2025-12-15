/**
 * Custom React Hook for Deployment Ritual
 * Manages ritual state and coordinates services
 */

import { useState, useEffect, useCallback } from 'react';
import { DeploymentMetric, RitualState, FeatherScaleState } from '../types/deployment';
import { deploymentMetricsStream } from '../services/deploymentMetrics';
import { deploymentRitual } from '../services/deploymentRitual';
import { validateDeploymentMetric, calculateBalance } from '../services/maatValidator';

export function useDeploymentRitual() {
  const [ritualState, setRitualState] = useState<RitualState>(deploymentRitual.getState());
  const [metrics, setMetrics] = useState<DeploymentMetric[]>([]);
  const [featherScale, setFeatherScale] = useState<FeatherScaleState>({
    balance: 0,
    featherWeight: 1, // Ma'at's feather is constant
    heartWeight: 1,
    oscillation: 0
  });
  const [isRunning, setIsRunning] = useState(false);

  // Subscribe to ritual state changes
  useEffect(() => {
    const unsubscribe = deploymentRitual.subscribe((state) => {
      setRitualState(state);
    });
    return unsubscribe;
  }, []);

  // Subscribe to metrics stream
  useEffect(() => {
    const unsubscribe = deploymentMetricsStream.subscribe((metric) => {
      setMetrics(prev => [...prev, metric].slice(-50)); // Keep last 50

      // Validate and update ritual
      const validation = validateDeploymentMetric(metric);
      if (validation.passed && metric.maatPrinciple) {
        deploymentRitual.validatePrinciple(metric.maatPrinciple);
      }
    });
    return unsubscribe;
  }, []);

  // Update feather scale based on metrics
  useEffect(() => {
    if (metrics.length === 0) return;

    const balance = calculateBalance(ritualState.principlesValidated, metrics);
    const avgHealth = metrics.reduce((sum, m) => sum + m.healthScore, 0) / metrics.length;

    setFeatherScale(prev => ({
      ...prev,
      balance,
      heartWeight: avgHealth,
      oscillation: prev.oscillation + 0.1
    }));
  }, [metrics, ritualState.principlesValidated]);

  const startRitual = useCallback(() => {
    deploymentRitual.startRitual();
    setIsRunning(true);
  }, []);

  const continueRitual = useCallback(() => {
    deploymentRitual.continueRitual();
    deploymentMetricsStream.start(2000);
  }, []);

  const pauseRitual = useCallback(() => {
    deploymentMetricsStream.stop();
    setIsRunning(false);
  }, []);

  const resetRitual = useCallback(() => {
    deploymentRitual.reset();
    deploymentMetricsStream.resetValidation();
    deploymentMetricsStream.stop();
    setMetrics([]);
    setIsRunning(false);
  }, []);

  const completeRecitation = useCallback(() => {
    deploymentRitual.completeRecitation();
    deploymentMetricsStream.start(2000);
  }, []);

  return {
    ritualState,
    metrics,
    featherScale,
    isRunning,
    startRitual,
    continueRitual,
    pauseRitual,
    resetRitual,
    completeRecitation
  };
}
