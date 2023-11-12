import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import style from "./style.module.css";
import { getCartProductList } from "../../selectors/cart";
import { productDetailPath } from "../../config/router";
import FloatingButton from "../../components/FloatingButton";
import { addToCartProductList, deleteProduct } from "../../reducers/cart";

export default function Cart() {
  const cartProductList = useSelector(getCartProductList);
  const dispatch = useDispatch();
  const productIdList = Object.keys(cartProductList);

  if (productIdList.length === 0) {
    return (
      <div className="text-center p-5">
        <h1>You don't add any product to your cart!</h1>
        <FloatingButton />
      </div>
    );
  }

  const total = productIdList.reduce((prev, id) => {
    return (
      prev +
      cartProductList[id].count * Number(cartProductList[id].product.price)
    );
  }, 0);

  return (
    <>
      <div className="container h-100 d-flex flex-column">
        <h2>Cart</h2>
        <div
          className={classNames(
            "list-group flex-grow-1 border",
            style["list-container"]
          )}
        >
          {productIdList.length > 0 &&
            productIdList.map((productId) => {
              const products = cartProductList[productId];
              const product = products.product;

              return (
                <div
                  key={product.id}
                  className={classNames(
                    "list-group-item list-group-item-action"
                  )}
                  aria-current="true"
                >
                  <div className="d-flex">
                    <img
                      className={classNames(style["product-image"])}
                      src={product.image}
                      alt=""
                    />
                    <div className="flex-grow flex-fill px-2">
                      <div className="d-flex w-100 align-items-center">
                        <h5 className="mb-1">
                          <Link
                            to={productDetailPath + "/" + product.id}
                            key={product.id}
                            aria-current="true"
                          >
                            {product.productName}
                          </Link>
                        </h5>
                        <div className="badge mb-1 mx-2 bg-success text-wrap">
                          $ {product.price}
                        </div>
                      </div>
                      <p className="mb-1">{product.productDescription}</p>
                      <small>{product.productMaterial}</small>
                    </div>
                    <div className={classNames("fs-1 my-2", style.number)}>
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          id="button-addon1"
                          onClick={() => {
                            dispatch(deleteProduct(products.product));
                          }}
                        >
                          -
                        </button>
                        <input
                          step={1}
                          style={{ width: 40, flex: "initial" }}
                          type="text"
                          className="form-control"
                          placeholder=""
                          aria-label="Example text with button addon"
                          aria-describedby="button-addon1"
                          value={products.count}
                          disabled
                        />
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          id="button-addon1"
                          onClick={() => {
                            dispatch(
                              addToCartProductList({
                                product: products.product,
                                count: 1,
                              })
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

          <p className="fs-2 p-2">
            Total :
            <span className="text-danger">
              $<span>{total.toFixed(2)}</span>
            </span>
          </p>
        </div>
      </div>
      <FloatingButton />
    </>
  );
}
