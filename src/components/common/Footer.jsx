import React from 'react';

export default function Footer({ setPage }) {
    return (
        <footer style={{
            background: '#3B2F2F',
            color: '#FFFFFF',
            padding: '64px 24px 32px',
        }}>
            <div style={{ maxWidth: '1080px', margin: '0 auto' }}>

                {/* Logo */}
                <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700, fontSize: '20px', color: '#FFFFFF',
                }}>AdmitPredict AI</div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '8px', fontFamily: "'Inter',sans-serif" }}>
                    Need help? Contact us at info@admitpredict.com
                </p>

                {/* Two-column links */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '40px', maxWidth: '400px' }}>
                    <div>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: "'Inter',sans-serif", marginBottom: '14px' }}>Navigation</p>
                        {['Home', 'Profile', 'Dashboard', 'How It Works'].map(l => (
                            <p key={l} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter',sans-serif", marginBottom: '10px', cursor: 'pointer' }}
                                onClick={() => setPage(l.toLowerCase().replace(/\s+/g, ''))}>{l}</p>
                        ))}
                    </div>
                    <div>
                        <p style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: "'Inter',sans-serif", marginBottom: '14px' }}>About</p>
                        {['Transparency', 'How It Works'].map(l => (
                            <p key={l} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter',sans-serif", marginBottom: '10px', cursor: 'pointer' }}
                                onClick={() => setPage('transparency')}>{l}</p>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', margin: '40px 0 28px' }} />

                {/* Newsletter */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                    <div>
                        <p style={{ fontFamily: "'Playfair Display',serif", fontWeight: 600, fontSize: '18px', color: '#FFFFFF' }}>
                            Stay ahead of admissions season.
                        </p>
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: "'Inter',sans-serif", marginTop: '6px' }}>
                            Subscribe for the latest tips and updates.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', maxWidth: '420px' }}>
                            <input placeholder="Your email" style={{
                                flex: 1, padding: '11px 16px', borderRadius: '6px',
                                border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)',
                                color: '#fff', fontFamily: "'Inter',sans-serif", fontSize: '14px', outline: 'none',
                            }} />
                            <button className="btn-primary" style={{ padding: '11px 22px' }}>SIGN UP</button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', margin: '36px 0 20px' }} />

                {/* Disclaimer */}
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter',sans-serif", lineHeight: 1.6 }}>
                    AdmitPredict AI is not affiliated with any university, college, or admissions office. Predictions are estimates based on publicly available data and should be used as a planning guide only.<br />
                    AdmitPredict AI · 2026
                </p>
            </div>
        </footer>
    );
}
