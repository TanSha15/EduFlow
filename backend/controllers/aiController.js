import { generateText } from "../config/gemini.js";
import { StudyMaterial } from "../models/StudyMaterial.js";
import { User } from "../models/user.js";

/**
 * @desc    Generate study material (Dynamic for Summary, Quiz, and Roadmap)
 * @route   POST /api/ai/generate
 * @access  Private
 */
export const generateStudyMaterial = async (req, res) => {
  try {
    const { topic, type } = req.body;
    const userId = req.id;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: "Topic is required to generate study material.",
      });
    }


    let typeSpecificPrompt = "";

    // --- STEP 1: DYNAMIC PROMPT LOGIC ---
    if (type === "quiz") {
      typeSpecificPrompt = `
TASK: Generate exactly 5 Multiple Choice Quiz questions on the topic: "${topic}".

OUTPUT RULES — VIOLATIONS WILL BREAK THE RENDERER:
- Begin your response with "## Quiz: ${topic}" and NOTHING before it.
- No preamble, no meta-commentary, no "Here is your quiz", no closing remarks.
- Output ONLY the quiz block, then the answer key. Nothing else.
- Never place explanations, hints, or correct-answer signals inside the quiz section.

QUESTION RULES:
- Questions must progress in difficulty: Q1–2 = beginner, Q3–4 = intermediate, Q5 = advanced.
- All 5 questions must be on distinct subtopics. No duplicate concepts.
- Each question must have exactly 4 options: A, B, C, D.
- Exactly one option must be correct. No trick questions where multiple are correct.
- Distractors (wrong options) must be plausible — not obviously wrong.
- Do not use "All of the above" or "None of the above".

EXACT TEMPLATE — REPEAT THIS BLOCK 5 TIMES, NO DEVIATION:

[number]. [Question text ending in ?]

A. [Option text]
B. [Option text]
C. [Option text]
D. [Option text]

--------------------------------------------------

ANSWER KEY RULES:
- Begin with "## Answer Key" on its own line.
- One answer per line, vertical only.
- Each line: number, correct letter, em dash, one sentence explanation.
- Explanation must state WHY the answer is correct, not just restate it.

EXACT ANSWER KEY TEMPLATE:

1. [Letter] — [One sentence explaining why this is correct.]
2. [Letter] — [One sentence explaining why this is correct.]
3. [Letter] — [One sentence explaining why this is correct.]
4. [Letter] — [One sentence explaining why this is correct.]
5. [Letter] — [One sentence explaining why this is correct.]

BANNED BEHAVIORS:
- Do not add blank lines inside the answer key.
- Do not add section headers between questions.
- Do not number options (1. 2. 3.) — use only A. B. C. D.
- Do not bold or italicize any quiz content.
- Do not add a closing summary or note after the answer key.
`;
    } else if (type === "roadmap") {
      typeSpecificPrompt = `
TASK: Generate a structured Step-by-Step Learning Roadmap for: "${topic}".

OUTPUT RULES:
- Begin your response with "## Roadmap: ${topic}" and NOTHING before it.
- No preamble, no "Here is your roadmap", no closing remarks or motivational fluff.
- Use only structured bullet points. No prose paragraphs anywhere in the output.
- Every bullet point must be an actionable learning step, not a vague category name.
  BAD:  "- Fundamentals"
  GOOD: "- Learn the core syntax rules and understand how the compiler/interpreter processes code"

PHASE RULES:
- Each phase must have a title and a 1-sentence description of what the learner achieves by the end.
- Each phase must contain exactly 5 bullet points.
- Bullets must start with "- " (dash + space).
- Each bullet must be 10–20 words: specific enough to act on, not so long it becomes a paragraph.
- No sub-bullets. Flat list only.

EXACT STRUCTURE:

## Roadmap: ${topic}

### Phase 1: Foundations
*Goal: [One sentence — what the learner can do after this phase.]*
- [Actionable learning step]
- [Actionable learning step]
- [Actionable learning step]
- [Actionable learning step]
- [Actionable learning step]

### Phase 2: Intermediate Depth
*Goal: [One sentence — what the learner can do after this phase.]*
- [Actionable learning step]
- [Actionable learning step]
- [Actionable learning step]
- [Actionable learning step]
- [Actionable learning step]

### Phase 3: Advanced Mastery
*Goal: [One sentence — what the learner can do after this phase.]*
- [Actionable learning step]
- [Actionable learning step]
- [Actionable learning step]
- [Actionable learning step]
- [Actionable learning step]

## Checkpoints

*Each checkpoint is a concrete, testable proof of competence.*

1. [Specific deliverable or skill test that proves Phase 1 completion.]
2. [Specific deliverable or skill test that proves growing competence.]
3. [Project or task demonstrating intermediate ability.]
4. [Challenge that requires combining multiple skills learned.]
5. [Capstone task that demonstrates near-professional proficiency.]

BANNED BEHAVIORS:
- Do not write motivational statements ("You're on your way!", "Keep it up!").
- Do not use vague bullets like "Understand the basics" or "Practice more".
- Do not add resources, links, or tool recommendations unless the topic requires it.
- Do not add a closing paragraph after the checkpoints.
`;
    } else {
      typeSpecificPrompt = `
TASK: Generate a structured Study Guide for: "${topic}".

OUTPUT RULES:
- Begin your response with "## Study Guide: ${topic}" and NOTHING before it.
- No preamble, no "Here is your study guide", no closing remarks.
- Use academic, precise language throughout. No conversational filler.
- Every section must appear in the exact order listed below.
- Do not merge sections or skip sections.

SECTION RULES:

### Overview
- Write exactly 5 sentences.
- Sentence 1: Define the topic.
- Sentence 2: Explain its significance or real-world relevance.
- Sentence 3: Describe its scope (what it covers / what it doesn't).
- Sentence 4: Name the primary discipline(s) it belongs to.
- Sentence 5: State what a learner will understand after studying it.
- No bullet points in this section. Prose only.

### Core Concepts
- Include exactly 4 concepts.
- Each concept uses this exact sub-structure:

#### [Concept Name]
[Definition in 1 sentence.]
[Explanation of how it works or why it matters — 2–3 sentences.]

### Critical Vocabulary
- Exactly 5 terms.
- Each term must appear on its own line using this format:
- **[Term]** — [Precise definition in one sentence. No fluff.]
- Terms must be genuinely important to the topic, not peripheral.

### Practical Analogy
- Write exactly 4 sentences.
- Sentence 1: Introduce the real-world comparison ("This works like...").
- Sentence 2: Map the analogy's components to the topic's components explicitly.
- Sentence 3: Identify where the analogy holds well.
- Sentence 4: Identify the analogy's limit (where it breaks down).
- No bullet points. Prose only.

### Summary Challenge
- One question only.
- Must require synthesis or evaluation, not recall.
- Must not be answerable with a single word or fact.
- Format: "**Challenge:** [Question]"

BANNED BEHAVIORS:
- Do not add sections not listed above.
- Do not use bullet points in Overview or Practical Analogy.
- Do not write definitions that are circular (using the term to define itself).
- Do not add a closing note, encouragement, or "further reading" section.
`;
    }

    // --- STEP 2: CALL AI ---

    const text = await generateText(typeSpecificPrompt);

    if (!text) {
      throw new Error("AI failed to return content.");
    }

    //  SAVE TO DATABASE ---
    const newMaterial = await StudyMaterial.create({
      userId,
      topic,
      type: type || "summary",
      content: text,
    });

    //  STREAK LOGIC ---
    const user = await User.findById(userId);
    if (user) {
      const now = new Date();
      const lastActivity = user.lastActivity ? new Date(user.lastActivity) : now;
      const hoursSinceLastActivity = Math.abs(now - lastActivity) / 36e5;

      if (hoursSinceLastActivity > 24 && hoursSinceLastActivity < 48) {
        user.streak += 1;
      } else if (hoursSinceLastActivity >= 48) {
        user.streak = 1;
      } else if (user.streak === 0) {
        user.streak = 1;
      }

      user.lastActivity = now;
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Study material generated successfully!",
      data: newMaterial,
    });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while generating study material.",
      error: error.message,
    });
  }
};