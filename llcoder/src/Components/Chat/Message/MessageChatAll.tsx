import { User } from "../../../types";

function MessageChatAll({ message, user }: { message: string; user: User }) {
  return (
    <div className="flex">
      <div className="flex flex-col justify-end px-2">
        <div className="w-8 h-8">
          <img
            className="w-full h-full object-cover rounded-full"
            src={user.avatar}
            alt={user.nickname}
          />
        </div>
      </div>
      <div className="">
        <div></div>
        <div className="min-w-[36px] min-h-[36px] rounded-lg shadow-lg dark:bg-slate-700 p-2">
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}

export default MessageChatAll;
