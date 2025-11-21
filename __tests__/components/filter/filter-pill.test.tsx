import FilterPill from "@/components/filter/filter-pill";
import { theme } from "@/constants/theme";
import { fireEvent, render } from "@testing-library/react-native";

jest.mock('@/constants/theme', () => ({
    theme: {
        colors: {
            primary: '#007bff',
            textMuted: '#6c757d',
            textOnPrimary: '#ffffff',
        },
    },
}));


describe("FilterPill Component", () => {
    it("should render correctly when not selected", () => {
        const { getByText } = render(
            <FilterPill
                label="Action"
                isSelected={false}
                onPress={() => { }}
            />
        );

        const pillText = getByText("Action");
        expect(pillText).toBeTruthy();
        expect(pillText.props.style).toEqual(expect.arrayContaining([expect.objectContaining({
            color: theme.colors.textMuted
        })]));
    });

    it("should render correctly when selected", () => {
        const { getByText } = render(
            <FilterPill
                label="Action"
                isSelected={true}
                onPress={() => { }}
            />
        );

        const pillText = getByText("Action");
        expect(pillText).toBeTruthy();
        expect(pillText.props.style).toEqual(expect.arrayContaining([expect.objectContaining({
            color: theme.colors.textOnPrimary
        })]));

    });

    it("should handle onPress event", () => {
        const onPressMock = jest.fn();
        const { getAllByRole } = render(
            <FilterPill
                label="Action"
                isSelected={false}
                onPress={onPressMock}
            />
        );

        fireEvent.press(getAllByRole('button')[0]);
        expect(onPressMock).toHaveBeenCalledTimes(1);
    });

});