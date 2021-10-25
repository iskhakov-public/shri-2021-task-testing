import React from "react";
import { it } from "@jest/globals";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { products } from "../api.mock";
import { render as routeRender } from "../render";

describe("Catalog.tsx", () => {
  it("Have catalog items", async () => {
    const length = products.length;
    const { queryByText, getAllByTestId } = routeRender("/catalog");
    await waitForElementToBeRemoved(() => queryByText(/loading/i));
    for (let i = 1; i < length; i++) {
      const items = getAllByTestId(i);
      expect(items[0]).toHaveTextContent(products[i].name);
      expect(items[0]).toHaveTextContent(products[i].price.toString());
      expect(items[0].querySelector("a")).toHaveAttribute(
        "href",
        `/catalog/${products[i].id}`
      );
    }
  });

  it("Configured router /catalog to Catalog component", () => {
    const { container } = routeRender("/catalog", { routerOnly: true });
    expect(container.firstChild).toHaveClass("Catalog");
  });
});
