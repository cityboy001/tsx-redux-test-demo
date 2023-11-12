/* eslint-disable react-hooks/exhaustive-deps */
import React, { RefObject, useEffect, useLayoutEffect, useRef } from "react";

export function getElementScrollPosition(element: HTMLElement) {
  return Math.max(
    document.documentElement && document.documentElement.scrollTop,
    document.body && document.body.scrollTop,
    Number(document.scrollingElement && document.scrollingElement.scrollTop)
  );
}

export function getElementScrollHeight() {
  return Math.max(
    document.documentElement && document.documentElement.scrollHeight,
    document.body && document.body.scrollHeight,
    Number(document.scrollingElement && document.scrollingElement.scrollHeight)
  );
}

export type InfiniteScrollProps = {
  loadMore: () => any;
  onScroll?: (top: number) => any;
  hasMore: boolean;
  threshold?: number;
  children: React.ReactNode;
  loader: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  scrollToOnMount?: boolean;
  scrollTop?: number;
};

export type InfiniteScrollRefType = {
  reset: () => void;
};

const InfiniteScroll = (props: InfiniteScrollProps) => {
  const {
    threshold,
    children,
    loadMore,
    loader,
    disabled,
    hasMore,
    loading,
    scrollTop,
    scrollToOnMount,
    onScroll,
  } = props;

  const wrapperRef =
    useRef<HTMLDivElement | null>() as RefObject<HTMLDivElement>;

  useLayoutEffect(() => {
    if (!scrollToOnMount) return;
    if (!scrollTop) return;
    if (!wrapperRef.current) return;

    const parentElement = wrapperRef.current?.parentElement;
    if (!parentElement) return;
    parentElement.scrollTop = scrollTop;
  }, []);

  useEffect(() => {
    if (disabled) {
      return;
    }

    const load = (e?: Event) => {
      if (disabled) {
        return;
      }

      if (!hasMore) {
        return;
      }

      if (!wrapperRef.current) return;

      const parentElement = wrapperRef.current!.parentElement as HTMLElement;
      if (e && onScroll) onScroll(parentElement.scrollTop);

      const scrollPosition =
      parentElement.scrollTop + parentElement?.clientHeight;
      console.log('parentElement?.clientHeigh: ', parentElement?.clientHeight);
      const scrollHeight = parentElement.scrollHeight;
      console.log('scrollPosition: ', scrollPosition);
      console.log('scrollHeight: ', scrollHeight);

      const thresholdExceeded =
        scrollHeight - scrollPosition < (threshold || defaultThreshold);
      const isParentHidden = parentElement.clientHeight === 0;

      // If there is more items to load and scroll position exceeds threshold, then load more items
      if (thresholdExceeded && !isParentHidden) {
        // Set last loaded page so we would not load the same page twice.
        loadMore();
      }
    };

    const parentElement = wrapperRef.current?.parentElement;

    (parentElement || window).addEventListener("scroll", load);
    (parentElement || window).addEventListener("resize", load);

    load();

    return () => {
      (parentElement || window).removeEventListener("scroll", load);
      (parentElement || window).removeEventListener("resize", load);
    };
  }, [disabled, hasMore, threshold, wrapperRef, onScroll]);

  return (
    <>
      <div ref={wrapperRef} style={{ display: "none" }}></div>
      {children}
      {loading && loader}
    </>
  );
};
const defaultThreshold = 50;

export default Object.assign(InfiniteScroll, {
  defaultThreshold,
});
