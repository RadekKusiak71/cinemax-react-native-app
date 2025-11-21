import Pill from "@/components/pill";
import TitleBlock from "@/components/title-block";
import { ErrorScreen } from "@/components/ui/error-screen";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { theme } from "@/constants/theme";
import { MovieDetail } from "@/types/movies";
import { Image } from "expo-image";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

type MovieDetailsProps = {
    movie: MovieDetail;
    IsLoading: boolean;
    IsError: boolean;
    refetch: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, IsLoading, IsError, refetch }) => {
    if (IsLoading) return <LoadingScreen message="Loading movie details..." />;
    if (IsError) return <ErrorScreen message="Failed to load movie details." />;

    return (
        <View>
            <Image
                style={styles.image}
                source={{ uri: movie.poster_path }}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
                accessibilityLabel={`${movie.title} poster`}
            />

            <View style={styles.overviewContainer}>
                <TitleBlock title={movie.title} subtitle={movie.release_date} />

                {movie.genres && movie.genres.length > 0 && (
                    <View>
                        <FlatList
                            data={movie.genres}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => <Pill label={item.name} />}
                            contentContainerStyle={styles.listContent}
                        />
                    </View>
                )}

                {movie.directors && movie.directors.length > 0 && (
                    <View>
                        <FlatList
                            data={movie.directors}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Pill label={`${item.first_name} ${item.last_name}`} />
                            )}
                            contentContainerStyle={styles.listContent}
                        />
                    </View>
                )}
                <Text style={styles.movieDescription}>{movie.overview}</Text>
            </View >
        </View >
    );
};

const styles = StyleSheet.create({
    image: {
        height: 500,
        width: '100%',
    },
    overviewContainer: {
        flex: 1,
        gap: 15,
        padding: 18,
    },
    movieDescription: {
        fontSize: 16,
        color: theme.colors.textMuted
    },
    listContent: {
        gap: 8,
    },
});

export default MovieDetails;