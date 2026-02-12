const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-portfolio');
        console.log('✅ MongoDB Connected successfully.');

        const users = [
            { name: 'Admin User', email: 'admin@example.com', password: 'admin', role: 'admin' },
            {
                name: 'Irfhan Abdul Matheen H',
                email: 'student@example.com',
                password: 'student',
                role: 'student',
                registerNumber: '7376231CS181',
                department: 'B.E. - COMPUTER SCIENCE AND ENGINEERING',
                semester: 'SEMESTER - VI',
                mentor: {
                    name: 'GUNAVARDINI V',
                    contact: 'CS11084'
                },
                sgpa: [7.14, 7.43, 7.95, 7.68, 7.32],
                cgpa: 7.52,
                feesDue: '-',
                placementEligible: true,
                arrearCount: 0,
                year: '3rd Year'
            },
            {
                name: 'Irfhan Abdul Matheen',
                email: 'irfhanabdulmatheen.cs23@bitsathy.ac.in',
                password: 'bitsathy',
                role: 'student',
                registerNumber: '7376231CS181',
                department: 'B.E. - COMPUTER SCIENCE AND ENGINEERING',
                semester: 'SEMESTER - VI',
                mentor: { name: 'KUMAR S', contact: 'CS11084', phone: '+91 99012 34567' },
                sgpa: [7.14, 7.43, 7.95, 7.68, 7.32],
                cgpa: 7.52,
                feesDue: '-',
                placementEligible: true,
                arrearCount: 0,
                year: '3rd Year'
            },
            {
                name: 'Jaivant',
                email: 'jaivant.cs23@bitsathy.ac.in',
                password: 'bitsathy',
                role: 'student',
                registerNumber: '7376231CS182',
                department: 'B.E. - COMPUTER SCIENCE AND ENGINEERING',
                semester: 'SEMESTER - VI',
                mentor: { name: 'KUMAR S', contact: 'CS11084', phone: '+91 99012 34567' },
                sgpa: [7.50, 7.80, 8.10, 7.90, 7.60],
                cgpa: 7.78,
                feesDue: '-',
                placementEligible: true,
                arrearCount: 0,
                year: '3rd Year'
            },
            { name: 'Teacher User', email: 'teacher@example.com', password: 'teacher', role: 'teacher' }
        ];

        for (const u of users) {
            const existingUser = await User.findOne({ email: u.email });
            if (!existingUser) {
                const hashedPassword = await bcrypt.hash(u.password, 10);
                await User.create({ ...u, password: hashedPassword });
                console.log(`✅ Created ${u.role}: ${u.email} / ${u.password}`);
            } else {
                console.log(`ℹ️ ${u.role} already exists.`);
            }
        }

        process.exit();
    } catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1);
    }
};

seedUsers();
