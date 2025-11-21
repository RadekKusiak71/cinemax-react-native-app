import { LoadingScreen } from "@/components/ui/loading-screen";
import { render } from "@testing-library/react-native";


describe("Loading Screen Component", () => {
    it("renders with default message", () => {
        const { getByText } = render(<LoadingScreen />);
        expect(getByText("Loading...")).toBeTruthy();
    });
    it("renders with custom message", () => {
        const customMessage = "Please wait, loading data.";
        const { getByText } = render(<LoadingScreen message={customMessage} />);
        expect(getByText(customMessage)).toBeTruthy();
    });
});