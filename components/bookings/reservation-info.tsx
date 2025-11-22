import { theme } from "@/constants/theme";
import { ReservationDetails } from "@/types/reservations";
import { format } from "date-fns";
import { Image, StyleSheet, Text, View } from "react-native";
import TitleBlock from "../title-block";

const ReservationInfo = ({ reservation }: { reservation: ReservationDetails }) => {
    return (
        <View style={styles.container}>
            <TitleBlock title="Screening Details" subtitle="" />
            <View style={styles.contentContainer}>
                <Image source={{ uri: reservation.movie_poster }} style={styles.poster} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.movieTitle}>{reservation.movie_title}</Text>
                    <Text style={styles.detailsText}>{reservation.cinema_name}</Text>
                    <Text style={styles.detailsText}>{reservation.hall_name}</Text>
                    <Text style={styles.detailsText}>{format(new Date(reservation.showtime_start), 'MMMM d, yyyy HH:mm')}</Text>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    poster: {
        width: 100,
        height: 150,
        borderRadius: 8,
    },
    detailsContainer: {
        marginLeft: 16,
        flex: 1,
    },
    movieTitle: {
        color: theme.colors.textPrimary,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detailsText: {
        color: theme.colors.textPrimary,
        fontSize: 14,
        marginBottom: 4,
    }
});

export default ReservationInfo;