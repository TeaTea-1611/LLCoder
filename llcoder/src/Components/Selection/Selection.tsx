import { useEffect, useRef, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  defaultValue?: Option;
  className?: string;
  placeholder?: string;
  onChange?: (option: Option) => void;
}

function Selection({
  options,
  defaultValue,
  className,
  placeholder = "Select...",
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(defaultValue?.label || placeholder);
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
        className={className ? `${className} relative shadow border dark:border-slate-700 h-8 rounded flex items-center cursor-pointer` : "relative w-full shadow border dark:border-slate-700 h-8 rounded flex items-center cursor-pointer"}
        onClick={() => setIsOpen(!isOpen)}
        ref={selectRef}
      >
        <span className="text-sm pl-2">{label}</span>
        <MdArrowDropDown className="absolute top-1/2 -translate-y-1/2 right-1" />
        {isOpen && (
          <ul className="absolute w-full top-9 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden py-1 text-slate-700 font-semibold dark:bg-slate-900 dark:ring-0 dark:highlight-white/5 dark:text-slate-300">
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
                    if (onChange) onChange(item);
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
