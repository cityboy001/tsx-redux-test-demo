import { fireEvent, render, screen } from "@testing-library/react";
import ScrollLoading from "../ScrollLoading";
import { getProductItem } from "../../../../utils/dataHelper";

describe("test <ScrollLoading />", () => {
  describe("initial state", () => {
    describe("when scrollToOnMount and scrollTop prop are setup", () => {
      test("should set initial state after mounted", () => {
        const productList = [
          getProductItem(),
          getProductItem(),
          getProductItem(),
        ];
        let top = 0;
        const targetScrollTop = 30;
        Object.defineProperty(HTMLElement.prototype, "scrollTop", {
          configurable: true,
          set(value) {
            top = value;
          },
        });

        const loaderText = "loader";
        const mockLoadMore = jest.fn();
        const mockOnScroll = jest.fn();

        render(
          <div>
            <ScrollLoading
              scrollToOnMount
              scrollTop={targetScrollTop}
              hasMore={true}
              loadMore={mockLoadMore}
              onScroll={mockOnScroll}
              loader={<>{loaderText}</>}
            >
              {productList.map((product) => {
                return <div>{product.productName}</div>;
              })}
            </ScrollLoading>
          </div>
        );

        expect(top).toEqual(targetScrollTop);
      });
    });

    describe("when the height of items in ScrollLoading is less than parent height", () => {
      test("should trigger loadMore function", () => {
        const productList = [
          getProductItem(),
          getProductItem(),
          getProductItem(),
        ];
        const itemHeight = 30;
        const parentClientHeight = itemHeight * productList.length;
        Object.defineProperty(HTMLElement.prototype, "scrollTop", {
          configurable: true,
          value: 0,
        });
        Object.defineProperty(HTMLElement.prototype, "clientHeight", {
          configurable: true,
          value: parentClientHeight,
        });
        Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
          configurable: true,
          value: parentClientHeight + 0,
        });
        const loaderText = "loader";
        const mockLoadMore = jest.fn();
        const mockOnScroll = jest.fn();

        render(
          <div>
            <ScrollLoading
              hasMore={true}
              loadMore={mockLoadMore}
              onScroll={mockOnScroll}
              loader={<>{loaderText}</>}
            >
              {productList.map((product) => {
                return (
                  <div style={{ height: itemHeight }}>
                    {product.productName}
                  </div>
                );
              })}
            </ScrollLoading>
          </div>
        );

        expect(mockLoadMore).toBeCalled();
      });
    });

    describe("when the height of items in ScrollLoading is great than parent height", () => {
      test("should not trigger loadMore function", () => {
        const productList = [
          getProductItem(),
          getProductItem(),
          getProductItem(),
        ];
        const itemHeight = 30;
        const parentClientHeight = itemHeight * productList.length;
        Object.defineProperty(HTMLElement.prototype, "scrollTop", {
          configurable: true,
          value: 0,
        });
        Object.defineProperty(HTMLElement.prototype, "clientHeight", {
          configurable: true,
          value: parentClientHeight,
        });
        Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
          configurable: true,
          value: parentClientHeight + ScrollLoading.defaultThreshold + 1,
        });
        const loaderText = "loader";
        const mockLoadMore = jest.fn();
        const mockOnScroll = jest.fn();

        render(
          <div>
            <ScrollLoading
              hasMore={true}
              loadMore={mockLoadMore}
              onScroll={mockOnScroll}
              loader={<>{loaderText}</>}
            >
              {productList.map((product) => {
                return (
                  <div style={{ height: itemHeight }}>
                    {product.productName}
                  </div>
                );
              })}
            </ScrollLoading>
          </div>
        );

        expect(mockLoadMore).not.toBeCalled();
      });
    });
  });

  describe("when scrolling", () => {
    test("should trigger onScroll function", () => {
      const productList = [
        getProductItem(),
        getProductItem(),
        getProductItem(),
      ];
      const itemHeight = 30;
      const parentClientHeight = itemHeight * productList.length;
      const scrollTop = 10;
      Object.defineProperty(HTMLElement.prototype, "scrollTop", {
        configurable: true,
        value: scrollTop,
      });
      Object.defineProperty(HTMLElement.prototype, "clientHeight", {
        configurable: true,
        value: parentClientHeight,
      });
      Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
        configurable: true,
        value: parentClientHeight + ScrollLoading.defaultThreshold + 1,
      });
      const loaderText = "loader";
      const mockLoadMore = jest.fn();
      const mockOnScroll = jest.fn();
      render(
        <div data-testid="parent">
          <ScrollLoading
            hasMore={true}
            loadMore={mockLoadMore}
            onScroll={mockOnScroll}
            loader={<>{loaderText}</>}
          >
            {productList.map((product) => {
              return (
                <div style={{ height: itemHeight }}>{product.productName}</div>
              );
            })}
          </ScrollLoading>
        </div>
      );

      fireEvent.scroll(
        screen.getByTestId("parent"),
        new MouseEvent("scroll", {})
      );

      expect(mockOnScroll).toBeCalledWith(scrollTop);
    });

    describe("when scroll to the bottom of the parent", () => {
      test("should call the loadmore function", () => {
        const productList = [
          getProductItem(),
          getProductItem(),
          getProductItem(),
        ];
        const itemHeight = 30;
        const parentClientHeight = itemHeight * productList.length;
        const scrollTop = 2;
        Object.defineProperty(HTMLElement.prototype, "scrollTop", {
          configurable: true,
          value: scrollTop,
        });
        Object.defineProperty(HTMLElement.prototype, "clientHeight", {
          configurable: true,
          value: parentClientHeight,
        });
        Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
          configurable: true,
          value: parentClientHeight + ScrollLoading.defaultThreshold + 1,
        });
        const loaderText = "loader";
        const mockLoadMore = jest.fn();
        const mockOnScroll = jest.fn();
        render(
          <div data-testid="parent">
            <ScrollLoading
              hasMore={true}
              loadMore={mockLoadMore}
              onScroll={mockOnScroll}
              loader={<>{loaderText}</>}
            >
              {productList.map((product) => {
                return (
                  <div style={{ height: itemHeight }}>
                    {product.productName}
                  </div>
                );
              })}
            </ScrollLoading>
          </div>
        );

        fireEvent.scroll(
          screen.getByTestId("parent"),
          new MouseEvent("scroll", {})
        );

        expect(mockLoadMore).toBeCalled();
      });
    });
  });
});
