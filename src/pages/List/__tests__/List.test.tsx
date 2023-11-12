import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import List from "../List";
import { getDefaultMockState, renderWith } from "../../../utils/testUtils";
import { getProductItem } from "../../../utils/dataHelper";
import ProductDetail from "../../ProductDetail";
import { ROOT_PATH, productDetailPathFullPath } from "../../../config/router";

describe("test <List />", () => {
  test("should render productList data accord to redux", () => {
    const mockState = getDefaultMockState();
    const product1 = getProductItem();
    const product2 = getProductItem();
    mockState.list.productList = [product1, product2];

    renderWith(<List />, {
      preloadedState: mockState,
    });

    const productName = screen.getByText(product1.productName);
    const images = screen.getAllByAltText("ProductImage");
    
    expect(productName).toBeInTheDocument();
    expect(images).toHaveLength(2);
  });

  describe("when click the Link", () => {
    test("should navigate to ProductDetail page", () => {
      const mockState = getDefaultMockState();
      const product1 = getProductItem();
      const product2 = getProductItem();
      mockState.list.productList = [product1, product2];

      renderWith(
        <Routes>
          <Route path={ROOT_PATH} element={<List />}></Route>
          <Route path={productDetailPathFullPath} element={<ProductDetail />}></Route>
        </Routes>,
        {
          preloadedState: mockState,
        }
      );

      const links = screen.getAllByRole("link");
      fireEvent.click(links[0]);

      const productName = screen.getByText(product1.productName);
      const ProductDetailPageTitle = screen.getByText(/Product Detail/);

      expect(productName).toBeInTheDocument()
      expect(ProductDetailPageTitle).toBeInTheDocument()
    });
  });
});
