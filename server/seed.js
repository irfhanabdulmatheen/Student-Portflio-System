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
            { name: 'Student User', email: 'student@example.com', password: 'student', role: 'student' },
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
