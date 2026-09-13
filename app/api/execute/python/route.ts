import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { error: 'Invalid code provided' },
        { status: 400 }
      );
    }

    // Execute Python code in a controlled environment
    const output = await executePythonCode(code);
    
    return NextResponse.json({
      success: true,
      output: output.stdout,
      error: output.stderr,
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Execution failed',
        success: false 
      },
      { status: 500 }
    );
  }
}

async function executePythonCode(code: string): Promise<{ stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', ['-c', code]);
    
    let stdout = '';
    let stderr = '';

    python.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    python.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    python.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        resolve({ stdout, stderr: stderr || 'Execution failed' });
      }
    });

    python.on('error', (error) => {
      reject(error);
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      python.kill();
      reject(new Error('Execution timeout'));
    }, 30000);
  });
}
