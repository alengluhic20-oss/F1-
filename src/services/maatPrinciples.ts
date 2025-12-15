/**
 * The 42 Principles of Ma'at (Ancient Egyptian Ethics)
 * Applied to modern deployment and system operations
 */

import { MaatPrinciple } from '../types/deployment';

export const MAAT_PRINCIPLES: MaatPrinciple[] = [
  { id: 1, name: "I have not done iniquity", description: "No malicious code", symbol: "⚖️", validated: false },
  { id: 2, name: "I have not robbed with violence", description: "No unauthorized access", symbol: "🛡️", validated: false },
  { id: 3, name: "I have not done violence", description: "No destructive operations", symbol: "🕊️", validated: false },
  { id: 4, name: "I have not committed theft", description: "No data theft", symbol: "🔒", validated: false },
  { id: 5, name: "I have not slain people", description: "No service termination", symbol: "💚", validated: false },
  { id: 6, name: "I have not destroyed food", description: "No resource waste", symbol: "🌾", validated: false },
  { id: 7, name: "I have not acted deceitfully", description: "Transparent logging", symbol: "👁️", validated: false },
  { id: 8, name: "I have not purloined sacred property", description: "Config integrity", symbol: "📜", validated: false },
  { id: 9, name: "I have not uttered falsehood", description: "Accurate metrics", symbol: "📊", validated: false },
  { id: 10, name: "I have not carried away food", description: "Memory management", symbol: "💾", validated: false },
  { id: 11, name: "I have not uttered vile words", description: "Clean error messages", symbol: "💬", validated: false },
  { id: 12, name: "I have not attacked", description: "No DDoS patterns", symbol: "🌐", validated: false },
  { id: 13, name: "I have not slaughtered sacred animals", description: "Preserve core services", symbol: "🐾", validated: false },
  { id: 14, name: "I have not eaten sacred grain", description: "CPU efficiency", symbol: "⚡", validated: false },
  { id: 15, name: "I have not acted craftily", description: "No backdoors", symbol: "🚪", validated: false },
  { id: 16, name: "I have not laid waste", description: "Database integrity", symbol: "🗄️", validated: false },
  { id: 17, name: "I have not been an eavesdropper", description: "Privacy compliance", symbol: "🔐", validated: false },
  { id: 18, name: "I have not spoken scornfully", description: "Respectful API responses", symbol: "🤝", validated: false },
  { id: 19, name: "I have not acted with violence", description: "Graceful degradation", symbol: "🌊", validated: false },
  { id: 20, name: "I have not judged hastily", description: "Proper validation", symbol: "⚖️", validated: false },
  { id: 21, name: "I have not transgressed", description: "Follow protocols", symbol: "📋", validated: false },
  { id: 22, name: "I have not been hot-tempered", description: "Rate limiting", symbol: "⏱️", validated: false },
  { id: 23, name: "I have not been deaf to truth", description: "Monitor feedback", symbol: "👂", validated: false },
  { id: 24, name: "I have not quarreled", description: "Conflict resolution", symbol: "☮️", validated: false },
  { id: 25, name: "I have not caused terror", description: "User experience", symbol: "😊", validated: false },
  { id: 26, name: "I have not transgressed law", description: "Regulatory compliance", symbol: "⚖️", validated: false },
  { id: 27, name: "I have not been angry", description: "Stable responses", symbol: "🧘", validated: false },
  { id: 28, name: "I have not stopped ears to truth", description: "Log analysis", symbol: "📝", validated: false },
  { id: 29, name: "I have not committed blasphemy", description: "Respect conventions", symbol: "📖", validated: false },
  { id: 30, name: "I have not acted with violence", description: "Safe migrations", symbol: "🔄", validated: false },
  { id: 31, name: "I have not acted deceitfully", description: "Honest telemetry", symbol: "📡", validated: false },
  { id: 32, name: "I have not cursed the god", description: "System reverence", symbol: "🌟", validated: false },
  { id: 33, name: "I have not behaved with arrogance", description: "Humble code", symbol: "🙏", validated: false },
  { id: 34, name: "I have not been greedy", description: "Resource sharing", symbol: "🤲", validated: false },
  { id: 35, name: "I have not filched property", description: "Dependency licensing", symbol: "📄", validated: false },
  { id: 36, name: "I have not stolen bread", description: "Fair allocation", symbol: "🍞", validated: false },
  { id: 37, name: "I have not eavesdropped", description: "Secure channels", symbol: "🔊", validated: false },
  { id: 38, name: "I have not spoken evil", description: "Constructive logs", symbol: "✍️", validated: false },
  { id: 39, name: "I have not committed adultery", description: "API fidelity", symbol: "💍", validated: false },
  { id: 40, name: "I have not polluted myself", description: "Clean state", symbol: "✨", validated: false },
  { id: 41, name: "I have not caused fear", description: "Graceful errors", symbol: "🕊️", validated: false },
  { id: 42, name: "I have not transgressed", description: "Complete integrity", symbol: "☥", validated: false }
];

export function getPrincipleById(id: number): MaatPrinciple | undefined {
  return MAAT_PRINCIPLES.find(p => p.id === id);
}

export function getRandomUnvalidatedPrinciple(validated: number[]): MaatPrinciple | undefined {
  const unvalidated = MAAT_PRINCIPLES.filter(p => !validated.includes(p.id));
  if (unvalidated.length === 0) return undefined;
  return unvalidated[Math.floor(Math.random() * unvalidated.length)];
}
