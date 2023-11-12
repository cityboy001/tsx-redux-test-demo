import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { AppStore, ReducerDataStructrue, setupStore } from "../reducers";
import { MemoryRouter } from "react-router-dom";

export const getDefaultMockState = (): ReducerDataStructrue => {
  return {
    cart: {
      productList: {},
    },
    list: {
      isLoadingList: false,
      pagination: {
        page: 1,
        pageSize: 10,
      },
      productList: [],
      scrollTop: 0,
      selectedItem: null,
    },
  };
};

export function renderWith(
  ui: React.ReactElement,
  options?:
    | {
        initialPath?: string;
        preloadedState?: any;
        store?: AppStore;
        [key: string]: any;
      }
    | undefined
) {
  const {
    initialPath = "/",
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = options || {};
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialPath]}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
