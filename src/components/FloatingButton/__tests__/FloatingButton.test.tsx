import React from "react";
import { fireEvent, screen } from "@testing-library/react";
import FloatingButton from "../FloatingButton";
import { Routes, Route } from "react-router-dom";
import { renderWith } from "../../../utils/testUtils";
import { ROOT_PATH, cartPath } from "../../../config/router";

describe("test <FloatingButton />", () => {
  describe("when the route path is home", () => {
    test("should render cart icon", () => {
      renderWith(
        <Routes>
          <Route path={ROOT_PATH} element={<FloatingButton />}></Route>
        </Routes>
      );

      const carIcon = screen.getByTestId("cart-icon");
      expect(carIcon).toBeInTheDocument();
    });

    describe("when click the cart icon", () => {
      test("should go to cart page", () => {
        const cartPageText = "cartPageText";

        renderWith(
          <Routes>
            <Route path={ROOT_PATH} element={<FloatingButton />}></Route>
            <Route path={cartPath} element={<>{cartPageText}</>}></Route>
          </Routes>
        );

        const carIcon = screen.getByTestId("cart-icon");
        fireEvent.click(carIcon);

        expect(screen.getByText(cartPageText)).toBeInTheDocument();
      });
    });
  });

  describe("when the route path is cart", () => {
    test("should render house icon", () => {
      renderWith(
        <Routes>
          <Route path={cartPath} element={<FloatingButton />}></Route>
        </Routes>,
        {
          initialPath: cartPath,
        }
      );

      const houseIcon = screen.getByTestId("house-icon");
      expect(houseIcon).toBeInTheDocument();
    });

    describe("when click the house icon", () => {
      test("should go to root page", () => {
        const rootPageText = "rootPageText";

        renderWith(
          <Routes>
            <Route path={cartPath} element={<FloatingButton />}></Route>
            <Route path={ROOT_PATH} element={<>{rootPageText}</>}></Route>
          </Routes>,
          {
            initialPath: cartPath,
          }
        );

        const houseIcon = screen.getByTestId("house-icon");
        fireEvent.click(houseIcon);

        expect(screen.getByText(rootPageText)).toBeInTheDocument();
      });
    });
  });
});
