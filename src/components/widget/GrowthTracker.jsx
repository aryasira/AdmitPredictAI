import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { storage } from '../../lib/storage';

export default function GrowthTracker() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Load history
        const history = storage.getHistory() || [];
        // Transform
        const formatted = history.map((h, i) => ({
            id: i,
            score: h.overallScore,
            date: new Date(h.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
        }));
        setData(formatted);
    }, []);

    if (data.length < 2) {
        // Show empty state or nothing? 
        // Prompt says "chart plotting... each time they update... new data point"
        // Detailed view might look empty.
        return (
            <div className="card p-6 mt-8 opacity-70">
                <h3 className="font-bold text-xl mb-2">Growth Tracker</h3>
                <p className="text-sm text-[var(--color-text-muted)]">Update your profile multiple times to track how your admissibility score changes over time.</p>
            </div>
        );
    }

    return (
        <div className="card p-8 mt-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-2xl">Admissibility Growth</h3>
                <span className="text-sm text-[var(--color-text-muted)]">Tracking {data.length} updates</span>
            </div>

            <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-cream)" />
                        <XAxis
                            dataKey="date"
                            stroke="var(--color-text-muted)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            domain={[0, 100]}
                            stroke="var(--color-text-muted)"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: '12px',
                                border: '1px solid var(--color-recruit-cream)',
                                boxShadow: 'var(--shadow-md)',
                                fontFamily: 'var(--font-body)'
                            }}
                            cursor={{ stroke: 'var(--color-primary-green)', strokeWidth: 1 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="var(--color-primary-green)"
                            strokeWidth={3}
                            dot={{ stroke: 'var(--color-primary-green)', strokeWidth: 2, r: 4, fill: '#fff' }}
                            activeDot={{ r: 6, fill: 'var(--color-primary-green)' }}
                            animationDuration={1500}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
