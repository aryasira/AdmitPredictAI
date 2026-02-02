import React, { useState, useEffect } from 'react';
import { User, Book, Trophy, Target, Check, ChevronRight, ChevronLeft, Sparkles, X, Search, Plus, Trash2 } from 'lucide-react';
import { storage } from '../../lib/storage';
import colleges from '../../data/colleges.json';
import { AP_COURSES, IB_COURSES } from '../../data/apCourses';

const STEPS = [
    { id: 1, title: 'Personal', icon: User },
    { id: 2, title: 'Academics', icon: Book },
    { id: 3, title: 'Activities', icon: Trophy },
    { id: 4, title: 'Preferences', icon: Target },
];

const MAJORS = {
    'STEM': ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Engineering'],
    'Humanities': ['English', 'History', 'Philosophy', 'Political Science', 'Psychology'],
    'Business': ['Business Administration', 'Economics', 'Finance'],
    'Arts': ['Fine Arts', 'Music', 'Theatre'],
    'Health': ['Pre-Med', 'Nursing', 'Public Health'],
    'Other': ['Undeclared']
};

const GPA_SCALES = ['4.0', '5.0', '6.0', '100'];

const AP_SCORES = ['5', '4', '3', '2', '1', 'Planned', 'In Progress'];
const IB_SCORES = ['7', '6', '5', '4', '3', '2', '1', 'Planned', 'In Progress'];

// Helper Components
const Toggle = ({ value, onChange, options = ['Yes', 'No'] }) => (
    <div className="flex gap-2">
        {options.map((opt) => {
            const isSelected = value === opt;
            return (
                <button
                    key={opt}
                    onClick={() => onChange(opt)}
                    className={`px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 border ${
                        isSelected 
                            ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-md' 
                            : 'bg-[#F5F0E8] text-[#4A4A4A] border-transparent hover:bg-[#E8E4DC]'
                    }`}
                >
                    {opt}
                </button>
            );
        })}
    </div>
);

const TagInput = ({ tags, onAdd, onRemove, placeholder }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (input.trim()) {
                onAdd(input.trim());
                setInput('');
            }
        }
    };

    return (
        <div className="w-full">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full px-4 py-2.5 rounded-lg border border-[#D4C4A8] focus:ring-2 focus:ring-[#2E7D32] outline-none bg-white"
            />
            <div className="flex flex-wrap gap-2 mt-3">
                {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1.5 bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full text-sm font-medium animate-fade-in">
                        {tag}
                        <button onClick={() => onRemove(tag)} className="hover:text-red-600 transition-colors flex items-center justify-center">
                            <X size={14} />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default function ProfileBuilder({ onComplete }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        // Step 1
        firstName: '', lastName: '', grade: '', state: '', major: 'Undeclared',
        // Step 2
        gpaScale: '4.0', gpaWeighted: '', gpaUnweighted: '', rank: 'Not Ranked', 
        testType: 'SAT', satComposite: '', satMath: '', satErw: '', actComposite: '',
        apCourses: [], // Array of { course, score }
        apExamsPassed: 0, // Calculated automatically
        honorsClasses: '',
        // Step 3
        extracurriculars: [], // Tag input
        leadership: 'No', leadershipDescription: '',
        sports: 'No', sportsLevel: 'JV', sportsYears: '',
        volunteerHours: '',
        research: 'No', researchDescription: '',
        publications: 'No', publicationsDescription: '',
        awards: [], // Tag input
        workExperience: 'No', workHours: '',
        // Step 4
        targetColleges: [], dreamColleges: [],
        budget: '', geoPreference: ''
    });

    // Step 2 Local State for adding courses
    const [newCourseName, setNewCourseName] = useState('');
    const [newCourseScore, setNewCourseScore] = useState('');

    // Step 4 Local State
    const [collegeSearch, setCollegeSearch] = useState('');

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Calculate AP Exams Passed automatically whenever apCourses changes
    useEffect(() => {
        const passedCount = formData.apCourses.filter(c => {
            const score = parseInt(c.score);
            return !isNaN(score) && score >= 3;
        }).length;
        setFormData(prev => ({ ...prev, apExamsPassed: passedCount }));
    }, [formData.apCourses]);

    const addApCourse = () => {
        if (newCourseName && newCourseScore) {
            setFormData(prev => ({
                ...prev,
                apCourses: [...prev.apCourses, { course: newCourseName, score: newCourseScore }]
            }));
            setNewCourseName('');
            setNewCourseScore('');
        }
    };

    const removeApCourse = (index) => {
        setFormData(prev => ({
            ...prev,
            apCourses: prev.apCourses.filter((_, i) => i !== index)
        }));
    };

    // Helper for multi-select colleges

    const toggleCollege = (field, id) => {
        setFormData(prev => {
            const list = prev[field];
            if (list.includes(id)) {
                // If removing from target, also remove from dream
                if (field === 'targetColleges') {
                    return {
                        ...prev,
                        targetColleges: list.filter(c => c !== id),
                        dreamColleges: prev.dreamColleges.filter(c => c !== id)
                    };
                }
                return { ...prev, [field]: list.filter(c => c !== id) };
            } else {
                if (field === 'dreamColleges' && list.length >= 3) return prev; // Max 3 dreams
                return { ...prev, [field]: [...list, id] };
            }
        });
    };

    const validateStep = (step) => {
        if (step === 1) {
            return formData.firstName && formData.lastName && formData.grade && formData.state && formData.major;
        }
        if (step === 2) {
            const baseValid = formData.gpaWeighted && formData.gpaUnweighted && 
                            formData.apExamsPassed !== '' && 
                            formData.honorsClasses !== '';
            
            if (!baseValid) return false;
            
            if (formData.testType === 'SAT') return !!formData.satComposite;
            if (formData.testType === 'ACT') return !!formData.actComposite;
            return true;
        }
        if (step === 3) {
            if (formData.extracurriculars.length === 0) return false;
            if (formData.leadership === 'Yes' && !formData.leadershipDescription) return false;
            if (formData.sports === 'Yes' && (!formData.sportsLevel || !formData.sportsYears)) return false;
            if (formData.volunteerHours === '') return false;
            if (formData.research === 'Yes' && !formData.researchDescription) return false;
            if (formData.publications === 'Yes' && !formData.publicationsDescription) return false;
            if (formData.workExperience === 'Yes' && !formData.workHours) return false;
            return true;
        }
        if (step === 4) {
            if (formData.targetColleges.length < 3) return false;
            if (formData.dreamColleges.length < 1) return false;
            if (!formData.geoPreference || !formData.budget) return false;
            return true;
        }
        return false;
    };

    const isStepValid = () => validateStep(currentStep);

    const nextStep = () => {
        if (isStepValid()) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = () => {
        if (isStepValid()) {
            setIsSaving(true);
            storage.saveProfile(formData);
            
            // Short delay to show button state
            setTimeout(() => {
                onComplete(formData);
            }, 800);
        }
    };

    const renderInput = (label, field, type = 'text', placeholder = '', required = true, props = {}) => (
        <div className="flex flex-col gap-1 mb-4 text-left">
            <label className="text-sm font-medium text-[#2C2220] mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
                type={type}
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={placeholder}
                className="px-4 py-2.5 rounded-lg border border-[#D4C4A8] focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent outline-none transition-all bg-white"
                {...props}
            />
        </div>
    );

    const renderSelect = (label, field, options, required = true) => (
        <div className="flex flex-col gap-1 mb-4 text-left">
            <label className="text-sm font-medium text-[#2C2220] mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-[#D4C4A8] focus:ring-2 focus:ring-[#2E7D32] outline-none bg-white"
            >
                <option value="" disabled>Select...</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    );

    return (
        <div className="container py-12 animate-slide-up flex flex-col items-center" style={{ minHeight: '80vh' }}>
            
            {/* Stepper */}
            <div className="flex items-center justify-center w-full max-w-2xl mb-12 relative">
                {STEPS.map((step, i) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;
                    const isLast = i === STEPS.length - 1;
                    
                    return (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center relative z-10">
                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 font-bold text-sm shadow-sm
                                        ${isActive ? 'bg-[#2E7D32] text-white scale-110' : 
                                          isCompleted ? 'bg-[#2E7D32] text-white' : 
                                          'bg-[#E5E7EB] text-[#6B7280]'}`}
                                >
                                    {isCompleted ? <Check size={16} strokeWidth={3} /> : step.id}
                                </div>
                                <span className={`absolute top-10 whitespace-nowrap text-xs font-semibold tracking-wide uppercase mt-2
                                    ${isActive ? 'text-[#2E7D32]' : 'text-[#8B7355]'}`}>
                                    {step.title}
                                </span>
                            </div>
                            {!isLast && (
                                <div className="flex-1 h-0.5 mx-2 bg-[#E5E7EB] relative" style={{ minWidth: '60px' }}>
                                    <div 
                                        className="absolute top-0 left-0 h-full bg-[#2E7D32] transition-all duration-500"
                                        style={{ width: isCompleted ? '100%' : '0%' }}
                                    ></div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Form Container */}
            <div className="w-full max-w-[680px] bg-white rounded-2xl shadow-xl p-8 md:p-12 relative border border-[#F3F4F6]">
                
                {/* STEP 1: PERSONAL */}
                {currentStep === 1 && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-serif font-bold text-[#2C2220] mb-6">Personal Information</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {renderInput('First Name', 'firstName')}
                            {renderInput('Last Name', 'lastName')}
                        </div>
                        <div className="grid md:grid-cols-2 gap-5">
                            {renderSelect('Current Grade', 'grade', ['9', '10', '11', '12'])}
                            {renderSelect('State', 'state', [
                                'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
                                'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
                                'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
                            ])}
                        </div>
                        
                        <div className="flex flex-col gap-1 mb-4 text-left">
                            <label className="text-sm font-medium text-[#2C2220] mb-1">
                                Intended Major <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={formData.major}
                                onChange={(e) => handleChange('major', e.target.value)}
                                className="px-4 py-2.5 rounded-lg border border-[#D4C4A8] focus:ring-2 focus:ring-[#2E7D32] outline-none bg-white w-full"
                            >
                                <option value="" disabled>Select...</option>
                                {Object.entries(MAJORS).map(([group, opts]) => (
                                    <optgroup key={group} label={group}>
                                        {opts.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* STEP 2: ACADEMICS */}
                {currentStep === 2 && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-serif font-bold text-[#2C2220] mb-6">Academic Profile</h2>
                        
                        {/* GPA Section */}
                        <div className="bg-[#F9F6F0] p-5 rounded-xl border border-[#E8E4DC] mb-6">
                            <h3 className="text-sm font-bold text-[#8B7355] uppercase tracking-wide mb-4">GPA Information</h3>
                            <div className="grid md:grid-cols-3 gap-5">
                                {renderSelect('GPA Scale', 'gpaScale', GPA_SCALES)}
                                {renderInput('Current Weighted GPA', 'gpaWeighted', 'number', 'e.g. 3.85', true, { min: 0, step: 0.01 })}
                                {renderInput('Unweighted GPA (Max 4.0)', 'gpaUnweighted', 'number', 'e.g. 3.8', true, { min: 0, max: 4, step: 0.01 })}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5 mb-6">
                            {renderInput('Honors/Advanced Classes Count', 'honorsClasses', 'number', '0', true, { min: 0 })}
                            
                            <div className="flex flex-col gap-1 mb-4 text-left">
                                <label className="text-sm font-medium text-[#2C2220] mb-1">
                                    AP/IB Exams Passed (Score 3+)
                                </label>
                                <div className="px-4 py-2.5 rounded-lg border border-[#D4C4A8] bg-[#F5F0E8] text-[#4A4A4A] cursor-not-allowed">
                                    {formData.apExamsPassed} (Auto-calculated)
                                </div>
                            </div>
                        </div>

                        {/* Test Score Toggle */}
                        <div className="mb-6 border-t border-gray-100 pt-6">
                            <label className="text-sm font-medium text-[#2C2220] mb-2 block">Test Score Type</label>
                            <Toggle 
                                value={formData.testType} 
                                onChange={(val) => handleChange('testType', val)} 
                                options={['SAT', 'ACT']}
                            />
                        </div>

                        {formData.testType === 'SAT' ? (
                            <div className="grid md:grid-cols-3 gap-4 mb-8">
                                {renderInput('SAT Composite', 'satComposite', 'number', '400-1600', true)}
                                {renderInput('Math (Opt)', 'satMath', 'number', '200-800', false)}
                                {renderInput('ERW (Opt)', 'satErw', 'number', '200-800', false)}
                            </div>
                        ) : (
                            <div className="mb-8">
                                {renderInput('ACT Composite', 'actComposite', 'number', '1-36', true)}
                            </div>
                        )}

                        {/* AP/IB Course Manager */}
                        <div className="mb-8 border-t border-gray-100 pt-6">
                            <h3 className="text-sm font-bold text-[#8B7355] uppercase tracking-wide mb-4">AP & IB Coursework (Optional)</h3>
                            
                            {/* Add New Course */}
                            <div className="grid md:grid-cols-[1fr_140px_auto] gap-3 items-end mb-4">
                                <div className="flex flex-col gap-1 text-left">
                                    <label className="text-xs font-medium text-[#6B7280]">Select Course</label>
                                    <select
                                        value={newCourseName}
                                        onChange={(e) => setNewCourseName(e.target.value)}
                                        className="px-3 py-2 rounded-lg border border-[#D4C4A8] text-sm focus:ring-2 focus:ring-[#2E7D32] outline-none"
                                    >
                                        <option value="">Select a course...</option>
                                        <optgroup label="AP Courses">
                                            {AP_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </optgroup>
                                        <optgroup label="IB Courses">
                                            {IB_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                                        </optgroup>
                                    </select>
                                </div>
                                
                                <div className="flex flex-col gap-1 text-left">
                                    <label className="text-xs font-medium text-[#6B7280]">Score / Status</label>
                                    <select
                                        value={newCourseScore}
                                        onChange={(e) => setNewCourseScore(e.target.value)}
                                        className="px-3 py-2 rounded-lg border border-[#D4C4A8] text-sm focus:ring-2 focus:ring-[#2E7D32] outline-none"
                                    >
                                        <option value="">Select...</option>
                                        {newCourseName.startsWith('IB') 
                                            ? IB_SCORES.map(s => <option key={s} value={s}>{s}</option>)
                                            : AP_SCORES.map(s => <option key={s} value={s}>{s}</option>)
                                        }
                                    </select>
                                </div>

                                <button
                                    onClick={addApCourse}
                                    disabled={!newCourseName || !newCourseScore}
                                    className={`p-2 rounded-lg text-white transition-colors ${
                                        newCourseName && newCourseScore ? 'bg-[#2E7D32] hover:bg-[#1B5E20]' : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                                >
                                    <Plus size={20} />
                                </button>
                            </div>

                            {/* List of Added Courses */}
                            {formData.apCourses.length > 0 ? (
                                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                    {formData.apCourses.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center font-bold text-xs">
                                                    {item.score}
                                                </div>
                                                <span className="text-sm font-medium text-[#2C2220]">{item.course}</span>
                                            </div>
                                            <button onClick={() => removeApCourse(idx)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-sm text-gray-500">
                                    No AP or IB courses added yet.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* STEP 3: ACTIVITIES */}
                {currentStep === 3 && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-serif font-bold text-[#2C2220] mb-6">Activities & Achievements</h2>
                        
                        <div className="mb-6">
                            <label className="text-sm font-medium text-[#2C2220] mb-1 block">
                                Extracurricular Clubs (Type and press Enter to add) <span className="text-red-500">*</span>
                            </label>
                            <TagInput 
                                tags={formData.extracurriculars}
                                onAdd={(tag) => setFormData(prev => ({ ...prev, extracurriculars: [...prev.extracurriculars, tag] }))}
                                onRemove={(tag) => setFormData(prev => ({ ...prev, extracurriculars: prev.extracurriculars.filter(t => t !== tag) }))}
                                placeholder="Type club name and press Enter..."
                            />
                        </div>

                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <label className="text-sm font-medium text-[#2C2220] mb-2 block">Leadership Role?</label>
                            <Toggle value={formData.leadership} onChange={(v) => handleChange('leadership', v)} />
                            {formData.leadership === 'Yes' && (
                                <div className="mt-3 animate-fade-in">
                                    {renderInput('Describe your leadership role', 'leadershipDescription', 'text', 'e.g. President of Student Council', true)}
                                </div>
                            )}
                        </div>

                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <label className="text-sm font-medium text-[#2C2220] mb-2 block">Sports?</label>
                            <Toggle value={formData.sports} onChange={(v) => handleChange('sports', v)} />
                            {formData.sports === 'Yes' && (
                                <div className="mt-3 grid md:grid-cols-2 gap-4 animate-fade-in">
                                    {renderSelect('Level', 'sportsLevel', ['Varsity', 'JV', 'Club'], true)}
                                    {renderInput('Years (1-4)', 'sportsYears', 'number', '1', true, { min: 1, max: 4 })}
                                </div>
                            )}
                        </div>

                        {renderInput('Volunteer Hours', 'volunteerHours', 'number', 'Total hours', true, { min: 0 })}

                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <label className="text-sm font-medium text-[#2C2220] mb-2 block">Research Experience?</label>
                            <Toggle value={formData.research} onChange={(v) => handleChange('research', v)} />
                            {formData.research === 'Yes' && (
                                <div className="mt-3 animate-fade-in">
                                    {renderInput('Brief description', 'researchDescription', 'text', 'Topic or lab...', true)}
                                </div>
                            )}
                        </div>

                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <label className="text-sm font-medium text-[#2C2220] mb-2 block">Publications or Projects?</label>
                            <Toggle value={formData.publications} onChange={(v) => handleChange('publications', v)} />
                            {formData.publications === 'Yes' && (
                                <div className="mt-3 animate-fade-in">
                                    {renderInput('Brief description', 'publicationsDescription', 'text', 'Title or link...', true)}
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="text-sm font-medium text-[#2C2220] mb-1 block">Awards (Optional)</label>
                            <TagInput 
                                tags={formData.awards}
                                onAdd={(tag) => setFormData(prev => ({ ...prev, awards: [...prev.awards, tag] }))}
                                onRemove={(tag) => setFormData(prev => ({ ...prev, awards: prev.awards.filter(t => t !== tag) }))}
                                placeholder="Type award and press Enter..."
                            />
                        </div>

                        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <label className="text-sm font-medium text-[#2C2220] mb-2 block">Work Experience?</label>
                            <Toggle value={formData.workExperience} onChange={(v) => handleChange('workExperience', v)} />
                            {formData.workExperience === 'Yes' && (
                                <div className="mt-3 animate-fade-in">
                                    {renderInput('Hours per week', 'workHours', 'number', 'e.g. 10', true, { min: 0 })}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* STEP 4: PREFERENCES */}
                {currentStep === 4 && (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-serif font-bold text-[#2C2220] mb-6">Your Goals</h2>
                        
                        {/* College Search & Selection */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-[#2C2220] mb-2">Target Colleges (Select at least 3) <span className="text-red-500">*</span></label>
                            <div className="relative mb-2">
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search colleges..." 
                                    className="w-full pl-10 pr-4 py-2 border border-[#D4C4A8] rounded-lg focus:ring-2 focus:ring-[#2E7D32] outline-none"
                                    value={collegeSearch}
                                    onChange={e => setCollegeSearch(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 max-h-60 overflow-y-auto border border-[#E5E7EB] p-3 rounded-lg bg-gray-50">
                                {colleges.filter(c => c.name.toLowerCase().includes(collegeSearch.toLowerCase())).map(c => {
                                    const isSelected = formData.targetColleges.includes(c.id);
                                    return (
                                        <button
                                            key={c.id}
                                            onClick={() => toggleCollege('targetColleges', c.id)}
                                            className={`text-sm p-2.5 rounded-md border transition-all text-left flex justify-between items-center ${
                                                isSelected
                                                    ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#2E7D32]'
                                                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#D4C4A8]'
                                                }`}
                                        >
                                            <span className="truncate">{c.name}</span>
                                            {isSelected && <Check size={14} />}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.targetColleges.map(id => {
                                    const college = colleges.find(c => c.id === id);
                                    return (
                                        <span key={id} className="inline-flex items-center gap-1 bg-[#2E7D32] text-white px-3 py-1 rounded-full text-xs font-medium">
                                            {college?.name}
                                            <button onClick={() => toggleCollege('targetColleges', id)} className="hover:text-red-200"><X size={12} /></button>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Dream Colleges (Subset) */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-[#2C2220] mb-2">Dream Colleges (Max 3, from your targets) <span className="text-red-500">*</span></label>
                            <p className="text-xs text-gray-500 mb-2">Select your top choices from the list above.</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                                {formData.targetColleges.map(id => {
                                    const college = colleges.find(c => c.id === id);
                                    const isDream = formData.dreamColleges.includes(id);
                                    const isMaxed = formData.dreamColleges.length >= 3 && !isDream;
                                    return (
                                        <button
                                            key={id}
                                            onClick={() => toggleCollege('dreamColleges', id)}
                                            disabled={isMaxed}
                                            className={`text-sm p-2.5 rounded-md border transition-all text-left flex justify-between items-center ${
                                                isDream
                                                    ? 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B] ring-1 ring-[#F59E0B]'
                                                    : isMaxed ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'bg-white text-gray-700 border-gray-200 hover:border-[#F59E0B]'
                                                }`}
                                        >
                                            <span className="truncate">{college?.name}</span>
                                            {isDream && <Sparkles size={14} />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            {renderSelect('Budget Range', 'budget', ['Under $20k/yr', '$20k–$40k/yr', '$40k–$60k/yr', '$60k+/yr', 'Need Full Financial Aid'], true)}
                            {renderSelect('Geo Preference', 'geoPreference', ['Any', 'In-State Only', 'Northeast', 'Southeast', 'Midwest', 'West Coast', 'Southwest'], true)}
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-10 pt-6 border-t border-[#F3F4F6]">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`flex items-center text-gray-500 hover:text-[#2C2220] font-medium transition-colors ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                        <ChevronLeft size={20} className="mr-1" /> Back
                    </button>

                    {currentStep < 4 ? (
                        <button 
                            onClick={nextStep} 
                            disabled={!isStepValid()}
                            className={`flex items-center bg-[#2E7D32] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-[#1B5E20] transition-all transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
                        >
                            Next <ChevronRight size={20} className="ml-1" />
                        </button>
                    ) : (
                        <button 
                            onClick={handleSubmit} 
                            disabled={!isStepValid() || isSaving}
                            className={`flex items-center bg-[#2E7D32] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-[#1B5E20] transition-all transform hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none`}
                        >
                            {isSaving ? 'Analyzing...' : 'Analyze My Profile'} <ChevronRight size={20} className="ml-1" />
                        </button>
                    )}
                </div>

                {isSaving && (
                    <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center rounded-2xl animate-fade-in">
                        <div className="w-16 h-16 rounded-full bg-[#E8F5E9] flex items-center justify-center mb-4">
                            <Check size={32} className="text-[#2E7D32] animate-bounce" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-[#2C2220]">Profile Saved!</h3>
                        <p className="text-gray-500 mt-2">Redirecting to your analysis...</p>
                    </div>
                )}

            </div>
        </div>
    );
}