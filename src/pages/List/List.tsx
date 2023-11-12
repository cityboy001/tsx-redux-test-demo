/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  getIsLoadingListData,
  getListPagination,
  getProductList,
  getScrollTop,
  getSelectedProduct,
} from "../../selectors/list";
import ScrollLoading from "../../components/baseComponents/ScrollLoading";
import {
  fetchListDataAction,
  setSelectedItem,
  setScrollTop,
} from "../../reducers/list";
import style from "./style.module.css";
import Cart from "../../components/FloatingButton";
import { productDetailPath } from "../../config/router";

export default function List() {
  const productList = useSelector(getProductList);
  const listPagination = useSelector(getListPagination);
  const isLoadingListData = useSelector(getIsLoadingListData);
  const selectedItem = useSelector(getSelectedProduct);
  const scrollTop = useSelector(getScrollTop);
  const dispatch = useDispatch<any>();

  function getListData() {
    if (isLoadingListData) return;
    dispatch(
      fetchListDataAction({ ...listPagination, page: listPagination.page + 1 })
    );
  }

  useEffect(() => {
    if (productList.length === 0) getListData();
  }, []);

  return (
    <>
      <div className="container h-100 d-flex flex-column">
        <h2>Product list</h2>
        <div
          className={classNames(
            "list-group flex-grow-1 border",
            style["list-container"]
          )}
        >
          <ScrollLoading
            scrollToOnMount
            scrollTop={scrollTop}
            onScroll={(top) => dispatch(setScrollTop(top))}
            loader={
              <div className="text-center">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            }
            loadMore={getListData}
            loading={isLoadingListData}
            hasMore={productList.length !== listPagination.total}
          >
            {productList.map((product) => {
              return (
                <Link
                  to={productDetailPath + "/" + product.id}
                  onClick={() => {
                    dispatch(setSelectedItem(product));
                  }}
                  key={product.id}
                  className={classNames(
                    "list-group-item list-group-item-action",
                    selectedItem?.id === product.id && "active"
                  )}
                  aria-current="true"
                >
                  <div className="d-flex">
                    <img
                      className={classNames(style["product-image"])}
                      src={product.image}
                      alt="ProductImage"
                    />
                    <div className="flex-grow flex-fill px-2">
                      <div className="d-flex w-100 align-items-center">
                        <h5 className="mb-1">
                          <span className="badge bg-secondary text-wrap ">
                            {product.product}
                          </span>
                          <span className="mx-2">{product.productName}</span>
                        </h5>
                        <div className="badge mb-1 bg-success text-wrap">
                          $ <span>{product.price}</span>
                        </div>
                      </div>
                      <p className="mb-1">{product.productDescription}</p>
                      <small>{product.productMaterial}</small>
                    </div>
                  </div>
                </Link>
              );
            })}
          </ScrollLoading>
        </div>
        <div className="my-5"></div>
      </div>
      <Cart />
    </>
  );
}
