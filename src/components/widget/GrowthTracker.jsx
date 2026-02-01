import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { storage } from '../../lib/storage';
import { Check } from 'lucide-react';

const GrowthTracker = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const data = storage.getHistory().map(entry => ({
            ...entry,
            formattedDate: new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }));
        setHistory(data);
    }, []);

    // If no history, we can show a placeholder or just return null
    if (history.length < 1) return null;

    // Dummy Completed Actions for the demo
    const completedActions = [
        { title: 'Joined debate club', date: 'Jan 15, 2026' },
        { title: 'Retook SAT', date: 'Jan 22, 2026' }
    ];

    return (
        <section className="bg-[#F5F0E8] py-20 px-6">
            <div className="max-w-[1080px] mx-auto">
                <span className="label">Your Progress</span>
                <h3 className="font-serif font-bold text-3xl text-[#2C2220] mb-8">Track Your Growth Over Time</h3>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Chart Column */}
                    <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-[#D4C4A8]/30 h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={history} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#2E7D32" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F5F0E8" />
                                <XAxis 
                                    dataKey="formattedDate" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#8B7355', fontSize: 12 }} 
                                    dy={10}
                                />
                                <YAxis 
                                    domain={[0, 100]} 
                                    hide={true} 
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    cursor={{ stroke: '#2E7D32', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke="#2E7D32" 
                                    strokeWidth={3}
                                    fill="url(#colorScore)" 
                                    dot={{ fill: '#FFFFFF', stroke: '#2E7D32', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, fill: '#2E7D32', stroke: '#fff', strokeWidth: 2 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Actions Column */}
                    <div>
                        <h5 className="font-serif font-semibold text-lg text-[#2C2220] mb-4">Recent Milestones</h5>
                        <div className="space-y-4">
                            {completedActions.map((action, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check size={12} className="text-[#2E7D32]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#2C2220]">{action.title}</p>
                                        <p className="text-xs text-[#8B7355] mt-0.5">{action.date}</p>
                                    </div>
                                </div>
                            ))}
                             {history.length > 0 && (
                                <div className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-[#E8F5E9] flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check size={12} className="text-[#2E7D32]" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#2C2220]">Initial Assessment</p>
                                        <p className="text-xs text-[#8B7355] mt-0.5">{new Date(history[0].timestamp).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GrowthTracker;
