import { NetworkStatus } from "@apollo/client";
import { Button } from "../../components/UI";
import { usePagtinatedBlogsQuery } from "../../generated/graphql";
import moment from "moment";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import Image from "../../components/Image";
import { FiMoreHorizontal } from "react-icons/fi";

const limit = 5;

function Blogs() {
  const { data, fetchMore, networkStatus } = usePagtinatedBlogsQuery({
    variables: { limit },
    notifyOnNetworkStatusChange: true,
  });

  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const loadMoreBlogs = () =>
    fetchMore({
      variables: {
        cursor: data?.pagtinatedBlogs.cursor,
      },
    });

  console.log(data);

  return (
    <>
      <header className="">
        <h1>Bài viết nổi bật</h1>
        <div className="mt-2">
          <p>
            Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online
            và các kỹ thuật lập trình.
          </p>
        </div>
      </header>
      <div className="space-y-4 mt-6">
        {data?.pagtinatedBlogs.blogs?.map((blog) => (
          <div
            className="p-4 rounded dark:bg-slate-800 space-y-2"
            key={blog.id + blog.title}
          >
            <div className="flex justify-between">
              <div className="flex items-center space-x-1">
                <Image
                  className="w-6 h-6 rounded-full"
                  src={blog.user.avatar}
                />
                <span className="font-medium">{blog.user.nickname}</span>
              </div>
              <div>
                <FiMoreHorizontal />
              </div>
            </div>
            <div className="space-y-2">
              <Link to={blog.id} className="font-medium text-3xl">
                {blog.title}
              </Link>
              <div className="flex items-center space-x-3">
                {blog.tags.length > 0 && (
                  <a href={`/blogs/tag/${blog.tags[0].name}`}>
                    {blog.tags[0].name}
                  </a>
                )}
                <div className="flex items-center px-1 rounded-lg dark:bg-slate-700 space-x-1">
                  <AiOutlineHeart />
                  <span>{blog.likesCount}</span>
                </div>
                <div className="flex items-center px-1 rounded-lg dark:bg-slate-700 space-x-1">
                  <FaRegCommentDots />
                  <span>{blog.commentsCount}</span>
                </div>
                <span>{moment(blog.createdAt).format("YYYY-MM-DD")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {data?.pagtinatedBlogs.hashMore && (
        <div className="flex mt-4">
          <Button
            className="m-auto"
            onClick={loadMoreBlogs}
            isLoading={loadingMore}
          >
            Load More
          </Button>
        </div>
      )}
    </>
  );
}

export default Blogs;
