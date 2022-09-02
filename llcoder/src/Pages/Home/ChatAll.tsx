import { MdOutlineSend } from "react-icons/md";
import { BsCardImage, BsStickiesFill } from "react-icons/bs";
import { Emoji, MessageChatAll } from "../../components/Chat";
import { useState } from "react";
import ContentEditable from "react-contenteditable";

function ChatAll() {
  const [content, setContent] = useState("<br>");

  return (
    <div className="space-y-2">
      <h2 className="font-medium">Chat All</h2>
      <div className="w-full shadow-lg rounded dark:border dark:border-slate-700">
        <div className="relative overflow-hidden h-8">
          <h5 className="content-auto">Chào mừng bạn đến với LLCoder...</h5>
        </div>
        <div className="relative overflow-y-scroll w-full h-80 p-1 border-t border-b border-slate-200 dark:border-slate-700">
          <div>
            <MessageChatAll
              message="Chào mừng bạn đến với LLCoder..."
              user={{ nickname: "LLCoder" }}
            />
          </div>
        </div>
        <div className="flex items-center px-2 py-1">
          <div className="flex flex-wrap justify-end max-w-full flex-1 rounded-3xl pl-4 py-1 bg-slate-100 dark:bg-slate-800">
            <div className="items-center flex-grow flex-shrink max-h-40 overflow-x-hidden overflow-y-auto">
              <div className="relative whitespace-nowrap">
                <ContentEditable
                  className="outline-none focus-visible:outline-none break-words whitespace-pre-wrap select-text"
                  html={content}
                  onChange={(e) => setContent(e.target.value)}
                  disabled={false}
                  tagName="div"
                  spellCheck={false}
                />
                {content === "<br>" && (
                  <div className="absolute pointer-events-none inset-0">Aa</div>
                )}
              </div>
            </div>
            <div className="h-full mx-3">
              <ul className="flex items-center space-x-1">
                <li className="text-lg p-1 flex rounded-lg text-slate-700 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer">
                  <Emoji
                    onChange={(val) => {
                      console.log(val);
                    }}
                  />
                </li>
                <li className="text-lg p-1 flex rounded-lg text-slate-700 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer">
                  <BsCardImage />
                </li>
                <li className="text-lg p-1 flex rounded-lg text-slate-700 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer">
                  <BsStickiesFill />
                </li>
                <li className="text-lg p-1 flex rounded-lg text-slate-700 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer">
                  <MdOutlineSend />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatAll;
