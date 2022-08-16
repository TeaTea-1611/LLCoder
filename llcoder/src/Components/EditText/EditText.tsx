import { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import {
  EditTextItem,
  EditTextItemFormatBlock,
  ITEMS,
  ITEMS_FORMAT,
} from "./EditTextItem";

interface EditTextProps {
  disabled?: boolean;
  value: string;
  onChange: (evt: any) => void;
  tagName?: string;
  name?: string;
}

function EditText({
  value,
  disabled = false,
  onChange,
  tagName = "div",
  name,
}: EditTextProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.focus();
    }
  }, []);

  return (
    <div className="border-2 border-primary caret-primary focus-within:outline focus-within:outline-1 focus-within:outline-primary">
      <div className="flex border-b-primary border-b p-1">
        <ul className="flex space-x-1">
          {ITEMS.map((item) => (
            <EditTextItem
              key={item.cmd}
              cmd={item.cmd}
              arg={item?.arg}
              innerRef={innerRef}
            >
              {item?.children}
            </EditTextItem>
          ))}
          <EditTextItemFormatBlock innerRef={innerRef} />
        </ul>
      </div>
      <ContentEditable
        className="w-full h-80 focus-visible:outline-none p-1"
        innerRef={innerRef}
        html={value}
        disabled={disabled}
        onChange={onChange}
        tagName={tagName}
        spellCheck={false}
      />
    </div>
  );
}

export default EditText;
