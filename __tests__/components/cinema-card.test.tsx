import CinemaCard from "@/components/cinema-card";
import { theme } from "@/constants/theme";
import { fireEvent, render, screen } from "@testing-library/react-native";


jest.mock('@/constants/theme', () => ({
    theme: {
        colors: {
            primary: '#0000FF',
            background: '#FFFFFF',
            textMuted: '#888888',
            textPrimary: '#000000',
        },
    },
}));


describe('CinemaCard Component', () => {
    it('renders correctly with given props', () => {
        const mockOnPress = jest.fn();
        render(
            <CinemaCard
                id={1}
                name="Cinema One"
                city="New York"
                isActive={false}
                onPress={mockOnPress}
            />
        );

        const nameText = screen.getByText('Cinema One');
        const cityText = screen.getByText('New York');

        expect(nameText).toBeTruthy();
        expect(cityText).toBeTruthy();
    });

    it('applies active styles when isActive is true', () => {
        const mockOnPress = jest.fn();
        const { getByText } = render(
            <CinemaCard
                id={2}
                name="Cinema Two"
                city="Los Angeles"
                isActive={true}
                onPress={mockOnPress}
            />
        );

        const card = getByText('Cinema Two').parent.parent;
        expect(card.props?.style.borderColor).toEqual(theme.colors.primary);
    });

    it('calls onPress when the card is pressed', () => {
        const mockOnPress = jest.fn();
        const { getByText } = render(
            <CinemaCard
                id={3}
                name="Cinema Three"
                city="Chicago"
                isActive={false}
                onPress={mockOnPress}
            />
        );

        const card = getByText('Cinema Three');
        fireEvent.press(card);

        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});