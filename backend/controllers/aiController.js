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

    // --- STEP 1: DYNAMIC PROMPT LOGIC ---
    // --- STEP 1: DYNAMIC PROMPT LOGIC ---
    let typeSpecificPrompt = "";

    if (type === "quiz") {
      typeSpecificPrompt = `
TASK: Generate a high-quality Multiple Choice Quiz.

CRITICAL RENDERING RULES (STRICT — INVALID IF BROKEN):

1. Every question block MUST match the template EXACTLY.
2. Each option MUST be on its own separate line.
3. There MUST be one blank line after the question.
4. There MUST be one blank line after option D.
5. NEVER place options on the same line as the question.
6. NEVER place multiple options on one line.
7. NEVER compress text into paragraphs.
8. Use the separator exactly as written.

REQUIRED TEMPLATE (REPEAT EXACTLY 5 TIMES):

1. Question text here?

A. Option A text
B. Option B text
C. Option C text
D. Option D text

--------------------------------------------------

(Repeat for questions 2–5)

STRUCTURE:

## Quiz: ${topic}

(Follow template exactly)

## Answer Key

Write answers vertically using this exact format:

1. B — One sentence explanation.

2. A — One sentence explanation.

3. D — One sentence explanation.

4. C — One sentence explanation.

5. B — One sentence explanation.

DO NOT:
- Write explanations inside quiz
- Merge lines
- Remove blank lines
- Change separator
`;
    } else if (type === "roadmap") {
      typeSpecificPrompt = `
TASK: Generate a Step-by-Step Learning Roadmap.

STRICT FORMAT RULES:
- Each phase must contain 4–6 bullet points.
- Bullet points must start with "- ".
- Avoid paragraphs. Only structured learning steps.

STRUCTURE:

## Roadmap: Mastering ${topic}

### Phase 1: Foundations
- Core fundamentals
- Essential theory
- Basic practice exercises
- Beginner tools

### Phase 2: Intermediate Depth
- Applied concepts
- Common patterns
- Practical implementation
- Debugging skills

### Phase 3: Advanced Mastery
- Real-world projects
- Optimization techniques
- Edge cases
- Professional practices

## Checkpoints
List 5 measurable milestones demonstrating competence.
`;
    } else {
      typeSpecificPrompt = `
TASK: Generate a comprehensive Study Guide.

STRICT FORMAT RULES:
- No conversational sentences.
- Use concise academic explanations.
- Use bullet lists where appropriate.

STRUCTURE:

## Overview
A concise academic summary of the topic (5–6 sentences).

## Core Concepts
Explain 3–5 essential concepts using subsections:

### Concept Name
Definition and explanation (3–4 sentences)

## Critical Vocabulary
Provide exactly 5 terms in this format:
- **Term** — Definition

## Practical Analogy
Explain the concept using a real-world comparison in 4–5 sentences.

## Summary Challenge
One higher-order thinking question requiring reasoning, not recall.
`;
    }

    const finalPrompt = `
ROLE: You are the Lead Academic Content Creator for EduFlow.

TOPIC: "${topic}"

${typeSpecificPrompt}

GLOBAL CONSTRAINTS (STRICT):
1. Output MUST be valid Markdown.
2. Use ## and ### headers only as defined.
3. Do NOT add introductions, conclusions, or conversational text.
4. Do NOT apologize or explain your process.
5. Do NOT change the required separators or numbering format.
6. Follow structure EXACTLY — the output will be parsed programmatically.
`;

    // --- STEP 2: CALL AI ---
    const text = await generateText(finalPrompt);

    if (!text) {
      throw new Error("AI failed to return content.");
    }

    // --- STEP 3: SAVE TO DATABASE ---
    const newMaterial = await StudyMaterial.create({
      userId,
      topic,
      type: type || "summary",
      content: text,
    });

    // --- STEP 4: STREAK LOGIC ---
    const user = await User.findById(userId);
    if (user) {
      const now = new Date();
      const lastActivity = user.lastActivity || now;
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

/**
 * @desc    Get all study history for the logged-in user
 */
export const getStudyHistory = async (req, res) => {
  try {
    const history = await StudyMaterial.find({ userId: req.id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve history." });
  }
};

/**
 * @desc    Delete specific study material
 */
export const deleteStudyMaterial = async (req, res) => {
  try {
    const material = await StudyMaterial.findOneAndDelete({
      _id: req.params.id,
      userId: req.id,
    });
    if (!material)
      return res.status(404).json({ success: false, message: "Not found." });
    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Delete failed." });
  }
};
