import React, { useEffect, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function Mission({ setPage }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 100);
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`min-h-screen bg-[#FDFBF7] pt-32 pb-24 px-6 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-3xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-xs font-bold text-[#8B7355] uppercase tracking-[0.2em] mb-4 block">Our Purpose</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2220] mb-6 leading-tight">
                        Democratizing Admissions Intelligence
                    </h1>
                    <p className="text-lg text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto">
                        We believe that access to elite education shouldn't be a black box. By leveraging data transparency and AI, we're leveling the playing field for students everywhere.
                    </p>
                </div>

                {/* Content Blocks */}
                <div className="space-y-12">
                    
                    <section>
                        <h2 className="text-2xl font-serif font-bold text-[#2C2220] mb-4">The Problem</h2>
                        <p className="text-[#4A4A4A] leading-relaxed mb-4">
                            For decades, college admissions has been shrouded in mystery. High-priced consultants and exclusive networks have given a select few an unfair advantage, while millions of talented students are left guessing.
                        </p>
                        <p className="text-[#4A4A4A] leading-relaxed">
                            The Common Data Set (CDS) initiative was a step forward, but the data remains fragmented, hard to find, and harder to interpret.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-[#2C2220] mb-4">Our Solution</h2>
                        <p className="text-[#4A4A4A] leading-relaxed mb-6">
                            AdmitPredict AI aggregates millions of data points from verified Common Data Sets and federal records. We don't just show you numbers; we use Meta's Llama 3.3 70B—one of the world's most advanced open-source models—to contextualize your unique profile against this data.
                        </p>
                        
                        <div className="bg-white p-6 rounded-xl border border-[#E8E4DC] shadow-sm">
                            <ul className="space-y-3">
                                {[
                                    'Real CDS data from 150+ top universities',
                                    'Unbiased, data-driven probability estimates',
                                    'Privacy-first: Your data stays on your device',
                                    'No hidden fees or premium paywalls'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span className="text-sm font-medium text-[#2C2220]">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-serif font-bold text-[#2C2220] mb-4">Our Commitment</h2>
                        <p className="text-[#4A4A4A] leading-relaxed">
                            We are committed to transparency. Our algorithms are not magic; they are math. We show you exactly why a school is a "Reach" or a "Likely" based on historical precedents. We don't guarantee admission—no one can—but we guarantee clarity.
                        </p>
                    </section>

                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <button 
                        onClick={() => setPage('profile')}
                        className="inline-flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                        Build Your Profile <ArrowRight size={18} />
                    </button>
                </div>

            </div>
        </div>
    );
}
