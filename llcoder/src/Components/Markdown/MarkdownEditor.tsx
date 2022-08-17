import MarkdownView from "./MarkdownView";
import { v4 as uuidv4 } from "uuid";
import { memo, useState } from "react";
import {
  BsBlockquoteLeft,
  BsCardHeading,
  BsCodeSlash,
  BsLink,
  BsListCheck,
  BsListOl,
  BsTypeBold,
  BsTypeItalic,
} from "react-icons/bs";
import { MdSubscript, MdSuperscript, MdZoomOutMap } from "react-icons/md";
import { TbMath } from "react-icons/tb";
import { Modal } from "../Modal";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const options = [
  { label: <BsTypeBold />, value: "**Bold**" },
  { label: <BsTypeItalic />, value: "*Italic*" },
  { label: <BsCardHeading />, value: "# h1\n## h2\n### h3" },
  { label: <MdSubscript />, value: "$x_2$" },
  { label: <MdSuperscript />, value: "$x^2$" },
  {
    label: <TbMath />,
    value:
      "[link tham khảo](http://csrgxtu.github.io/2015/03/20/Writing-Mathematic-Fomulars-in-Markdown/)\n\n$\nx=\\frac{n}{\\sqrt[n]{y^2}}\n$",
  },
  { label: <BsBlockquoteLeft />, value: "> Quote" },
  { label: <BsListCheck />, value: "- list\n- [ ] todo\n- [x] done" },
  { label: <BsListOl />, value: "1. Coffee\n2. Tea\n3. Coca Cola" },
  {
    label: <BsCodeSlash />,
    value:
      '~~~js\nlet a = "Hello";\nlet b = "World";\n console.log(a + " " + b);\n//result = Hello World\n~~~ \n\n```cpp\n#include <iostream>\n\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}\n```',
  },
  {
    label: <BsLink />,
    value: "[google](https://www.google.com) or Link:https://www.google.com",
  },
];

function MarkdownEditor({
  value,
  onChange,
  className,
  placeholder,
}: MarkdownEditorProps) {
  const [textareaValue, setTextareaValue] = useState(value);
  const [isZoom, setIsZoom] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
    onChange(e.target.value);
  };

  const handleChangeSelection = (val: string) => {
    if (textareaValue.length === 0) {
      setTextareaValue(val);
      onChange(val);
    } else {
      setTextareaValue(`${textareaValue}\n\n${val}`);
      onChange(`${textareaValue}\n\n${val}`);
    }
  };

  const body = (
    <div
      className={`relative flex border-2 border-primary ${
        !isZoom ? "h-[560px]" : "h-full"
      } ${className}`}
    >
      <div className="relative flex flex-col h-full w-1/2 border-r-2 border-primary">
        <div className="flex border-b-2 border-primary p-2">
          <ul className="flex-1 flex flex-wrap mr-4">
            {options.map((option) => (
              <li key={uuidv4()}>
                <button
                  className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  onClick={() => handleChangeSelection(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
          <ul className="flex space-x-1">
            <li>
              <button
                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={() => setIsZoom(!isZoom)}
              >
                <MdZoomOutMap />
              </button>
            </li>
          </ul>
        </div>
        <div className="flex-1 w-full h-full p-2 lg:pt-auto -z-10">
          <textarea
            className="w-full h-full bg-transparent outline-none focus:outline-none resize-none overflow-auto caret-primary"
            value={textareaValue}
            onChange={handleChange}
            spellCheck={false}
            placeholder={placeholder}
          />
        </div>
      </div>
      <div className="w-1/2 p-2">
        <MarkdownView value={value} />
      </div>
    </div>
  );

  return !isZoom ? (
    body
  ) : (
    <Modal isOpen={isZoom} onClose={() => setIsZoom(false)}>
      <div className="w-full h-full bg-white dark:bg-gray-900 z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {body}
      </div>
    </Modal>
  );
}

export default memo(MarkdownEditor);
