import React from "react";
import { it } from "@jest/globals";
import {
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { products } from "../api.mock";
import { render as routeRender, renderWithRedux } from "../render";
import { ProductDetails } from "../../../../src/client/components/ProductDetails";

describe("Product.tsx", () => {
  it("Detailed view contain all info about product ", () => {
    const product = products[0]
    const { getByText, getByRole, container } = renderWithRedux(<ProductDetails product={product} />)
    getByText(product.name)
    getByText(product.description)
    expect(container).toHaveTextContent(`${product.price}`)
    getByText(product.color)
    getByText(product.material)
    getByRole('button', { name: /add to cart/i })
  });

  it("Path /catalog/1 contains ProductDetails component", async () => {
    const { container, queryByText } = routeRender("/catalog/1", { routerOnly: true });
    await waitForElementToBeRemoved(() => queryByText(/loading/i));
    expect(container.querySelector(".ProductDetails")).toBeInTheDocument()
  })

  it("When item is added to cart text 'Item in cart' displays", async () => {
    const product = products[0]
    const { getByText, getByRole, container } = renderWithRedux(<ProductDetails product={product} />)
    userEvent.click(getByRole('button', { name: /add to cart/i }))
    getByText(/item in cart/i)
  })

  it("When one item in the cart, adding more items increases counter", async () => {
    // Render page with location /catalog/1
    let { getByRole, queryByText, getAllByTestId } = routeRender("/catalog/1");

    // Wait till Loading text is disappeared
    await waitForElementToBeRemoved(() => queryByText(/loading/i));

    // We must have 'Cart' in navbar, not 'Cart (1)'
    expect(getByRole("link", { name: /cart/i })).not.toHaveTextContent("(")

    // Click 'Add to Cart' button
    userEvent.click(getByRole('button', { name: /add to cart/i }))

    // Check that we have 'Cart (1)' in navbar
    await expect(getByRole("link", { name: /cart/i })).toHaveTextContent("(1)")

    // Go to Catalog page, by clicking the nav a
    userEvent.click(getByRole("link", { name: /catalog/i }))

    // Wait till Loading is disappeared
    await waitForElementToBeRemoved(() => queryByText(/loading/i));

    // Go to product page with testid 2 (previously we had testid 1)
    userEvent.click(getAllByTestId("2")[0].querySelector("a"))

    await waitForElementToBeRemoved(() => queryByText(/loading/i));

    // Click 'Add to Cart'
    userEvent.click(getByRole('button', { name: /add to cart/i }))

    // Now we must have 'Cart (2)'
    await expect(getByRole("link", { name: /cart/i })).toHaveTextContent("(2)")
  })


});
