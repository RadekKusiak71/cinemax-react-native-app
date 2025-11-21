import TimeSlot from "@/components/showtimes/time-slot";
import { theme } from "@/constants/theme";
import { fireEvent, render } from "@testing-library/react-native";


jest.mock('@/constants/theme', () => ({
    theme: {
        colors: {
            primary: '#0000FF',
            background: '#FFF41F',
            textOnPrimary: '#FFFF12',
            textPrimary: '#000000',
            textMuted: '#777777',
        },
    },
}));

describe("TimeSlot Component", () => {

    test("should render correctly", () => {
        const { getByText } = render(<TimeSlot time="2099-11-21T22:38:43.943Z" onPress={() => { }} />);
        expect(getByText("23:38")).toBeTruthy();
    });

    test("should handle onPress event", () => {
        const mockPress = jest.fn();
        const { getByText } = render(<TimeSlot time="2099-11-21T22:38:43.943Z" onPress={mockPress} />);
        const timeSlot = getByText("23:38");
        fireEvent.press(timeSlot);
        expect(mockPress).toHaveBeenCalled();
    });

    test("should apply past date styles correctly", () => {
        const { getByText } = render(<TimeSlot time="2000-01-01T10:00:00.000Z" onPress={() => { }} />);
        const timeSlot = getByText("11:00");

        const text = timeSlot.parent;
        const touchableOpacity = text.parent;

        console.log(touchableOpacity.props.style);
        console.log(text.props.style);

        expect(touchableOpacity.props.style.backgroundColor).toEqual(theme.colors.textMuted);
        expect(text.props.style[1].color).toEqual(theme.colors.textOnPrimary);
    });

});