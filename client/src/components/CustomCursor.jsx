import { useEffect } from "react";
import { gsap } from "gsap";

function CustomCursor() {

  useEffect(() => {
    const cursor = document.querySelector(".cursor");

    window.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
    });

  }, []);

  return <div className="cursor"></div>;
}

export default CustomCursor;