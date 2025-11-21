import MovieDetails from "@/components/movies/details/movie-details";
import { render } from "@testing-library/react-native";


describe('Movie Details Component', () => {

    it('renders correctly with given movie details', () => {
        const movie = {
            id: 1,
            title: 'Inception',
            release_date: '2010-07-16',
            overview: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
            genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Sci-Fi' }],
            directors: [{ id: 1, first_name: 'Christopher', last_name: 'Nolan' }],
            poster_path: 'https://example.com/inception.jpg',
            original_language: 'en',
            production_country: 'US',
        };

        const { getByText, getByLabelText } = render(<MovieDetails movie={movie} IsLoading={false} IsError={false} refetch={() => { }} />);
        expect(getByText('Inception')).toBeTruthy();
        expect(getByText('2010-07-16')).toBeTruthy();
    });

    it('shows loading screen when IsLoading is true', () => {
        const { getByText } = render(<MovieDetails movie={null as any} IsLoading={true} IsError={false} refetch={() => { }} />);
        expect(getByText('Loading movie details...')).toBeTruthy();
    });

    it('shows error screen when IsError is true', () => {
        const { getByText } = render(<MovieDetails movie={null as any} IsLoading={false} IsError={true} refetch={() => { }} />);
        expect(getByText('Failed to load movie details.')).toBeTruthy();
    });

    it('does not render genres if none are provided', () => {
        const movie = {
            id: 1,
            title: 'Inception',
            release_date: '2010-07-16',
            overview: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
            genres: [],
            directors: [{ id: 1, first_name: 'Christopher', last_name: 'Nolan' }],
            poster_path: 'https://example.com/inception.jpg',
            original_language: 'en',
            production_country: 'US',
        };
        const { queryByText } = render(<MovieDetails movie={movie} IsLoading={false} IsError={false} refetch={() => { }} />);
        expect(queryByText('Action')).toBeNull();
        expect(queryByText('Sci-Fi')).toBeNull();
    });

    it('does not render directors if none are provided', () => {
        const movie = {
            id: 1,
            title: 'Inception',
            release_date: '2010-07-16',
            overview: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
            genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Sci-Fi' }],
            directors: [],
            poster_path: 'https://example.com/inception.jpg',
            original_language: 'en',
            production_country: 'US',
        };
        const { queryByText } = render(<MovieDetails movie={movie} IsLoading={false} IsError={false} refetch={() => { }} />);
        expect(queryByText('Christopher Nolan')).toBeNull();
    });
});