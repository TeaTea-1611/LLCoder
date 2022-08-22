import React, { useState, forwardRef } from "react";

interface Props {
  src: string;
  alt?: string;
  fallback?: string;
}

function Image(
  { src, alt, fallback: customFallback = "", ...props }: Props,
  ref: React.Ref<HTMLImageElement>
) {
  const [fallback, setFallback] = useState("");
  const handleErr = () => {
    setFallback(customFallback);
  };

  return (
    <img
      ref={ref}
      src={src || fallback}
      alt={alt}
      {...props}
      onError={handleErr}
    />
  );
}

export default forwardRef(Image);
