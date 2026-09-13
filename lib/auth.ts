/**
 * Real Base64 Authentication System
 * Created by: Davie Kuminga
 */

import { cookies } from 'next/headers';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: number;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

// Simple in-memory user store (replace with real database in production)
const users = new Map<string, { email: string; password: string; name: string; id: string }>();

export class AuthService {
  private static SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  /**
   * Encode credentials to Base64
   */
  static encodeCredentials(email: string, password: string): string {
    const credentials = `${email}:${password}`;
    return Buffer.from(credentials).toString('base64');
  }

  /**
   * Decode Base64 credentials
   */
  static decodeCredentials(base64: string): { email: string; password: string } {
    const decoded = Buffer.from(base64, 'base64').toString('utf-8');
    const [email, password] = decoded.split(':');
    return { email, password };
  }

  /**
   * Register new user
   */
  static async register(email: string, password: string, name: string): Promise<{ success: boolean; message: string; token?: string }> {
    if (users.has(email)) {
      return { success: false, message: 'User already exists' };
    }

    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    users.set(email, {
      id: userId,
      email,
      password: this.encodeCredentials(email, password),
      name
    });

    const token = this.generateToken({ id: userId, email, name, createdAt: Date.now() });

    return { success: true, message: 'Registration successful', token };
  }

  /**
   * Login user
   */
  static async login(email: string, password: string): Promise<{ success: boolean; message: string; token?: string; user?: User }> {
    const user = users.get(email);

    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    const encodedPassword = this.encodeCredentials(email, password);

    if (user.password !== encodedPassword) {
      return { success: false, message: 'Invalid credentials' };
    }

    const userData: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: Date.now()
    };

    const token = this.generateToken(userData);

    return { 
      success: true, 
      message: 'Login successful', 
      token,
      user: userData
    };
  }

  /**
   * Generate session token
   */
  static generateToken(user: User): string {
    const session: AuthSession = {
      user,
      token: Buffer.from(JSON.stringify(user) + Date.now()).toString('base64'),
      expiresAt: Date.now() + this.SESSION_DURATION
    };

    return Buffer.from(JSON.stringify(session)).toString('base64');
  }

  /**
   * Verify session token
   */
  static verifyToken(token: string): { valid: boolean; user?: User; message?: string } {
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const session: AuthSession = JSON.parse(decoded);

      if (session.expiresAt < Date.now()) {
        return { valid: false, message: 'Session expired' };
      }

      return { valid: true, user: session.user };
    } catch (error) {
      return { valid: false, message: 'Invalid token' };
    }
  }

  /**
   * Get current user from request
   */
  static async getCurrentUser(): Promise<User | null> {
    const cookieStore = cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) return null;

    const result = this.verifyToken(token);
    return result.valid ? result.user! : null;
  }

  /**
   * Logout user
   */
  static async logout(): Promise<void> {
    const cookieStore = cookies();
    cookieStore.delete('auth_token');
  }
}
