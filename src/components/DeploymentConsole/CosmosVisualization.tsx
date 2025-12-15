/**
 * Cosmos Visualization - The Feather Scale
 * Canvas 2D visualization of Ma'at's judgment scale with sacred geometry
 */

import React, { useRef, useEffect } from 'react';
import { FeatherScaleState, DeploymentMetric } from '../../types/deployment';
import { goldenSpiral, sacredColor } from '../../utils/sacredGeometry';

interface CosmosVisualizationProps {
  featherScale: FeatherScaleState;
  metrics: DeploymentMetric[];
  validatedCount: number;
}

export const CosmosVisualization: React.FC<CosmosVisualizationProps> = ({
  featherScale,
  metrics,
  validatedCount
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Animation loop
    let animationId: number;
    let time = 0;

    const draw = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Draw golden spiral background
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.1)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let angle = 0; angle < Math.PI * 8; angle += 0.1) {
        const point = goldenSpiral(angle, 20);
        const x = centerX + point.x;
        const y = centerY + point.y;
        if (angle === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw the scale beam
      const beamTilt = featherScale.balance * 0.3; // Tilt based on balance
      const beamY = centerY - 100;
      
      ctx.save();
      ctx.translate(centerX, beamY);
      ctx.rotate(beamTilt);
      
      // Beam
      ctx.strokeStyle = 'gold';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-200, 0);
      ctx.lineTo(200, 0);
      ctx.stroke();

      // Left pan (Feather)
      const leftX = -150;
      const leftY = Math.sin(time * 2) * 5; // Gentle oscillation
      
      ctx.beginPath();
      ctx.arc(leftX, leftY + 40, 30, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fill();
      ctx.strokeStyle = 'gold';
      ctx.stroke();

      // Feather symbol
      ctx.font = '40px Arial';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText('🪶', leftX, leftY + 50);

      // Right pan (Heart)
      const rightX = 150;
      const rightY = -Math.sin(time * 2) * 5; // Counter-oscillation
      
      ctx.beginPath();
      ctx.arc(rightX, rightY + 40, 30, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 100, 100, 0.2)';
      ctx.fill();
      ctx.strokeStyle = 'gold';
      ctx.stroke();

      // Heart symbol
      ctx.fillStyle = '#ff6b6b';
      ctx.fillText('❤️', rightX, rightY + 50);

      ctx.restore();

      // Draw validated principles as stars
      const radius = 180;
      for (let i = 0; i < validatedCount; i++) {
        const angle = (i / 42) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.fillStyle = sacredColor(i / 42, 'chakra');
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = sacredColor(i / 42, 'chakra');
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw recent metrics as particles
      metrics.slice(-10).forEach((_metric, idx) => {
        const age = (10 - idx) / 10;
        const angle = time + idx * 0.5;
        const distance = 100 + age * 50;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        ctx.fillStyle = `rgba(100, 200, 255, ${age * 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw center ankh
      ctx.font = 'bold 60px Arial';
      ctx.fillStyle = 'gold';
      ctx.textAlign = 'center';
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'gold';
      ctx.fillText('☥', centerX, centerY + 200);
      ctx.shadowBlur = 0;

      // Draw balance text
      ctx.font = '20px Arial';
      ctx.fillStyle = 'white';
      const balanceText = featherScale.balance > 0.5 ? 'Balanced' : featherScale.balance < -0.5 ? 'Imbalanced' : 'Stabilizing';
      ctx.fillText(balanceText, centerX, centerY + 260);

      // Progress text
      ctx.font = '16px Monaco';
      ctx.fillStyle = '#ffd700';
      ctx.fillText(`${validatedCount} / 42 Principles Validated`, centerX, centerY + 290);

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [featherScale, metrics, validatedCount]);

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '10px',
          backgroundColor: '#0a0a14'
        }}
      />
    </div>
  );
};
