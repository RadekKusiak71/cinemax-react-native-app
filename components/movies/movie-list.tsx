import MovieCard from "@/components/movies/movie-card";
import { Movie } from "@/types/movies";
import React from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";

type MovieListProps = {
    data?: Movie[];
    onRefresh?: () => void;
    refreshing?: boolean;
    onPressMovie: (id: number) => void;
};

const MovieList = ({ data, onRefresh, refreshing, onPressMovie }: MovieListProps) => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            refreshControl={
                onRefresh ? (
                    <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} />
                ) : undefined
            }
            renderItem={({ item }) => (
                <MovieCard
                    id={item.id}
                    imageUrl={item.poster_path}
                    title={item.title}
                    releaseDate={item.release_date}
                    onPress={() => onPressMovie(item.id)}
                />
            )}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No movies found.</Text>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
    columnWrapper: {
        justifyContent: "space-between",
        gap: 12,
    },
    emptyContainer: {
        padding: 40,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
        textAlign: "center",
    },
});

export default MovieList;