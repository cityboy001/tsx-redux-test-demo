import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import Cart from "../Cart";
import { getDefaultMockState, renderWith } from "../../../utils/testUtils";
import { getProductItem } from "../../../utils/dataHelper";

describe("test <Cart />", () => {
  test("should render productList data accord to redux", () => {
    const mockState = getDefaultMockState();
    const product1 = getProductItem();
    const product2 = getProductItem();

    mockState.cart = {
      productList: {
        [product1.id]: {
          count: 2,
          product: product1,
        },
        [product2.id]: {
          count: 2,
          product: product2,
        },
      },
    };

    renderWith(<Cart />, {
      preloadedState: mockState,
    });

    const productName1 = screen.getByText(product1.productName);
    const productName2 = screen.getByText(product2.productName);

    expect(productName1).toBeInTheDocument();
    expect(productName2).toBeInTheDocument();
  });

  test("should render total price of the products", () => {
    const mockState = getDefaultMockState();
    const product1 = getProductItem();
    const product2 = getProductItem();
    mockState.cart = {
      productList: {
        [product1.id]: {
          count: 2,
          product: product1,
        },
        [product2.id]: {
          count: 2,
          product: product2,
        },
      },
    };

    renderWith(<Cart />, {
      preloadedState: mockState,
    });

    const total = Number(product1.price) * 2 + Number(product2.price) * 2;
    const price = screen.getByText(total.toFixed(2));
    expect(price).toBeInTheDocument();
  });

  describe("when click the minus button", () => {
    test("should delete product in the cart", () => {
      const mockState = getDefaultMockState();
      const product1 = getProductItem();
      const product2 = getProductItem();
      mockState.cart = {
        productList: {
          [product1.id]: {
            count: 2,
            product: product1,
          },
          [product2.id]: {
            count: 2,
            product: product2,
          },
        },
      };

      const {store}  = renderWith(<Cart />, {
        preloadedState: mockState,
      });

      const buttonMinus = screen.getAllByRole("button", {
        name: "-",
      });

      fireEvent.click(buttonMinus[0]);

      expect(store.getState().cart.productList[product1.id].count).toEqual(1);
    });
  });

  describe("when delete the last one product", () => {
    test("shoule delete the products item", () => {
      const mockState = getDefaultMockState();
      const product1 = getProductItem();
      const product2 = getProductItem();
      mockState.cart = {
        productList: {
          [product1.id]: {
            count: 1,
            product: product1,
          },
          [product2.id]: {
            count: 2,
            product: product2,
          },
        },
      };

      const {store}  = renderWith(<Cart />, {
        preloadedState: mockState,
      });

      const buttonMinus = screen.getAllByRole("button", {
        name: "-",
      });

      fireEvent.click(buttonMinus[0]);

      expect(store.getState().cart.productList[product1.id]).toBeUndefined()
    });
  });

  describe("when click the add button", () => {
    test("should delete product in the cart", () => {
      const mockState = getDefaultMockState();
      const product1 = getProductItem();
      const product2 = getProductItem();
      mockState.cart = {
        productList: {
          [product1.id]: {
            count: 2,
            product: product1,
          },
          [product2.id]: {
            count: 2,
            product: product2,
          },
        },
      };

      const {store}  = renderWith(<Cart />, {
        preloadedState: mockState,
      });

      const buttonMinus = screen.getAllByRole("button", {
        name: "+",
      });

      fireEvent.click(buttonMinus[0]);

      expect(store.getState().cart.productList[product1.id].count).toEqual(3);
    });
  });

  describe("when cart has no product", () => {
    test("should render no-product tip", () => {
      const mockState = getDefaultMockState();
      mockState.cart = {
        productList: {},
      };

      renderWith(<Cart />, {
        preloadedState: mockState,
      });

      const tip = screen.getByText("You don't add any product to your cart!");
      expect(tip).toBeInTheDocument();
    });
  });
});
