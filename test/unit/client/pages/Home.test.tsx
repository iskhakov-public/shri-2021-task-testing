import React from "react";
import { it } from "@jest/globals";
import { render } from "@testing-library/react";
import { render as routeRender } from "../render";

import { Home } from "../../../../src/client/pages/Home";

describe("Home.tsx", () => {
  it("Have static content", () => {
    const { asFragment } = render(<Home />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Configured router / to Home component", () => {
    const { container } = routeRender("/", { routerOnly: true });
    expect(container.firstChild).toHaveClass("Home");
  });
});
