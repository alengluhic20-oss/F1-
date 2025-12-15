/**
 * Ethical Console
 * Main container for the Feather-Scale Deployment Ritual
 */

import React, { useState } from 'react';
import { useDeploymentRitual } from '../../hooks/useDeploymentRitual';
import { CosmosVisualization } from './CosmosVisualization';
import { TraditionalLogsView } from './TraditionalLogsView';
import { MaatRitualModal } from './MaatRitualModal';

type ViewMode = 'cosmos' | 'traditional' | 'split';

export const EthicalConsole: React.FC = () => {
  const {
    ritualState,
    metrics,
    featherScale,
    isRunning,
    startRitual,
    continueRitual,
    pauseRitual,
    resetRitual,
    completeRecitation
  } = useDeploymentRitual();

  const [viewMode, setViewMode] = useState<ViewMode>('split');

  const handleModalContinue = () => {
    if (ritualState.phase === 'invocation') {
      completeRecitation();
    } else {
      continueRitual();
    }
  };

  return (
    <div style={{
      backgroundColor: '#0f0f1e',
      minHeight: '100vh',
      padding: '2rem',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        borderBottom: '2px solid gold',
        paddingBottom: '1rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          color: '#ffd700',
          margin: '0 0 0.5rem 0',
          textShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
        }}>
          ☥ Feather-Scale Deployment Ritual ☥
        </h1>
        <p style={{
          color: '#aaa',
          fontSize: '1.1rem',
          margin: 0
        }}>
          Ethical Deployment Console • Ma'at Principle Validation
        </p>
      </div>

      {/* Control Panel */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={startRitual}
          disabled={isRunning || ritualState.phase !== 'preparation'}
          style={{
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            backgroundColor: ritualState.phase === 'preparation' ? '#4CAF50' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: ritualState.phase === 'preparation' ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
        >
          🌟 Begin Ritual
        </button>

        <button
          onClick={pauseRitual}
          disabled={!isRunning}
          style={{
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            backgroundColor: isRunning ? '#ff9800' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isRunning ? 'pointer' : 'not-allowed',
            fontWeight: 'bold'
          }}
        >
          ⏸️ Pause
        </button>

        <button
          onClick={resetRitual}
          style={{
            padding: '0.8rem 2rem',
            fontSize: '1rem',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🔄 Reset
        </button>

        <div style={{
          padding: '0.8rem 1rem',
          backgroundColor: '#1a1a2e',
          borderRadius: '8px',
          border: '2px solid gold',
          fontWeight: 'bold',
          color: '#ffd700'
        }}>
          Phase: {ritualState.phase.toUpperCase()}
        </div>

        <div style={{
          padding: '0.8rem 1rem',
          backgroundColor: '#1a1a2e',
          borderRadius: '8px',
          border: '2px solid #4CAF50',
          fontWeight: 'bold',
          color: '#4CAF50'
        }}>
          {ritualState.principlesValidated.length} / 42 Validated
        </div>
      </div>

      {/* View Mode Toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        {(['cosmos', 'traditional', 'split'] as ViewMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: viewMode === mode ? 'gold' : '#333',
              color: viewMode === mode ? '#000' : '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textTransform: 'capitalize'
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: viewMode === 'split' ? '1fr 1fr' : '1fr',
        gap: '2rem'
      }}>
        {(viewMode === 'cosmos' || viewMode === 'split') && (
          <div>
            <h2 style={{ color: '#ffd700', marginBottom: '1rem' }}>
              🌌 Cosmic Visualization
            </h2>
            <CosmosVisualization
              featherScale={featherScale}
              metrics={metrics}
              validatedCount={ritualState.principlesValidated.length}
            />
          </div>
        )}

        {(viewMode === 'traditional' || viewMode === 'split') && (
          <div>
            <h2 style={{ color: '#00ff00', marginBottom: '1rem' }}>
              📜 Traditional Logs
            </h2>
            <TraditionalLogsView metrics={metrics} />
          </div>
        )}
      </div>

      {/* Ritual Modal */}
      <MaatRitualModal
        isOpen={ritualState.recitationRequired || false}
        recitationText={ritualState.recitationText || ''}
        onContinue={handleModalContinue}
      />

      {/* Footer */}
      <div style={{
        marginTop: '3rem',
        textAlign: 'center',
        color: '#666',
        fontSize: '0.9rem',
        borderTop: '1px solid #333',
        paddingTop: '1rem'
      }}>
        <p style={{ margin: '0.5rem 0' }}>
          "In mathematics and ceremony, we find the language of the universe."
        </p>
        <p style={{ margin: '0.5rem 0' }}>
          Balance: {featherScale.balance.toFixed(2)} | 
          Heart Weight: {(featherScale.heartWeight * 100).toFixed(0)}% | 
          Services: {new Set(metrics.map(m => m.service)).size}
        </p>
      </div>
    </div>
  );
};
