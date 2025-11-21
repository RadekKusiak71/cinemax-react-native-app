import { useRetrieveMovieDetails } from "@/api/movies";
import { useListCinemaMovieShowtimes } from "@/api/showtimes";
import MovieDetails from "@/components/movies/details/movie-details";
import DateStrip from "@/components/showtimes/date-strip"; // 1. Import DateStrip
import ShowtimesList from "@/components/showtimes/showtimes-list"; // 2. Import ShowtimesList
import { theme } from "@/constants/theme";
import { useCinema } from "@/context/cinema-context";
import { keepPreviousData } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

const MovieDetailView = () => {
    const router = useRouter();
    const { cinema } = useCinema();
    const { movie_id } = useLocalSearchParams();
    const [refreshing, setRefreshing] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const {
        data: movie,
        isLoading,
        isError,
        refetch
    } = useRetrieveMovieDetails(
        Number(movie_id),
        { enabled: !!movie_id, placeholderData: keepPreviousData },
    );

    const formattedDate = selectedDate.toLocaleDateString('en-CA');

    const {
        data: movieShowtimes,
        isLoading: isLoadingShowtimes,
        isError: isErrorShowtimes,
        refetch: refetchShowtimes
    } = useListCinemaMovieShowtimes(
        Number(movie_id),
        Number(cinema?.id),
        formattedDate,
        { enabled: !!movie_id && !!cinema?.id, placeholderData: keepPreviousData },
    );

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            await Promise.all([refetch(), refetchShowtimes()]);
        } finally {
            setRefreshing(false);
        }
    }, [refetch, refetchShowtimes]);

    const handleTimePress = (showtimeId: number) => {
        console.log("Go to booking for:", showtimeId);
        // router.push(`/booking/${showtimeId}`);
    };

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
            {/* Only render Details if data exists */}
            {movie && (
                <MovieDetails
                    movie={movie}
                    IsLoading={isLoading}
                    IsError={isError}
                    refetch={refetch}
                />
            )}

            <DateStrip
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
            />

            <ShowtimesList
                isLoading={isLoadingShowtimes}
                showtimes={movieShowtimes}
                onTimePress={handleTimePress}
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