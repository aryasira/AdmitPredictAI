import { Leaf, Info, Home } from 'lucide-react';

export default function Layout({ children, currentView, onViewChange }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--color-cream)]">
        <div className="container flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onViewChange('hero')}
            className="flex items-center gap-sm text-[var(--color-forest-green)] hover:opacity-80 transition-opacity"
          >
            <Leaf className="w-6 h-6" />
            <span className="font-display font-bold text-xl tracking-tight">AdmitPredict AI</span>
          </button>

          {/* Nav */}
          <nav className="flex items-center gap-md">
            <button 
              onClick={() => onViewChange('transparency')}
              className={`flex items-center gap-xs px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                currentView === 'transparency' 
                  ? 'bg-[var(--color-green-50)] text-[var(--color-primary-green)]' 
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-dark)]'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Transparency</span>
            </button>
            {/* Debug/Nav for Dev */}
            {import.meta.env.DEV && (
              <div className="hidden md:flex gap-2 border-l pl-2 ml-2 border-[var(--color-border)]">
                 <button onClick={() => onViewChange('hero')} className="text-xs">Home</button>
                 <button onClick={() => onViewChange('profile')} className="text-xs">Profile</button>
                 <button onClick={() => onViewChange('dashboard')} className="text-xs">Dash</button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {children}
      </main>

      <footer className="py-8 bg-[var(--color-cream)] mt-auto">
        <div className="container text-center text-sm text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} AdmitPredict AI. Powered by Meta Llama.</p>
          <div className="flex justify-center gap-md mt-4">
             <button onClick={() => onViewChange('transparency')} className="hover:underline">How it Works</button>
             <button onClick={() => onViewChange('hero')} className="hover:underline">Home</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
