import { useListCinemas } from "@/api/cinema";
import CinemaSelectView from "@/app/cinema-select";
import { useCinema } from "@/context/cinema-context";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { useRouter } from "expo-router";

jest.mock('expo-router', () => ({
    Link: ({ children }: any) => <>{children}</>,
    useRouter: jest.fn(),
}));

jest.mock('@/context/cinema-context', () => ({
    useCinema: jest.fn(),
}));

jest.mock('@/api/cinema', () => ({
    useListCinemas: jest.fn(),
}));

describe('CinemaSelectView', () => {
    const mockPush = jest.fn();
    const mockSelectCinema = jest.fn();

    const mockCinemas = [
        { id: 1, name: 'Cinema One', city: 'London' },
        { id: 2, name: 'Cinema Two', city: 'Manchester' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();

        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });

        (useCinema as jest.Mock).mockReturnValue({
            cinema: null,
            selectCinema: mockSelectCinema,
        });

        (useListCinemas as jest.Mock).mockReturnValue({
            data: mockCinemas,
            isLoading: false,
            isError: false,
            error: null,
        });
    });

    it('should render loading state', () => {
        (useListCinemas as jest.Mock).mockReturnValue({
            isLoading: true,
            data: null,
            isError: false,
        });

        render(<CinemaSelectView />);

        expect(screen.getByText('Loading Cinemas...')).toBeTruthy();
        expect(screen.getByTestId('activity-indicator')).toBeTruthy();
    });

    it('should render error state', () => {
        (useListCinemas as jest.Mock).mockReturnValue({
            isLoading: false,
            isError: true,
            error: { message: 'Network failure' },
        });

        render(<CinemaSelectView />);

        expect(screen.getByText('Error loading data: Network failure')).toBeTruthy();
    });

    it('should render list of cinemas', () => {
        render(<CinemaSelectView />);

        expect(screen.getByText('Select your cinema')).toBeTruthy();
        expect(screen.getByText('Cinema One')).toBeTruthy();
        expect(screen.getByText('London')).toBeTruthy();
        expect(screen.getByText('Cinema Two')).toBeTruthy();
        expect(screen.getByText('Manchester')).toBeTruthy();
    });

    it('should redirect to movies list on cinema selection', async () => {
        render(<CinemaSelectView />);

        const cinemaCard = screen.getByText('Cinema One');
        fireEvent.press(cinemaCard);

        await waitFor(() => {
            expect(mockSelectCinema).toHaveBeenCalledWith(1);
            expect(mockPush).toHaveBeenCalledWith('/movies-list');
        });
    });
});