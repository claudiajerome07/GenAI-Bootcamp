// Module 4: RAG Pipeline Simulation

// Step 1: Define the "vector database"
const documentation = [
    {
        text: "The primary button uses the 'blue-500' token for its background color. For accessibility, always include an 'aria-label'. This is critical for all interactive elements.",
        vector: [0.85, 0.10, 0.40] // Interaction/Color
    },
    {
        text: "To implement dark mode, check the user's system preference using 'window.matchMedia'. Toggle the 'data-theme=dark' attribute on the body tag.",
        vector: [-0.90, 0.05, -0.30] // Theme/Mode
    },
    {
        text: "All new components must be written using functional React hooks. Class components are deprecated and should not be used in the new codebase.",
        vector: [0.70, -0.80, -0.15] // Code Standard/Architecture
    },
    {
        text: "The component library utilizes a 4-point scale for all internal padding and margin spacing. The largest padding available is 'p-10'.",
        vector: [0.10, 0.95, 0.60] // Spacing/Design System
    },
    {
        text: "For fetching asynchronous data, always use the 'useSWR' or 'useQuery' library with built-in caching mechanisms to prevent re-renders.",
        vector: [0.65, -0.75, 0.20] // Data Fetching/Hooks
    },
    {
        text: "Project deadlines are set for the end of the third quarter. Contact the project manager for a detailed Gantt chart.",
        vector: [-0.15, -0.10, 0.90] // Non-technical
    }
];

// Step 2: Dot Product Function
function calculateDotProduct(vec1, vec2) {
    if (vec1.length !== vec2.length) throw new Error("Vectors must be same length");
    let dot = 0;
    for (let i = 0; i < vec1.length; i++) {
        dot += vec1[i] * vec2[i];
    }
    return dot;
}

// Step 3: Find Most Relevant Document
function findMostRelevantDocument(queryVector) {
    let bestMatch = null;
    let highestScore = -Infinity;

    for (const doc of documentation) {
        const score = calculateDotProduct(queryVector, doc.vector);
        if (score > highestScore) {
            highestScore = score;
            bestMatch = doc;
        }
    }

    return bestMatch;
}

// Step 4: Simulated Queries
const queries = [
    { query: "How do I make the UI dark?", vector: [-1.0, 0.0, -0.2] },
    { query: "What is the standard for code structure?", vector: [0.75, -0.75, 0.0] }
];

// Test Queries
for (const q of queries) {
    const result = findMostRelevantDocument(q.vector);
    console.log(Query: "${q.query}");
    console.log(Best Match: "${result.text}");
    console.log('---');
}