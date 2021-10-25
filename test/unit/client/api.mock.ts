import { AxiosResponse } from "axios";
import { commerce } from "faker";
import { CartApi, ExampleApi } from "../../../src/client/api";
import {
  Product,
  ProductShortInfo,
  CheckoutFormData,
  CheckoutResponse,
  CartState,
} from "../../../src/common/types";

const generateProducts = () => {
  const products: Product[] = [];

  for (let id = 0; id < 27; id++) {
    products.push({
      id,
      name: `${commerce.productAdjective()} ${commerce.product()}`,
      description: commerce.productDescription(),
      price: Number(commerce.price()),
      color: commerce.color(),
      material: commerce.productMaterial(),
    });
  }

  return products;
};

function getShortInfo({ id, name, price }: Product): ProductShortInfo {
  return { id, name, price };
}

export const products = generateProducts();

export class MockApi extends ExampleApi {
  async getProducts() {
    return {
      data: products.map((product) => getShortInfo(product)),
    } as unknown as AxiosResponse<ProductShortInfo[], any>;
  }

  async getProductById(id: number) {
    return {
      data: products[id],
    } as unknown as AxiosResponse<Product, any>;
  }

  async checkout(form: CheckoutFormData, cart: CartState) {
    return {
      data: {
        id: 100500,
      },
    } as unknown as AxiosResponse<CheckoutResponse, any>;
  }
}

export class MockCartApi extends CartApi {
  cartState: CartState;

  getState(): CartState {
    return this.cartState || {};
  }

  setState(cart: CartState) {
    this.cartState = cart;
  }
}
