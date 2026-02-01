import React, { useState } from 'react';
import { User, Book, Trophy, Target, Check, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { storage } from '../../lib/storage';
import colleges from '../../data/colleges.json';

const STEPS = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Academics', icon: Book },
    { id: 3, title: 'Extracurriculars', icon: Trophy },
    { id: 4, title: 'Goals', icon: Target },
];

const MAJORS = [
    'Undeclared', 'Computer Science', 'Engineering', 'Business / Economics',
    'Biology / Health Sciences', 'Psychology', 'English / Humanities',
    'Visual & Performing Arts', 'Political Science', 'Mathematics'
];

export default function ProfileBuilder({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', grade: '11', state: '', major: 'Undeclared',
        gpaWeighted: '', gpaUnweighted: '', rank: '', sat: '', act: '',
        apCourses: [], apExamsPassed: 0,
        activities: [], leadership: 'No', sports: 'No', volunteerHours: 0,
        research: 'No', awards: [],
        targetColleges: [], dreamColleges: [], budget: '', geoPreference: 'Any'
    });

    const [error, setError] = useState('');

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError(''); // Clear error on change
    };

    const handleMultiSelect = (field, value) => {
        // Basic toggle for string arrays or IDs
        setFormData(prev => {
            const list = prev[field] || [];
            if (list.includes(value)) {
                return { ...prev, [field]: list.filter(item => item !== value) };
            } else {
                return { ...prev, [field]: [...list, value] };
            }
        });
    };

    const validateStep = (step) => {
        if (step === 1) {
            if (!formData.firstName || !formData.lastName || !formData.state) return "Please fill in all required fields.";
        }
        if (step === 2) {
            if (!formData.gpaUnweighted) return "Unweighted GPA is required.";
            const gpa = parseFloat(formData.gpaUnweighted);
            if (gpa < 0 || gpa > 4.0) return "Unweighted GPA must be between 0.0 and 4.0.";
            if (formData.gpaWeighted) {
                if (parseFloat(formData.gpaWeighted) > 5.0) return "Weighted GPA seems too high (max 5.0 typically).";
            }
        }
        if (step === 4) {
            if (formData.targetColleges.length === 0) return "Please select at least one target college.";
        }
        return null;
    };

    const nextStep = () => {
        const err = validateStep(currentStep);
        if (err) {
            setError(err);
            return;
        }
        if (currentStep < 4) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = () => {
        const err = validateStep(currentStep);
        if (err) {
            setError(err);
            return;
        }
        // Save
        storage.saveProfile(formData);
        // Trigger callback
        onComplete();
    };

    // Render Helpers
    const renderInput = (label, field, type = 'text', placeholder = '', required = false) => (
        <div className="flex flex-col gap-1 mb-4 text-left">
            <label className="text-sm font-medium text-[var(--color-forest-green)]">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={placeholder}
                className="px-4 py-2 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent-green)] focus:border-transparent outline-none transition-all"
            />
        </div>
    );

    const renderSelect = (label, field, options) => (
        <div className="flex flex-col gap-1 mb-4 text-left">
            <label className="text-sm font-medium text-[var(--color-forest-green)]">{label}</label>
            <select
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="px-4 py-2 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-accent-green)] outline-none bg-white"
            >
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="container py-12 animate-slide-up flex flex-col items-center">
            <h1 className="text-3xl md:text-4xl mb-8">Build Your Profile</h1>

            {/* Stepper */}
            <div className="flex items-center justify-center w-full max-w-3xl mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[var(--color-border)] -z-10 rounded"></div>
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-[var(--color-primary-green)] -z-10 rounded transition-all duration-500"
                    style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
                ></div>

                {STEPS.map((step) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;
                    return (
                        <div key={step.id} className="flex-1 flex flex-col items-center relative">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-[var(--color-primary-green)] text-white scale-110 shadow-lg' :
                                    isCompleted ? 'bg-[var(--color-sage)] text-[var(--color-forest-green)]' : 'bg-[var(--color-cream)] text-[var(--color-text-muted)]'
                                    }`}
                            >
                                {isCompleted ? <Check size={20} /> : <step.icon size={20} />}
                            </div>
                            <span className={`mt-2 text-xs font-medium uppercase tracking-wider ${isActive ? 'text-[var(--color-primary-green)]' : 'text-[var(--color-text-muted)]'}`}>
                                {step.title}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Form Card */}
            <div className="w-full max-w-2xl card p-8 md:p-10 relative">
                {error && (
                    <div className="mb-6 bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                        <span>⚠️</span> {error}
                    </div>
                )}

                {/* Step 1: Personal */}
                {currentStep === 1 && (
                    <div className="animate-fade-in">
                        <div className="grid md:grid-cols-2 gap-4">
                            {renderInput('First Name', 'firstName', 'text', 'Jane', true)}
                            {renderInput('Last Name', 'lastName', 'text', 'Doe', true)}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {renderSelect('Current Grade', 'grade', ['9', '10', '11', '12'])}
                            {renderSelect('State of Residence', 'state', ['', 'CA', 'NY', 'TX', 'others...'])} {/* Simplified for prompt */}
                        </div>
                        {renderSelect('Intended Major', 'major', MAJORS)}
                    </div>
                )}

                {/* Step 2: Academics */}
                {currentStep === 2 && (
                    <div className="animate-fade-in">
                        <div className="grid md:grid-cols-2 gap-4">
                            {renderInput('Unweighted GPA (0-4.0)', 'gpaUnweighted', 'number', '3.8', true)}
                            {renderInput('Weighted GPA (Opt)', 'gpaWeighted', 'number', '4.2')}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {renderInput('SAT Score', 'sat', 'number', '1450')}
                            {renderInput('ACT Score', 'act', 'number', '32')}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {renderInput('AP Exams Passed (3+)', 'apExamsPassed', 'number', '3')}
                            {renderSelect('Class Rank', 'rank', ['Top 10%', 'Top 25%', 'Top 50%', 'Other'])}
                        </div>
                        {renderInput('AP/IB Courses Taken (comma separated)', 'apCourses', 'text', 'AP Bio, AP Calc BC, APush')}
                    </div>
                )}

                {/* Step 3: Extracurriculars */}
                {currentStep === 3 && (
                    <div className="animate-fade-in">
                        {renderInput('Clubs / Organizations', 'activities', 'text', 'Debate Club, Robotics')}
                        <div className="grid md:grid-cols-2 gap-4">
                            {renderSelect('Leadership Roles?', 'leadership', ['Yes', 'No'])}
                            {renderSelect('Varsity Sports?', 'sports', ['Yes', 'No'])}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {renderInput('Volunteer Hours', 'volunteerHours', 'number', '50')}
                            {renderSelect('Research Experience?', 'research', ['Yes', 'No'])}
                        </div>
                        {renderInput('Awards / Honors', 'awards', 'text', 'National Merit, Dean\'s List')}
                    </div>
                )}

                {/* Step 4: Goals */}
                {currentStep === 4 && (
                    <div className="animate-fade-in">
                        <label className="block text-sm font-medium text-[var(--color-forest-green)] mb-2">Target Colleges (Select)</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6 max-h-60 overflow-y-auto border p-2 rounded-lg">
                            {colleges.map(c => (
                                <button
                                    key={c.id}
                                    onClick={() => handleMultiSelect('targetColleges', c.id)}
                                    className={`text-xs p-2 rounded border transition-colors ${formData.targetColleges.includes(c.id)
                                        ? 'bg-[var(--color-primary-green)] text-white border-[var(--color-primary-green)]'
                                        : 'bg-gray-50 text-[var(--color-text-dark)] border-gray-200 hover:bg-gray-100'
                                        }`}
                                >
                                    {c.name}
                                </button>
                            ))}
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {renderSelect('Budget Range', 'budget', ['Any', '< $20k/yr', '< $40k/yr', '< $60k/yr'])}
                            {renderSelect('Geo Preference', 'geoPreference', ['Any', 'East Coast', 'West Coast', 'Midwest', 'South'])}
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-[var(--color-cream)]">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`btn text-[var(--color-text-muted)] hover:text-[var(--color-text-dark)] ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                        <ChevronLeft size={18} className="mr-1" /> Back
                    </button>

                    {currentStep < 4 ? (
                        <button onClick={nextStep} className="btn btn-primary">
                            Next <ChevronRight size={18} className="ml-1" />
                        </button>
                    ) : (
                        <button onClick={handleSubmit} className="btn btn-primary bg-[var(--color-accent-green)]">
                            Analyze Profile <Sparkles size={18} className="ml-2" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

