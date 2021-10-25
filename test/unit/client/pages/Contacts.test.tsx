import React from "react";
import { it } from "@jest/globals";
import { render } from "@testing-library/react";
import { render as routeRender } from "../render";

import { Contacts } from "../../../../src/client/pages/Contacts";

describe("Contacts.tsx", () => {
  it("Have static content", () => {
    const { asFragment } = render(<Contacts />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("Configured router /contacts to Contacts component", () => {
    const { container } = routeRender("/contacts", { routerOnly: true });
    expect(container.firstChild).toHaveClass("Contacts");
  });
});
