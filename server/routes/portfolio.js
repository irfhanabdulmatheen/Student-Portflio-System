const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const User = require('../models/User');

// Middleware to check if user is authenticated (mock for now, should use JWT middleware)
// In a real app, you'd extract user from req.user set by auth middleware

// Get all portfolios (for Teacher/Admin) or specific student's portfolios
router.get('/', async (req, res) => {
    try {
        const { studentId } = req.query;
        let query = {};
        if (studentId) {
            query.student = studentId;
        }
        const portfolios = await Portfolio.find(query).populate('student', 'name email');
        res.json(portfolios);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Create a new portfolio item (Student only)
router.post('/', async (req, res) => {
    try {
        const { title, description, projectLink, studentId } = req.body;

        // In production, studentId should come from the authenticated token
        // const studentId = req.user.id; 

        if (!studentId) return res.status(400).json({ message: 'Student ID required' });

        const newPortfolio = new Portfolio({
            title,
            description,
            projectLink,
            student: studentId
        });

        await newPortfolio.save();
        res.status(201).json(newPortfolio);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Update portfolio (Student can update details, Teacher can add feedback/grade)
router.put('/:id', async (req, res) => {
    try {
        const { title, description, projectLink, feedback, grade, status } = req.body;

        // Logic should check role. 
        // If Student: allow title/desc update.
        // If Teacher: allow feedback/grade/status update.

        // For simplicity now, we just update whatever is sent
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Be careful with $set in production without validation
            { new: true }
        );

        res.json(updatedPortfolio);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Delete portfolio
router.delete('/:id', async (req, res) => {
    try {
        await Portfolio.findByIdAndDelete(req.params.id);
        res.json({ message: 'Portfolio deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
