import { ShowtimeDetailsHeader } from '@/components/bookings/showtime-details-header';
import { render, screen } from '@testing-library/react-native';
import { format } from 'date-fns';
import React from 'react';

describe('ShowtimeDetailsHeader', () => {
    const mockDetails = {
        id: 1,
        movie_title: 'Inception',
        hall: 'Hall 7',
        start_time: '2025-05-10T18:30:00Z'
    };

    test('renders the movie title', () => {
        render(<ShowtimeDetailsHeader details={mockDetails} />);

        expect(screen.getByText('Inception')).toBeTruthy();
    });

    test('renders hall number', () => {
        render(<ShowtimeDetailsHeader details={mockDetails} />);

        expect(screen.getByText(/Hall: \*\*Hall 7\*\*/)).toBeTruthy();
    });

    test('renders formatted start time', () => {
        render(<ShowtimeDetailsHeader details={mockDetails} />);

        const expectedDate = format(new Date(mockDetails.start_time), 'MMM do, HH:mm');

        expect(screen.getByText(new RegExp(`Start: \\*\\*${expectedDate}\\*\\*`))).toBeTruthy();
    });

    test('renders the "Screen" label', () => {
        render(<ShowtimeDetailsHeader details={mockDetails} />);

        expect(screen.getByText('Screen')).toBeTruthy();
    });

});
