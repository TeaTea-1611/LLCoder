import { CommentTypeFragment } from "../../generated/graphql";
import Comment from "./Comment";

interface CommentsProps {
  currentUserId?: number;
  comments?: CommentTypeFragment[];
}

function Comments({ currentUserId, comments = [] }: CommentsProps) {
  const rootComments = comments.filter((comment) => comment.parentId === null);
  const getReplies = (commentId: string | number) => {
    return comments
      .filter((cmt) => cmt.parentId === commentId.toString())
      .sort(
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
            replies={getReplies(rootComment.id)}
          ></Comment>
        ))}
      </div>
    </div>
  );
}

export default Comments;
