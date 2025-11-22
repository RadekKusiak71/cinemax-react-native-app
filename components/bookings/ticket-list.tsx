import TitleBlock from "@/components/title-block";
import { theme } from "@/constants/theme";
import { ReservationTicket } from "@/types/reservations";
import { FlatList, StyleSheet, Text, View } from "react-native";

const TicketItem = ({ ticket }: { ticket: ReservationTicket }) => (
    <View style={styles.ticketItem}>
        <Text style={styles.seatInfo}>Row {ticket.seat_row}, Seat {ticket.seat_number}</Text>
        <Text style={styles.price}>${ticket.ticket_price}</Text>
    </View>
);

const TicketList = ({ tickets }: { tickets: ReservationTicket[] }) => {
    return (
        <View style={styles.container}>
            <TitleBlock title="Your Tickets" subtitle="" />
            <FlatList
                data={tickets}
                renderItem={({ item }) => <TicketItem ticket={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        height: 300
    },
    listContainer: {
        marginTop: 8,
    },
    ticketItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.secondary,
    },
    seatInfo: {
        color: theme.colors.textPrimary,
        fontSize: 16,
    },
    price: {
        color: theme.colors.textPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default TicketList;