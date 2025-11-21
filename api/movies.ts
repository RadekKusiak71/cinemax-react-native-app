import { Genre, Movie, MovieDetail } from "@/types/movies";
import { useQuery } from "@tanstack/react-query";
import apiClient from "./client";

const MOVIES_URLS = {
    listCinemaMovies: (cinemaId: number) => `/cinemas/${cinemaId}/movies/`,
    retrieveMovieDetails: (movieId: number) => `/movies/${movieId}/`,
}

const listCinemaMovies = async (cinemaId: number, genres: string[] = []): Promise<Movie[]> => {
    const { data } = await apiClient.get(MOVIES_URLS.listCinemaMovies(cinemaId), {
        params: {
            genres: genres
        },
        paramsSerializer: () => {
            return genres.map(genre => `genres=${encodeURIComponent(genre)}`).join('&');

        }
    });
    return data;
}

const retrieveMovieDetails = async (movieId: number): Promise<MovieDetail> => {
    const { data } = await apiClient.get(MOVIES_URLS.retrieveMovieDetails(movieId));
    return data;
}

const listGenres = async (): Promise<Genre[]> => {
    const { data } = await apiClient.get("/genres/");
    return data;
}

export const useListCinemaMovies = (
    cinemaId: number | undefined,
    genres: string[] = [],
    options = {}
) => {
    return useQuery({
        queryKey: ["cinema-movies", cinemaId, genres],
        queryFn: () => listCinemaMovies(cinemaId!, genres),
        ...options,
    });
}

export const useRetrieveMovieDetails = (movieId: number | undefined, options = {}) => {
    return useQuery({
        queryKey: ["movie-details", movieId],
        queryFn: () => retrieveMovieDetails(movieId!),
        ...options,
    });
}

export const useListGenres = (options = {}) => {
    return useQuery({
        queryKey: ["genres"],
        queryFn: () => listGenres(),
        ...options,
    });
}