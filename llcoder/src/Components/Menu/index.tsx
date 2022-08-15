import { useEffect, useRef } from "react";
import { useState } from "react";

export interface DataMenuProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
}

interface MenuProps {
  children: React.ReactNode;
  data: DataMenuProps[];
  onChange: (value: string) => void;
  className?: string;
}

function Menu({ children, data, onChange, className }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <button
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        ref={buttonRef}
      >
        {children}
      </button>
      {isOpen && (
        <ul
          className={`absolute z-50 top-2 left-1/2 -translate-x-1/2 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden py-1 text-sm text-slate-700 font-semibold dark:bg-slate-900 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-8${
            className ? ` ${className}` : ""
          }`}
          ref={menuRef}
        >
          {data.map((item, index) => (
            <li
              key={index}
              className="py-1 px-2 flex items-center cursor-pointer hover:bg-slate-100 dark:hover:bg-dark-hover-color"
              onClick={() => onChange(item.value)}
            >
              {item.icon && <span className="mx-2">{item.icon}</span>}
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Menu;
