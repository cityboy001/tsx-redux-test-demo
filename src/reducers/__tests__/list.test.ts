import { faker } from "@faker-js/faker";
import { getProductItem } from "../../utils/dataHelper";
import { getDefaultMockState } from "../../utils/testUtils";
import reducer, {
  addToProductList,
  setIsLoadingList,
  setSelectedItem,
  setPagination,
  setScrollTop,
} from "../list";

describe("test addToProductList reducer", () => {
  test("it should set product list successfully", () => {
    const mockState = getDefaultMockState().list;
    const mockProductList = [getProductItem(), getProductItem()];

    const result = reducer(mockState, addToProductList(mockProductList));

    expect(result.productList).toEqual(mockProductList);
  });
});

describe("test setIsLoadingList reducer", () => {
  test("it should set isLoadingList successfully", () => {
    const mockState = getDefaultMockState().list;
    const ramdomBoolean = faker.datatype.boolean();

    const result = reducer(mockState, setIsLoadingList(ramdomBoolean));

    expect(result.isLoadingList).toEqual(ramdomBoolean);
  });
});

describe("test setSelectedItem reducer", () => {
  test("it should set selectedItem successfully", () => {
    const mockState = getDefaultMockState().list;
    const mockProduct = getProductItem();

    const result = reducer(mockState, setSelectedItem(mockProduct));

    expect(result.selectedItem).toEqual(mockProduct);
  });
});

describe("test setPagination reducer", () => {
  test("it should set pagination successfully", () => {
    const mockState = getDefaultMockState().list;
    const ramdomPagination = { page: 8, pageSize: 10 };

    const result = reducer(mockState, setPagination(ramdomPagination));

    expect(result.pagination).toEqual(ramdomPagination);
  });
});

describe("test setScrollTop reducer", () => {
  test("it should set pagination successfully", () => {
    const mockState = getDefaultMockState().list;
    const ramdomScrollTop = 30;

    const result = reducer(mockState, setScrollTop(ramdomScrollTop));

    expect(result.scrollTop).toEqual(ramdomScrollTop);
  });
});


