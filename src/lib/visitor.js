// Shared Storage Logic Wrapper
// In a real browser shared storage environment, this would interface with the API. 
// For this environment, we use localStorage to simulate the "Shared" persistence across tabs.

export const visitorCounter = {
    KEY: 'admitpredict:visitors',

    async get() {
        try {
            // Simulate async shared storage read
            const val = localStorage.getItem(this.KEY);
            return val ? parseInt(val, 10) : 0;
        } catch { return 0; }
    },

    async increment() {
        try {
            const current = await this.get();
            const next = current + 1;
            localStorage.setItem(this.KEY, next.toString());
            return next;
        } catch { return 0; }
    }
};
