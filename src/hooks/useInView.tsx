
import { useEffect, useRef, useState } from 'react';

type UseInViewOptions = {
  threshold?: number;
  triggerOnce?: boolean;
  delay?: number;
};

export const useInView = ({
  threshold = 0.1,
  triggerOnce = false,
  delay = 0,
}: UseInViewOptions = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            const timeoutId = setTimeout(() => {
              setIsInView(true);
            }, delay);
            return () => clearTimeout(timeoutId);
          } else {
            setIsInView(true);
          }
          
          if (triggerOnce) {
            observer.unobserve(currentRef);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, triggerOnce, delay]);

  return [ref, isInView] as const;
};
