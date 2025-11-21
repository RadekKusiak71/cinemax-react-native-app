import {StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import {theme} from "@/constants/theme";

type CinemaCardProps = {
    id: number
    name: string
    city: string
    isActive: boolean
    onPress: () => void;
}

const CinemaCard: React.FC<CinemaCardProps> = ({id, name, city, isActive, onPress}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.card,
                isActive ? styles.activeCard : null,
            ]}
        >
            <Text style={styles.cinemaNameText}>{name}</Text>
            <Text style={styles.cinemaCityText}>{city}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1.2,
        borderColor: theme.colors.textMuted,
        padding: 20,
        marginBottom: 15,
    },
    activeCard: {
        borderColor: theme.colors.primary,
    },
    cinemaNameText: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: 8
    },
    cinemaCityText: {
        fontSize: 16,
        color: theme.colors.textMuted,
    },
})

export default CinemaCard;