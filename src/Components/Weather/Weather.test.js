import { render } from "@testing-library/react";
import Weather from "./Weather";

describe("Weather tests", () => {
  it("should render", () => {
    const { container } = render(<Weather />);
    expect(container).toMatchSnapshot();
  });
});
