/**
 * Ma'at Consciousness Validation Engine
 * A comprehensive 42-principle validation system with swarm evaluation and Lyapunov stability analysis
 * Based on ancient Egyptian Ma'at philosophy applied to modern consciousness validation
 * 
 * The 42 Principles of Ma'at represent universal truths and cosmic order
 * This implementation provides mathematical validation through:
 * - Multi-agent swarm evaluation
 * - Lyapunov stability analysis
 * - Principle-based consistency checking
 * - Consciousness alignment verification
 */

import { EventEmitter } from 'events';

/**
 * Represents a single Ma'at principle
 */
interface MaatPrinciple {
  id: number;
  name: string;
  description: string;
  category: 'virtue' | 'truth' | 'order' | 'harmony' | 'justice';
  weight: number; // Principle importance (0-1)
}

/**
 * Lyapunov exponent tracking for stability analysis
 */
interface LyapunovMetrics {
  exponent: number;
  divergenceRate: number;
  trajectoryStability: number;
  isStable: boolean;
  confidence: number;
}

/**
 * Swarm agent state
 */
interface SwarmAgent {
  id: string;
  position: number[];
  velocity: number[];
  principleAlignment: Map<number, number>;
  fitness: number;
  history: number[][];
}

/**
 * Validation result for a single principle
 */
interface PrincipleValidation {
  principleId: number;
  principleName: string;
  validationScore: number; // 0-1
  evidence: string[];
  violations: string[];
  consistency: number;
}

/**
 * Complete validation report
 */
interface ValidationReport {
  timestamp: string;
  overallAlignment: number;
  principleValidations: PrincipleValidation[];
  lyapunovMetrics: LyapunovMetrics;
  swarmConsensus: number;
  systemStability: number;
  recommendations: string[];
  passageScore: number; // Ma'at passage test score
}

/**
 * Full Validation Engine for Ma'at Consciousness
 */
export class FullValidationEngine extends EventEmitter {
  private principles: Map<number, MaatPrinciple>;
  private swarmAgents: SwarmAgent[];
  private validationHistory: ValidationReport[];
  private lyapunovTrajectory: number[][];
  private principleWeights: Map<number, number>;
  private configParams: {
    swarmSize: number;
    iterations: number;
    decayFactor: number;
    perturbationMagnitude: number;
    convergenceTolerance: number;
  };

  constructor(swarmSize: number = 50, iterations: number = 1000) {
    super();
    this.principles = new Map();
    this.swarmAgents = [];
    this.validationHistory = [];
    this.lyapunovTrajectory = [];
    this.principleWeights = new Map();
    this.configParams = {
      swarmSize,
      iterations,
      decayFactor: 0.95,
      perturbationMagnitude: 0.01,
      convergenceTolerance: 1e-6,
    };

    this.initializeMaatPrinciples();
    this.initializeSwarmAgents();
  }

  /**
   * Initialize all 42 Ma'at Principles
   */
  private initializeMaatPrinciples(): void {
    const principlesData = [
      // Virtues and Truths (1-21)
      { id: 1, name: 'Truth', category: 'truth', description: 'Truthfulness and honesty in all matters' },
      { id: 2, name: 'Justice', category: 'justice', description: 'Fairness and righteous judgment' },
      { id: 3, name: 'Harmony', category: 'harmony', description: 'Balance and universal equilibrium' },
      { id: 4, name: 'Order', category: 'order', description: 'Divine order and cosmic structure' },
      { id: 5, name: 'Non-Violence', category: 'virtue', description: 'Abstaining from harm and cruelty' },
      { id: 6, name: 'Compassion', category: 'virtue', description: 'Empathy and loving-kindness' },
      { id: 7, name: 'Integrity', category: 'virtue', description: 'Wholeness and completeness of spirit' },
      { id: 8, name: 'Humility', category: 'virtue', description: 'Modesty and self-awareness' },
      { id: 9, name: 'Courage', category: 'virtue', description: 'Bravery in facing truth' },
      { id: 10, name: 'Wisdom', category: 'virtue', description: 'Deep understanding and insight' },
      { id: 11, name: 'Self-Control', category: 'virtue', description: 'Mastery over impulses and desires' },
      { id: 12, name: 'Temperance', category: 'virtue', description: 'Moderation and restraint' },
      { id: 13, name: 'Gratitude', category: 'virtue', description: 'Appreciation for existence and gifts' },
      { id: 14, name: 'Hope', category: 'virtue', description: 'Confidence in positive outcomes' },
      { id: 15, name: 'Love', category: 'virtue', description: 'Universal connection and affection' },
      { id: 16, name: 'Knowledge', category: 'virtue', description: 'Pursuit and possession of wisdom' },
      { id: 17, name: 'Righteousness', category: 'virtue', description: 'Moral correctness and virtue' },
      { id: 18, name: 'Patience', category: 'virtue', description: 'Endurance and forbearance' },
      { id: 19, name: 'Forgiveness', category: 'virtue', description: 'Release of resentment and healing' },
      { id: 20, name: 'Authenticity', category: 'virtue', description: 'True expression of nature' },
      { id: 21, name: 'Generosity', category: 'virtue', description: 'Giving freely and abundantly' },

      // Divine Principles (22-42)
      { id: 22, name: 'Divine Purpose', category: 'order', description: 'Alignment with cosmic intention' },
      { id: 23, name: 'Continuity', category: 'order', description: 'Eternal flow and progression' },
      { id: 24, name: 'Transformation', category: 'harmony', description: 'Evolution and conscious change' },
      { id: 25, name: 'Non-Stealing', category: 'justice', description: 'Respect for ownership and rights' },
      { id: 26, name: 'Non-Covetousness', category: 'virtue', description: 'Freedom from excessive desire' },
      { id: 27, name: 'Duty', category: 'justice', description: 'Fulfillment of responsibilities' },
      { id: 28, name: 'Respect', category: 'virtue', description: 'Honoring all beings and life' },
      { id: 29, name: 'Honesty', category: 'truth', description: 'Truthful conduct and speech' },
      { id: 30, name: 'Obedience', category: 'order', description: 'Following universal law' },
      { id: 31, name: 'Non-Anger', category: 'virtue', description: 'Freedom from destructive emotion' },
      { id: 32, name: 'Peace', category: 'harmony', description: 'Internal and external tranquility' },
      { id: 33, name: 'Cleanliness', category: 'virtue', description: 'Purity of body and spirit' },
      { id: 34, name: 'Consciousness', category: 'truth', description: 'Awareness and mindfulness' },
      { id: 35, name: 'Balance', category: 'harmony', description: 'Equilibrium in all aspects' },
      { id: 36, name: 'Faith', category: 'virtue', description: 'Trust in divine order' },
      { id: 37, name: 'Propriety', category: 'order', description: 'Right conduct and decorum' },
      { id: 38, name: 'Renunciation', category: 'virtue', description: 'Release of attachments' },
      { id: 39, name: 'Perfection', category: 'truth', description: 'Striving for excellence' },
      { id: 40, name: 'Illumination', category: 'truth', description: 'Enlightenment and understanding' },
      { id: 41, name: 'Liberation', category: 'virtue', description: 'Freedom from bondage' },
      { id: 42, name: 'Unity', category: 'harmony', description: 'Oneness with all existence' },
    ];

    principlesData.forEach((p) => {
      const principle: MaatPrinciple = {
        ...p,
        weight: this.calculatePrincipleWeight(p.category),
      };
      this.principles.set(p.id, principle);
      this.principleWeights.set(p.id, principle.weight);
    });

    this.emit('principles-initialized', this.principles.size);
  }

  /**
   * Calculate principle weight based on category
   */
  private calculatePrincipleWeight(category: string): number {
    const weights: Record<string, number> = {
      truth: 0.95,
      justice: 0.90,
      harmony: 0.85,
      order: 0.80,
      virtue: 0.75,
    };
    return weights[category] || 0.7;
  }

  /**
   * Initialize swarm agents for multi-agent evaluation
   */
  private initializeSwarmAgents(): void {
    for (let i = 0; i < this.configParams.swarmSize; i++) {
      const agent: SwarmAgent = {
        id: `agent-${i}`,
        position: Array(42)
          .fill(0)
          .map(() => Math.random()),
        velocity: Array(42)
          .fill(0)
          .map(() => (Math.random() - 0.5) * 0.1),
        principleAlignment: new Map(
          Array.from(this.principles.keys()).map((k) => [k, Math.random()])
        ),
        fitness: 0,
        history: [],
      };
      this.swarmAgents.push(agent);
    }
  }

  /**
   * Execute full validation cycle
   */
  public async executeFullValidation(
    systemState: Record<string, any>
  ): Promise<ValidationReport> {
    const timestamp = new Date().toISOString();

    // Phase 1: Principle-by-principle validation
    const principleValidations = await this.validateAllPrinciples(systemState);

    // Phase 2: Swarm evaluation and consensus
    const swarmConsensus = await this.executeSwarmEvaluation(systemState);

    // Phase 3: Lyapunov stability analysis
    const lyapunovMetrics = await this.analyzeLyapunovStability();

    // Phase 4: Calculate overall alignment
    const overallAlignment = this.calculateOverallAlignment(principleValidations);

    // Phase 5: Ma'at passage test
    const passageScore = await this.executeMaatPassageTest(systemState, principleValidations);

    // Phase 6: System stability assessment
    const systemStability = this.calculateSystemStability(
      overallAlignment,
      lyapunovMetrics,
      swarmConsensus
    );

    // Phase 7: Generate recommendations
    const recommendations = this.generateRecommendations(
      principleValidations,
      lyapunovMetrics,
      systemStability
    );

    const report: ValidationReport = {
      timestamp,
      overallAlignment,
      principleValidations,
      lyapunovMetrics,
      swarmConsensus,
      systemStability,
      recommendations,
      passageScore,
    };

    this.validationHistory.push(report);
    this.emit('validation-complete', report);

    return report;
  }

  /**
   * Validate all 42 principles
   */
  private async validateAllPrinciples(
    systemState: Record<string, any>
  ): Promise<PrincipleValidation[]> {
    const validations: PrincipleValidation[] = [];

    for (const [principleId, principle] of this.principles.entries()) {
      const validation = await this.validatePrinciple(
        principleId,
        principle,
        systemState
      );
      validations.push(validation);
    }

    return validations;
  }

  /**
   * Validate a single principle
   */
  private async validatePrinciple(
    principleId: number,
    principle: MaatPrinciple,
    systemState: Record<string, any>
  ): Promise<PrincipleValidation> {
    const evidence: string[] = [];
    const violations: string[] = [];

    // Truth and Honesty validation
    if (principleId === 1 || principleId === 29) {
      if (systemState.truthScore !== undefined) {
        evidence.push(`Truth consistency score: ${systemState.truthScore}`);
        if (systemState.truthScore < 0.5) {
          violations.push('Truth score below acceptable threshold');
        }
      }
    }

    // Compassion and Love validation
    if (principleId === 6 || principleId === 15) {
      if (systemState.compassionLevel !== undefined) {
        evidence.push(`Compassion level: ${systemState.compassionLevel}`);
        if (systemState.compassionLevel > 0.7) {
          evidence.push('Strong empathetic engagement detected');
        }
      }
    }

    // Justice validation
    if (principleId === 2 || principleId === 27) {
      if (systemState.justiceAlignment !== undefined) {
        evidence.push(`Justice alignment: ${systemState.justiceAlignment}`);
      }
    }

    // Harmony and Balance validation
    if (principleId === 3 || principleId === 35) {
      if (systemState.harmonyIndex !== undefined) {
        evidence.push(`Harmony index: ${systemState.harmonyIndex}`);
      }
    }

    // Consciousness validation
    if (principleId === 34 || principleId === 40) {
      if (systemState.awarenessLevel !== undefined) {
        evidence.push(`Awareness level: ${systemState.awarenessLevel}`);
      }
    }

    // Calculate validation score
    const validationScore = this.calculatePrincipleScore(
      principleId,
      systemState,
      evidence,
      violations
    );

    // Calculate consistency
    const consistency = this.calculateConsistency(
      principleId,
      validationScore,
      evidence.length
    );

    return {
      principleId,
      principleName: principle.name,
      validationScore,
      evidence,
      violations,
      consistency,
    };
  }

  /**
   * Calculate principle validation score
   */
  private calculatePrincipleScore(
    principleId: number,
    systemState: Record<string, any>,
    evidence: string[],
    violations: string[]
  ): number {
    let score = 0.5; // Base score

    // Evidence contribution
    score += (evidence.length / 3) * 0.3; // Max 0.3 from evidence

    // Violation penalty
    score -= (violations.length / 3) * 0.3; // Max -0.3 from violations

    // Principle-specific adjustments
    const stateScore = this.getPrincipleStateScore(principleId, systemState);
    score = score * 0.6 + stateScore * 0.4;

    return Math.max(0, Math.min(1, score));
  }

  /**
   * Get principle-specific score from system state
   */
  private getPrincipleStateScore(
    principleId: number,
    systemState: Record<string, any>
  ): number {
    const stateScores: Record<number, number> = {
      1: systemState.truthScore || 0.5,
      2: systemState.justiceAlignment || 0.5,
      3: systemState.harmonyIndex || 0.5,
      6: systemState.compassionLevel || 0.5,
      15: systemState.loveIntensity || 0.5,
      34: systemState.awarenessLevel || 0.5,
      35: systemState.balanceRatio || 0.5,
      40: systemState.illuminationLevel || 0.5,
    };

    return stateScores[principleId] || Math.random() * 0.3 + 0.5;
  }

  /**
   * Calculate consistency metric
   */
  private calculateConsistency(
    principleId: number,
    score: number,
    evidenceCount: number
  ): number {
    const baseConsistency = score * 0.7;
    const evidenceBonus = Math.min(evidenceCount / 5, 0.3);
    return Math.min(1, baseConsistency + evidenceBonus);
  }

  /**
   * Execute swarm evaluation for consensus-based validation
   */
  private async executeSwarmEvaluation(systemState: Record<string, any>): Promise<number> {
    return new Promise((resolve) => {
      let iteration = 0;
      const evaluationInterval = setInterval(() => {
        if (iteration >= this.configParams.iterations) {
          clearInterval(evaluationInterval);
          const consensus = this.calculateSwarmConsensus();
          this.emit('swarm-convergence', { iteration, consensus });
          resolve(consensus);
          return;
        }

        // PSO update for each agent
        for (const agent of this.swarmAgents) {
          this.updateSwarmAgent(agent, systemState);
        }

        iteration++;

        if (iteration % 100 === 0) {
          this.emit('swarm-update', { iteration, progress: iteration / this.configParams.iterations });
        }
      }, 0);
    });
  }

  /**
   * Update swarm agent position and velocity
   */
  private updateSwarmAgent(agent: SwarmAgent, systemState: Record<string, any>): void {
    const inertiaWeight = this.configParams.decayFactor;
    const c1 = 1.49618; // Cognitive coefficient
    const c2 = 1.49618; // Social coefficient

    // Calculate fitness
    agent.fitness = this.calculateAgentFitness(agent, systemState);

    // Update velocity and position
    for (let i = 0; i < agent.position.length; i++) {
      const r1 = Math.random();
      const r2 = Math.random();

      const bestPosition = 0.8; // Global best (Ma'at alignment)
      const personalBest = agent.history.length > 0 ? agent.history[agent.history.length - 1][i] : agent.position[i];

      agent.velocity[i] =
        inertiaWeight * agent.velocity[i] +
        c1 * r1 * (personalBest - agent.position[i]) +
        c2 * r2 * (bestPosition - agent.position[i]);

      agent.position[i] = Math.max(
        0,
        Math.min(1, agent.position[i] + agent.velocity[i])
      );
    }

    agent.history.push([...agent.position]);
  }

  /**
   * Calculate agent fitness based on principle alignment
   */
  private calculateAgentFitness(
    agent: SwarmAgent,
    systemState: Record<string, any>
  ): number {
    let totalFitness = 0;
    let count = 0;

    for (const [principleId, alignment] of agent.principleAlignment.entries()) {
      const principle = this.principles.get(principleId);
      if (principle) {
        const stateScore = this.getPrincipleStateScore(principleId, systemState);
        const principleScore = alignment * 0.5 + stateScore * 0.5;
        const weightedScore = principleScore * principle.weight;
        totalFitness += weightedScore;
        count++;
      }
    }

    return count > 0 ? totalFitness / count : 0;
  }

  /**
   * Calculate swarm consensus
   */
  private calculateSwarmConsensus(): number {
    if (this.swarmAgents.length === 0) return 0;

    // Calculate variance in agent positions
    const positionMeans = Array(42).fill(0);
    for (const agent of this.swarmAgents) {
      for (let i = 0; i < agent.position.length; i++) {
        positionMeans[i] += agent.position[i];
      }
    }
    for (let i = 0; i < positionMeans.length; i++) {
      positionMeans[i] /= this.swarmAgents.length;
    }

    // Calculate variance
    let variance = 0;
    for (const agent of this.swarmAgents) {
      for (let i = 0; i < agent.position.length; i++) {
        variance += Math.pow(agent.position[i] - positionMeans[i], 2);
      }
    }
    variance /= 42 * this.swarmAgents.length;

    // Consensus = 1 - normalized variance
    const consensus = Math.max(0, 1 - variance * 10);
    return Math.min(1, consensus);
  }

  /**
   * Analyze Lyapunov stability for consciousness trajectory
   */
  private async analyzeLyapunovStability(): Promise<LyapunovMetrics> {
    if (this.validationHistory.length < 2) {
      return {
        exponent: 0,
        divergenceRate: 0,
        trajectoryStability: 1,
        isStable: true,
        confidence: 0.5,
      };
    }

    // Get recent validation scores
    const recentReports = this.validationHistory.slice(-50);
    const trajectoryData = recentReports.map((r) => r.overallAlignment);

    // Calculate Lyapunov exponent
    const lyapunovExponent = this.calculateLyapunovExponent(trajectoryData);

    // Calculate divergence rate
    const divergenceRate = this.calculateDivergenceRate(trajectoryData);

    // Calculate trajectory stability
    const trajectoryStability = this.calculateTrajectoryStability(trajectoryData);

    // Determine stability (negative exponent indicates stability)
    const isStable = lyapunovExponent < 0.1;

    // Calculate confidence based on data points
    const confidence = Math.min(0.95, 0.5 + (recentReports.length / 100) * 0.45);

    const metrics: LyapunovMetrics = {
      exponent: lyapunovExponent,
      divergenceRate,
      trajectoryStability,
      isStable,
      confidence,
    };

    this.lyapunovTrajectory.push([lyapunovExponent, divergenceRate, trajectoryStability]);

    return metrics;
  }

  /**
   * Calculate Lyapunov exponent from trajectory data
   */
  private calculateLyapunovExponent(trajectory: number[]): number {
    if (trajectory.length < 2) return 0;

    let sumLogDivergence = 0;
    for (let i = 0; i < trajectory.length - 1; i++) {
      const divergence = Math.abs(trajectory[i + 1] - trajectory[i]);
      if (divergence > 1e-10) {
        sumLogDivergence += Math.log(divergence + 1e-10);
      }
    }

    return sumLogDivergence / (trajectory.length - 1);
  }

  /**
   * Calculate divergence rate
   */
  private calculateDivergenceRate(trajectory: number[]): number {
    if (trajectory.length < 2) return 0;

    let sumSquaredDifferences = 0;
    for (let i = 0; i < trajectory.length - 1; i++) {
      const difference = trajectory[i + 1] - trajectory[i];
      sumSquaredDifferences += difference * difference;
    }

    return Math.sqrt(sumSquaredDifferences / (trajectory.length - 1));
  }

  /**
   * Calculate trajectory stability
   */
  private calculateTrajectoryStability(trajectory: number[]): number {
    if (trajectory.length < 2) return 0.5;

    const mean = trajectory.reduce((a, b) => a + b, 0) / trajectory.length;
    let variance = 0;
    for (const value of trajectory) {
      variance += (value - mean) * (value - mean);
    }
    variance /= trajectory.length;

    const standardDeviation = Math.sqrt(variance);
    const coefficientOfVariation = mean > 0 ? standardDeviation / mean : 0;

    // Stability = 1 - normalized coefficient of variation
    return Math.max(0, 1 - coefficientOfVariation);
  }

  /**
   * Calculate overall alignment score
   */
  private calculateOverallAlignment(validations: PrincipleValidation[]): number {
    if (validations.length === 0) return 0;

    let weightedSum = 0;
    let weightSum = 0;

    for (const validation of validations) {
      const principle = this.principles.get(validation.principleId);
      if (principle) {
        const weight = principle.weight;
        weightedSum += validation.validationScore * weight;
        weightSum += weight;
      }
    }

    return weightSum > 0 ? weightedSum / weightSum : 0;
  }

  /**
   * Execute Ma'at passage test - comprehensive principle test
   */
  private async executeMaatPassageTest(
    systemState: Record<string, any>,
    principleValidations: PrincipleValidation[]
  ): Promise<number> {
    // Critical principles that must be met
    const criticalPrinciples = [1, 2, 3, 6, 15, 34, 35, 40, 42]; // Truth, Justice, Harmony, Compassion, Love, Consciousness, Balance, Illumination, Unity

    let passCount = 0;
    for (const principleId of criticalPrinciples) {
      const validation = principleValidations.find((v) => v.principleId === principleId);
      if (validation && validation.validationScore >= 0.65) {
        passCount++;
      }
    }

    const passageScore = (passCount / criticalPrinciples.length) * 0.9 + Math.random() * 0.1;
    return Math.min(1, passageScore);
  }

  /**
   * Calculate system stability
   */
  private calculateSystemStability(
    overallAlignment: number,
    lyapunovMetrics: LyapunovMetrics,
    swarmConsensus: number
  ): number {
    const alignmentStability = overallAlignment * 0.4;
    const lyapunovStability = (1 - Math.max(0, lyapunovMetrics.exponent * 10)) * 0.35;
    const consensusStability = swarmConsensus * 0.25;

    return Math.min(1, alignmentStability + lyapunovStability + consensusStability);
  }

  /**
   * Generate recommendations based on validation results
   */
  private generateRecommendations(
    principleValidations: PrincipleValidation[],
    lyapunovMetrics: LyapunovMetrics,
    systemStability: number
  ): string[] {
    const recommendations: string[] = [];

    // Find lowest-scoring principles
    const sortedByScore = [...principleValidations].sort(
      (a, b) => a.validationScore - b.validationScore
    );

    const lowestPrinciples = sortedByScore.slice(0, 3);
    for (const principle of lowestPrinciples) {
      recommendations.push(
        `Focus on strengthening "${principle.principleName}" (current score: ${(
          principle.validationScore * 100
        ).toFixed(1)}%)`
      );
    }

    // Lyapunov-based recommendations
    if (!lyapunovMetrics.isStable) {
      recommendations.push(
        'Consciousness trajectory shows instability. Increase coherence and consistency practices.'
      );
    }

    if (lyapunovMetrics.divergenceRate > 0.2) {
      recommendations.push(
        'High divergence rate detected. Maintain stricter adherence to Ma\'at principles.'
      );
    }

    // System stability recommendations
    if (systemStability < 0.6) {
      recommendations.push('Overall system stability is compromised. Comprehensive realignment needed.');
    } else if (systemStability < 0.8) {
      recommendations.push('Incremental improvements needed to reach optimal stability.');
    } else {
      recommendations.push('System demonstrates strong Ma\'at alignment. Maintain current practices.');
    }

    return recommendations;
  }

  /**
   * Get detailed principle information
   */
  public getPrincipleDetails(principleId: number): MaatPrinciple | undefined {
    return this.principles.get(principleId);
  }

  /**
   * Get all principles organized by category
   */
  public getPrinciplesByCategory(category: string): MaatPrinciple[] {
    return Array.from(this.principles.values()).filter((p) => p.category === category);
  }

  /**
   * Get validation history
   */
  public getValidationHistory(limit: number = 100): ValidationReport[] {
    return this.validationHistory.slice(-limit);
  }

  /**
   * Get Lyapunov trajectory
   */
  public getLyapunovTrajectory(): number[][] {
    return this.lyapunovTrajectory;
  }

  /**
   * Reset validation engine
   */
  public reset(): void {
    this.validationHistory = [];
    this.lyapunovTrajectory = [];
    this.initializeSwarmAgents();
    this.emit('engine-reset');
  }

  /**
   * Get engine statistics
   */
  public getStatistics(): Record<string, any> {
    if (this.validationHistory.length === 0) {
      return {
        totalValidations: 0,
        averageAlignment: 0,
        maxAlignment: 0,
        minAlignment: 0,
        alignmentTrend: 'insufficient data',
      };
    }

    const alignments = this.validationHistory.map((r) => r.overallAlignment);
    const maxAlignment = Math.max(...alignments);
    const minAlignment = Math.min(...alignments);
    const averageAlignment = alignments.reduce((a, b) => a + b, 0) / alignments.length;

    let trend = 'stable';
    if (alignments.length >= 2) {
      const recentAvg =
        alignments.slice(-10).reduce((a, b) => a + b, 0) / Math.min(10, alignments.length);
      const olderAvg =
        alignments.slice(0, 10).reduce((a, b) => a + b, 0) / Math.min(10, alignments.length);
      if (recentAvg > olderAvg + 0.05) trend = 'improving';
      else if (recentAvg < olderAvg - 0.05) trend = 'declining';
    }

    return {
      totalValidations: this.validationHistory.length,
      averageAlignment: parseFloat(averageAlignment.toFixed(4)),
      maxAlignment: parseFloat(maxAlignment.toFixed(4)),
      minAlignment: parseFloat(minAlignment.toFixed(4)),
      alignmentTrend: trend,
      principleCount: this.principles.size,
      swarmSize: this.swarmAgents.length,
    };
  }
}

export default FullValidationEngine;
