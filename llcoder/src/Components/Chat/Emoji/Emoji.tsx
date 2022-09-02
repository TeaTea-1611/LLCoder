import React, { useState } from "react";
import { DATA_EMOJI } from "./Data";
import { v4 as uuidv4 } from "uuid";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Tippy from "@tippyjs/react/headless";
import { MdOutlineInsertEmoticon } from "react-icons/md";

interface EmojiProps {
  onChange: (value: string) => void;
  className?: string;
}

function Emoji({ onChange, className }: EmojiProps) {
  const [emjCurrent, setEmjCurrent] = useState(0);
  const [pageCurrent, setPageCurrent] = useState(0);

  return (
    <Tippy
      appendTo={document.body}
      interactive
      trigger="click"
      placement="top"
      zIndex={999}
      render={(attrs) => (
        <div
          className={
            !!className
              ? `shadow-lg rounded dark:border dark:border-slate-700 dark:bg-gray-800 w-80 ${className}`
              : `shadow-lg rounded dark:border dark:border-slate-700 dark:bg-gray-800 w-80`
          }
          tabIndex={-1}
          {...attrs}
        >
          <div className="p-[2px]">
            <ul className="grid grid-cols-8 overflow-y-auto overflow-x-hidden h-52">
              {DATA_EMOJI[emjCurrent].emojis.map((emoji, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center h-full"
                >
                  <button
                    type="button"
                    className="w-8 h-8 m-auto text-2xl flex p-[2px] rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 items-center justify-center"
                    onClick={() => {
                      onChange(emoji);
                    }}
                  >
                    {emoji}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex border-t border-slate-700">
            {!!pageCurrent ? (
              <button
                type="button"
                className="w-10 flex items-center justify-center border-r border-slate-700 hover:bg-slate-700/40"
                onClick={() => setPageCurrent(pageCurrent - 1)}
              >
                <BsChevronLeft />
              </button>
            ) : (
              <button
                type="button"
                className="w-10 flex items-center justify-center border-r border-slate-700 hover:bg-slate-700/40"
              >
                LL
              </button>
            )}
            <div className="flex-1 overflow-hidden">
              <div
                className="relative inline-flex whitespace-nowrap duration-300 ease-linear"
                style={{ left: -pageCurrent * 240 }}
              >
                <div className="inline-flex whitespace-nowrap">
                  {DATA_EMOJI.map((emoji, index) => (
                    <button
                      key={uuidv4()}
                      type="button"
                      className="w-10 h-10 text-2xl flex p-[2px] hover:bg-slate-100 dark:hover:bg-slate-700 items-center justify-center"
                      onClick={() => setEmjCurrent(index)}
                    >
                      {emoji.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {!(Math.ceil(DATA_EMOJI.length / 6) === pageCurrent + 1) && (
              <button
                type="button"
                className="w-10 flex items-center justify-center border-l border-slate-700 hover:bg-slate-700/40"
                onClick={() => setPageCurrent(pageCurrent + 1)}
              >
                <BsChevronRight />
              </button>
            )}
          </div>
        </div>
      )}
    >
      <button type="button">
        <MdOutlineInsertEmoticon />
      </button>
    </Tippy>
  );
}

export default Emoji;
