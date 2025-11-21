import ShowtimesList from '@/components/showtimes/showtimes-list';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/components/showtimes/time-slot', () => {
    const { Text, TouchableOpacity } = require('react-native');
    return ({ time, onPress }: { time: string, onPress: () => void }) => (
        <TouchableOpacity onPress={onPress} testID="mock-time-slot">
            <Text>{time}</Text>
        </TouchableOpacity>
    );
});

jest.mock('@/components/ui/loading-screen', () => ({
    LoadingScreen: ({ message }: { message: string }) => {
        const { Text } = require('react-native');
        return <Text>{message}</Text>;
    }
}));

describe('ShowtimesList Component', () => {
    const mockPress = jest.fn();

    const mockShowtimes = [
        {
            format_key: '2D',
            showtimes: [
                { id: 101, start_time: '10:00 AM' },
                { id: 102, start_time: '12:00 PM' },
            ],
        },
        {
            format_key: 'IMAX',
            showtimes: [
                { id: 201, start_time: '01:00 PM' },
            ],
        },
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('displays the loading screen when isLoading is true', () => {
        render(
            <ShowtimesList
                isLoading={true}
                showtimes={[]}
                onTimePress={mockPress}
            />
        );

        expect(screen.getByText('Loading showtimes...')).toBeTruthy();
    });

    it('displays the empty state message when showtimes is undefined', () => {
        render(
            <ShowtimesList
                isLoading={false}
                showtimes={undefined}
                onTimePress={mockPress}
            />
        );

        expect(screen.getByText('No showtimes available for this date.')).toBeTruthy();
    });

    it('displays the empty state message when showtimes is an empty array', () => {
        render(
            <ShowtimesList
                isLoading={false}
                showtimes={[]}
                onTimePress={mockPress}
            />
        );

        expect(screen.getByText('No showtimes available for this date.')).toBeTruthy();
    });

    it('renders format headers and time slots correctly', () => {
        render(
            <ShowtimesList
                isLoading={false}
                showtimes={mockShowtimes}
                onTimePress={mockPress}
            />
        );

        expect(screen.getByText('2D')).toBeTruthy();
        expect(screen.getByText('IMAX')).toBeTruthy();

        expect(screen.getByText('10:00 AM')).toBeTruthy();
        expect(screen.getByText('12:00 PM')).toBeTruthy();
        expect(screen.getByText('01:00 PM')).toBeTruthy();
    });

    it('calls onTimePress with the correct ID when a slot is pressed', () => {
        render(
            <ShowtimesList
                isLoading={false}
                showtimes={mockShowtimes}
                onTimePress={mockPress}
            />
        );

        // Find the button for ID 102 (12:00 PM)
        // Note: In our mock, the Text is the child of the TouchableOpacity
        const timeButton = screen.getByText('12:00 PM');

        fireEvent.press(timeButton);

        expect(mockPress).toHaveBeenCalledTimes(1);
        expect(mockPress).toHaveBeenCalledWith(102);
    });

    it('renders multiple groups distinctively', () => {
        render(
            <ShowtimesList
                isLoading={false}
                showtimes={mockShowtimes}
                onTimePress={mockPress}
            />
        );

        const allSlots = screen.getAllByTestId('mock-time-slot');
        expect(allSlots).toHaveLength(3);
    });
});