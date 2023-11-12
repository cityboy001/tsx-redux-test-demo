import { getProductItem } from "../../utils/dataHelper";
import { getDefaultMockState } from "../../utils/testUtils";
import {
  getProductList,
  getIsLoadingListData,
  getListPagination,
  getScrollTop,
  getSelectedProduct,
} from "../list";
import { faker } from "@faker-js/faker";

describe("test getProductList selectors", () => {
  test("it should get product list", () => {
    const mockState = getDefaultMockState();
    const mockProductList = [getProductItem(), getProductItem()];
    mockState.list.productList = mockProductList;

    const productList = getProductList(mockState);

    expect(productList).toEqual(mockProductList);
  });
});

describe("test getIsLoadingListData selectors", () => {
  test("it should get product list", () => {
    const mockState = getDefaultMockState();
    const ramdomBoolean = faker.datatype.boolean();
    mockState.list.isLoadingList = ramdomBoolean;

    const isLoadingList = getIsLoadingListData(mockState);

    expect(isLoadingList).toEqual(ramdomBoolean);
  });
});

describe("test getListPagination selectors", () => {
  test("it should get product list", () => {
    const mockState = getDefaultMockState();
    const ramdomPagination = { page: 8, pageSize: 10 };
    mockState.list.pagination = ramdomPagination;

    const pagination = getListPagination(mockState);

    expect(pagination).toEqual(ramdomPagination);
  });
});

describe("test getScrollTop selectors", () => {
  test("it should get product list", () => {
    const mockState = getDefaultMockState();
    const ramdomScrollTop = 30;
    mockState.list.scrollTop = ramdomScrollTop;

    const scrollTop = getScrollTop(mockState);

    expect(scrollTop).toEqual(ramdomScrollTop);
  });
});

describe("test getSelectedProduct selectors", () => {
  test("it should get product list", () => {
    const mockState = getDefaultMockState();
    const mockProduct = getProductItem();
    mockState.list.selectedItem = mockProduct;

    const selectedItem = getSelectedProduct(mockState);

    expect(selectedItem).toEqual(mockProduct);
  });
});
