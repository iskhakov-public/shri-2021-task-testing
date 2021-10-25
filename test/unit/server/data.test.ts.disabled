import { ExampleStore } from "../../../src/server/data";
import { Order, Product, ProductShortInfo } from "../../../src/common/types";

// It would be perfect to inject stubbed version of faker,
// but it is impossible without changing sources

describe("Server API handlers", () => {
  it("getAllProducts: Initial list of products has at least 5 elements", () => {
    const store = new ExampleStore();

    expect(store.getAllProducts().length).toBeGreaterThan(5);
  });

  it("getAllProducts: returns elements with {id, name, price}", () => {
    const store = new ExampleStore();
    const products = store.getAllProducts();
    for (let product of products) {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
    }
  });

  it("getProductById: returns existing element", () => {
    const store = new ExampleStore();
    const products = store.getAllProducts();

    for (let product of products) {
      expect(store.getProductById(product.id)).toMatchObject(product);
    }
  });

  it("getProductById: returns undefined with not existing id", () => {
    const store = new ExampleStore();
    const products = store.getAllProducts();

    let id = 1;
    while (true) {
      if (products.find((elem) => elem.id == id) === undefined) {
        break;
      } else {
        id++;
      }
    }

    expect(store.getProductById(id)).toBeUndefined();
  });

  it("createOrder: creates and finds the order in order list", () => {
    const store = new ExampleStore();
    const products = store.getAllProducts();

    const order: Order = {
      form: {
        address: "Lva Tolstova St, 16",
        name: "Alisa from Yandex ML",
        phone: "112",
      },
      cart: {
        [products[0].id]: {
          name: "Stone of ",
          count: 5,
          price: 100500,
        },
      },
    };

    const orderId = store.createOrder(order);

    const foundedOrder = store
      .getLatestOrders()
      .find((obj: any) => obj.id === orderId);
    expect(foundedOrder).toMatchObject(order);
  });
});
