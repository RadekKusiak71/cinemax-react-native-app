import { useRetrieveShowtimeDetails, useRetrieveShowtimeRoomLayout } from "@/api/showtimes";
import { ErrorScreen } from "@/components/ui/error-screen";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { BookingFooter } from '@/components/bookings/booking-footer';
import { SeatLayout } from '@/components/bookings/seats/seat-layout';
import { ShowtimeDetailsHeader } from '@/components/bookings/showtime-details-header';

const SeatSelectionView = () => {
    const router = useRouter();
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

    const { showtime_id } = useLocalSearchParams();
    const numericShowtimeId = Number(showtime_id);

    const { data: seatsData, isLoading: isLoadingSeats, isError: isErrorSeats } = useRetrieveShowtimeRoomLayout(numericShowtimeId);
    const { data: showtimeDetails, isLoading: isLoadingDetails, isError: isErrorDetails } = useRetrieveShowtimeDetails(numericShowtimeId);

    const toggleSeat = (seatId: number) => {
        if (selectedSeats.length === 6 && !selectedSeats.includes(seatId)) {
            Alert.alert("You can select a maximum of 6 seats.");
            return;
        }

        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId)
                : [...prev, seatId]
        );
    };

    const handleBookSeats = () => {
        if (selectedSeats.length === 0) {
            Alert.alert("Please select at least one seat.");
            return;
        }
        router.push(`/(movie)/(booking)/${showtime_id}/confirmation`);
    };

    if (isLoadingSeats || isLoadingDetails) return <LoadingScreen message="Loading seat layout and showtime details..." />
    if (isErrorSeats || !seatsData || isErrorDetails) return <ErrorScreen message="Failed to load showtime data. Please try again later." />
    if (!showtimeDetails) return <ErrorScreen message="Showtime details not found." />

    return (
        <View style={styles.container}>

            <ShowtimeDetailsHeader details={showtimeDetails} />

            <SeatLayout
                seatsData={seatsData}
                selectedSeats={selectedSeats}
                onToggleSeat={toggleSeat}
            />

            <BookingFooter
                selectedCount={selectedSeats.length}
                onBookSeats={handleBookSeats}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
});

export default SeatSelectionView;