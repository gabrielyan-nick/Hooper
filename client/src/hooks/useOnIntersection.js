import { useEffect, useRef } from "react";

function useOnIntersection(callback, threshold = 0.5) {
  const targetRef = useRef(null);

  useEffect(() => {
    const target = targetRef.current;
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: threshold,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio >= threshold) {
        callback();
      }
    }, options);

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [callback, threshold]);

  return targetRef;
}

export default useOnIntersection;
