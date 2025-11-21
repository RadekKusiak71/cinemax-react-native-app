export type Cinema = {
    id: number;
    name: string;
    city: string;
}

export type CinemaDetails = Cinema & {
    address: string;
    currency: string;
    is_active: boolean;
}