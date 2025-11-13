import { render, fireEvent, screen } from "@testing-library/vue";
import { describe, it, expect, vi } from "vitest";
import CitySearch from "@/components/city/CitySearch.vue";
import * as geo from "@/services/geo.service";

vi.spyOn(geo, "searchCities").mockResolvedValue([
  {
    id: "1",
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lon: 2.3522,
  },
]);

describe("CitySearch", () => {
  it("renders input and shows results", async () => {
    const user = userEvent();

    const { container } = render(CitySearch);

    const input = screen.getByPlaceholderText(/rechercher une ville/i);
    await fireEvent.update(input, "Paris");

    // laisse le temps au debounce + fetch
    await new Promise((r) => setTimeout(r, 400));

    expect(await screen.findByText(/Paris \(France\)/)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
