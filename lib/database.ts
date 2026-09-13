/**
 * Real-time Database Integration
 * Supports localStorage (client) and in-memory (server) with real-time sync
 * Created by: Davie Kuminga
 */

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  framework: string;
  files: ProjectFile[];
  createdAt: number;
  updatedAt: number;
}

export interface ProjectFile {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  framework: string;
  code: string;
  icon: string;
}

export class Database {
  private static instance: Database;
  private projects: Map<string, Project> = new Map();
  private listeners: Map<string, Set<Function>> = new Map();

  private constructor() {
    // Initialize with some default templates
    this.initializeDefaults();
  }

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  private initializeDefaults() {
    // Will be called once on server start
  }

  /**
   * Subscribe to real-time updates
   */
  subscribe(collection: string, callback: Function): () => void {
    if (!this.listeners.has(collection)) {
      this.listeners.set(collection, new Set());
    }

    this.listeners.get(collection)!.add(callback);

    return () => {
      this.listeners.get(collection)?.delete(callback);
    };
  }

  /**
   * Notify listeners of changes
   */
  private notify(collection: string, data: any) {
    this.listeners.get(collection)?.forEach(callback => callback(data));
  }

  /**
   * Create new project
   */
  async createProject(userId: string, data: Partial<Project>): Promise<Project> {
    const project: Project = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      name: data.name || 'Untitled Project',
      description: data.description || '',
      framework: data.framework || 'react',
      files: data.files || [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.projects.set(project.id, project);
    this.notify('projects', { action: 'create', data: project });

    return project;
  }

  /**
   * Get all projects for a user
   */
  async getProjects(userId: string): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(p => p.userId === userId)
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }

  /**
   * Get project by ID
   */
  async getProject(projectId: string): Promise<Project | null> {
    return this.projects.get(projectId) || null;
  }

  /**
   * Update project
   */
  async updateProject(projectId: string, updates: Partial<Project>): Promise<Project | null> {
    const project = this.projects.get(projectId);
    if (!project) return null;

    const updated = {
      ...project,
      ...updates,
      updatedAt: Date.now()
    };

    this.projects.set(projectId, updated);
    this.notify('projects', { action: 'update', data: updated });

    return updated;
  }

  /**
   * Delete project
   */
  async deleteProject(projectId: string): Promise<boolean> {
    const deleted = this.projects.delete(projectId);
    if (deleted) {
      this.notify('projects', { action: 'delete', data: { id: projectId } });
    }
    return deleted;
  }

  /**
   * Add file to project
   */
  async addFile(projectId: string, file: Omit<ProjectFile, 'id'>): Promise<ProjectFile | null> {
    const project = this.projects.get(projectId);
    if (!project) return null;

    const newFile: ProjectFile = {
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...file
    };

    project.files.push(newFile);
    project.updatedAt = Date.now();

    this.projects.set(projectId, project);
    this.notify('projects', { action: 'update', data: project });

    return newFile;
  }

  /**
   * Update file content
   */
  async updateFile(projectId: string, fileId: string, content: string): Promise<boolean> {
    const project = this.projects.get(projectId);
    if (!project) return false;

    const file = project.files.find(f => f.id === fileId);
    if (!file) return false;

    file.content = content;
    project.updatedAt = Date.now();

    this.projects.set(projectId, project);
    this.notify('projects', { action: 'update', data: project });

    return true;
  }

  /**
   * Delete file from project
   */
  async deleteFile(projectId: string, fileId: string): Promise<boolean> {
    const project = this.projects.get(projectId);
    if (!project) return false;

    const index = project.files.findIndex(f => f.id === fileId);
    if (index === -1) return false;

    project.files.splice(index, 1);
    project.updatedAt = Date.now();

    this.projects.set(projectId, project);
    this.notify('projects', { action: 'update', data: project });

    return true;
  }

  /**
   * Get templates
   */
  async getTemplates(): Promise<Template[]> {
    return [
      {
        id: 'react-app',
        name: 'React App',
        description: 'Modern React application with TypeScript',
        framework: 'react',
        icon: '⚛️',
        code: `import React from 'react';

function App() {
  return (
    <div className="container">
      <h1>Welcome to React!</h1>
      <p>Start building your amazing app here.</p>
    </div>
  );
}

export default App;`
      },
      {
        id: 'node-api',
        name: 'Node.js API',
        description: 'Express REST API server',
        framework: 'nodejs',
        icon: '🟢',
        code: `const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', timestamp: Date.now() });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`
      },
      {
        id: 'flutter-app',
        name: 'Flutter App',
        description: 'Cross-platform mobile app',
        framework: 'flutter',
        icon: '📱',
        code: `import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: HomeScreen(),
    );
  }
}`
      }
    ];
  }
}

// Export singleton instance
export const db = Database.getInstance();
