import moment from "moment";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { Comments } from "../../components/Comments";
import Image from "../../components/Image";
import { MarkdownView } from "../../components/Markdown";
import { Button } from "../../components/UI";
import config from "../../config";
import {
  CommentTypeFragment,
  useBlogCommentsLazyQuery,
  useBlogQuery,
  useGetRepliesBlogLazyQuery,
} from "../../generated/graphql";

import { useEffect, useState } from "react";

const limit = 5;

function Blog() {
  const { id = "0" } = useParams();
  const { data } = useBlogQuery({
    variables: {
      id: parseInt(id as string),
    },
    fetchPolicy: "no-cache",
  });

  const [comments, setComments] = useState<CommentTypeFragment[]>([]);
  const [hashMoreComments, setHashMoreComments] = useState(false);
  const [cursorComments, setCursorComments] = useState();

  const [loadBlogComment] = useBlogCommentsLazyQuery();

  const [loadReplies] = useGetRepliesBlogLazyQuery();

  useEffect(() => {
    (async () => {
      const resComments = await loadBlogComment({
        variables: {
          blogId: parseInt(id as string),
          limit,
        },
      });
      if (resComments.data?.blogComments) {
        setComments((pre) => [
          ...pre,
          ...(resComments.data?.blogComments?.comments || []),
        ]);
        setCursorComments(resComments.data?.blogComments.cursor);
        setHashMoreComments(resComments.data?.blogComments.hashMore);
      }
    })();
  }, [loadBlogComment, id]);

  const loadMoreComments = async () => {
    const resComments = await loadBlogComment({
      variables: {
        blogId: parseInt(id as string),
        limit,
        cursor: cursorComments,
      },
    });
    if (resComments.data?.blogComments) {
      setComments((pre) => [
        ...pre,
        ...(resComments.data?.blogComments?.comments || []),
      ]);
      setCursorComments(resComments.data?.blogComments.cursor);
      setHashMoreComments(resComments.data?.blogComments.hashMore);
    }
  };

  const onLoadingRelies = async (cmtId: number | string) => {
    const resReplies = await loadReplies({
      variables: {
        commentId: Number(cmtId),
      },
      fetchPolicy: "no-cache",
    });
    if (resReplies.data?.getRepliesBlog) {
      setComments((pre) => [
        ...pre,
        ...(resReplies.data?.getRepliesBlog || []),
      ]);
    }
  };

  return (
    data?.blog ? <>
      <header className="space-y-6 mb-6">
        
        
          <h1>{data?.blog?.title}</h1>
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Link to={config.routes.members + "/" + data?.blog?.user.id}>
                <Image
                  className="w-12 h-12 rounded-full"
                  src={data?.blog?.user.avatar}
                />
              </Link>
              <div className="flex flex-col py-1">
                <Link to={config.routes.members + "/" + data?.blog?.user.id}>
                  <p className="font-medium">{data?.blog?.user.nickname}</p>
                </Link>
                <p>{moment(data?.blog?.createdAt).format("YYYY-MM-DD")}</p>
              </div>
            </div>
            <div>
              <FiMoreHorizontal />
            </div>
          </div>
          <div>
            {data?.blog?.tags?.map((item) => (
              <div className="" key={item.name}></div>
            ))}
          </div>
        
        
      </header>
      <div className="leading-8 text-lg space-y-6">
        <MarkdownView value={data?.blog?.text} />
      </div>
      <footer className="my-8">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1 ">
            <span className="text-2xl cursor-pointer">
              <AiOutlineHeart />
            </span>
            <span>{data?.blog?.likesCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-2xl cursor-pointer">
              <FaRegCommentDots size={24} />
            </span>
            <span>{data?.blog?.commentsCount}</span>
          </div>
        </div>
        <div>
          <>
            <Comments comments={comments} onLoadingRelies={onLoadingRelies} />
            {hashMoreComments && (
              <div className="flex mt-4" onClick={loadMoreComments}>
                <Button className="m-auto">Load More</Button>
              </div>
            )}
          </>
        </div>
      </footer>
    </> : null
  );
}

export default Blog;
