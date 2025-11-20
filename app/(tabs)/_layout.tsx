import { useAuth } from "@/context/auth-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Tabs initialRouteName="movies-list" screenOptions={{ headerShown: false }}>

            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="cog" color={color} size={24} />
                    ),
                }}
            />

            <Tabs.Screen
                name="movies-list"
                options={{
                    headerShown: false,
                    tabBarLabel: 'Movies',
                    tabBarIcon: ({ color }) => (
                        <FontAwesome name="film" color={color} size={24} />
                    )
                }}
            />

            <Tabs.Protected guard={isAuthenticated}>
                <Tabs.Screen
                    name="ticket-history"
                    options={{
                        headerShown: false,
                        tabBarLabel: 'Tickets',
                        tabBarIcon: ({ color }) => (
                            <FontAwesome name="ticket" color={color} size={24} />
                        )
                    }}
                />
            </Tabs.Protected>

        </Tabs>
    )
};

export default TabsLayout;