import React, { useEffect, useState } from 'react';

export default function Gauge({ score }) {
    const [value, setValue] = useState(0);
    const radius = 80; // Bigger
    const stroke = 10;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;

    useEffect(() => {
        // Simple count up animation logic
        let start = 0;
        const end = score;
        const duration = 1500;
        const incrementTime = 20;
        const step = Math.ceil(end / (duration / incrementTime));

        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setValue(end);
                clearInterval(timer);
            } else {
                setValue(start);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [score]);

    const strokeDashoffset = circumference - (value / 100) * circumference;

    // Color logic
    let color = 'var(--color-error)';
    if (score >= 80) color = 'var(--color-primary-green)';
    else if (score >= 60) color = 'var(--color-accent-green)';
    else if (score >= 40) color = 'var(--color-warning)';

    return (
        <div className="relative flex items-center justify-center w-48 h-48">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="transform -rotate-90"
            >
                <circle
                    stroke="var(--color-cream)"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={color}
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-out' }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <div className="absolute flex flex-col items-center animate-fade-in">
                <span className="text-5xl font-bold font-mono" style={{ color }}>
                    {value}
                </span>
                <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] mt-1">Admissibility</span>
            </div>
        </div>
    );
}
