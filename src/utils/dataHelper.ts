import { faker } from "@faker-js/faker";
import times from "lodash/times";

export type Product = {
  id: string;
  productName: string;
  price: string;
  product: string;
  productDescription: string;
  productMaterial: string;
  image: string;
};

export const getProductItem = (): Product => {
  return {
    id: faker.string.uuid(),
    productName: faker.commerce.productName(),
    price: faker.commerce.price(),
    product: faker.commerce.product(),
    productDescription: faker.commerce.productDescription(),
    productMaterial: faker.commerce.productMaterial(),
    image: faker.image.urlPicsumPhotos(),
  };
};

export async function generateListData(): Promise<Product[]> {
  return new Promise((resolve) => {
    const data = times(10).map(() => getProductItem());
    setTimeout(() => {
      resolve(data);
    }, 1500);
  });
}
