import { Option } from "./Selection";
import { MdArrowDropDown, MdOutlineClose } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface MultiSelectionProps {
  options: Option[];
  className?: string;
  onChange: (value: Option[]) => void;
  defaultValue?: Option[];
  placeholder?: string;
}

function MultiSelection({
  options = [],
  className,
  defaultValue = [],
  placeholder = "Select...",
  onChange,
}: MultiSelectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Option[]>(defaultValue);

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
    <div
      ref={selectRef}
      className={
        className
          ? `relative flex flex-wrap items-center py-[2px] pl-2 pr-12 min-h-[40px] rounded border shadow dark:border-slate-700 cursor-pointer ${className}`
          : "relative flex flex-wrap items-center py-[2px] pl-2 pr-12 min-h-[40px] rounded border shadow dark:border-slate-700 cursor-pointer"
      }
    >
      <div
        className="absolute inset-0 z-10"
        onClick={() => setIsOpen(!isOpen)}
      ></div>
      {selected.length > 0 ? (
        <>
          {selected.map((item) => (
            <div
              key={uuidv4()}
              className="flex py-[2px] items-center z-10 pl-2 shadow-lg dark:border dark:border-slate-700 mr-1 mb-1"
            >
              <span className="text-sm pr-2 border-r border-slate-700">
                {item.label}
              </span>
              <button
                type="button"
                className="p-[2px] mx-1 hover:text-primary hover:bg-slate-100/50 dark:hover:bg-gray-700/50"
                onClick={() => {
                  setSelected(selected.filter((i) => i !== item));
                  onChange(selected.filter((i) => i !== item).map((i) => i));
                }}
              >
                <MdOutlineClose />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="absolute z-10 top-1/2 -translate-y-1/2 right-12 p-1 rounded-full hover:bg-slate-100/50 dark:hover:bg-gray-700/50"
            onClick={() => {
              setSelected([]);
              if (onChange) onChange([]);
            }}
          >
            <MdOutlineClose />
          </button>
        </>
      ) : (
        <span className="text-sm pl-2">{placeholder}</span>
      )}
      <div className="absolute top-1/2 -translate-y-1/2 right-2 h-full pl-2 border-l border-slate-400 flex items-center">
        <MdArrowDropDown />
      </div>
      <div className="absolute inset-0">
        <div className="h-full"></div>
        {isOpen && (
          <ul className="w-full max-h-64 overflow-y-auto mt-2 py-1 rounded ring-1 ring-slate-300 dark:ring-0 bg-white shadow-lg dark:bg-slate-800">
            {options.length > 0 && options.length !== selected.length ? (
              options.map((item) => {
                if (
                  selected.find(
                    (selectedItem) => selectedItem.value === item.value
                  )
                )
                  return null;
                return (
                  <li
                    key={uuidv4()}
                    className={`px-4 py-1 hover:bg-slate-200 dark:hover:bg-slate-600 cursor-pointer`}
                    onClick={() => {
                      setSelected([...selected, item]);
                      onChange([...selected, item].map((i) => i));
                    }}
                  >
                    {item.label}
                  </li>
                );
              })
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
    </div>
  );
}

export default MultiSelection;
