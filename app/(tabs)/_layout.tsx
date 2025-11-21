import { useAuth } from "@/context/auth-context";
import { useCinema } from "@/context/cinema-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";

const TabsLayout = () => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { cinema, isLoading } = useCinema();

    if (isLoading) {
        return <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    if (!cinema) {
        router.replace('/cinema-select');
    }

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