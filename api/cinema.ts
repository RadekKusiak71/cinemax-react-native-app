import { Cinema, CinemaDetails } from "@/types/cinemas";
import { useQuery } from "@tanstack/react-query";
import apiClient from "./client";


const listCinemas = async (): Promise<Cinema[]> => {
    const { data } = await apiClient.get("/cinemas");
    return data;
}

const retrieveCinema = async (cinemaId: number): Promise<CinemaDetails> => {
    const { data } = await apiClient.get(`/cinemas/${cinemaId}`);
    return data;
}

export const useListCinemas = (options = {}) => {
    return useQuery({
        queryKey: ["cinemas"],
        queryFn: listCinemas,
        ...options,
    });
}

export const useRetrieveCinema = (cinemaId: number | undefined, options = {}) => {
    return useQuery({
        queryKey: ["cinema", cinemaId],
        queryFn: () => retrieveCinema(cinemaId!),
        ...options,
    });
}