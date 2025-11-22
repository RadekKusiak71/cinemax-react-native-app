import { Stack } from 'expo-router';
import React from 'react';

const BookingLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="[showtime_id]/seat-selection"
                options={{ title: 'Select Seats', }}
            />
            <Stack.Screen
                name="[showtime_id]/confirmation"
                options={{ title: 'Confirm Booking', }}
            />
            <Stack.Screen
                name="[showtime_id]/checkout"
                options={{ title: 'Payment', }}
            />
        </Stack>
    );
};

export default BookingLayout;