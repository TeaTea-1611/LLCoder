import { useNavigate } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  to?: string;
}

function Button({ children, className, onClick, to, type }: ButtonProps) {
  const navigate = useNavigate();
  return (
    <>
      <button
        className={`border-primary border py-1 px-2 rounded hover:bg-primary hover:text-white dark:border-dark-border-color dark:bg-dark-color-4 dark:text-dark-text-color-1 dark:hover:bg-[#21262d] dark:hover:border-[#8b949e] duration-100${
          className ? ` ${className}` : ""
        }`}
        onClick={() => {
          if (to) navigate(to);
          else if (onClick) onClick();
        }}
        type={type}
      >
        <span className="text-sm flex items-center">{children}</span>
      </button>
    </>
  );
}

export default Button;
