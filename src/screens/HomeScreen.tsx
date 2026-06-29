import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TASKS = [
  { id: '1', title: '背单词', duration: '25分钟', color: '#E8B4B8' },
  { id: '2', title: '阅读', duration: '30分钟', color: '#F4C2A1' },
  { id: '3', title: '写作业', duration: '45分钟', color: '#B8D4E8' },
  { id: '4', title: '练习钢琴', duration: '20分钟', color: '#C8E8B4' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>今天也是努力的一天</Text>
            <Text style={styles.date}>元气满满，加油！</Text>
          </View>
          <View style={styles.characterPlaceholder}>
            <Text style={styles.characterEmoji}>🏮</Text>
          </View>
        </View>

        {/* Quick Focus Card */}
        <View style={styles.quickCard}>
          <View>
            <Text style={styles.quickTitle}>片刻 10 分钟</Text>
            <Text style={styles.quickSub}>休息一下，放松心情</Text>
          </View>
          <TouchableOpacity style={styles.quickBtn}>
            <Text style={styles.quickBtnText}>开始</Text>
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>今日任务</Text>
          <TouchableOpacity>
            <Text style={styles.sectionMore}>查看全部</Text>
          </TouchableOpacity>
        </View>

        {/* Task List */}
        {TASKS.map(task => (
          <TouchableOpacity key={task.id} style={styles.taskItem}>
            <View style={[styles.taskDot, { backgroundColor: task.color }]} />
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>{task.title}</Text>
              <Text style={styles.taskDuration}>{task.duration}</Text>
            </View>
            <Text style={styles.taskArrow}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Bottom Banners */}
        <View style={styles.bannerRow}>
          <TouchableOpacity style={[styles.banner, { backgroundColor: '#C8373B' }]}>
            <Text style={styles.bannerEmoji}>⏱</Text>
            <Text style={styles.bannerText}>计划专注</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.banner, { backgroundColor: '#8B6F47' }]}>
            <Text style={styles.bannerEmoji}>📖</Text>
            <Text style={styles.bannerText}>今日计划</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />
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
  headerText: { flex: 1 },
  greeting: { fontSize: 18, fontWeight: '700', color: '#2D1B0E' },
  date: { fontSize: 13, color: '#8A6E5A', marginTop: 4 },
  characterPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FDEAE0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8B4B8',
  },
  characterEmoji: { fontSize: 36 },
  quickCard: {
    marginHorizontal: 20,
    backgroundColor: '#C8373B',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#C8373B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  quickTitle: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  quickSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  quickBtn: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  quickBtnText: { color: '#C8373B', fontWeight: '700', fontSize: 14 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#2D1B0E' },
  sectionMore: { fontSize: 13, color: '#C8373B' },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  taskDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  taskInfo: { flex: 1 },
  taskTitle: { fontSize: 15, fontWeight: '600', color: '#2D1B0E' },
  taskDuration: { fontSize: 12, color: '#8A6E5A', marginTop: 2 },
  taskArrow: { fontSize: 20, color: '#C8A882' },
  bannerRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  banner: {
    flex: 1,
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  bannerEmoji: { fontSize: 28 },
  bannerText: { fontSize: 14, fontWeight: '600', color: '#FFF' },
});
