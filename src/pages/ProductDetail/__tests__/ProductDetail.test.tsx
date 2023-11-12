import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "../ProductDetail";
import { getDefaultMockState, renderWith } from "../../../utils/testUtils";
import { getProductItem } from "../../../utils/dataHelper";
import {
  productDetailPath,
  productDetailPathFullPath,
} from "../../../config/router";

describe("test <ProductDetail />", () => {
  test("should render product detail accroding to product id in the url path", () => {
    const mockState = getDefaultMockState();
    const product1 = getProductItem();
    const product2 = getProductItem();
    mockState.list.productList = [product1, product2];

    renderWith(
      <Routes>
        <Route
          path={productDetailPathFullPath}
          element={<ProductDetail />}
        ></Route>
      </Routes>,
      {
        preloadedState: mockState,
        initialPath: productDetailPath + "/" + product1.id,
      }
    );

    const productName = screen.getByText(product1.productName);
    const productDescription = screen.getByText(product1.productDescription);
    const price = screen.getByText(product1.price);
    const product = screen.getByText(product1.product);
    const productMaterial = screen.getByText(product1.productMaterial);
    const image = screen.getByAltText("ProductImage");
    expect(productName).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(product).toBeInTheDocument();
    expect(productMaterial).toBeInTheDocument();
    expect(image).toHaveAttribute("src", product1.image);
  });

  describe("when click the count button", () => {
    test("should change the value in the input", () => {
      const mockState = getDefaultMockState();
      const product1 = getProductItem();
      const product2 = getProductItem();
      mockState.list.productList = [product1, product2];

      renderWith(
        <Routes>
          <Route
            path={productDetailPathFullPath}
            element={<ProductDetail />}
          ></Route>
        </Routes>,
        {
          preloadedState: mockState,
          routePath: productDetailPathFullPath,
          initialPath: productDetailPath + "/" + product1.id,
        }
      );

      const buttons = screen.getAllByRole("button");
      const input = screen.getByRole("textbox");

      fireEvent.click(buttons[1]);
      expect(input).toHaveValue("2");

      fireEvent.click(buttons[0]);
      expect(input).toHaveValue("1");
    });
  });

  describe("when click the Add-to-cart button", () => {
    test("should change the value in the input", () => {
      const mockState = getDefaultMockState();
      const product1 = getProductItem();
      const product2 = getProductItem();
      mockState.list.productList = [product1, product2];

      const { store } = renderWith(
        <Routes>
          <Route
            path={productDetailPathFullPath}
            element={<ProductDetail />}
          ></Route>
        </Routes>,
        {
          preloadedState: mockState,
          routePath: productDetailPathFullPath,
          initialPath: productDetailPath + "/" + product1.id,
        }
      );

      const buttons = screen.getAllByRole("button");
      const input = screen.getByRole("textbox");

      fireEvent.click(buttons[1]);
      expect(input).toHaveValue("2");

      fireEvent.click(buttons[2]);
      expect(store.getState().cart.productList).toEqual({
        [product1.id]: {
          count: 2,
          product: product1,
        },
      });
    });
  });
});
