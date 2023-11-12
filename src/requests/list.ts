import { Product, generateListData } from "../utils/dataHelper";

export type PageArgs = {
  page: number;
  pageSize: number;
};
export type ResponsePageArgs = {
  data: Product[];
  page: number;
  pageSize: number;
  total: number;
};

const total = 10000;
let hasGenerated = 0;

export async function fetchListData({
  page,
  pageSize,
}: PageArgs): Promise<ResponsePageArgs> {
  if (hasGenerated === total) {
    return {
      data: [],
      page,
      pageSize: 0,
      total,
    };
  }

  const data = await generateListData();
  hasGenerated += data.length;

  return {
    data,
    page,
    pageSize,
    total,
  };
}
