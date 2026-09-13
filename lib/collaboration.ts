/**
 * Real-time Collaboration System
 * WebSocket-based collaborative coding
 */

export interface CollaboratorPresence {
  id: string;
  name: string;
  color: string;
  cursor?: { line: number; column: number };
  selection?: { start: { line: number; column: number }; end: { line: number; column: number } };
}

export interface CollaborativeEdit {
  userId: string;
  timestamp: number;
  type: 'insert' | 'delete' | 'replace';
  position: { line: number; column: number };
  content: string;
}

export class CollaborationManager {
  private ws: WebSocket | null = null;
  private collaborators: Map<string, CollaboratorPresence> = new Map();
  private projectId: string | null = null;
  private userId: string;
  private onEditCallbacks: ((edit: CollaborativeEdit) => void)[] = [];
  private onPresenceCallbacks: ((collaborators: CollaboratorPresence[]) => void)[] = [];

  constructor(userId: string) {
    this.userId = userId;
  }

  connect(projectId: string, wsUrl: string = 'ws://localhost:3001'): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.projectId = projectId;
        this.ws = new WebSocket(`${wsUrl}/collaborate/${projectId}`);

        this.ws.onopen = () => {
          console.log('Collaboration connected');
          this.send({ type: 'join', userId: this.userId, projectId });
          resolve();
        };

        this.ws.onmessage = (event) => {
          this.handleMessage(JSON.parse(event.data));
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('Collaboration disconnected');
          this.reconnect();
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.collaborators.clear();
  }

  private reconnect() {
    if (this.projectId) {
      setTimeout(() => {
        console.log('Attempting to reconnect...');
        this.connect(this.projectId!);
      }, 3000);
    }
  }

  private handleMessage(message: any) {
    switch (message.type) {
      case 'edit':
        this.onEditCallbacks.forEach(cb => cb(message.edit));
        break;
      
      case 'presence':
        this.updatePresence(message.collaborator);
        break;
      
      case 'collaborators':
        this.collaborators.clear();
        message.collaborators.forEach((c: CollaboratorPresence) => {
          this.collaborators.set(c.id, c);
        });
        this.notifyPresenceChange();
        break;
      
      case 'user_left':
        this.collaborators.delete(message.userId);
        this.notifyPresenceChange();
        break;
    }
  }

  private updatePresence(collaborator: CollaboratorPresence) {
    this.collaborators.set(collaborator.id, collaborator);
    this.notifyPresenceChange();
  }

  private notifyPresenceChange() {
    const collaboratorList = Array.from(this.collaborators.values());
    this.onPresenceCallbacks.forEach(cb => cb(collaboratorList));
  }

  sendEdit(edit: Omit<CollaborativeEdit, 'userId' | 'timestamp'>) {
    const fullEdit: CollaborativeEdit = {
      ...edit,
      userId: this.userId,
      timestamp: Date.now()
    };
    
    this.send({ type: 'edit', edit: fullEdit });
  }

  sendCursorPosition(line: number, column: number) {
    this.send({
      type: 'cursor',
      userId: this.userId,
      position: { line, column }
    });
  }

  onEdit(callback: (edit: CollaborativeEdit) => void) {
    this.onEditCallbacks.push(callback);
  }

  onPresenceChange(callback: (collaborators: CollaboratorPresence[]) => void) {
    this.onPresenceCallbacks.push(callback);
  }

  getCollaborators(): CollaboratorPresence[] {
    return Array.from(this.collaborators.values());
  }

  private send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  // Simulate for offline/demo mode
  static createOfflineManager(userId: string): CollaborationManager {
    const manager = new CollaborationManager(userId);
    console.log('Running in offline mode - collaboration disabled');
    return manager;
  }
}
