import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';

enableScreens();

import HomeScreen from './src/screens/HomeScreen';
import TaskScreen from './src/screens/TaskScreen';
import TimerScreen from './src/screens/TimerScreen';
import StatsScreen from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, string> = {
  首页: '🏠',
  任务: '📋',
  专注: '⏱',
  统计: '📊',
};

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  return (
    <View style={styles.tabIcon}>
      <Text style={[styles.tabEmoji, focused && styles.tabEmojiActive]}>
        {TAB_ICONS[label]}
      </Text>
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
        {label}
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBar,
            tabBarIcon: ({ focused }) => (
              <TabIcon label={route.name} focused={focused} />
            ),
          })}>
          <Tab.Screen name="首页" component={HomeScreen} />
          <Tab.Screen name="任务" component={TaskScreen} />
          <Tab.Screen name="专注" component={TimerScreen} />
          <Tab.Screen name="统计" component={StatsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FDF6F0',
    borderTopWidth: 1,
    borderTopColor: '#EEE4DC',
    height: 72,
    paddingBottom: 8,
    paddingTop: 6,
  },
  tabIcon: { alignItems: 'center', justifyContent: 'center' },
  tabEmoji: { fontSize: 22, opacity: 0.45 },
  tabEmojiActive: { opacity: 1 },
  tabLabel: { fontSize: 11, color: '#B0A090', marginTop: 2 },
  tabLabelActive: { color: '#C8373B', fontWeight: '600' },
});
