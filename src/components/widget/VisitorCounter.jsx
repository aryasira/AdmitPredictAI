import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { storage } from '../../lib/storage';

export default function VisitorCounter() {
    const [count, setCount] = useState(12847);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Initialize visitor logic (increments if new session)
        const newCount = storage.initVisitor();
        setCount(newCount);

        // Delay appearance strictly for effect
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-40 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-md shadow-float border border-[var(--color-cream)] px-5 py-2.5 rounded-full flex items-center gap-3 transition-transform hover:scale-105 cursor-default">
                <Eye className="w-4 h-4 text-[var(--color-primary-green)]" />
                <span className="text-sm font-medium text-[var(--color-forest-green)] font-mono">
                    {count.toLocaleString()}
                </span>
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide font-bold">
                    Students
                </span>
            </div>
        </div>
    );
}
