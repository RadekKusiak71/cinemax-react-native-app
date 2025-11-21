import { useListCinemaMovies, useListGenres } from "@/api/movies";
import CinemaHeader from "@/components/cinema/cinema-header";
import FilterList from "@/components/filter/filter-list";
import MovieList from "@/components/movies/movie-list";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { theme } from "@/constants/theme";
import { useCinema } from "@/context/cinema-context";
import { keepPreviousData } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieView = () => {
    const router = useRouter();
    const { cinema } = useCinema();
    const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);

    const {
        data: movies,
        isLoading: isMoviesLoading,
        isError,
        isFetching,
        refetch
    } = useListCinemaMovies(
        cinema?.id,
        selectedGenres,
        { enabled: !!cinema, placeholderData: keepPreviousData }
    );

    const { data: genres, isLoading: isGenresLoading } = useListGenres({
        enabled: !!cinema
    });

    const handleChangeCinema = useCallback(() => router.push("/cinema-select"), [router]);

    const handleGenreSelect = useCallback((genre: string) => {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    }, []);

    const genreItems = useMemo(() => genres?.map(g => g.name) || [], [genres]);
    const isInitialLoad = isGenresLoading || (isMoviesLoading && !movies);

    if (isInitialLoad) return <LoadingScreen message="Loading movies..." />;

    if (isError) {
        return (
            <SafeAreaView style={styles.center}>
                <Text style={styles.errorText}>Unable to load movies.</Text>
                <TouchableOpacity onPress={handleChangeCinema} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Choose another cinema</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <CinemaHeader cinemaName={cinema?.name} onChange={handleChangeCinema} />

            <View>
                <FilterList
                    title="Filter by Genre"
                    items={genreItems}
                    selectedItems={selectedGenres}
                    onSelect={handleGenreSelect}
                />

                {isFetching && !isMoviesLoading && (
                    <View style={styles.refetchingContainer}>
                        <ActivityIndicator size="small" color={theme.colors.primary} />
                        <Text style={styles.refetchingText}>Updating results...</Text>
                    </View>
                )}
            </View>

            <MovieList
                data={movies}
                onRefresh={refetch}
                refreshing={isFetching}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background || '#fff',
        gap: 10
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginBottom: 16,
    },
    retryButton: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    retryButtonText: { color: '#000' },
    refetchingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 4,
        gap: 8,
    },
    refetchingText: {
        fontSize: 12,
        color: theme.colors.textMuted || '#666',
    }
});

export default MovieView;