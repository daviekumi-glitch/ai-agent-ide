/**
 * Client-side authentication for the offline-capable app.
 * Users are stored in localStorage with PBKDF2-hashed passwords (WebCrypto).
 * This is real device-local auth — no server, no plaintext passwords.
 */

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: number;
}

interface StoredUser {
  id: string;
  email: string;
  name: string;
  salt: string;
  hash: string;
  createdAt: number;
}

const USERS_KEY = 'ai-agent-ide-users';
const SESSION_KEY = 'ai-agent-ide-session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function readUsers(): StoredUser[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

async function hashPassword(password: string, saltHex: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = Uint8Array.from(saltHex.match(/.{2}/g)!.map((b) => parseInt(b, 16)));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' }, key, 256);
  return Array.from(new Uint8Array(bits)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function toPublic(u: StoredUser): User {
  return { id: u.id, email: u.email, name: u.name, createdAt: u.createdAt };
}

export const ClientAuth = {
  async register(email: string, password: string, name: string): Promise<{ success: boolean; message: string }> {
    const users = readUsers();
    const normalized = email.trim().toLowerCase();
    if (users.some((u) => u.email === normalized)) {
      return { success: false, message: 'User already exists' };
    }
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }
    const salt = randomHex(16);
    const stored: StoredUser = {
      id: randomHex(16),
      email: normalized,
      name: name.trim(),
      salt,
      hash: await hashPassword(password, salt),
      createdAt: Date.now(),
    };
    users.push(stored);
    writeUsers(users);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: stored.id, expiresAt: Date.now() + SESSION_DURATION }));
    return { success: true, message: 'Account created' };
  },

  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    const users = readUsers();
    const stored = users.find((u) => u.email === email.trim().toLowerCase());
    if (!stored) return { success: false, message: 'Invalid email or password' };
    const hash = await hashPassword(password, stored.salt);
    if (hash !== stored.hash) return { success: false, message: 'Invalid email or password' };
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: stored.id, expiresAt: Date.now() + SESSION_DURATION }));
    return { success: true, message: 'Signed in' };
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
      if (!session || session.expiresAt < Date.now()) return null;
      const stored = readUsers().find((u) => u.id === session.userId);
      return stored ? toPublic(stored) : null;
    } catch {
      return null;
    }
  },
};
