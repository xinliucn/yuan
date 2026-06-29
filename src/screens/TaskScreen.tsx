import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INITIAL_TASKS = [
  { id: '1', title: '背单词', duration: 25, completed: true, tag: '学习' },
  { id: '2', title: '阅读《百年孤独》', duration: 30, completed: false, tag: '阅读' },
  { id: '3', title: '写作业', duration: 45, completed: false, tag: '学习' },
  { id: '4', title: '练习钢琴', duration: 20, completed: false, tag: '音乐' },
  { id: '5', title: '整理笔记', duration: 15, completed: true, tag: '学习' },
];

const TAG_COLORS: Record<string, string> = {
  学习: '#FDEAE0',
  阅读: '#E8F4FD',
  音乐: '#F0FDED',
};

export default function TaskScreen() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState('25');

  const toggle = (id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const addTask = () => {
    if (!newTitle.trim()) return;
    setTasks(prev => [
      ...prev,
      {
        id: String(Date.now()),
        title: newTitle.trim(),
        duration: parseInt(newDuration, 10) || 25,
        completed: false,
        tag: '学习',
      },
    ]);
    setNewTitle('');
    setNewDuration('25');
    setModalVisible(false);
  };

  const done = tasks.filter(t => t.completed).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>最近专注任务</Text>
        <Text style={styles.progress}>{done}/{tasks.length}</Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>{done}</Text>
          <Text style={styles.summaryLabel}>已完成</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>{tasks.length - done}</Text>
          <Text style={styles.summaryLabel}>待完成</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>
            {tasks.reduce((s, t) => s + t.duration, 0)}
          </Text>
          <Text style={styles.summaryLabel}>总分钟</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {tasks.map(task => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskCard}
            onPress={() => toggle(task.id)}
            activeOpacity={0.8}>
            <View
              style={[
                styles.checkbox,
                task.completed && styles.checkboxDone,
              ]}>
              {task.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.taskBody}>
              <Text
                style={[
                  styles.taskTitle,
                  task.completed && styles.taskTitleDone,
                ]}>
                {task.title}
              </Text>
              <View style={styles.taskMeta}>
                <View
                  style={[
                    styles.tagBadge,
                    { backgroundColor: TAG_COLORS[task.tag] ?? '#F5F0EB' },
                  ]}>
                  <Text style={styles.tagText}>{task.tag}</Text>
                </View>
                <Text style={styles.durationText}>{task.duration} 分钟</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+ 新建任务</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>新建任务</Text>
            <TextInput
              style={styles.input}
              placeholder="任务名称"
              placeholderTextColor="#C4A882"
              value={newTitle}
              onChangeText={setNewTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="专注时长（分钟）"
              placeholderTextColor="#C4A882"
              keyboardType="number-pad"
              value={newDuration}
              onChangeText={setNewDuration}
            />
            <View style={styles.sheetBtns}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={addTask}>
                <Text style={styles.confirmText}>确认</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDF6F0' },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#2D1B0E' },
  progress: { fontSize: 14, color: '#C8373B', fontWeight: '600' },
  summaryCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 12,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryNum: { fontSize: 22, fontWeight: '700', color: '#C8373B' },
  summaryLabel: { fontSize: 12, color: '#8A6E5A', marginTop: 2 },
  divider: { width: 1, backgroundColor: '#EEE4DC' },
  list: { flex: 1, paddingHorizontal: 20 },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#C8373B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxDone: { backgroundColor: '#C8373B' },
  checkmark: { color: '#FFF', fontSize: 12, fontWeight: '700' },
  taskBody: { flex: 1 },
  taskTitle: { fontSize: 15, fontWeight: '600', color: '#2D1B0E' },
  taskTitleDone: { textDecorationLine: 'line-through', color: '#B0A090' },
  taskMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4, gap: 8 },
  tagBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  tagText: { fontSize: 11, color: '#8A6E5A' },
  durationText: { fontSize: 12, color: '#8A6E5A' },
  fab: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#C8373B',
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#C8373B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  fabText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FDF6F0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    gap: 14,
  },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: '#2D1B0E', textAlign: 'center' },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#2D1B0E',
    borderWidth: 1,
    borderColor: '#EEE4DC',
  },
  sheetBtns: { flexDirection: 'row', gap: 12, marginTop: 4 },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#EEE4DC',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelText: { color: '#8A6E5A', fontWeight: '600', fontSize: 15 },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#C8373B',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  confirmText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});
