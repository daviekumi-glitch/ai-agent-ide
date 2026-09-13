/**
 * Client-side code generation + execution engine.
 * Runs fully on-device — required for the offline Android build.
 */

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/\s+/g, '');
}

function camelize(str: string): string {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
    index === 0 ? word.toLowerCase() : word.toUpperCase()
  ).replace(/\s+/g, '');
}

export function generateCode(prompt: string, framework: string): string {
  const name = capitalize(prompt) || 'MyApp';
  const templates: Record<string, string> = {
    react: `import React, { useState } from 'react';

interface ${name}Props {
  title?: string;
}

export const ${name}: React.FC<${name}Props> = ({ title }) => {
  const [data, setData] = useState<string[]>([]);
  return (
    <div className="container">
      <h1>{title || '${name}'}</h1>
      {/* Add your component logic here */}
    </div>
  );
};`,
    nodejs: `const express = require('express');
const router = express.Router();

// ${prompt} endpoint
router.post('/${prompt.toLowerCase().replace(/\s+/g, '-')}', async (req, res) => {
  try {
    const result = await processRequest(req.body);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

async function processRequest(data) {
  // Add your business logic here
  return data;
}

module.exports = router;`,
    'react-native': `import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ${name}() {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>${name}</Text>
      <TouchableOpacity onPress={() => setCount(count + 1)} style={styles.button}>
        <Text style={styles.buttonText}>Pressed {count} times</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  button: { marginTop: 16, padding: 16, backgroundColor: '#3b82f6', borderRadius: 8 },
  buttonText: { color: '#fff' },
});`,
    flutter: `import 'package:flutter/material.dart';

class ${name}Widget extends StatelessWidget {
  const ${name}Widget({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('${name}')),
      body: const Center(child: Text('${prompt} content here')),
    );
  }
}`,
  };
  return templates[framework] || `// Generated code for: ${prompt}\n// Framework: ${framework}\n\nfunction ${camelize(prompt)}() {\n  // Your implementation here\n}`;
}

/**
 * Execute JavaScript on-device with a captured console.
 * Runs in the page context — for trusted user-written snippets only.
 */
export function executeJavaScript(code: string, timeoutMs = 3000): string {
  const logs: string[] = [];
  const fakeConsole = {
    log: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
    error: (...args: unknown[]) => logs.push('ERROR: ' + args.map(String).join(' ')),
    warn: (...args: unknown[]) => logs.push('WARN: ' + args.map(String).join(' ')),
  };
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function('console', `"use strict";\n${code}`);
    fn(fakeConsole);
    return logs.length
      ? `✓ Code executed successfully\n\nOutput:\n${logs.join('\n')}`
      : '✓ Code executed successfully\n\nOutput: (no console.log output)';
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return `✗ Runtime Error:\n${message}\n\nPartial output:\n${logs.join('\n')}`;
  }
}

export function executeCode(code: string, language: string): string {
  if (language === 'javascript' || language === 'typescript') {
    return executeJavaScript(code);
  }
  if (language === 'python') {
    const issues: string[] = [];
    if (!/:\s*/.test(code)) issues.push('no indented blocks found');
    if (/;\s*$/m.test(code)) issues.push('semicolons look like JavaScript');
    const lines = code.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#')).length;
    return `🐍 Python analysis (on-device)\n\nStatements analyzed: ${lines}\n${
      issues.length ? `⚠ Possible issues: ${issues.join(', ')}\n` : '✓ Basic syntax checks passed\n'
    }Note: this build runs fully offline, so Python code is analyzed on-device rather than executed by a Python runtime.`;
  }
  if (language === 'java' || language === 'kotlin') {
    const braces = (code.match(/{/g) || []).length - (code.match(/}/g) || []).length;
    return `☕ ${language === 'java' ? 'Java' : 'Kotlin'} analysis (on-device)\n\nBrace balance: ${braces === 0 ? '✓ balanced' : `✗ off by ${braces}`}\nNote: offline build — code is analyzed, not compiled with the JDK.`;
  }
  return `Analysis complete (on-device, offline build)\n\nLanguage: ${language}\nLength: ${code.length} chars`;
}
