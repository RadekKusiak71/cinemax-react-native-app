import FilterPill from "@/components/filter/filter-pill";
import { theme } from "@/constants/theme";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type FilterListProps = {
    items: string[];
    selectedItems: string[];
    onSelect: (item: string) => void;
    title?: string;
};

const FilterList = ({ items, selectedItems, onSelect, title = "Filter by Genre" }: FilterListProps) => {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                data={items}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <FilterPill
                        label={item}
                        isSelected={selectedItems.includes(item)}
                        onPress={() => onSelect(item)}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background || '#fff',
        paddingVertical: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.textPrimary || '#000',
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    listContent: {
        paddingHorizontal: 16,
        gap: 10,
    },
});

export default FilterList;