import { generateListData } from "../dataHelper";

describe("when call generateListData function", () => {
  test("it should get mocked product list", async () => {

    const result = await generateListData()

    expect(result).toHaveLength(10)
  });
});
