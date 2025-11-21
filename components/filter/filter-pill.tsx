import { theme } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type FilterPillProps = {
    label: string;
    isSelected: boolean;
    onPress: () => void;
};

const FilterPill = ({ label, isSelected, onPress }: FilterPillProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                isSelected && styles.containerActive
            ]}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
        >
            <Text style={[
                styles.text,
                isSelected && styles.textActive
            ]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.textMuted,
        minWidth: 70,
        alignItems: 'center',
    },
    containerActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    text: {
        color: theme.colors.textMuted,
    },
    textActive: {
        color: theme.colors.textOnPrimary,
    },
});

export default FilterPill;