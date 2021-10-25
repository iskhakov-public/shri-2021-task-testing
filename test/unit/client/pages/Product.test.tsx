import React from "react";
import { it } from "@jest/globals";
import {
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { MockCartApi, products } from "../api.mock";
import { render as routeRender, renderWithRedux } from "../render";
import { ProductDetails } from "../../../../src/client/components/ProductDetails";
import { CartItem, CartState } from "../../../../src/common/types";

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
    const product = products[1]
    const cartAPI = new MockCartApi()
        const cartStateObject: CartItem = {
            count: 1,
            price: product.price,
            name: product.name
        }
        const cartState: CartState = {
            "1": cartStateObject
        }
        cartAPI.setState(cartState)
    // Render page with location /catalog/1
    let { getByRole, getAllByTestId, queryByText } = routeRender("/catalog/2", { cart: cartAPI });

    // Wait till Loading text is disappeared
    await waitForElementToBeRemoved(() => queryByText(/loading/i));

    // Check that we have 'Cart (1)' in navbar
    expect(getByRole("link", { name: /cart/i })).toHaveTextContent("(1)")

    // Click 'Add to Cart'
    userEvent.click(getByRole('button', { name: /add to cart/i }))

    // Now we must have 'Cart (2)'
    await expect(getByRole("link", { name: /cart/i })).toHaveTextContent("(2)")
  })


});
