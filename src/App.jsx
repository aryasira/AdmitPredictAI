import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Hero from './components/views/Hero';
import Profile from './components/views/Profile';
import Dashboard from './components/views/Dashboard';
import Transparency from './components/views/Transparency';

function App() {
  const [page, setPage] = useState('home');
  const [profile, setProfile] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    // Load persisted state
    const savedProfile = localStorage.getItem('admitpredict:profile');
    const savedAnalysis = localStorage.getItem('admitpredict:predictions');
    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedAnalysis) setAnalysis(JSON.parse(savedAnalysis));
  }, []);

  const handleProfileComplete = (results, formData) => {
    setProfile(formData);
    setAnalysis(results);

    // Save
    localStorage.setItem('admitpredict:profile', JSON.stringify(formData));
    localStorage.setItem('admitpredict:predictions', JSON.stringify(results));

    setPage('dashboard');
    window.scrollTo(0, 0);
  };

  const navigate = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  }

  let content;
  switch (page) {
    case 'home': content = <Hero setPage={navigate} />; break;
    case 'profile': content = <Profile onComplete={handleProfileComplete} setPage={navigate} />; break;
    case 'dashboard': content = <Dashboard analysis={analysis} profile={profile} />; break;
    case 'transparency': content = <Transparency />; break;
    default: content = <Hero setPage={navigate} />;
  }

  // If 'howitworks' is clicked, it just goes to hero but maybe scrolls (simplified to Home for now)
  if (page === 'howitworks') content = <Hero setPage={navigate} />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header page={page} setPage={navigate} />
      <main className="flex-1">
        {content}
      </main>
      <Footer setPage={navigate} />
    </div>
  );
}

export default App;
