/**
 * Traditional Logs View
 * Standard console-style deployment logs
 */

import React from 'react';
import { DeploymentMetric } from '../../types/deployment';

interface TraditionalLogsViewProps {
  metrics: DeploymentMetric[];
}

export const TraditionalLogsView: React.FC<TraditionalLogsViewProps> = ({ metrics }) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'validated': return '#00ff00';
      case 'online': return '#00bfff';
      case 'error': return '#ff0000';
      case 'recalibrating': return '#ffa500';
      default: return '#ffffff';
    }
  };

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      color: '#00ff00',
      padding: '1rem',
      borderRadius: '10px',
      fontFamily: 'Monaco, Consolas, monospace',
      fontSize: '0.9rem',
      height: '600px',
      overflowY: 'auto',
      border: '1px solid #333'
    }}>
      <div style={{ marginBottom: '1rem', color: '#888', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
        === DEPLOYMENT LOGS ===
      </div>
      {metrics.slice(-30).reverse().map((metric, idx) => (
        <div key={idx} style={{ marginBottom: '0.5rem', display: 'flex', gap: '1rem' }}>
          <span style={{ color: '#666' }}>
            {metric.timestamp.toLocaleTimeString()}
          </span>
          <span style={{ color: getStatusColor(metric.status), fontWeight: 'bold', minWidth: '100px' }}>
            [{metric.status.toUpperCase()}]
          </span>
          <span>
            {metric.service}
          </span>
          {metric.maatPrinciple && (
            <span style={{ color: '#ffd700' }}>
              → Ma'at #{metric.maatPrinciple}
            </span>
          )}
          <span style={{ color: '#888', marginLeft: 'auto' }}>
            health: {(metric.healthScore * 100).toFixed(1)}%
          </span>
        </div>
      ))}
      {metrics.length === 0 && (
        <div style={{ color: '#666', textAlign: 'center', marginTop: '2rem' }}>
          Waiting for deployment to begin...
        </div>
      )}
    </div>
  );
};
