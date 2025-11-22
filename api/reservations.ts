import { ReservationDetails } from "@/types/reservations";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "./client";

export type CreateReservationPayload = {
    showtimeId: number;
    seatIds: number[];
}

const createReservation = async (payload: CreateReservationPayload): Promise<ReservationDetails> => {
    const { data } = await apiClient.post<ReservationDetails>('/reservations/', {
        showtime_id: payload.showtimeId,
        seat_ids: payload.seatIds
    });
    return data;
}

const getReservations = async (): Promise<ReservationDetails[]> => {
    const { data } = await apiClient.get<ReservationDetails[]>('/reservations/');
    return data;
}

const getReservation = async (reservationId: number): Promise<ReservationDetails> => {
    const { data } = await apiClient.get<ReservationDetails>(`/reservations/${reservationId}/`);
    return data;
}

const cancelReservation = async (reservationId: number): Promise<void> => {
    await apiClient.delete(`/reservations/${reservationId}/`);
}

const getTicketsForReservation = async (reservationId: number) => {
    const { data } = await apiClient.get(`/reservations/${reservationId}/tickets/`);
    return data;
}

export const useCancelReservation = () => {
    return useMutation({
        mutationFn: cancelReservation
    });
}

export const useGetTicketsForReservation = (reservationId: number | undefined, options = {}) => {
    return useQuery({
        queryKey: ['reservation-tickets', reservationId],
        queryFn: () => getTicketsForReservation(reservationId!),
        ...options
    })
}

export const useReservation = (reservationId: number | undefined, options = {}) => {
    return useQuery({
        queryKey: ['reservation-details', reservationId],
        queryFn: () => getReservation(reservationId!),
        ...options
    })
}

export const useGetReservations = (options = {}) => {
    return useQuery({
        queryKey: ['user-reservations'],
        queryFn: () => getReservations(),
        ...options
    })
}

export const useCreateReservation = () => {
    return useMutation({
        mutationFn: createReservation
    });
}