'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';
import { translations } from '@/lib/i18n';

interface Project {
  id: string;
  name: string;
  type: string;
  description: string;
  created: string;
  lastModified: string;
}

export default function ProjectsPage() {
  const { locale } = useTheme();
  const t = translations[locale];
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'web',
    description: ''
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const saved = localStorage.getItem('projects');
    if (saved) setProjects(JSON.parse(saved));
  };

  const saveProjects = (newProjects: Project[]) => {
    localStorage.setItem('projects', JSON.stringify(newProjects));
    setProjects(newProjects);
  };

  const handleCreate = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      description: formData.description,
      created: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    saveProjects([...projects, newProject]);
    setShowModal(false);
    setFormData({ name: '', type: 'web', description: '' });
  };

  const handleUpdate = () => {
    if (!editingProject) return;
    const updated = projects.map(p => 
      p.id === editingProject.id 
        ? { ...p, ...formData, lastModified: new Date().toISOString() }
        : p
    );
    saveProjects(updated);
    setEditingProject(null);
    setShowModal(false);
    setFormData({ name: '', type: 'web', description: '' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this project?')) {
      saveProjects(projects.filter(p => p.id !== id));
    }
  };

  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      type: project.type,
      description: project.description
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">{t.projects}</h1>
          <button
            onClick={() => { setEditingProject(null); setShowModal(true); }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            + {t.createNewProject}
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-500/60 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{project.name}</h3>
                  <span className="text-sm text-purple-400">{project.type}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(project)}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">{project.description || 'No description'}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Created: {new Date(project.created).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-500 text-lg mb-4">No projects yet</div>
            <button
              onClick={() => { setEditingProject(null); setShowModal(true); }}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {t.createNewProject}
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-purple-500/30">
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingProject ? t.edit : t.create} {t.projects}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">{t.projectName}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">{t.projectType}</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-purple-500 focus:outline-none"
                  >
                    <option value="web">Web App</option>
                    <option value="mobile">Mobile App</option>
                    <option value="automation">Automation</option>
                    <option value="code">Code</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">{t.description}</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => { setShowModal(false); setEditingProject(null); }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg transition-all"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={editingProject ? handleUpdate : handleCreate}
                  disabled={!formData.name}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg transition-all disabled:opacity-50"
                >
                  {t.save}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
