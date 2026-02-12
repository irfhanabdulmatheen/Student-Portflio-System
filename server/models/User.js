const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
    cgpa: { type: Number, default: 0.0 },
    year: { type: String, default: '1st Year' },
    attendance: {
        type: [String],
        default: ['Present', 'Present', 'Present', 'Present', 'Absent', 'Present', 'Present'] // 7 periods default
    },
    registerNumber: { type: String },
    department: { type: String },
    semester: { type: String },
    mentor: {
        name: { type: String },
        contact: { type: String }
    },
    sgpa: { type: [Number], default: [] }, // Array of SGPA for each semester
    feesDue: { type: String, default: '-' },
    placementEligible: { type: Boolean, default: true },
    arrearCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
