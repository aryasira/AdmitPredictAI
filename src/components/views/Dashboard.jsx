import React, { useState } from 'react';

// Reusing the exact card composition from prompt
const CollegeCard = ({ prediction, profile, college }) => {
    const [expanded, setExpanded] = useState(false);

    // Logic for color coding
    const isReach = prediction.category.includes('Reach');
    const catBg = isReach ? '#FFF1F2' : '#E8F5E9'; // Red-ish for reach, Green-ish for others
    const catText = isReach ? '#9F1239' : '#2E7D32';

    return (
        <div className="card" style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h4>{college.name}</h4>
                    <p style={{ fontSize: '13px', color: '#7A7A7A', marginTop: '2px' }}>{college.state} · {college.type}</p>
                </div>
                <span style={{
                    background: catBg, color: catText,
                    fontSize: '11px', fontWeight: 600, fontFamily: "'Inter',sans-serif",
                    padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>{prediction.category}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
                <div>
                    <span style={{ fontSize: '12px', color: '#7A7A7A', fontFamily: "'Inter',sans-serif" }}>Acceptance Rate</span>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#2C2220', fontFamily: "'Inter',sans-serif" }}>{(college.acceptanceRate * 100).toFixed(1)}%</p>
                </div>
                <div>
                    <span style={{ fontSize: '12px', color: '#7A7A7A', fontFamily: "'Inter',sans-serif" }}>Your Predicted Chance</span>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#2E7D32', fontFamily: "'Inter',sans-serif" }}>{prediction.predictedChance}%</p>
                </div>
            </div>

            <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#7A7A7A', fontFamily: "'Inter',sans-serif" }}>
                    <span>Your GPA: {profile.gpaUnweighted}</span>
                    <span>Median: {college.gpaRange.join('-')}</span>
                </div>
                {/* Simple visual bar */}
                <div style={{ height: '6px', background: '#E8F5E9', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `75%`, background: '#2E7D32', borderRadius: '3px' }} />
                </div>
            </div>

            <button onClick={() => setExpanded(!expanded)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#2E7D32', fontFamily: "'Inter',sans-serif", fontWeight: 500, fontSize: '13px',
                marginTop: '16px', padding: 0, display: 'flex', alignItems: 'center', gap: '6px',
            }}>
                {expanded ? '▲' : '▼'} Why this prediction?
            </button>
            {expanded && (
                <p style={{ fontSize: '13px', color: '#4A4A4A', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #D4C4A8' }}>
                    {prediction.explanation}
                </p>
            )}
        </div>
    );
};

const RecCard = ({ rec }) => {
    const [completed, setCompleted] = useState(false);
    let borderCol = '#2E7D32';
    if (rec.category === 'Test Prep') borderCol = '#F59E0B';
    if (rec.category.includes('Extra')) borderCol = '#8B7355';

    return (
        <div className="card" style={{ marginBottom: '16px', borderLeft: `4px solid ${borderCol}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h5 style={{ textDecoration: completed ? 'line-through' : 'none', color: completed ? '#7A7A7A' : '#2C2220' }}>{rec.title}</h5>
                {completed && <span style={{ color: '#2E7D32', fontSize: '18px' }}>✓</span>}
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <span style={{ background: rec.priority === 'High' ? '#FEF3C7' : '#E0E7FF', color: rec.priority === 'High' ? '#92400E' : '#3730A3', fontSize: '10px', fontWeight: 600, fontFamily: "'Inter',sans-serif", padding: '3px 9px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {rec.priority}
                </span>
                <span style={{ background: '#F5F0E8', color: '#8B7355', fontSize: '10px', fontWeight: 500, fontFamily: "'Inter',sans-serif", padding: '3px 9px', borderRadius: '20px', border: '1px solid #D4C4A8' }}>
                    {rec.category}
                </span>
            </div>
            <p style={{ fontSize: '14px', marginTop: '10px' }}>{rec.explanation}</p>
            <p style={{ fontSize: '12px', color: '#7A7A7A', fontStyle: 'italic', marginTop: '6px', fontFamily: "'Inter',sans-serif" }}>
                Est. Impact: {rec.estimatedImpact}
            </p>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', cursor: 'pointer', userSelect: 'none' }}>
                <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} style={{ accentColor: '#2E7D32', width: '16px', height: '16px' }} />
                <span style={{ fontSize: '13px', color: '#4A4A4A', fontFamily: "'Inter',sans-serif" }}>Mark as Done</span>
            </label>
        </div>
    );
};

export default function Dashboard({ analysis, profile }) {
    if (!analysis) return <div className="section section--white text-center">No analysis loaded. Go to Profile.</div>;

    const { overallScore, overallSummary, predictions, recommendations } = analysis;

    // Get college data for predictions (In real app, we look up from ID, here we assume name match or pass it through)
    // For demo, we just pass the prediction data directly and assume some College Metadata for the card
    const getCollegeMeta = (pred) => {
        // Mock lookup
        return { name: pred.college, state: 'US', type: 'University', acceptanceRate: 0.05, gpaRange: ['3.8', '4.0'] };
    };

    return (
        <>
            {/* 6a. Overall Score */}
            <section className="section section--white">
                <div className="section__inner">
                    <span className="label">Your Admissions Overview</span>
                    <h3>Your AdmitPredict Score</h3>

                    <div className="card" style={{ marginTop: '32px', display: 'flex', gap: '40px', alignItems: 'center', maxWidth: '640px' }}>
                        <svg width="120" height="120" viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
                            <circle cx="60" cy="60" r="48" fill="none" stroke="#E8F5E9" strokeWidth="10" />
                            <circle cx="60" cy="60" r="48" fill="none" stroke={overallScore >= 70 ? '#2E7D32' : '#F59E0B'} strokeWidth="10"
                                strokeDasharray={`${2 * Math.PI * 48}`}
                                strokeDashoffset={`${2 * Math.PI * 48 * (1 - overallScore / 100)}`}
                                strokeLinecap="round" transform="rotate(-90 60 60)"
                                style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)' }} />
                            <text x="60" y="66" textAnchor="middle" fontFamily="'Inter',sans-serif" fontWeight="700" fontSize="26" fill="#2C2220">{overallScore}</text>
                        </svg>
                        <div>
                            <p style={{ fontSize: '15px', lineHeight: 1.7 }}>{overallSummary}</p>
                            <span style={{
                                display: 'inline-block', marginTop: '12px',
                                background: '#E8F5E9', color: '#2E7D32',
                                fontSize: '12px', fontWeight: 600, fontFamily: "'Inter',sans-serif",
                                padding: '4px 12px', borderRadius: '20px',
                            }}>Overall: {overallScore >= 75 ? 'Strong' : 'Competitive'}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6b. Predictions (Cream) */}
            <section className="section section--cream">
                <div className="section__inner">
                    <span className="label">College Predictions</span>
                    <h3>See Where You Stand</h3>
                    <div style={{ marginTop: '32px' }}>
                        {predictions.map((pred, i) => (
                            <CollegeCard key={i} prediction={pred} profile={profile} college={getCollegeMeta(pred)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 6c. Recommendations (White) */}
            <section className="section section--white">
                <div className="section__inner">
                    <span className="label">Personalized Action Plan</span>
                    <h3>Steps to Improve Your Odds</h3>
                    <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        {recommendations.map((rec, i) => (
                            <RecCard key={i} rec={rec} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
