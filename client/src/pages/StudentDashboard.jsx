import React, { useState, useEffect } from 'react';
import { User, FileText, Upload, Award, LogOut, Plus, X } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [portfolios, setPortfolios] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', description: '', projectLink: '' });

    useEffect(() => {
        if (!user.id) {
            navigate('/'); // Redirect to login if no user
            return;
        }
        fetchPortfolios();
    }, [user, navigate]);

    const fetchPortfolios = async () => {
        try {
            // In a real app we would pass the token in headers
            // For now fetching by studentId query param as implemented in backend
            const res = await axios.get(`http://localhost:5000/api/portfolio?studentId=${user.id}`);
            setPortfolios(res.data);
        } catch (error) {
            console.error("Error fetching portfolios:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/portfolio', {
                ...newProject,
                studentId: user.id
            });
            setIsModalOpen(false);
            setNewProject({ title: '', description: '', projectLink: '' });
            fetchPortfolios(); // Refresh list
        } catch (error) {
            console.error("Error uploading project:", error);
            alert("Failed to upload project");
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 relative">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg flex flex-col">
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-bold text-indigo-600">Student Panel</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                        <User size={20} className="mr-3" /> Profile
                    </a>
                    <a href="#" className="flex items-center p-3 bg-indigo-50 text-indigo-600 rounded-lg transition-colors">
                        <FileText size={20} className="mr-3" /> My Projects
                    </a>
                    <button onClick={() => setIsModalOpen(true)} className="w-full flex items-center p-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors text-left">
                        <Upload size={20} className="mr-3" /> Upload Project
                    </button>
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
                    <h2 className="text-3xl font-bold text-gray-800">My Dashboard</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Welcome, <strong>{user.name}</strong></span>
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                    </div>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium">Total Projects</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{portfolios.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium">Pending Reviews</h3>
                        <p className="text-3xl font-bold text-yellow-600 mt-2">
                            {portfolios.filter(p => p.status === 'pending').length}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-500 text-sm font-medium">Approved Projects</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {portfolios.filter(p => p.status === 'approved').length}
                        </p>
                    </div>
                </div>

                {/* Recent Projects Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-800">My Projects</h3>
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center text-sm bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                            <Plus size={16} className="mr-2" /> New Project
                        </button>
                    </div>
                    <div className="p-6">
                        {portfolios.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">No projects uploaded yet.</div>
                        ) : (
                            <div className="grid gap-4">
                                {portfolios.map((item) => (
                                    <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <div className="flex items-center space-x-4">
                                            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{item.title}</h4>
                                                <p className="text-sm text-gray-500">{item.description.substring(0, 50)}...</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                item.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {isModalOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl transform transition-all">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Upload Project</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow"
                                    value={newProject.title}
                                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                    placeholder="e.g. AI Portfolio System"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                    placeholder="Briefly describe your project..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Link (Optional)</label>
                                <input
                                    type="url"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-shadow"
                                    value={newProject.projectLink}
                                    onChange={(e) => setNewProject({ ...newProject, projectLink: e.target.value })}
                                    placeholder="https://github.com/..."
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all transform active:scale-95"
                            >
                                Submit Project
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
