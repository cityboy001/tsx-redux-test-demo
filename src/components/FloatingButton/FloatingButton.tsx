import classNames from "classnames";
import style from "./style.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ROOT_PATH, cartPath } from "../../config/router";

export default function FloatingButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCartPage = location.pathname === cartPath;

  function onClick() {
    if (isCartPage) {
      navigate(ROOT_PATH);
    } else {
      navigate(cartPath);
    }
  }

  return (
    <button
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      onClick={onClick}
      className={classNames("btn btn-primary btn-lg", style.cart)}
    >
      {isCartPage ? (
        <i data-testid="house-icon" className="bi bi-house-door-fill"></i>
      ) : (
        <i data-testid="cart-icon" className="bi bi-cart-fill"></i>
      )}
    </button>
  );
}
