import { getProductItem } from "../../utils/dataHelper";
import { getDefaultMockState } from "../../utils/testUtils";
import reducer, { addToCartProductList } from "../cart";

describe("test getCartProductList reducer", () => {
  test("it should set product list successfully", () => {
    const mockState = getDefaultMockState().cart;
    const mockProducts = {
      count: 2,
      product: getProductItem(),
    };

    const result = reducer(mockState, addToCartProductList(mockProducts));

    expect(result.productList).toEqual({
      [mockProducts.product.id]: mockProducts,
    });
  });
});
