interface SkeletonLoadingProps {
  className?: string;
  style?: React.CSSProperties;
}

function SkeletonLoading({
  className,
  style = {
    width: "100%",
    height: "100%",
  },
  ...props
}: SkeletonLoadingProps) {
  return <div className="" style={style} {...props}></div>;
}

export default SkeletonLoading;
