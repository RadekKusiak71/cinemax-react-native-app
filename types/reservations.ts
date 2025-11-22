export type ReservationDetails = {
    id: number;
    movie_title: string;
    movie_overview: string;
    movie_duration: number;
    movie_poster: string;
    showtime_start: string;
    hall_name: string;
    cinema_name: string;
    cinema_city: string;
    total_price: string;
    status: string;
}

export type ReservationTicket = {
    id: number;
    seat_number: string;
    seat_row: string;
    hall_name: string;
    ticket_price: string;
}