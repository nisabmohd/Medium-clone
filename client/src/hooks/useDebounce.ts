import { useEffect, useRef } from "react";

export default function useDebounce(
  cb: () => void,
  dependencies: Array<any>,
  delay?: number
) {
  const delayEffect = useRef(delay ?? 1000);
  useEffect(() => {
    const timer = setTimeout(cb, delayEffect.current);
    return () => clearTimeout(timer);
  }, dependencies);
  return null;
}
