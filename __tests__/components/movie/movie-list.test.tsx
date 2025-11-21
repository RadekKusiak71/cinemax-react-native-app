import MovieList from "@/components/movies/movie-list";
import { render, screen } from "@testing-library/react-native";

describe('MovieList Component', () => {
    it('renders correctly with given data', () => {
        const mockMovies = [
            { id: 1, poster_path: '/path1.jpg', title: 'Movie One', release_date: '2023-01-01', onPress: jest.fn() },
            { id: 2, poster_path: '/path2.jpg', title: 'Movie Two', release_date: '2023-02-01', onPress: jest.fn() },
        ];
        render(<MovieList data={mockMovies} onPressMovie={() => { }} />);

        const movieOne = screen.getByText('Movie One');
        const movieTwo = screen.getByText('Movie Two');
        expect(movieOne).toBeTruthy();
        expect(movieTwo).toBeTruthy();
    });

    it('shows empty component when no data is provided', () => {
        render(<MovieList data={[]} onPressMovie={() => { }} />);
        const emptyComponent = screen.getByText('No movies found.');
        expect(emptyComponent).toBeTruthy();
    });
});