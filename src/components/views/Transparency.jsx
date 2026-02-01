import React, { useState } from 'react';

const AccordionItem = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div style={{ borderBottom: '1px solid #D4C4A8' }}>
            <button onClick={() => setIsOpen(!isOpen)} style={{
                width: '100%', textAlign: 'left', padding: '24px 0', background: 'none', border: 'none',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'
            }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '18px', fontWeight: 600, color: '#2C2220' }}>{q}</span>
                <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
            </button>
            {isOpen && <p style={{ paddingBottom: '24px', color: '#4A4A4A' }}>{a}</p>}
        </div>
    );
};

export default function Transparency() {
    return (
        <>
            <section className="section section--white">
                <div className="section__inner" style={{ maxWidth: '720px', textAlign: 'center' }}>
                    <span className="label">Transparency Report</span>
                    <h2>How AdmitPredict AI Works</h2>
                    <p style={{ marginTop: '24px', fontSize: '18px' }}>
                        We believe in radical transparency. Here is exactly how our model works, the data we use, and what we do with your information.
                    </p>
                </div>
            </section>

            <section className="section section--cream">
                <div className="section__inner" style={{ maxWidth: '720px' }}>
                    <span className="label">The Intelligence</span>
                    <h3>Powered by Meta Llama</h3>
                    <p style={{ marginTop: '16px' }}>
                        AdmitPredict AI utilizes Meta Llama 3.1 70B, a state-of-the-art open-source large language model. We do not use magic algorithms tailored to sell you services.
                        Instead, we construct a detailed prompt containing your academic profile and the public Common Data Set (CDS) statistics of your target schools.
                        The AI then acts as an expert admissions counselor, synthesizing this data to estimate probability.
                    </p>
                </div>
            </section>

            <section className="section section--white">
                <div className="section__inner" style={{ maxWidth: '720px' }}>
                    <span className="label">The Data</span>
                    <h3>Common Data Sets & Scorecard</h3>
                    <p style={{ marginTop: '16px' }}>
                        Our predictions are grounded in two primary public data sources:
                    </p>
                    <ul style={{ marginTop: '16px', listStylePosition: 'inside', color: '#4A4A4A' }}>
                        <li style={{ marginBottom: '8px' }}><strong>Common Data Sets (CDS):</strong> Annual reports published by universities detailing acceptance rates, GPA distributions, and test score percentiles.</li>
                        <li><strong>College Scorecard:</strong> Data from the U.S. Department of Education regarding graduation rates and costs.</li>
                    </ul>
                </div>
            </section>

            <section className="section section--cream">
                <div className="section__inner" style={{ maxWidth: '720px' }}>
                    <span className="label">Privacy</span>
                    <h3>Your Data Stays With You</h3>
                    <p style={{ marginTop: '16px' }}>
                        Your profile data is stored locally in your browser (LocalStorage). We do not save your profile to any central server.
                        The only data transmitted is the anonymized prompt sent to our AI provider (Groq) to generate the prediction, which is not used for model training.
                    </p>
                </div>
            </section>

            <section className="section section--white">
                <div className="section__inner" style={{ maxWidth: '720px' }}>
                    <span className="label">FAQ</span>
                    <h3>Frequently Asked Questions</h3>
                    <div style={{ marginTop: '32px' }}>
                        <AccordionItem q="Is this accurate?" a="It is a statistical estimate based on historical data. Holistic admissions processes involve essays and recommendations which we cannot fully grade, but our recommendations provide guidance on those qualitative aspects." />
                        <AccordionItem q="Is it free?" a="Yes, AdmitPredict AI is currently in free public beta." />
                        <AccordionItem q="Can I save my results?" a="Your results are automatically saved to your browser so you can return to your dashboard anytime." />
                    </div>
                </div>
            </section>
        </>
    );
}
