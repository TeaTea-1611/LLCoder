import { memo, useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import { BsEye, BsEyeSlash, BsTable } from "react-icons/bs";
import { MdZoomOutMap } from "react-icons/md";
import { Modal } from "../Modal";
import {
  EditTextItem,
  EditTextItemFormatBlock,
  EditTextPalette,
  EditTextItemLink,
  ITEMS,
  EditTextItemImage,
} from "./EditTextItem";

interface EditTextProps {
  value: string;
  onChange: (value: string) => void;
  tagName?: string;
  name?: string;
}

function EditText({ value, onChange, tagName = "div" }: EditTextProps) {
  const [valueRef, setValueRef] = useState(value);
  const [disabled, setDisabled] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleChange = (evt: any) => {
    setValueRef(evt.target.value);
    onChange(evt.target.value);
  };

  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.focus();
    }
  }, []);

  const handleChangeItem = (val: string) => {
    if (valueRef.length > 0) {
      setValueRef(valueRef + val);
      onChange(valueRef + val);
    } else {
      setValueRef(val);
      onChange(val);
    }
  };

  let body = (
    <div
      className={`border-2 border-primary caret-primary focus-within:outline focus-within:outline-1 focus-within:outline-primary
    ${!isZoomed ? "" : "h-full"}
    `}
    >
      <div className="flex border-b-primary border-b p-1">
        <ul className="flex flex-1 flex-wrap mr-4">
          {ITEMS.map((item) => (
            <EditTextItem key={item.cmd} cmd={item.cmd} arg={item?.arg}>
              {item?.children}
            </EditTextItem>
          ))}
          <EditTextItemFormatBlock />
          <EditTextPalette />
          <EditTextPalette backgroundColor />
          <EditTextItem
            cmd="insertHTML"
            arg={`
            <table class="table-auto border-collapse border border-slate-500">
              <thead>
              <tr>
                <th class="py-2 px-4 border border-slate-600">Input</th>
                <th class="py-2 px-4 border border-slate-600">Output</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2 px-4 border border-slate-700">
                    123
                    <br />
                    hcmue
                  </td>
                  <td class="py-2 px-4 border border-slate-700">
                    321
                    <br />
                    eumch
                  </td>
                </tr>
              </tbody>
            </table>
            <br>
          `}
          >
            <BsTable />
          </EditTextItem>
          <EditTextItemLink onChange={handleChangeItem} />
          <EditTextItemImage onChange={handleChangeItem} />
        </ul>
        <ul className="mr-2 flex">
          <li>
            <button
              type="button"
              className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() => setDisabled(!disabled)}
            >
              {disabled ? <BsEye /> : <BsEyeSlash />}
            </button>
          </li>
          <li>
            <button
              type="button"
              className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <MdZoomOutMap />
            </button>
          </li>
        </ul>
      </div>
      <ContentEditable
        className={`w-full ${
          !isZoomed ? "h-96" : "h-full"
        } focus-visible:outline-none p-1 overflow-y-auto`}
        innerRef={innerRef}
        html={valueRef}
        disabled={disabled}
        onChange={handleChange}
        tagName={tagName}
        spellCheck={false}
        contentEditable={!disabled}
      />
    </div>
  );

  return !isZoomed ? (
    body
  ) : (
    <Modal isOpen={isZoomed}>
      <div className="w-full h-full bg-white dark:bg-gray-900 z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {body}
      </div>
    </Modal>
  );
}

export default memo(EditText);
