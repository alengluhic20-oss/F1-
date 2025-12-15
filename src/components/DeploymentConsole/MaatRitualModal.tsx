/**
 * Ma'at Ritual Modal
 * Displays recitations and prompts for reflection
 */

import React from 'react';

interface MaatRitualModalProps {
  isOpen: boolean;
  recitationText: string;
  onContinue: () => void;
}

export const MaatRitualModal: React.FC<MaatRitualModalProps> = ({
  isOpen,
  recitationText,
  onContinue
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        backgroundColor: '#1a1a2e',
        color: '#f0e68c',
        padding: '3rem',
        borderRadius: '20px',
        maxWidth: '600px',
        border: '2px solid gold',
        boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
        textAlign: 'center',
        fontFamily: 'Georgia, serif'
      }}>
        <div style={{
          fontSize: '1.2rem',
          lineHeight: '1.8',
          whiteSpace: 'pre-wrap',
          marginBottom: '2rem'
        }}>
          {recitationText}
        </div>
        <button
          onClick={onContinue}
          style={{
            backgroundColor: 'gold',
            color: '#1a1a2e',
            border: 'none',
            padding: '1rem 3rem',
            fontSize: '1.1rem',
            borderRadius: '10px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.4)';
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
