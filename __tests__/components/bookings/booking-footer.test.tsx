import { BookingFooter } from '@/components/bookings/booking-footer';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

describe('BookingFooter', () => {
    const mockOnBookSeats = jest.fn();

    beforeEach(() => {
        mockOnBookSeats.mockClear();
    });

    test('calls onBookSeats when pressed', () => {
        render(<BookingFooter selectedCount={2} onBookSeats={mockOnBookSeats} />);

        const button = screen.getByTestId('book-seats-button');

        fireEvent.press(button);

        expect(mockOnBookSeats).toHaveBeenCalledTimes(1);
    });
});
