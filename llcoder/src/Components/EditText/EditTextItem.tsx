import { useEffect, useRef, useState } from "react";
import {
  BsJustify,
  BsJustifyLeft,
  BsJustifyRight,
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsCardHeading,
} from "react-icons/bs";

interface EditTextItemProps {
  children?: React.ReactNode;
  cmd: string;
  arg?: string;
  innerRef?: React.RefObject<HTMLElement>;
}

export const ITEMS: EditTextItemProps[] = [
  { cmd: "bold", children: <BsTypeBold /> },
  { cmd: "italic", children: <BsTypeItalic /> },
  { cmd: "underline", children: <BsTypeUnderline /> },
  { cmd: "justifyLeft", children: <BsJustifyLeft /> },
  { cmd: "justifyCenter", children: <BsJustify /> },
  { cmd: "justifyRight", children: <BsJustifyRight /> },
];

export const ITEMS_FORMAT: EditTextItemProps[] = [
  { cmd: "formatBlock", arg: "h1", children: "heading 1" },
  { cmd: "formatBlock", arg: "h2", children: "heading 2" },
  { cmd: "formatBlock", arg: "h3", children: "heading 3" },
  { cmd: "formatBlock", arg: "h4", children: "heading 4" },
  { cmd: "formatBlock", arg: "h5", children: "heading 5" },
  { cmd: "formatBlock", arg: "h6", children: "heading 6" },
  { cmd: "formatBlock", arg: "pre", children: "preformatted" },
  { cmd: "formatBlock", arg: "p", children: "paragraph" },
  { cmd: "formatBlock", arg: "blockquote", children: "blockquote" },
];

export function EditTextItem({
  children,
  cmd,
  arg,
  innerRef,
}: EditTextItemProps) {
  return (
    <li
      key={cmd}
      className="flex items-center justify-center hover:bg-primary hover:text-white dark:hover:bg-dark-hover-color duration-100 rounded p-[2px] cursor-pointer"
      onMouseDown={(evt) => {
        evt.preventDefault();
        innerRef?.current?.focus();
        document.execCommand(cmd, false, arg);
      }}
    >
      {children || cmd}
    </li>
  );
}

export function EditTextItemFormatBlock({
  innerRef,
}: {
  innerRef?: React.RefObject<HTMLElement>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <li
      ref={ref}
      className="relative flex z-10 items-center"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="hover:bg-primary hover:text-white dark:hover:bg-dark-hover-color duration-100 rounded cursor-pointer p-[2px]">
        <BsCardHeading />
      </span>
      {isOpen && (
        <ul className="absolute left-1/2 -translate-x-1/2 w-36 top-8 overflow-y-auto shadow bg-white rounded py-1 dark:bg-dark-color-3">
          {ITEMS_FORMAT.map((item) => (
            <EditTextItem
              key={item.cmd}
              cmd={item.cmd}
              arg={item?.arg}
              innerRef={innerRef}
            >
              {item?.children}
            </EditTextItem>
          ))}
        </ul>
      )}
    </li>
  );
}
