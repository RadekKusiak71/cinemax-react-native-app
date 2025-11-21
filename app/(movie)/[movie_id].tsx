import { useRetrieveMovieDetails } from "@/api/movies";
import MovieDetails from "@/components/movies/details/movie-details";
import { theme } from "@/constants/theme";
import { keepPreviousData } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

const MovieDetailView = () => {
    const router = useRouter();
    const { movie_id } = useLocalSearchParams();
    const [refreshing, setRefreshing] = useState(false);

    const {
        data: movie,
        isLoading,
        isError,
        refetch
    } = useRetrieveMovieDetails(
        Number(movie_id),
        { enabled: !!movie_id, placeholderData: keepPreviousData },
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await refetch();
        } finally {
            setRefreshing(false);
        }
    }, [refetch]);

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={[theme.colors.primary]}
                    tintColor={theme.colors.primary}
                />
            }
        >
            <MovieDetails
                movie={movie!!}
                IsLoading={isLoading}
                IsError={isError}
                refetch={refetch}
            />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
    },
});

export default MovieDetailView;