import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../utils/dataHelper";

export type Products = {
  product: Product;
  count: number;
};
export type ListInitialState = {
  productList: {
    [key: string]: Products;
  };
};
const todosSlice = createSlice<
  ListInitialState,
  {
    addToCartProductList: CaseReducer<
      ListInitialState,
      PayloadAction<Products>
    >;
    deleteProduct: CaseReducer<ListInitialState, PayloadAction<Product>>;
  },
  "cart"
>({
  name: "cart",
  initialState: {
    productList: {},
  },
  reducers: {
    addToCartProductList(state: ListInitialState, action) {
      const id = action.payload.product.id;
      const products = state.productList[id] || { count: 0, product: null };
      products.count += action.payload.count;
      products.product = action.payload.product;
      state.productList[id] = products;
    },
    deleteProduct(state: ListInitialState, action) {
      const product = action.payload;
      const products = state.productList[product.id];
      if (products.count === 1) {
        delete state.productList[product.id];
      } else {
        state.productList[product.id].count--;
      }
    },
  },
});

export const { addToCartProductList, deleteProduct } = todosSlice.actions;
export default todosSlice.reducer;
