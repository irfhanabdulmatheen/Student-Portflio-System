
import React from 'react';
import { Users, Settings, Activity, Database, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <h1 className="text-2xl font-bold tracking-wider">ADMIN</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center p-3 bg-gray-800 text-white rounded-lg transition-colors">
                        <Activity size={20} className="mr-3" /> Dashboard
                    </a>
                    <a href="#" className="flex items-center p-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                        <Users size={20} className="mr-3" /> User Management
                    </a>
                    <a href="#" className="flex items-center p-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                        <Database size={20} className="mr-3" /> System Data
                    </a>
                    <a href="#" className="flex items-center p-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
                        <Settings size={20} className="mr-3" /> Settings
                    </a>
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button className="flex items-center w-full p-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
                        <LogOut size={20} className="mr-3" /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">System Overview</h2>
                    <div className="px-4 py-2 bg-white rounded-lg shadow-sm font-medium text-gray-600">
                        Server Status: <span className="text-green-500">Online</span>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-gray-500 text-sm font-bold uppercase">Total Users</h3>
                        <p className="text-4xl font-extrabold text-gray-900 mt-2">1,240</p>
                        <span className="text-xs text-green-500 font-medium">+12% this month</span>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-gray-500 text-sm font-bold uppercase">Active Projects</h3>
                        <p className="text-4xl font-extrabold text-gray-900 mt-2">856</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-gray-500 text-sm font-bold uppercase">Teachers</h3>
                        <p className="text-4xl font-extrabold text-gray-900 mt-2">32</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="text-gray-500 text-sm font-bold uppercase">System Alerts</h3>
                        <p className="text-4xl font-extrabold text-red-500 mt-2">0</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Recent System Activities</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                                <div className="h-2 w-2 rounded-full bg-blue-500 mr-3"></div>
                                <span className="font-medium text-gray-700 mr-2">New User Registration</span>
                                <span className="text-gray-500">- Student ID #{202400 + i} registered just now.</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
