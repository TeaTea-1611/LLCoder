import { RiSendPlane2Fill } from "react-icons/ri";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import { BsCardImage, BsStickiesFill } from "react-icons/bs";
import { Emoji, MessageChatAll } from "../../components/Chat";
import { useState } from "react";

function ChatAll() {
  const [content, setContent] = useState("");
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);

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
        <div className="flex items-center h-10 my-1 px-2 space-x-2">
          <div className="flex">
            <button
              type="button"
              className="m-auto text-lg flex p-2 text-slate-700 dark:text-slate-400 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-sky-500 dark:hover:text-sky-500"
            >
              <BsCardImage className="m-auto" />
            </button>
          </div>
          <div className="flex">
            <button
              type="button"
              className="m-auto text-lg flex p-2 rounded-full text-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-sky-500 dark:hover:text-sky-500"
            >
              <BsStickiesFill className="m-auto" />
            </button>
          </div>
          <div className="relative flex-1 h-full">
            <input
              className="w-full h-full pl-4 px-1 pr-6 rounded-3xl"
              placeholder="Aa"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className="absolute top-1/2 -translate-y-1/2 right-3 text-lg p-1 flex rounded-full text-slate-700 dark:text-slate-400 hover:bg-slate-100 hover:text-sky-500 dark:hover:text-sky-500 dark:hover:bg-slate-700"
              onClick={() => setIsOpenEmoji(!isOpenEmoji)}
            >
              <MdOutlineInsertEmoticon />
            </button>
            <Emoji
              className="absolute bottom-12 right-0"
              onChange={(value) => setContent(content + value)}
              isOpen={isOpenEmoji}
            />
          </div>
          <div className="flex">
            <button
              type="button"
              className="m-auto text-lg text-slate-700 flex p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-sky-500"
            >
              <RiSendPlane2Fill className="m-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatAll;
