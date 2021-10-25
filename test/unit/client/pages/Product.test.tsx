import React from "react";
import { it } from "@jest/globals";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { products } from "../api.mock";
import { render as routeRender } from "../render";

describe("Product.tsx", () => {
  it("Contain ", async () => {
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
});
