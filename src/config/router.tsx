import { createBrowserRouter } from "react-router-dom";
import List from "../pages/List";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

export const productDetailPath = "/detail";
export const productDetailPathFullPath = productDetailPath + "/:id";
export const cartPath = "/cart";
export const ROOT_PATH = "/";

const router = createBrowserRouter([
  {
    path: ROOT_PATH,
    element: <List />,
  },
  {
    path: productDetailPathFullPath,
    element: <ProductDetail />,
  },
  {
    path: cartPath,
    element: <Cart />,
  },
]);

export default router;
