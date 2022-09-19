import MarkdownView from "./MarkdownView";
import { v4 as uuidv4 } from "uuid";
import { memo, useRef, useState, useEffect } from "react";
import {
  BsBlockquoteLeft,
  BsCode,
  BsCodeSlash,
  BsImage,
  BsLink,
  BsListCheck,
  BsListOl,
  BsTable,
  BsTypeBold,
  BsTypeItalic,
} from "react-icons/bs";
import { MdSubscript, MdSuperscript, MdZoomOutMap } from "react-icons/md";
import { TbHeading, TbMath, TbStrikethrough } from "react-icons/tb";
import { Modal } from "../Modal";
import { useUploadImageMarkDownMutation } from "../../generated/graphql";
import { Input } from "../UI";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const options = [
  { title: "bold", icon: <BsTypeBold />, text: "**", txt: "bold" },
  { title: "italic", icon: <BsTypeItalic />, text: "*", txt: "italic" },
  {
    title: "strikethrough",
    icon: <TbStrikethrough />,
    text: "~~",
    txt: "strikethrough",
  },
  { title: "header", icon: <TbHeading />, text: "# ", txt: "h1", text2: " " },
  { icon: <MdSubscript />, text: "$x_2$", text2: " " },
  { icon: <MdSuperscript />, text: "$x^2$", text2: " " },
  {
    icon: <TbMath />,
    text: "[link tham khảo](http://csrgxtu.github.io/2015/03/20/Writing-Mathematic-Fomulars-in-Markdown/)\n\n$\nx=\\frac{n}{\\sqrt[n]{y^2}}",
    text2: "\n$",
  },
  {
    title: "quote",
    icon: <BsBlockquoteLeft />,
    text: "> ",
    txt: "Quote",
    text2: " ",
  },
  {
    title: "list",
    icon: <BsListCheck />,
    text: "- list\n- [ ] todo\n- [x] done",
    text2: " ",
  },
  {
    title: "list",
    icon: <BsListOl />,
    text: "1. Coffee\n2. Tea\n3. Coca Cola",
    text2: " ",
  },
  {
    title: "table",
    icon: <BsTable />,
    text: "|Input|Output|Giải thích|\n|:--|:--|:--|\n|",
    txt: "123",
    text2: "|321| ... |",
  },
  { title: "code", icon: <BsCode />, text: "`", txt: "code" },
  {
    title: "language",
    icon: <BsCodeSlash />,
    text: '~~~js\nlet a = "Hello";\nlet b = "World";\n console.log(a + " " + b);\n//result = Hello World\n~~~ \n\n```cpp\n#include <iostream>\n\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;',
    text2: "\n}\n```",
  },
  {
    title: "link",
    icon: <BsLink />,
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
  const imageRef = useRef<HTMLDivElement>(null);
  const [uploadImageMarkdown] = useUploadImageMarkDownMutation();
  const [addImage, setAddImage] = useState({
    link: "",
    alt: "",
  });
  const [openAddImage, setOpenAddImage] = useState(false);

  useEffect(() => {
    if (isZoom) document.body.style.overflowY = "hidden";
    else document.body.style.overflowY = "visible";
  }, [isZoom]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        imageRef.current &&
        !imageRef.current.contains(event.target as Node)
      ) {
        setOpenAddImage(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [imageRef]);

  const insertFormating = (
    txtarea: any,
    text: string,
    defaultTxt: string = "",
    text2: string = ""
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

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await uploadImageMarkdown({
      variables: {
        image: file,
      },
    });
    if (res.data?.uploadImage.url) {
      insertFormating(
        rcMdEdRef.current,
        "![",
        file.name,
        `](${res.data.uploadImage.url})`
      );
      setOpenAddImage(false);
    }
  };

  const body = (
    <div
      className={`relative flex flex-col border-2 border-sky-500 dark:border-slate-700 ${
        !isZoom ? "h-[560px]" : "h-full"
      } ${className}`}
    >
      <div className="z-10 flex border-b-2 border-sky-500 dark:border-slate-700 p-2">
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
                title={option.title}
              >
                {option.icon}
              </button>
            </li>
          ))}
          <li className="relative">
            <button
              type="button"
              className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() => setOpenAddImage(!openAddImage)}
            >
              <BsImage />
            </button>
            {openAddImage && (
              <div
                ref={imageRef}
                className="absolute left-1/2 -translate-x-1/2 mt-1 z-10 p-4 w-60 dark:bg-slate-900 ring-1 ring-slate-600 rounded space-y-6"
              >
                <Input
                  value={addImage.link}
                  label="link"
                  onChange={(val) => setAddImage({ ...addImage, link: val })}
                />
                <Input
                  value={addImage.alt}
                  label="tiêu đề"
                  onChange={(val) => setAddImage({ ...addImage, alt: val })}
                />
                <div className="flex justify-between">
                  <label
                    htmlFor="upload_image_md"
                    className="py-1 px-2 dark:bg-slate-800 dark:hover:bg-slate-700 rounded cursor-pointer"
                  >
                    Tải ảnh
                  </label>
                  <input
                    id="upload_image_md"
                    type="file"
                    hidden
                    onChange={uploadImage}
                  />
                  <button
                    type="button"
                    className="px-2 dark:bg-slate-800 dark:hover:bg-slate-700 rounded cursor-pointer"
                    onClick={() => {
                      insertFormating(
                        rcMdEdRef.current,
                        "![",
                        addImage.alt,
                        `](${addImage.link})`
                      );
                      setOpenAddImage(false);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </li>
        </ul>
        <ul className="flex space-x-1">
          <li>
            <button
              className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() => {
                setIsZoom(!isZoom);
              }}
            >
              <MdZoomOutMap />
            </button>
          </li>
        </ul>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <textarea
          ref={rcMdEdRef}
          className="h-full w-1/2 border-r-2 border-sky-500 dark:border-slate-700 p-2 bg-transparent outline-none focus:outline-none resize-none overflow-y-scroll caret-skyborder-sky-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          placeholder={placeholder}
        />
        <div className="w-1/2">
          <div className="w-full h-full leading-8">
            <MarkdownView value={value} />
          </div>
        </div>
      </div>
    </div>
  );

  return !isZoom ? (
    body
  ) : (
    <Modal isOpen={isZoom}>
      <div className="w-full h-full bg-white dark:bg-slate-900 z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {body}
      </div>
    </Modal>
  );
}

export default memo(MarkdownEditor);
