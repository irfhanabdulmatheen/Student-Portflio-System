import React, { useState, useEffect } from 'react';
import { LogOut, Phone, Download, FileText, FolderOpen, ExternalLink, Github } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

    // Dummy fallback data
    const dummySgpa = [7.14, 7.43, 7.95, 7.68, 7.32];
    const dummyCgpa = "7.52";
    const dummyPlacementFa = "68.7";
    const dummyArrearCount = "0";
    const dummyFeesDue = "12,000";
    const dummyRegNo = "7376231CS181";
    const dummyDept = "B.E. - COMPUTER SCIENCE AND ENGINEERING";
    const dummyStudentPhone = "+91 98765 43210";
    const dummyMentorPhone = "+91 99012 34567";
    const defaultAvatar = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Professional blue/white avatar

    useEffect(() => {
        if (!user.id) {
            navigate('/');
            return;
        }
        // In a real app, we would fetch the latest user data here to get the new fields
        // For now, we assume user data in localStorage is up to date or we'd need a profile endpoint
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const StatusBadge = ({ status }) => (
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${status === 'CONTINUING' ? 'text-purple-400' : 'text-gray-400'}`}>
            {status}
        </span>
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 p-4 font-sans">
            {/* Header */}
            {/* <header className="flex justify-between items-center mb-6 px-4">
                <h2 className="text-xl font-semibold">Welcome, {user.name}</h2>
                <button onClick={handleLogout} className="text-red-500 hover:text-red-400">
                    <LogOut size={20} />
                </button>
            </header> */}

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN: Identity & Logout */}
                <div className="flex flex-col gap-5 lg:sticky lg:top-4 h-fit">
                    {/* Identity Card (Compact Box) */}
                    <div className="bg-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-sm border border-slate-200">
                        {/* Indigo Accent Line */}
                        <div className="absolute right-6 top-10 bottom-10 w-1 bg-indigo-500 rounded-full opacity-20"></div>

                        <div>
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="relative mb-4">
                                    <img
                                        src={defaultAvatar}
                                        alt="Profile"
                                        className="w-24 h-24 rounded-full object-cover border-4 border-indigo-50 p-1 bg-white shadow-sm"
                                    />
                                    <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                                </div>

                                <h1 className="text-xl font-bold leading-tight tracking-wide uppercase text-slate-800 mb-1">
                                    {user.name || 'STUDENT NAME'}
                                </h1>
                                <div className="space-y-1">
                                    <p className="text-slate-500 font-mono text-xs tracking-widest font-bold">{user.registerNumber || dummyRegNo}</p>
                                    <div className="flex items-center justify-center gap-2 text-indigo-600">
                                        <Phone size={12} />
                                        <p className="text-[11px] font-black">{user.phone || dummyStudentPhone}</p>
                                    </div>
                                    <p className="text-indigo-600 font-bold text-[10px] tracking-[0.2em] uppercase mt-3 bg-indigo-50 px-4 py-1 rounded-full inline-block border border-indigo-100">
                                        CONTINUING
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6 border-t border-slate-100 pt-8">
                                <div>
                                    <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.25em] mb-2">Semester & Department</p>
                                    <p className="text-xs font-bold text-slate-700 leading-relaxed uppercase">
                                        {user.semester || 'SEMESTER VI'} <br />
                                        <span className="text-slate-400 text-[10px] font-semibold normal-case block mt-1">{user.department || dummyDept}</span>
                                    </p>
                                </div>

                                <div>
                                    <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.25em] mb-2">Academic Mentor</p>
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-xs text-slate-700 font-bold tracking-wide">
                                            {user.mentor?.name || 'KUMAR S'}
                                            <span className="text-slate-400 text-[10px] ml-2 font-mono uppercase font-normal">({user.mentor?.contact || 'CS11084'})</span>
                                        </p>
                                        <div className="flex items-center gap-2 text-emerald-600">
                                            <Phone size={12} />
                                            <p className="text-[11px] font-black">{user.mentor?.phone || dummyMentorPhone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logout Button (Left Side) */}
                    <button
                        onClick={handleLogout}
                        className="w-full bg-white hover:bg-red-50 text-red-500 p-4 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 flex items-center justify-center gap-3 font-bold group"
                    >
                        <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                        <span className="tracking-widest uppercase text-xs">Sign Out</span>
                    </button>
                </div>

                {/* RIGHT COLUMN: Performance & Stats */}
                <div className="lg:col-span-2 space-y-4">

                    {/* Top Section: Small Graph + Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Shrunk SGPA Chart (Light) */}
                        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
                            <h3 className="text-[10px] font-bold mb-4 text-slate-400 uppercase tracking-widest text-center">SGPA ANALYSIS</h3>
                            <div className="h-32 flex items-end justify-between px-2 pb-2 relative">
                                {/* Grid Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-50">
                                    {[10, 8, 6, 4, 2, 0].map(val => (
                                        <div key={val} className="w-full border-t border-slate-100 h-0"></div>
                                    ))}
                                </div>

                                {/* Bars */}
                                {(user.sgpa?.length ? user.sgpa : dummySgpa).map((score, index) => (
                                    <div key={index} className="flex flex-col items-center z-10 group w-6">
                                        <div
                                            className="w-full bg-indigo-500 rounded-t-[2px] transition-all duration-300 hover:bg-indigo-400 relative"
                                            style={{ height: `${(score / 10) * 110}px` }}
                                        >
                                            <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {score}
                                            </span>
                                        </div>
                                        <span className="mt-2 text-[9px] text-slate-400 font-bold">
                                            {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'][index]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Cards (Condensed, Light) */}
                        <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
                            <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">CGPA</p>
                                <h2 className="text-xl font-bold text-slate-800 leading-none mt-1">{user.cgpa || dummyCgpa}</h2>
                            </div>
                            <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
                                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Arrears</p>
                                <h2 className="text-xl font-bold text-slate-800 leading-none mt-1">{user.arrearCount !== undefined ? user.arrearCount : dummyArrearCount}</h2>
                            </div>
                            <div className="bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center border-l-4 border-l-red-400">
                                <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Fees Due</p>
                                <h2 className="text-xl font-bold text-slate-800 leading-none mt-1">₹{user.feesDue || dummyFeesDue}</h2>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Previous Semester Marksheet (Light) */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <h3 className="text-slate-800 font-bold tracking-tight">Previous Semester Mark Sheet</h3>
                                <span className="text-[10px] font-bold text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100 uppercase tracking-wider">SEMESTER V</span>
                            </div>
                            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-md shadow-indigo-100">
                                <Download size={14} />
                                DOWNLOAD RESULT
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-slate-500">
                                <thead className="text-[10px] text-slate-400 uppercase border-b border-slate-100">
                                    <tr>
                                        <th className="py-3 text-left tracking-widest">Subject Code</th>
                                        <th className="py-3 text-left tracking-widest">Subject Name</th>
                                        <th className="py-3 text-center tracking-widest">Grade</th>
                                        <th className="py-3 text-center tracking-widest">Result</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {[
                                        { code: '21CS501', name: 'Software Engineering', grade: 'O', result: 'P' },
                                        { code: '21CS502', name: 'Computer Networks', grade: 'A+', result: 'P' },
                                        { code: '21CS503', name: 'Theory of Computation', grade: 'A', result: 'P' },
                                        { code: '21CS504', name: 'Cloud Computing', grade: 'O', result: 'P' },
                                        { code: '21CS505', name: 'Artificial Intelligence', grade: 'A+', result: 'P' }
                                    ].map((sub, i) => (
                                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="py-4 text-slate-400 font-mono text-xs">{sub.code}</td>
                                            <td className="py-4 text-slate-700 font-bold text-xs">{sub.name}</td>
                                            <td className="py-4 text-center">
                                                <span className={`font-black text-xs ${sub.grade === 'O' ? 'text-emerald-500' : 'text-indigo-500'}`}>{sub.grade}</span>
                                            </td>
                                            <td className="py-4 text-center">
                                                <span className="text-emerald-500 font-black text-[10px] tracking-widest">PASS</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Project Dashboard Section */}
                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <FolderOpen size={20} className="text-indigo-500" />
                            <h3 className="text-slate-800 font-bold tracking-tight text-lg">Project Dashboard</h3>
                            <span className="ml-auto text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 uppercase tracking-widest">3 PROJECTS</span>
                        </div>

                        <div className="space-y-4">
                            {/* Project 1 */}
                            <div className="border border-slate-100 rounded-xl p-5 hover:shadow-md transition-all duration-300 group">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Student Portfolio Management System</h4>
                                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">A full-stack web application for managing student academic portfolios, enabling role-based access for students, teachers, and administrators.</p>
                                    </div>
                                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-widest whitespace-nowrap h-fit">IN PROGRESS</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {['React', 'Node.js', 'MongoDB', 'Express', 'TailwindCSS'].map(tech => (
                                        <span key={tech} className="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">{tech}</span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 text-slate-400">
                                    <a href="#" className="flex items-center gap-1 text-[10px] font-bold hover:text-indigo-500 transition-colors uppercase tracking-wider">
                                        <Github size={12} /> Repository
                                    </a>
                                    <a href="#" className="flex items-center gap-1 text-[10px] font-bold hover:text-indigo-500 transition-colors uppercase tracking-wider">
                                        <ExternalLink size={12} /> Live Demo
                                    </a>
                                    <span className="ml-auto text-[9px] text-slate-300 font-mono">Updated 2 days ago</span>
                                </div>
                            </div>

                            {/* Project 2 */}
                            <div className="border border-slate-100 rounded-xl p-5 hover:shadow-md transition-all duration-300 group">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">AI-Powered Chatbot for Campus Queries</h4>
                                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">An intelligent chatbot that answers FAQs about campus facilities, exam schedules, and academic processes using natural language processing.</p>
                                    </div>
                                    <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 uppercase tracking-widest whitespace-nowrap h-fit">REVIEW</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {['Python', 'Flask', 'OpenAI API', 'SQLite'].map(tech => (
                                        <span key={tech} className="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">{tech}</span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 text-slate-400">
                                    <a href="#" className="flex items-center gap-1 text-[10px] font-bold hover:text-indigo-500 transition-colors uppercase tracking-wider">
                                        <Github size={12} /> Repository
                                    </a>
                                    <span className="ml-auto text-[9px] text-slate-300 font-mono">Updated 1 week ago</span>
                                </div>
                            </div>

                            {/* Project 3 */}
                            <div className="border border-slate-100 rounded-xl p-5 hover:shadow-md transition-all duration-300 group">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Weather Forecasting Dashboard</h4>
                                        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">A responsive dashboard that displays real-time weather data and 7-day forecasts using public APIs with interactive charts and map visualizations.</p>
                                    </div>
                                    <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-200 uppercase tracking-widest whitespace-nowrap h-fit">COMPLETED</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {['React', 'Chart.js', 'OpenWeather API', 'CSS Modules'].map(tech => (
                                        <span key={tech} className="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">{tech}</span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 text-slate-400">
                                    <a href="#" className="flex items-center gap-1 text-[10px] font-bold hover:text-indigo-500 transition-colors uppercase tracking-wider">
                                        <Github size={12} /> Repository
                                    </a>
                                    <a href="#" className="flex items-center gap-1 text-[10px] font-bold hover:text-indigo-500 transition-colors uppercase tracking-wider">
                                        <ExternalLink size={12} /> Live Demo
                                    </a>
                                    <span className="ml-auto text-[9px] text-slate-300 font-mono">Updated 3 weeks ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default StudentDashboard;
