import React from 'react';

export default function Footer({ setPage }) {
    return (
        <footer className="bg-[#3B2F2F] text-white py-16 px-6">
            <div className="max-w-[1080px] mx-auto">

                {/* Top Section: Logo & Links */}
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
                    
                    {/* Brand */}
                    <div className="max-w-xs">
                        <div className="font-serif font-bold text-2xl text-white mb-4">AdmitPredict AI</div>
                        <p className="text-[14px] text-white/60 font-sans leading-relaxed">
                            Democratizing college admissions with transparency and data-driven intelligence.
                        </p>
                        <p className="text-[13px] text-white/40 mt-6 font-sans">
                            Need help? <a href="mailto:info@admitpredict.com" className="hover:text-white transition-colors">info@admitpredict.com</a>
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 gap-x-20 gap-y-8">
                        <div>
                            <p className="text-xs font-bold text-white/30 uppercase tracking-[0.15em] font-sans mb-6">Platform</p>
                            <ul className="space-y-4">
                                <li>
                                    <button onClick={() => setPage('home')} className="text-[14px] text-white/70 font-sans hover:text-white transition-colors">
                                        Home
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setPage('profile')} className="text-[14px] text-white/70 font-sans hover:text-white transition-colors">
                                        Profile Builder
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setPage('dashboard')} className="text-[14px] text-white/70 font-sans hover:text-white transition-colors">
                                        Dashboard
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-white/30 uppercase tracking-[0.15em] font-sans mb-6">About</p>
                            <ul className="space-y-4">
                                <li>
                                    <button onClick={() => setPage('transparency')} className="text-[14px] text-white/70 font-sans hover:text-white transition-colors">
                                        Transparency
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => setPage('mission')} className="text-[14px] text-white/70 font-sans hover:text-white transition-colors">
                                        Our Mission
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 mb-12" />

                {/* Newsletter Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                    <div>
                        <p className="font-serif font-semibold text-xl text-white mb-2">
                            Stay ahead of admissions season.
                        </p>
                        <p className="text-[14px] text-white/50 font-sans">
                            Subscribe for the latest tips, data updates, and feature releases.
                        </p>
                    </div>
                    
                    <div className="flex w-full md:w-auto gap-3">
                        <input 
                            placeholder="Your email address" 
                            className="flex-1 md:w-64 py-3 px-4 rounded-lg border border-white/10 bg-white/5 text-white font-sans text-sm outline-none focus:border-white/30 placeholder:text-white/20 transition-all"
                        />
                        <button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors shadow-lg">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Bottom: Disclaimer & Copyright */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                    <p className="text-[11px] text-white/30 font-sans leading-relaxed max-w-xl">
                        AdmitPredict AI is not affiliated with any university, college, or admissions office. Predictions are statistical estimates based on publicly available Common Data Set (CDS) records and should be used as a planning guide only.
                    </p>
                    <p className="text-[11px] text-white/30 font-sans whitespace-nowrap">
                        © 2026 AdmitPredict AI
                    </p>
                </div>

            </div>
        </footer>
    );
}
