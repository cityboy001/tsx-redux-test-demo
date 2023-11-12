import { useEffect, RefObject, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProductList } from "../../selectors/list";
import classNames from "classnames";
import style from "./style.module.css";
import FloatingButton from "../../components/FloatingButton";
import { addToCartProductList } from "../../reducers/cart";

export const useTipVisible = () => {
  const [isTipVisible, setIsTipVisible] = useState(false);
  const timer = useRef<any>();
  const timer2 = useRef<any>();
  const showToast = () => {
    if (isTipVisible) {
      setIsTipVisible(false);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setIsTipVisible(true);
        clearTimeout(timer2.current);
        timer2.current = setTimeout(() => {
          setIsTipVisible(false);
        }, 2000);
      }, 200);
    } else {
      setIsTipVisible(true);
      clearTimeout(timer2.current);
      timer2.current = setTimeout(() => {
        setIsTipVisible(false);
      }, 2000);
    }
  };

  return { showToast, isTipVisible };
};

export default function ProductDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const productList = useSelector(getProductList);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const { isTipVisible, showToast } = useTipVisible();
  const toastRef = useRef<HTMLDivElement | null>() as RefObject<HTMLDivElement>;

  const productId = params.id;
  const selectedProduct = productList.find(
    (product) => product.id === productId
  );

  useEffect(() => {
    if (!selectedProduct) {
      navigate("/");
    }
  }, [selectedProduct, navigate]);

  if (!selectedProduct) {
    return null;
  }

  return (
    <>
      <div className="container pt-5">
        <div className="card">
          <h5 className="card-header">Product Detail</h5>
          <div className="card-body">
            <div className="d-flex">
              <img
                src={selectedProduct.image}
                className={classNames(style.img)}
                alt="ProductImage"
              />
              <div className="mx-4">
                <h2 className="card-title">{selectedProduct.productName}</h2>
                <p className="card-text">
                  {selectedProduct.productDescription}
                </p>
                <p className="card-text">
                  <span className="badge bg-secondary text-wrap">
                    {selectedProduct.product}
                  </span>
                </p>
                <p className="card-text">{selectedProduct.productMaterial}</p>
                <p className="card-text">$ <span>{selectedProduct.price}</span></p>
                <div className="mb-2">
                  <div className="input-group">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon1"
                      onClick={() => {
                        setCount(count - 1 || 1);
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
                      value={count}
                      onChange={(e) => {
                        setCount(Number(e.target.value));
                      }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      id="button-addon1"
                      onClick={() => {
                        setCount(count + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="btn btn-primary mb-2"
                  onClick={() => {
                    showToast();
                    dispatch(
                      addToCartProductList({
                        product: selectedProduct,
                        count: count,
                      })
                    );
                  }}
                >
                  <i className="bi bi-cart-fill"></i>
                  <span className="px-2">Add to cart</span>
                </button>
                <div
                  ref={toastRef}
                  className={classNames(
                    "toast align-items-center text-bg-success border-0 fade",
                    isTipVisible && "show"
                  )}
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  <div className="d-flex">
                    <div className="toast-body">
                      you have successfully add {selectedProduct.productName} to
                      your cart!
                    </div>
                    <button
                      type="button"
                      className="btn-close btn-close-white me-2 m-auto"
                      data-bs-dismiss="toast"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingButton />
    </>
  );
}
