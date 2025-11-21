export type Movie = {
    id: number,
    title: string,
    poster_path: string,
    release_date: string,
}

export type Genre = {
    id: number,
    name: string,
}

export type Director = {
    id: number,
    first_name: string,
    last_name: string,
}

export type MovieDetail = Movie & {
    overview: string,
    original_language: string,
    genres: Genre[],
    directors: Director[],
}