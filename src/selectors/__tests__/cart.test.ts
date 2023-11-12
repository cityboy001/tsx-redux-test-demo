import { getProductItem } from "../../utils/dataHelper";
import { getDefaultMockState } from "../../utils/testUtils";
import { getCartProductList } from "../cart";

describe("test getCartProductList selectors", () => {
  test("it should get product list in the cart", () => {
    const mockState = getDefaultMockState();
    const mockProductList = {
      "test-id": {
        count: 2,
        product: getProductItem(),
      },
    };
    mockState.cart.productList = mockProductList;

    const productList = getCartProductList(mockState);

    expect(productList).toEqual(mockProductList);
  });
});
