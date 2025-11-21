import DateStrip from '@/components/showtimes/date-strip';
import { theme } from '@/constants/theme';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

jest.mock('@/constants/theme', () => ({
    theme: {
        colors: {
            primary: '#E50914',
            textPrimary: '#000000',
            textMuted: '#888888',
            textOnPrimary: '#FFFFFF',
        },
    },
}));

describe('DateStrip Component', () => {
    const FIXED_DATE = new Date('2024-01-01T12:00:00Z');

    beforeEach(() => {
        jest.useFakeTimers();
        jest.setSystemTime(FIXED_DATE);
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('renders correctly with 7 days', () => {
        const mockFn = jest.fn();
        render(<DateStrip selectedDate={FIXED_DATE} onSelectDate={mockFn} />);

        expect(screen.getByText('Today')).toBeTruthy();
        expect(screen.getByText('Tue')).toBeTruthy();

        expect(screen.getByTestId('date-item-0')).toBeTruthy();
        expect(screen.getByTestId('date-item-6')).toBeTruthy();
    });

    it('highlights the selected date', () => {
        const mockFn = jest.fn();
        render(<DateStrip selectedDate={FIXED_DATE} onSelectDate={mockFn} />);

        const todayButton = screen.getByTestId('date-item-0');

        expect(todayButton).toHaveStyle({ backgroundColor: theme.colors.primary });
    });

    it('does NOT highlight unselected dates', () => {
        const mockFn = jest.fn();
        render(<DateStrip selectedDate={FIXED_DATE} onSelectDate={mockFn} />);

        const tomorrowButton = screen.getByTestId('date-item-1');

        expect(tomorrowButton).toHaveStyle({ backgroundColor: '#f4f4f5' });
        expect(tomorrowButton).not.toHaveStyle({ backgroundColor: theme.colors.primary });
    });

    it('calls onSelectDate with the correct date when pressed', () => {
        const onSelectDateMock = jest.fn();
        render(<DateStrip selectedDate={FIXED_DATE} onSelectDate={onSelectDateMock} />);

        const tomorrow = new Date(FIXED_DATE);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const tomorrowButton = screen.getByTestId('date-item-1');

        fireEvent.press(tomorrowButton);

        expect(onSelectDateMock).toHaveBeenCalledTimes(1);
        const pressedDate = onSelectDateMock.mock.calls[0][0];

        expect(pressedDate.getDate()).toBe(tomorrow.getDate());
    });

    it('renders correctly when a future date is selected', () => {
        const mockFn = jest.fn();

        const futureDate = new Date(FIXED_DATE);
        futureDate.setDate(futureDate.getDate() + 3);

        render(<DateStrip selectedDate={futureDate} onSelectDate={mockFn} />);

        const futureButton = screen.getByTestId('date-item-3');
        expect(futureButton).toHaveStyle({ backgroundColor: theme.colors.primary });

        const todayButton = screen.getByTestId('date-item-0');
        expect(todayButton).not.toHaveStyle({ backgroundColor: theme.colors.primary });
    });
});