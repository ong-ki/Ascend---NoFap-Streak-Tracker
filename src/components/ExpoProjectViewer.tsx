import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { X, Copy, Check, Folder, FileCode, Terminal, BookOpen, Layers } from 'lucide-react';
import { Haptics } from '../utils/haptics';

interface ExpoProjectViewerProps {
  isOpen: boolean;
  onClose: () => void;
  isLight?: boolean;
}

const EXPO_FILES: { path: string; language: string; content: string }[] = [
  {
    path: 'package.json (Expo)',
    language: 'json',
    content: `{
  "name": "enso-zen-tracker",
  "version": "1.0.0",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~52.0.0",
    "expo-status-bar": "~2.0.0",
    "react": "18.3.1",
    "react-native": "0.76.5",
    "@react-navigation/native": "^7.0.0",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "@react-navigation/native-stack": "^7.0.0",
    "@react-native-async-storage/async-storage": "1.23.1",
    "expo-notifications": "~0.29.11",
    "expo-linear-gradient": "~14.0.1",
    "expo-blur": "~14.0.1",
    "expo-haptics": "~14.0.0",
    "expo-font": "~13.0.1",
    "@expo-google-fonts/shippori-mincho": "^0.2.3",
    "@expo-google-fonts/noto-sans-jp": "^0.2.3",
    "react-native-reanimated": "~3.16.1",
    "react-native-screens": "~4.4.0",
    "react-native-safe-area-context": "4.12.0",
    "lucide-react-native": "^0.469.0",
    "react-native-svg": "15.8.0"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/react": "~18.3.12",
    "typescript": "^5.3.3"
  },
  "private": true
}`,
  },
  {
    path: 'App.tsx (Expo Entry Point)',
    language: 'typescript',
    content: `/**
 * Enso - Zen Streak Tracker (React Native Expo)
 * Minimalist, quiet tea room aesthetic with Wabi-sabi philosophy
 */
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { Sun, Wind, Compass, Sliders } from 'lucide-react-native';

import { HomeScreen } from './src/screens/HomeScreen';
import { UrgeScreen } from './src/screens/UrgeScreen';
import { ProgressScreen } from './src/screens/ProgressScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarStyle: {
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                position: 'absolute',
                borderTopColor: 'rgba(220, 214, 202, 0.65)',
                height: 64,
                paddingBottom: 8,
                paddingTop: 6,
              },
              tabBarActiveTintColor: '#D9534F',
              tabBarInactiveTintColor: '#787680',
              tabBarLabelStyle: {
                fontSize: 11,
              },
              tabBarIcon: ({ color, size }) => {
                if (route.name === 'Today') return <Sun size={18} color={color} strokeWidth={1.2} />;
                if (route.name === 'Stillness') return <Wind size={18} color={color} strokeWidth={1.2} />;
                if (route.name === 'Path') return <Compass size={18} color={color} strokeWidth={1.2} />;
                return <Sliders size={18} color={color} strokeWidth={1.2} />;
              },
            })}
          >
            <Tab.Screen name="Today" component={HomeScreen} />
            <Tab.Screen name="Stillness" component={UrgeScreen} />
            <Tab.Screen name="Path" component={ProgressScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F1EA',
  },
});`,
  },
  {
    path: 'src/components/EnsoRing.tsx (Expo SVG Enso)',
    language: 'typescript',
    content: `import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

interface EnsoRingProps {
  progressPercent: number; // 0 to 100
  size?: number;
}

export const EnsoRing: React.FC<EnsoRingProps> = ({ progressPercent, size = 260 }) => {
  const center = size / 2;
  const radius = center - 24;
  const circumference = 2 * Math.PI * radius;
  const activeCircumference = circumference * 0.86;
  const strokeDashoffset = circumference - (progressPercent / 100) * activeCircumference;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-105deg' }] }}>
        <Defs>
          <LinearGradient id="ensoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#E8B4BC" />
            <Stop offset="60%" stopColor="#D9534F" />
            <Stop offset="100%" stopColor="#C9A66B" />
          </LinearGradient>
        </Defs>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(215, 206, 192, 0.45)"
          strokeWidth={6}
          strokeDasharray={\`\${activeCircumference} \${circumference}\`}
          fill="none"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#ensoGrad)"
          strokeWidth={7}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </View>
  );
};`,
  },
  {
    path: 'src/components/HankoStamp.tsx (Expo Seal)',
    language: 'typescript',
    content: `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HankoStamp = ({ kanji }: { kanji: string }) => {
  return (
    <View style={styles.seal}>
      <Text style={styles.kanji}>{kanji}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  seal: {
    width: 30,
    height: 30,
    borderWidth: 1.5,
    borderColor: '#D9534F',
    backgroundColor: 'rgba(217, 83, 79, 0.08)',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-2deg' }],
  },
  kanji: {
    color: '#D9534F',
    fontSize: 14,
    fontWeight: 'bold',
  },
});`,
  },
  {
    path: 'src/constants/theme.ts (Zen Palette)',
    language: 'typescript',
    content: `export const ZEN_COLORS = {
  washi: '#F5F1EA',
  sumi: '#1C1C1E',
  sakura: '#E8B4BC',
  matcha: '#A8B89A',
  indigo: '#4A5A7A',
  vermilion: '#D9534F',
  kincha: '#C9A66B',
};`,
  },
];

export const ExpoProjectViewer: React.FC<ExpoProjectViewerProps> = ({
  isOpen,
  onClose,
  isLight = false,
}) => {
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = EXPO_FILES[selectedFileIdx];

  const handleCopy = () => {
    Haptics.success();
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-2xl animate-in fade-in">
      <div className="relative w-full max-w-4xl h-[90vh] flex flex-col">
        <GlassCard variant="default" isLight={isLight} className="p-0 flex flex-col h-full overflow-hidden border-[#DCD6CA] dark:border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-950/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Expo (React Native) Codebase & Setup
                </h3>
                <p className="text-xs text-slate-400">
                  Ready to copy or export for <code className="text-purple-300 font-mono">npx expo start</code>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick CLI Banner */}
          <div className="p-3 bg-purple-950/40 border-b border-purple-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-purple-300 font-mono">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>npx create-expo-app ascend-app -t expo-template-blank-typescript</span>
            </div>
            <span className="text-[11px] text-slate-400">
              Run command: <code className="text-emerald-400">npx expo start</code>
            </span>
          </div>

          {/* Content Area: Sidebar + Editor */}
          <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
            {/* File list sidebar */}
            <div className="w-full sm:w-64 border-b sm:border-b-0 sm:border-r border-white/10 p-3 overflow-y-auto no-scrollbar space-y-1 bg-slate-950/40">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-2 block mb-1">
                Project Files
              </span>
              {EXPO_FILES.map((file, idx) => (
                <button
                  key={file.path}
                  onClick={() => {
                    Haptics.light();
                    setSelectedFileIdx(idx);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left text-xs font-mono flex items-center gap-2 transition-all ${
                    selectedFileIdx === idx
                      ? 'bg-purple-600/30 border border-purple-500/40 text-purple-200 font-bold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">{file.path}</span>
                </button>
              ))}
            </div>

            {/* Code view */}
            <div className="flex-1 flex flex-col bg-slate-950/90 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-slate-900/40">
                <span className="text-xs font-mono text-purple-300 font-semibold">
                  {currentFile.path}
                </span>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white font-medium transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>Copy File</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="flex-1 p-4 overflow-auto text-xs font-mono text-slate-300 leading-relaxed no-scrollbar select-text">
                <code>{currentFile.content}</code>
              </pre>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
