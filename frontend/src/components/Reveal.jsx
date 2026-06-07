import { useEffect, useRef, useState } from 'react';

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal--visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default Reveal;
