import { render } from "@testing-library/react";
import News from "./News";

describe("News tests", () => {
  it("should render", () => {
    const { container } = render(<News />);
    expect(container).toMatchSnapshot();
  });
});
