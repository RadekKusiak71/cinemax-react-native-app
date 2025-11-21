import { ErrorScreen } from "@/components/ui/error-screen";
import { render } from "@testing-library/react-native";


describe("ErrorScreen Component", () => {
    it("renders with default message", () => {
        const { getByText } = render(<ErrorScreen />);
        expect(getByText("An unexpected error occurred.")).toBeTruthy();
    });
    it("renders with custom message", () => {
        const customMessage = "Custom error message.";
        const { getByText } = render(<ErrorScreen message={customMessage} />);
        expect(getByText(customMessage)).toBeTruthy();
    });
});