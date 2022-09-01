import React, { useState, forwardRef } from "react";
import images from "../../assets/images";
interface Props {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

function Image(
  {
    src,
    alt,
    className,
    fallback: customFallback = images.noImageUser,
    ...props
  }: Props,
  ref: React.Ref<HTMLImageElement>
) {
  const [fallback, setFallback] = useState("");
  const handleErr = () => {
    setFallback(customFallback);
  };

  return (
    <img
      className={className}
      ref={ref}
      src={src || fallback}
      alt={alt}
      {...props}
      onError={handleErr}
    />
  );
}

export default forwardRef(Image);
