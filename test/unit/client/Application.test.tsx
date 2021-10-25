import { screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { render } from "./render";

describe("Application.tsx", () => {
  it("Contains nav elements with pages: catalog, delivery, contacts, cart", () => {
    const { getByRole } = render("/");
    expect(getByRole("link", { name: /contacts/i })).toHaveAttribute(
      "href",
      "/contacts"
    );
    expect(getByRole("link", { name: /catalog/i })).toHaveAttribute(
      "href",
      "/catalog"
    );
    expect(getByRole("link", { name: /delivery/i })).toHaveAttribute(
      "href",
      "/delivery"
    );
    expect(getByRole("link", { name: /cart/i })).toHaveAttribute(
      "href",
      "/cart"
    );
  });

  it("Contains link with ref to main", () => {
    const { getByRole } = render("/");
    expect(getByRole("link", { name: /example store/i })).toHaveAttribute(
      "href",
      "/"
    );
  });
});
