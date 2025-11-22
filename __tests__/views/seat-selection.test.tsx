import SeatSelectionView from '@/app/(movie)/(booking)/[showtime_id]/seat-selection';
import { fireEvent, render } from '@testing-library/react-native';
import { Alert } from 'react-native';

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
    useLocalSearchParams: jest.fn(),
}));

jest.mock('@/api/showtimes', () => ({
    useRetrieveShowtimeDetails: jest.fn(),
    useRetrieveShowtimeRoomLayout: jest.fn(),
}));

jest.mock('@/components/bookings/showtime-details-header', () => {
    const { View } = require('react-native');
    return { ShowtimeDetailsHeader: () => <View testID="showtime-details-header" /> };
});

jest.mock('@/components/bookings/seats/seat-layout', () => {
    const { TouchableOpacity, View } = require('react-native');
    return {
        SeatLayout: ({ onToggleSeat }: { onToggleSeat: (id: number) => void }) => (
            <View>
                {[1, 2, 3, 4, 5, 6, 7].map(id => (
                    <TouchableOpacity key={id} testID={`seat-${id}`} onPress={() => onToggleSeat(id)} />
                ))}
            </View>
        ),
    };
});

jest.mock('@/components/bookings/booking-footer', () => {
    const { TouchableOpacity } = require('react-native');
    return {
        BookingFooter: ({ onBookSeats }: { onBookSeats: () => void }) => (
            <TouchableOpacity testID="book-button" onPress={onBookSeats} />
        ),
    };
});

const useRetrieveShowtimeDetails = require('@/api/showtimes').useRetrieveShowtimeDetails;
const useRetrieveShowtimeRoomLayout = require('@/api/showtimes').useRetrieveShowtimeRoomLayout;
const useLocalSearchParams = require('expo-router').useLocalSearchParams;

describe('SeatSelectionView', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useLocalSearchParams.mockReturnValue({ showtime_id: '1' });
    });

    it('renders correctly', () => {
        useRetrieveShowtimeDetails.mockReturnValue({ data: { id: 1 }, isLoading: false, isError: false });
        useRetrieveShowtimeRoomLayout.mockReturnValue({ data: { seats: [] }, isLoading: false, isError: false });

        const { getByTestId } = render(<SeatSelectionView />);

        expect(getByTestId('showtime-details-header')).toBeTruthy();
        expect(getByTestId('seat-1')).toBeTruthy();
        expect(getByTestId('book-button')).toBeTruthy();
    });

    it('renders alert if more than 6 seats are selected', () => {
        useRetrieveShowtimeDetails.mockReturnValue({ data: { id: 1 }, isLoading: false, isError: false });
        useRetrieveShowtimeRoomLayout.mockReturnValue({ data: { seats: [] }, isLoading: false, isError: false });
        jest.spyOn(Alert, 'alert');

        const { getByTestId } = render(<SeatSelectionView />);

        for (let i = 1; i <= 7; i++) {
            fireEvent.press(getByTestId(`seat-${i}`));
        }

        expect(Alert.alert).toHaveBeenCalledWith("You can select a maximum of 6 seats.");
    });

    it('renders alert if no seats are selected on booking', () => {
        useRetrieveShowtimeDetails.mockReturnValue({ data: { id: 1 }, isLoading: false, isError: false });
        useRetrieveShowtimeRoomLayout.mockReturnValue({ data: { seats: [] }, isLoading: false, isError: false });

        jest.spyOn(Alert, 'alert');

        const { getByTestId } = render(<SeatSelectionView />);
        const bookButton = getByTestId('book-button');
        fireEvent.press(bookButton);

        expect(Alert.alert).toHaveBeenCalledWith("Please select at least one seat.");
    });

    it('renders loading screen when data is loading', () => {
        useRetrieveShowtimeDetails.mockReturnValue({ data: null, isLoading: true, isError: false });
        useRetrieveShowtimeRoomLayout.mockReturnValue({ data: null, isLoading: true, isError: false });

        const { getByText } = render(<SeatSelectionView />);
        expect(getByText('Loading seat layout and showtime details...')).toBeTruthy();
    });

    it('renders error screen when there is an error', () => {
        useRetrieveShowtimeDetails.mockReturnValue({ data: null, isLoading: false, isError: true });
        useRetrieveShowtimeRoomLayout.mockReturnValue({ data: null, isLoading: false, isError: true });

        const { getByText } = render(<SeatSelectionView />);
        expect(getByText('Failed to load showtime data. Please try again later.')).toBeTruthy();
    });
});
