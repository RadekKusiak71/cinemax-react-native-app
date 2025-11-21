export type Showtime = {
    id: number;
    start_time: string;
}

export type ShowtimesByFormat = {
    format_key: string;
    showtimes: Showtime[];
}