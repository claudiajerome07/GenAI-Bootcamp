# Pricing and Prompts

## A. Pricing Research

- **Sources checked:**
    - [Google Gemini 2.5 Flash Overview](https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/2-5-flash)
    - [Google Developers Blog – Gemini Flash Pricing](https://developers.googleblog.com/en/introducing-gemini-2-5-flash-image)

### Summary Table

| Model | Billing unit | Cost (per unit) | Notes |
| --- | --- | --- | --- |
| Gemini 2.5 Flash | per 1,000 input tokens | $3 | Input token cost, text only |
| Gemini 2.5 Flash | per 1,000 output tokens | $30 | Output token cost; includes text + image reasoning |
| Gemini 2.5 Flash-Lite | per 1,000 input tokens | $0.10 | Cost-efficient, good for high-volume simple queries |
| Gemini 2.5 Flash-Lite | per 1,000 output tokens | $0.40 | Lower-cost output, limited context length |

---

## B. Cost Estimation Examples

**Assumptions:**

- Average chat: 120 input tokens + 310 output tokens = 430 tokens
- Daily chats: 10,000
- USD → INR conversion: 1 USD = ₹83

### Per Chat Cost (INR)

| Cost Component | Tokens | Cost per token (₹) | Cost per chat (₹) |
| --- | --- | --- | --- |
| Input | 120 | 0.000249 | 0.02988 |
| Output | 310 | 0.00249 | 0.7719 |
| **Total per chat** | 430 | — | **0.8018** |

### Daily Cost

- Daily chats = 10,000
- Daily cost = 10,000 × ₹0.8018 = **₹8,018**

### Monthly Cost

- Monthly (30 days) = ₹8,018 × 30 = **₹2,40,540**

---

## C. Prompt Refinement — Before / After

### Student A

**Bad prompt (before):**

> Explain government schemes.
> 

**Refined prompt (after) [RTFC applied]:**

> Role: Civic Information Assistant
> 
> 
> **Task:** Summarize key government schemes available for teachers in Karnataka, focusing on eligibility and benefits.
> 
> **Format:** Provide 4–6 bullet points covering scheme name, eligibility, and purpose.
> 
> **Constraint:** Use plain English; avoid technical or bureaucratic language.

**Notes on changes / why improved:**

- Added **Role** to align with CivicConnect AI’s purpose.
- Specified **Task** for clarity on target audience and topic.
- Defined **Format** for structured output and readability.
- Applied **Constraint** to manage accessibility and keep it simple.

---

### Student B

**Bad prompt (before):**

> Translaet the paragraph.
> 

**Refined prompt (after) [RTFC applied]:**

> Role: Local Language Accessibility Assistant
> 
> 
> **Task:** Translate the provided government notice into Kannada (local language) while maintaining the original meaning.
> 
> **Format:** Provide translated text along with a one-liner summary in English, plain one.
> 
> **Constraint:** Maintain a formal tone throughout the process and ensure accurate translation of official terms.
> 

**Notes:**

- Clarified **Role** for domain expertise.
- Structured **Task** and **Format** to clarify what's being translated while maintaining the bilingual clarity.
- Set **Constraint** for tone and accuracy.

---

### Student C

**Bad prompt (before):**

> Exxplain this law.
> 

**Refined prompt (after) [RTFC applied]:**

> Role: Legal Clarity Assistant (lawBot)
> 
> 
> **Task:** Explain the “Consumer Protection Act, 2019” in simple terms for a general citizen audience.
> 
> **Format:** paragraph-form (max 150 words), formal tone.
> 
> **Constraint:** Avoid legal jargon; preserve key rights and responsibilities accurately.
> 

**Notes:**

- Added **Role** to recieve role-based specialised response.
- Added **Task** and **Format** for clarity, style and structure.
- Applied **Constraint** to ensure accuracy and simplicity with the language.

---

## D. Team Recommendation

**Model/Settings for Hackathon:**

- **Recommended model:** Gemini 2.5 Flash-Lite
- **Reasoning:** Lower cost per token enables handling high chat volume while keeping outputs structured.
- **Suggested settings:**
    - Temperature: 0.5 (balance creativity and predictability)
    - Top-P: 0.7 (moderate vocabulary diversity)
- **Estimated monthly cost for 10,000 chats/day:** ~₹2,40,000 (with some buffer for spikes)

**Reflection:**

- Learned that careful prompt design significantly improves output quality and reduces token usage.
- RTFC framework ensures structured, accurate, and cost-efficient prompts.
- Token planning and model selection are critical to managing costs for large-scale projects.