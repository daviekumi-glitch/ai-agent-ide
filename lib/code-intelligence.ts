/**
 * Advanced Code Intelligence System
 * Provides IntelliSense, autocomplete, linting, and AI-powered suggestions
 */

export interface CodeSuggestion {
  label: string;
  kind: 'function' | 'variable' | 'class' | 'method' | 'property' | 'keyword';
  detail?: string;
  documentation?: string;
  insertText: string;
}

export interface LintError {
  line: number;
  column: number;
  severity: 'error' | 'warning' | 'info';
  message: string;
}

export class CodeIntelligence {
  private keywords: Record<string, string[]> = {
    javascript: ['const', 'let', 'var', 'function', 'class', 'if', 'else', 'for', 'while', 'return', 'import', 'export', 'async', 'await'],
    python: ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'try', 'except', 'with', 'as'],
    typescript: ['const', 'let', 'var', 'function', 'class', 'interface', 'type', 'if', 'else', 'for', 'while', 'return', 'import', 'export', 'async', 'await'],
  };

  async getCompletions(
    code: string,
    position: { line: number; column: number },
    language: string
  ): Promise<CodeSuggestion[]> {
    const suggestions: CodeSuggestion[] = [];
    
    // Get current word being typed
    const lines = code.split('\n');
    const currentLine = lines[position.line] || '';
    const beforeCursor = currentLine.substring(0, position.column);
    const wordMatch = beforeCursor.match(/[\w.]+$/);
    const currentWord = wordMatch ? wordMatch[0] : '';

    // Add keyword suggestions
    const languageKeywords = this.keywords[language] || this.keywords.javascript;
    languageKeywords.forEach(keyword => {
      if (keyword.startsWith(currentWord)) {
        suggestions.push({
          label: keyword,
          kind: 'keyword',
          detail: `${language} keyword`,
          insertText: keyword
        });
      }
    });

    // Add common patterns
    if (currentWord.length >= 2) {
      suggestions.push(
        {
          label: 'console.log',
          kind: 'function',
          detail: 'Log to console',
          documentation: 'Output a message to the console',
          insertText: 'console.log($1)'
        },
        {
          label: 'function',
          kind: 'function',
          detail: 'Create a function',
          insertText: 'function ${1:name}(${2:params}) {\n  $0\n}'
        }
      );
    }

    return suggestions;
  }

  async lintCode(code: string, language: string): Promise<LintError[]> {
    const errors: LintError[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      // Check for common syntax errors
      if (line.includes('console.log') && !line.includes(');')) {
        errors.push({
          line: index + 1,
          column: line.indexOf('console.log'),
          severity: 'error',
          message: 'Missing closing parenthesis'
        });
      }

      // Check for unused variables (simple heuristic)
      const varMatch = line.match(/(?:const|let|var)\s+(\w+)/);
      if (varMatch) {
        const varName = varMatch[1];
        const restOfCode = lines.slice(index + 1).join('\n');
        if (!restOfCode.includes(varName)) {
          errors.push({
            line: index + 1,
            column: line.indexOf(varName),
            severity: 'warning',
            message: `Variable '${varName}' is declared but never used`
          });
        }
      }
    });

    return errors;
  }

  async analyzeCode(code: string, language: string): Promise<{
    complexity: number;
    suggestions: string[];
    quality: 'excellent' | 'good' | 'fair' | 'poor';
  }> {
    const lines = code.split('\n').filter(l => l.trim());
    const complexity = this.calculateComplexity(code);
    const suggestions: string[] = [];

    // Analyze code quality
    if (code.includes('var ')) {
      suggestions.push('Consider using const or let instead of var');
    }
    
    if (lines.length > 100) {
      suggestions.push('Consider breaking this file into smaller modules');
    }

    const quality = complexity < 10 ? 'excellent' : 
                    complexity < 20 ? 'good' : 
                    complexity < 30 ? 'fair' : 'poor';

    return { complexity, suggestions, quality };
  }

  private calculateComplexity(code: string): number {
    let complexity = 1;
    const patterns = [/\bif\b/g, /\bfor\b/g, /\bwhile\b/g, /\bcase\b/g, /\bswitch\b/g, /\bcatch\b/g];
    
    patterns.forEach(pattern => {
      const matches = code.match(pattern);
      complexity += matches ? matches.length : 0;
    });

    return complexity;
  }
}

export const codeIntelligence = new CodeIntelligence();
