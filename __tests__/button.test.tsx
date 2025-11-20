import Button from "@/components/button";
import { theme } from "@/constants/theme";
import { fireEvent, render, screen } from "@testing-library/react-native";


jest.mock('@/constants/theme', () => ({
    theme: {
        colors: {
            primary: '#0000FF',
            textOnPrimary: '#FFFF12F',
            textMuted: '#AAAAAA',
        },
    },
}));




describe('Button Component', () => {

    it('renders correctly with the provided text', () => {
        render(<Button title="Click Me" onPress={() => { }} />);
        const buttonText = screen.getByText('Click Me');
        expect(buttonText).toBeTruthy();
    });

    it('calls onPress when pressed', () => {
        const mockOnPress = jest.fn();
        render(<Button title="Press Me" onPress={mockOnPress} />);
        const button = screen.getByText('Press Me');
        fireEvent.press(button);

        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    it('applies primary variant styles by default', () => {
        render(<Button title="Primary Button" onPress={() => { }} />);
        const component = screen.getByText('Primary Button');

        const buttonText = component.parent;
        const pressable = buttonText.parent;

        expect(pressable?.props.style[1].backgroundColor).toEqual(theme.colors.primary);
        expect(buttonText?.props.style[1].color).toEqual(theme.colors.textOnPrimary);
    });

    it('applies secondary variant styles', () => {
        render(<Button title="Secondary Button" onPress={() => { }} version="secondary" />);
        const component = screen.getByText('Secondary Button');
        const buttonText = component.parent;
        const pressable = buttonText.parent;

        expect(pressable?.props.style[1].borderColor).toEqual(theme.colors.primary);
        expect(buttonText?.props.style[1].color).toEqual(theme.colors.primary);
    });

    it('shows loading indicator when isLoading is true', () => {
        render(<Button title="Loading Button" onPress={() => { }} isLoading={true} />);
        const activityIndicator = screen.getByTestId('activity-indicator');
        expect(activityIndicator).toBeTruthy();
    });

});