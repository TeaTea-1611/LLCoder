import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Portal({
  children,
  target,
}: {
  children: React.ReactNode;
  target?: string;
}) {
  const [wrapper, setWrapper] = useState<HTMLElement | null>();

  useEffect(() => {
    let portal: HTMLElement | null = null;
    if (target) portal = document.querySelector(target);
    if (!portal) {
      portal = document.createElement("div");
      portal.setAttribute("id", "llcoder-modal");
      document.body.appendChild(portal);
    }

    setWrapper(portal);

    return () => {
      if (!target) {
        document.body.removeChild(portal as HTMLElement);
      }
    };
  }, [target]);

  if (!wrapper) return null;
  return ReactDOM.createPortal(children, wrapper);
}

export default Portal;
