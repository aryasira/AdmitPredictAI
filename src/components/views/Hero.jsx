import React, { useEffect, useState } from 'react';
import { useVisitorCount } from '../../hooks/useVisitorCount';

export default function Hero({ setPage }) {
    const visitorCount = useVisitorCount();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true); // Trigger simple reveal
    }, []);

    return (
        <>
            {/* 3a. HERO (white, two-col) */}
            <section className="section section--white">
                <div className="section__inner" style={{
                    display: 'grid',
                    gridTemplateColumns: '1.1fr 0.9fr',
                    gap: '60px',
                    alignItems: 'center',
                    minHeight: '420px',
                }}>
                    {/* LEFT COLUMN */}
                    <div className={`reveal ${visible ? 'visible' : ''}`}>
                        <span className="label">AI-Powered Admissions Intelligence</span>
                        <h1>Get Into Your<br />Top-Choice Schools.</h1>
                        <p style={{ marginTop: '20px', fontSize: '16px', maxWidth: '480px' }}>
                            Stop guessing. Our AI analyzes your profile against real Common Data Set
                            statistics to predict your admission chances with precision.
                        </p>
                        <button className="btn-primary" style={{ marginTop: '32px' }} onClick={() => setPage('profile')}>
                            GET STARTED →
                        </button>

                        <div style={{ marginTop: '36px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{ fontSize: '12px', color: '#7A7A7A', fontFamily: "'Inter', sans-serif" }}>
                                Powered by
                            </span>
                            {['Common Data Sets', 'College Scorecard', 'Meta Llama'].map(s => (
                                <span key={s} style={{
                                    fontSize: '11px', fontFamily: "'Inter', sans-serif", fontWeight: 500,
                                    color: '#8B7355', background: '#F5F0E8', padding: '4px 10px', borderRadius: '20px',
                                }}>{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className={`reveal md:block hidden ${visible ? 'visible' : ''}`} style={{ transitionDelay: '0.12s' }}>
                        <div style={{
                            background: '#FFFFFF', borderRadius: '16px',
                            boxShadow: '0 8px 40px rgba(0,0,0,0.10)', padding: '32px',
                            maxWidth: '360px', margin: '0 auto',
                        }}>
                            <span style={{ fontSize: '11px', fontFamily: "'Inter',sans-serif", fontWeight: 500, color: '#8B7355', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                                Sample Prediction
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '20px' }}>
                                <svg width="88" height="88" viewBox="0 0 88 88">
                                    <circle cx="44" cy="44" r="36" fill="none" stroke="#E8F5E9" strokeWidth="8" />
                                    <circle cx="44" cy="44" r="36" fill="none" stroke="#2E7D32" strokeWidth="8"
                                        strokeDasharray="226" strokeDashoffset="56" strokeLinecap="round"
                                        transform="rotate(-90 44 44)" />
                                    <text x="44" y="52" textAnchor="middle" fontFamily="'Inter',sans-serif" fontWeight="700" fontSize="20" fill="#2C2220">84%</text>
                                </svg>
                                <div>
                                    <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: '17px', color: '#2C2220' }}>Stanford University</div>
                                    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: '13px', color: '#7A7A7A', marginTop: '4px' }}>Reach School</div>
                                    <span style={{
                                        display: 'inline-block', marginTop: '8px',
                                        background: '#FEF3C7', color: '#92400E',
                                        fontSize: '11px', fontWeight: 600, fontFamily: "'Inter',sans-serif",
                                        padding: '3px 10px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.08em',
                                    }}>Reach</span>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #D4C4A8' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontFamily: "'Inter',sans-serif", color: '#4A4A4A' }}>
                                    <span>Academic Fit</span><span style={{ fontWeight: 600, color: '#2E7D32' }}>Strong</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontFamily: "'Inter',sans-serif", color: '#4A4A4A', marginTop: '6px' }}>
                                    <span>Extracurriculars</span><span style={{ fontWeight: 600, color: '#F59E0B' }}>Needs Work</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3b. LIVE VISITOR COUNTER (Cream) */}
            <section className="section section--cream" style={{ padding: '32px 24px' }}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '14px', color: '#7A7A7A', fontFamily: "'Inter', sans-serif" }}>
                        👁 <strong style={{ color: '#2C2220', fontSize: '15px' }}>{visitorCount.toLocaleString()}</strong> students have used AdmitPredict AI
                    </p>
                </div>
            </section>

            {/* 3c. HOW IT WORKS */}
            <section className="section section--white">
                <div className="section__inner">
                    <span className="label">How It Works</span>
                    <h3>Three Steps to Your Prediction</h3>
                    <p style={{ maxWidth: '540px', marginTop: '12px' }}>
                        Build your profile, let our AI do the heavy lifting, and get a personalized roadmap to your dream schools.
                    </p>

                    <div className="reveal-stagger visible" style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '48px',
                    }}>
                        {[
                            { num: 1, title: 'Build Your Profile', desc: 'Enter your grades, test scores, extracurriculars, and target schools in a quick guided form.' },
                            { num: 2, title: 'AI Analyzes', desc: 'Our AI compares your stats against real Common Data Set data for each school you are targeting.' },
                            { num: 3, title: 'Get Your Plan', desc: 'Receive personalized predictions for every target school plus actionable steps to improve your odds.' },
                        ].map((step, i) => (
                            <div key={i} style={{ textAlign: 'left' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '50%',
                                    background: '#2E7D32', color: '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: '16px',
                                }}>{step.num}</div>
                                <h5 style={{ marginTop: '16px' }}>{step.title}</h5>
                                <p style={{ marginTop: '8px', fontSize: '14px' }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3d. WHY US (Cream) */}
            <section className="section section--cream">
                <div className="section__inner">
                    <span className="label">Why AdmitPredict</span>
                    <h3>The AdmitPredict Advantage</h3>
                    <div className="reveal-stagger visible" style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginTop: '48px',
                    }}>
                        {[
                            { title: 'Real Data', desc: 'Predictions grounded in Common Data Sets and College Scorecard data — the same stats admissions offices publish.' },
                            { title: 'Personalized Recs', desc: 'Get specific, actionable recommendations tailored to your profile — not generic advice.' },
                            { title: 'Powered by AI', desc: 'Meta Llama reasons through your profile the way an expert advisor would, but instantly.' },
                        ].map((f, i) => (
                            <div key={i}>
                                <h5>{f.title}</h5>
                                <p style={{ marginTop: '8px', fontSize: '14px' }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3e. CTA (White) */}
            <section className="section section--white" style={{ textAlign: 'center' }}>
                <div className="section__inner reveal visible">
                    <h3>Ready to see where you stand?</h3>
                    <p style={{ maxWidth: '480px', margin: '12px auto 0' }}>
                        Build your profile in under 2 minutes and get your personalized admissions prediction.
                    </p>
                    <button className="btn-primary" style={{ marginTop: '28px' }} onClick={() => setPage('profile')}>
                        GET STARTED →
                    </button>
                </div>
            </section>
        </>
    );
}
