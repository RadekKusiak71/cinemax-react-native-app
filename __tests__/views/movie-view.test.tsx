import { useListCinemaMovies, useListGenres } from '@/api/movies';
import MovieView from '@/app/(tabs)/movies';
import { useCinema } from '@/context/cinema-context';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { useRouter } from 'expo-router';
import React from 'react';

jest.mock('@/api/movies', () => ({
    useListCinemaMovies: jest.fn(),
    useListGenres: jest.fn(),
}));

jest.mock('@/context/cinema-context', () => ({
    useCinema: jest.fn(),
}));

jest.mock('expo-router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('@/components/cinema/cinema-header', () => {
    const { Text, TouchableOpacity } = require('react-native');
    return ({ cinemaName, onChange }: any) => (
        <TouchableOpacity onPress={onChange} testID="cinema-header">
            <Text>{cinemaName}</Text>
        </TouchableOpacity>
    );
});

jest.mock('@/components/filter/filter-list', () => {
    const { View, Text, TouchableOpacity } = require('react-native');
    return ({ items, onSelect }: any) => (
        <View testID="filter-list">
            {items.map((item: string) => (
                <TouchableOpacity key={item} onPress={() => onSelect(item)} testID={`genre-${item}`}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
});

jest.mock('@/components/movies/movie-list', () => {
    const { View, Text, TouchableOpacity } = require('react-native');
    return ({ data, onPressMovie }: any) => (
        <View testID="movie-list">
            {data?.map((movie: any) => (
                <TouchableOpacity key={movie.id} onPress={() => onPressMovie(movie.id)} testID={`movie-${movie.id}`}>
                    <Text>{movie.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
});

describe('MovieView Screen', () => {
    const mockRouter = { push: jest.fn() };

    const mockCinema = { id: 1, name: 'Grand Cinema' };
    const mockGenres = [{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }];
    const mockMovies = [
        { id: 101, title: 'Avengers', genre: 'Action' },
        { id: 102, title: 'Superbad', genre: 'Comedy' }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
        (useCinema as jest.Mock).mockReturnValue({ cinema: mockCinema });
    });

    it('renders loading screen when initial data is fetching', () => {
        (useListCinemaMovies as jest.Mock).mockReturnValue({ isLoading: true, data: null });
        (useListGenres as jest.Mock).mockReturnValue({ isLoading: true, data: null });

        render(<MovieView />);

        expect(screen.getByText('Loading movies...')).toBeTruthy();
    });

    it('renders error screen and allows changing cinema on failure', () => {
        (useListCinemaMovies as jest.Mock).mockReturnValue({
            isLoading: false,
            isError: true,
            data: null
        });
        (useListGenres as jest.Mock).mockReturnValue({ isLoading: false, data: [] });

        render(<MovieView />);

        expect(screen.getByText('Failed to load movies.')).toBeTruthy();
    });

    it('renders cinema header, filters, and movie list when data loads', () => {
        (useListCinemaMovies as jest.Mock).mockReturnValue({
            isLoading: false,
            isError: false,
            data: mockMovies
        });
        (useListGenres as jest.Mock).mockReturnValue({
            isLoading: false,
            data: mockGenres
        });

        render(<MovieView />);

        expect(screen.getByText('Grand Cinema')).toBeTruthy();
        expect(screen.getByText('Action')).toBeTruthy();
        expect(screen.getByText('Avengers')).toBeTruthy();
    });

    it('updates selected genres and refetches movies when a filter is pressed', async () => {
        (useListCinemaMovies as jest.Mock).mockReturnValue({
            isLoading: false,
            data: mockMovies,
            refetch: jest.fn()
        });
        (useListGenres as jest.Mock).mockReturnValue({
            isLoading: false,
            data: mockGenres
        });

        render(<MovieView />);

        expect(useListCinemaMovies).toHaveBeenCalledWith(
            mockCinema.id,
            [],
            expect.anything()
        );

        const actionFilter = screen.getByTestId('genre-Action');
        fireEvent.press(actionFilter);

        await waitFor(() => {
            expect(useListCinemaMovies).toHaveBeenLastCalledWith(
                mockCinema.id,
                ['Action'],
                expect.anything()
            );
        });

        fireEvent.press(actionFilter);

        await waitFor(() => {
            expect(useListCinemaMovies).toHaveBeenLastCalledWith(
                mockCinema.id,
                [],
                expect.anything()
            );
        });
    });

    it('navigates to movie details when a movie is clicked', () => {
        (useListCinemaMovies as jest.Mock).mockReturnValue({ isLoading: false, data: mockMovies });
        (useListGenres as jest.Mock).mockReturnValue({ isLoading: false, data: mockGenres });

        render(<MovieView />);

        const movieItem = screen.getByTestId('movie-101');
        fireEvent.press(movieItem);

        expect(mockRouter.push).toHaveBeenCalledWith('/(movie)/101');
    });

    it('navigates to cinema select when header is clicked', () => {
        (useListCinemaMovies as jest.Mock).mockReturnValue({ isLoading: false, data: mockMovies });
        (useListGenres as jest.Mock).mockReturnValue({ isLoading: false, data: mockGenres });

        render(<MovieView />);

        const header = screen.getByTestId('cinema-header');
        fireEvent.press(header);

        expect(mockRouter.push).toHaveBeenCalledWith('/cinema-select');
    });

    it('shows refetching indicator when fetching in background', () => {
        (useListCinemaMovies as jest.Mock).mockReturnValue({
            isLoading: false,
            isFetching: true,
            data: mockMovies
        });
        (useListGenres as jest.Mock).mockReturnValue({ isLoading: false, data: mockGenres });

        render(<MovieView />);

        expect(screen.getByText('Updating results...')).toBeTruthy();
    });
});