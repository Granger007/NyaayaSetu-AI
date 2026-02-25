import React from 'react';
import { Scheme } from './types';
import './Scheme.css';

interface SchemeCardProps {
    scheme: Scheme;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
    return (
        <div className="scheme-card">
            <div className="scheme-card-header">
                <h3 className="scheme-card-title">{scheme.scheme_name}</h3>
                {scheme.description && <p className="scheme-card-desc">{scheme.description}</p>}
            </div>

            <div className="scheme-card-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="scheme-card-field">
                        <span className="scheme-card-label">Required Documents</span>
                        <div className="scheme-card-value text-xs">
                            {scheme.documents_required?.join(", ") || "N/A"}
                        </div>
                    </div>
                    <div className="scheme-card-field">
                        <span className="scheme-card-label">Benefit</span>
                        <span className="scheme-card-value" style={{ color: '#047857', fontWeight: '700' }}>{scheme.benefit}</span>
                    </div>
                </div>

                <div className="scheme-card-match">
                    <div className="scheme-match-title">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Why you match
                    </div>
                    <div className="scheme-match-reason">{scheme.why_eligible}</div>
                </div>
            </div>

            <div className="scheme-card-action">
                <a 
                    href={scheme.apply_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="apply-btn text-center flex items-center justify-center no-underline"
                >
                    Apply Now
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ marginLeft: '8px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default SchemeCard;
