import React from "react";
import { it } from "@jest/globals";
import { render } from "@testing-library/react";
import { render as routeRender } from "../render";

import { Delivery } from "../../../../src/client/pages/Delivery";

describe("Delivery.tsx", () => {
  it("Have static content", () => {
    const { asFragment } = render(<Delivery />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Configured router /delivery to Delivery component", () => {
    const { container } = routeRender("/contacts", { routerOnly: true });
    expect(container.firstChild).toHaveClass("Contacts");
  });
});
