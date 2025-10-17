import { useEffect } from "react";

export default function useClickOutside(ref, onClickOutside, active = true) {
  useEffect(() => {
    if (!active) return;
    const handle = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClickOutside();
    };
    const timeout = setTimeout(() => {
      document.addEventListener("mousedown", handle);
    }, 0);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousedown", handle);
    };
  }, [ref, active, onClickOutside]);
}
