import { useCancelReservation, useGetTicketsForReservation, useReservation } from "@/api/reservations";
import ReservationInfo from "@/components/bookings/reservation-info";
import TicketList from "@/components/bookings/ticket-list";
import Button from "@/components/button";
import { ErrorScreen } from "@/components/ui/error-screen";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { theme } from "@/constants/theme";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";

const ConfirmationView = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { reservation_id } = useLocalSearchParams();
    const numericReservationId = Number(reservation_id);

    const { data: reservation, isLoading: isLoadingReservation, isError: isErrorReservation } = useReservation(numericReservationId);
    const { data: tickets, isLoading: isLoadingTickets, isError: isErrorTickets } = useGetTicketsForReservation(numericReservationId);
    const { mutate: cancelReservation, isPending: isCanceling } = useCancelReservation();

    const handleCancel = () => {
        cancelReservation(numericReservationId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['user-reservations'] });
                router.replace('/(tabs)/ticket-history');
            },
            onError: () => {
                Alert.alert("Failed to cancel reservation. Please try again.");
            }
        });
    };

    const handleConfirm = () => {
        Alert.alert("Reservation Confirmed!", "Your tickets are booked.");
        queryClient.invalidateQueries({ queryKey: ['user-reservations'] });
        router.replace('/(tabs)/ticket-history');
    };

    if (isLoadingReservation || isLoadingTickets) return <LoadingScreen message="Loading reservation details..." />;
    if (isErrorReservation || isErrorTickets || !reservation || !tickets) return <ErrorScreen message="Failed to load reservation details." />;

    return (
        <View style={styles.container}>
            <ReservationInfo reservation={reservation} />
            <TicketList tickets={tickets} />
            <View style={styles.footer}>
                <View style={styles.totalPriceContainer}>
                    <Text style={styles.totalPriceLabel}>Total Price:</Text>
                    <Text style={styles.totalPrice}>${reservation.total_price}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Cancel" onPress={handleCancel} isLoading={isCanceling} />
                    <Button title="Confirm" onPress={handleConfirm} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: theme.colors.background,
    },
    footer: {
        marginTop: 'auto',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: theme.colors.secondary,
    },
    totalPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    totalPriceLabel: {
        fontSize: 18,
        color: theme.colors.textPrimary,
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: theme.colors.errorColor,
        flex: 1,
        marginRight: 8,
    },
    confirmButton: {
        backgroundColor: theme.colors.primary,
        flex: 1,
        marginLeft: 8,
    }
});

export default ConfirmationView;