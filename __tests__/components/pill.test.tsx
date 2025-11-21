import Pill from "@/components/pill";
import { render } from "@testing-library/react-native";


describe('Pill Component', () => {
    it('renders correctly with given label', () => {
        const label = 'Action';
        const { getByText } = render(<Pill key={1} label={label} />);
        expect(getByText(label)).toBeTruthy();
    });
});