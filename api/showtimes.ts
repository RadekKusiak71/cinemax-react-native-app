import { useQuery } from "@tanstack/react-query";
import apiClient from "./client";

const SHOWTIMES_URLS = {
    cinemaMovieShowtimes: (movieId: number, cinemaId: number, date: string) =>
        `/cinemas/${cinemaId}/movies/${movieId}/showtimes/?date=${date}`,
};

const listCinemaMovieShowtimes = async (movieId: number, cinemaId: number, date: string) => {
    const response = await apiClient.get(SHOWTIMES_URLS.cinemaMovieShowtimes(movieId, cinemaId, date));
    return response.data;
}

export const useListCinemaMovieShowtimes = (movieId: number, cinemaId: number, date: string, options = {}) => {
    return useQuery({
        queryKey: ['cinemaMovieShowtimes', movieId, cinemaId, date],
        queryFn: () => listCinemaMovieShowtimes(movieId, cinemaId, date),
        ...options
    });
}