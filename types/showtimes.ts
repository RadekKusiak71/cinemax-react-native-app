export type Showtime = {
    id: number;
    start_time: string;
}

export type ShowtimesByFormat = {
    format_key: string;
    showtimes: Showtime[];
}


export type ShowtimeSeat = {
    id: number;
    row_index: number;
    number: number;
    is_reserved: boolean;
}

export type ShowtimeDetails = {
    id: number;
    start_time: string;
    movie_title: string;
    hall: string;
}