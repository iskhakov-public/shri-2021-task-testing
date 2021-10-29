import React from "react";
import { Router, Switch, Route } from "react-router";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { render as reactTestRender } from "@testing-library/react";

import { initStore } from "../../../src/client/store";
import { Application } from "../../../src/client/Application";
import { Home } from "../../../src/client/pages/Home";
import { Catalog } from "../../../src/client/pages/Catalog";
import { Product } from "../../../src/client/pages/Product";
import { Delivery } from "../../../src/client/pages/Delivery";
import { Contacts } from "../../../src/client/pages/Contacts";
import { Cart } from "../../../src/client/pages/Cart";
import { MockApi, MockCartApi } from "./api.mock";
import "@testing-library/jest-dom/extend-expect";

type RenderConfig = {
  routerOnly?: boolean
  api?: MockApi
  cart?: MockCartApi
}

export function render(path: string, config: RenderConfig = {}) {
  const { routerOnly = false, api = new MockApi("hw/store"), cart = new MockCartApi()} = config;
  const initedStore = initStore(api, cart);


  const history = createMemoryHistory({
    initialEntries: [path],
    initialIndex: 0,
  });

  return reactTestRender(
    <Router history={history}>
      <Provider store={initedStore}>
        {routerOnly ? (
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/catalog" exact component={Catalog} />
            <Route path="/catalog/:id" component={Product} />
            <Route path="/delivery" component={Delivery} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/cart" component={Cart} />
          </Switch>
        ) : (
          <Application />
        )}
      </Provider>
    </Router>
  );
}

export function renderWithRedux(component: React.ComponentElement<any, any>) {
  const api = new MockApi("/hw/store");
  const cart = new MockCartApi();
  const initedStore = initStore(api, cart);

  return reactTestRender(
    <Provider store={initedStore}>
      {component}
    </Provider>
  )
}
