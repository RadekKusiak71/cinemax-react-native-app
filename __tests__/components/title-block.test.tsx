import TitleBlock from "@/components/title-block";
import { render, screen } from "@testing-library/react-native";


describe('TitleBlock Component', () => {

    it('renders correctly with the provided title and subtitle', () => {
        render(<TitleBlock title="Main Title" subtitle="This is a subtitle" />);

        const title = screen.getByText('Main Title');
        const subtitle = screen.getByText('This is a subtitle');
        expect(title).toBeTruthy();
        expect(subtitle).toBeTruthy();
    });
});