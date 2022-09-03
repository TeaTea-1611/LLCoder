import { CommentTypeFragment } from "../../generated/graphql";
import Comment from "./Comment";

interface CommentsProps {
  authEntityId?: number;
  comments?: CommentTypeFragment[];
}

function Comments({ authEntityId, comments = [] }: CommentsProps) {
  console.log(comments);

  const rootComments = comments.filter((comment) => comment.parentId === null);
  const rootReplies = comments.filter((comment) => comment.parentId !== null);

  const getReplies = (comment: CommentTypeFragment) => {
    if (comment.replyCount === 0) return [];
    let replies: CommentTypeFragment[] = [];
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
    <div>
      <h3>Comments</h3>
      <div className="space-y-4">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={(cmt) => getReplies(cmt)}
          ></Comment>
        ))}
      </div>
    </div>
  );
}

export default Comments;
