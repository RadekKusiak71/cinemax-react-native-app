import MovieCard from "@/components/movies/movie-card";
import { render, screen } from "@testing-library/react-native";


describe("MovieCard Component", () => {
    it("renders correctly with given props", () => {
        const mockProps = {
            id: 1,
            imageUrl: "https://example.com/poster.jpg",
            title: "Inception",
            releaseDate: "2010-07-16",
            onPress: jest.fn(),
        };
        render(<MovieCard {...mockProps} />);

        const titleText = screen.getByText("Inception");
        const releaseDateText = screen.getByText("2010-07-16");
        const image = screen.getByLabelText("Inception poster");
        expect(titleText).toBeTruthy();
        expect(releaseDateText).toBeTruthy();
        expect(image).toBeTruthy();
    });
});