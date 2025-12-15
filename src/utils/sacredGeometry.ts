/**
 * Sacred Geometry Utilities
 * Mathematical patterns found in nature and ceremonial architecture
 */

export const PHI = 1.618033988749895; // Golden Ratio
export const TAU = Math.PI * 2; // Full circle

/**
 * Calculates golden ratio spiral coordinates
 */
export function goldenSpiral(angle: number, scale: number = 1): { x: number; y: number } {
  const radius = scale * Math.pow(PHI, (angle * 2) / Math.PI);
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle)
  };
}

/**
 * Generates points on a Fibonacci spiral
 */
export function fibonacciSpiral(points: number, scale: number = 1): Array<{ x: number; y: number; z: number }> {
  const result: Array<{ x: number; y: number; z: number }> = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees

  for (let i = 0; i < points; i++) {
    const theta = i * goldenAngle;
    const r = scale * Math.sqrt(i);
    result.push({
      x: r * Math.cos(theta),
      y: r * Math.sin(theta),
      z: i * (scale / points) // Depth component
    });
  }

  return result;
}

/**
 * Creates a sacred geometry pattern based on the Flower of Life
 */
export function flowerOfLife(rings: number = 3, radius: number = 1): Array<{ x: number; y: number }> {
  const circles: Array<{ x: number; y: number }> = [{ x: 0, y: 0 }];
  
  for (let ring = 1; ring <= rings; ring++) {
    const circlesInRing = ring * 6;
    for (let i = 0; i < circlesInRing; i++) {
      const angle = (i / circlesInRing) * TAU;
      const distance = ring * radius;
      circles.push({
        x: distance * Math.cos(angle),
        y: distance * Math.sin(angle)
      });
    }
  }

  return circles;
}

/**
 * Generates a Merkaba (star tetrahedron) vertices
 */
export function merkaba(size: number = 1): Array<{ x: number; y: number; z: number }> {
  const vertices: Array<{ x: number; y: number; z: number }> = [];
  
  // Upper tetrahedron
  vertices.push({ x: 0, y: size, z: 0 });
  vertices.push({ x: size, y: 0, z: 0 });
  vertices.push({ x: -size * 0.5, y: 0, z: size * 0.866 });
  vertices.push({ x: -size * 0.5, y: 0, z: -size * 0.866 });
  
  // Lower tetrahedron (inverted)
  vertices.push({ x: 0, y: -size, z: 0 });
  vertices.push({ x: -size, y: 0, z: 0 });
  vertices.push({ x: size * 0.5, y: 0, z: -size * 0.866 });
  vertices.push({ x: size * 0.5, y: 0, z: size * 0.866 });

  return vertices;
}

/**
 * Calculates harmonics based on sacred ratios
 */
export function sacredHarmonic(index: number): number {
  // Based on Pythagorean musical ratios
  const ratios = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8, 2];
  return ratios[index % ratios.length];
}

/**
 * Maps a value to a color using sacred color principles
 */
export function sacredColor(value: number, spectrum: 'chakra' | 'element' = 'chakra'): string {
  if (spectrum === 'chakra') {
    // 7 chakra colors
    const colors = [
      '#FF0000', // Root - Red
      '#FF7F00', // Sacral - Orange
      '#FFFF00', // Solar - Yellow
      '#00FF00', // Heart - Green
      '#0000FF', // Throat - Blue
      '#4B0082', // Third Eye - Indigo
      '#9400D3'  // Crown - Violet
    ];
    const index = Math.floor(value * colors.length) % colors.length;
    return colors[index];
  } else {
    // 4 elements
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
    const index = Math.floor(value * colors.length) % colors.length;
    return colors[index];
  }
}

/**
 * Creates oscillation based on golden ratio
 */
export function goldenOscillation(time: number, frequency: number = 1): number {
  return Math.sin(time * frequency) * Math.cos(time * frequency / PHI);
}
