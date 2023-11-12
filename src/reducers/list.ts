import {
  createSlice,
  CaseReducer,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { Product } from "../utils/dataHelper";
import { PageArgs, fetchListData } from "../requests/list";
import { defaultPagination } from "../config/const";

export type ListPagination = PageArgs & { total?: number };
type ListInitialState = {
  productList: Product[];
  pagination: ListPagination;
  isLoadingList: boolean;
  scrollTop: number;
  selectedItem: Product | null;
};
const todosSlice = createSlice<
  ListInitialState,
  {
    addToProductList: CaseReducer<ListInitialState, PayloadAction<Product[]>>;
    setIsLoadingList: CaseReducer<ListInitialState, PayloadAction<boolean>>;
    setSelectedItem: CaseReducer<ListInitialState, PayloadAction<Product>>;
    setScrollTop: CaseReducer<ListInitialState, PayloadAction<number>>;
    setPagination: CaseReducer<ListInitialState, PayloadAction<ListPagination>>;
  },
  "list"
>({
  name: "list",
  initialState: {
    productList: [],
    pagination: defaultPagination,
    isLoadingList: false,
    selectedItem: null,
    scrollTop: 0,
  },
  reducers: {
    setIsLoadingList(state: ListInitialState, action) {
      state.isLoadingList = action.payload;
    },
    setPagination(state: ListInitialState, action) {
      state.pagination = action.payload;
    },
    setSelectedItem(state: ListInitialState, action) {
      state.selectedItem = action.payload;
    },
    addToProductList(state: ListInitialState, action) {
      state.productList = state.productList.concat(action.payload);
    },
    setScrollTop(state: ListInitialState, action) {
      state.scrollTop = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchListDataAction.pending, (state, action) => {
      state.isLoadingList = true;
    });
    builder.addCase(fetchListDataAction.fulfilled, (state, action) => {
      const res = action.payload;
      state.isLoadingList = false;
      state.pagination = {
        page: res.page,
        pageSize: res.pageSize,
        total: res.total,
      };
      state.productList = state.productList.concat(res.data);
    });
  },
});

export const {
  addToProductList,
  setIsLoadingList,
  setSelectedItem,
  setPagination,
  setScrollTop,
} = todosSlice.actions;

export const fetchListDataAction = createAsyncThunk(
  "list/fetchList",
  (listPagination: ListPagination) => {
    return fetchListData({
      page: listPagination.page,
      pageSize: listPagination.pageSize,
    });
  }
);

export default todosSlice.reducer;
