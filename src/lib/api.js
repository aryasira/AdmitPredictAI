// V4 Groq Integration
// Using real API Key from .env

export async function generatePredictions(studentProfile, cdsDataForTargetColleges) {
    const GROQ_API_KEY = import.meta.env.VITE_ADMIT_PREDICT_API_KEY;

    if (!GROQ_API_KEY || GROQ_API_KEY.includes('your_api_key_here')) {
        console.error("Missing VITE_ADMIT_PREDICT_API_KEY in .env");
        throw new Error("Configuration Error: API Key missing. Please set VITE_ADMIT_PREDICT_API_KEY in your .env file.");
    }

    const systemPrompt = `You are AdmitPredict AI, an expert college admissions prediction tool.

You are given a student's full academic and extracurricular profile AND real Common Data Set (CDS) statistics for each of their target colleges.

Your job is to:
1. Assign an overall Admissibility Score (0–100) reflecting how competitive this student is across their target schools.
2. Write a 2–3 sentence overall summary explaining the score.
3. For EACH target college: predict a percentage chance of admission (0–100), assign a category (Strong / Likely / Possible / Reach / Long Reach), and write a 2–3 sentence explanation that references SPECIFIC numbers from both the student's profile and the college's CDS data.
4. Generate 4–6 personalized recommendations. Each must have: a title, priority (High/Medium/Low), category (Academic/Extracurricular/Test Prep/Application Strategy), a 2–3 sentence explanation of WHY this specific action will help THIS specific student based on their current stats and target schools, and an estimated impact string.

SCORING GUIDELINES — be ACCURATE and HONEST:
- Compare the student's GPA directly to the college's Average GPA.
- Compare SAT/ACT directly to the college's Average SAT/ACT.
- If the student is significantly BELOW the average on both GPA and test scores for a school, predicted chance should be under 15%.
- If the student is NEAR the average on both, predicted chance should be 20–50% depending on extracurriculars and acceptance rate.
- If the student is significantly ABOVE the average on both, predicted chance should be 50–80%.
- For schools with acceptance rates under 10%, even strong students should rarely be predicted above 40%.
- Category mapping: Strong = 60%+, Likely = 40–59%, Possible = 20–39%, Reach = 8–19%, Long Reach = under 8%.

EXPLANATION GUIDELINES:
- Every college explanation MUST cite at least one specific number. Example: "Your GPA of 3.7 is below Harvard's average of 4.18, which significantly limits your chances despite strong test scores."
- Do NOT give generic encouragement. Be specific and data-driven.

Respond with ONLY valid JSON. No preamble. No markdown code fences. No trailing text. Exact schema:
{
  "overallScore": <number 0-100>,
  "overallSummary": "<string, 2-3 sentences>",
  "predictions": [
    {
      "college": "<college name>",
      "predictedChance": <number 0-100>,
      "category": "<Strong|Likely|Possible|Reach|Long Reach>",
      "explanation": "<string, 2-3 sentences citing specific numbers>"
    }
  ],
  "recommendations": [
    {
      "title": "<string>",
      "priority": "<High|Medium|Low>",
      "category": "<Academic|Extracurricular|Test Prep|Application Strategy>",
      "explanation": "<string, 2-3 sentences, specific to this student>",
      "estimatedImpact": "<string, e.g. '+5–10% at Reach schools'>"
    }
  ]
}`;

  const userPrompt = `STUDENT PROFILE:
Name: ${studentProfile.firstName} ${studentProfile.lastName}
Grade: ${studentProfile.grade}
State: ${studentProfile.state}
Intended Major: ${studentProfile.major}
Weighted GPA: ${studentProfile.gpaWeighted}
Unweighted GPA: ${studentProfile.gpaUnweighted}
Class Rank: ${studentProfile.classRank}
Test Scores: ${studentProfile.testType === 'SAT' ? `SAT Composite: ${studentProfile.satComposite}` + (studentProfile.satMath ? `, Math: ${studentProfile.satMath}` : '') + (studentProfile.satErw ? `, ERW: ${studentProfile.satErw}` : '') : `ACT Composite: ${studentProfile.actComposite}`}
AP/IB Courses: ${(studentProfile.apCourses || []).map(c => `${c.course} (${c.score})`).join(', ') || 'None'}
AP/IB Exams Passed (3+): ${studentProfile.apExamsPassed || '0'}
Honors/Advanced Classes: ${studentProfile.honorsClasses || '0'}
Extracurricular Clubs: ${(studentProfile.extracurriculars || []).join(', ') || 'None'}
Leadership: ${studentProfile.leadership === 'Yes' ? 'Yes — ' + studentProfile.leadershipDescription : 'No'}
Sports: ${studentProfile.sports === 'Yes' ? `Yes — ${studentProfile.sportsLevel}, ${studentProfile.sportsYears} years` : 'No'}
Volunteer Hours: ${studentProfile.volunteerHours || '0'}
Research Experience: ${studentProfile.research === 'Yes' ? 'Yes — ' + studentProfile.researchDescription : 'No'}
Publications/Projects: ${studentProfile.publications === 'Yes' ? 'Yes — ' + studentProfile.publicationsDescription : 'No'}
Awards: ${(studentProfile.awards || []).length > 0 ? (studentProfile.awards || []).join(', ') : 'None'}
Work Experience: ${studentProfile.workExperience === 'Yes' ? `Yes — ${studentProfile.workHours} hrs/week` : 'No'}
Dream Colleges: ${(studentProfile.targetColleges || []).join(', ')}

TARGET COLLEGES WITH CDS DATA:
${(cdsDataForTargetColleges || []).map(c => `
College: ${c.name}
Location: ${c.location}
Acceptance Rate: ${c.acceptanceRate * 100}%
GPA Average: ${c.gpaAverage || 'N/A'}
SAT Average: ${c.satAverage || 'N/A'}
ACT Average: ${c.actAverage || 'N/A'}
Tuition: $${c.tuition ? c.tuition.toLocaleString() : 'N/A'}
CDS Importance: GPA (${c.cds?.gpaImportance || 'N/A'}), Rigor (${c.cds?.rigorImportance || 'N/A'})
`).join('\n---\n')}`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
      max_tokens: 3000,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq API error: ${response.status} — ${err}`);
  }

  const data = await response.json();
  
  if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
    console.error("Groq API returned unexpected structure:", data);
    throw new Error("Received empty or invalid response from AI service.");
  }

  let content = data.choices[0].message.content;

  // Strip markdown fences if present (robustly)
  content = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  // Fallback: If content still has fences or preamble, try to extract JSON object
  const jsonStartIndex = content.indexOf('{');
  const jsonEndIndex = content.lastIndexOf('}');
  
  if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonEndIndex > jsonStartIndex) {
    content = content.substring(jsonStartIndex, jsonEndIndex + 1);
  }

  try {
    const parsed = JSON.parse(content);
    return parsed;
  } catch (e) {
    console.error("JSON Parse Error. Raw content:", content);
    throw new Error(`Failed to parse AI response: ${e.message}`);
  }
}
