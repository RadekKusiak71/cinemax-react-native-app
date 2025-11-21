import CinemaHeader from "@/components/cinema/cinema-header";
import { fireEvent, render, screen } from "@testing-library/react-native";


describe("CinemaHeader Component", () => {
    it("renders correctly with given props", () => {
        const mockOnChange = jest.fn();
        render(<CinemaHeader cinemaName="Cinema One" onChange={mockOnChange} />);
        const title = screen.getByText("Now Showing");
        const cinemaName = screen.getByText("Cinema One");
        const changeButton = screen.getByRole("button", { name: "Change Cinema" });
        expect(title).toBeTruthy();
        expect(cinemaName).toBeTruthy();
        expect(changeButton).toBeTruthy();
    });

    it("displays 'Select a Cinema' when no cinemaName is provided", () => {
        const mockOnChange = jest.fn();
        render(<CinemaHeader onChange={mockOnChange} />);
        const cinemaName = screen.getByText("Select a Cinema");
        expect(cinemaName).toBeTruthy();
    });

    it("calls onChange when the Change button is pressed", () => {
        const mockOnChange = jest.fn();
        render(<CinemaHeader cinemaName="Cinema One" onChange={mockOnChange} />);
        const changeButton = screen.getByRole("button", { name: "Change Cinema" });
        fireEvent.press(changeButton);
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });
});