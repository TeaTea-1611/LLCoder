import { useEffect, useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

function Selection({
  options,
  defaultValue,
  className,
  placeholder = "Select...",
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(defaultValue || placeholder);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className={`relative shadow border dark:border-slate-700 h-8 w-full ${className} rounded flex items-center cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
        ref={selectRef}
      >
        <span className="text-sm pl-2">{label}</span>
        <MdArrowDropDown className="absolute top-1/2 -translate-y-1/2 right-1" />
        {isOpen && (
          <ul className="absolute w-full py-1 rounded top-9 ring-1 ring-slate-300 dark:ring-0 bg-white shadow-lg dark:bg-dark-color-4">
            {options.length > 0 ? (
              options.map((item) => (
                <li
                  key={item.value}
                  className={`px-4 py-1 hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer ${
                    label === item.label && "bg-slate-200 dark:bg-slate-600"
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                    setLabel(item.label);
                    if (onChange) onChange(item.value);
                  }}
                >
                  <span>{item.label}</span>
                </li>
              ))
            ) : (
              <li className="flex items-center px-4 py-1">
                <span className="text-gray-600 w-full text-center">
                  No results
                </span>
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
}

export default Selection;
