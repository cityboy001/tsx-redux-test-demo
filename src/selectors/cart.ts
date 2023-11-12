import { ReducerDataStructrue } from "../reducers";

const getCartData = (state: ReducerDataStructrue) => state.cart;

export const getCartProductList = (state: ReducerDataStructrue) => {
  return getCartData(state).productList;
};


