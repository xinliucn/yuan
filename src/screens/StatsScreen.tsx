import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WEEK_DATA = [
  { day: '一', minutes: 45 },
  { day: '二', minutes: 90 },
  { day: '三', minutes: 60 },
  { day: '四', minutes: 120 },
  { day: '五', minutes: 75 },
  { day: '六', minutes: 30 },
  { day: '日', minutes: 105 },
];

const MAX_MINUTES = 120;

const RECORDS = [
  { label: '今日专注', value: '1小时45分', delta: '+15分', up: true },
  { label: '本周总计', value: '8小时25分', delta: '+2小时', up: true },
  { label: '连续天数', value: '7天', delta: '🔥', up: true },
  { label: '完成任务', value: '23个', delta: '-2个', up: false },
];

const TAGS = [
  { name: '学习', minutes: 180, color: '#C8373B' },
  { name: '阅读', minutes: 90, color: '#E8954A' },
  { name: '音乐', minutes: 45, color: '#4A90C8' },
  { name: '其他', minutes: 30, color: '#8B6F47' },
];

const TOTAL_TAG = TAGS.reduce((s, t) => s + t.minutes, 0);

export default function StatsScreen() {
  const [tab, setTab] = useState<'week' | 'month'>('week');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>统计报告</Text>
        <View style={styles.headerRight}>
          <Text style={styles.headerCharacter}>🎎</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.cardGrid}>
          {RECORDS.map(r => (
            <View key={r.label} style={styles.statCard}>
              <Text style={styles.statValue}>{r.value}</Text>
              <Text style={styles.statLabel}>{r.label}</Text>
              <Text style={[styles.statDelta, !r.up && styles.statDeltaDown]}>
                {r.delta}
              </Text>
            </View>
          ))}
        </View>

        {/* Tab Switch */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, tab === 'week' && styles.tabActive]}
            onPress={() => setTab('week')}>
            <Text style={[styles.tabText, tab === 'week' && styles.tabTextActive]}>
              本周
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'month' && styles.tabActive]}
            onPress={() => setTab('month')}>
            <Text style={[styles.tabText, tab === 'month' && styles.tabTextActive]}>
              本月
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bar Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>每日专注（分钟）</Text>
          <View style={styles.bars}>
            {WEEK_DATA.map((d, i) => (
              <View key={d.day} style={styles.barItem}>
                <Text style={styles.barValue}>{d.minutes}</Text>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        height: `${(d.minutes / MAX_MINUTES) * 100}%`,
                        backgroundColor:
                          i === 3 ? '#C8373B' : 'rgba(200,55,59,0.4)',
                      },
                    ]}
                  />
                </View>
                <Text style={styles.barDay}>{d.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tag Distribution */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>分类分布</Text>
          {TAGS.map(tag => (
            <View key={tag.name} style={styles.tagRow}>
              <View style={styles.tagLeft}>
                <View style={[styles.tagDot, { backgroundColor: tag.color }]} />
                <Text style={styles.tagName}>{tag.name}</Text>
              </View>
              <View style={styles.tagBarTrack}>
                <View
                  style={[
                    styles.tagBarFill,
                    {
                      width: `${(tag.minutes / TOTAL_TAG) * 100}%`,
                      backgroundColor: tag.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.tagMinutes}>{tag.minutes}分</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6F0' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#2D1B0E' },
  headerRight: {},
  headerCharacter: { fontSize: 32 },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  statValue: { fontSize: 20, fontWeight: '700', color: '#2D1B0E' },
  statLabel: { fontSize: 12, color: '#8A6E5A', marginTop: 4 },
  statDelta: { fontSize: 12, color: '#4CAF50', marginTop: 6, fontWeight: '600' },
  statDeltaDown: { color: '#C8373B' },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 20,
    backgroundColor: '#EEE4DC',
    borderRadius: 20,
    padding: 4,
    marginBottom: 16,
  },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 18, alignItems: 'center' },
  tabActive: { backgroundColor: '#C8373B' },
  tabText: { fontSize: 14, color: '#8A6E5A', fontWeight: '500' },
  tabTextActive: { color: '#FFF', fontWeight: '700' },
  chartCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  chartTitle: { fontSize: 14, fontWeight: '600', color: '#2D1B0E', marginBottom: 16 },
  bars: { flexDirection: 'row', height: 140, alignItems: 'flex-end', gap: 8 },
  barItem: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end' },
  barValue: { fontSize: 9, color: '#8A6E5A', marginBottom: 2 },
  barTrack: {
    width: '100%',
    height: 100,
    backgroundColor: '#F5EDE4',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: { width: '100%', borderRadius: 6 },
  barDay: { fontSize: 11, color: '#8A6E5A', marginTop: 6 },
  sectionCard: {
    marginHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#2D1B0E', marginBottom: 14 },
  tagRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  tagLeft: { flexDirection: 'row', alignItems: 'center', width: 60, gap: 6 },
  tagDot: { width: 8, height: 8, borderRadius: 4 },
  tagName: { fontSize: 13, color: '#2D1B0E' },
  tagBarTrack: {
    flex: 1,
    height: 8,
    backgroundColor: '#F5EDE4',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tagBarFill: { height: '100%', borderRadius: 4 },
  tagMinutes: { fontSize: 12, color: '#8A6E5A', width: 36, textAlign: 'right' },
});
