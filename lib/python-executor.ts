/**
 * Python Code Execution Engine
 * Supports running Python code with proper output handling
 */

export interface PythonExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
}

export class PythonExecutor {
  private static instance: PythonExecutor;

  private constructor() {}

  static getInstance(): PythonExecutor {
    if (!PythonExecutor.instance) {
      PythonExecutor.instance = new PythonExecutor();
    }
    return PythonExecutor.instance;
  }

  async execute(code: string): Promise<PythonExecutionResult> {
    const startTime = Date.now();

    try {
      // Call backend API for Python execution
      const response = await fetch('/api/execute/python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      const executionTime = Date.now() - startTime;

      if (!response.ok) {
        return {
          success: false,
          output: '',
          error: data.error || 'Execution failed',
          executionTime,
        };
      }

      return {
        success: true,
        output: data.output,
        executionTime,
      };
    } catch (error) {
      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: Date.now() - startTime,
      };
    }
  }

  async installPackage(packageName: string): Promise<boolean> {
    try {
      const response = await fetch('/api/execute/python/install', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ package: packageName }),
      });

      return response.ok;
    } catch {
      return false;
    }
  }

  async listPackages(): Promise<string[]> {
    try {
      const response = await fetch('/api/execute/python/packages');
      const data = await response.json();
      return data.packages || [];
    } catch {
      return [];
    }
  }
}
