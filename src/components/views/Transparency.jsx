import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AccordionItem = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-[#D4C4A8]">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="w-full text-left py-6 bg-transparent border-none flex justify-between items-center cursor-pointer group"
            >
                <span className="font-serif text-lg font-bold text-[#2C2220] group-hover:text-[#2E7D32] transition-colors">
                    {q}
                </span>
                {isOpen ? <ChevronUp className="text-[#8B7355]" /> : <ChevronDown className="text-[#8B7355]" />}
            </button>
            {isOpen && (
                <div className="pb-6 text-gray-600 leading-relaxed animate-fade-in">
                    {a}
                </div>
            )}
        </div>
    );
};

export default function Transparency() {
    return (
        <div className="animate-slide-up">
            {/* Hero Section */}
            <section className="section section--white">
                <div className="section__inner max-w-[720px] mx-auto text-center">
                    <span className="label">Transparency Report</span>
                    <h2 className="text-4xl font-serif font-bold text-[#2C2220] mb-6">How AdmitPredict AI Works</h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        We believe in radical transparency. Here is exactly how our model works, the data we use, and what we do with your information.
                    </p>
                </div>
            </section>

            {/* The Intelligence (Cream) */}
            <section className="section section--cream">
                <div className="section__inner max-w-[720px] mx-auto">
                    <span className="label">The Intelligence</span>
                    <h3 className="text-3xl font-serif font-bold text-[#2C2220] mb-6">Powered by Meta Llama 3.1</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        AdmitPredict AI utilizes Meta Llama 3.1 70B, a state-of-the-art open-source large language model. We do not use "magic algorithms" or black boxes tailored to sell you expensive consulting services.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Instead, we construct a detailed, anonymized prompt containing your academic profile and the public Common Data Set (CDS) statistics of your target schools. The AI then acts as an expert admissions counselor, synthesizing this data to estimate your probability of acceptance based on historical trends.
                    </p>
                </div>
            </section>

            {/* The Data (White) */}
            <section className="section section--white">
                <div className="section__inner max-w-[720px] mx-auto">
                    <span className="label">The Data</span>
                    <h3 className="text-3xl font-serif font-bold text-[#2C2220] mb-6">Common Data Sets & Scorecard</h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                        Our predictions are grounded in two primary public data sources:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 text-gray-700">
                        <li>
                            <strong className="text-[#2C2220]">Common Data Sets (CDS):</strong> Annual reports published by universities detailing acceptance rates, GPA distributions (25th-75th percentile), and test score ranges.
                        </li>
                        <li>
                            <strong className="text-[#2C2220]">College Scorecard:</strong> Data from the U.S. Department of Education regarding graduation rates, costs, and earnings.
                        </li>
                    </ul>
                </div>
            </section>

            {/* Privacy (Cream) */}
            <section className="section section--cream">
                <div className="section__inner max-w-[720px] mx-auto">
                    <span className="label">Privacy</span>
                    <h3 className="text-3xl font-serif font-bold text-[#2C2220] mb-6">Your Data Stays With You</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Your profile data is stored locally in your browser (LocalStorage). We do not save your profile to any central server or database. 
                        The only data transmitted is the anonymized prompt sent to our AI provider (Groq) to generate the prediction, which is not used for model training.
                    </p>
                </div>
            </section>

            {/* FAQ (White) */}
            <section className="section section--white">
                <div className="section__inner max-w-[720px] mx-auto">
                    <span className="label">FAQ</span>
                    <h3 className="text-3xl font-serif font-bold text-[#2C2220] mb-8">Frequently Asked Questions</h3>
                    <div className="mt-8">
                        <AccordionItem 
                            q="Is this accurate?" 
                            a="It is a statistical estimate based on historical data. Holistic admissions processes involve essays, recommendations, and interviews which we cannot fully grade. However, our predictions provide a realistic baseline based on your hard stats compared to the school's admitted student profile." 
                        />
                        <AccordionItem 
                            q="Is it free?" 
                            a="Yes, AdmitPredict AI is currently in free public beta. We want to democratize access to high-quality college admissions guidance." 
                        />
                        <AccordionItem 
                            q="Can I save my results?" 
                            a="Your results are automatically saved to your browser's local storage. You can return to your dashboard anytime on this device to see your saved predictions and track your growth." 
                        />
                        <AccordionItem 
                            q="Why do you need my API key?" 
                            a="Currently, we are a client-side application. To keep costs zero for us and free for you, you can use your own Groq API key (which has a generous free tier) to power the intelligence." 
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}