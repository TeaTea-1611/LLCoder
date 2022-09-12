import Tippy from "@tippyjs/react/headless";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../../Loading";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  to?: string;
  isLoading?: boolean;
  title?: React.ReactNode | string;
}

function Button({
  children,
  className,
  onClick,
  to,
  type,
  isLoading = false,
  title,
}: ButtonProps) {
  const navigate = useNavigate();

  const btn = (
    <button
      className={
        className
          ? `${className} border border-sky-500 py-1 px-2 rounded shadow-lg hover:bg-sky-500 dark:hover:bg-sky-500 hover:text-white dark:hover:text-white dark:bg-slate-800 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10 duration-100`
          : "border border-sky-500 py-1 px-2 rounded shadow-lg hover:bg-sky-500 dark:hover:bg-sky-500 hover:text-white dark:hover:text-white dark:bg-slate-800 dark:shadow-none dark:ring-1 dark:ring-inset dark:ring-white/10 duration-100"
      }
      onClick={() => {
        if (to) navigate(to);
        else if (onClick) onClick();
      }}
      type={type}
      disabled={isLoading}
    >
      <span className="text-sm flex items-center">
        {isLoading ? <LoadingSpinner /> : children}
      </span>
    </button>
  );

  return !!title ? (
    <Tippy
      placement="top"
      render={(attrs) => (
        <div
          className="bg-white rounded ring-1 ring-slate-900/10 shadow-lg overflow-hidden py-1 px-2 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300"
          tabIndex={-1}
          {...attrs}
        >
          <span>{title}</span>
        </div>
      )}
    >
      {btn}
    </Tippy>
  ) : (
    btn
  );
}

export default Button;
