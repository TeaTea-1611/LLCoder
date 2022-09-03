import moment from "moment";
import { CommentTypeFragment } from "../../generated/graphql";
import Image from "../Image";

function Comment({
  comment,
  replies,
}: {
  comment: CommentTypeFragment;
  replies: (cmt: CommentTypeFragment) => CommentTypeFragment[];
}) {
  return (
    <div className="flex space-x-2">
      <div>
        <Image className="w-12 h-12 rounded-full" src={comment.user.avatar} />
      </div>
      <div className="flex flex-col">
        <div className="space-x-2">
          <span className="dark:text-slate-300">{comment.user.nickname}</span>
          <span className="dark:text-slate-600">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <div>{comment.comment}</div>
        <div className="space-y-4 mt-4">
          {comment.replyCount > 0 && (
            <>
              <div>{comment.replyCount} Replies</div>
              {replies(comment).map(
                (reply) =>
                  reply.parentId === comment.id && (
                    <Comment
                      key={reply.id}
                      comment={reply}
                      replies={(cmt) => replies(cmt)}
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
