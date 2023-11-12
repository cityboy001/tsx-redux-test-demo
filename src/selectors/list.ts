import { ReducerDataStructrue } from "../reducers";
import { ListPagination } from "../reducers/list";
import { Product } from "../utils/dataHelper";

const getListData = (state: ReducerDataStructrue) => state.list;

export const getProductList = (state: ReducerDataStructrue): Product[] => {
  return getListData(state).productList;
};

export const getScrollTop = (state: ReducerDataStructrue): number => {
  return getListData(state).scrollTop;
};


export const getListPagination = (
  state: ReducerDataStructrue
): ListPagination => getListData(state).pagination;

export const getIsLoadingListData = (state: ReducerDataStructrue): boolean => {
  return getListData(state).isLoadingList;
};

export const getSelectedProduct = (
  state: ReducerDataStructrue
): Product | null => getListData(state).selectedItem;