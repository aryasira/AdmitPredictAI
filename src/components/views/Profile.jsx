import React, { useState } from 'react';
import { generatePredictions } from '../../lib/api';

const COLLEGES_DATA = [
    { name: "Harvard University", acceptanceRate: 0.034, gpaRange: ["3.9", "4.0"], satRange: ["1470", "1570"], state: "MA", type: "Private" },
    { name: "UCLA", acceptanceRate: 0.09, gpaRange: ["3.9", "4.0"], satRange: ["1300", "1500"], state: "CA", type: "Public" },
    { name: "University of Michigan", acceptanceRate: 0.18, gpaRange: ["3.8", "4.0"], satRange: ["1350", "1530"], state: "MI", type: "Public" },
    { name: "Boston University", acceptanceRate: 0.14, gpaRange: ["3.7", "3.9"], satRange: ["1370", "1480"], state: "MA", type: "Private" }
];

export default function Profile({ onComplete, setPage }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const steps = ["Personal", "Academics", "Activities", "Review"];

    const [formData, setFormData] = useState({
        firstName: '', lastName: '', grade: '11',
        gpaUnweighted: '', sat: '', activities: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAnalyze = async () => {
        setLoading(true);
        // Simulate submit
        const results = await generatePredictions(formData, COLLEGES_DATA);
        onComplete(results, formData); // Pass data up to App, which sets page to Dashboard
    };

    return (
        <section className="section section--white" style={{ minHeight: '80vh' }}>
            <div className="section__inner" style={{ maxWidth: '680px' }}>

                {/* Stepper */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '48px', gap: '0' }}>
                    {steps.map((stepName, i) => (
                        <React.Fragment key={i}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{
                                    width: '36px', height: '36px', borderRadius: '50%',
                                    background: i < currentStep ? '#2E7D32' : i === currentStep ? '#2E7D32' : '#D4C4A8',
                                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: '14px',
                                    transition: 'background 0.3s',
                                }}>
                                    {i < currentStep ? '✓' : i + 1}
                                </div>
                                <span style={{ fontSize: '11px', color: i <= currentStep ? '#2C2220' : '#7A7A7A', fontFamily: "'Inter',sans-serif", marginTop: '8px', fontWeight: 500 }}>
                                    {stepName}
                                </span>
                            </div>
                            {i < steps.length - 1 && (
                                <div style={{
                                    width: '60px', height: '2px', marginBottom: '22px',
                                    background: i < currentStep ? '#2E7D32' : '#D4C4A8',
                                    transition: 'background 0.3s',
                                }} />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Form Content */}
                <div className="card">
                    {currentStep === 0 && (
                        <div style={{ display: 'grid', gap: '20px' }}>
                            <h3>Tell us about yourself</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <label>First Name</label>
                                    <input className="input" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                                </div>
                                <div>
                                    <label>Last Name</label>
                                    <input className="input" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                                </div>
                            </div>
                            <div>
                                <label>Current Grade</label>
                                <select className="input" name="grade" value={formData.grade} onChange={handleChange}>
                                    <option value="9">9th Grade</option>
                                    <option value="10">10th Grade</option>
                                    <option value="11">11th Grade</option>
                                    <option value="12">12th Grade</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div style={{ display: 'grid', gap: '20px' }}>
                            <h3>Academic Profile</h3>
                            <div>
                                <label>Unweighted GPA (0.0 - 4.0)</label>
                                <input className="input" name="gpaUnweighted" value={formData.gpaUnweighted} onChange={handleChange} placeholder="3.8" />
                            </div>
                            <div>
                                <label>SAT Score (400 - 1600)</label>
                                <input className="input" name="sat" value={formData.sat} onChange={handleChange} placeholder="1450" />
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div style={{ display: 'grid', gap: '20px' }}>
                            <h3>Extracurriculars</h3>
                            <div>
                                <label>Key Activities & Leadership</label>
                                <textarea className="input" rows="5" name="activities" value={formData.activities} onChange={handleChange} placeholder="List your top clubs, sports, roles..." />
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div style={{ textAlign: 'center', padding: '40px 0' }}>
                            <h3>Ready to Predict?</h3>
                            <p style={{ marginTop: '16px' }}>We will analyze your profile against Harvard, UCLA, Michigan, and BU data.</p>
                            {loading && <p style={{ color: '#2E7D32', marginTop: '20px', fontWeight: 600 }}>Analyzing Profile... Please wait...</p>}
                        </div>
                    )}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
                    {currentStep > 0 && <button className="btn-ghost" onClick={() => setCurrentStep(s => s - 1)}>← Back</button>}
                    <div style={{ marginLeft: 'auto' }}>
                        {currentStep < 3
                            ? <button className="btn-primary" onClick={() => setCurrentStep(s => s + 1)}>Next →</button>
                            : <button className="btn-primary" disabled={loading} onClick={handleAnalyze}>Analyze My Profile →</button>
                        }
                    </div>
                </div>

            </div>
        </section>
    );
}
