import { useState, useEffect } from 'react';
import { visitorCounter } from '../lib/visitor';

export function useVisitorCount() {
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        // Init: increment once on mount
        visitorCounter.increment().then(c => setVisitorCount(c));

        // Poll every 5s
        const interval = setInterval(async () => {
            const c = await visitorCounter.get();
            setVisitorCount(c);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return visitorCount;
}
