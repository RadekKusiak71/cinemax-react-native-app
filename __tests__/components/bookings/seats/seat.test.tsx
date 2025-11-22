import Seat from '@/components/bookings/seats/seat';
import { ShowtimeSeat } from "@/types/showtimes";
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { StyleSheet } from 'react-native';

const SEAT_COLORS = {
    AVAILABLE: '#E3342F',
    SELECTED: '#6AA84F',
    RESERVED: '#A9A9A9',
};

const mockStyles = StyleSheet.create({
    seat: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
});

const createMockSeat = (id: number, number: number, isReserved: boolean): ShowtimeSeat => ({
    id,
    row_index: 1,
    number,
    is_reserved: isReserved,
});

describe('Seat', () => {
    const mockOnToggle = jest.fn();

    beforeEach(() => {
        mockOnToggle.mockClear();
    });

    test('renders the seat number correctly', () => {
        const seatData = createMockSeat(10, 5, false);
        const { getByText } = render(
            <Seat
                seat={seatData}
                isSelected={false}
                onToggle={mockOnToggle}
            />
        );
        expect(getByText('5')).toBeTruthy();
    });

    test('displays AVAILABLE color when not reserved and not selected', () => {
        const seatData = createMockSeat(1, 1, false);
        const { getByText } = render(
            <Seat
                seat={seatData}
                isSelected={false}
                onToggle={mockOnToggle}
            />
        );
        const seatElement = getByText('1')
        const touchableOpacity = seatElement.parent.parent
        expect(touchableOpacity.props.style.backgroundColor).toEqual(SEAT_COLORS.AVAILABLE);
    });

    test('displays SELECTED color when not reserved and selected', () => {
        const seatData = createMockSeat(2, 2, false);
        const { getByText } = render(
            <Seat
                seat={seatData}
                isSelected={true}
                onToggle={mockOnToggle}
            />
        );
        const seatElement = getByText('2')
        const touchableOpacity = seatElement.parent.parent
        expect(touchableOpacity.props.style.backgroundColor).toEqual(SEAT_COLORS.SELECTED);
    });

    test('displays RESERVED color when reserved, regardless of selection prop', () => {
        const seatData = createMockSeat(3, 3, true);
        const { getByText } = render(
            <Seat
                seat={seatData}
                isSelected={false}
                onToggle={mockOnToggle}
            />
        );
        const seatElement = getByText('3')
        const touchableOpacity = seatElement.parent.parent
        expect(touchableOpacity.props.style.backgroundColor).toEqual(SEAT_COLORS.RESERVED);
    });

    test('calls onToggle with seat ID when an AVAILABLE seat is pressed', () => {
        const seatId = 4;
        const seatData = createMockSeat(seatId, 4, false);
        render(
            <Seat
                seat={seatData}
                isSelected={false}
                onToggle={mockOnToggle}
            />
        );

        const seatButton = screen.getByTestId('seat-touchable');
        fireEvent.press(seatButton);
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith(seatId);
    });

    test('calls onToggle with seat ID when a SELECTED seat is pressed (to deselect)', () => {
        const seatId = 5;
        const seatData = createMockSeat(seatId, 5, false);

        render(
            <Seat
                seat={seatData}
                isSelected={true}
                onToggle={mockOnToggle}
            />
        );

        const seatButton = screen.getByTestId('seat-touchable');
        fireEvent.press(seatButton);

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith(seatId);
    });

    test('DOES NOT call onToggle when a RESERVED seat is pressed', () => {
        const seatData = createMockSeat(6, 6, true);
        render(
            <Seat
                seat={seatData}
                isSelected={false}
                onToggle={mockOnToggle}
            />
        );

        const seatButton = screen.getByTestId('seat-touchable');
        fireEvent.press(seatButton);

        expect(mockOnToggle).not.toHaveBeenCalled();
    });

    test('RESERVED seat is disabled for interaction', () => {
        const seatData = createMockSeat(7, 7, true);
        render(
            <Seat
                seat={seatData}
                isSelected={false}
                onToggle={mockOnToggle}
            />
        );

        const seatButton = screen.getByTestId('seat-touchable');
        expect(seatButton.props.accessibilityState.disabled).toBe(true);
    });

    test('AVAILABLE seat is NOT disabled for interaction', () => {
        const seatData = createMockSeat(8, 8, false);

        render(
            <Seat
                seat={seatData}
                isSelected={false}
                onToggle={mockOnToggle}
            />
        );

        const seatButton = screen.getByTestId('seat-touchable');
        expect(seatButton.props.accessibilityState.disabled).toBe(false);
    });
});