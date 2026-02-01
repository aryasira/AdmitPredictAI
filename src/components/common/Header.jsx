import React from 'react';

export default function Header({ page, setPage, hasProfile }) {
    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: '#FFFFFF',
            borderBottom: '1px solid #D4C4A8',
            padding: '0 24px',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '100%',
            backdropFilter: 'blur(8px)',
        }}>
            {/* Logo — just the brand name in Playfair */}
            <span style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: '21px',
                color: '#2C2220',
                cursor: 'pointer',
            }} onClick={() => setPage('home')}>
                AdmitPredict AI
            </span>

            {/* Nav links — center */}
            <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
                {['Home', 'Profile'].map(name => (
                    <button key={name} onClick={() => setPage(name.toLowerCase())} style={{
                        background: 'none',
                        border: 'none',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '13px',
                        color: page === name.toLowerCase() ? '#2E7D32' : '#2C2220',
                        cursor: 'pointer',
                        padding: '8px 0',
                        borderBottom: page === name.toLowerCase() ? '2px solid #2E7D32' : '2px solid transparent',
                        transition: 'color 0.2s, border-color 0.2s',
                    }}>
                        {name}
                    </button>
                ))}
                
                {/* Dashboard Link - Conditional */}
                <button 
                    onClick={() => {
                        if (hasProfile) {
                            setPage('dashboard');
                        } else {
                            alert("Complete your profile first.");
                        }
                    }} 
                    style={{
                        background: 'none',
                        border: 'none',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '13px',
                        color: page === 'dashboard' ? '#2E7D32' : (hasProfile ? '#2C2220' : '#7A7A7A'),
                        cursor: hasProfile ? 'pointer' : 'not-allowed',
                        padding: '8px 0',
                        borderBottom: page === 'dashboard' ? '2px solid #2E7D32' : '2px solid transparent',
                        transition: 'color 0.2s, border-color 0.2s',
                    }}
                >
                    Dashboard
                </button>

                <button onClick={() => setPage('transparency')} style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '13px',
                    color: page === 'transparency' ? '#2E7D32' : '#2C2220',
                    cursor: 'pointer',
                    padding: '8px 0',
                    borderBottom: page === 'transparency' ? '2px solid #2E7D32' : '2px solid transparent',
                    transition: 'color 0.2s, border-color 0.2s',
                }}>
                    Transparency
                </button>
            </div>

            {/* CTA button — far right */}
            <div className="flex items-center gap-4">
                <button className="btn-primary" onClick={() => setPage('profile')}>
                    GET STARTED →
                </button>
            </div>
        </nav>
    );
}
