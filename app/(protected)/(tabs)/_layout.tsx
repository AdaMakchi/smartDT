import { Tabs } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

import TabBar from '@/components/TabBar';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
<Tabs
        tabBar={props=> <TabBar {...props} />}
    >

{/* <Tabs
  screenOptions={{
    tabBarActiveTintColor: "#FFFFFF", // White active icon/text
    tabBarInactiveTintColor: "#BFDBFE", // Light blue inactive icon/text
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarBackground: TabBarBackground,
    tabBarStyle: {
      backgroundColor: "#1E40AF", // Dark blue background
      borderTopWidth: 0,
      height: 60, // Slightly taller for better touch area
      paddingHorizontal: 16, // Side padding
    },
    tabBarItemStyle: {
      borderRadius: 12, // Rounded corners for each tab
      marginHorizontal: 4, // Spacing between tabs
      height: 40, // Inner height of tab items
    },
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "500",
      marginBottom: 4, // Adjust label position
    },
    tabBarIconStyle: {
      marginTop: 4, // Adjust icon position
    },
  }}
>
   */}

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
              name="favorit"
              options={{
                title: 'favorit',
                // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
              }}
          />
          <Tabs.Screen
              name="chat"
              options={{
                title: 'chat',
                // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
              }}
          /><Tabs.Screen
              name="profil"
              options={{
                title: 'profile',
                // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
              }}
          />
       
    </Tabs>

  );
}
