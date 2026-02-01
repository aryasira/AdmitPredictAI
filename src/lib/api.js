// V4 Groq Integration
// User should paste their key below.
const GROQ_API_KEY = "gsk_YOUR_KEY_HERE";

const MOCK_RESPONSE = {
    overallScore: 78,
    overallSummary: "Your profile is strong, demonstrating solid academic performance and a commitment to extracurriculars.",
    predictions: [
        { college: "Stanford University", predictedChance: 12, category: "Reach", explanation: "Your GPA is acceptable but slightly below the 75th percentile for admitted students." },
        { college: "UCLA", predictedChance: 45, category: "Possible", explanation: "Strong alignment with their academic expectations for your major." }
    ],
    recommendations: [
        { title: "Retake SAT", priority: "High", category: "Test Prep", explanation: "Improving to 1500+ would significantly boost your reach school odds.", estimatedImpact: "+8-12%" },
        { title: "Leadership Role", priority: "Medium", category: "Extracurricular", explanation: "Try to gain a captain or president title in your clubs.", estimatedImpact: "+5%" }
    ]
};

export async function generatePredictions(profile, collegesData) {
    // Use Key if present, otherwise look in Env or Local (fallback for dev)
    let apiKey = GROQ_API_KEY;
    if (apiKey === "gsk_YOUR_KEY_HERE" || !apiKey) {
        // Check env just in case
        apiKey = import.meta.env.VITE_ADMIT_PREDICT_API_KEY || localStorage.getItem('admitpredict:apikey');
    }

    if (!apiKey || apiKey === "gsk_YOUR_KEY_HERE") {
        console.warn("No Groq API Key set. Returning Mock Data.");
        return new Promise(resolve => setTimeout(() => resolve(MOCK_RESPONSE), 1500));
    }

    const systemPrompt = `You are AdmitPredict AI. Return ONLY valid JSON. Structure: { overallScore, overallSummary, predictions: [{college, predictedChance, category, explanation}], recommendations: [{title, priority, category, explanation, estimatedImpact}] }`;

    const userPrompt = JSON.stringify({ profile, collegesData });

    try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama-3.1-70b-versatile",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt }
                ],
                temperature: 0.3
            })
        });

        const data = await res.json();
        const content = data.choices[0].message.content;
        // Simple parse attempt
        try {
            return JSON.parse(content);
        } catch (e) {
            // Try checking for fences
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) return JSON.parse(jsonMatch[0]);
            throw e;
        }
    } catch (e) {
        console.error(e);
        return MOCK_RESPONSE;
    }
}
