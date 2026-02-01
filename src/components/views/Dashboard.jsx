import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, User, ChevronRight, AlertCircle, RefreshCw } from 'lucide-react';
import GrowthTracker from '../widget/GrowthTracker';
import colleges from '../../data/colleges.json';
import { storage } from '../../lib/storage';

// Skeleton Component
const SkeletonLoader = () => (
    <div className="animate-fade-in">
        {/* Score Skeleton */}
        <section className="section section--white">
            <div className="section__inner">
                <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="h-10 w-64 bg-gray-200 rounded mb-8 animate-pulse"></div>
                
                <div className="flex gap-8 items-center max-w-2xl">
                    <div className="w-[120px] h-[120px] rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>
                    <div className="flex-1">
                        <div className="h-4 w-full bg-gray-200 rounded mb-3 animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded mb-3 animate-pulse"></div>
                        <div className="h-6 w-24 bg-gray-200 rounded mt-4 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </section>

        {/* College Cards Skeleton */}
        <section className="section section--cream">
            <div className="section__inner">
                <div className="h-6 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="h-10 w-64 bg-gray-200 rounded mb-8 animate-pulse"></div>
                
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skeleton-shimmer"></div>
                            <div className="flex justify-between mb-4">
                                <div className="h-6 w-48 bg-gray-200 rounded"></div>
                                <div className="h-6 w-20 bg-gray-200 rounded"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="h-12 bg-gray-200 rounded"></div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 w-full bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        <style>{`
            .skeleton-shimmer {
                animation: shimmer 1.5s infinite;
                transform: skewX(-20deg);
            }
            @keyframes shimmer {
                0% { transform: translateX(-150%) skewX(-20deg); }
                100% { transform: translateX(150%) skewX(-20deg); }
            }
        `}</style>
    </div>
);

// Error Component
const ErrorCard = ({ message, onRetry }) => (
    <div className="container py-20 text-center animate-fade-in">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl border-2 border-red-100">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#2C2220] mb-4">Analysis Failed</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
                {message || "We couldn't generate your predictions at this time. This might be due to a connection issue or high traffic."}
            </p>
            <button 
                onClick={onRetry}
                className="inline-flex items-center justify-center bg-[#2E7D32] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1B5E20] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
                <RefreshCw size={20} className="mr-2" /> Retry Analysis
            </button>
        </div>
    </div>
);

// Animated Score Ring
const ScoreRing = ({ score }) => {
    const [displayScore, setDisplayScore] = useState(0);
    const radius = 48;
    const circumference = 2 * Math.PI * radius;
    
    useEffect(() => {
        let start = 0;
        const duration = 1200;
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = score / steps;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= score) {
                setDisplayScore(score);
                clearInterval(timer);
            } else {
                setDisplayScore(Math.floor(start));
            }
        }, stepTime);
        
        return () => clearInterval(timer);
    }, [score]);

    let color = '#EF4444'; // Red < 40
    if (score >= 80) color = '#2E7D32'; // Green
    else if (score >= 60) color = '#66BB6A'; // Light Green
    else if (score >= 40) color = '#F59E0B'; // Amber

    return (
        <svg width="120" height="120" viewBox="0 0 120 120" className="flex-shrink-0">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="#E8F5E9" strokeWidth="10" />
            <circle 
                cx="60" cy="60" r={radius} 
                fill="none" 
                stroke={color} 
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - displayScore / 100)}
                strokeLinecap="round" 
                transform="rotate(-90 60 60)"
                style={{ transition: 'stroke-dashoffset 0.1s linear' }} 
            />
            <text x="60" y="66" textAnchor="middle" fontFamily="'Inter',sans-serif" fontWeight="700" fontSize="26" fill="#2C2220">
                {displayScore}
            </text>
        </svg>
    );
};

// College Card Component
const CollegeCard = ({ prediction, profile, college }) => {
    const [expanded, setExpanded] = useState(false);

    // Categories styling
    const getCategoryStyle = (cat) => {
        const lower = cat.toLowerCase();
        if (lower.includes('long reach')) return { bg: '#FEE2E2', text: '#991B1B' };
        if (lower.includes('reach')) return { bg: '#FEF3C7', text: '#92400E' };
        if (lower.includes('possible') || lower.includes('target')) return { bg: '#FEF3C7', text: '#92400E' };
        if (lower.includes('likely') || lower.includes('safety')) return { bg: '#E8F5E9', text: '#2E7D32' };
        if (lower.includes('strong')) return { bg: '#E8F5E9', text: '#2E7D32' };
        return { bg: '#F3F4F6', text: '#4B5563' };
    };

    const catStyle = getCategoryStyle(prediction.category);

    // Helpers for bars
    const renderBar = (label, userVal, range) => {
        if (!range || range.length < 2) return null;
        
        let min = range[0];
        let max = range[1];
        
        // Safety check
        if (!min || !max) return null;

        // Parse if strings
        if (typeof min === 'string') min = parseFloat(min);
        if (typeof max === 'string') max = parseFloat(max);
        if (typeof userVal === 'string') userVal = parseFloat(userVal);

        // Define Plot Scale based on Type
        let plotMin, plotMax;
        
        if (label === 'SAT') {
            plotMin = 400; // SAT Floor
            plotMax = 1600; // SAT Ceiling
        } else if (label === 'ACT') {
            plotMin = 10;
            plotMax = 36;
        } else if (label === 'GPA') {
            plotMin = 2.0;
            plotMax = 4.0; // Standard unweighted max
            // Adjust if values exceed standard max (e.g. weighted)
            if (max > 4.0 || userVal > 4.0) plotMax = 5.0; 
            if (max > 5.0 || userVal > 5.0) plotMax = 6.0;
        } else {
            // Fallback for unknown types
            const spread = max - min;
            plotMin = min - spread;
            plotMax = max + spread;
        }

        const plotRange = plotMax - plotMin;
        const getPos = (val) => Math.max(0, Math.min(100, ((val - plotMin) / plotRange) * 100));

        const rangeStart = getPos(min);
        const rangeWidth = getPos(max) - rangeStart;
        const userPos = getPos(userVal);

        // Determine color based on where user falls relative to range
        let barColor = '#F59E0B'; // Yellow (in range)
        if (userVal > max) barColor = '#2E7D32'; // Green (above)
        if (userVal < min) barColor = '#EF4444'; // Red (below)

        return (
            <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1 font-medium">
                    <span>Your {label}: {userVal}</span>
                    <span>Median: {min.toFixed(2)} - {max.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full relative overflow-hidden">
                    {/* Median Range Zone */}
                    <div 
                        className="absolute top-0 h-full bg-[#E8F5E9] opacity-100"
                        style={{ left: `${rangeStart}%`, width: `${rangeWidth}%` }}
                    ></div>
                    {/* User Marker */}
                    <div 
                        className="absolute top-0 h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                            left: 0, 
                            width: `${userPos}%`, 
                            backgroundColor: barColor 
                        }}
                    ></div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#F3F4F6] hover:shadow-md transition-shadow mb-4">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="text-lg font-serif font-bold text-[#2C2220]">{college.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{college.state} · {college.type}</p>
                </div>
                <span 
                    className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                    style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
                >
                    {prediction.category}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <span className="text-xs text-gray-500 block mb-1">Acceptance Rate</span>
                    <p className="text-lg font-bold text-[#2C2220]">{(college.acceptanceRate * 100).toFixed(1)}%</p>
                </div>
                <div>
                    <span className="text-xs text-gray-500 block mb-1">Your Predicted Chance</span>
                    <p className={`text-lg font-bold ${prediction.predictedChance >= 50 ? 'text-[#2E7D32]' : prediction.predictedChance >= 20 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`}>
                        {prediction.predictedChance}%
                    </p>
                </div>
            </div>

            <div className="space-y-4 mb-4">
                {renderBar('GPA', profile.gpaUnweighted, college.gpaRange || [college.gpaAverage - 0.2, college.gpaAverage + 0.2])}
                {/* Only show test score if submitted */}
                {profile.satComposite && renderBar('SAT', profile.satComposite, college.satRange || [college.satAverage - 60, college.satAverage + 60])}
                {profile.actComposite && renderBar('ACT', profile.actComposite, college.actRange || [college.actAverage - 2, college.actAverage + 2])}
            </div>

            <button 
                onClick={() => setExpanded(!expanded)} 
                className="flex items-center gap-1 text-[#2E7D32] text-sm font-medium hover:text-[#1B5E20] transition-colors"
            >
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />} 
                Why this prediction?
            </button>
            
            {expanded && (
                <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600 leading-relaxed animate-fade-in">
                    {prediction.explanation}
                </div>
            )}
        </div>
    );
};

const RecCard = ({ rec }) => {
    const [completed, setCompleted] = useState(() => {
        const completedRecs = storage.getCompletedRecs();
        return completedRecs.includes(rec.title);
    });
    
    const handleToggle = () => {
        const newState = !completed;
        setCompleted(newState);
        storage.toggleRecCompletion(rec.title);
    };
    
    let borderCol = '#7A7A7A'; // Application Strategy / Default
    const catLower = rec.category.toLowerCase();
    
    if (catLower.includes('academic')) borderCol = '#2E7D32';
    else if (catLower.includes('extra') || catLower.includes('activity')) borderCol = '#8B7355';
    else if (catLower.includes('test')) borderCol = '#F59E0B';
    
    return (
        <div 
            className="bg-white p-5 rounded-xl border border-[#F3F4F6] shadow-sm hover:shadow-md transition-all relative overflow-hidden"
            style={{ borderLeft: `4px solid ${borderCol}` }}
        >
            <div className="flex justify-between items-start mb-2">
                <h5 className={`font-semibold text-[#2C2220] ${completed ? 'line-through text-gray-400' : ''}`}>
                    {rec.title}
                </h5>
                {completed && <Check size={18} className="text-[#2E7D32]" />}
            </div>
            
            <div className="flex gap-2 mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${
                    rec.priority === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-indigo-100 text-indigo-800'
                }`}>
                    {rec.priority}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#F5F0E8] text-[#8B7355] border border-[#D4C4A8]">
                    {rec.category}
                </span>
            </div>

            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{rec.explanation}</p>
            
            <p className="text-xs text-gray-500 italic mb-4">
                Est. Impact: {rec.estimatedImpact}
            </p>

            <label className="flex items-center gap-2 cursor-pointer select-none group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    completed ? 'bg-[#2E7D32] border-[#2E7D32]' : 'border-gray-300 group-hover:border-[#2E7D32]'
                }`}>
                    {completed && <Check size={10} className="text-white" />}
                </div>
                <input 
                    type="checkbox" 
                    checked={completed} 
                    onChange={handleToggle} 
                    className="hidden" 
                />
                <span className="text-xs text-gray-500 group-hover:text-[#2C2220] transition-colors">Mark as Done</span>
            </label>
        </div>
    );
};

export default function Dashboard({ analysis, profile, loading, error, onRetry, setPage }) {
    // Access Control: If no profile, show CTA
    if (!profile) {
        return (
            <div className="container py-20 text-center">
                <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-[#F3F4F6]">
                    <div className="w-16 h-16 bg-[#F5F0E8] rounded-full flex items-center justify-center mx-auto mb-6">
                        <User size={32} className="text-[#8B7355]" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-[#2C2220] mb-4">Complete Your Profile</h2>
                    <p className="text-gray-600 mb-8">
                        To see your admissions chances and get personalized recommendations, you need to build your student profile first.
                    </p>
                    <button 
                        onClick={() => setPage('profile')} 
                        className="inline-flex items-center justify-center w-full bg-[#2E7D32] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1B5E20] transition-colors"
                    >
                        Get Started <ChevronRight size={20} className="ml-1" />
                    </button>
                </div>
            </div>
        );
    }

    if (error) {
        return <ErrorCard message={error} onRetry={onRetry} />;
    }

    if (loading || !analysis) {
        return <SkeletonLoader />;
    }

    const { 
        overallScore = 0, 
        overallSummary = "Analysis pending...", 
        predictions = [], 
        recommendations = [] 
    } = analysis || {};

    // Sort predictions
    const [sortMode, setSortMode] = useState('chance'); // chance, rate, name
    
    const sortedPredictions = [...(predictions || [])].sort((a, b) => {
        if (sortMode === 'chance') return b.predictedChance - a.predictedChance;
        if (sortMode === 'rate') {
            // Need to lookup rate again or rely on what's passed. 
            // In real app, `predictions` might not have rate, so we look up from `colleges`.
            // Here we assume we can match by name or pass ID.
            const rateA = colleges.find(c => c.name === a.college)?.acceptanceRate || 0;
            const rateB = colleges.find(c => c.name === b.college)?.acceptanceRate || 0;
            return rateA - rateB; // Low to High
        }
        if (sortMode === 'name') return a.college.localeCompare(b.college);
        return 0;
    });

    return (
        <div className="animate-slide-up">
            {/* 6a. Overall Score */}
            <section className="section section--white">
                <div className="section__inner">
                    <span className="label">Your Admissions Overview</span>
                    <h3 className="text-3xl font-serif font-bold text-[#2C2220] mb-8">Your AdmitPredict Score</h3>

                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#F3F4F6] flex flex-col md:flex-row gap-8 items-center max-w-3xl">
                        <ScoreRing score={overallScore} />
                        <div className="text-center md:text-left">
                            <p className="text-lg text-gray-700 leading-relaxed mb-4">{overallSummary}</p>
                            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                overallScore >= 75 ? 'bg-[#E8F5E9] text-[#2E7D32]' : 'bg-[#FEF3C7] text-[#92400E]'
                            }`}>
                                Overall: {overallScore >= 75 ? 'Strong Candidate' : overallScore >= 50 ? 'Competitive' : 'Developing'}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6b. Predictions (Cream) */}
            <section className="section section--cream">
                <div className="section__inner">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <div>
                            <span className="label">College Predictions</span>
                            <h3 className="text-3xl font-serif font-bold text-[#2C2220]">See Where You Stand</h3>
                        </div>
                        
                        {/* Sort Controls */}
                        <div className="flex bg-white p-1 rounded-lg shadow-sm border border-[#D4C4A8]/30">
                            {[
                                { id: 'chance', label: 'Predicted Chance' },
                                { id: 'rate', label: 'Acceptance Rate' },
                                { id: 'name', label: 'A–Z' }
                            ].map(mode => (
                                <button
                                    key={mode.id}
                                    onClick={() => setSortMode(mode.id)}
                                    className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
                                        sortMode === mode.id 
                                            ? 'bg-[#2E7D32] text-white shadow-sm' 
                                            : 'text-gray-500 hover:text-[#2C2220]'
                                    }`}
                                >
                                    {mode.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {sortedPredictions.map((pred, i) => {
                            // Find college data
                            const collegeData = colleges.find(c => c.name === pred.college) || { 
                                name: pred.college, 
                                state: 'US', 
                                type: 'College', 
                                acceptanceRate: 0.1, 
                                gpaRange: [3.0, 4.0],
                                satRange: [1000, 1600],
                                actRange: [20, 36]
                            };
                            return (
                                <CollegeCard key={i} prediction={pred} profile={profile} college={collegeData} />
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 6c. Recommendations (White) */}
            <section className="section section--white">
                <div className="section__inner">
                    <span className="label">Personalized Action Plan</span>
                    <h3 className="text-3xl font-serif font-bold text-[#2C2220] mb-8">Steps to Improve Your Odds</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recommendations.map((rec, i) => (
                            <RecCard key={i} rec={rec} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 6e. Growth Tracker (Cream) */}
            <GrowthTracker />
        </div>
    );
}