import FilterList from "@/components/filter/filter-list";
import { render } from "@testing-library/react-native";


describe("FilterList Component", () => {

    it("should render correctly with given props", () => {
        const items = ["Action", "Comedy", "Drama"];
        const selectedItems = ["Comedy"];
        const onSelectMock = jest.fn();

        const { getByText, getAllByText } = render(
            <FilterList
                items={items}
                selectedItems={selectedItems}
                onSelect={onSelectMock}
                title="Filter by Genre"
            />
        );
        expect(getByText("Filter by Genre")).toBeTruthy();
        items.forEach(item => {
            expect(getByText(item)).toBeTruthy();
        });
        expect(getAllByText("Comedy").length).toBe(1);
    });



});