import MarkdownView from "./MarkdownView";
import { v4 as uuidv4 } from "uuid";
import { memo, useRef, useState } from "react";
import {
  BsBlockquoteLeft,
  BsCode,
  BsCodeSlash,
  BsLink,
  BsListCheck,
  BsListOl,
  BsTable,
  BsTypeBold,
  BsTypeItalic,
  BsTypeUnderline,
} from "react-icons/bs";
import { MdSubscript, MdSuperscript, MdZoomOutMap } from "react-icons/md";
import { TbHeading, TbMath, TbStrikethrough } from "react-icons/tb";
import { Modal } from "../Modal";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const options = [
  { label: <BsTypeBold />, text: "**", txt: "bold" },
  { label: <BsTypeItalic />, text: "*", txt: "italic" },
  { label: <TbStrikethrough />, text: "~~", txt: "strikethrough" },
  { label: <TbHeading />, text: "# ", txt: "h1", text2: " " },
  { label: <MdSubscript />, text: "$", txt: "x_2", text2: "$" },
  { label: <MdSuperscript />, text: "$", txt: "x^2", text2: "$" },
  {
    label: <TbMath />,
    text: "[link tham khảo](http://csrgxtu.github.io/2015/03/20/Writing-Mathematic-Fomulars-in-Markdown/)\n\n$\nx=\\frac{n}{\\sqrt[n]{y^2}}",
    text2: "\n$",
  },
  { label: <BsBlockquoteLeft />, text: "> ", txt: "Quote", text2: " " },
  {
    label: <BsListCheck />,
    text: "- list\n- [ ] todo\n- [x] done",
    text2: " ",
  },
  { label: <BsListOl />, text: "1. Coffee\n2. Tea\n3. Coca Cola", text2: " " },
  {
    label: <BsTable />,
    text: "|Input|Output|Giải thích|\n|:--|:--|:--|\n|",
    txt: "123",
    text2: "|321| ... |",
  },
  { label: <BsCode />, text: "`", txt: "code" },
  {
    label: <BsCodeSlash />,
    text: '~~~js\nlet a = "Hello";\nlet b = "World";\n console.log(a + " " + b);\n//result = Hello World\n~~~ \n\n```cpp\n#include <iostream>\n\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;',
    text2: "\n}\n```",
  },
  {
    label: <BsLink />,
    text: "[",
    txt: "google",
    text2: "](https://www.google.com)",
  },
];

function MarkdownEditor({
  value,
  onChange,
  className,
  placeholder,
}: MarkdownEditorProps) {
  const [isZoom, setIsZoom] = useState(false);
  let rcMdEdRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const insertFormating = (
    txtarea: any,
    text: string,
    defaultTxt = "",
    text2 = ""
  ) => {
    let selectStart = txtarea.selectionStart;
    let selectEnd = txtarea.selectionEnd;
    let scrollPos = txtarea.scrollTop;
    let caretPos = txtarea.selectionStart;
    let mode = 0;
    let front = txtarea.value.substring(0, caretPos);
    let back = txtarea.value.substring(selectEnd, txtarea.value.length);
    let middle = txtarea.value.substring(caretPos, selectEnd);
    if (text2 === "") {
      text2 = text;
    }
    let textLen = text.length;
    let text2Len = text2.length;
    if (selectStart === selectEnd) {
      middle = defaultTxt;
      mode = 1; //Adding markdown with default text
    } else {
      if (
        front.substr(-textLen) === text &&
        back.substr(0, text2Len) === text2
      ) {
        front = front.substring(0, front.length - textLen);
        back = back.substring(text2Len, back.length);
        text = "";
        text2 = "";
        mode = 2; //Removing markdown with selected text eg. **<selected>bold<selected>**
      } else if (
        middle.substr(0, textLen) === text &&
        middle.substr(-text2Len) === text2
      ) {
        middle = middle.substring(textLen, middle.length - text2Len);
        text = "";
        text2 = "";
        mode = 3; //Removing markdown with selected text eg. <selected>**bold**<selected>
      }
    }
    txtarea.value = front + text + middle + text2 + back;
    onChange(front + text + middle + text2 + back);
    if (selectStart !== selectEnd) {
      if (mode === 0) {
        txtarea.selectionStart = selectStart + textLen;
        txtarea.selectionEnd = selectEnd + textLen;
      } else if (mode === 2) {
        txtarea.selectionStart = selectStart - textLen;
        txtarea.selectionEnd = selectEnd - textLen;
      } else if (mode === 3) {
        txtarea.selectionStart = selectStart;
        txtarea.selectionEnd = selectEnd - textLen - text2Len;
      }
    } else {
      txtarea.selectionStart = selectStart + textLen;
      txtarea.selectionEnd = txtarea.selectionStart + middle.length;
    }
    txtarea.focus();
    txtarea.scrollTop = scrollPos;
  };

  const body = (
    <div
      className={`relative flex flex-col border-2 border-primary ${
        !isZoom ? "h-[560px]" : "h-full"
      } ${className}`}
    >
      <div className="flex border-b-2 border-primary p-2">
        <ul className="flex-1 flex flex-wrap mr-4">
          {options.map((option) => (
            <li key={uuidv4()}>
              <button
                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={() =>
                  insertFormating(
                    rcMdEdRef.current,
                    option.text,
                    option.txt,
                    option.text2
                  )
                }
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
      <div className="flex flex-1 overflow-hidden">
        <textarea
          ref={rcMdEdRef}
          className=" h-full w-1/2 border-r-2 border-primary p-2 bg-transparent outline-none focus:outline-none resize-none overflow-auto caret-primary"
          value={value}
          onChange={handleChange}
          spellCheck={false}
          placeholder={placeholder}
        />
        <div className="w-1/2">
          <MarkdownView value={value} />
        </div>
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
