import React, { useState, useEffect } from 'react';
import { User, Mail, GraduationCap, Award, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

    // In a real app, fetch fresh data from API

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
            <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-indigo-600 h-32 relative">
                    <button
                        onClick={() => navigate('/student-dashboard')}
                        className="absolute top-4 left-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                </div>

                <div className="px-8 pb-8">
                    <div className="relative -top-16 mb-4">
                        <div className="inline-block relative">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.name}&background=fff&color=4F46E5&size=128&font-size=0.4`}
                                alt="Profile"
                                className="h-32 w-32 rounded-full border-4 border-white shadow-md bg-white"
                            />
                            <span className="absolute bottom-2 right-2 h-6 w-6 bg-green-500 border-4 border-white rounded-full"></span>
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-gray-500 font-medium">{user.role.toUpperCase()}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600 mr-4">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                                    <p className="text-gray-800 font-medium">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600 mr-4">
                                    <User size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">User ID</p>
                                    <p className="text-gray-800 font-medium">{user.id || user._id}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 mr-4">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">CGPA</p>
                                    <p className="text-2xl text-gray-800 font-bold">{user.cgpa || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                                <div className="bg-amber-100 p-3 rounded-lg text-amber-600 mr-4">
                                    <GraduationCap size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Academic Year</p>
                                    <p className="text-xl text-gray-800 font-bold">{user.year || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
