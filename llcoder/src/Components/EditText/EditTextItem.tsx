import { useEffect, useId, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  BsJustify,
  BsJustifyLeft,
  BsJustifyRight,
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
  BsCardHeading,
  BsPalette,
  BsPaintBucket,
  BsEraser,
  BsLink,
  BsImage,
} from "react-icons/bs";
import { Button, Input } from "../Tags";

interface EditTextItemProps {
  children?: React.ReactNode;
  cmd: string;
  arg?: string;
}

export const ITEMS: EditTextItemProps[] = [
  { cmd: "bold", children: <BsTypeBold /> },
  { cmd: "italic", children: <BsTypeItalic /> },
  { cmd: "underline", children: <BsTypeUnderline /> },
  { cmd: "justifyLeft", children: <BsJustifyLeft /> },
  { cmd: "justifyCenter", children: <BsJustify /> },
  { cmd: "justifyRight", children: <BsJustifyRight /> },
  { cmd: "removeFormat", children: <BsEraser /> },
];

const ITEMS_FORMAT: EditTextItemProps[] = [
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

const ITEMS_PALETTE = [
  "#ffffff",
  "#f5f3f4",
  "#d3d3d3",
  "#b1a7a6",
  "#f72585",
  "#b5179e",
  "#8c1bb8",
  "#6a1bb8",
  "#560bad",
  "#480ca8",
  "#3a0ca3",
  "#3f37c9",
  "#4361ee",
  "#4895ef",
  "#4cc9f0",
  "#03071e",
  "#370617",
  "#6a040f",
  "#9d0208",
  "#d00000",
  "#dc2f02",
  "#e85d04",
  "#f48c06",
  "#faa307",
  "#ffba08",
  "#16db65",
  "#058c42",
  "#04471c",
  "#0d2818",
  "#020202",
];

export function EditTextItem({ children, cmd, arg }: EditTextItemProps) {
  return (
    <li
      onMouseDown={(evt) => {
        evt.preventDefault();
        document.execCommand(cmd, false, arg);
      }}
    >
      <button
        type="button"
        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        {children || cmd}
      </button>
    </li>
  );
}

export function EditTextItemFormatBlock() {
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
    <li ref={ref} className="relative" onClick={() => setIsOpen(!isOpen)}>
      <button
        type="button"
        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        <BsCardHeading />
      </button>
      {isOpen && (
        <ul className="absolute z-10 left-1/2 -translate-x-1/2 w-36 max-h-48 top-12 overflow-y-auto shadow bg-white rounded py-1 dark:bg-dark-color-3">
          {ITEMS_FORMAT.map((item) => (
            <EditTextItem key={uuidv4()} cmd={item.cmd} arg={item?.arg}>
              {item?.children}
            </EditTextItem>
          ))}
        </ul>
      )}
    </li>
  );
}

export function EditTextPalette({
  backgroundColor = false,
}: {
  backgroundColor?: boolean;
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
    <li ref={ref} className="relative" onClick={() => setIsOpen(!isOpen)}>
      <button
        type="button"
        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
      >
        {backgroundColor ? <BsPaintBucket /> : <BsPalette />}
      </button>
      {isOpen && (
        <ul className="absolute z-10 grid grid-cols-5 gap-2 w-40 left-1/2 -translate-x-1/2 max-h-48 top-12 overflow-y-auto shadow bg-white rounded p-2 dark:bg-dark-color-3">
          {ITEMS_PALETTE.map((color) => (
            <li
              key={uuidv4()}
              className="flex items-center w-5 h-5 justify-center duration-100 rounded cursor-pointer hover:scale-125"
              onMouseDown={(evt) => {
                evt.preventDefault();
                if (backgroundColor) {
                  document.execCommand("backColor", false, color);
                } else {
                  document.execCommand("foreColor", false, color);
                }
              }}
              style={{ backgroundColor: color }}
            ></li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function EditTextItemLink({
  onChange,
}: {
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("http://");
  const [title, setTitle] = useState("");
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

  const handleAddLink = () => {
    const html = `<a class="underline" href="${url}" target="_blank">${title}</a>`;
    onChange(html);
    // document.execCommand("insertHTML", false, html);
    setUrl("http://");
    setTitle("");
    setIsOpen(false);
  };

  return (
    <li ref={ref} className="relative">
      <button
        type="button"
        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        onClick={() => setIsOpen(true)}
      >
        <BsLink />
      </button>
      {isOpen && (
        <div className="absolute z-10 left-1/2 -translate-x-1/2 w-72 px-6 top-12 overflow-y-auto shadow bg-white rounded py-1 dark:bg-dark-color-3">
          <div className="mt-6 space-y-6">
            <Input
              label="URL"
              value={url}
              onChange={(value) => setUrl(value)}
            />
            <Input
              label="Title"
              value={title}
              onChange={(value) => setTitle(value)}
            />
          </div>
          <div className="flex justify-end my-4">
            <Button type="button" onClick={handleAddLink}>
              Add Link
            </Button>
          </div>
        </div>
      )}
    </li>
  );
}

export function EditTextItemImage({
  onChange,
}: {
  onChange: (val: string) => void;
}) {
  const id = useId();

  const handleUploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      if (!data) return;
      const img = `<img class="max-h-[288px]" src="${data}" alt="img"><br>`;
      onChange(img);
      // document.execCommand("insertHTML", false, img);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input id={id} type="file" hidden onChange={handleUploadImg} />
      <li className="flex items-center">
        <label
          htmlFor={id}
          className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        >
          <BsImage className="cursor-pointer" />
        </label>
      </li>
    </>
  );
}
