import { ShowtimeSeat } from "@/types/showtimes";
import { useQuery } from "@tanstack/react-query";
import apiClient from "./client";

const SHOWTIMES_URLS = {
    cinemaMovieShowtimes: (movieId: number, cinemaId: number, date: string) =>
        `/cinemas/${cinemaId}/movies/${movieId}/showtimes/?date=${date}`,
    showtimeRoomLayout: (showtimeId: number) =>
        `/showtimes/${showtimeId}/room-layout/`,
};

const listCinemaMovieShowtimes = async (movieId: number, cinemaId: number, date: string) => {
    const response = await apiClient.get(SHOWTIMES_URLS.cinemaMovieShowtimes(movieId, cinemaId, date));
    return response.data;
}

const retrieveShowtimeRoomLayout = async (showtimeId: number): Promise<ShowtimeSeat[]> => {
    const response = await apiClient.get(SHOWTIMES_URLS.showtimeRoomLayout(showtimeId));
    return response.data;
}

const retrieveShowtimeDetails = async (showtimeId: number) => {
    const response = await apiClient.get(`/showtimes/${showtimeId}/`);
    return response.data;
}

export const useListCinemaMovieShowtimes = (movieId: number, cinemaId: number, date: string, options = {}) => {
    return useQuery({
        queryKey: ['cinemaMovieShowtimes', movieId, cinemaId, date],
        queryFn: () => listCinemaMovieShowtimes(movieId, cinemaId, date),
        ...options
    });
}

export const useRetrieveShowtimeRoomLayout = (showtimeId: number, options = {}) => {
    return useQuery({
        queryKey: ['showtimeRoomLayout', showtimeId],
        queryFn: () => retrieveShowtimeRoomLayout(showtimeId),
        ...options
    });
}

export const useRetrieveShowtimeDetails = (showtimeId: number, options = {}) => {
    return useQuery({
        queryKey: ['showtimeDetails', showtimeId],
        queryFn: () => retrieveShowtimeDetails(showtimeId),
        ...options
    });
}