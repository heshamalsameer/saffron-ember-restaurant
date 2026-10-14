import React, { useEffect, useRef } from "react";

const Reveal = ({ as: Tag = "div", anim, delay = 0, className = "", style, children, ...rest }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} data-anim={anim} style={{ "--d": `${delay}s`, ...style }} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
