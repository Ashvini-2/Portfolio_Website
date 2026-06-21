import { useEffect, useRef } from 'react';

/**
 * Custom React hook that sets up an IntersectionObserver to reveal elements on scroll.
 * Returns a ref callback that adds elements to be observed.
 */
export default function useIntersectionObserver(options = {}) {
  const elementsRef = useRef([]);
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px', root = null } = options;

  useEffect(() => {
    // Fallback if IntersectionObserver is not supported or blocked in the environment
    if (!window.IntersectionObserver) {
      elementsRef.current.forEach((el) => {
        if (el) el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Once revealed, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold,
      rootMargin,
      root
    });

    // Observe all registered elements
    const currentElements = elementsRef.current;
    currentElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      // Disconnect observer on cleanup
      observer.disconnect();
    };
  }, [threshold, rootMargin, root]); // Run when observer options change

  const addToRef = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return addToRef;
}
