import TimeSlot from "@/components/showtimes/time-slot";
import { theme } from "@/constants/theme";
import { ShowtimesByFormat } from "@/types/showtimes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoadingScreen } from "../ui/loading-screen";

interface ShowtimesListProps {
    isLoading: boolean;
    showtimes?: ShowtimesByFormat[];
    onTimePress: (showtimeId: number) => void;
}

const ShowtimesList = ({ isLoading, showtimes, onTimePress }: ShowtimesListProps) => {

    if (isLoading) return <LoadingScreen message="Loading showtimes..." />;

    if (!showtimes || showtimes.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No showtimes available for this date.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {showtimes.map((group, index) => (
                <View key={`${group.format_key}-${index}`} style={styles.groupContainer}>

                    <Text style={styles.formatHeader}>
                        {group.format_key}
                    </Text>

                    <View style={styles.timeGrid}>
                        {group.showtimes.map((timeItem) => (
                            <TimeSlot
                                key={timeItem.id}
                                time={timeItem.start_time}
                                onPress={() => onTimePress(timeItem.id)}
                            />
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 30,
        marginTop: 10,
    },
    mainTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.textPrimary,
        marginBottom: 16,
    },
    groupContainer: {
        marginBottom: 24,
    },
    formatHeader: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.textMuted,
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    loadingContainer: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
        marginTop: 10,
    },
    emptyText: {
        fontSize: 14,
        color: theme.colors.textMuted,
        fontStyle: 'italic',
    }
});

export default ShowtimesList;