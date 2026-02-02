import React, { useEffect, useState } from 'react';

export default function Hero({ setPage }) {
    const [visible, setVisible] = useState(false);

    // Animation trigger
    useEffect(() => {
        setTimeout(() => setVisible(true), 100);
    }, []);

    return (
        <>
            {/* 4a. HERO (white, two-col) */}
            <section className="section" style={{ background: '#FFFFFF', padding: '80px 24px' }}>
                <div style={{
                    maxWidth: '1080px', margin: '0 auto',
                    display: 'grid', gridTemplateColumns: '1.22fr 1fr', // ~55% / 45%
                    gap: '60px', alignItems: 'center'
                }}>
                    {/* LEFT COLUMN */}
                    <div className={`reveal ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0s' }}>
                        <div style={{
                            fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11.5px',
                            color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '24px'
                        }}>
                            AI-Powered Admissions Intelligence
                        </div>
                        <h1 style={{
                            fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '48px',
                            color: '#2C2220', lineHeight: 1.12, marginBottom: '24px'
                        }}>
                            Get Into Your<br />Top-Choice Schools.
                        </h1>
                        <p style={{
                            fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '16px',
                            color: '#4A4A4A', lineHeight: 1.75, maxWidth: '480px', marginBottom: '32px'
                        }}>
                            Stop guessing. Our AI analyzes your profile against real Common Data Set
                            statistics to predict your admission chances with precision.
                        </p>
                        
                        <button className="btn-primary" onClick={() => setPage('profile')}>
                            GET STARTED →
                        </button>

                        <div style={{ marginTop: '48px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '12px', color: '#9CA3AF', fontFamily: "'Inter', sans-serif" }}>
                                Powered by
                            </span>
                            {['Common Data Sets', 'College Scorecard', 'Meta Llama'].map(s => (
                                <span key={s} style={{
                                    fontSize: '11px', fontFamily: "'Inter', sans-serif", fontWeight: 500,
                                    color: '#8B7355', background: '#F5F0E8', padding: '4px 10px', borderRadius: '20px',
                                    whiteSpace: 'nowrap'
                                }}>{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN - Prediction Card */}
                    <div className={`reveal md:block hidden ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
                        <div style={{
                            background: '#FFFFFF', borderRadius: '12px',
                            boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '32px',
                            maxWidth: '360px', margin: '0 auto', position: 'relative'
                        }}>
                            <div style={{ fontSize: '11px', color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                                Sample Prediction
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '24px' }}>
                                {/* SVG Ring */}
                                <div style={{ position: 'relative', width: '88px', height: '88px' }}>
                                    <svg width="88" height="88" viewBox="0 0 88 88">
                                        <circle cx="44" cy="44" r="36" fill="none" stroke="#E8F5E9" strokeWidth="6" />
                                        <circle cx="44" cy="44" r="36" fill="none" stroke="#2E7D32" strokeWidth="6"
                                            strokeDasharray="226" strokeDashoffset="36" strokeLinecap="round"
                                            transform="rotate(-90 44 44)" />
                                    </svg>
                                    <div style={{
                                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                        fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '20px', color: '#2C2220'
                                    }}>
                                        84%
                                    </div>
                                </div>

                                <div>
                                    <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '18px', color: '#2C2220' }}>
                                        Stanford<br/>University
                                    </div>
                                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#7A7A7A', marginTop: '4px' }}>
                                        Reach School
                                    </div>
                                    <div style={{
                                        display: 'inline-block', marginTop: '8px',
                                        background: '#FEF3C7', color: '#92400E',
                                        fontSize: '11px', fontWeight: 600, fontFamily: "'Inter', sans-serif",
                                        padding: '4px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.08em'
                                    }}>
                                        Reach
                                    </div>
                                </div>
                            </div>

                            <div style={{ height: '1px', background: '#D4C4A8', margin: '24px 0', opacity: 0.5 }}></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#4A4A4A' }}>Academic Fit</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#2E7D32' }}>Strong</span>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2E7D32' }}></div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#4A4A4A' }}>Extracurriculars</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: '#F59E0B' }}>Needs Work</span>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4d. WHY ADMITPREDICT (White) */}
            <section style={{ background: '#FFFFFF', padding: '80px 24px' }}>
                <div style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '11.5px',
                        color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '16px'
                    }}>
                        Why AdmitPredict
                    </div>
                    <h3 style={{
                        fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '32px',
                        color: '#2C2220', marginBottom: '64px'
                    }}>
                        The AdmitPredict Advantage
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', textAlign: 'left' }}>
                        {[
                            { title: 'Real Data Sources', desc: 'We aggregate data from Common Data Sets and College Scorecard to ensure accuracy, not just guesswork.' },
                            { title: 'Personalized Recs', desc: 'Your extracurriculars and major choice matter. We weigh these factors heavily in our prediction model.' },
                            { title: 'Powered by Llama 3', desc: 'Our reasoning engine uses the latest open-source LLMs to provide qualitative feedback on your profile.' }
                        ].map((feature, i) => (
                            <div key={i}>
                                <h5 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '16px', color: '#2C2220', marginBottom: '12px' }}>
                                    {feature.title}
                                </h5>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#4A4A4A', lineHeight: 1.6 }}>
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4e. BOTTOM CTA (Cream) - Alternating from 4d (White) */}
            <section style={{ background: '#F5F0E8', padding: '100px 24px', textAlign: 'center' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h3 style={{
                        fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '32px',
                        color: '#2C2220', marginBottom: '16px'
                    }}>
                        Ready to see where you stand?
                    </h3>
                    <p style={{
                        fontFamily: "'Inter', sans-serif", fontSize: '16px', color: '#4A4A4A',
                        marginBottom: '32px'
                    }}>
                        Build your profile in under 2 minutes and get your personalized admissions chances immediately.
                    </p>
                    <button className="btn-primary" onClick={() => setPage('profile')}>
                        GET STARTED →
                    </button>
                </div>
            </section>
        </>
    );
}
