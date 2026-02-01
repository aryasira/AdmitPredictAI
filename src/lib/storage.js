const KEYS = {
    PROFILE: 'admitpredict:profile',
    PREDICTIONS: 'admitpredict:predictions',
    HISTORY: 'admitpredict:history',
    COMPLETED_RECS: 'admitpredict:completedRecs',
    VISITORS: 'admitpredict:visitors',
};

export const storage = {
    KEYS, // Export keys for reference

    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('Storage access error:', e);
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Storage access error:', e);
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    // Specific helpers
    getProfile() {
        return this.get(KEYS.PROFILE);
    },

    saveProfile(profile) {
        this.set(KEYS.PROFILE, profile);
    },

    getPredictions() {
        return this.get(KEYS.PREDICTIONS);
    },

    savePredictions(predictions) {
        this.set(KEYS.PREDICTIONS, predictions);
    },

    addToHistory(score) {
        const history = this.get(KEYS.HISTORY) || [];
        history.push({ timestamp: new Date().toISOString(), overallScore: score });
        this.set(KEYS.HISTORY, history);
    },

    getHistory() {
        return this.get(KEYS.HISTORY) || [];
    },

    toggleRecCompletion(title) {
        const completed = new Set(this.get(KEYS.COMPLETED_RECS) || []);
        if (completed.has(title)) {
            completed.delete(title);
        } else {
            completed.add(title);
        }
        this.set(KEYS.COMPLETED_RECS, Array.from(completed));
    },

    getCompletedRecs() {
        return this.get(KEYS.COMPLETED_RECS) || [];
    },

    // Visitor Logic
    initVisitor() {
        // Check session to ensure we only increment once per session
        const isNewSession = !sessionStorage.getItem('admitpredict:session_active');

        if (isNewSession) {
            sessionStorage.setItem('admitpredict:session_active', 'true');
            const current = this.get(KEYS.VISITORS) || 12847; // Start with a realistic base if empty
            this.set(KEYS.VISITORS, current + 1);
            return current + 1;
        }
        return this.get(KEYS.VISITORS) || 12847;
    },

    getVisitorCount() {
        return this.get(KEYS.VISITORS) || 12847;
    }
};

// Expose to window as requested
if (typeof window !== 'undefined') {
    window.storage = storage;
}
