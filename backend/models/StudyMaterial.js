import mongoose from "mongoose";

const studyMaterialSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String, 
        enum: ['summary', 'quiz', 'roadmap', 'flashcards'],
        default: 'summary'
    },
    content: {
        type: String, // This stores the Markdown text from Gemini
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);