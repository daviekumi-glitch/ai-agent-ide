import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt, agent, framework } = await request.json();

    // Simulate AI code generation
    const generatedCode = await generateCode(prompt, agent, framework);

    return NextResponse.json({ 
      success: true, 
      code: generatedCode,
      agent,
      framework
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

async function generateCode(prompt: string, agent: string, framework: string): Promise<string> {
  // Simulate AI generation delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Template code based on framework
  if (framework === 'react-native') {
    return `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>${prompt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});`;
  } else if (framework === 'flutter') {
    return `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('${prompt}')),
        body: Center(
          child: Text(
            'Generated with AI Agent',
            style: TextStyle(fontSize: 24),
          ),
        ),
      ),
    );
  }
}`;
  }

  return `// Generated code for: ${prompt}\n// Framework: ${framework}\n// Agent: ${agent}\n\nconsole.log("AI-generated code placeholder");`;
}
