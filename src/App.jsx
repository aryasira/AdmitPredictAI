import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Hero from './components/views/Hero';
import ProfileBuilder from './components/views/ProfileBuilder';
import Dashboard from './components/views/Dashboard';
import Transparency from './components/views/Transparency';
import Mission from './components/views/Mission';
import ErrorBoundary from './components/common/ErrorBoundary';
import { storage } from './lib/storage';
import { generatePredictions } from './lib/api';
import colleges from './data/colleges.json';

function App() {
  const [page, setPage] = useState('home');
  const [profile, setProfile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load persisted state
    const savedProfile = storage.getProfile();
    const savedAnalysis = storage.getPredictions();
    if (savedProfile) setProfile(savedProfile);
    if (savedAnalysis) setAnalysis(savedAnalysis);
  }, []);

  const runAIPrediction = async (currentProfile) => {
    setLoading(true);
    setError(null);
    
    try {
      // 1. Check Cache: If we have analysis and profile hasn't changed
      const savedProfile = storage.getProfile();
      const savedAnalysis = storage.getPredictions();
      
      // Simple deep equality check using JSON stringify
      const profileChanged = JSON.stringify(savedProfile) !== JSON.stringify(currentProfile);
      
      if (!profileChanged && savedAnalysis) {
        console.log("Using cached predictions");
        setAnalysis(savedAnalysis);
        setLoading(false);
        return;
      }

      console.log("Running new AI prediction...");
      
      // 2. Prepare CDS Data
      // Filter colleges.json to find matches for the student's target colleges
      // We match by ID since ProfileBuilder saves IDs.
      const targetIds = currentProfile.targetColleges || [];
      const cdsData = colleges.filter(c => targetIds.includes(c.id));
      
      // 3. Call API
      // We need to map IDs to names for the API prompt to be clear
      const profileForApi = {
        ...currentProfile,
        targetColleges: targetIds.map(id => colleges.find(c => c.id === id)?.name || id),
        dreamColleges: (currentProfile.dreamColleges || []).map(id => colleges.find(c => c.id === id)?.name || id)
      };

      const results = await generatePredictions(profileForApi, cdsData);
      
      if (!results) {
        throw new Error("No predictions returned from API");
      }

      // 4. Update State & Storage
      setAnalysis(results);
      storage.saveProfile(currentProfile); // Ensure profile is saved as "current" reference for cache
      storage.savePredictions(results);
      
      if (results.overallScore !== undefined) {
        storage.addToHistory(results.overallScore);
      }
      
    } catch (err) {
      console.error("Prediction failed:", err);
      setError(err.message || "Failed to generate predictions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileComplete = (formData) => {
    setProfile(formData);
    storage.saveProfile(formData); // Save immediately so we can return to it
    
    setPage('dashboard');
    window.scrollTo(0, 0);
    
    // Trigger API
    runAIPrediction(formData);
  };

  const navigate = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  }

  let content;
  switch (page) {
    case 'home': content = <Hero setPage={navigate} />; break;
    case 'profile': content = <ProfileBuilder initialData={profile} onComplete={handleProfileComplete} setPage={navigate} />; break;
    case 'dashboard': 
      content = (
        <Dashboard 
          analysis={analysis} 
          profile={profile} 
          loading={loading} 
          error={error} 
          onRetry={() => runAIPrediction(profile)}
          setPage={navigate}
        />
      ); 
      break;
    case 'transparency': content = <Transparency />; break;
    case 'mission': content = <Mission setPage={navigate} />; break;
    default: content = <Hero setPage={navigate} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header page={page} setPage={navigate} hasProfile={!!profile} />
      <main className="flex-1">
        <ErrorBoundary>
            {content}
        </ErrorBoundary>
      </main>
      <Footer setPage={navigate} />
      <Analytics />
    </div>
  );
}

export default App;
