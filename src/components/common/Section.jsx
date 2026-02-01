import React from 'react';

// Enforces the "Alternating Section" pattern
export default function Section({ variant = 'white', className = '', children, id }) {
    const bgClass = variant === 'cream' ? 'bg-[var(--bg-cream)]' : 'bg-[var(--bg-white)]';

    return (
        <section id={id} className={`section-padding ${bgClass} ${className}`}>
            <div className="container">
                {children}
            </div>
        </section>
    );
}
