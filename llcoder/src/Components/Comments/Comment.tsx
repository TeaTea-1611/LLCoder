import moment from "moment";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { CommentTypeFragment } from "../../generated/graphql";
import Image from "../Image";
import { useState } from "react";
import { LoadingSpinner } from "../Loading";
import { mapReactionsComment } from "../../utils/helpers/mapReactionsComment";
import reactionIcons from "../../assets/icons/reactionIcons";

function Comment({
  comment,
  replies,
  onLoadingRelies,
}: {
  comment: CommentTypeFragment;
  replies: (cmt: CommentTypeFragment) => CommentTypeFragment[];
  onLoadingRelies?: (parentId: string | number) => any;
}) {
  const [isHiddenReplies, setIsHiddenReplies] = useState(true);
  const [loadingReplies, setLoadingReplies] = useState(false);

  return (
    <div className="flex space-x-2">
      <div>
        <Image className="w-12 h-12 rounded-full" src={comment.user.avatar} />
      </div>
      <div>
        <div>
          <div className="relative inline-block p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
            <div className="space-x-2">
              <span className="dark:text-slate-100 font-medium">
                {comment.user.nickname}
              </span>
              <span className="dark:text-slate-600">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
            <div className="inline-flex dark:text-slate-100">
              {comment.comment}
            </div>
            {comment.reactionsCount > 0 && (
              <div className="absolute flex p-[1px] -bottom-2 right-0 rounded-xl dark:bg-slate-800 cursor-pointer">
                <div className="flex items-center flex-row-reverse">
                  {
                    <span className="-ml-1">
                      <img
                        className="w-[18px] h-[18px] p-[1px] dark:bg-slate-800 rounded-full"
                        src={reactionIcons.haha}
                        alt=""
                      />
                    </span>
                  }
                  {
                    <span className="-ml-1">
                      <img
                        className="w-[18px] h-[18px] p-[1px] dark:bg-slate-800 rounded-full"
                        src={reactionIcons.love}
                        alt=""
                      />
                    </span>
                  }
                  {
                    <span>
                      <img
                        className="w-[18px] h-[18px] p-[1px] dark:bg-slate-800 rounded-full"
                        src={reactionIcons.wow}
                        alt=""
                      />
                    </span>
                  }
                </div>
                {comment.reactionsCount > 1 && (
                  <span className="leading-none px-1">
                    {comment.reactionsCount}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <ul className="inline-block space-x-2 mt-1">
          <li className="inline-block hover:underline cursor-pointer">
            <span>Like</span>
          </li>
          <li className="inline-block hover:underline cursor-pointer">
            <span>Reply</span>
          </li>
        </ul>
        <div className="space-y-2 mt-2">
          {comment.replyCount > 0 && (
            <>
              <div
                className="flex items-center space-x-1 uppercase font-medium cursor-pointer text-sky-500"
                onClick={() => {
                  setIsHiddenReplies(!isHiddenReplies);
                  setLoadingReplies(true);
                  !!onLoadingRelies && onLoadingRelies(comment.id);
                  setLoadingReplies(false);
                }}
              >
                {isHiddenReplies ? (
                  <MdOutlineArrowDropDown />
                ) : (
                  <MdOutlineArrowDropUp />
                )}
                <span>{comment.replyCount}</span>
                <span>Replies</span>
                {loadingReplies && <LoadingSpinner small />}
              </div>
              {!isHiddenReplies &&
                replies(comment).map(
                  (reply) =>
                    reply.parentId === comment.id && (
                      <Comment
                        key={reply.id}
                        comment={reply}
                        replies={(cmt) => replies(cmt)}
                        onLoadingRelies={onLoadingRelies}
                      />
                    )
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
