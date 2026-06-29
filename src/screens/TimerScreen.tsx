import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRESETS = [25, 30, 45, 60];

export default function TimerScreen() {
  const [selectedMinutes, setSelectedMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            setFinished(true);
            Vibration.vibrate([0, 500, 200, 500]);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const selectPreset = (min: number) => {
    if (running) return;
    setSelectedMinutes(min);
    setSecondsLeft(min * 60);
    setFinished(false);
  };

  const toggle = () => {
    if (finished) {
      setSecondsLeft(selectedMinutes * 60);
      setFinished(false);
      return;
    }
    setRunning(r => !r);
  };

  const reset = () => {
    setRunning(false);
    setFinished(false);
    setSecondsLeft(selectedMinutes * 60);
  };

  const total = selectedMinutes * 60;
  const progress = secondsLeft / total;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  // Simple SVG-style circle via border approach
  const RADIUS = 120;
  const circumference = 2 * Math.PI * RADIUS;
  const dashOffset = circumference * (1 - progress);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>专注时钟</Text>
      </View>

      {/* Presets */}
      <View style={styles.presets}>
        {PRESETS.map(min => (
          <TouchableOpacity
            key={min}
            style={[
              styles.presetBtn,
              selectedMinutes === min && styles.presetBtnActive,
            ]}
            onPress={() => selectPreset(min)}>
            <Text
              style={[
                styles.presetText,
                selectedMinutes === min && styles.presetTextActive,
              ]}>
              {min}分
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Timer Circle */}
      <View style={styles.circleContainer}>
        <View style={styles.outerRing}>
          <View
            style={[
              styles.progressArc,
              { opacity: running ? 1 : 0.5 },
            ]}
          />
          <View style={styles.innerCircle}>
            <Text style={styles.timerText}>
              {mm}:{ss}
            </Text>
            <Text style={styles.timerLabel}>
              {finished ? '完成！' : running ? '专注中...' : '准备开始'}
            </Text>
          </View>
        </View>
      </View>

      {/* Character area */}
      <View style={styles.characterArea}>
        <Text style={styles.characterEmoji}>
          {finished ? '🎉' : running ? '🎐' : '🏮'}
        </Text>
        <Text style={styles.motivateText}>
          {finished
            ? '太棒了！完成了专注'
            : running
            ? '加油！保持专注状态'
            : '选择时长，开始专注'}
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.resetBtn} onPress={reset}>
          <Text style={styles.resetText}>重置</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.startBtn, finished && styles.startBtnSuccess]}
          onPress={toggle}>
          <Text style={styles.startText}>
            {finished ? '再来一次' : running ? '暂停' : '开始专注'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Mode Tabs */}
      <View style={styles.modeTabs}>
        <TouchableOpacity style={[styles.modeTab, styles.modeTabActive]}>
          <Text style={[styles.modeTabText, styles.modeTabTextActive]}>专注模式</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modeTab}>
          <Text style={styles.modeTabText}>休息模式</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A0A0A' },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#FFF', textAlign: 'center' },
  presets: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  presetBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  presetBtnActive: {
    backgroundColor: '#C8373B',
    borderColor: '#C8373B',
  },
  presetText: { color: 'rgba(255,255,255,0.6)', fontSize: 14 },
  presetTextActive: { color: '#FFF', fontWeight: '700' },
  circleContainer: { alignItems: 'center', marginTop: 24 },
  outerRing: {
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 8,
    borderColor: 'rgba(200,55,59,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(200,55,59,0.08)',
  },
  progressArc: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 8,
    borderColor: '#C8373B',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  innerCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#2A0A0A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 56,
    fontWeight: '200',
    color: '#FFF',
    letterSpacing: 4,
  },
  timerLabel: { fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 8 },
  characterArea: { alignItems: 'center', marginTop: 20 },
  characterEmoji: { fontSize: 48 },
  motivateText: { color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 8 },
  controls: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 14,
    marginTop: 24,
  },
  resetBtn: {
    flex: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetText: { color: '#FFF', fontSize: 14 },
  startBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 28,
    backgroundColor: '#C8373B',
    alignItems: 'center',
    shadowColor: '#C8373B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  startBtnSuccess: { backgroundColor: '#4CAF50' },
  startText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  modeTabs: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    padding: 4,
  },
  modeTab: { flex: 1, paddingVertical: 10, borderRadius: 18, alignItems: 'center' },
  modeTabActive: { backgroundColor: 'rgba(255,255,255,0.15)' },
  modeTabText: { color: 'rgba(255,255,255,0.5)', fontSize: 14 },
  modeTabTextActive: { color: '#FFF', fontWeight: '600' },
});
