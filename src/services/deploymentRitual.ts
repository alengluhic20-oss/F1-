/**
 * Deployment Ritual Service
 * Manages the ceremonial flow of deployment with pauses and recitations
 */

import { RitualState } from '../types/deployment';
import { getPrincipleById } from './maatPrinciples';

export class DeploymentRitual {
  private state: RitualState;
  private listeners: ((state: RitualState) => void)[] = [];

  constructor() {
    this.state = {
      phase: 'preparation',
      currentPrinciple: 1,
      principlesValidated: [],
      isPaused: false
    };
  }

  getState(): RitualState {
    return { ...this.state };
  }

  subscribe(listener: (state: RitualState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.getState()));
  }

  startRitual() {
    this.state.phase = 'invocation';
    this.state.isPaused = true;
    this.state.recitationRequired = true;
    this.state.recitationText = this.getInvocationText();
    this.notify();
  }

  completeRecitation() {
    this.state.isPaused = false;
    this.state.recitationRequired = false;
    this.state.phase = 'deployment';
    this.notify();
  }

  validatePrinciple(principleId: number) {
    if (!this.state.principlesValidated.includes(principleId)) {
      this.state.principlesValidated.push(principleId);
      this.state.currentPrinciple = principleId;
      
      // Check for milestone pauses (every 7 principles - sacred number)
      if (this.state.principlesValidated.length % 7 === 0 && 
          this.state.principlesValidated.length < 42) {
        this.pauseForReflection(principleId);
      }

      // Check for completion
      if (this.state.principlesValidated.length === 42) {
        this.completeRitual();
      }

      this.notify();
    }
  }

  private pauseForReflection(principleId: number) {
    const principle = getPrincipleById(principleId);
    this.state.isPaused = true;
    this.state.pauseReason = 'milestone';
    this.state.recitationRequired = true;
    this.state.recitationText = `
🌟 Milestone Reached: ${this.state.principlesValidated.length} Principles Validated

${principle ? principle.name : 'Continue the sacred work'}

Take a moment to reflect on the balance achieved.
Press Continue when ready to proceed.
    `.trim();
  }

  private completeRitual() {
    this.state.phase = 'completion';
    this.state.isPaused = true;
    this.state.recitationRequired = true;
    this.state.recitationText = this.getCompletionText();
  }

  continueRitual() {
    this.state.isPaused = false;
    this.state.recitationRequired = false;
    if (this.state.phase === 'completion') {
      // Ritual is done
      return;
    }
    this.state.phase = 'deployment';
    this.notify();
  }

  private getInvocationText(): string {
    return `
☥ Invocation of Ma'at ☥

By the 42 Principles of Truth and Order,
We call upon the ancient wisdom to guide this deployment.

May our code be just, our systems balanced,
Our intentions pure, and our execution precise.

Let the Feather of Truth measure our work,
And may we pass the test of the Sacred Scale.

Press Continue to begin the ritual.
    `.trim();
  }

  private getCompletionText(): string {
    return `
☥ Ritual Complete ☥

All 42 Principles of Ma'at have been validated.
The Feather and Heart are in perfect balance.

Your deployment embodies:
• Truth in every log
• Order in every service  
• Justice in every allocation
• Harmony in every response

The ancestors smile upon this work.

May it serve with integrity and grace.

☥ Hotep ☥
    `.trim();
  }

  reset() {
    this.state = {
      phase: 'preparation',
      currentPrinciple: 1,
      principlesValidated: [],
      isPaused: false
    };
    this.notify();
  }
}

export const deploymentRitual = new DeploymentRitual();
