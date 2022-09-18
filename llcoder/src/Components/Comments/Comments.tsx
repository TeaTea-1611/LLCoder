import Image from "../Image";
import Comment from "./Comment";
import { useId } from "react";

interface CommentsProps {
  authEntityId?: number;
  comments?: any[];
  onLoadingRelies?: (parentId: string | number) => any;
}

function Comments({
  authEntityId,
  comments = [],
  onLoadingRelies,
}: CommentsProps) {
  const id = useId();
  const rootComments = comments.filter((comment) => comment.parentId === null);
  const rootReplies = comments.filter((comment) => comment.parentId !== null);

  const getReplies = (comment: any) => {
    if (comment.replyCount === 0) return [];
    let replies: any[] = [];
    rootReplies.forEach((reply) => {
      if (reply.parentId === comment.id) {
        replies.push(reply);
        if (reply.replyCount > 0) {
          replies = replies.concat(getReplies(reply));
        }
      }
    });

    return replies.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  };

  return (
    <div className="space-y-8">
      <h3>Comments</h3>
      <div className="flex space-x-2">
        <div>
          <Image src="" className="w-12 h-12 rounded-full" />
        </div>
        <div className="relative w-full">
          <div
            className="w-full py-1 outline-none focus-visible:outline-none border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-sky-500 focus:outline-none focus:ring-0 focus:border-sky-500"
            contentEditable={true}
          ></div>
        </div>
      </div>
      <div className="space-y-4">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={(cmt) => getReplies(cmt)}
            onLoadingRelies={(parentId) => {
              if (rootReplies.some((r) => r.parentId === parentId)) return;
              else onLoadingRelies && onLoadingRelies(parentId);
            }}
          ></Comment>
        ))}
      </div>
    </div>
  );
}

export default Comments;
