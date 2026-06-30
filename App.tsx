import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens';
import Ionicons from 'react-native-vector-icons/Ionicons';

enableScreens();

import HomeScreen from './src/screens/HomeScreen';
import TaskScreen from './src/screens/TaskScreen';
import TimerScreen from './src/screens/TimerScreen';
import StatsScreen from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  首页: { active: 'home', inactive: 'home-outline' },
  任务: { active: 'checkbox', inactive: 'checkbox-outline' },
  专注: { active: 'timer', inactive: 'timer-outline' },
  统计: { active: 'bar-chart', inactive: 'bar-chart-outline' },
};

function TabIcon({ label, focused }: { label: string; focused: boolean }) {
  const icons = TAB_ICONS[label];
  return (
    <View style={styles.tabIcon}>
      <Ionicons
        name={focused ? icons.active : icons.inactive}
        size={24}
        color={focused ? '#C8373B' : '#B0A090'}
      />
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
  tabLabel: { fontSize: 11, color: '#B0A090', marginTop: 2 },
  tabLabelActive: { color: '#C8373B', fontWeight: '600' },
});
