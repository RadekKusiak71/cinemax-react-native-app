import { theme } from '@/constants/theme';
import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type MovieCardProps = {
    id: number
    imageUrl: string
    title: string
    releaseDate: string
};

const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const MovieCard = ({ id, imageUrl, title, releaseDate }: MovieCardProps) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: imageUrl }}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                accessibilityLabel={`${title} poster`}
            />

            <Text style={styles.title} numberOfLines={1}>
                {title}
            </Text>
            <Text style={styles.releaseDate}>
                {releaseDate}
            </Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 8,
        marginBottom: 16,
        maxWidth: '48%',
    },
    image: {
        height: 250,
        borderRadius: 12,
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.textPrimary || '#000',
        marginTop: 4,
    },
    releaseDate: {
        fontSize: 13,
        color: theme.colors.textMuted || '#666',
    },
});

export default MovieCard;