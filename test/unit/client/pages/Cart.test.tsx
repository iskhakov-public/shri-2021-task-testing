import { CartItem, CartState } from "../../../../src/common/types"
import { MockCartApi } from "../api.mock"
import React from "react";
import { it } from "@jest/globals";
import {
    waitForElementToBeRemoved, screen, waitFor, getByText
} from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { products } from "../api.mock";
import { render as routeRender, renderWithRedux } from "../render";
import { Cart } from "../../../../src/client/pages/Cart";




describe("Cart.tsx", () => {
    it("Adding same item multiple times shouldn't change item counter in the nav", async () => {
        const cartAPI = new MockCartApi()
        const cartState: CartState = {
            "1": { count: 5, price: 1, name: "Test Item" }
        }
        cartAPI.setState(cartState)
        let { getByRole, queryByText } = routeRender("/catalog/", { cart: cartAPI });
        await waitForElementToBeRemoved(() => queryByText(/loading/i));
        await expect(getByRole("link", { name: /cart/i })).toHaveTextContent("(1)")
    })

    it("Added item must be in the cart", async () => {
        const product = products[1]
        let { getByRole, queryByText, getByText, container } = routeRender("/catalog/1");
        await waitForElementToBeRemoved(() => queryByText(/loading/i));
        // Make sure it is the same product
        getByText(product.name); getByText(product.description);
        userEvent.click(getByRole('button', { name: /add to cart/i }))
        await getByText(/item in cart/i)
        userEvent.click(getByRole("link", {name: /cart/i}))
        getByText(product.name); 
        expect(container).toHaveTextContent(product.price.toString()); 
        expect(container.querySelector(".Cart-Count")).toHaveTextContent("1")
    })

    it("Check total calculation", async () => {
        const cartAPI = new MockCartApi()
        const cartStateObject: CartItem = {
            count: 5,
            price: 12,
            name: "Test Item"
        }
        const cartState: CartState = {
            "1": cartStateObject
        }
        cartAPI.setState(cartState)
        let { container, queryByText } = routeRender("/cart/", { cart: cartAPI, routerOnly: true });
        const {price, count} = cartStateObject
        const total = price * count
        expect(container.querySelector(".Cart-Total")).toHaveTextContent(total.toString())
    })

    it("Must exist button to empty cart", async () => {
        const cartAPI = new MockCartApi()
        const cartState: CartState = {
            "1": {
                count: 5,
                price: 12,
                name: "Test Item"
            }, 
            "2": {
                count: 3,
                price: 1332,
                name: "Test Item 2"
            }
        }
        cartAPI.setState(cartState)
        let { container, getByText, getByRole } = routeRender("/cart/", { cart: cartAPI, routerOnly: true });
        userEvent.click(getByRole('button', {
            name: /clear shopping cart/i
          }))
        await getByText(/cart is empty/i)
        
    })

    it("Empty cart must have link to catalog", () => {
        let { getByRole } = routeRender("/cart/", { routerOnly: true });
        getByRole("link", {name: /catalog/i})
        screen.logTestingPlaygroundURL()
    })

})