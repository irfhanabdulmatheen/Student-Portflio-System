import React, { useState, useEffect } from 'react';
import { Users, BookOpen, LogOut, Search, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user.id) {
            navigate('/');
            return;
        }
        fetchPortfolios();
    }, [user, navigate]);

    const fetchPortfolios = async () => {
        try {
            // In a real app, teacher should see all students' portfolios or filter by class
            // Here we just fetch all for simplicity
            const res = await axios.get('http://localhost:5000/api/portfolio');
            setPortfolios(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching portfolios:", error);
            setLoading(false);
        }
    };

    const handleReview = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/portfolio/${id}`, { status });
            fetchPortfolios(); // Refresh
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update status");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const pendingPortfolios = portfolios.filter(p => p.status === 'pending');
    const reviewedPortfolios = portfolios.filter(p => p.status !== 'pending');

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-emerald-600">Teacher Panel</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center p-3 bg-emerald-50 text-emerald-600 rounded-lg transition-colors">
                        <Users size={20} className="mr-3" /> Students
                    </a>
                    <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors">
                        <BookOpen size={20} className="mr-3" /> Project Reviews
                    </a>
                </nav>
                <div className="p-4 border-t">
                    <button onClick={handleLogout} className="flex items-center w-full p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut size={20} className="mr-3" /> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Overview</h2>
                        <p className="text-gray-500 mt-1">Manage student portfolios and reviews.</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input type="text" placeholder="Search students..." className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
                        </div>
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'T'}
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-emerald-500">
                        <h3 className="text-gray-500 text-sm font-medium">Total Projects</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{portfolios.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-yellow-500">
                        <h3 className="text-gray-500 text-sm font-medium">Pending Approvals</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{pendingPortfolios.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
                        <h3 className="text-gray-500 text-sm font-medium">Reviewed Projects</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{reviewedPortfolios.length}</p>
                    </div>
                </div>

                {/* Pending Reviews List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">Pending Project Approvals</h3>
                    </div>
                    <div className="overflow-x-auto">
                        {pendingPortfolios.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">No pending projects.</div>
                        ) : (
                            <table className="w-full text-left text-sm text-gray-600">
                                <thead className="bg-gray-50 text-gray-700 uppercase font-medium">
                                    <tr>
                                        <th className="px-6 py-4">Student</th>
                                        <th className="px-6 py-4">Project Title</th>
                                        <th className="px-6 py-4">Date Submitted</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {pendingPortfolios.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">
                                                {item.student ? item.student.name : 'Unknown'}
                                            </td>
                                            <td className="px-6 py-4">{item.title}</td>
                                            <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 flex space-x-2">
                                                <button onClick={() => handleReview(item._id, 'approved')} className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                                                    <CheckCircle size={16} className="mr-1" /> Approve
                                                </button>
                                                <button onClick={() => handleReview(item._id, 'rejected')} className="text-red-500 hover:text-red-600 font-medium flex items-center">
                                                    <XCircle size={16} className="mr-1" /> Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TeacherDashboard;
