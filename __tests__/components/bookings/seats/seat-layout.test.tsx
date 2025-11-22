import { SeatLayout } from '@/components/bookings/seats/seat-layout'; // Adjust path if necessary
import { ShowtimeSeat } from "@/types/showtimes";
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/components/bookings/seats/seat', () => {
    const React = require('react');
    const { Text, TouchableOpacity } = require('react-native');

    return ({ seat, isSelected, onToggle }: any) => (
        <TouchableOpacity
            testID={`mock-seat-${seat.id}`}
            onPress={() => onToggle(seat.id)}
        >
            <Text>{seat.number}</Text>
            <Text>{isSelected ? 'selected' : 'unselected'}</Text>
        </TouchableOpacity>
    );
});

const createMockSeat = (id: number, rowIndex: number, number: number): ShowtimeSeat => ({
    id,
    row_index: rowIndex,
    number,
    is_reserved: false,
});

describe('SeatLayout', () => {
    const mockOnToggleSeat = jest.fn();

    beforeEach(() => {
        mockOnToggleSeat.mockClear();
    });

    test('groups seats correctly and renders the correct total number of seats', () => {
        const seatsData = [
            createMockSeat(1, 1, 1),
            createMockSeat(2, 1, 2),
            createMockSeat(3, 2, 1),
        ];

        render(
            <SeatLayout
                seatsData={seatsData}
                selectedSeats={[]}
                onToggleSeat={mockOnToggleSeat}
            />
        );

        // Expect 3 seat mocks to be rendered
        expect(screen.getByTestId('mock-seat-1')).toBeTruthy();
        expect(screen.getByTestId('mock-seat-2')).toBeTruthy();
        expect(screen.getByTestId('mock-seat-3')).toBeTruthy();
    });

    test('sorts rows by rowIndex and seats by number', () => {
        const shuffledSeats = [
            createMockSeat(1, 2, 2),
            createMockSeat(2, 1, 5),
            createMockSeat(3, 2, 1),
            createMockSeat(4, 1, 1),
        ];

        render(
            <SeatLayout
                seatsData={shuffledSeats}
                selectedSeats={[]}
                onToggleSeat={mockOnToggleSeat}
            />
        );

        const seatNumbers = screen.getAllByText(/^[0-9]+$/).map(node => node.props.children);

        expect(seatNumbers).toEqual([1, 5, 1, 2]);
    });

    test('calls onToggleSeat with the correct ID when a seat is pressed', () => {
        const seatsData = [createMockSeat(99, 1, 1)];

        render(
            <SeatLayout
                seatsData={seatsData}
                selectedSeats={[]}
                onToggleSeat={mockOnToggleSeat}
            />
        );

        fireEvent.press(screen.getByTestId('mock-seat-99'));

        expect(mockOnToggleSeat).toHaveBeenCalledTimes(1);
        expect(mockOnToggleSeat).toHaveBeenCalledWith(99);
    });
});