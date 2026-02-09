const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    projectLink: { type: String }, // URL to project (e.g., GitHub)
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    feedback: { type: String }, // Teacher's feedback
    grade: { type: String }, // Grade given by teacher
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
